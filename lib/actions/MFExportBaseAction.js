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
/**
 * ExportBase
 */

'use strict';
angular.module('mfcore').factory('MFExportBaseAction', ['MFBaseAction', 'MFSyncPromiseProvider', 'MFDatabaseTypeSelector', 'MFDalSqlProxy', 'MFDalNoSqlProxy',
    function (MFBaseAction, $qSync, MFDatabaseTypeSelector, MFDalSqlProxy, MFDalNoSqlProxy) {
        return {
            createInstance: function () {

                var action = MFBaseAction.createInstance({
                    atomic: false,
                    database: true,
                    type: 'MFExportBaseAction'

                });

                /**
                 * Execute operations
                 **/
                action.doAction = function (context, params) {

                    console.assert(!angular.isUndefinedOrNull(params), 'MFExportBaseAction.doAction() : Params should not be empty');
                    var that = this;
                    var listTable = null;
                    var tabResults = null;
                    var tabPromiseRequests = [];

                    if(!Modernizr.sessionstorage){
                        that.rejectPromise('Your browser does not support the HTML5 feature "Session Storage"', context);
                    }
                    else {
                        try {
                            if (MFDatabaseTypeSelector.isSQL()) {
                                tabResults = [];
                                listTable = angular.fromJson(sessionStorage.getItem(params.keySessionStorageSql));

                                angular.forEach(listTable, function (value, key) {
                                    tabPromiseRequests.push(MFDalSqlProxy.executeQuery(context, 'SELECT * FROM ' + value));
                                });

                                $qSync.all(tabPromiseRequests).then(function (values) {
                                    angular.forEach(values, function (value, key) {
                                        var tabData = [];
                                        for (var j = 0; j < value.rows.length; j++) {
                                            tabData.push(value.rows.item(j));
                                        }
                                        tabResults.push({table: listTable[key], values: tabData});
                                    });
                                    that.resolvePromise(tabResults, context);

                                }, function (error) {
                                    that.rejectPromise(error, context);
                                });

                            } else {
                                tabResults = {};
                                listTable = angular.fromJson(sessionStorage.getItem(params.keySessionStorageNoSql));

                                angular.forEach(listTable, function (value, key) {
                                    tabPromiseRequests.push(MFDalNoSqlProxy.getAll(context, value));
                                });

                                $qSync.all(tabPromiseRequests).then(function (values) {

                                    angular.forEach(values, function (value, key) {
                                        tabResults[listTable[key]] = value;
                                    });
                                    that.resolvePromise(tabResults, context);

                                }, function (error) {
                                    console.log(error);
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