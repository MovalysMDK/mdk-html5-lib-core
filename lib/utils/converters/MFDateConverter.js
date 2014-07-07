'use strict';


angular.module('mfcore').factory('MFDateConverter', ['MFException', function (MFException) {

    var MFDateConverter = function MFDateConverter() {
        //constructor
    };


    /* String */

    MFDateConverter.fromString = function(value){

        return new Date(value);
    };


    /* Locale Date String */

    MFDateConverter.fromLocaleDateString = function(value){
        if(angular.isUndefinedOrNull(value) || !angular.isString(value)){
            return value;
        }
        return new Date(value);
    };

    MFDateConverter.toLocaleDateString = function(value){
        if(!angular.isDate(value) || angular.isUndefinedOrNull(value)){
            return value;
        }
        return value.toLocaleDateString();
    };


    /* ISO String */

    MFDateConverter.fromISOString = function(value){
        if(angular.isUndefinedOrNull(value) || !angular.isString(value)){
            return value;
        }
        return new Date(value);
    };

    MFDateConverter.toISOString = function(value){
        if(!angular.isDate(value) || angular.isUndefinedOrNull(value)){
            return value;
        }
        return value.toISOString();
    };
    function pad(number) {
        var r = String(number);
        if ( r.length === 1 ) {
            r = '0' + r;
        }
        return r;
    }

    MFDateConverter.toDatetimeRFC3339 = function(value) {
        if(angular.isUndefinedOrNull(value) || !angular.isDate(value)){
            return value;
        }
        return MFDateConverter.toDateRFC3339(value)  + 'T' + pad( value.getUTCHours() )  + ':' + pad( value.getUTCMinutes() )  + ':' + pad( value.getUTCSeconds() )  + '.' + String( (value.getUTCMilliseconds()/1000).toFixed(3) ).slice( 2, 5 );
    };

    MFDateConverter.fromDatetimeRFC3339 = function(value) {
        if(!angular.isString(value) || angular.isUndefinedOrNull(value)){
            return value;
        }
        return new Date(value);
    };

    MFDateConverter.toDateRFC3339 = function(value) {
        if(angular.isUndefinedOrNull(value) || !angular.isDate(value)){
            return value;
        }
        return value.getUTCFullYear() + '-' + pad( value.getUTCMonth() + 1 ) + '-' + pad( value.getUTCDate() ) ;
    };

    MFDateConverter.fromDateRFC3339 = function(value) {
        if(!angular.isString(value) || angular.isUndefinedOrNull(value)){
            return value;
        }
        return new Date(value);
    };
    /* Milliseconds */

    MFDateConverter.fromMilliseconds = function(value){
        if(angular.isUndefinedOrNull(value)){
            return value;
        }
        return new Date(value);
    };

    MFDateConverter.toMilliseconds = function(value){
        if(angular.isUndefinedOrNull(value) || !angular.isDate(value)){
            return value;
        }
        return value.getTime();
    };


    return MFDateConverter;
}]);