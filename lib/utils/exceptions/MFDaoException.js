'use strict';
/**
 * @file MFDaoException.js
 * @brief
 * @date 18/03/2014
 *
 * Copyright (c) 2014 Sopra Group. All rights reserved.
 *
 */

angular.module('mfcore').factory('MFDaoException', ['MFException', 'MFUtils', function (MFException, MFUtils) {

    var MFDaoException = function MFDaoException(dao, message, cause) {
        MFDaoException._Parent.call(this, message, null);
        this.name = 'MFDaoException';

        var _dao = '';
        Object.defineProperty(this, 'dao', {
            get: function () {
                return _dao;
            },
            enumerable: false,
            configurable: false
        });

        if (typeof action !== 'undefined') {
            _dao = dao;
        }
    };
    MFUtils.extend(MFDaoException, MFException);

    return MFDaoException;
}]);