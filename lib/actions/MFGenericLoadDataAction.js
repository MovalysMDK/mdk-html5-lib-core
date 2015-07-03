/**
 * GenericLoadDataAction
 * Created by Sergio Contreras on 6/03/14.
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