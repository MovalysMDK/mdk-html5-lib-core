'use strict';
/**
 * Utils
 */

angular.module('mfcore').factory('MFInitCordovaConfig', ['MFAbstractInitTask', 'MFInitTaskStatus', 'MFCordova','MFConfigurationService', function (MFAbstractInitTask, MFInitTaskStatus, MFCordova, MFConfigurationService) {
    var initTask = new MFAbstractInitTask();
    initTask.brief = 'Cordova config';
    initTask.run = function(context, firstLaunch) {
        var self = this;

        var deviceName = MFCordova.deviceName;

        if (deviceName === 'WIN32NT') {
            deviceName = 'WP8';
        }

        MFConfigurationService.setValue('deviceName',deviceName);
        MFConfigurationService.setValue('deviceVersion',MFCordova.deviceVersion);

        self.status = MFInitTaskStatus.SUCCEEDED;
    };
    return initTask;
}]);