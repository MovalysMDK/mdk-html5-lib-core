'use strict';
/**
 * @file MFDalWp8.js
 * @brief
 * @author François Cabelguen <francois.cabelguen@sopragroup.com>
 * @date 22/01/2014
 *
 * Copyright (c) 2014 Sopra Group. All rights reserved.
 *
 */

var MFDalSqlModule = angular.module('mfcore');

MFDalSqlModule.factory('MFDalSqliteWp8', ['$rootScope', '$q', '$http', 'MFDalSqlAbstract', function ($rootScope, $q, $http, MFDalSqlAbstract) {

    var MFDalSqlWp8 = function ($rootScope, $q) {
    };

    MFDalSqlWp8.prototype = MFDalSqlAbstract;

    /**
     *  run SQL request
     * @param {Object} p_tx transaction object
     * @param {String} p_sequenceId, sequence name
     * @param {Object} p_sqlWithParams, SQL file containing SQL queries {'sql', 'params'}
     * @param {Object} p_callbackSuccess, function callback success function
     * @param {Object} p_callbackError, function callback error
     */
    var execute = function (p_tx, p_db, p_sequenceId, p_sqlWithParams, p_callbackSuccess, p_callbackError) {

        if (!angular.isArray(p_sqlWithParams)) {
            p_sqlWithParams = [p_sqlWithParams];
        }
        p_sequenceId = p_sequenceId || -1;
        console.log(p_sequenceId);
        var oDeferred = $q.defer();

        var errorResults = [];
        var successResults = [];
        var iIndexError = null;

        var sqlFn = function (sqltx) {
            p_sqlWithParams.forEach(function (sqlItem, index) {
                console.log(sqlItem.sql);
                sqltx.executeSql(sqlItem.sql, sqlItem.params || [],
                    function (stx, results) {
                        var len = results.rows.length;
                        if (len > 0) {
                            var output_results = [];
                            for (var i = 0; i < len; i++) {
                                output_results.push(results.rows.item(i));
                            }
                            successResults.splice(index, 0, output_results);
                        } else {
                            successResults.splice(index, 0, results);
                        }
                    },
                    function (ftx, error) {
                        iIndexError = index;
                        console.log('ERREUR FCA ROLLBACK');
                        errorResults.push(error);
                        return true;
                    }
                );

            });
        };

        p_db.transaction(function (tx) {
            sqlFn(tx);
        }, function () {
            console.log('Transaction NOK');
            p_callbackError.call(this, { 'sequence': p_sequenceId, 'indexError': iIndexError, 'messageError': errorResults[0] });
        }, function () {
            console.log('Transaction OK');
            p_callbackSuccess.call(this, { 'sequence': p_sequenceId, 'successResults': successResults });
        });

    };

    return angular.extend(new MFDalSqlWp8(), {

        /**
         * open function, create if not exist and open database
         * @param {Object} p_params, {'name', 'version', 'description', 'size'}
         * @return {Object} promise
         */
        open: function (p_params) {
            console.log('MF DAL WP8 OPEN DATABASE');
            var self = this;
            var deferred = $q.defer();
            var db = window.sqlitePlugin.openDatabase(p_params.name, p_params.version, p_params.description, p_params.size, function () {
                if (db) {
                    self.mpf_setDb(db);
                    deferred.resolve('MFDalSqlWp8: Open Database');
                }
                else {
                    deferred.reject('MFDalSqlWp8: Error Open Database');
                }
            });

            return deferred.promise;
        },

        /**
         *  transaction manager
         * @param {Object} anonymous function, tx argument
         * @return promise
         */
        run: function (p_transaction) {
            var deferred = $q.defer();

            var length = 0;

            p_transaction({ 'deferred': deferred });

            return deferred.promise;
        },

        /**
         *  manages expectations and requests the closing of transaction
         * @param {Object} p_tx transaction object
         * @param {Object} p_callbackSuccess, function callback success function
         * @param {Object} p_callbackError, function callback error
         */
        WaitRequest: function (tx, p_callbackSuccess, p_callbackError, p_label) {

            var remaining = 0;
            var deferred = tx.deferred;

            return {
                init: function (p_remaining) {
                    remaining = p_remaining;
                },

                success: function (p_results) {
                    --remaining;
                    if (remaining > 0) {

                        return;
                    }
                    else {
                        if (p_callbackSuccess !== null) {
                            p_callbackSuccess.call(this, p_results);
                        }
                        deferred.resolve();
                    }

                },

                error: function (p_results) {
                    if (--remaining > 0) {
                        return;
                    }
                    else {
                        if (p_callbackError !== null) {
                            p_callbackError.call(this, p_results);
                        }
                        deferred.reject();
                    }

                }

            };
        },

        /**
         * isExist function, check if db by table exist
         * @param {Object} p_tx, SQL file containing SQL queries
         * @param {Object} p_requests, SQL file containing SQL queries {'sql', 'params'}
         * @param {Object} p_callbackSuccess, function callback success function
         * @param {Object} p_callbackError, function callback error function
         */
        isExist: function (p_tx, p_requests, p_callbackSuccess, p_callbackError) {
            console.log('ISEXIST');
            var self = this;
            execute(null, self.mpf_getDb(), 'TableIsExist', p_requests, function (success) {

                if (typeof success.successResults[0].rows === 'undefined') {
                    console.log('111');
                    p_callbackSuccess.call(this, { 'sequence': success.sequence, 'successResults': true});
                }
                else {
                    console.log('222');
                    p_callbackSuccess.call(this, { 'sequence': success.sequence, 'successResults': false});
                }
            }, function (value) {
                console.log('333');
                p_callbackError.call(this, { 'sequence': 'IsExist', 'indexError': 0, 'messageError': 'isExist request Error'});
            });
        },

        /**
         * init function, initialisation database for application, use a file
         * @param {Object} p_tx, SQL file containing SQL queries
         * @param {Object} p_requestsCreateTable, SQL file containing SQL queries {'sql', 'params'}
         * @param {Object} p_requestsInitData, SQL file containing SQL queries {'sql', 'params'}
         * @param {Object} p_callbackSuccess, function callback success function
         * @param {Object} p_callbackError, function callback error function
         */
        init: function (p_tx, p_requestsCreateTable, p_requestsInitData, p_callbackSuccess, p_callbackError) {

            var self = this;
            execute(null, self.mpf_getDb(), 'CreateTable', p_requestsCreateTable, function (success) {

                execute(null, self.mpf_getDb(), 'InitBaseInternal', p_requestsInitData, function (success) {
                    p_callbackSuccess.call(this, { 'sequence': success.sequence });
                }, function (error) {
                    p_callbackError.call(this, { 'sequence': error.sequence, 'indexError': error.indexError, 'messageError': error.messageError });

                });

            }, function (error) {
                console.log('MFDalSql: erreur create table');
                console.log(error);
            });
        },

        /**
         * reset function, reset database for application, use a file
         * @param {Object} p_tx, SQL file containing SQL queries
         * @param {Object} p_requestsResetDb, SQL file containing SQL queries {'sql', 'params'}
         * @param {Object} p_callbackSuccess, function callback success function function return {sequence: String}
         * @param {Object} p_callbackError, function callback error function return {sequence: String, indexError: Integer, messageError: String}
         */
        reset: function (p_tx, p_requestsResetDb, p_callbackSuccess, p_callbackError) {
            console.log('RESET');
            var self = this;
            execute(null, self.mpf_getDb(), 'ResetBaseInternal', p_requestsResetDb, function (success) {
                p_callbackSuccess.call(this, { 'sequence': success.sequence });
            }, function (error) {
                p_callbackError.call(this, { 'sequence': error.sequence, 'indexError': error.indexError, 'messageError': error.messageError });
            });
        },

        /**
         * create function, create element in database
         * @param {Object} p_tx, SQL file containing SQL queries
         * @param {String} p_sequenceId, sequence name
         * @param {Object} p_sqlWithParams, SQL file containing SQL queries {'sql', 'params'}
         * @param {Object} p_callbackSuccess, function callback success function return {sequence: String, successResults: Array}, successResults is element id
         * @param {Object} p_callbackError, function callback error function return {sequence: String, indexError: Integer, messageError: String}
         */
        create: function (p_tx, p_sequenceId, p_sqlWithParams, p_callbackSuccess, p_callbackError) {
            var self = this;
            execute(null, self.mpf_getDb(), p_sequenceId, p_sqlWithParams, function (success) {
                p_callbackSuccess.call(this, { 'sequence': success.sequence, 'successResults': success.successResults[0] });
            }, function (error) {
                p_callbackError.call(this, { 'sequence': error.sequence, 'indexError': error.indexError, 'messageError': error.messageError });
            });
        },

        /**
         * update function, update element in database
         * @param {Object} p_tx, SQL file containing SQL queries
         * @param {String} p_sequenceId, sequence name
         * @param {Object} p_sqlWithParams, SQL file containing SQL queries {'sql', 'params'}
         * @param {Object} p_callbackSuccess, function callback success function return {sequence: String}
         * @param {Object} p_callbackError, function callback error function return {sequence: String, indexError: Integer, messageError: String}
         */
        update: function (p_tx, p_sequenceId, p_sqlWithParams, p_callbackSuccess, p_callbackError) {
            var self = this;
            execute(null, self.mpf_getDb(), p_sequenceId, p_sqlWithParams, function (success) {
                p_callbackSuccess.call(this, { 'sequence': success.sequence });
            }, function (error) {
                p_callbackError.call(this, { 'sequence': error.sequence, 'indexError': error.indexError, 'messageError': error.messageError });
            });
        },

        /**
         * read function, create element in database
         * @param {Object} p_tx, SQL file containing SQL queries
         * @param {String} p_sequenceId, sequence name
         * @param {Object} p_sqlWithParams, SQL file containing SQL queries {'sql', 'params'}
         * @param {Object} p_callbackSuccess, function callback success function return {sequence: String, successResults: Array}
         * @param {Object} p_callbackError, function callback error function return {sequence: String, indexError: Integer, messageError: String}
         */
        read: function (p_tx, p_sequenceId, p_sqlWithParams, p_callbackSuccess, p_callbackError) {
            var self = this;
            execute(null, self.mpf_getDb(), p_sequenceId, p_sqlWithParams, function (success) {

                if (!angular.isArray(success.successResults[0])) {
                    p_callbackSuccess.call(this, { 'sequence': success.sequence, 'successResults': [] });
                } else {
                    p_callbackSuccess.call(this, { 'sequence': success.sequence, 'successResults': success.successResults[0] });

                }
            }, function (error) {
                p_callbackError.call(this, { 'sequence': error.sequence, 'indexError': error.indexError, 'messageError': error.messageError });
            });

        },

        /**
         * remove function, remove element in database
         * @param {Object} p_tx, SQL file containing SQL queries
         * @param {String} p_sequenceId, sequence name
         * @param {Object} p_sqlWithParams, SQL file containing SQL queries {'sql', 'params'}
         * @param {Object} p_callbackSuccess, function callback success function return {sequence: String, successResults: Array}
         * @param {Object} p_callbackError, function callback error function return {sequence: String, indexError: Integer, messageError: String}
         */
        remove: function (p_tx, p_sequenceId, p_sqlWithParams, p_callbackSuccess, p_callbackError) {
            var self = this;
            execute(null, self.mpf_getDb(), p_sequenceId, p_sqlWithParams, function (success) {
                p_callbackSuccess.call(this, { 'sequence': success.sequence });
            }, function (error) {
                p_callbackError.call(this, { 'sequence': error.sequence, 'indexError': error.indexError, 'messageError': error.messageError });
            });
        }




    });
}]);
