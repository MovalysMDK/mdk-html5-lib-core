'use strict';
/**
 * @file MFInitFillInUserTables.js
 * @brief Fill in tables in the database if it's the firstlaunch
 * @author Jean-Daniel Borowy <jeandaniel.borowy@sopra.com>
 * @date 01/04/2014
 *
 * Copyright (c) 2014 Sopra Group. All rights reserved.
 *
 */

angular.module('mfcore').factory('MFInitFillInUserTables',
    ['MFSyncPromiseProvider', 'MFAbstractInitTask', 'MFInitTaskStatus', 'MFSystem', 'MFDalSupport', 'MFDalSqlProxy', 'MFDalNoSqlProxy', 'MFTransactionManager', 'MFMappingHelper', '$injector',
        function ($qSync, MFAbstractInitTask, MFInitTaskStatus, MFSystem, MFDalSupport, MFDalSqlProxy, MFDalNoSqlProxy, MFTransactionManager, MFMappingHelper, $injector) {
            var initTask = new MFAbstractInitTask();
            initTask.brief = 'Fill in user tables';
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
                        initTask.status = MFInitTaskStatus.FAILED;
                }

            };


            initTask.runTaskSql = function (context, firstLaunch) {

                if (firstLaunch) {

                    MFSystem.getAsset('assets/data/sql/create_userdata.sql', false).then(function (response) {
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

                        MFTransactionManager.run(context, function(context, param) {
                            MFDalSqlProxy.executeQueries(context, requests).then(function() {
                                initTask.status = MFInitTaskStatus.SUCCEEDED;
                            }, function(error) {
                                context.addError(error);
                                initTask.status = MFInitTaskStatus.FAILED;
                            });
                        }, function(error) {
                            context.addError(error);
                            initTask.status = MFInitTaskStatus.FAILED;
                        }, {});
                    },
                    function(error){
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
                    MFSystem.getAsset('assets/data/nosql/create_userdata.json', false).then(function(response) {
                        MFTransactionManager.run(context, function(context, param) {
                            response.data = typeof response.data === 'object' ? response.data : {};
                            var promises = [];
                            var objectStoreNames = [];
                            var objectStoreName;
                            for (objectStoreName in response.data) {
                                if (response.data.hasOwnProperty(objectStoreName)) {
                                    objectStoreNames.push(objectStoreName);
                                }
                            }
                            console.log('will prepare object stores',objectStoreNames);
                            MFDalNoSqlProxy.prepare(context, objectStoreNames);
                            console.info('response.data: ', objectStoreNames);
                            for (objectStoreName in response.data) {
                                if (response.data.hasOwnProperty(objectStoreName)) {
                                    var elements = response.data[objectStoreName];
                                    var idAttributeName = MFMappingHelper.getLeftIdAttribute($injector.get(objectStoreName + 'DaoMapping').mappingNoSql);
                                    for (var i = 0; i < elements.length; ++i) {
                                        promises.push(MFDalNoSqlProxy.insert(context, objectStoreName, elements[i], idAttributeName));
                                    }
                                }
                            }
                            if (promises.length > 0) {
                                $qSync.all(promises).then(function(results) {
                                    initTask.status = MFInitTaskStatus.SUCCEEDED;
                                });
                            } else {
                                initTask.status = MFInitTaskStatus.SUCCEEDED;
                            }
                        }, function(error) {
                            context.addError(error);

                            initTask.status = MFInitTaskStatus.FAILED;
                        }, {}, context);
                    },
                    function(error){
                        context.addError(error);
                        initTask.status = MFInitTaskStatus.FAILED;
                    });
                } else {
                    initTask.status = MFInitTaskStatus.SUCCEEDED;
                }
            };


            return initTask;
        }]);