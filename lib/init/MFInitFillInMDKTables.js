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
    ['MFAbstractInitTask', 'MFInitTaskStatus', 'MFSystem', 'MFDalSupport', 'MFDalSqlProxy', 'MFDalNoSqlProxy', 'MFTransactionManager', 'MFSyncPromiseProvider',
        function (MFAbstractInitTask, MFInitTaskStatus, MFSystem, MFDalSupport, MFDalSqlProxy, MFDalNoSqlProxy, MFTransactionManager, $qSync) {
            var initTask = new MFAbstractInitTask();
            initTask.brief = 'Fill in MDK tables';
            initTask.needDataBaseConnection = true;

            initTask.run = function (context, firstLaunch) {

                switch (MFDalSupport.getDalSupportBase()) {
                    case 'WEBSQL':
                    case 'SQLITE':
                        this.runTaskSql(context, firstLaunch);
                        break;
                    case 'NOSQL':
                        this.runTaskNoSql(context, firstLaunch);
                        break;
                    default:
                    {
                        context.addError('unknown type of database');
                        initTask.status = MFInitTaskStatus.FAILED;
                    }
                }

            };


            initTask.runTaskSql = function (context, firstLaunch) {

                if (firstLaunch) {

                    MFSystem.getAsset('assets/data/sql/create_fwkdata.sql', false).then(function (response) {
                            var dirtyRequests = response.data.split(/;/);
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
                            response.data = typeof response.data === 'object' ? response.data : {};
                            var promises = [];
                            var objectStoreNames = [];
                            var objectStoreName;

                            for (objectStoreName in response.data) {
                                if (response.data.hasOwnProperty(objectStoreName)) {
                                    objectStoreNames.push(objectStoreName);
                                }
                            }
                            MFDalNoSqlProxy.prepare(context, objectStoreNames,true);
                            console.info('response.data: ', response.data);
                            for (objectStoreName in response.data) {
                                if (response.data.hasOwnProperty(objectStoreName)) {
                                    for (var i = 0; i < response.data[objectStoreName].length; ++i) {
                                        promises.push(MFDalNoSqlProxy.insert(context, objectStoreName, response.data[objectStoreName][i]));
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