'use strict';
/**
 * @file MFCordova.js
 * @brief
 * @date 22/01/2014
 *
 * Copyright (c) 2014 Sopra Group. All rights reserved.
 *
 */

angular.module('mfcore').factory('MFCordova', ['MFException', 'MFAbstractEnum', '$q', '$window', 'MFCordovaStatusEnum', function (MFException, MFAbstractEnum, $q, $window, MFCordovaStatusEnum) {


    var MFCordova = function MFCordova() {
    };

    /*
     ====================================================
     ==== PROPERTIES ====================================
     */

    var _status = MFCordovaStatusEnum.PENDING;
    var cordovaAvailableCallbacks = [];
    var cordovaNotAvailableCallbacks = [];


    var flush = function flush() {
        var callbacks = null;
        if (_status === MFCordovaStatusEnum.AVAILABLE) {
            callbacks = cordovaAvailableCallbacks;
        } else if (_status === MFCordovaStatusEnum.NOT_AVAILABLE) {
            callbacks = cordovaNotAvailableCallbacks;
        }
        if (!angular.isUndefinedOrNullOrEmpty(callbacks)) {
            for (var i in callbacks) {
                if (callbacks.hasOwnProperty(i)) {
                    callbacks[i].run.apply(null, callbacks[i].args);
                }
            }
        }
    };


    Object.defineProperty(MFCordova, 'status', {
        set: function (value) {
            if (value !== _status) {
                _status = value;
                flush();
            }
        },
        get: function () {
            return _status;
        },
        configurable: false,
        enumerable: true
    });


    /*
     ====================================================
     ==== METHODS ====================================
     */


    MFCordova.onCordovaReady = function (availableCallBack, notAvailableCallBack) {
        var args = Array.prototype.slice.call(arguments, 0);
        args.splice(2, args.length - 2);

        switch (_status) {
            case MFCordovaStatusEnum.AVAILABLE:
                if (angular.isFunction(availableCallBack)) {
                    availableCallBack.apply(null, args);
                }
                break;
            case MFCordovaStatusEnum.NOT_AVAILABLE:
                if (angular.isFunction(notAvailableCallBack)) {
                    notAvailableCallBack.apply(null, args);
                }
                break;
            case MFCordovaStatusEnum.PENDING:
                if (angular.isFunction(availableCallBack)) {
                    cordovaAvailableCallbacks.push({
                        run: availableCallBack,
                        args: args
                    });
                }
                if (angular.isFunction(notAvailableCallBack)) {
                    cordovaNotAvailableCallbacks.push({
                        run: notAvailableCallBack,
                        args: args
                    });
                }
                return false;
            default:
                console.error('Status unknown');
                return false;
        }
        return true;
    };


    /*
     ====================================================
     ==== INIT PROPERTIES ===============================
     */



    MFCordova.onCordovaReady(function available() {
            if (!angular.isUndefinedOrNull($window.StatusBar)) {
                $window.StatusBar.overlaysWebView(false);
            }
            else {
                console.error('check if cordova plugin is installed: $ cordova plugin add https://github.com/apache/cordova-plugin-statusbar.git');
            }
            if (!angular.isUndefinedOrNull(navigator.splashscreen)) {
                navigator.splashscreen.hide();
            }
            else {
                console.error('check if cordova plugin is installed: $ cordova plugin add https://github.com/apache/xxx.git');
            }
        },
        function notAvailable() {
        });


    return MFCordova;
}]);