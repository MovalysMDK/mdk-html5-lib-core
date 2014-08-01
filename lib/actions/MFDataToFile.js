/**
 * MFDataToFileAction
 * Created by François Cabelguen on 7/04/14.
 */
/**
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