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
'use strict';

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