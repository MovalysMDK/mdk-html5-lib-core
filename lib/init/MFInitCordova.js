'use strict';
/**
 * Utils
 */

angular.module('mfcore').factory('MFInitCordova', ['MFAbstractInitTask', 'MFInitTaskStatus', 'MFCordova','MFConfigurationService', function (MFAbstractInitTask, MFInitTaskStatus, MFCordova, MFConfigurationService) {
	var initTask = new MFAbstractInitTask();
	initTask.brief = 'Cordova';
	initTask.run = function(context, firstLaunch) {
		var self = this;


        var deviceReadyCB = function deviceReadyCB() {
            if(!angular.isUndefinedOrNull(window.StatusBar)){
                window.StatusBar.overlaysWebView(false);
            }
            MFCordova.status = MFCordova.Status.AVAILABLE;
            localStorage['cordova#status'] = MFCordova.status.key;
        };


		if (localStorage['cordova#status'] === MFCordova.Status.NOT_AVAILABLE.key) {
			MFCordova.status = MFCordova.Status.NOT_AVAILABLE;
		} else {
			if (window.device === undefined) {
				document.addEventListener('deviceready', deviceReadyCB, false);
				setTimeout(function() {
					document.removeEventListener('deviceready', deviceReadyCB, false);
					if (MFCordova.status !== MFCordova.Status.AVAILABLE) {
						MFCordova.status = MFCordova.Status.NOT_AVAILABLE;
                        localStorage['cordova#status'] = MFCordova.status.key;
					}
				}, 2000);
			} else {
                deviceReadyCB();
			}
		}



        var onReady = function(){
            console.assert(MFCordova.status === MFCordova.Status.NOT_AVAILABLE || !angular.isUndefinedOrNullOrEmpty(window.device),'Please check that you have installed the Cordova plugin device :   cordova plugin add https://github.com/apache/cordova-plugin-device.git');
            self.status = MFInitTaskStatus.SUCCEEDED;
        };

        MFCordova.onCordovaReady(onReady,onReady);


	};
	return initTask;
}]);