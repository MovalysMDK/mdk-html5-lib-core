'use strict';

/**
 * EnumerationConverter class : ExpenseStateConverter
 */
//@non-generated-start[jshint-override]
//@non-generated-end
angular.module('data-myexpense').factory('ExpenseStateConverter', ['ExpenseState', function(ExpenseState) {


    var ExpenseStateConverter = function ExpenseStateConverter() {
        //constructor
    };
    ExpenseStateConverter.displayedFromEnum = function(value) {
        if (angular.isUndefinedOrNull(value)) {
            return value;
        }
        return {
            value: value.value,
            key: 'enum__' + value._type + '__' + value.key
        };
    };

    ExpenseStateConverter.enumFromDisplayed = function(value) {
        return ExpenseState.values[value.value];
    };

    ExpenseStateConverter.toItemsList = function(name) {
        var list = [];
        var values = ExpenseState.values;
        for (var value in values) {
            if (values.hasOwnProperty(value)) {
                list.push(ExpenseStateConverter.displayedFromEnum(values[value]));
            }
        }
        return list;
    };

    //@non-generated-start[custom-converter]
    //@non-generated-end


    return ExpenseStateConverter;
}]);