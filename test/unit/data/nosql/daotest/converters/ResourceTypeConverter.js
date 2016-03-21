'use strict';

/**
 * EnumerationConverter class : ResourceTypeConverter
 */
//@non-generated-start[jshint-override]
//@non-generated-end
angular.module('data-daotest').factory('ResourceTypeConverter', ['ResourceType', function(ResourceType) {


    var ResourceTypeConverter = function ResourceTypeConverter() {
        //constructor
    };
    ResourceTypeConverter.displayedFromEnum = function(value) {
        if (angular.isUndefinedOrNull(value)) {
            return value;
        }
        return {
            value: value.value,
            key: 'enum__' + value._type + '__' + value.key
        };
    };

    ResourceTypeConverter.enumFromDisplayed = function(value) {
        return ResourceType.values[value.value];
    };

    ResourceTypeConverter.toItemsList = function(name) {
        var list = [];
        var values = ResourceType.values;
        for (var value in values) {
            if (values.hasOwnProperty(value)) {
                list.push(ResourceTypeConverter.displayedFromEnum(values[value]));
            }
        }
        return list;
    };

    //@non-generated-start[custom-converter]
    //@non-generated-end


    return ResourceTypeConverter;
}]);