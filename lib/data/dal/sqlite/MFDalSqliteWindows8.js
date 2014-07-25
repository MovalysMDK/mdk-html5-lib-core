'use strict';
/**
 * @file MFDalSqlWindows8.js
 * @brief
 * @author François Cabelguen <francois.cabelguen@sopragroup.com>
 * @date 22/01/2014
 *
 * Copyright (c) 2014 Sopra Group. All rights reserved.
 *
 */

var MFDalSqlModule = angular.module('mfcore');

MFDalSqlModule.constant('ASYNC', {
    RUN: 1,
    ONE: 2,
    EACH: 3
});

MFDalSqlModule.factory('MFDalSqlliteWindows8', ['$rootScope', '$q', '$http', 'ASYNC', 'MFDalSqlAbstract', function ($rootScope, $q, $http, ASYNC, MFDalSqlAbstract) {

    var MFDalSqlWindows8 = function ($rootScope, $q) {
    };

    MFDalSqlWindows8.prototype = MFDalSqlAbstract;

    /**
     *  run SQL request
     * @param {Object} p_tx transaction object*
     * @param {Object} p_tx transaction object
     * @param {String} p_sequenceId, sequence name
     * @param {Object} p_sqlWithParams, SQL file containing SQL queries {'sql', 'params'}
     * @param {Object} p_callbackSuccess, function callback success function
     * @param {Object} p_callbackError, function callback error
     */
    var execute = function (p_db, p_tx, p_mode, p_sqlWithParams, p_sequenceId, p_callbackSuccess, p_callbackError) {

        if (!angular.isArray(p_sqlWithParams)) {
            p_sqlWithParams = [p_sqlWithParams];
        }

        var errorResults = [];
        var successResults = [];
        var iIndexError = null;

        var remaining = p_sqlWithParams.length;

        var countdown = function () {
            if (--remaining > 0) {
                return;
            }

            if (errorResults.length > 0) {
                p_tx.launchRollbackTransaction();
                p_callbackError.call(this, { 'sequence': p_sequenceId, 'indexError': iIndexError, 'messageError': errorResults[0] });

            }
            else {

                p_callbackSuccess.call(this, { 'sequence': p_sequenceId, 'successResults': successResults });

            }
        };

        var sqlFn = function () {
            p_sqlWithParams.forEach(function (sqlItem, index) {
                if (p_mode === ASYNC.ONE) {
                    // console.log('ONE ASYNC');
                    $q.when('start').then(function () {
                        return p_db.oneAsync(sqlItem.sql, sqlItem.params || []) // execute request
                            .then(function (results) { // if execute request success
                                successResults.splice(index, 0, results);
                            });
                    }).then(function (value) {
                            countdown();
                        }, function (error) {
                            iIndexError = index;
                            errorResults.push(error);
                            countdown();
                        });
                } else if (p_mode === ASYNC.EACH) {
                    //  console.log('EACH ASYNC');
                    $q.when('start').then(function () {
                        return p_db.eachAsync(sqlItem.sql, sqlItem.params || [],
                            function (results) { // if execute request success
                                successResults.splice(index, 0, results);


                            });
                    }).then(function (value) {
                            countdown();
                        }, function (error) {
                            iIndexError = index;
                            errorResults.push(error);
                            countdown();
                        });

                } else {
                    // console.log('RUN ASYNC');
                    $q.when('start').then(function () {
                        return p_db.runAsync(sqlItem.sql, sqlItem.params || []) // execute request
                            .then(function (results) { // if execute request success
                                successResults.splice(index, 0, results);
                            });
                    }).then(function (value) {
                            countdown();
                        }, function (error) {
                            iIndexError = index;
                            errorResults.push(error);
                            countdown();
                        });
                }
            });
        };

        sqlFn();

    };


    return angular.extend(new MFDalSqlWindows8(), {

        /**
         * open function, create if not exist and open database
         * @param {String} p_sFileNameParamsDb, JSON file {'name': '', 'version': '', 'description': '', 'size': }
         * @return {Object} promise
         */
        open: function () {
            console.log('MF DAL WINDOWS8 OPEN DATABASE');
            var deferred = $q.defer();
            var self = this;
            var dbPath = Windows.Storage.ApplicationData.current.localFolder.path + '\\db.sqlite';

            //Package = Windows.ApplicationModel.Package;
            SQLite3JS.openAsync(dbPath).then(
                function (db) {
                    self.mpf_setDb(db);
                    deferred.resolve('MFDalSqlWindows8: Open Database');
                },
                function (error) {
                    deferred.reject('MFDalSqlWindows8: Error Open Database');
                });
            return deferred.promise;
        },

        /**
         *  manages expectations and requests the closing of transaction
         * @param {Object} p_tx transaction object
         * @param {Object} p_callbackSuccess, function callback success function
         * @param {Object} p_callbackError, function callback error
         */
        WaitRequest: function (p_tx, p_callbackSuccess, p_callbackError) {

            var remaining = 0;
            p_tx.length++;

            return {
                init: function (p_remaining) {
                    remaining = p_remaining;
                },

                success: function (p_results) {
                    remaining--;
                    if (remaining <= 0) {
                        p_tx.length--;
                        if (p_tx.length <= 0) {
                            p_tx.launchEndTransaction();
                        }
                        if (p_callbackSuccess !== null) {
                            p_callbackSuccess.call(this, p_results);
                        }

                    }

                },

                error: function (p_results) {
                    if (remaining-- <= 0) {
                        p_tx.length--;
                        if (p_callbackError !== null) {
                            p_callbackError.call(this, p_results);
                        }
                    }

                }

            };
        },

        /**
         *  transaction manager
         * @param {Object} anonymous function, tx argument
         * @return promise
         */
        run: function (p_transaction) {

            var deferred = $q.defer();

            var length = 0;

            var db = this.mpf_getDb();

            var launchEndTransaction = function () {
                db.runAsync('END TRANSACTION;')
                    .then(function () {
                        deferred.resolve('MFDalSqlWindows8:  END TRANSACTION');
                    }, function () {
                        deferred.reject('MFDalSqlWindows8:  END TRANSACTION  ERROR EXECUTE');
                    });
            };

            var launchRollbackTransaction = function () {
                db.runAsync('ROLLBACK;')
                    .then(function () {
                        deferred.reject('MFDalSqlWindows8:  ROLLBACK TRANSACTION');
                    }, function () {
                        deferred.reject('MFDalSqlWindows8:  ROLLBACK TRANSACTION ERROR EXECUTE');
                    });
            };

            $q.when(true).then(function (value) {

                return db.runAsync('BEGIN TRANSACTION;')
                    .then(null, function () {
                        deferred.reject('MFDalSqlWindows8:  OPEN TRANSACTION');
                    });

            }).then(function (value) { //Action if load file is success

                    p_transaction({'launchEndTransaction': launchEndTransaction, 'launchRollbackTransaction': launchRollbackTransaction, 'length': length});

                });

            return deferred.promise;
        },

        /**
         *  cancel manual transaction
         * @param {Object} p_tx transaction object
         * @param {Object} p_callbackSuccess, function callback success function
         */
        cancel: function (p_tx, p_callbackSuccess) {
            p_tx.launchRollbackTransaction();
            p_callbackSuccess.call(this);
        },

        /**
         * isExist function, check if db by table exist
         * @param {Object} p_tx, SQL file containing SQL queries
         * @param {Object} p_requests, SQL file containing SQL queries {'sql', 'params'}
         * @param {Object} p_callbackSuccess, function callback success function
         * @param {Object} p_callbackError, function callback error function
         */
        isExist: function (p_tx, p_requests, p_callbackSuccess, p_callbackError) {
            console.log('ISEXIST Windows 8');
            execute(this.mpf_getDb(), p_tx, ASYNC.ONE, p_requests, 'IsExist', function (success) {
                if (success.successResults[0] !== null) {
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
            execute(self.mpf_getDb(), p_tx, ASYNC.RUN, p_requestsCreateTable, 'CreateTable', function (success) {
                execute(self.mpf_getDb(), p_tx, ASYNC.RUN, p_requestsInitData, 'InitBaseInternal', function (success) {
                    p_callbackSuccess.call(this, { 'sequence': success.sequence});
                }, function (error) {
                    p_callbackError.call(this, { 'sequence': error.sequence, 'indexError': error.indexError, 'messageError': error.messageError});

                });

            }, function (error) {
                p_callbackError.call(this, { 'sequence': 'init', 'indexError': 0, 'messageError': 'create table fail'});
            });
        },

        /**
         * reset function, reset database for application, use a file
         * @param {Object} p_tx, SQL file containing SQL queries
         * @param {Object} p_requestsResetDb, SQL file containing SQL queries {'sql', 'params'}
         * @param {Object} p_callbackSuccess, function callback success function function return {sequence: String}
         * @param {Object} p_callbackError, function callback error function return {sequence: String, indexError: Integer, messageError: String}
         */
        reset: function (p_tx, requestsResetDb, p_callbackSuccess, p_callbackError) {
            console.log('RESET');
            execute(this.mpf_getDb(), p_tx, ASYNC.RUN, requestsResetDb, 'ResetBaseInternal', function (success) {
                p_callbackSuccess.call(this, { 'sequence': success.sequence});
            }, function (error) {
                p_callbackError.call(this, { 'sequence': error.sequence, 'indexError': error.indexError, 'messageError': error.messageError});
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
            execute(this.mpf_getDb(), p_tx, ASYNC.RUN, p_sqlWithParams, p_sequenceId, function (success) {
                p_callbackSuccess.call(this, { 'sequence': success.sequence, 'successResults': { 'insertId': self.mpf_getDb().lastInsertRowId } });
            }, function (error) {
                p_callbackError.call(this, { 'sequence': error.sequence, 'indexError': error.indexError, 'messageError': error.messageError});
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
            execute(this.mpf_getDb(), p_tx, ASYNC.RUN, p_sqlWithParams, p_sequenceId, function (success) {
                p_callbackSuccess.call(this, { 'sequence': success.sequence});
            }, function (error) {
                p_callbackError.call(this, { 'sequence': error.sequence, 'indexError': error.indexError, 'messageError': error.messageError});
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
            execute(this.mpf_getDb(), p_tx, ASYNC.EACH, p_sqlWithParams, p_sequenceId, function (success) {

                if (!angular.isArray(success.successResults)) {

                    p_callbackSuccess.call(this, { 'sequence': success.sequence, 'successResults': [] });
                } else {
                    p_callbackSuccess.call(this, { 'sequence': success.sequence, 'successResults': success.successResults });

                }

            }, function (error) {
                p_callbackError.call(this, { 'sequence': error.sequence, 'indexError': error.indexError, 'messageError': error.messageError});
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
            execute(this.mpf_getDb(), p_tx, ASYNC.EACH, p_sqlWithParams, p_sequenceId, function (success) {
                p_callbackSuccess.call(this, { 'sequence': success.sequence});
            }, function (error) {
                p_callbackError.call(this, { 'sequence': error.sequence, 'indexError': error.indexError, 'messageError': error.messageError});
            });
        }

    });
}]);