'use strict';
/**
 * Utils
 */

angular.module('mfcore').factory('MFInitConfiguration', ['MFAbstractInitTask', 'MFInitTaskStatus', 'MFConfigurationService', 'MFDeviceInfo', function (MFAbstractInitTask, MFInitTaskStatus, MFConfigurationService, MFDeviceInfo) {
    var initTask = new MFAbstractInitTask();
    initTask.brief = 'Configuration';

    initTask.run = function (context, firstLaunch) {
        var self = this;
        self.status = MFInitTaskStatus.STARTED;
        MFConfigurationService.init().then(
            function (result) {
                console.logLevel = MFConfigurationService.getValue('logLevel');

                console.log('[APP CONFIGURATION] ',MFConfigurationService.registry);

                MFDeviceInfo.init().then(
                    function success(){
                        console.log('[DEVICE INFOS] ',MFDeviceInfo);
                        self.status = MFInitTaskStatus.SUCCEEDED;

                    },
                    function failure(error){
                        context.addError(error);
                        self.status = MFInitTaskStatus.FAILED;
                    }
                );
            },
            function (error) {
                context.addError(error);
                self.status = MFInitTaskStatus.FAILED;
            }
        );
    };
    return initTask;
}]);
