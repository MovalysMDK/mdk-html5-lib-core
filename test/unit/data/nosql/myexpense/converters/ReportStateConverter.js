'use strict';

/**
 * EnumerationConverter class : ReportStateConverter
 */
//@non-generated-start[jshint-override]
//@non-generated-end
angular.module('data-myexpense').factory('ReportStateConverter', ['ReportState', function(ReportState) {


    var ReportStateConverter = function ReportStateConverter() {
        //constructor
    };
    ReportStateConverter.displayedFromEnum = function(value) {
        if (angular.isUndefinedOrNull(value)) {
            return value;
        }
        return {
            value: value.value,
            key: 'enum__' + value._type + '__' + value.key
        };
    };

    ReportStateConverter.enumFromDisplayed = function(value) {
        return ReportState.values[value.value];
    };

    ReportStateConverter.toItemsList = function(name) {
        var list = [];
        var values = ReportState.values;
        for (var value in values) {
            if (values.hasOwnProperty(value)) {
                list.push(ReportStateConverter.displayedFromEnum(values[value]));
            }
        }
        return list;
    };

    //@non-generated-start[custom-converter]
    //@non-generated-end


    return ReportStateConverter;
}]);