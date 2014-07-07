'use strict';

angular.module('mfcore').factory('MFInitStatus', ['MFAbstractEnum', function (MFAbstractEnum) {
	var MFInitStatus = function MFInitStatus() {};
	MFAbstractEnum.defineEnum(MFInitStatus, ['NOT_STARTED', 'STARTED', 'PENDING', 'FAILED', 'READY']);

	return MFInitStatus;
}]);