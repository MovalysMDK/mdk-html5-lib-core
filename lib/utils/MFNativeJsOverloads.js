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


(function () {


    // #######################################
    // ###  ARRAY
    // #######################################

    Object.defineProperty(Array.prototype, 'clear', {
        value: function () {
            this.length = 0;
        },
        enumerable: false,
        configurable: false
    });


    Object.defineProperty(Array.prototype, 'remove', {
        value: function (val) {

            var idx = this.indexOf(val);
            if (idx !== -1) {
                return this.splice(idx, 1);
            }
            else {
                return false;
            }
        },
        enumerable: false,
        configurable: false
    });


    // #######################################
    // ###  PERFORMANCE
    // #######################################

    if (window.performance === undefined) {
        window.performance = {};
    }
    if (window.performance.now === undefined) {
        window.performance.now = Date.now;
    }


    // #######################################
    // ###  ANGULAR
    // #######################################

    angular.isBoolean = function (val) {
        return typeof val === 'boolean';
    };
    angular.isUndefinedOrNull = function (val) {
        return typeof val === 'undefined' || val === null;
    };//Direct comparisons against undefined are troublesome as undefined can be overwritten

    angular.isUndefinedOrNullOrEmpty = function (value) {
        return typeof value === 'undefined' || value === null || value.length === 0 || typeof value === 'object' && Object.keys(value).length === 0;
    };

    angular.isDefinedButNullOrEmpty = function (value) {
        return typeof value !== 'undefined' && (value === null || value.length === 0 || typeof value === 'object' && Object.keys(value).length === 0);
    };


    // #######################################
    // ###  FUNCTION
    // #######################################

    // Monkey patch IE for support for Fonction.name
    if (Function.prototype.name === undefined && Object.defineProperty !== undefined) {
        Object.defineProperty(Function.prototype, 'name', {
            get: function () {
                if (this._name === undefined) {
                    var funcNameRegex = /function\s+(.{1,})\s*\(/;
                    var results = (funcNameRegex).exec((this).toString());
                    this._name = (results && results.length > 1) ? results[1] : '';
                }
                return this._name;
            },
            set: function (value) {
            }
        });
    }

    // #######################################
    // ###  STRING
    // #######################################

    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };


    // #######################################
    // ###  STORAGE
    // #######################################

    Object.defineProperty(window.Storage.prototype, 'addNotSuppressibleKey', {
        value: function (value) {
            var keys = this.getNotSuppressibleKeys();
            if (keys.indexOf(value) < 0) {
                keys.push(value);
                this.setItem('_notSuppressibleKeys', JSON.stringify(keys));
            }
        },
        writable: false,
        enumerable: false,
        configurable: false
    });

    Object.defineProperty(window.Storage.prototype, 'getNotSuppressibleKeys', {
        value: function () {
            var record = this.getItem('_notSuppressibleKeys');
            var keys;
            if (angular.isUndefinedOrNullOrEmpty(record)) {
                keys = [];
            }
            else {
                keys = JSON.parse(record);
            }
            return keys;
        },
        writable: false,
        enumerable: false,
        configurable: false
    });


    window.Storage.prototype._clear = window.Storage.prototype.clear;

    window.Storage.prototype.clear = function () {
        var notSuppressibleKeys = angular.copy(this.getNotSuppressibleKeys());
        var objectsToRestore = {};
        for (var i = 0; i < notSuppressibleKeys.length; i++) {
            var currKey = notSuppressibleKeys[i];
            objectsToRestore[currKey] = angular.copy(this.getItem(currKey));
        }
        this._clear();
        this.setItem('_notSuppressibleKeys', JSON.stringify(notSuppressibleKeys));

        for (var key in objectsToRestore) {
            if (objectsToRestore.hasOwnProperty(key)) {
                this.setItem(key, objectsToRestore[key]);
            }
        }
    };


})();
