'use strict';

angular.module('mfcore').factory('MFJsonConverter', function () {

    var MFJsonConverter = function MFJsonConverter() {
        //constructor

    };

    MFJsonConverter.fromString = function (value) {
        if (angular.isUndefinedOrNull(value) || !angular.isString(value)) {
            return null;
        }
        else {
            return JSON.parse(value);
        }
    };

    MFJsonConverter.jsonToString = function (value) {
        if (angular.isUndefinedOrNull(value) || angular.isUndefinedOrNullOrEmpty(value)) {
            return '';
        }
        return JSON.stringify(value);
    };

    return MFJsonConverter;
});