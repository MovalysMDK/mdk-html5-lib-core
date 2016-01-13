'use strict';


angular.module('mfcore').factory('MFPhotoState', ['MFAbstractEnum', function (MFAbstractEnum) {

    var MFPhotoState = function MFPhotoState() {
    };
    MFAbstractEnum.defineEnum(MFPhotoState, ['SELECTED', 'DOWNLOADED', 'TAKEN', 'TODOWNLOAD']);

    return MFPhotoState;
}]);
