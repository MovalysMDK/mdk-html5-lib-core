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

angular.module('mfcore').factory('MFAddressLocation', function () {
    var MFAddressLocation = function MFAddressLocation() {
        var _latitude;
        var _longitude;
        var _street;
        var _compl;
        var _city;
        var _country;

        Object.defineProperties(this, {
            latitude: {
                get: function () {
                    return _latitude;
                },
                set: function (value) {
                    _latitude = value;
                },
                enumerable: true,
                configurable: false
            },
            longitude: {
                get: function () {
                    return _longitude;
                },
                set: function (value) {
                    _longitude = value;
                },
                enumerable: true,
                configurable: false
            },
            street: {
                get: function () {
                    return _street;
                },
                set: function (value) {
                    _street = value;
                },
                enumerable: true,
                configurable: false
            },
            compl: {
                get: function () {
                    return _compl;
                },
                set: function (value) {
                    _compl = value;
                },
                enumerable: true,
                configurable: false
            },
            city: {
                get: function () {
                    return _city;
                },
                set: function (value) {
                    _city = value;
                },
                enumerable: true,
                configurable: false
            },
            country: {
                get: function () {
                    return _country;
                },
                set: function (value) {
                    _country = value;
                },
                enumerable: true,
                configurable: false
            }
        });
    };

    MFAddressLocation.prototype.clone = function () {
        var newModel = new this.constructor();
        newModel.latitude = this.latitude;
        newModel.longitude = this.longitude;
        newModel.street = this.street;
        newModel.compl = this.compl;
        newModel.city = this.city;
        newModel.country = this.country;
        return newModel;
    };

    return MFAddressLocation;
});
