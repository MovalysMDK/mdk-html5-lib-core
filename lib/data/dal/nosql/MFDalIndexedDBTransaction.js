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
        Object.defineProperties(this, {
            startedTransactions: {
                value:[],
                writable:true,
                configurable: false,
                enumerable: false
            },
            startedTransactionsNumber: {
                value:0,
                writable:true,
                configurable: false,
                enumerable: false
            },

            onCommitListeners: {
                value:[],
                writable:true,
                configurable: false,
                enumerable: false
            },
            onRollbackListeners: {
                value:[],
                writable:true,
                configurable: false,
                enumerable: false
            },

            db: {
                value:null,
                writable:true,
                configurable: false,
                enumerable: false
            },
            rollbackDone: {
                value:false,
                writable:true,
                configurable: false,
                enumerable: false
            }

        });
        this.db = dbConnection;
    };

    // read more : http://www.w3.org/TR/IndexedDB/#transaction-concept


    MFDalIndexedDBTransaction.prototype.registerOnCommit = function (listener) {
        console.assert(angular.isFunction(listener),'listener should be a function');
        this.onCommitListeners.push(listener);
    };

    MFDalIndexedDBTransaction.prototype.registerOnRollback = function (listener) {
        console.assert(angular.isFunction(listener),'listener should be a function');
        this.onRollbackListeners.push(listener);
    };



    MFDalIndexedDBTransaction.prototype.getObjectStore = function (objectStoreName, writable) {
        console.assert(angular.isString(objectStoreName), 'objectStoreName should be a string');
        console.assert(angular.isBoolean(writable), 'writable should be a boolean');

        var resultingTransaction = this.resolve([objectStoreName],writable);
        return resultingTransaction.stores[objectStoreName];
    };

    MFDalIndexedDBTransaction.prototype.resolve = function (objectStoreNames, writable) {
        console.assert(angular.isBoolean(writable), 'writable should be a boolean');
        console.assert(angular.isArray(objectStoreNames),'objectStoreNames should be an array');

        var self = this;


        var useActiveTransaction = true;

        //1. check if the active transaction can be used
        var activeTransaction = this.startedTransactions[this.startedTransactions.length-1];
        //only the last started transaction is considered as active (to avoid the error "The transaction is not active...")

        if(!angular.isUndefinedOrNull(activeTransaction)){
            if(!angular.isUndefinedOrNull(activeTransaction.tx.error)) {
                self.rollbackFromFailedTransaction(activeTransaction);
                useActiveTransaction = false;
            }
            else {
                for (var i = 0; i < objectStoreNames.length; ++i) {
                    console.assert(angular.isString(objectStoreNames[i]),'the objectstore name should be a string');
                    if (!activeTransaction.stores.hasOwnProperty(objectStoreNames[i]) || (!activeTransaction.writable && writable)) {
                        //the active transaction does not have one of the requested object store
                        //OR the active transaction is not writable whereas the requested mode is writable=true
                        useActiveTransaction = false;
                    }
                }
            }
        }
        else {
            useActiveTransaction = false;
        }

        if(!useActiveTransaction){
            var mode = writable ? 'readwrite' : 'readonly';
            var innoDBTransaction = this.db.transaction(objectStoreNames, mode);
            console.assert(!angular.isUndefinedOrNullOrEmpty(innoDBTransaction),'transaction creation failed (mode:'+mode+')');

            if(innoDBTransaction.hasOwnProperty('oncomplete')){
                innoDBTransaction.oncomplete = function (event){
                    var completedTransaction = this; // or event.target
                    for(var k=0;k<self.startedTransactions.length;k++){
                        if(self.startedTransactions[k] !== null && self.startedTransactions[k].tx === completedTransaction){
                            self.startedTransactions[k] = null;
                            self.startedTransactionsNumber--;
                        }
                    }
                    //execute listeners
                    if(self.startedTransactionsNumber <= 0){
                        for(var l=0;l<self.onCommitListeners.length;l++){
                            self.onCommitListeners[l](event);
                        }
                    }
                };
            }

            if(innoDBTransaction.hasOwnProperty('onerror')) {
                innoDBTransaction.onerror = function (event) {
                    var failedTransaction = this; // or event.target
                    self.rollbackFromFailedTransaction(failedTransaction);
                };
            }

            if(innoDBTransaction.hasOwnProperty('onabort')) {
                innoDBTransaction.onabort = function (event) {
                    var abortedTransaction = this; // or event.target
                    self.rollbackFromFailedTransaction(abortedTransaction);
                };
            }

            var objectStores = {};

            for (var j = 0; j < objectStoreNames.length; ++j) {
                var objectStoreName = objectStoreNames[j];
                objectStores[objectStoreName] = innoDBTransaction.objectStore(objectStoreName);
                console.assert(!angular.isUndefinedOrNullOrEmpty(objectStores[objectStoreName]),'object store '+objectStoreName+' not found and not created');
            }

            activeTransaction = {
                tx:innoDBTransaction,
                stores:objectStores,
                writable:writable
            };

            this.startedTransactions.push(activeTransaction);
            this.startedTransactionsNumber++;

        }

        return activeTransaction;

    };

    MFDalIndexedDBTransaction.prototype.rollbackFromFailedTransaction = function (failedTransaction) {
        console.error('The failure of the following transaction will cause the rollback of all the other opened transactions',failedTransaction);

        for (var k = 0; k < this.startedTransactions.length; k++) {
            if (this.startedTransactions[k] !== null && this.startedTransactions[k].tx !== failedTransaction) {
                try {
                    // rollback all the other transactions
                    this.startedTransactions[k].tx.abort();
                }
                catch (e) {
                    console.warn(e);
                }
            }
        }
        this.startedTransactions.clear();
        this.startedTransactionsNumber = 0;

        //3. execute listeners
        this.executeRollbackListeners(failedTransaction.tx.error);
    };

    MFDalIndexedDBTransaction.prototype.rollback = function (event) {
        for(var k=0;k<this.startedTransactions.length;k++){
            if(this.startedTransactions[k] !== null ){
                try {
                    // rollback transaction
                    this.startedTransactions[k].tx.abort();
                }
                catch(e){
                    console.warn(e);
                }
            }
        }
        this.startedTransactions.clear();
        this.startedTransactionsNumber = 0;

        // execute listeners
        this.executeRollbackListeners(event);
    };

    MFDalIndexedDBTransaction.prototype.executeRollbackListeners = function (event) {
        if(!this.rollbackDone){
            for(var m=0;m<this.onRollbackListeners.length;m++){
                this.onRollbackListeners[m](event);
            }
            this.rollbackDone = true;
        }
    };

        return MFDalIndexedDBTransaction;
});