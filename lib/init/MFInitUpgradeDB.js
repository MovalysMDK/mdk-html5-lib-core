'use strict';

/**
 * MFInitUpgradeDB
 */
angular.module('mfcore').factory('MFInitUpgradeDB', [
    'MFAbstractInitTask', 'MFInitTaskStatus', 'MFSystem', 'MFDatabaseTypeSelector', 'MFDalSqlProxy', 'MFDalNoSqlProxy', 'MFSyncPromiseProvider', 'MFConfigurationService', 'MFTransactionManager', '$timeout', 'MFIntegerConverter',
    function (MFAbstractInitTask, MFInitTaskStatus, MFSystem, MFDatabaseTypeSelector, MFDalSqlProxy, MFDalNoSqlProxy, $qSync, MFConfigurationService, MFTransactionManager, $timeout, MFIntegerConverter) {

        var initTask = new MFAbstractInitTask();

        initTask.brief = 'Upgrade DataBase';

        var engine = this;
        engine.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        engine.IDBKeyRange = window.IDBKeyRange || window.mozIDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
        engine.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;

        var upgradeDBOneVersionTaskSql = function(context, currentDBVersion) {
            var deferred = $qSync.defer();
            var nextDBVersion = parseInt(currentDBVersion) + 1;
            MFSystem.getAsset('assets/data/sql/' + currentDBVersion + '_' + nextDBVersion + '.sql', false).then(
                function(response) {
                    var dirtyRequests = response.split(/;/);
                    var requests = [];

                    for (var index in dirtyRequests) {
                        if (dirtyRequests.hasOwnProperty(index)) {
                            var request = dirtyRequests[index];
                            if (request.replace(/\s*/, '').length > 0) {
                                requests.push(request);
                            }
                        }
                    }

                    var db = MFDalSqlProxy.dbConnection();

                    MFTransactionManager.run(context, function(context, param) {
                        // changeVersion is used to upgrade the database, see https://www.w3.org/TR/webdatabase/
                        db.changeVersion(
                            currentDBVersion,
                            nextDBVersion,
                            function() {
                                MFTransactionManager.run(context, function(context, param) {
                                    MFDalSqlProxy.executeQueries(context, requests).then(function() {
                                        deferred.resolve();
                                    }, function(error) {
                                        deferred.reject(error);
                                    });
                                }, function(error) {
                                    context.daoSession = {};
                                    deferred.reject(error);
                                }, {});
                            },
                            function(error) {
                                deferred.reject(error);
                            });
                    }, function(error) {
                        context.daoSession = {};
                        deferred.reject(error);
                    }, {});
                },
                function(error) {
                    context.addWarning(error);
                    deferred.resolve();
                }
            );
            return deferred.promise;
        };

        var upgradeDBOneVersionTaskNoSql = function(context, currentDBVersion) {
            MFDalNoSqlProxy.closeDatabase();

            var deferred = $qSync.defer();
            var _dbConnection = null;
            var nextDBVersion = parseInt(currentDBVersion) + 1;

            MFSystem.getAssets(['assets/data/nosql/' + currentDBVersion + '_' + nextDBVersion + '.json'], false).then(
                function(createStoresScripts) {
                    var databaseConfig = MFConfigurationService.getValue('databaseConfig');
                    var engineRequest = engine.indexedDB.open(databaseConfig.name, nextDBVersion);

                    //callback success db
                    engineRequest.onsuccess = function(event) {
                        _dbConnection = event.target.result;
                        _dbConnection.close();
                    };

                    //callback error db
                    engineRequest.onerror = function(event) {
                        deferred.reject('[UPGRADE NO SQL BDD] Cannot open the database ' + databaseConfig.name + ' -- error: ' + (event.target.webkitErrorMessage || event.target.errorCode));
                    };

                    engineRequest.onupgradeneeded = function(event) {
                        _dbConnection = event.target.result;
                        MFTransactionManager.run(context, function(context, param) {
                            var creationSuccessListener = function(event) {
                                deferred.resolve(_dbConnection);
                            };

                            for (var j = 0; j < createStoresScripts.length; ++j) {
                                var objectStores = createStoresScripts[j];
                                for (var objectStoreName in objectStores) {
                                    if (objectStores.hasOwnProperty(objectStoreName)) {
                                        var objectStore = _dbConnection.createObjectStore(objectStoreName, {
                                            keypath: objectStores[objectStoreName].keypath
                                        });
                                        var indices = objectStores[objectStoreName].createIndex;
                                        for (var k = 0; k < indices.length; ++k) {
                                            objectStore.createIndex(indices[k].name, indices[k].keyPath, {
                                                unique: indices[k].unique
                                            });
                                        }
                                        objectStore.transaction.oncomplete = creationSuccessListener;
                                    }
                                }
                            }
                        }, function(error) {
                            context.daoSession = {};
                            deferred.reject(error);
                        }, {}, context);
                    };
                },
                function(error) {
                    context.addWarning(error);
                    deferred.resolve();
                }
            );

            return deferred.promise;
        };

        var upgradeTask = function(context, newDBVersion, currentDBVersion, isSql) {
            if (newDBVersion > currentDBVersion) {
                var deferred = $qSync.defer();
                // launch the upgrade task for the current version
                if (isSql) {
                    upgradeDBOneVersionTaskSql(context, currentDBVersion).then(function() {
                        // recursively call the function with the next version
                        upgradeTask(context, newDBVersion, ++currentDBVersion, isSql).then(function() {
                            deferred.resolve();
                        });
                    }, function(error) {
                        deferred.reject(error);
                    });
                } else {
                    upgradeDBOneVersionTaskNoSql(context, currentDBVersion).then(function() {
                        // recursively call the function with the next version
                        upgradeTask(context, newDBVersion, ++currentDBVersion, isSql).then(function() {
                            deferred.resolve();
                        });
                    }, function(error) {
                        deferred.reject(error);
                    });
                }
                return deferred.promise;
            } else {
                return $qSync.resolve();
            }
        };

        initTask.run = function (context, firstLaunch) {
            // On récupère le numéro de version de la base actuelle pour savoir s'il faut faire un upgrade
            var currentDatabaseConfig = MFConfigurationService.getValue('databaseConfig');
            var currentDBVersion = currentDatabaseConfig.version;

            MFSystem.getAsset('assets/config/project-config.json', false).then(
                function(response) {
                    var dbConfig = response.databaseConfig;

                    if (dbConfig.version > currentDBVersion) {
                        upgradeTask(context, dbConfig.version, currentDBVersion, MFDatabaseTypeSelector.isSQL()).then(
                            function() {
                                // set the new database version in databaseConfig
                                MFConfigurationService.setValue('databaseConfig', dbConfig);
                                initTask.status = MFInitTaskStatus.SUCCEEDED;
                            },
                            function(error) {
                                context.addError(error);
                                initTask.status = MFInitTaskStatus.FAILED;
                            }
                        );
                    } else {
                        initTask.status = MFInitTaskStatus.SUCCEEDED;
                    }
                },
                function(error) {
                    context.addError(error);
                    initTask.status = MFInitTaskStatus.FAILED;
                }
            );
        };

        initTask.runTaskSql = function(context, currentDBVersion) {
            return upgradeDBOneVersionTaskSql(context, currentDBVersion);
        };

        initTask.runTaskNoSql = function(context, currentDBVersion) {
            return upgradeDBOneVersionTaskNoSql(context, currentDBVersion);
        };

        return initTask;
    }
]);
