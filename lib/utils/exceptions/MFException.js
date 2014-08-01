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
            value: MFException._Parent.call(this, message).stack,
            writable: false
        });

        this.name = 'MFException';

        var _cause = null;
        Object.defineProperty(this, 'cause', {
            get: function () {
                return _cause;
            },
            enumerable: false,
            configurable: false
        });

        if (typeof cause !== 'undefined') {
            _cause = cause;
        }
    };
    MFUtils.extend(MFException, Error);
    MFException.prototype.valueOf = function () {
        return this.name + ': ' + this.message + '\n' + this.stack;
    };

    MFException.prototype.toString = function () {
        return this.valueOf();
    };

    return MFException;
}]);