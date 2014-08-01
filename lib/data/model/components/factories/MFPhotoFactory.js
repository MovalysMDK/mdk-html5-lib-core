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

angular.module('mfcore').factory('MFPhotoFactory', ['MFPhoto', 'MFPhotoState', 'MFAddressLocationFactory', function (MFPhoto, MFPhotoState, MFAddressLocationFactory) {
    var MFPhotoFactory = function MFPhotoFactory() {
    };

    MFPhotoFactory.prototype.createInstance = function () {
        var newInstance = new MFPhoto();
        newInstance.name = '';
        newInstance.uri = '';
        newInstance.date = new Date();
        newInstance.desc = '';
        newInstance.photoState = MFPhotoState.FWK_NONE;
        newInstance.photoLocation = MFAddressLocationFactory.createInstance();

        return newInstance;
    };

    return new MFPhotoFactory();
}]);
