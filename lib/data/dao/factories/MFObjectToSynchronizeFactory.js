'use strict';


angular.module('mfcore').service('MFObjectToSynchronizeFactory', ['MFObjectToSynchronize', function (MFObjectToSynchronize) {    // instantiated only once, at the startup of the app

    this.createInstance = function () {

        var result = new MFObjectToSynchronize();
        result.id = -1;
        result.name = '';
        result.value = 0;

        return result;

    };
}]);