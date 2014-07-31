'use strict';
/**
 * @file MFInitCreateMDKTables.js
 * @brief Creates tables in the database if it's the firstlaunch
 * @author Jean-Daniel Borowy <jeandaniel.borowy@sopra.com>
 * @date 01/04/2014
 *
 * Copyright (c) 2014 Sopra Group. All rights reserved.
 *
 */

angular.module('mfcore').factory('MFInitCreateMDKTables',
    ['MFAbstractInitTask', 'MFInitTaskStatus', 'MFSystem', 'MFDalSupport', 'MFDalSqlProxy', 'MFDalNoSqlProxy', 'MFTransactionManager',
        function (MFAbstractInitTask, MFInitTaskStatus, MFSystem, MFDalSupport, MFDalSqlProxy, MFDalNoSqlProxy, MFTransactionManager) {

	var initTask = new MFAbstractInitTask();
	initTask.brief = 'Create tables';
	initTask.needDataBaseConnection = true;

	initTask.run = function(context, firstLaunch) {

        switch (MFDalSupport.getDalSupportBase()) {
            case 'WEBSQL':
            case 'SQLITE':
                this.runTaskSql (context, firstLaunch);
                break;
            case 'NOSQL':
                this.runTaskNoSql (context, firstLaunch);
                break;
            default:{
                context.addError('unknown type of database');
                initTask.status = MFInitTaskStatus.FAILED;
            }
        }

	};


    initTask.runTaskSql = function(context, firstLaunch){

        if (firstLaunch) {

            MFSystem.getAsset('assets/data/sql/create_fwkmodel.sql', false).then(function(response) {
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
                context.addError(error);
                initTask.status = MFInitTaskStatus.FAILED;
            }
            );
        } else {
            initTask.status = MFInitTaskStatus.SUCCEEDED;
        }

    };

    initTask.runTaskNoSql = function(context, firstLaunch){
        initTask.status = MFInitTaskStatus.SUCCEEDED;
    };

	return initTask;
}]);