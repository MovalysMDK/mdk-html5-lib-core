'use strict';
/**
 * @file MFDeviceInfo.js
 * @brief
 * @date 22/01/2014
 *
 * Copyright (c) 2014 Sopra Group. All rights reserved.
 *
 */

angular.module('mfcore').factory('MFDeviceInfo', ['MFException', 'MFAbstractEnum', '$q', '$window', 'MFCordova','MFConfigurationService', function (MFException, MFAbstractEnum, $q, $window, MFCordova,MFConfigurationService) {


    var MFDeviceInfo = function MFDeviceInfo() {
        Object.defineProperty(this, 'platform', {
            value: null,
            configurable: false,
            enumerable: true,
            writable: true
        });

        Object.defineProperty(this, 'deviceVersion', {
            value:null,
            configurable: false,
            enumerable: true,
            writable: true
        });

        Object.defineProperty(this, 'deviceUUID', {
            value:null,
            configurable: false,
            enumerable: true,
            writable: true
        });

        Object.defineProperty(this, 'isNative', {
            value:null,
            configurable: false,
            enumerable: true,
            writable: true
        });

        /**
         * detect network connection
         * if web platform return NONE or NETWORK
         * if device return NONE or type of connexion ( UNKNOWN, ETHERNET, WIFI, CELL_2G, CELL_3G, CELL_4G, CELL)
         * if awaiting loading cordova return PENDING
         * @returns {*|string} NONE
         */
        Object.defineProperty(this, 'connectionType', {

            value:null,
            configurable: false,
            enumerable: true,
            writable: true
        });


    };




    /*
     ====================================================
     ==== INIT PROPERTIES ===============================
     */

    MFDeviceInfo.prototype.init = function(){
        var deferred = $q.defer();
        var self = this;

        var deviceInfo = MFConfigurationService.getValue('deviceInfo', null);

        if(deviceInfo === null){
            MFCordova.onCordovaReady(
                function available() {
                    self.isNative = true;
                    if ($window.device && angular.isString($window.device.platform)) {
                        self.platform = $window.device.platform.toUpperCase();
                        if (self.platform === 'WIN32NT') {
                            self.platform = 'WP8';
                        }
                        self.deviceUUID = $window.device.uuid;
                        self.deviceVersion = $window.device.version.toUpperCase();
                        self.connectionType = navigator.connection.type.toUpperCase();

                        MFConfigurationService.setValue('deviceInfo', self);
                        deferred.resolve();

                    }
                    else {
                        console.error('$window.device = ' + $window.device);
                        deferred.reject('check if cordova plugin is installed: cordova plugin add https://github.com/apache/cordova-plugin-device.git');
                    }
                },
                function notAvailable() {
                    var browser = self.testBrowser();
                    self.platform = browser.BrowserName.toUpperCase();
                    self.deviceVersion = browser.FullVersion;
                    self.deviceUUID = 'WEB' + new Date().getTime();
                    self.connectionType = (navigator.onLine ? 'ETHERNET' : 'NONE');
                    self.isNative = false;

                    MFConfigurationService.setValue('deviceInfo', self);
                    deferred.resolve();
                }
            );
        }
        else {
            self.platform = deviceInfo.platform;
            self.deviceVersion = deviceInfo.deviceVersion;
            self.deviceUUID = deviceInfo.deviceUUID;
            self.connectionType = deviceInfo.connectionType;
            self.isNative = deviceInfo.isNative;

            deferred.resolve();
        }

        return deferred.promise;
    };



    MFDeviceInfo.prototype.testBrowser = function () {
        var nAgt = $window.navigator.userAgent;
        var browserName = $window.navigator.appName;
        var fullVersion = '' + parseFloat($window.navigator.appVersion);
        var majorVersion = parseInt($window.navigator.appVersion, 10);
        var nameOffset, verOffset, ix;

        // In Opera, the true version is after 'Opera' or after 'Version'
        if ((verOffset = nAgt.indexOf('Opera')) !== -1) {
            browserName = 'Opera';
            fullVersion = nAgt.substring(verOffset + 6);
            if ((verOffset = nAgt.indexOf('Version')) !== -1) {
                fullVersion = nAgt.substring(verOffset + 8);
            }
        }
        // In Chrome, the true version is after 'Chrome'
        else if ((verOffset = nAgt.indexOf('Chrome')) !== -1) {
            browserName = 'Chrome';
            fullVersion = nAgt.substring(verOffset + 7);
        }
        // In Safari, the true version is after 'Safari' or after 'Version'
        else if ((verOffset = nAgt.indexOf('Safari')) !== -1) {
            browserName = 'Safari';
            fullVersion = nAgt.substring(verOffset + 7);
            if ((verOffset = nAgt.indexOf('Version')) !== -1) {
                fullVersion = nAgt.substring(verOffset + 8);
            }
        }
        // In Firefox, the true version is after 'Firefox'
        else if ((verOffset = nAgt.indexOf('Firefox')) !== -1) {
            browserName = 'Firefox';
            fullVersion = nAgt.substring(verOffset + 8);
        }
        // In MSIE, the true version is after 'MSIE' in userAgent
        else if ((verOffset = nAgt.indexOf('MSIE')) !== -1) {
            browserName = 'IE';
            fullVersion = nAgt.substring(verOffset + 5);
        }
        else if (!(window.ActiveXObject) && 'ActiveXObject' in window) {
            browserName = 'IE';
            fullVersion = '11.0';
        }
        // In most other browsers, 'name/version' is at the end of userAgent
        else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) <
            (verOffset = nAgt.lastIndexOf('/'))) {
            browserName = nAgt.substring(nameOffset, verOffset);
            fullVersion = nAgt.substring(verOffset + 1);
            if (browserName.toLowerCase() === browserName.toUpperCase()) {
                browserName = navigator.appName;
            }
        }
        // trim the fullVersion string at semicolon/space if present
        if ((ix = fullVersion.indexOf(';')) !== -1) {
            fullVersion = fullVersion.substring(0, ix);
        }
        if ((ix = fullVersion.indexOf(' ')) !== -1) {
            fullVersion = fullVersion.substring(0, ix);
        }

        majorVersion = parseInt('' + fullVersion, 10);
        if (isNaN(majorVersion)) {
            fullVersion = '' + parseFloat(navigator.appVersion);
            majorVersion = parseInt(navigator.appVersion, 10);
        }

        return {
            'BrowserName': browserName,
            'FullVersion': fullVersion,
            'MajorVersion': majorVersion
        };
    };


    return new MFDeviceInfo();
}]);