'use strict';
describe('MFDalWebSQL', function () {
    var dbName = 'MFDalWebSQL';
    var $TestService;
    var $rootScope;
    /* Inject angular dependencies */
    /* Set MFCore configuration */
    /* Prepare HTTP Responses */
    beforeEach(function (done) {
        module('data-daotest-sql');
        inject(function (_TestService_, _$rootScope_) {
            $TestService = _TestService_;
            $rootScope = _$rootScope_
        });
        $TestService.dbConfiguration(dbName);
        $TestService.prepareHttp();
        done();
    });

    /***** Unit test *****/
    it('should clear db and create stores from files', function (done) {
        $TestService.clearDataBase().then(success, error);
        function success(db) {
            testCreateUserTable(db, done);
        }

        function error() {
            fail('create user table fail');
        }
    });

    it('should add data in the stores', function (done) {
        $TestService.fillDataBase().then(success, error);
        function success(db) {
            testFillUserTable(db, done);
        }
        function error() {
            fail('fill user table fail');
        }
    });

    function testCreateUserTable(db, done) {
        var test = true;
        var table = $TestService.tables;
        var number = 0;
        var length = table.length;
        db.transaction(function (tx) {
            for (var i = 0; i < length; i += 1) {
                tx.executeSql('SELECT * FROM ' + table[i], [], function () {
                    number += 1;
                }, function () {
                    number += 1;
                    test = false;
                });
            }
        });

        waitUntil(function () {
            return number === length;
        }).then(function () {
            expect(test).toBe(true);
            done();
        });

    }

    function testFillUserTable(db, done) {
        var test = true;
        var table = $TestService.tables;
        var number = 0;
        var length = table.length;
        db.transaction(function (tx) {
            for (var i = 0; i < length; i += 1) {
                tx.executeSql('SELECT * FROM ' + table[i], [], function (t, data) {
                    number += 1;
                    if (data.rows.length !== 17  ) {
                        test = false;
                    }
                }, function () {
                    number += 1;
                    test = false;
                });
            }
        });

        waitUntil(function () {
            return number === length;
        }).then(function () {
            expect(test).toBe(true);
            done();
        });

    }

});