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
/**
 * MFInitOpenDataBase
 */

angular.module('mfcore').factory('MFInitOpenDataBase',
    ['MFAbstractInitTask', 'MFInitTaskStatus', 'MFSystem', 'MFDatabaseTypeSelector', 'MFDalSqlProxy', 'MFDalNoSqlProxy','MFSyncPromiseProvider',
        function (MFAbstractInitTask, MFInitTaskStatus, MFSystem, MFDatabaseTypeSelector, MFDalSqlProxy, MFDalNoSqlProxy,$qSync) {

            var initTask = new MFAbstractInitTask();

            initTask.brief = 'Open DataBase';

            initTask.run = function (context, firstLaunch) {

                if (MFDatabaseTypeSelector.isSQL()) {
                    this.runTaskSql(context, firstLaunch);
                }
                else {
                    this.runTaskNoSql(context, firstLaunch);
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
                if(firstLaunch) {
                    MFSystem.getAssets(['assets/data/nosql/create_fwkmodel.json', 'assets/data/nosql/create_usermodel.json'], false).then(
                        function (createStoresScripts) {
                            MFDalNoSqlProxy.initDatabase(createStoresScripts).then(
                                function () {
                                    initTask.status = MFInitTaskStatus.SUCCEEDED;
                                },
                                function (error) {
                                    context.addError(error);
                                    initTask.status = MFInitTaskStatus.FAILED;
                                }
                            );

                        },
                        function (error) {
                            context.addError(error);
                            initTask.status = MFInitTaskStatus.FAILED;
                        }
                    );
                }
                else {
                    MFDalNoSqlProxy.openDatabase().then(
                        function () {
                            initTask.status = MFInitTaskStatus.SUCCEEDED;
                        },
                        function (error) {
                            context.addError(error);
                            initTask.status = MFInitTaskStatus.FAILED;
                        }
                    );
                }
            };

            return initTask;
        }]);