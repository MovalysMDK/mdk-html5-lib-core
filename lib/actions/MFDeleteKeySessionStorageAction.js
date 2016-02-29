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
 * MFDeleteKeySessionStorageAction
 * Information parameters
 *  {keysSessionStorage: ['key1', 'key2', 'key3', 'key4',; ...];
 */

'use strict';
angular.module('mfcore').factory('MFDeleteKeySessionStorageAction', ['MFBaseAction',
    function (MFBaseAction) {
        return {
            createInstance: function () {

                var action = MFBaseAction.createInstance({
                    atomic: true,
                    database: false,
                    type: 'MFDeleteKeySessionStorageAction'

                });

                /**
                 * Execute operations
                 **/
                action.doAction = function (context, params) {

                    console.assert(!angular.isUndefinedOrNull(params), 'MFDeleteKeySessionStorageAction.doAction() : Params should not be empty');

                    var that = this;

                    if(!Modernizr.sessionstorage){
                        that.rejectPromise('Your browser does not support the HTML5 feature "Session Storage"', context);
                    }
                    else {

                        try {
                            angular.forEach(params.keysSessionStorage, function (value, key) {
                                sessionStorage.removeItem(value);
                            });
                            that.resolvePromise(null, context);
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