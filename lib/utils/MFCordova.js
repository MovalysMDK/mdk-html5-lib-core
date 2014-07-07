'use strict';
/**
 * @file MFCordova.js
 * @brief
 * @date 22/01/2014
 *
 * Copyright (c) 2014 Sopra Group. All rights reserved.
 *
 */

var MFCordova = angular.module('mfcore');

MFCordova.factory('MFCordova', ['MFException', 'MFAbstractEnum', '$q', function (MFException, MFAbstractEnum, $q) {
    var MFCordova = function MFCordova() {};

    var MFCordovaStatus = function MFCordovaStatus() {};
    MFAbstractEnum.defineEnum(MFCordovaStatus, ['PENDING', 'NOT_AVAILABLE', 'AVAILABLE']);
    Object.defineProperty(MFCordova, 'Status', {
        value: MFCordovaStatus,
        writable: false,
        configurable: false,
        enumerable: true
    });

    var _status = MFCordova.Status.PENDING;
    Object.defineProperty(MFCordova, 'status', {
        set: function(value) {
            if (_status === MFCordova.Status.PENDING) {
                _status = value;
                flush();
            }
        },
        get: function(){
            return _status;
        },
        configurable: false,
        enumerable: true
    });

    var cordovaAvailableCallbacks = [];
    var cordovaNotAvailableCallbacks = [];
    var flush = function flush() {
        var callbacks = null;
        if (_status === MFCordova.Status.AVAILABLE) {
            callbacks = cordovaAvailableCallbacks;
        } else if (_status === MFCordova.Status.NOT_AVAILABLE) {
            callbacks = cordovaNotAvailableCallbacks;
        }
        for (var i in callbacks) {
            callbacks[i].run.apply(null, callbacks[i].args);
        }
    };

    MFCordova.onCordovaReady = function(availableCallBack, notAvailableCallBack) {
        var args = Array.prototype.slice.call(arguments, 0);
        args.splice(2, args.length - 2);

        switch (_status) {
            case MFCordova.Status.AVAILABLE:
                availableCallBack.apply(null, args);
                break;
            case MFCordova.Status.NOT_AVAILABLE:
                notAvailableCallBack.apply(null, args);
                break;
            case MFCordova.Status.PENDING:
                cordovaAvailableCallbacks.push({
                                                   run: availableCallBack,
                                                   args: args
                                               });
                cordovaNotAvailableCallbacks.push({
                                                      run: notAvailableCallBack,
                                                      args: args
                                                  });
                return false;
        }
        return true;
    };

    Object.defineProperty(MFCordova, 'deviceName', {
        get: function() {
            switch (_status) {
                case MFCordova.Status.AVAILABLE:
                    return window.device.platform.toUpperCase();
                case MFCordova.Status.NOT_AVAILABLE:
                    console.log('MFCordova.Status.NOT_AVAILABLE');
                    return 'WEB';
                case MFCordova.Status.PENDING:
                    throw new MFException('The property MFCordova.deviceName should not be called at this time of init.');
            }
        },
        configurable: false,
        enumerable: true
    });

    Object.defineProperty(MFCordova, 'deviceVersion', {
        get: function() {
            switch (_status) {
                case MFCordova.Status.AVAILABLE:
                    return window.device.version.toUpperCase();
                case MFCordova.Status.NOT_AVAILABLE:
                    return '1.0';
                case MFCordova.Status.PENDING:
                    return '1.0';
            }
        },
        configurable: false,
        enumerable: true
    });

    Object.defineProperty(MFCordova, 'deviceUUID', {
        get: function() {
            switch (_status) {
                case MFCordova.Status.AVAILABLE:
                    return window.device.uuid;
                case MFCordova.Status.NOT_AVAILABLE:
                    var time = new Date().getTime();
                    return 'WEB' + time;
                case MFCordova.Status.PENDING:
                    return '';
            }
        },
        configurable: false,
        enumerable: true
    });

    /**
     * detect network connection
     * if web platform return NONE or NETWORK
     * if device return NONE or type of connexion ( UNKNOWN, ETHERNET, WIFI, CELL_2G, CELL_3G, CELL_4G, CELL)
     * if awaiting loading cordova return PENDING
     * @returns {*|string} NONE
     */
    Object.defineProperty(MFCordova, 'detectNetwork', {

        get: function() {
            switch (_status) {
                case MFCordova.Status.AVAILABLE:
                    return navigator.connection.type.toUpperCase();
                case MFCordova.Status.NOT_AVAILABLE:
                    return navigator.onLine ? 'ETHERNET': 'NONE';
                case MFCordova.Status.PENDING:
                    return 'PENDING';
            }
        },
        configurable: false,
        enumerable: true
    });

    MFCordova.isExistFile = function(fileName){
        var deferred = $q.defer();
        window.requestFileSystem(window.PERSISTENT, 0, function(fs) {
            fs.root.getFile(fileName, {create: false}, function(fileEntry) {
                deferred.resolve();
            }, function(error) {
                deferred.reject(error);
            });
        }, function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    MFCordova.writeFile = function(fileName, data){
        var deferred = $q.defer();
        window.requestFileSystem(window.PERSISTENT, 0, function(fs) {
            fs.root.getFile(fileName, {create: true}, function(fileEntry) {
                fileEntry.createWriter(function(fileWriter) {
                    fileWriter.onwriteend = function(e) {
                        deferred.resolve();
                    };
                    fileWriter.onerror = function(error) {
                        deferred.reject(error);
                    };
                    fileWriter.write(data);
                }, function(error) {
                    deferred.reject(error);
                });
            }, function(error) {
                deferred.reject(error);
            });
        }, function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    MFCordova.deleteFile = function(fileName){
        var deferred = $q.defer();
        window.requestFileSystem(window.PERSISTENT, 0, function(fs) {
            fs.root.getFile(fileName, {create: false}, function(fileEntry) {
                fileEntry.remove(function() {
                    deferred.resolve();
                }, function(error) {
                    deferred.reject(error);
                });
            }, function(error) {
                deferred.reject(error);
            });
        }, function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    MFCordova.readFile = function(fileName){
        var deferred = $q.defer();
        window.requestFileSystem(window.PERSISTENT, 0, function(fs) {
            fs.root.getFile(fileName, {}, function(fileEntry) {
                fileEntry.file(function(file) {
                    var reader = new FileReader();
                    reader.onload = function (){
                        deferred.resolve(reader.result);
                    };

                    reader.onprogress = function (){
                    //    console.log('Read progress');
                    };

                    reader.onerror = function (error){
                        deferred.reject(error);
                    };

                    reader.onloadend = function(e) {
                      //  console.log('Read action end');
                    };
                    reader.readAsText(file);
                }, function(error) {
                    deferred.reject(error);
                });
            }, function(error) {
                deferred.reject(error);
            });
        }, function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };


    MFCordova.isExistFileSystem = function(){
        var deferred = $q.defer();
        if(!window.requestFileSystem){
            deferred.reject('This Browser not supported FileSystem');
        }else{
            deferred.resolve();
        }

        return deferred.promise;
    };

    return MFCordova;
}]);