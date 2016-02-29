/**
 * Copyright (C) 2016 Sopra Steria Group (movalys.support@soprasteria.com)
 *
 * This file is part of Movalys MDK.
 * Movalys MDK is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * Movalys MDK is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 * You should have received a copy of the GNU Lesser General Public License
 * along with Movalys MDK. If not, see <http://www.gnu.org/licenses/>.
 */
'use strict';

angular.module('mfcore').factory('MFUtils', function () {
    var MFUtils = function MFUtils() {
    };

    MFUtils.toArray = function (obj) {
        if (angular.isArray(obj)) {
            return obj;
        }
        else {
            return [obj];
        }
    };


    MFUtils.isUndefinedOrNullOrEmpty = function (value) {
        return angular.isUndefined(value) || value.length === 0;
    };

    MFUtils.isUndefinedOrNull = function (obj) {
        return angular.isUndefined(obj) || obj === null;
    };


    MFUtils.extend = function (childClass, parentClass) {
        console.assert(!angular.isUndefinedOrNull(childClass), 'The parameter "childClass" of the function "extend" is required');
        console.assert(!angular.isUndefinedOrNull(parentClass), 'The parameter "parentClass" of the function "extend" is required');

        for (var staticProperty in parentClass) {
            if (parentClass.hasOwnProperty(staticProperty)) {
                childClass[staticProperty] = parentClass[staticProperty];
            }
        }

        var tmp__ = Object.create(parentClass.prototype);
        tmp__.constructor = childClass;
        childClass.prototype = tmp__;

        Object.defineProperty(childClass, '_Parent', {
            value: parentClass,
            writable: false,
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(childClass, '_super', {
            value: parentClass.prototype,
            writable: false,
            enumerable: false,
            configurable: false
        });
    };

    MFUtils.extendFromInstance = function (childClass, parentInstance) {
        MFUtils.extend(childClass, parentInstance.constructor);
    };

    MFUtils.defineAttributes = function (object, names, writable, configurable, enumerable) {
        writable = writable === undefined || !!writable;
        configurable = !(configurable === undefined || !!configurable);
        enumerable = enumerable === undefined || !!enumerable;

        for (var i = 0; i < names.length; ++i) {
            Object.defineProperty(object, names[i], {
                value: null,
                writable: writable,
                configurable: configurable,
                enumerable: enumerable
            });
        }
    };

    MFUtils.isAttrInObject = function (obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                return true;
            }
        }
        return false;
    };

    Object.freeze(MFUtils);
    return MFUtils;
});



