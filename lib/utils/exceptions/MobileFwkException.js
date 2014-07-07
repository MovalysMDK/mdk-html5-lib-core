'use strict';
/**
 * @file MobileFwkException.js
 * @brief
 * @date 18/03/2014
 *
 * Copyright (c) 2014 Sopra Group. All rights reserved.
 *
 */

angular.module('mfcore').factory('MobileFwkException', ['MFException', 'MFUtils', function (MFException, MFUtils) {

	var MobileFwkException = function MobileFwkException(message, cause) {
		MobileFwkException._Parent.call(this,message, null);
		this.name = 'MobileFwkException';
	};
	MFUtils.extend(MobileFwkException, MFException);

	return MobileFwkException;
}]);