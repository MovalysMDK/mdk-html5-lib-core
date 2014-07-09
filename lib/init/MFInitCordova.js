'use strict';
/**
 * Utils
 */

angular.module('mfcore').factory('MFInitCordova', ['MFAbstractInitTask', 'MFInitTaskStatus', 'MFCordova','MFConfigurationService','MFCordovaStatusEnum', function (MFAbstractInitTask, MFInitTaskStatus, MFCordova, MFConfigurationService, MFCordovaStatusEnum) {
	var initTask = new MFAbstractInitTask();
	initTask.brief = 'Cordova';
	initTask.run = function(context, firstLaunch) {

		var self = this;

        var onCordovaAvailable = function onCordovaAvailable(){
            MFCordova.status = MFCordovaStatusEnum.AVAILABLE;
        };

		if (localStorage['cordova#status'] === MFCordovaStatusEnum.NOT_AVAILABLE.key) {
			MFCordova.status = MFCordovaStatusEnum.NOT_AVAILABLE;
		} else {
			if (window.device === undefined) {
				document.addEventListener('deviceready',onCordovaAvailable, false);
				setTimeout(function() {
					document.removeEventListener('deviceready', onCordovaAvailable, false);
					if (MFCordova.status !== MFCordovaStatusEnum.AVAILABLE) {
						MFCordova.status = MFCordovaStatusEnum.NOT_AVAILABLE;
					}
				}, 2000);
			} else {
                MFCordova.status = MFCordovaStatusEnum.AVAILABLE;
			}
		}



        var onCordovaStatusChange = function(){
            localStorage['cordova#status'] = MFCordova.status.key;
            self.status = MFInitTaskStatus.SUCCEEDED;
        };

        MFCordova.onCordovaReady(onCordovaStatusChange,onCordovaStatusChange);


	};
	return initTask;
}]);