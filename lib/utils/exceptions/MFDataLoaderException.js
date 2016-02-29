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

angular.module('mfcore').factory('MFDataLoaderException', ['MFException', 'MFUtils', function (MFException, MFUtils) {

    var MFDataLoaderException = function MFDataLoaderException(dataLoader, message, cause) {
        MFDataLoaderException._Parent.call(this, message, null);
        this.name = 'MFDataLoaderException';

        var _dataLoader = '';
        Object.defineProperty(this, 'dataLoader', {
            get: function () {
                return _dataLoader;
            },
            enumerable: false,
            configurable: false
        });

        if (typeof dataLoader !== 'undefined') {
            _dataLoader = dataLoader;
        }
    };
    MFUtils.extend(MFDataLoaderException, MFException);

    return MFDataLoaderException;
}]);