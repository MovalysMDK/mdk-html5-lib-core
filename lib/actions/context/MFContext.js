'use strict';
/**
 * Created by fgouy on 26/03/14.
 */

angular.module('mfcore').factory('MFContext', ['MFMappingHelper', 'MFUtils', 'MFDataModelCache', function (MFMappingHelper, MFUtils, MFDataModelCache) {
    function MFContext() {
        var _dbTransaction;
        var _errorMessages = [];
        var _warningMessages = [];
        var _infoMessages = [];
        var _daoSession = {};
        var _rollback = false;
        var _fullListDone = [];

        Object.defineProperties(this, {
            rollback: {
                get: function () {
                    return _rollback;
                },
                set: function (value) {
                    _rollback = value ? value : _rollback;
                    /* Keep rollback true even if value is false */
                },
                enumerable: true,
                configurable: false
            },

            dbTransaction: {
                get: function () {
                    return _dbTransaction;
                },
                set: function (value) {
                    _dbTransaction = value;
                },
                enumerable: true,
                configurable: false
            },

            messages: {
                get: function () {
                    return _errorMessages.concat(_warningMessages, _infoMessages);
                },
                enumerable: true,
                configurable: false
            },

            errorMessages: {
                get: function () {
                    return _errorMessages;
                },
                set: function (value) {
                    _errorMessages = value;
                },
                enumerable: true,
                configurable: false
            },

            warningMessages: {
                get: function () {
                    return _warningMessages;
                },
                set: function (value) {
                    _warningMessages = value;
                },
                enumerable: true,
                configurable: false
            },

            infoMessages: {
                get: function () {
                    return _infoMessages;
                },
                set: function (value) {
                    _infoMessages = value;
                },
                enumerable: true,
                configurable: false
            },

            daoSession: {
                get: function () {
                    return _daoSession;
                },
                set: function (value) {
                    _daoSession = value;
                },
                enumerable: true,
                configurable: false
            },
            fullListDone: {
                get: function () {
                    return _fullListDone;
                },
                set: function (value) {
                    _fullListDone = value;
                },
                enumerable: true,
                configurable: false
            }
        });
    }

    var messageToString = function (msg) {
        if (angular.isString(msg)) {
            return msg;
        }
        else if (angular.isUndefinedOrNull(msg)) {
            return '';
        }
        else if (msg.message) {
            return msg.message;
        }
        else if (msg.data) {
            return msg.data;
        }
        else {
            return msg.toString();
        }
    };

    MFContext.prototype.addError = function (msg) {
        this.rollback = true;
        console.error(msg);
        var msgStr = messageToString(msg);
        this.errorMessages.push({
            level: 'ERROR',
            message: msgStr
        });
    };

    MFContext.prototype.addWarning = function (msg) {
        console.warn(msg);
        var msgStr = messageToString(msg);
        this.warningMessages.push({
            level: 'WARNING',
            message: msgStr
        });
    };

    MFContext.prototype.addInfo = function (msg) {
        console.info(msg);
        var msgStr = messageToString(msg);
        this.infoMessages.push({
            level: 'INFO',
            message: msgStr
        });
    };

    MFContext.prototype.toStringMessagesList = function () {
        var messages = this.messages;
        var result = '';
        for (var i = 0; i < messages.length; i++) {
            result += messages[i].message + ' \n';
        }
        return result;
    };

    MFContext.prototype.valueOf = function () {
        var text = 'MFContext:\n';
        return text + this.toStringMessagesList();
    };


    MFContext.prototype.addToDaoSession = function addToDaoSession(entityName, entities) {
        var entitiesArray = MFUtils.toArray(entities);

        for (var i = 0; i < entitiesArray.length; i++) {
            var cacheId = MFDataModelCache.getCacheIdentifier(entityName + 'Factory', [entitiesArray[i].idToString]);
            if (!angular.isUndefinedOrNull(cacheId)) {
                this.daoSession[cacheId] = entitiesArray[i];
            }
        }
    };

    return MFContext;
}]);