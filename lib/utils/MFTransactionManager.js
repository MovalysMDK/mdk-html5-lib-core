'use strict';
/**
 * Created by fgouy on 26/03/14.
 */

angular.module('mfcore').factory('MFTransactionManager', ['MFDalSupport', 'MFDalSqlProxy', 'MFDalNoSqlProxy', 'MFContextFactory','MFDataModelCache',
                                                          function(MFDalSupport, MFDalSqlProxy, MFDalNoSqlProxy, MFContextFactory,MFDataModelCache) {

	var MFTransactionManager = function MFTransactionManager(){
		//constructor
		this.labelSupport = null;
	};


	/**
	 * Execute the function p_todoDuringTransaction inside a Database transaction.
	 *  //!!   Asynchronous code is forbidden inside the function p_todoDuringTransaction !
	 *
	 * @param p_todoDuringTransaction synchronous function to execute inside the DB transaction
	 * @param p_todoAfterRollback(error,context)
	 * @param p_inParams
	 */
	MFTransactionManager.prototype.run = function (p_context, p_todoDuringTransaction, p_todoAfterRollback, p_inParams){
		console.assert(!angular.isUndefinedOrNull(p_context), 'p_context is a required parameter');
		console.assert(!angular.isUndefinedOrNull(p_todoDuringTransaction), 'p_todoDuringTransaction is a required parameter');

		var o_db;
		var transactionDoStuff = function (tx) {
			p_context.dbTransaction = tx;
			p_todoDuringTransaction(p_context, p_inParams);
		};

		var transactionErrorHandler = function (error) {
			console.error('MFTransactionManager.run function(error)',error);
			p_context.dbTransaction = null;
            p_context.daoSession = {};
            p_context.addError(error);

			if (angular.isFunction(p_todoAfterRollback)) {
				p_todoAfterRollback(error, p_context);
			}
		};

		var transactionSuccessHandler = function (success) {
            MFDataModelCache.pushDaoCache(p_context);
			console.log('MFTransactionManager.run function(success)');
		};

		this.labelSupport = (this.labelSupport === null) ? MFDalSupport.getDalSupportBase() : this.labelSupport;

        try {
            if (this.labelSupport === 'WEBSQL' || this.labelSupport === 'SQLITE'){
                o_db = MFDalSqlProxy.dbConnection();
                o_db.transaction(transactionDoStuff, transactionErrorHandler, transactionSuccessHandler);
            } else if (this.labelSupport === 'NOSQL') {
                var tx = MFDalNoSqlProxy.openTransaction();
                tx.onerror = transactionErrorHandler;
                tx.oncomplete = transactionSuccessHandler;
                transactionDoStuff(tx);
            }
        }
        catch(exception){
            transactionErrorHandler(exception);
        }

	};

	return new  MFTransactionManager();
}]);