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

angular.module('mfcore').factory('MFException', ['MFUtils', function (MFUtils) {

    var MFException = function MFException(message, cause) {

        Object.defineProperty(this, 'stack', {
            value: null,
            writable: true,
            enumerable: true,
            configurable: false
        });

        Object.defineProperty(this, 'message', {
            value: null,
            writable: true,
            enumerable: true,
            configurable: false
        });

        Object.defineProperty(this, 'name', {
            value: null,
            writable: true,
            enumerable: true,
            configurable: false
        });

        Object.defineProperty(this, 'cause', {
            value: null,
            writable: true,
            enumerable: true,
            configurable: false
        });


        this.stack = MFException._Parent.call(this, message).stack;
        this.message = message;
        this.name = this.constructor.name;
        this.cause = cause;

    };

    MFUtils.extend(MFException, Error);

    MFException.prototype.valueOf = function () {
        return this.name + ': ' + this.message + '\n' + this.stack;
    };

    MFException.prototype.toString = function () {
        return this.name + ': ' + this.message + '\n' + this.stack;
    };

    return MFException;
}]);