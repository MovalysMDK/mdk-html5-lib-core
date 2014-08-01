'use strict';
/**
 * @file MFDalIndexedDBTransaction.js
 * @brief Data Access Layer
 * @author Jean-Daniel Borowy <jean-daniel.borowy@sopra.com>
 * @date 22/01/2014
 *
 * Copyright (c) 2014 Sopra Group. All rights reserved.
 *
 */


angular.module('mfcore').factory('MFDalIndexedDBTransaction', function () {
    var MFDalIndexedDBTransaction = function MFDalIndexedDBTransaction(dbConnection) {
        console.log('new MFDalIndexedDBTransaction: ', dbConnection);
        var _transactionPool = [];
        var _objectStores = {};
        var _dbConnection = dbConnection;
        var _onError = null;
        var _onComplete = null;

        Object.defineProperties(this, {
            transactionPool: {
                get: function () {
                    return _transactionPool;
                },
                configurable: false,
                enumerable: false
            },

            objectStores: {
                get: function () {
                    return _objectStores;
                },
                set: function (value) {
                    _objectStores = value;
                },
                configurable: false,
                enumerable: false
            },

            db: {
                get: function () {
                    return _dbConnection;
                },
                configurable: false,
                enumerable: false
            },

            onabort: {
                value: null,
                writable: true,
                configurable: false,
                enumerable: false
            },

            onerror: {
                get: function () {
                    return _onError;
                },
                set: function (value) {
                    _onError = value;
                },
                configurable: false,
                enumerable: false
            },

            oncomplete: {
                get: function () {
                    return _onComplete;
                },
                set: function (value) {
                    _onComplete = value;
                },
                configurable: false,
                enumerable: false
            }
        });
    };

    MFDalIndexedDBTransaction.prototype.commit = function () {
        this.abort = function () {
        };
    };

    MFDalIndexedDBTransaction.prototype.abort = function () {
        for (var i = 0; i < this.transactionPool; ++i) {
            this.transactionPool[i].abort();
        }
        if (this.onabort !== null) {
            this.onabort();
        }
    };

    MFDalIndexedDBTransaction.prototype.objectStore = function (objectStoreName) {
        this.resolve([objectStoreName]);
        return this.objectStores[objectStoreName];
    };

    MFDalIndexedDBTransaction.prototype.resolve = function (objectStoreNames, readonly) {
        var i, objectStoresRequest = [], needsNewTransaction = false;
        readonly = (readonly !== undefined) && readonly;

        for (i = 0; i < objectStoreNames.length; ++i) {
            needsNewTransaction = needsNewTransaction || (this.objectStores[objectStoreNames[i]] === undefined);
            objectStoresRequest.push(objectStoreNames[i]);
        }
        if (objectStoreNames.length > 0) { // needsNewTransaction -> may cause a crash because indexeddb is unstable
            this.objectStores = {};
            var innoDBTransaction = this.db.transaction(objectStoresRequest, readonly ? 'read' : 'readwrite');

            for (i = 0; i < objectStoresRequest.length; ++i) {
                this.objectStores[objectStoresRequest[i]] =
                    innoDBTransaction.objectStore(objectStoresRequest[i]);
            }
            this.transactionPool.push(innoDBTransaction);
        }
    };

    return MFDalIndexedDBTransaction;
});