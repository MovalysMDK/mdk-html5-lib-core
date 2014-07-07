'use strict';
/**
 * @file MFAddressLocationFactory.js
 * @brief Photo model for view model (ask Laurent ;))
 * @author Jean-Daniel Borowy <jeandaniel.borowy@sopra.com>
 * @date 03/04/2014
 *
 * Copyright (c) 2014 Sopra Group. All rights reserved.
 *
 */

angular.module('mfcore').factory('MFAddressLocationFactory', ['MFAddressLocation', function (MFAddressLocation) {
	var MFAddressLocationFactory = function MFAddressLocationFactory() {
	};

	MFAddressLocationFactory.prototype.createInstance = function() {
		var newInstance = new MFAddressLocation();
		newInstance.latitude = null;
		newInstance.longitude = null;
		newInstance.street = '';
		newInstance.compl = '';
		newInstance.city = '';
		newInstance.country = '';

		return newInstance;
	};

	return new MFAddressLocationFactory();
}]);
