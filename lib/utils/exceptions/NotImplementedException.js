'use strict';
/**
 * @file NotImplementedException.js
 * @brief
 * @date 18/03/2014
 *
 * Copyright (c) 2014 Sopra Group. All rights reserved.
 *
 */

angular.module('mfcore').factory('NotImplementedException', ['MFException', 'MFUtils', function (MFException, MFUtils) {

    var NotImplementedException = function NotImplementedException(message) {
        NotImplementedException._Parent.call(this, message, null);
        this.name = 'NotImplementedException';
    };

    NotImplementedException.prototype.toString = function () {
        return 'toto';
    };

    MFUtils.extend(NotImplementedException, MFException);

    return NotImplementedException;
}]);