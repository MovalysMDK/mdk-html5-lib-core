'use strict';

angular.module('mfcore').factory('MFBooleanConverter', function () {

    var MFBooleanConverter = function MFBooleanConverter() {
        //constructor

    };

    MFBooleanConverter.fromString = function(value){
        if(angular.isUndefinedOrNull(value)|| !angular.isString(value)){
            return value;
        }
        value = value.replace(' ','');
        return value==='true';
    };

    MFBooleanConverter.booleanToString = function(value){
        if(angular.isUndefinedOrNull(value) || typeof value !== 'boolean'){
            return value;
        }
        return value.toString();
    };

    MFBooleanConverter.fromInteger = function(value){
        return value===1?true:false;
    };

    MFBooleanConverter.toInteger = function(value){
        return value?1:0;
    };

    return MFBooleanConverter;
});