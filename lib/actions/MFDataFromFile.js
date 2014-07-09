/**
 * MFDataFromFileAction
 * Created by François Cabelguen on 7/04/14.
 */
/**
 * Information parameters
 * { keySessionStorage: 'key',
 *   filePath: 'path file'
 * }
 */
'use strict';
angular.module('mfcore').factory('MFDataFromFileAction', ['$q', 'MFCordovaFile', 'MFBaseAction',
    function($q, MFCordovaFile, MFBaseAction) {
        return {
            createInstance: function() {

                var action = MFBaseAction.createInstance({
                    atomic: true,
                    database: false,
                    type: 'MFDataFromFileAction'
                });

                /** 
                 * Execute operations
                 **/
                action.doAction = function(context, params) {

                    var that = this;

                    console.assert(!angular.isUndefinedOrNull(params), 'MFDataFromFileAction.doAction() : Params should not be empty');

                    try {

                        $q.when(true).then(function(){
                            return MFCordovaFile.isExistFileSystem();
                        }).then(function() {
                            return MFCordovaFile.readFile(params.fileName);
                        }).then(function(value){
                            that.resolvePromise(angular.fromJson(value), context);
                        },function(error){
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