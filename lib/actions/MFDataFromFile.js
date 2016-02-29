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
 * MFDataFromFileAction
 * Information parameters
 * { keySessionStorage: 'key',
 *   filePath: 'path file'
 * }
 */
'use strict';
angular.module('mfcore').factory('MFDataFromFileAction', ['$q', 'MFCordovaFile', 'MFBaseAction',
    function ($q, MFCordovaFile, MFBaseAction) {
        return {
            createInstance: function () {

                var action = MFBaseAction.createInstance({
                    atomic: true,
                    database: false,
                    type: 'MFDataFromFileAction'
                });

                /**
                 * Execute operations
                 **/
                action.doAction = function (context, params) {

                    var that = this;

                    console.assert(!angular.isUndefinedOrNull(params), 'MFDataFromFileAction.doAction() : Params should not be empty');

                    try {

                        $q.when(true).then(function () {
                            return MFCordovaFile.isExistFileSystem();
                        }).then(function () {
                            return MFCordovaFile.readFile(params.fileName);
                        }).then(function (value) {
                            that.resolvePromise(angular.fromJson(value), context);
                        }, function (error) {
                            that.rejectPromise(error, context);
                        });

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