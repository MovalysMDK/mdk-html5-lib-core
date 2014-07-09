'use strict';
/**
 * Utils
 */

angular.module('mfcore').factory('MFInitConfiguration', ['MFAbstractInitTask', 'MFInitTaskStatus', 'MFConfigurationService', 'MFCordova','MFCordovaStatusEnum', function (MFAbstractInitTask, MFInitTaskStatus, MFConfigurationService, MFCordova, MFCordovaStatusEnum) {
	var initTask = new MFAbstractInitTask();
	initTask.brief = 'Configuration';

	initTask.run = function(context, firstLaunch) {
		var self = this;
		self.status = MFInitTaskStatus.STARTED;
		MFConfigurationService.init().then(
            function(result) {

                //console.log(MFCordova.status === MFCordovaStatusEnum.AVAILABLE);
                console.logLevel = MFConfigurationService.getValue('logLevel');
                self.status = MFInitTaskStatus.SUCCEEDED;

            },
            function(error){
                context.addError(error);
                self.status = MFInitTaskStatus.FAILED;
            }
        );
	};
	return initTask;
}]);
