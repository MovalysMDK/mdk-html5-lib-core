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

angular.module('mfcore').factory('MFDoubleConverter', function () {

    var MFDoubleConverter = function MFDoubleConverter() {
        //constructor

    };

    MFDoubleConverter.fromString = function (value) {
        if (angular.isUndefinedOrNull(value) || !angular.isString(value)) {
            return value;
        }
        value = value.replace(',', '.');
        value = value.replace(' ', '');
        return parseFloat(value);
    };

    MFDoubleConverter.doubleToString = function (value) {
        if (angular.isUndefinedOrNull(value) || !angular.isNumber(value)) {
            return value;
        }
        return value.toString();
    };

    MFDoubleConverter.toLocaleString = function (value) {
        if (angular.isUndefinedOrNull(value) || !angular.isNumber(value)) {
            return value;
        }
        return value.toLocaleString();
    };

    return MFDoubleConverter;
});