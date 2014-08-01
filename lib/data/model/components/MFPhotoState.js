'use strict';


angular.module('mfcore').factory('MFPhotoState', ['MFAbstractEnum', function (MFAbstractEnum) {

    var MFPhotoState = function MFPhotoState() {
    };
    MFAbstractEnum.defineEnum(MFPhotoState, ['FWK_NONE', 'SELECTED', 'DOWNLOADED', 'TAKEN', 'TODOWNLOAD']);

    return MFPhotoState;
}]);
