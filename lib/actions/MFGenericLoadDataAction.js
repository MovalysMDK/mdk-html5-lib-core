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
 * GenericLoadDataAction
 */

'use strict';
angular.module('mfcore').factory('MFGenericLoadDataAction', ['MFBaseAction',
    function (MFBaseAction) {
        return {
            createInstance: function () {

                var action = MFBaseAction.createInstance({
                    atomic: true,
                    database: true,
                    type: 'MFGenericLoadDataAction'
                });

                /**
                 * Execute operations
                 **/
                action.doAction = function (context, params) {

                    console.log('MFGenericLoadDataAction.doAction - itemId: ' + params.dataModelId);

                    var that = this;
                    try {
                        // Load specific DataLoader
                        var dataLoader = params.dataLoader;

                        if(!angular.isUndefinedOrNull(dataLoader)){
                            // set entity id to reload
                            if (!angular.isUndefinedOrNullOrEmpty(params.dataModelId) && params.dataModelId !== 'new') {
                                dataLoader.dataModelId = Number(params.dataModelId);
                            }
                            else {
                                dataLoader.dataModelId = -1;
                            }

                            // Call data loader to get Data
                            var promiseDataLoader = dataLoader.reload(context, params);

                            promiseDataLoader.then(function (result) {

                                console.log('[MFGenericLoadDataAction] result:', result.data);

                                that.resolvePromise(result.data, context);
                            }, function (error) {
                                console.error('[MFGenericLoadDataAction] failure', error);

                                that.rejectPromise(error, context);
                            });
                        }else{
                            that.resolvePromise(null, context);
                        }
                    } catch (error) {
                        //Add error message to the context
                        console.error('[MFGenericLoadDataAction] failure', error);
                        //context.addError('Error loading data : ' + error.message);
                        that.rejectPromise(error, context);
                    }
                    return this;
                };

                return action;
            }

        };

    }
]);