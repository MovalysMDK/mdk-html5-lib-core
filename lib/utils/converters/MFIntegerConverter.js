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

angular.module('mfcore').factory('MFIntegerConverter', function () {

    var MFIntegerConverter = function MFIntegerConverter() {
        //constructor

    };

    MFIntegerConverter.fromString = function (value) {
        if (angular.isUndefinedOrNull(value) || angular.isNumber(value)) {
            return value;
        }
        value = value.replace(' ', '');
        return parseInt(value, 10);
    };

    MFIntegerConverter.numberToString = function (value) {
        if (angular.isUndefinedOrNull(value) || !angular.isNumber(value)) {
            return value;
        }

        return value.toString();
    };

    /**
     * version To Integer, convert version text to integer
     * @param version string
     *
     */
    MFIntegerConverter.fromVersion = function (version) {
        console.log(version);
        console.assert(!angular.isUndefinedOrNull(version), 'MFIntegerConverter.fromVersion(): The parameter version is required');
        return parseFloat(version.slice(0, 3));
    };

    return MFIntegerConverter;
});