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
 * MFGenericLoadFileToSessionStorage
 * Information parameters
 * { keySessionStorage: 'key',
 *   filePath: 'path file'
 * }
 */
'use strict';
angular.module('mfcore').factory('MFLoadFileToSessionStorageAction', ['$q', 'MFBaseAction', 'MFSystem',
    function ($q, MFBaseAction, MFSystem) {
        return {
            createInstance: function () {

                var action = MFBaseAction.createInstance({
                    atomic: true,
                    database: false,
                    type: 'MFLoadFileToSessionStorageAction'
                });

                /**
                 * Execute operations
                 **/
                action.doAction = function (context, params) {

                    console.assert(!angular.isUndefinedOrNull(params), 'MFLoadFileToSessionStorageAction.doAction() : Params should not be empty');

                    var that = this;

                    var getExtension = function (filename) {
                        var parts = filename.split('.');
                        return (parts[(parts.length - 1)]);
                    };

                    if(!Modernizr.sessionstorage){
                        that.rejectPromise('Your browser does not support the HTML5 feature "Session Storage"', context);
                    }
                    else {

                        try {
                            var tabPromiseFilePath = [];
                            angular.forEach(params.filesPath, function (value, key) {
                                tabPromiseFilePath.push(MFSystem.getAsset(value.filePath, false));
                            });

                            $q.all(tabPromiseFilePath).then(function (values) {
                                angular.forEach(values, function (value, key) {
                                    if (value !== '') {
                                        if (getExtension(params.filesPath[key].filePath) === 'json') {
                                            if (sessionStorage.getItem(params.keySessionStorage) === null) {
                                                sessionStorage.setItem(params.keySessionStorage, angular.toJson(value));
                                            } else {
                                                sessionStorage.setItem(params.keySessionStorage, angular.toJson(angular.fromJson(sessionStorage.getItem(params.keySessionStorage)).concat(angular.fromJson(value))));
                                            }
                                        } else {
                                            sessionStorage.setItem(params.keySessionStorage, value);
                                        }
                                    }
                                });
                                that.resolvePromise(null, context);
                            }, function () {
                                //If file is empty create key only
                                sessionStorage.setItem(params.keySessionStorage, '');
                                that.resolvePromise(null, context);
                            });

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