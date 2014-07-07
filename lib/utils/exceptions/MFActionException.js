'use strict';
/**
 * @file MFActionException.js
 * @brief
 * @date 18/03/2014
 *
 * Copyright (c) 2014 Sopra Group. All rights reserved.
 *
 */

angular.module('mfcore').factory('MFActionException', ['MFException', 'MFUtils', function (MFException, MFUtils) {

	var MFActionException = function MFActionException(message, action, cause) {
		MFActionException._Parent.call(this, message, null);
		this.name = 'MFActionException';

		var _action = '';
		Object.defineProperty(this, 'action', {
			get: function () { return _action; },
			enumerable: false,
			configurable: false
		});

		if (typeof action !== 'undefined') {
			_action = action;
		}
	};

	MFUtils.extend(MFActionException, MFException);

	return MFActionException;
}]);