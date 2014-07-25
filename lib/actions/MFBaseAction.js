/**
 * Base action object
 * Created by Sergio Contreras on 18/03/14.
 */

'use strict';
angular.module('mfcore').factory('MFBaseAction', ['MFSyncPromiseProvider', 'MFAbstractEnum', function($qSync, MFAbstractEnum) {
	var MFBaseAction = function MFBaseAction() {

        var doAction = function() {
            console.warn('You do not implement doAction method');
        };

        Object.defineProperties(this, {
            deferred: {
                value: null,
                writable: true,
                configurable: false,
                enumerable: true
            },
            doAction: {
                get: function() {
                    return doAction;
                },
                set: function(value) {
                    var self = this;
                    doAction = function() {
                        console.info('MFBaseAction: doAction: ', this);
                        self.status = MFBaseActionStatus.RUNNING;
                        try {
                            value.apply(this, arguments);
                        } catch (e) {
                            var context = arguments[0];
//							context.addError(e);
                            console.error(e.message + '\n' + e.stack, e);
                            self.rejectPromise(e, context);
                        }
                        return this;
                    };
                },
                enumerable: false,
                configurable: false
            },
            atomic: {
                value: false,
                writable: true,
                enumerable: true,
                configurable: false
            },
            database: {
                value: false,
                writable: true,
                enumerable: true,
                configurable: false
            },
            type: {
                value:  'MFBaseAction',
                writable: true,
                enumerable: true,
                configurable: false
            }
        });

    };

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

		var action = new MFBaseAction();
        if(angular.isBoolean(options.atomic)){
            action.atomic = options.atomic;
        }
        if(angular.isBoolean(options.database)) {
            action.database = options.database;
        }
        if(angular.isString(options.type)) {
            action.type = options.type;
        }
        action.deferred = $qSync.defer();

		return action;
	};

	return MFBaseAction;
}]);