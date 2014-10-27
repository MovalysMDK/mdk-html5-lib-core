'use strict';
/**
 * @file MFInitFillInMDKTables.js
 * @brief Fill in tables in the database if it's the firstlaunch
 * @author Jean-Daniel Borowy <jeandaniel.borowy@sopra.com>
 * @date 01/04/2014
 *
 * Copyright (c) 2014 Sopra Group. All rights reserved.
 *
 */

angular.module('mfcore').factory('MFInitFillInMDKTables',
    ['MFAbstractInitTask', 'MFInitTaskStatus', 'MFSystem', 'MFDatabaseTypeSelector', 'MFDalSqlProxy', 'MFDalNoSqlProxy', 'MFTransactionManager', 'MFSyncPromiseProvider',
        function (MFAbstractInitTask, MFInitTaskStatus, MFSystem, MFDatabaseTypeSelector, MFDalSqlProxy, MFDalNoSqlProxy, MFTransactionManager, $qSync) {
            var initTask = new MFAbstractInitTask();
            initTask.brief = 'Fill in MDK tables';
            initTask.needDataBaseConnection = true;

            initTask.run = function (context, firstLaunch) {

                if (MFDatabaseTypeSelector.isSQL()) {
                    this.runTaskSql(context, firstLaunch);
                }
                else {
                    this.runTaskNoSql(context, firstLaunch);
                }

            };


            initTask.runTaskSql = function (context, firstLaunch) {

                if (firstLaunch) {

                    MFSystem.getAsset('assets/data/sql/create_fwkdata.sql', false).then(function (response) {
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
                            MFTransactionManager.run(context, function (context, param) {
                                MFDalSqlProxy.executeQueries(context, requests).then(function () {
                                    initTask.status = MFInitTaskStatus.SUCCEEDED;
                                }, function (reason) {
                                    //error callback called before "doAfterRollback"
                                });
                            }, function (error) {
                                context.daoSession = {};
                                context.addError(error);
                                initTask.status = MFInitTaskStatus.FAILED;
                            }, {});
                        },
                        function (error) {
                            context.addWarning(error);
                            initTask.status = MFInitTaskStatus.SUCCEEDED;
//                      context.addError(error);
//                      initTask.status = MFInitTaskStatus.FAILED;
                        });
                } else {
                    initTask.status = MFInitTaskStatus.SUCCEEDED;
                }

            };

            initTask.runTaskNoSql = function (context, firstLaunch) {
                if (firstLaunch) {
                    MFSystem.getAsset('assets/data/nosql/create_fwkdata.json', false).then(function (response) {
                        MFTransactionManager.run(context, function (context, param) {
                            response = typeof response === 'object' ? response : {};
                            var promises = [];
                            var objectStoreNames = [];
                            var objectStoreName;

                            for (objectStoreName in response) {
                                if (response.hasOwnProperty(objectStoreName)) {
                                    objectStoreNames.push(objectStoreName);
                                }
                            }
                            MFDalNoSqlProxy.prepare(context, objectStoreNames,true);
                            console.info('response: ', response);
                            for (objectStoreName in response) {
                                if (response.hasOwnProperty(objectStoreName)) {
                                    for (var i = 0; i < response[objectStoreName].length; ++i) {
                                        promises.push(MFDalNoSqlProxy.insert(context, objectStoreName, response[objectStoreName][i]));
                                    }
                                }
                            }
                            $qSync.all(promises).then(function (results) {
                                initTask.status = MFInitTaskStatus.SUCCEEDED;
                            }, function(error) {
                                context.addError(error);
                                initTask.status = MFInitTaskStatus.FAILED;
                            });
                        }, function (error) {
                            context.addError(error);
                            context.daoSession = {};
                            initTask.status = MFInitTaskStatus.FAILED;
                        }, {}, context);
                    }, function(error) {
                        context.addError(error);
                        initTask.status = MFInitTaskStatus.FAILED;
                    });
                } else {
                    initTask.status = MFInitTaskStatus.SUCCEEDED;
                }
            };
            return initTask;
        }]);