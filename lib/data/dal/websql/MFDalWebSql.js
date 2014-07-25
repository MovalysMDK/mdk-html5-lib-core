'use strict';
/**
 * @file MFDalWebSql.js
 * @brief Data Access Layer
 * @author Jean-Daniel Borowy <jeandaniel.borowy@gmail.com>
 * @date 22/01/2014
 *
 * Copyright (c) 2014 Sopra Group. All rights reserved.
 *
 */


angular.module('mfcore').factory('MFDalWebSql', ['$rootScope', 'MFSyncPromiseProvider', 'MFDalException','MFConfigurationService', function ($rootScope, MFSyncPromiseProvider, MFDalException,MFConfigurationService) {
	var MFDalWebSql = function MFDalWebSql() {};

	Object.defineProperty(MFDalWebSql.prototype, 'dbConnection', {
        value: null,
        writable: true,
		configurable: false,
		enumerable: true
	});

	MFDalWebSql.prototype.openDatabase = function(purge) {
		purge = purge !== undefined && purge;

		localStorage.notSuppressibleKeys.push('dalWebSql#systemTables');
        var self = this;
		var deferred = MFSyncPromiseProvider.defer();
		if (window.openDatabase) {
			if (angular.isUndefinedOrNull(this.dbConnection)) {

				var databaseConfig = MFConfigurationService.getValue('databaseConfig');

               console.assert(!angular.isUndefinedOrNull(databaseConfig), 'MFConfigurationService.openDatabase() : databaseConfig field undefined');

                this.dbConnection = window.openDatabase(
						databaseConfig.name,
						databaseConfig.version,
						databaseConfig.name+' database',
						5000000
				);
				if (this.dbConnection) {
					if (localStorage['dalWebSql#systemTables'] === undefined) {
						this.getSystemTableNames().then(function() {
							deferred.resolve(self.dbConnection);
						}, function(error) {
							deferred.reject(error);
						});
					} else {
						if (purge) {
							var systemTables = JSON.parse(localStorage['dalWebSql#systemTables']);
							this.purgeDatabase(systemTables).then(function() {
								deferred.resolve(self.dbConnection);
							}, function(error) {
								deferred.reject(error);
							});
						} else {
							deferred.resolve(self.dbConnection);
						}
					}
				} else {
					deferred.reject('Unable to open database "'+databaseConfig.name+'"');
				}
			}
		} else {
//			throw new MFDalException('WebSql API is not available');
            deferred.reject('WebSql API is not available');

        }
		return deferred.promise;
	};

	MFDalWebSql.prototype.closeDatabase = function() {
		this.dbConnection = null;
	};

    MFDalWebSql.prototype.getSystemTableNames = function() {
		var deferred = MFSyncPromiseProvider.defer();
		this.dbConnection.transaction(function(t) {
			t.executeSql('select * from sqlite_master', [], function(t, result) {
				var systemTableNames = [];
				for (var i = 0; i < result.rows.length; ++i) {
					var item = result.rows.item(i);
					if (item.type === 'table') {
						systemTableNames.push(item.name);
					}
				}
				localStorage['dalWebSql#systemTables'] = JSON.stringify(systemTableNames);
			});
		}, function (error) {
			deferred.reject(error);
		}, function (success) {
			deferred.resolve(success);
		});
		return deferred.promise;
	};

	MFDalWebSql.prototype.purgeDatabase = function(systemTables) {
		var deferred = MFSyncPromiseProvider.defer();
		this.dbConnection.transaction(function(t) {
			t.executeSql('select * from sqlite_master', [], function(t, result) {
				var errorCB = function() { console.warn('wrong table droped'); return false; };
				for (var i = 0; i < result.rows.length; ++i) {
					var item = result.rows.item(i);
					if (item.type === 'table' && systemTables.indexOf(item.name) === -1) {
						t.executeSql(
								'drop table if exists ' + item.name, [],
								Function.prototype,
								errorCB);
					}
				}
			});
		}, function (error) {
			deferred.reject(error);
		}, function (success) {
			deferred.resolve(success);
		});
		return deferred.promise;
	};

	MFDalWebSql.prototype.executeQuery = function(context, query, parameters) {
		var deferred = MFSyncPromiseProvider.defer();
		execute.call(this, context, query, parameters).then(
				function(results) {
					deferred.resolve(results);
				},
				function(reason) {
					deferred.reject(reason);
				}
		);
		return deferred.promise;
	};

	MFDalWebSql.prototype.executeQueries = function(context, queries) {
		var promises = [];
		var successCB = function(deferred, results) {
			deferred.resolve(context);
		};
		var errorCB = function(deferred, reason) {
			deferred.reject(reason);
		};

		for (var i in queries) {
            if (queries.hasOwnProperty(i)) {
                var deferred = MFSyncPromiseProvider.defer();
                execute.call(this, context, queries[i], []).then(
                    successCB.bind(null, deferred),
                    errorCB.bind(null, deferred)
                );
                promises.push(deferred.promise);
            }
        }
		return MFSyncPromiseProvider.all(promises);
	};

	var execute = function(context, query, parameters) {
		parameters = parameters === undefined ? [] : parameters;
		var deferred = MFSyncPromiseProvider.defer();
		var t0 = window.performance === undefined ? Date.now() : window.performance.now();
		var t1 = 0;
		var dalException = new MFDalException(this, 'WebSql query execution failed');
		dalException.query = query;
		dalException.queryData = parameters;

		context.dbTransaction.executeSql(
				query,
				parameters,
				function(dbTransaction, results) {
					t1 = window.performance === undefined ? Date.now() : window.performance.now();
					results.duration = t1 - t0;
					deferred.resolve(results);
					if (context.rollback) {
						dbTransaction.executeSql(';', [], function() {}, function() {return true;});
					}
				},
				function(dbTransaction, error) {
//					context.messages.push({level:'error', message:message});
					if (context.rollback) {
						error = 'functionnal rollback - '+error;
					} else {
						dalException.apiError = error;
						context.addError(error.message+'  query: [ '+query+' ], queryData: [  '+parameters+' ]');
						console.error(dalException);
						//console.error(dalException.stack);
						context.rollback = true;
					}
					setTimeout(function() {
						deferred.reject(dalException);
					}, 0);
					return true; // does a rollback of the transaction
				}
		);
		return deferred.promise;
	};

	return new MFDalWebSql();
}]);