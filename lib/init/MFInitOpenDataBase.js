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