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

angular.module('mfcore').factory('MFPhoto', function () {
    var MFPhoto = function MFPhoto() {
        var _name;
        var _uri;
        var _date;
        var _desc;
        var _photoState;
        var _photoLocation;

        Object.defineProperties(this, {
            name: {
                get: function () {
                    return _name;
                },
                set: function (value) {
                    _name = value;
                },
                enumerable: true,
                configurable: false
            },
            uri: {
                get: function () {
                    return _uri;
                },
                set: function (value) {
                    _uri = value;
                },
                enumerable: true,
                configurable: false
            },
            date: {
                get: function () {
                    return _date;
                },
                set: function (value) {
                    _date = value;
                },
                enumerable: true,
                configurable: false
            },
            desc: {
                get: function () {
                    return _desc;
                },
                set: function (value) {
                    _desc = value;
                },
                enumerable: true,
                configurable: false
            },
            photoState: {
                get: function () {
                    return _photoState;
                },
                set: function (value) {
                    _photoState = value;
                },
                enumerable: true,
                configurable: false
            },
            photoLocation: {
                get: function () {
                    return _photoLocation;
                },
                set: function (value) {
                    _photoLocation = value;
                },
                enumerable: true,
                configurable: false
            }
        });
    };

    MFPhoto.prototype.clone = function () {
        var newModel = new this.constructor();
        newModel.name = this.name;
        newModel.date = this.date;
        newModel.uri = this.uri;
        newModel.desc  = this.desc;
        newModel.photoState  = this.photoState;
        newModel.photoLocation  = this.photoLocation.clone();

        return newModel;
    };

    return MFPhoto;
});
