'use strict';
/**
 * @file MFCordova.js
 * @brief
 * @date 22/01/2014
 *
 * Copyright (c) 2014 Sopra Group. All rights reserved.
 *
 */

angular.module('mfcore').factory('MFCordova', ['MFException', 'MFAbstractEnum', '$q','MFCordovaStatusEnum', function (MFException, MFAbstractEnum, $q,MFCordovaStatusEnum) {


    var MFCordova = function MFCordova() {
    };

    /*
    ====================================================
    ==== PROPERTIES ====================================
     */

    var _status = MFCordovaStatusEnum.PENDING;
    Object.defineProperty(MFCordova, 'status', {
        set: function(value) {
            if (_status === MFCordovaStatusEnum.PENDING && value !== _status) {
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



    var _deviceName = 'WEB';
    Object.defineProperty(MFCordova, 'deviceName', {
        get: function() {
            return _deviceName;
        },
        configurable: false,
        enumerable: true
    });

    var _deviceVersion = '1.0';
    Object.defineProperty(MFCordova, 'deviceVersion', {
        get: function() {
            return _deviceVersion;
        },
        configurable: false,
        enumerable: true
    });

    var _deviceUUID = 'WEB'+ new Date().getTime();
    Object.defineProperty(MFCordova, 'deviceUUID', {
        get: function() {
            return _deviceUUID;
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
    var _detectNetwork = (navigator.onLine ? 'ETHERNET': 'NONE');
    Object.defineProperty(MFCordova, 'detectNetwork', {

        get: function() {
            return _detectNetwork;
        },
        configurable: false,
        enumerable: true
    });


    /*
     ====================================================
     ==== METHODS ====================================
     */


    MFCordova.onCordovaReady = function(availableCallBack, notAvailableCallBack) {
        var args = Array.prototype.slice.call(arguments, 0);
        args.splice(2, args.length - 2);

        switch (_status) {
            case MFCordovaStatusEnum.AVAILABLE:
                if(angular.isFunction(availableCallBack)){
                    availableCallBack.apply(null, args);
                }
                break;
            case MFCordovaStatusEnum.NOT_AVAILABLE:
                if(angular.isFunction(notAvailableCallBack)) {
                    notAvailableCallBack.apply(null, args);
                }
                break;
            case MFCordovaStatusEnum.PENDING:
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

    var cordovaAvailableCallbacks = [];
    var cordovaNotAvailableCallbacks = [];

    var flush = function flush() {
        var callbacks = null;
        if (_status === MFCordovaStatusEnum.AVAILABLE) {
            callbacks = cordovaAvailableCallbacks;
        } else if (_status === MFCordovaStatusEnum.NOT_AVAILABLE) {
            callbacks = cordovaNotAvailableCallbacks;
        }
        for (var i in callbacks) {
            if(angular.isFunction(callbacks[i])) {
                callbacks[i].run.apply(null, callbacks[i].args);
            }
        }
    };


    /*
     ====================================================
     ==== INIT PROPERTIES ===============================
     */

    MFCordova.onCordovaReady(function available(){
            if(window.device && angular.isString(window.device.platform)){
                _deviceName = window.device.platform.toUpperCase();
                _deviceUUID = window.device.uuid;
                _deviceVersion = window.device.version.toUpperCase();
                _detectNetwork = navigator.connection.type.toUpperCase();
            }
            else {
                console.error('check if cordova plugin is installed: cordova plugin add https://github.com/apache/cordova-plugin-device.git');
            }
    },
    function notAvailable(){});


    MFCordova.onCordovaReady(function available(){
            if(!angular.isUndefinedOrNull(window.StatusBar)){
                window.StatusBar.overlaysWebView(false);
            }
            else {
                console.error('check if cordova plugin is installed: $ cordova plugin add https://github.com/apache/cordova-plugin-statusbar.git');
            }
        },
        function notAvailable(){});



    return MFCordova;
}]);