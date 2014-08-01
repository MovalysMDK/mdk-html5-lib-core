'use strict';
/**
 * MFInitOpenDataBase
 */

angular.module('mfcore').factory('MFInitOpenDataBase',
    ['MFAbstractInitTask', 'MFInitTaskStatus', 'MFSystem', 'MFDalSupport', 'MFDalSqlProxy', 'MFDalNoSqlProxy',
        function (MFAbstractInitTask, MFInitTaskStatus, MFSystem, MFDalSupport, MFDalSqlProxy, MFDalNoSqlProxy) {

            var initTask = new MFAbstractInitTask();

            initTask.brief = 'Open DataBase';

            initTask.run = function (context, firstLaunch) {

                switch (MFDalSupport.getDalSupportBase()) {
                    case 'WEBSQL':
                    case 'SQLITE':
                        this.runTaskSql(context, firstLaunch);
                        break;
                    case 'NOSQL':
                        this.runTaskNoSql(firstLaunch, context);
                        break;
                    default:
                    {
                        context.addError('unknown type of database');
                        initTask.status = MFInitTaskStatus.FAILED;
                    }
                }

            };

            initTask.runTaskSql = function (context, firstLaunch) {
                MFDalSqlProxy.openDatabase(firstLaunch).then(function () {
                    initTask.status = MFInitTaskStatus.SUCCEEDED;
                }, function (error) {
                    context.addError(error);
                    initTask.status = MFInitTaskStatus.FAILED;
                });

            };

            initTask.runTaskNoSql = function (context, firstLaunch) {

                if (firstLaunch) {
                    MFSystem.getAssets(
                        ['assets/data/nosql/create_fwkmodel.json',
                            'assets/data/nosql/create_usermodel.json'
                        ], false).then(function (results) {
                            MFDalNoSqlProxy.openDatabase(function (dbConnection) {
                                for (var j = 0; j < results.length; ++j) {
                                    var objectStores = results[j].data;
                                    for (var i in objectStores) {
                                        if (objectStores.hasOwnProperty(i)) {
                                            console.log(objectStores[i]);
                                            var objectStore = dbConnection.createObjectStore(i, { 'keypath': objectStores[i].keypath });
                                            var indices = objectStores[i].createIndex;
                                            for (var k = 0; k < indices.length; ++k) {
                                                objectStore.createIndex(indices[k].name, indices[k].keyPath, { 'unique': indices[k].unique });
                                            }
                                        }
                                    }
                                }
                            }).then(function (connection) {
                                initTask.status = MFInitTaskStatus.SUCCEEDED;
                            }, function (error) {
                                context.addError(error);
                                initTask.status = MFInitTaskStatus.FAILED;
                            });
                        },
                        function (error) {
                            context.addError(error);
                            initTask.status = MFInitTaskStatus.FAILED;
                        });
                } else {
                    MFDalNoSqlProxy.openDatabase(function (dbConnection) {
                    }).then(function (connection) {
                        initTask.status = MFInitTaskStatus.SUCCEEDED;
                    }, function (error) {
                        context.addError(error);
                        initTask.status = MFInitTaskStatus.FAILED;
                    });
                }

            };

            return initTask;
        }]);