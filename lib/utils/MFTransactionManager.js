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
'use strict';

angular.module('mfcore').factory('MFTransactionManager', ['MFDatabaseTypeSelector', 'MFDalSqlProxy', 'MFDalNoSqlProxy', 
    function (MFDatabaseTypeSelector, MFDalSqlProxy, MFDalNoSqlProxy) {

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
                p_context.daoSession = {};

                if (angular.isFunction(p_todoAfterRollback)) {
                    p_todoAfterRollback(error, p_context);
                }
            };

            var transactionSuccessHandler = function (success) {
                p_context.daoSession = {};
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