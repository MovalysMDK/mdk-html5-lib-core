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

angular.module('mfcore').factory('MFDalException', ['MFException', 'MFUtils', function (MFException, MFUtils) {

    var MFDalException = function MFDalException(dal, message, cause) {
        MFDalException._Parent.call(this, message, null);
        this.name = 'MFDalException';

        var _dal = dal;
        Object.defineProperty(this, 'dal', {
            get: function () {
                return _dal;
            },
            enumerable: false,
            configurable: false
        });

        var _query = null;
        Object.defineProperty(this, 'query', {
            get: function () {
                return _query;
            },
            set: function (value) {
                if (_query === null) {
                    _query = value;
                }
            },
            enumerable: false,
            configurable: false
        });

        var _queryData = null;
        Object.defineProperty(this, 'queryData', {
            get: function () {
                return _queryData;
            },
            set: function (value) {
                if (_queryData === null) {
                    _queryData = value;
                }
            },
            enumerable: false,
            configurable: false
        });
        var _apiError = null;
        Object.defineProperty(this, 'apiError', {
            get: function () {
                return _apiError;
            },
            set: function (value) {
                if (_apiError === null) {
                    _apiError = value;
                }
            },
            enumerable: false,
            configurable: false
        });
    };

    MFUtils.extend(MFDalException, MFException);
    MFDalException.prototype.toString = function toString() {
        var result = this.dal + ' [ ' + this.query + ' ] ';
        if (!angular.isUndefinedOrNullOrEmpty(this.apiError)) {
            result += this.apiError.message;
        }
        return result;
    };

    return MFDalException;
}]);