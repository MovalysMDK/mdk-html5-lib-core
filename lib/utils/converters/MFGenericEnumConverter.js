'use strict';


angular.module('mfcore').service('MFGenericEnumConverter', ['MFException', '$injector', 'MFIntegerConverter', function (MFException, $injector, MFIntegerConverter) {    // instantiated only once, at the startup of the app

    this.fromString = function (p_string, p_enumClass) {
        console.assert(!angular.isUndefinedOrNull(p_enumClass), 'MFGenericEnumConverter.fromString(): The parameter p_enumClass is required');
        console.assert(!angular.isUndefinedOrNull(p_string), 'MFGenericEnumConverter.fromString(): The parameter p_string is required');
        var Enum = $injector.get(p_enumClass);
        return Enum[p_string];
    };

    this.enumToString = function (p_enum) {
        console.assert(!angular.isUndefinedOrNull(p_enum), 'MFGenericEnumConverter.toString(): The parameter p_enum is required and should extend MFAbstractEnum');
        return p_enum.key;
    };

    this.fromInteger = function (p_int, p_enumClass) {
        console.assert(!angular.isUndefinedOrNull(p_int), 'MFGenericEnumConverter.fromInteger(): The parameter p_int is required');
        console.assert(!angular.isUndefinedOrNull(p_enumClass), 'MFGenericEnumConverter.fromInteger(): The parameter p_enumClass is required');
        if (angular.isString(p_int)) {
            p_int = MFIntegerConverter.fromString(p_int);
        }
        var Enum = $injector.get(p_enumClass);
        return Enum.values[p_int];
    };

    this.toInteger = function (p_enum) {
        console.assert(!angular.isUndefinedOrNull(p_enum), 'MFGenericEnumConverter.toInteger(): The parameter p_enum is required');
        return parseInt(p_enum.value, 10);
    };

}]);