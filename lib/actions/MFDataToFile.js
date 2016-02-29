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
 * MFDataToFileAction
 * Information parameters
 * { keySessionStorage: 'key',
 *   filePath: 'path file'
 * }
 */
'use strict';
angular.module('mfcore').factory('MFDataToFileAction', ['$q', 'MFCordovaFile', 'MFBaseAction',
    function ($q, MFCordovaFile, MFBaseAction) {
        return {
            createInstance: function () {

                var action = MFBaseAction.createInstance({
                    atomic: true,
                    database: false,
                    type: 'MFDataToFileAction'

                });

                /**
                 * Execute operations
                 **/
                action.doAction = function (context, params) {

                    var that = this;
                    console.assert(!angular.isUndefinedOrNull(params), 'MFDataToFileAction.doAction() : Params should not be empty');

                    try {
                        $q.when(true).then(function () {
                            return MFCordovaFile.isExistFileSystem();
                        }).then(function () {
                            return MFCordovaFile.isExistFile(params.fileName).then(function () {
                                //supprimer le fichier
                                return MFCordovaFile.deleteFile(params.fileName);
                            }, function () {
                                //pas de fichier
                            });
                        }).then(function () {
                            return MFCordovaFile.writeFile(params.fileName, angular.toJson(params.data));
                        }).then(function () {
                            that.resolvePromise(null, context);
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