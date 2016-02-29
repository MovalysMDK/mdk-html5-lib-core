/**
 * Copyright (C) 2016 Sopra Steria Group (movalys.support@soprasteria.com)
 *
 * This file is part of Movalys MDK.
 * Movalys MDK is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * Movalys MDK is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 * You should have received a copy of the GNU Lesser General Public License
 * along with Movalys MDK. If not, see <http://www.gnu.org/licenses/>.
 */
'use strict';

angular.module('mfcore').factory('MFInitFillInUserTables',
    ['MFSyncPromiseProvider', 'MFAbstractInitTask', 'MFInitTaskStatus', 'MFSystem', 'MFDatabaseTypeSelector', 'MFDalSqlProxy', 'MFDalNoSqlProxy', 'MFTransactionManager', 'MFMappingHelper', '$injector',
        function ($qSync, MFAbstractInitTask, MFInitTaskStatus, MFSystem, MFDatabaseTypeSelector, MFDalSqlProxy, MFDalNoSqlProxy, MFTransactionManager, MFMappingHelper, $injector) {
            var initTask = new MFAbstractInitTask();
            initTask.brief = 'Fill in user tables';
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

                    MFSystem.getAsset('assets/data/sql/create_userdata.sql', false).then(function (response) {
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

                        MFTransactionManager.run(context, function(context, param) {
                            MFDalSqlProxy.executeQueries(context, requests).then(function() {
                                initTask.status = MFInitTaskStatus.SUCCEEDED;
                            }, function(error) {
                                context.addError(error);
                                initTask.status = MFInitTaskStatus.FAILED;
                            });
                        }, function(error) {
                            context.daoSession = {};
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
                            console.assert(angular.isUndefinedOrNull(response) || !angular.isArray(response),'create_userdata.json should be like {store1:[rec11,rec12], store2:[rec21,rec22]}');
                            response = typeof response === 'object' ? response : {};
                            var promises = [];
                            var objectStoreNames = [];
                            var objectStoreName;
                            for (objectStoreName in response) {
                                if (response.hasOwnProperty(objectStoreName)) {
                                    console.assert(angular.isArray(response[objectStoreName]),'create_userdata.json should be like {store1:[rec11,rec12], store2:[rec21,rec22]}');
                                    objectStoreNames.push(objectStoreName);
                                }
                            }
                            console.log('will prepare object stores',objectStoreNames);
                            MFDalNoSqlProxy.prepare(context, objectStoreNames, true);
                            console.info('response: ', objectStoreNames);
                            for (objectStoreName in response) {
                                if (response.hasOwnProperty(objectStoreName)) {
                                    var elements = response[objectStoreName];
                                    var idAttributeName = MFMappingHelper.getLeftIdAttribute($injector.get(objectStoreName + 'DaoMapping').mappingNoSql);
                                    promises.push(MFDalNoSqlProxy.insert(context, objectStoreName, elements, idAttributeName));
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
                            context.daoSession = {};
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