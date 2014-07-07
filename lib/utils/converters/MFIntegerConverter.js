'use strict';

angular.module('mfcore').factory('MFIntegerConverter', function () {

    var MFIntegerConverter = function MFIntegerConverter() {
        //constructor

    };

    MFIntegerConverter.fromString = function(value){
        if(angular.isUndefinedOrNull(value) || angular.isNumber(value)){
            return value;
        }
        value = value.replace(' ','');
        return parseInt(value,10);
    };

    MFIntegerConverter.numberToString = function(value){
        if(angular.isUndefinedOrNull(value) || !angular.isNumber(value)){
            return value;
        }

        return value.toString();
    };

    /**
     * version To Integer, convert version text to integer
     * @param version string
     *
     */
    MFIntegerConverter.fromVersion = function(version){
        console.log(version);
        console.assert(!angular.isUndefinedOrNull(version), 'MFIntegerConverter.fromVersion(): The parameter version is required');
        return parseFloat(version.slice(0, 3), 10);
    };

    return MFIntegerConverter;
});