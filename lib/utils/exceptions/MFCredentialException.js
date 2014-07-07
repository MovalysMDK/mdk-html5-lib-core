'use strict';
/**
 * @file MFCredentialException.js
 * @brief
 * @date 18/03/2014
 *
 * Copyright (c) 2014 Sopra Group. All rights reserved.
 *
 */

angular.module('mfcore').factory('MFCredentialException', ['MFException', 'MFUtils', function (MFException, MFUtils) {

	var MFCredentialException = function MFCredentialException(message, cause) {
		MFCredentialException._Parent.call(this,message, null);
		this.name = 'MFCredentialException';
	};
	MFUtils.extend(MFCredentialException, MFException);

	return MFCredentialException;
}]);