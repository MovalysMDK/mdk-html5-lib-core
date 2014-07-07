'use strict';
/**
 * @file MFDalException.js
 * @brief
 * @date 04/04/2014
 *
 * Copyright (c) 2014 Sopra Group. All rights reserved.
 *
 */

angular.module('mfcore').factory('MFDalException', ['MFException', 'MFUtils', function (MFException, MFUtils) {

	var MFDalException = function MFDalException(dal, message, cause) {
        MFDalException._Parent.call(this,message, null);
		this.name = 'MFDalException';

		var _dal = dal;
		Object.defineProperty(this, 'dal', {
			get: function () { return _dal; },
			enumerable: false,
			configurable: false
		});

		var _query = null;
		Object.defineProperty(this, 'query', {
			get: function () { return _query; },
			set: function (value) {
				if (_query === null) {
					_query = value;
				}
			},
			enumerable: false,
			configurable: false
		});

		var _apiError = null;
		Object.defineProperty(this, 'apiError', {
			get: function () { return _apiError; },
			set: function (value) {
				if (_apiError === null) {
					_apiError = value;
				}
			},
			enumerable: false,
			configurable: false
		});
	};

	MFUtils.extend(MFDalException, MFException);
    MFDalException.prototype.toString = function toString(){
        return this.apiError.message;
    };

	return MFDalException;
}]);