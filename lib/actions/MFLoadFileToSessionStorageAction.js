/**
 * MFGenericLoadFileToSessionStorage
 * Created by François Cabelguen on 7/04/14.
 */
/**
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