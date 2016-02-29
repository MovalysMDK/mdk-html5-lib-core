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

angular.module('mfcore').factory('MFInitCreateUserTables',
    ['MFAbstractInitTask', 'MFInitTaskStatus', 'MFSystem', 'MFDatabaseTypeSelector', 'MFDalSqlProxy', 'MFDalNoSqlProxy', 'MFTransactionManager',
        function (MFAbstractInitTask, MFInitTaskStatus, MFSystem, MFDatabaseTypeSelector, MFDalSqlProxy, MFDalNoSqlProxy, MFTransactionManager) {
            var initTask = new MFAbstractInitTask();
            initTask.brief = 'Create user tables';
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

                    MFSystem.getAsset('assets/data/sql/create_usermodel.sql', false).then(function (response) {
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
                        context.daoSession = {};
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
//                context.addError(error);
//                initTask.status = MFInitTaskStatus.FAILED;
                        });
                } else {
                    initTask.status = MFInitTaskStatus.SUCCEEDED;
                }

            };

            initTask.runTaskNoSql = function (context, firstLaunch) {
                //done in "MFInitOpenDatabase"
                initTask.status = MFInitTaskStatus.SUCCEEDED;
            };

            return initTask;
        }]);