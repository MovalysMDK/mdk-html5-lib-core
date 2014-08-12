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
        Object.defineProperty(this, 'deviceOS', {
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

        Object.defineProperty(this, 'browser', {
            value:null,
            configurable: false,
            enumerable: true,
            writable: true
        });

        Object.defineProperty(this, 'browserVersion', {
            value:null,
            configurable: false,
            enumerable: true,
            writable: true
        });

        Object.defineProperty(this, 'UUID', {
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
                        self.deviceOS = $window.device.platform.toUpperCase();
                        if (self.deviceOS === 'WIN32NT') {
                            self.deviceOS = 'WP8';
                        }
                        self.UUID = $window.device.uuid;
                        self.deviceVersion = $window.device.version.toUpperCase();
                        self.connectionType = navigator.connection.type.toUpperCase();

                        self.browser = null;
                        self.browserVersion = null;

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
                    var os = self.getBrowserOS();
                    self.deviceOS = os.os.toUpperCase();
                    self.browser = browser.BrowserName.toUpperCase();

                    self.deviceVersion = os.version;
                    self.browserVersion = browser.FullVersion;

                    self.UUID = 'WEB' + new Date().getTime();
                    self.connectionType = (navigator.onLine ? 'ETHERNET' : 'NONE');
                    self.isNative = false;

                    MFConfigurationService.setValue('deviceInfo', self);
                    deferred.resolve();
                }
            );
        }
        else {
            self.deviceOS = deviceInfo.deviceOS;
            self.deviceVersion = deviceInfo.deviceVersion;
            self.UUID = deviceInfo.UUID;
            self.connectionType = deviceInfo.connectionType;
            self.isNative = deviceInfo.isNative;
            self.browser = deviceInfo.browser;
            self.browserVersion = deviceInfo.browserVersion;


            deferred.resolve();
        }

        return deferred.promise;
    };


    MFDeviceInfo.prototype.getBrowserOS = function(){
        // system
        var nAgt = navigator.userAgent;
        var os = null;
        var clientStrings = [
            {s:'Windows 3.11', r:/Win16/},
            {s:'Windows 95', r:/(Windows 95|Win95|Windows_95)/},
            {s:'Windows ME', r:/(Win 9x 4.90|Windows ME)/},
            {s:'Windows 98', r:/(Windows 98|Win98)/},
            {s:'Windows CE', r:/Windows CE/},
            {s:'Windows 2000', r:/(Windows NT 5.0|Windows 2000)/},
            {s:'Windows XP', r:/(Windows NT 5.1|Windows XP)/},
            {s:'Windows Server 2003', r:/Windows NT 5.2/},
            {s:'Windows Vista', r:/Windows NT 6.0/},
            {s:'Windows 7', r:/(Windows 7|Windows NT 6.1)/},
            {s:'Windows 8.1', r:/(Windows 8.1|Windows NT 6.3)/},
            {s:'Windows 8', r:/(Windows 8|Windows NT 6.2)/},
            {s:'Windows NT 4.0', r:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
            {s:'Windows ME', r:/Windows ME/},
            {s:'Android', r:/Android/},
            {s:'Open BSD', r:/OpenBSD/},
            {s:'Sun OS', r:/SunOS/},
            {s:'Linux', r:/(Linux|X11)/},
            {s:'iOS', r:/(iPhone|iPad|iPod)/},
            {s:'Mac OS X', r:/Mac OS X/},
            {s:'Mac OS', r:/(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
            {s:'QNX', r:/QNX/},
            {s:'UNIX', r:/UNIX/},
            {s:'BeOS', r:/BeOS/},
            {s:'OS/2', r:/OS\/2/},
            {s:'Search Bot', r:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
        ];
        for (var i=0;i<clientStrings.length;i++) {
            var cs = clientStrings[i];
            if (cs.r.test(nAgt)) {
                os = cs.s;
                break;
            }
        }

        var osVersion = null;

        if (/Windows/.test(os)) {
            osVersion = /Windows (.*)/.exec(os)[1];
            os = 'Windows';
        }
        else if(os === 'Mac OS X'){
            osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
        }
        else if(os === 'Android'){
            osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];

        }
        else if(os === 'iOS') {
            osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(navigator.appVersion);
            osVersion = osVersion[1] + '.' + osVersion[2];
        }
        return {
            'os': os,
            'version': osVersion

        };
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
        else if (nAgt.indexOf('Trident/') !== -1) {
            browserName = 'IE';
            fullVersion = nAgt.substring(nAgt.indexOf('rv:') + 3);
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
        if ((ix = fullVersion.indexOf(')')) !== -1) {
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