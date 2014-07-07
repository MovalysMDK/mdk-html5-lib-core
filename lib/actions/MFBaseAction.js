/**
 * Base action object
 * Created by Sergio Contreras on 18/03/14.
 */

'use strict';
angular.module('mfcore').factory('MFBaseAction', ['MFSyncPromiseProvider', 'MFAbstractEnum', function($qSync, MFAbstractEnum) {
	var MFBaseAction = function MFBaseAction() {};

	var MFBaseActionStatus = function MFBaseActionStatus() {};
	MFAbstractEnum.defineEnum(MFBaseActionStatus, ['NOT_STARTED', 'RUNNING', 'SUCCEEDED', 'FAILED']);

	MFBaseAction.prototype = {
			/**
			 * MFBaseAction status enumeration
			 **/
			Status: MFBaseActionStatus,
			/**
			 * Resolves promise action
			 **/
			resolvePromise: function(actionResult, context) {
                console.assert(!angular.isUndefinedOrNullOrEmpty(context) && !angular.isUndefinedOrNull(context.messages),'context should be returned in the resolve of doAction()');
				var contextMessages = angular.isUndefined(context.messages) ? [] : context.messages;
				this.status = MFBaseActionStatus.SUCCEEDED;
				this.deferred.resolve({
					result: actionResult,
					messages: contextMessages
				});
			},
			/**
			 * Rejects promise action
			 */
			rejectPromise: function(error, context) {
                console.assert(!angular.isUndefinedOrNullOrEmpty(context) && !angular.isUndefinedOrNull(context.messages),'context should be returned in the resolve of doAction()');
                context.addError(error);
				this.status = MFBaseActionStatus.FAILED;
                console.error(error);
				this.deferred.reject({
					error: error,
					messages: context.messages
				});
			},
			/**
			 * Calls promise.then(...)
			 **/
			then: function() {
				return this.deferred.promise.then.apply(
						this.deferred.promise,
						arguments);
			}
	};

	MFBaseAction.createInstance = function(options) {

        console.assert(!angular.isUndefinedOrNullOrEmpty(options), 'options is a required parameter of MFBaseAction.createInstance()');
        console.assert(!angular.isUndefinedOrNullOrEmpty(options.atomic), 'options.atomic is a required parameter of MFBaseAction.createInstance()');
        console.assert(!angular.isUndefinedOrNullOrEmpty(options.database), 'options.database is a required parameter of MFBaseAction.createInstance()');
        console.assert(!angular.isUndefinedOrNullOrEmpty(options.type), 'options.type is a required parameter of MFBaseAction.createInstance()');

		options = options === undefined ? {
			atomic: false,
			database: false,
			type: 'MFBaseAction'
		} : options;

		var action = new MFBaseAction();
		var doAction = function() {
			console.warn('You do not implement doAction method');
		};

		Object.defineProperties(action, {
			deferred: {
				value: $qSync.defer(),
				writable: false,
				configurable: false,
				enumerable: true
			},
			doAction: {
				get: function() {
					return doAction;
				},
				set: function(value) {
					doAction = function() {
						console.info('MFBaseAction: doAction: ', this);
						this.status = MFBaseActionStatus.RUNNING;
						try {
							value.apply(this, arguments);
						} catch (e) {
							var context = arguments[0];
//							context.addError(e);
							console.error(e.message + '\n' + e.stack, e);
							this.rejectPromise(e, context);
						}
						return this;
					};
				},
				enumerable: false,
				configurable: false
			},
			atomic: {
				value: options.atomic,
				writable: true,
				enumerable: true,
				configurable: false
			},
			database: {
				value: options.database,
				writable: true,
				enumerable: true,
				configurable: false
			},
			type: {
				value: (options.type === undefined ? 'MFBaseAction' : options.type),
				writable: false,
				enumerable: false,
				configurable: false
			}
		});

		return action;
	};

	return MFBaseAction;
}]);