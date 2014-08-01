'use strict';
/**
 * @file MFSynchroException.js
 * @brief
 * @date 18/03/2014
 *
 * Copyright (c) 2014 Sopra Group. All rights reserved.
 *
 */

angular.module('mfcore').factory('MFSynchroException', ['MFException', 'MFUtils', function (MFException, MFUtils) {

    var MFSynchroException = function MFSynchroException(message, cause) {
        MFSynchroException._Parent.call(this, message, null);
        this.name = 'MFSynchroException';
    };
    MFUtils.extend(MFSynchroException, MFException);

    return MFSynchroException;
}]);