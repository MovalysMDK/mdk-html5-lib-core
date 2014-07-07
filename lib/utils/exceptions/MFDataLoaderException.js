'use strict';
/**
 * @file MFDataLoaderException.js
 * @brief
 * @date 18/03/2014
 *
 * Copyright (c) 2014 Sopra Group. All rights reserved.
 *
 */

angular.module('mfcore').factory('MFDataLoaderException', ['MFException', 'MFUtils', function (MFException, MFUtils) {

	var MFDataLoaderException = function MFDataLoaderException(dataLoader, message, cause) {
		MFDataLoaderException._Parent.call(this,message, null);
		this.name = 'MFDataLoaderException';

		var _dataLoader = '';
		Object.defineProperty(this, 'dataLoader', {
			get: function () { return _dataLoader; },
			enumerable: false,
			configurable: false
		});

		if (typeof dataLoader !== 'undefined') {
			_dataLoader = dataLoader;
		}
	};
	MFUtils.extend(MFDataLoaderException, MFException);

	return MFDataLoaderException;
}]);