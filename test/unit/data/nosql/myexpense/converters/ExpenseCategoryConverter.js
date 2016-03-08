'use strict';

/**
 * EnumerationConverter class : ExpenseCategoryConverter
 */
//@non-generated-start[jshint-override]
//@non-generated-end
angular.module('data-myexpense').factory('ExpenseCategoryConverter', ['ExpenseCategory', function(ExpenseCategory) {


    var ExpenseCategoryConverter = function ExpenseCategoryConverter() {
        //constructor
    };
    ExpenseCategoryConverter.displayedFromEnum = function(value) {
        if (angular.isUndefinedOrNull(value)) {
            return value;
        }
        return {
            value: value.value,
            key: 'enum__' + value._type + '__' + value.key
        };
    };

    ExpenseCategoryConverter.enumFromDisplayed = function(value) {
        return ExpenseCategory.values[value.value];
    };

    ExpenseCategoryConverter.toItemsList = function(name) {
        var list = [];
        var values = ExpenseCategory.values;
        for (var value in values) {
            if (values.hasOwnProperty(value)) {
                list.push(ExpenseCategoryConverter.displayedFromEnum(values[value]));
            }
        }
        return list;
    };

    //@non-generated-start[custom-converter]
    //@non-generated-end


    return ExpenseCategoryConverter;
}]);