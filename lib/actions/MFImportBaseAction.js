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
 * ImportBase
 */

'use strict';
angular.module('mfcore').factory('MFImportBaseAction', ['MFBaseAction', 'MFSyncPromiseProvider', 'MFDatabaseTypeSelector', 'MFDalSqlProxy', 'MFDalNoSqlProxy',
    function (MFBaseAction, $qSync, MFDatabaseTypeSelector, MFDalSqlProxy, MFDalNoSqlProxy) {
        return {
            createInstance: function () {

                var action = MFBaseAction.createInstance({
                    atomic: true,
                    database: true,
                    type: 'MFImportBaseAction'
                });

                /**
                 * Execute operations
                 **/
                action.doAction = function (context, params) {

                    console.assert(!angular.isUndefinedOrNull(params), 'MFImportBaseAction.doAction() : Params should not be empty');

                    var that = this;
                    var tabPromiseRequests = [];

                    try {
                        if (MFDatabaseTypeSelector.isSQL()) {

                            angular.forEach(params.data, function (value, key) { //Loop for Table
                                if (value.values.length > 0) {
                                    for (var j = 0; j < value.values.length; j++) { //Loop for Data

                                        //create request
                                        var keyEntries = '';
                                        var valueEntries = [];
                                        var marksPoints = '';

                                        var tabKey = Object.keys(value.values[j]);

                                        for (key in value.values[j]) {
                                            if (value.values[j].hasOwnProperty(key)) {

                                                if (tabKey[tabKey.length - 1] === key) {
                                                    keyEntries += key;
                                                    marksPoints += '?';
                                                } else {
                                                    keyEntries += key + ',';
                                                    marksPoints += '?,';
                                                }
                                                valueEntries.push(value.values[j][key]);
                                            }
                                        }
                                        tabPromiseRequests.push(MFDalSqlProxy.executeQuery(context, 'INSERT INTO ' + value.table + ' (' + keyEntries + ') VALUES (' + marksPoints + ');', valueEntries));
                                    }
                                }

                            });


                            $qSync.all(tabPromiseRequests).then(function (values) {
                                that.resolvePromise(null, context);
                            }, function (error) {
                                that.rejectPromise(error, context);
                            });

                        } else {
                            angular.forEach(params.data, function (value, key) {
                                if (value.length > 0) {
                                    for (var i = 0; i < value.length; ++i) {
                                        tabPromiseRequests.push(MFDalNoSqlProxy.insert(context, key, value[i]));
                                    }
                                }
                            });

                            $qSync.all(tabPromiseRequests).then(function (values) {
                                that.resolvePromise(null, context);
                            }, function (error) {
                                that.rejectPromise(error, context);
                            });
                        }

                    } catch (error) {
                        that.rejectPromise(error, context);
                    }
                    return this;
                };

                return action;
            }

        };

    }
]);