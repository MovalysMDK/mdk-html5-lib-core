'use strict';
/**
 * @file MFAddressLocation.js
 * @brief Photo model for view model (ask Laurent ;))
 * @author Jean-Daniel Borowy <jeandaniel.borowy@sopra.com>
 * @date 03/04/2014
 *
 * Copyright (c) 2014 Sopra Group. All rights reserved.
 *
 */

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
