'use strict';
/**
 * Utils
 */

angular.module('mfcore').factory('MFInitCordovaConfig', ['$window', 'MFAbstractInitTask', 'MFInitTaskStatus', 'MFCordova', 'MFCordovaStatusEnum', 'MFConfigurationService', function ($window, MFAbstractInitTask, MFInitTaskStatus, MFCordova, MFCordovaStatusEnum, MFConfigurationService) {
    var initTask = new MFAbstractInitTask();
    initTask.brief = 'Cordova config';
    initTask.run = function(context, firstLaunch) {
        var self = this;

        var deviceName = MFCordova.deviceName;
        var deviceVersion = MFCordova.deviceVersion;
        if (deviceName === 'WIN32NT') {
            deviceName = 'WP8';
        }

        if (deviceName ==='WEB' && (MFCordova.status === MFCordovaStatusEnum.NOT_AVAILABLE || MFCordova.status === MFCordovaStatusEnum.PENDING) ) {
            var browser = testBrowser();
            deviceName = browser.BrowserName.toUpperCase();
            deviceVersion = browser.FullVersion;
        }

        MFConfigurationService.setValue('deviceName', deviceName);
        MFConfigurationService.setValue('deviceVersion', deviceVersion);

        self.status = MFInitTaskStatus.SUCCEEDED;
    };

    var testBrowser = function () {
        var nAgt = $window.navigator.userAgent;
        var browserName  = $window.navigator.appName;
        var fullVersion  = ''+parseFloat($window.navigator.appVersion);
        var majorVersion = parseInt($window.navigator.appVersion,10);
        var nameOffset,verOffset,ix;

        // In Opera, the true version is after 'Opera' or after 'Version'
        if ((verOffset=nAgt.indexOf('Opera'))!==-1) {
            browserName = 'Opera';
            fullVersion = nAgt.substring(verOffset+6);
            if ((verOffset=nAgt.indexOf('Version'))!==-1) {
                fullVersion = nAgt.substring(verOffset+8);
            }
        }
        // In MSIE, the true version is after 'MSIE' in userAgent
        else if ((verOffset=nAgt.indexOf('MSIE'))!==-1) {
            browserName = 'IE';
            fullVersion = nAgt.substring(verOffset+5);
        } 
         else if (!($window.ActiveXObject)) {
            browserName = 'IE';
            fullVersion = '11.0';
        }
        // In Chrome, the true version is after 'Chrome'
        else if ((verOffset=nAgt.indexOf('Chrome'))!==-1) {
            browserName = 'Chrome';
            fullVersion = nAgt.substring(verOffset+7);
        }
        // In Safari, the true version is after 'Safari' or after 'Version'
        else if ((verOffset=nAgt.indexOf('Safari'))!==-1) {
            browserName = 'Safari';
            fullVersion = nAgt.substring(verOffset+7);
            if ((verOffset=nAgt.indexOf('Version'))!==-1) {
                fullVersion = nAgt.substring(verOffset+8);
            }
        }
        // In Firefox, the true version is after 'Firefox'
        else if ((verOffset=nAgt.indexOf('Firefox'))!==-1) {
            browserName = 'Firefox';
            fullVersion = nAgt.substring(verOffset+8);
        }
        // In most other browsers, 'name/version' is at the end of userAgent
        else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) <
            (verOffset=nAgt.lastIndexOf('/')) )
        {
            browserName = nAgt.substring(nameOffset,verOffset);
            fullVersion = nAgt.substring(verOffset+1);
            if (browserName.toLowerCase()===browserName.toUpperCase()) {
                browserName = navigator.appName;
            }
        }
        // trim the fullVersion string at semicolon/space if present
        if ((ix=fullVersion.indexOf(';'))!==-1) {
            fullVersion=fullVersion.substring(0,ix);
        }
        if ((ix=fullVersion.indexOf(' '))!==-1) {
            fullVersion=fullVersion.substring(0,ix);
         }

        majorVersion = parseInt(''+fullVersion,10);
        if (isNaN(majorVersion)) {
            fullVersion  = ''+parseFloat(navigator.appVersion);
            majorVersion = parseInt(navigator.appVersion,10);
        }

        return {
            'BrowserName': browserName,
            'FullVersion': fullVersion,
            'MajorVersion': majorVersion
        };
    };

    return initTask;
}]);