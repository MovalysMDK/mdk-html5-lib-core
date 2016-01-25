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
    Object.defineProperties(MFDalIndexedDBTransaction,{
        startedTransactions: {
            value:[],
            writable:true,
            configurable: false,
            enumerable: false
        }
    });


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

        //1. check if the active transaction can be used
        var activeTransaction = null;
        console.debug('nb of started transactions : '+MFDalIndexedDBTransaction.startedTransactions.length);

      for (var startedTransIdx = MFDalIndexedDBTransaction.startedTransactions.length - 1; activeTransaction === null && startedTransIdx >= 0; startedTransIdx--) {
          // try to get a transaction having all the requested object stores
          var currentTransaction = MFDalIndexedDBTransaction.startedTransactions[startedTransIdx];
          if (writable === currentTransaction.writable) {
            var atLeastOneMissing = false;
            for (var j = 0; !atLeastOneMissing && j < objectStoreNames.length; ++j) {
              atLeastOneMissing = ! currentTransaction.stores.hasOwnProperty(objectStoreNames[j]);
            }
            // We found all the stores we need
            if (!atLeastOneMissing) {
              activeTransaction = currentTransaction;
              console.debug('Found an active transaction. Reusing it. Stores : ' + JSON.stringify(activeTransaction.stores));
            }
          }
      }
       
       // Try the transaction first
       if (activeTransaction !== null) {
         try {
          activeTransaction.stores[objectStoreNames[0]].count();
         } catch (e) {
           console.warn('The transaction with store ' + objectStoreNames[0] + 'isn\'t active anymore. Creating a new one');
           activeTransaction = null;
         }
       }
       
        if(activeTransaction === null){
            var mode = writable ? 'readwrite' : 'readonly';
            console.debug('no current active transaction  => will open a new transaction (mode='+mode+', objStores[0]= '+objectStoreNames[0]+', nb of stores='+objectStoreNames.length+') ');
            var innoDBTransaction = this.db.transaction(objectStoreNames, mode);
            console.assert(!angular.isUndefinedOrNull(innoDBTransaction),'transaction creation failed (mode:'+mode+')');

            innoDBTransaction.oncomplete = function (event){
                console.debug('Transaction completed',this);
                var completedTransaction = this; // or event.target
                for(var k=0;k<MFDalIndexedDBTransaction.startedTransactions.length;k++){
                    if(MFDalIndexedDBTransaction.startedTransactions[k].tx === completedTransaction){
                        MFDalIndexedDBTransaction.startedTransactions.splice(k, 1);
                    }
                }
                //execute listeners
                if(MFDalIndexedDBTransaction.startedTransactions.length === 0){
                    for(var l=0;l<self.onCommitListeners.length;l++){
                        self.onCommitListeners[l](event);
                    }
                }
            };

            innoDBTransaction.onerror = function (event) {
                console.debug('Transaction failure',this);
                var failedTransaction = this; // or event.target
                self.rollbackFromFailedTransaction(failedTransaction);
            };

            innoDBTransaction.onabort = function (event) {
                console.debug('Transaction abortion',this);
                var abortedTransaction = this; // or event.target
                self.rollbackFromFailedTransaction(abortedTransaction);
            };

            var objectStores = {};

            for (var j = 0; j < objectStoreNames.length; ++j) {
                var objectStoreName = objectStoreNames[j];
                objectStores[objectStoreName] = innoDBTransaction.objectStore(objectStoreName);
                console.assert(!angular.isUndefinedOrNull(objectStores[objectStoreName]),'object store '+objectStoreName+' not found and not created');
            }

            activeTransaction = {
                tx:innoDBTransaction,
                stores:objectStores,
                writable:writable
            };

            MFDalIndexedDBTransaction.startedTransactions.push(activeTransaction);
            console.debug('new transaction created (total nb of started transactions: '+MFDalIndexedDBTransaction.startedTransactions.length+')');

        }

        return activeTransaction;

    };

    MFDalIndexedDBTransaction.prototype.rollbackFromFailedTransaction = function (failedTransaction) {
        console.error('The failure of the following transaction will cause the rollback of all the other opened transactions',failedTransaction);

        for (var k = 0; k < MFDalIndexedDBTransaction.startedTransactions.length; k++) {
            if (MFDalIndexedDBTransaction.startedTransactions[k].tx !== failedTransaction) {
                try {
                    // rollback all the other transactions
                    MFDalIndexedDBTransaction.startedTransactions[k].tx.abort();
                }
                catch (e) {
                    console.warn(e);
                }
            }
        }
        console.debug('clear started transactions pool');
        MFDalIndexedDBTransaction.startedTransactions.clear();

        //3. execute listeners
        this.executeRollbackListeners(failedTransaction.error);
    };

    MFDalIndexedDBTransaction.prototype.rollback = function (event) {
        for(var k=0;k<MFDalIndexedDBTransaction.startedTransactions.length;k++){
            try {
                // rollback transaction
                MFDalIndexedDBTransaction.startedTransactions[k].tx.abort();
            }
            catch(e){
                console.warn(e);
            }
        }
        console.debug('clear started transactions pool');
        MFDalIndexedDBTransaction.startedTransactions.clear();
        

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