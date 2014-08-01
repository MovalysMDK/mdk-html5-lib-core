'use strict';

angular.module('mfcore').factory('MFDoubleConverter', function () {

    var MFDoubleConverter = function MFDoubleConverter() {
        //constructor

    };

    MFDoubleConverter.fromString = function (value) {
        if (angular.isUndefinedOrNull(value) || !angular.isString(value)) {
            return value;
        }
        value = value.replace(',', '.');
        value = value.replace(' ', '');
        return parseFloat(value);
    };

    MFDoubleConverter.doubleToString = function (value) {
        if (angular.isUndefinedOrNull(value) || !angular.isNumber(value)) {
            return value;
        }
        return value.toString();
    };

    MFDoubleConverter.toLocaleString = function (value) {
        if (angular.isUndefinedOrNull(value) || !angular.isNumber(value)) {
            return value;
        }
        return value.toLocaleString();
    };

    return MFDoubleConverter;
});