'use strict';


angular.module('mfcore').service('MFParameterFactory', ['MFParameter', function (MFParameterFactory) {    // instantiated only once, at the startup of the app

    this.createInstance = function () {

        var result = new MFParameterFactory();
        result.id = -1;
        result.name = '';
        result.value = 0;

        return result;

    };
}]);