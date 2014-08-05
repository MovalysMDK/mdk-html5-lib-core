'use strict';
/**
 * @file MFPhoto.js
 * @brief Photo model for view model (ask Laurent ;))
 * @author Jean-Daniel Borowy <jeandaniel.borowy@sopra.com>
 * @date 03/04/2014
 *
 * Copyright (c) 2014 Sopra Group. All rights reserved.
 *
 */

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
