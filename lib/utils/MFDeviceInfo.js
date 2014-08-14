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

        /**
         * Amaya, Arora, Avant, Baidu, Blazer, Bolt, Camino, Chimera, Chrome, Chromium,
         Comodo Dragon, Conkeror, Dillo, Dolphin, Doris, Epiphany, Fennec, Firebird,
         Firefox, Flock, GoBrowser, iCab, ICE Browser, IceApe, IceCat, IceDragon,
         Iceweasel, IE [Mobile], Iron, Jasmine, K-Meleon, Konqueror, Kindle, Links,
         Lunascape, Lynx, Maemo, Maxthon, Midori, Minimo, [Mobile] Safari, Mosaic, Mozilla,
         Netfront, Netscape, NetSurf, Nokia, OmniWeb, Opera [Mini/Mobi/Tablet], Phoenix,
         Polaris, QQBrowser, RockMelt, Silk, Skyfire, SeaMonkey, SlimBrowser, Swiftfox,
         Tizen, UCBrowser, w3m, Yandex
         */
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

        Object.defineProperty(this, 'browserMajorVersion', {
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

                        var parser = new UAParser();
                        var browser = parser.getBrowser();
                        self.browser = browser.name;
                        self.browserVersion = browser.version;
                        self.browserMajorVersion = browser.major;

                        MFConfigurationService.setValue('deviceInfo', self);
                        deferred.resolve();

                    }
                    else {
                        console.error('$window.device = ' + $window.device);
                        deferred.reject('check if cordova plugin is installed: cordova plugin add https://github.com/apache/cordova-plugin-device.git');
                    }
                },
                function notAvailable() {

                    var parser = new UAParser();
                    var browser = parser.getBrowser();
                    self.browser = browser.name;
                    self.browserVersion = browser.version;
                    self.browserMajorVersion = browser.major;

                    var os = parser.getOS();
                    self.deviceOS = os.name;
                    self.deviceVersion = os.version;

                    /*
                    var browser = self.getBrowserInfos();
                    self.browser = browser.BrowserName.toUpperCase();
                    self.browserVersion = browser.FullVersion;

                    var os = self.getOsInfos();
                    self.deviceOS = os.os.toUpperCase();
                    self.deviceVersion = os.version;
*/
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
            self.browserMajorVersion = deviceInfo.browserMajorVersion;


            deferred.resolve();
        }

        return deferred.promise;
    };

/*
    MFDeviceInfo.prototype.osNameTraduction = [
        {name:'Windows', version:'3.11',     pattern:/Win16/},
        {name:'Windows', version:'95',       pattern:/(Windows 95|Win95|Windows_95)/},
        {name:'Windows', version:'ME',       pattern:/(Win 9x 4.90|Windows ME)/},
        {name:'Windows', version:'98',       pattern:/(Windows 98|Win98)/},
        {name:'Windows', version:'CE',       pattern:/Windows CE/},
        {name:'Windows', version:'2000',     pattern:/(Windows NT 5.0|Windows 2000)/},
        {name:'Windows', version:'XP',       pattern:/(Windows NT 5.1|Windows XP)/},
        {name:'Windows', version:'2003',     pattern:/Windows NT 5.2/},
        {name:'Windows', version:'Vista',    pattern:/Windows NT 6.0/},
        {name:'Windows', version:'7',        pattern:/(Windows 7|Windows NT 6.1)/},
        {name:'Windows', version:'8.1',      pattern:/(Windows 8.1|Windows NT 6.3)/},
        {name:'Windows', version:'8',        pattern:/(Windows 8|Windows NT 6.2)/},
        {name:'Windows', version:'NT 4.0',   pattern:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
        {name:'Windows', version:'ME',       pattern:/Windows ME/},
        {name:'Android', parseVersion:true,  pattern:/Android ([\.\_\d]+)/},
        {name:'Open BSD',                    pattern:/OpenBSD/},
        {name:'Sun OS',                      pattern:/SunOS/},
        {name:'Linux',                       pattern:/(Linux|X11)/},
        {name:'iOS',     parseVersion:true,  pattern:/(?:iPhone|iPad|iPod).*OS ([\.\_\d]+)/},
        {name:'Mac OS X',parseVersion:true,  pattern:/Mac OS X ([\.\_\d]+)/},
        {name:'Mac OS',                      pattern:/(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
        {name:'QNX',                         pattern:/QNX/},
        {name:'UNIX',                        pattern:/UNIX/},
        {name:'BeOS',                        pattern:/BeOS/},
        {name:'OS/2',                        pattern:/OS\/2/},
        {name:'Search Bot',                  pattern:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
    ];

    MFDeviceInfo.prototype.getOsInfos = function(){
        // system
        var nAgt = navigator.userAgent;
        var osName = null;
        var osVersion = null;

        for (var i=0;i<this.osNameTraduction.length;i++) {
            var cs = this.osNameTraduction[i];
            var patternResult = cs.pattern.exec(nAgt);
            if (patternResult) {
                osName = cs.name;
                if(cs.parseVersion){
                    osVersion = patternResult[1];
                }
                else {
                    osVersion = cs.version;
                }
                break;
            }
        }

        osVersion = osVersion.replace(/\_/g, '.');
        return {
            'os': osName,
            'version': osVersion

        };
    };





    //TODO to fix for IE
    MFDeviceInfo.prototype.getBrowserInfos = function () {

        // (MSIE|(?!Gecko.+)Firefox|(?!AppleWebKit.+Chrome.+)Safari|(?!AppleWebKit.+)Chrome|AppleWebKit(?!.+Chrome|.+Safari)|Gecko(?!.+Firefox))(?: |\/)([\d\.apre]+)

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
*/

    return new MFDeviceInfo();
}]);