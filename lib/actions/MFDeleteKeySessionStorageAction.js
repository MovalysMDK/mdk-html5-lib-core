/**
 * MFDeleteKeySessionStorageAction
 * Created by François Cabelguen on 7/04/14.
 */

/**
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
                    try {
                        angular.forEach(params.keysSessionStorage, function (value, key) {
                            sessionStorage.removeItem(value);
                        });
                        that.resolvePromise(null, context);
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