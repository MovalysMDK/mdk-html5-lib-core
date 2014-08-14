'use strict';
/**
 * @file MFException.js
 * @brief
 * @date 18/03/2014
 *
 * Copyright (c) 2014 Sopra Group. All rights reserved.
 *
 */

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