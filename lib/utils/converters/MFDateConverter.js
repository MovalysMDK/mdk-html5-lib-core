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

angular.module('mfcore').factory('MFDateConverter', ['MFException', function (MFException) {

    var MFDateConverter = function MFDateConverter() {
        //constructor
    };


    /* String */

    MFDateConverter.fromString = function (value) {

        return new Date(value);
    };


    /* Locale Date String */

    MFDateConverter.fromLocaleDateString = function (value) {
        if (angular.isUndefinedOrNull(value) || !angular.isString(value)) {
            return value;
        }
        return new Date(value);
    };

    MFDateConverter.toLocaleDateString = function (value) {
        if (!angular.isDate(value) || angular.isUndefinedOrNull(value)) {
            return value;
        }
        return value.toLocaleDateString();
    };


    /* ISO String */

    MFDateConverter.fromISOString = function (value) {
        if (angular.isUndefinedOrNull(value) || !angular.isString(value)) {
            return value;
        }
        return new Date(value);
    };

    MFDateConverter.toISOString = function (value) {
        if (!angular.isDate(value) || angular.isUndefinedOrNull(value)) {
            return value;
        }
        return value.toISOString();
    };
    function pad(number) {
        var r = String(number);
        if (r.length === 1) {
            r = '0' + r;
        }
        return r;
    }

    MFDateConverter.toDatetimeRFC3339 = function (value) {
        if (angular.isUndefinedOrNull(value) || !angular.isDate(value)) {
            return value;
        }
        return MFDateConverter.toDateRFC3339(value) + 'T' + pad(value.getUTCHours()) + ':' + pad(value.getUTCMinutes()) + ':' + pad(value.getUTCSeconds()) + '.' + String((value.getUTCMilliseconds() / 1000).toFixed(3)).slice(2, 5);
    };

    MFDateConverter.fromDatetimeRFC3339 = function (value) {
        if (!angular.isString(value) || angular.isUndefinedOrNull(value)) {
            return value;
        }
        return new Date(value);
    };

    MFDateConverter.toDateRFC3339 = function (value) {
        if (angular.isUndefinedOrNull(value) || !angular.isDate(value)) {
            return value;
        }
        return value.getUTCFullYear() + '-' + pad(value.getUTCMonth() + 1) + '-' + pad(value.getUTCDate());
    };

    MFDateConverter.fromDateRFC3339 = function (value) {
        if (!angular.isString(value) || angular.isUndefinedOrNull(value)) {
            return value;
        }
        return new Date(value);
    };
    /* Milliseconds */

    MFDateConverter.fromMilliseconds = function (value) {
        if (angular.isUndefinedOrNull(value)) {
            return value;
        }
        return new Date(value);
    };

    MFDateConverter.toMilliseconds = function (value) {
        if (angular.isUndefinedOrNull(value) || !angular.isDate(value)) {
            return value;
        }
        return value.getTime();
    };


    return MFDateConverter;
}]);