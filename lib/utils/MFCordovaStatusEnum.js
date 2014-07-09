'use strict';


angular.module('mfcore').factory('MFCordovaStatusEnum', ['MFAbstractEnum', function (MFAbstractEnum) {

	var MFCordovaStatusEnum = function MFCordovaStatusEnum() {};
	MFAbstractEnum.defineEnum(MFCordovaStatusEnum, ['PENDING', 'NOT_AVAILABLE', 'AVAILABLE']);

	return MFCordovaStatusEnum;
}]);
