'use strict';


angular.module('mfcore').factory('MFInitTaskStatus', ['MFAbstractEnum', function (MFAbstractEnum) {
    var MFInitTaskStatus = function MFInitTaskStatus() {
    };
    MFAbstractEnum.defineEnum(MFInitTaskStatus, ['NOT_STARTED', 'STARTING', 'STARTED', 'SUCCEEDED', 'FAILED', 'ABORTED']);

    return MFInitTaskStatus;
}]);
