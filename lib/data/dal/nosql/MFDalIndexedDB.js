'use strict';
/**
 * @file MFDalIndexedDB.js
 * @brief Data Access Layer
 * @date 22/01/2014
 *
 * Copyright (c) 2014 Sopra Group. All rights reserved.
 *
 */


angular.module('mfcore').factory('MFDalIndexedDB', ['MFSyncPromiseProvider', 'MFException', 'MFDalIndexedDBTransaction', 'MFConfigurationService', 'MFIntegerConverter', 'MFDalException', 'MFUtils',
    function ($qSync, MFException, MFDalIndexedDBTransaction, MFConfigurationService, MFIntegerConverter, MFDalException, MFUtils) {
        var MFDalIndexedDB = function MFDalIndexedDB() {
        };

        var engine = this;
        engine.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        engine.IDBKeyRange = window.IDBKeyRange || window.mozIDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
        engine.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;

        /** predefined callback functions, can be customized in angular.config */
        engine.onDatabaseError = function (e) {
            throw new MFException('Database error: ' + (e.target.webkitErrorMessage || e.target.errorCode));
        };
        engine.onDatabaseBlocked = function (e) {
            throw new MFException('Database is blocked. Try close other tabs with this page open and reload this page!');
        };

        /** custom initializacion on upgrade version */
        engine.upgradeNeeded = function () {
        };
        var _dbConnection = null;
        Object.defineProperty(MFDalIndexedDB, 'dbConnection', {
            get: function () {
                return _dbConnection;
            },
            configurable: false,
            enumerable: true
        });

        MFDalIndexedDB.openDatabase = function (onUpgradeNeeded) {
            var deferred = $qSync.defer();
            if (!engine.indexedDB) {
                throw new MFException('Your browser doesn\'t support a stable version of IndexedDB. Such and such feature will not be available.');
            } else {
                if (_dbConnection) {
                    deferred.resolve(_dbConnection);
                } else {
                    var databaseConfig = MFConfigurationService.getValue('databaseConfig');
                    var engineRequest = engine.indexedDB.open(databaseConfig.name, MFIntegerConverter.fromString(databaseConfig.version));
                    engineRequest.onupgradeneeded = function (event) {
                        onUpgradeNeeded(event.target.result);
                    };
                    //callback error db
                    engineRequest.onerror = engine.onDatabaseError;
                    //callback success db
                    engineRequest.onsuccess = function (event) {
                        _dbConnection = event.target.result;
                        deferred.resolve(_dbConnection);
                    };
                }
            }
            return deferred.promise;
        };

        MFDalIndexedDB.closeDatabase = function () {
            _dbConnection = null;
        };

        MFDalIndexedDB.deleteDatabase = function () {

            var deferred = $qSync.defer();

            _dbConnection.close();
            _dbConnection = null;

            var databaseConfig = MFConfigurationService.getValue('databaseConfig');
            var deleteReq = engine.indexedDB.deleteDatabase(databaseConfig.name);

            deleteReq.onsuccess = function (event) {
                deferred.resolve();
            };

            deleteReq.onerror = function (event) {
                deferred.reject();
            };

            return deferred.promise;

        };


        MFDalIndexedDB.clearObjectStore = function (context, objectStoreName) {

            var deferred = $qSync.defer();
            var objectStore = context.dbTransaction.objectStore(objectStoreName);

            var request = objectStore.clear();

            request.onsuccess = function () {
                deferred.resolve();
            };

            request.onerror = function () {
                deferred.resolve();
            };

            return deferred.promise;
        };

        MFDalIndexedDB.openTransaction = function () {
            return new MFDalIndexedDBTransaction(_dbConnection);
        };

        MFDalIndexedDB.closeTransaction = function () {
        };
        /*
         =======================================================
         ====  FIND DATA
         =======================================================
         */

        MFDalIndexedDB.find = function (context, objectStoreName, propertyValues, propertyName, filteringFunction) {
            console.assert(!angular.isUndefinedOrNullOrEmpty(context), 'context should be defined');
            console.assert(!angular.isUndefinedOrNullOrEmpty(objectStoreName), 'objectStoreName should be defined');

            if (angular.isUndefinedOrNullOrEmpty(propertyValues)) {
                return MFDalIndexedDB.findByFilter(context, objectStoreName, filteringFunction);
            }
            else if (angular.isUndefinedOrNullOrEmpty(propertyName)) {
                //Get the list of records whose ID is in "propertyValues"
                return MFDalIndexedDB.findByKeys(context, objectStoreName, propertyValues);
            }
            else {
                return MFDalIndexedDB.findByProperties(context, objectStoreName, propertyValues, propertyName, filteringFunction);
            }
        };


        MFDalIndexedDB.findByFilter = function (context, objectStoreName, filteringFunction) {

            if (!angular.isFunction(filteringFunction)) {
                filteringFunction = function () {
                    return true;
                };
            }

            var deferred = $qSync.defer();
            var objectStore = context.dbTransaction.objectStore(objectStoreName);
            console.assert(!angular.isUndefinedOrNullOrEmpty(objectStore), 'Object store ' + objectStoreName + ' not found');

            var dalException = new MFDalException(this, 'NoSql query execution failed');
            dalException.query = 'SELECT * FROM ' + objectStoreName;


            var result = [];
            objectStore.openCursor().onsuccess = function (event) {
                var cursor = event.target.result;
                if (cursor) {
                    var resultValue = cursor.value;
                    if (filteringFunction(resultValue)) {
                        result.push(resultValue);
                    }
                    cursor.continue();
                    // never resolve the promise before the end of the cursor!
                } else {
                    deferred.resolve(result);
                }
            };

            objectStore.openCursor().onerror = function (errorEvent) {
                dalException.apiError = errorEvent.target.error;
                console.error(dalException.apiError);
                console.error(dalException);
                context.addError(dalException.toString());
                context.rollback = true;
                deferred.reject(dalException);
            };


            return deferred.promise;
        };


        /**
         *
         * @param context
         * @param objectStoreName
         * @param keyValues list of IDs
         * @returns {promise|*} list of records whose id is in the list "keys"
         */
        MFDalIndexedDB.findByKeys = function (context, objectStoreName, keyValues) {
            var multipleKeys = Array.isArray(keyValues);
            keyValues = multipleKeys ? keyValues : [keyValues];

            var deferred = $qSync.defer();
            var objectStore = context.dbTransaction.objectStore(objectStoreName);
            console.assert(!angular.isUndefinedOrNullOrEmpty(objectStore), 'Object store ' + objectStoreName + ' not found');

            var dalException = new MFDalException(this, 'NoSql query execution failed');
            dalException.query = 'SELECT * FROM ' + objectStoreName;
            dalException.queryData = keyValues;


            var results = {};
            var onSuccess = function (key, deferredElement, event) {
                if (event.target.result !== undefined) {
                    results[key] = event.target.result;
                }
                deferredElement.resolve();
            };
            var onError = function (deferredElement, errorEvent) {
                deferredElement.reject(errorEvent);
            };


            var promises = [];
            for (var i = 0; i < keyValues.length; ++i) {
                var deferredElement = $qSync.defer();
                var request = objectStore.get(keyValues[i]);
                request.onsuccess = onSuccess.bind(null, keyValues[i], deferredElement);
                request.onerror = onError.bind(null, deferredElement);
                promises.push(deferredElement.promise);
            }

            $qSync.all(promises).then(function () {
                deferred.resolve(multipleKeys ? results : (Object.getOwnPropertyNames(results).length > 0 ? results[keyValues[0]] : null));
            }, function (errorEvent) {
                dalException.apiError = errorEvent.target.error;
                console.error(dalException.apiError);
                console.error(dalException);
                context.addError(dalException.toString());
                context.rollback = true;
                deferred.reject(dalException);
            });

            return deferred.promise;
        };


        MFDalIndexedDB.findByProperties = function (context, objectStoreName, propertyValues, propertyName, p_filteringFunction) {
            propertyValues = MFUtils.toArray(propertyValues);

            var deferred = $qSync.defer();

            var objectStore = context.dbTransaction.objectStore(objectStoreName);
            console.assert(!angular.isUndefinedOrNullOrEmpty(objectStore), 'Object store ' + objectStoreName + ' not found');

            if (!angular.isFunction(p_filteringFunction)) {
                p_filteringFunction = function () {
                    return true;
                };
            }

            var objStoreIndex;
            try {
                objStoreIndex = objectStore.index(propertyName);
            }
            catch (error) {
                objStoreIndex = null;
            }

            if (angular.isUndefinedOrNull(objStoreIndex)) {
                return MFDalIndexedDB.findByFilter(
                    context,
                    objectStoreName,
                    function (record) {
                        return propertyValues.indexOf(record[propertyName]) !== -1 && p_filteringFunction(record);
                    }
                );
            }
            else {
                var dalException = new MFDalException(this, 'NoSql query execution failed');
                dalException.query = 'SELECT * FROM ' + objectStoreName;
                dalException.queryData = propertyValues;

                try {
                    var results = [];
                    var onSuccess = function (deferredElement, event) {
                        var cursor = event.target.result;
                        if (cursor) {
                            if (p_filteringFunction(cursor.value)) {
                                results.push(cursor.value);
                            }
                            cursor.continue();
                        } else {
                            deferredElement.resolve();
                        }
                    };

                    var onError = function (deferredElement, event) {
                        deferredElement.reject(event);
                    };

                    var promises = [];
                    for (var i = 0; i < propertyValues.length; ++i) {
                        var deferredElement = $qSync.defer();
                        var singleKeyRange = engine.IDBKeyRange.only(propertyValues[i]);

                        var indexCursor = objStoreIndex.openCursor(singleKeyRange);

                        indexCursor.onsuccess = onSuccess.bind(null, deferredElement);
                        indexCursor.onerror = onError.bind(null, deferredElement);
                        promises.push(deferredElement.promise);
                    }

                    $qSync.all(promises).then(function () {
                        deferred.resolve(results);
                    }, function (errorEvent) {
                        dalException.apiError = errorEvent.target.error;
                        console.error(dalException.apiError);
                        console.error(dalException);
                        context.addError(dalException.toString());
                        context.rollback = true;
                        deferred.reject(dalException);
                    });
                } catch (e) {
                    if (e.code === window.DOMException.NOT_FOUND_ERR) {
                        return MFDalIndexedDB.findByFilter(
                            context,
                            objectStoreName,
                            function (record) {
                                return propertyValues.indexOf(record[propertyName]) !== -1 && p_filteringFunction(record);
                            }
                        );
                    } else {
                        dalException.apiError = e;
                        console.error(dalException);
                        context.addError(dalException.toString());
                        context.rollback = true;
                        deferred.reject(dalException);
                    }
                }
                return deferred.promise;
            }
        };


        /*
         =======================================================
         ====  SAVE DATA
         =======================================================
         */

        MFDalIndexedDB.insert = function (context, objectStoreName, data, idAttributeName) {
            data = Array.isArray(data) ? data : [data];

            var deferred = $qSync.defer();
            var objectStore = context.dbTransaction.objectStore(objectStoreName);

            var onSuccess = function (deferredElement, event) {
                deferredElement.resolve();
            };
            var onError = function (deferredElement, event) {
                deferredElement.reject(event);
            };

            var dalException = new MFDalException(this, 'NoSql query execution failed');
            dalException.queryData = data;
            var queryDescr = '';

            var promises = [];
            for (var idx = 0; idx < data.length; ++idx) {
                var deferredElement = $qSync.defer();
                queryDescr = '[MFDalIndexedDB] insert into ' + objectStoreName + ' where key = ' + data[idx][idAttributeName];
                console.log(queryDescr);
                var request = objectStore.add(data[idx], data[idx][idAttributeName]);
                request.onsuccess = onSuccess.bind(null, deferredElement);
                request.onerror = onError.bind(null, deferredElement);
                promises.push(deferredElement.promise);
            }

            dalException.query = queryDescr;

            $qSync.all(promises).then(function (results) {
                deferred.resolve(results);
            }, function (errorEvent) {
                dalException.apiError = errorEvent.target.error;
                console.error(dalException.apiError);
                console.error(dalException);
                context.addError(dalException.toString());
                context.rollback = true;
                deferred.reject(dalException);
            });

            return deferred.promise;
        };

        MFDalIndexedDB.save = function (context, objectStoreName, data, idAttributeName) {
            data = Array.isArray(data) ? data : [data];

            var deferred = $qSync.defer();
            var objectStore = context.dbTransaction.objectStore(objectStoreName);

            var onSuccess = function (deferredElement, event) {
                deferredElement.resolve();
            };
            var onError = function (deferredElement, event) {
                deferredElement.reject(event);
            };
            var queryDescr = '';

            var dalException = new MFDalException(this, 'NoSql query execution failed');
            dalException.queryData = data;

            var promises = [];
            for (var i = 0; i < data.length; ++i) {
                var deferredElement = $qSync.defer();
                queryDescr = '[MFDalIndexedDB] save into ' + objectStoreName + ' where key = ' + data[i][idAttributeName];
                console.log(queryDescr);
                var request = objectStore.put(data[i], data[i][idAttributeName]);
                request.onsuccess = onSuccess.bind(null, deferredElement);
                request.onerror = onError.bind(null, deferredElement);
                promises.push(deferredElement.promise);
            }
            dalException.query = queryDescr;

            $qSync.all(promises).then(function (results) {
                deferred.resolve(results);
            }, function (errorEvent) {
                dalException.apiError = errorEvent.target.error;
                console.error(dalException.apiError);
                console.error(dalException);
                context.addError(dalException.toString());
                context.rollback = true;
                deferred.reject(dalException);
            });

            return deferred.promise;
        };

        MFDalIndexedDB.remove = function (context, objectStoreName, keys) {
            keys = Array.isArray(keys) ? keys : [keys];

            var deferred = $qSync.defer();
            var objectStore = context.dbTransaction.objectStore(objectStoreName);
            var results = {};
            var onSuccess = function (key, deferredElement, event) {
                results[key] = event;
                deferredElement.resolve();
            };
            var onError = function (key, deferredElement, event) {
                results[key] = null;
                deferredElement.reject(event);
            };
            var dalException = new MFDalException(this, 'NoSql query execution failed');
            dalException.query = 'delete from ' + objectStoreName;
            dalException.queryData = keys;

            var promises = [];
            for (var i = 0; i < keys.length; ++i) {
                var deferredElement = $qSync.defer();
                var request = objectStore['delete'](keys[i]);
                request.onsuccess = onSuccess.bind(null, keys[i], deferredElement);
                request.onerror = onError.bind(null, keys[i], deferredElement);
                promises.push(deferredElement.promise);
            }

            $qSync.all(promises).then(function () {
                deferred.resolve(results);
            }, function (errorEvent) {
                dalException.apiError = errorEvent.target.error;
                console.error(dalException.apiError);
                console.error(dalException);
                context.addError(dalException.toString());
                context.rollback = true;
                deferred.reject(dalException);
            });

            return deferred.promise;
        };

        MFDalIndexedDB.getLastId = function (context, objectStoreName) {
            var deferred = $qSync.defer();
            var objectStore = context.dbTransaction.objectStore(objectStoreName);
            var id = -1;
            objectStore.openCursor(null, 'next').onsuccess = function (event) {
                var cursor = event.target.result;
                if (cursor) {
                    id = cursor.primaryKey < 0 ? cursor.primaryKey : -1;
                }
                console.log('get last id of ' + objectStoreName + ' = ' + id);
                deferred.resolve(id);
            };
            return deferred.promise;
        };

        MFDalIndexedDB.prepare = function (context, objectStoreNames) {
            if (objectStoreNames.length > 0) {
                context.dbTransaction.resolve(objectStoreNames);
            }
        };

        return MFDalIndexedDB;
    }]);