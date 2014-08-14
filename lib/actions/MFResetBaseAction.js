/**
 * ResetBase
 * Created by François Cabelguen on 07/04/14.
 */

'use strict';
angular.module('mfcore').factory('MFResetBaseAction', ['MFBaseAction', 'MFSyncPromiseProvider', 'MFDatabaseTypeSelector', 'MFDalSqlProxy', 'MFDalNoSqlProxy',
    function (MFBaseAction, $qSync, MFDatabaseTypeSelector, MFDalSqlProxy, MFDalNoSqlProxy) {
        return {
            createInstance: function () {

                var action = MFBaseAction.createInstance({
                    atomic: true,
                    database: true,
                    type: 'MFResetBaseAction'
                });

                /**
                 * Execute operations
                 **/
                action.doAction = function (context, params) {

                    console.assert(!angular.isUndefinedOrNull(params), 'MFResetBaseAction.doAction() : Params should not be empty');

                    var that = this;
                    if(!Modernizr.sessionstorage){
                        that.rejectPromise('Your browser does not support the HTML5 feature "Session Storage"', context);
                    }
                    else {

                        try {

                            if (MFDatabaseTypeSelector.isSQL()) {

                                var tabPromiseRequests = [];
                                var listTable = angular.fromJson(sessionStorage.getItem(params.keySessionStorageSql));
                                angular.forEach(listTable, function (value, key) {
                                    tabPromiseRequests.push(MFDalSqlProxy.executeQuery(context, 'SELECT COUNT(*) AS C FROM ' + value));
                                });

                                $qSync.all(tabPromiseRequests).then(function (values) {
                                    var tabPromiseDeleteRequests = [];
                                    angular.forEach(values, function (value, key) {
                                        if (value.rows.item(0).C) {
                                            tabPromiseDeleteRequests.push(MFDalSqlProxy.executeQuery(context, 'DELETE FROM ' + listTable[key]));
                                        }
                                    });

                                    $qSync.all(tabPromiseDeleteRequests).then(function () {
                                        that.resolvePromise(null, context);
                                    }, function (error) {
                                        that.rejectPromise(error, context);
                                    });

                                }, function (error) {
                                    that.rejectPromise(error, context);

                                });

                            } else { //Default NOSQL

                                var tabPromiseObject = [];
                                var listObject = angular.fromJson(sessionStorage.getItem(params.keySessionStorageNoSql));
                                angular.forEach(listObject, function (value, key) {
                                    tabPromiseObject.push(MFDalNoSqlProxy.clearObjectStore(context, value));
                                });

                                $qSync.all(tabPromiseObject).then(function () {
                                    that.resolvePromise(null, context);
                                }, function (error) {
                                    that.rejectPromise(error, context);
                                });
                            }

                        } catch (error) {
                            that.rejectPromise(error, context);
                        }
                    }
                    return this;
                };

                return action;
            }

        };

    }
]);