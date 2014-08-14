'use strict';
/**
 * Created by fgouy on 26/03/14.
 */

angular.module('mfcore').factory('MFTransactionManager', ['MFDatabaseTypeSelector', 'MFDalSqlProxy', 'MFDalNoSqlProxy', 'MFContextFactory', 'MFDataModelCache',
    function (MFDatabaseTypeSelector, MFDalSqlProxy, MFDalNoSqlProxy, MFContextFactory, MFDataModelCache) {

        var MFTransactionManager = function MFTransactionManager() {
            //constructor
        };


        /**
         * Execute the function p_todoDuringTransaction inside a Database transaction.
         *  //!!   Asynchronous code is forbidden inside the function p_todoDuringTransaction !
         *
         * @param p_todoDuringTransaction synchronous function to execute inside the DB transaction
         * @param p_todoAfterRollback(error,context)
         * @param p_inParams
         */
        MFTransactionManager.prototype.run = function (p_context, p_todoDuringTransaction, p_todoAfterRollback, p_inParams) {
            console.assert(!angular.isUndefinedOrNull(p_context), 'p_context is a required parameter');
            console.assert(!angular.isUndefinedOrNull(p_todoDuringTransaction), 'p_todoDuringTransaction is a required parameter');

            var o_db;
            var transactionDoStuff = function (tx) {
                p_context.dbTransaction = tx;
                p_todoDuringTransaction(p_context, p_inParams);
            };

            var transactionErrorHandler = function (error) {
                console.error('[MFTransactionManager] transaction failure caught', error);
                p_context.dbTransaction = null;
                p_context.daoSession = {};
                p_context.addError(error);

                if (angular.isFunction(p_todoAfterRollback)) {
                    p_todoAfterRollback(error, p_context);
                }
            };

            var transactionSuccessHandler = function (success) {
                MFDataModelCache.pushDaoCache(p_context);
                console.log('[MFTransactionManager] transaction ended with success');
            };

            try {
                if (MFDatabaseTypeSelector.isSQL()) {
                    o_db = MFDalSqlProxy.dbConnection();
                    o_db.transaction(transactionDoStuff, transactionErrorHandler, transactionSuccessHandler);
                } else  if (MFDatabaseTypeSelector.isNoSQL()) {
                    var tx = MFDalNoSqlProxy.openTransaction();
                    tx.registerOnRollback(transactionErrorHandler);
                    tx.registerOnCommit(transactionSuccessHandler);
                    transactionDoStuff(tx);
                }
            }
            catch (exception) {
                transactionErrorHandler(exception);
            }

        };

        return new MFTransactionManager();
    }]);