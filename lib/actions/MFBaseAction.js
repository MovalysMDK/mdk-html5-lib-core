/**
 * Copyright (C) 2016 Sopra Steria Group (movalys.support@soprasteria.com)
 *
 * This file is part of Movalys MDK.
 * Movalys MDK is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * Movalys MDK is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 * You should have received a copy of the GNU Lesser General Public License
 * along with Movalys MDK. If not, see <http://www.gnu.org/licenses/>.
 */
/**
 * Base action object
 */

'use strict';
angular.module('mfcore').factory('MFBaseAction', ['MFSyncPromiseProvider', 'MFAbstractEnum', function ($qSync, MFAbstractEnum) {

    var MFBaseActionStatus = function MFBaseActionStatus() {
    };
    MFAbstractEnum.defineEnum(MFBaseActionStatus, ['NOT_STARTED', 'RUNNING', 'SUCCEEDED', 'FAILED']);

    var MFBaseAction = function MFBaseAction() {

        var doAction = function () {
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
                get: function () {
                    return doAction;
                },
                set: function (value) {
                    var self = this;
                    doAction = function () {
                        console.info('['+this.type+'] starts running', this);
                        self.status = MFBaseActionStatus.RUNNING;
                        try {
                            value.apply(this, arguments);
                        } catch (e) {
                            var context = arguments[0];
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
                value: 'MFBaseAction',
                writable: true,
                enumerable: true,
                configurable: false
            }
        });

    };

    MFBaseAction.prototype = {
        /**
         * MFBaseAction status enumeration
         **/
        Status: MFBaseActionStatus,
        /**
         * Resolves promise action
         **/
        resolvePromise: function (actionResult, context) {
            console.assert(!angular.isUndefinedOrNullOrEmpty(context) && !angular.isUndefinedOrNull(context.messages), 'context should be returned in the resolve of doAction()');
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
        rejectPromise: function (error, context) {
            console.assert(!angular.isUndefinedOrNullOrEmpty(context) && !angular.isUndefinedOrNull(context.messages), 'context should be returned in the resolve of doAction()');
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
        then: function () {
            return this.deferred.promise.then.apply(
                this.deferred.promise,
                arguments);
        }
    };

    MFBaseAction.createInstance = function (options) {

        console.assert(!angular.isUndefinedOrNullOrEmpty(options), 'options is a required parameter of MFBaseAction.createInstance()');
        console.assert(!angular.isUndefinedOrNullOrEmpty(options.atomic), 'options.atomic is a required parameter of MFBaseAction.createInstance()');
        console.assert(!angular.isUndefinedOrNullOrEmpty(options.database), 'options.database is a required parameter of MFBaseAction.createInstance()');
        console.assert(!angular.isUndefinedOrNullOrEmpty(options.type), 'options.type is a required parameter of MFBaseAction.createInstance()');

        var action = new MFBaseAction();
        if (angular.isBoolean(options.atomic)) {
            action.atomic = options.atomic;
        }
        if (angular.isBoolean(options.database)) {
            action.database = options.database;
        }
        if (angular.isString(options.type)) {
            action.type = options.type;
        }
        action.deferred = $qSync.defer();

        return action;
    };

    return MFBaseAction;
}]);