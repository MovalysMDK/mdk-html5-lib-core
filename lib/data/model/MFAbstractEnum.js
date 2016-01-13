'use strict';
/**
 * @file MFAbstractEnum.js
 * @brief
 * @date 22/01/2014
 *
 * Copyright (c) 2014 Sopra Group. All rights reserved.
 *
 */

angular.module('mfcore').factory('MFAbstractEnum', ['MFUtils', function (MFUtils) {

    //BE CAREFUL: do not define a constructor or attributes because it will be overwritten in the children

    var MFAbstractEnum = function MFAbstractEnum() {
    };

    Object.defineProperty(
        MFAbstractEnum.prototype,
        '_type',
        {
            get: function () {
                return this.constructor.name;
            },
            enumerable: false,
            configurable: false
        }
    );

    MFAbstractEnum.defineEnum = function (EnumClass, values) {
        MFUtils.extend(EnumClass, MFAbstractEnum);
        values = MFUtils.toArray(values);
        
        // Add the blank value FWK_NONE
        values.unshift("FWK_NONE");
       
        var valuesContainer = {};
        for (var index in values) {
            if (values.hasOwnProperty(index)) {
                var key = values[index];
                var value = index;
                var enumElement = new EnumClass();
                Object.defineProperties(
                    enumElement, {
                        'value': {
                            value: value,
                            writable: false,
                            enumerable: true,
                            configurable: false
                        },
                        'key': {
                            value: key,
                            writable: false,
                            enumerable: true,
                            configurable: false
                        }
                    }
                );
                Object.freeze(enumElement);
                Object.defineProperty(
                    EnumClass, key, {
                        value: enumElement,
                        writable: false,
                        enumerable: true,
                        configurable: false
                    }
                );
                valuesContainer[value] = enumElement;
            }
        }
        Object.defineProperty(
            EnumClass, 'values', {
                value: valuesContainer,
                writable: false,
                enumerable: true,
                configurable: false
            }
        );

        EnumClass.toItemsList = function () {
            var list = [];
            var values = EnumClass.values;
            for (var value in values) {
                if (values.hasOwnProperty(value)) {
                    list.push({ value: values[value].value, key: 'enum__' + EnumClass.name + '__' + values[value].key });
                }
            }
            return list;
        };
    };

    MFAbstractEnum.prototype.toString = function () {
        return this.key;
    };

    MFAbstractEnum.prototype.serialize = function () {
        return JSON.stringify(this);
    };

    MFAbstractEnum.prototype.equals = function (obj) {
        return this === obj;
    };

    return MFAbstractEnum;
}]);