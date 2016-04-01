'use strict';
describe('MFDalWebSQL', function () {
    var dbName = 'MFDalWebSQL';
    var $q, $rootScope, $httpBackend;
    var table = ['T_AGENCEDETAIL',
        'T_ACTIVITE',
        'T_AGENCEPHOTOS',
        'T_SKILL',
        'T_RESERVATION',
        'T_EMPLOYEE',
        'T_RESOURCE',
        'T_CLIENT',
        'T_AGENCE',
        'T_WORD',
        'T_EMPLSKILL'];
    var $dataSQL;

    /** Prepare database : Delete it **/
    beforeAll(function (done) {
        var number = 0;
        var request = openDatabase(dbName, '1', dbName + ' database', 5000000);
        if (request) {
            for (var i = 0, length = table.length; i < length; i += 1) {
                request.transaction(function (tx) {
                    tx.executeSql('DROP TABLE IF EXISTS ' + table[i], [], function () {
                        number += 1;
                    }, function () {
                        number += 1;
                        fail('unable to drop Table ');
                    });
                });
            }

            waitUntil(function () {
                return number === length;
            }).then(function () {
                done();
            });
        } else {
            fail('Unable to open DB');
        }
    });


    /** Inject angular dependencies */
    beforeEach(function () {
        module('data-daotest-sql');

        inject(function (_$q_, _$rootScope_, _$httpBackend_, _dataSQL_) {
            $q = _$q_;
            $rootScope = _$rootScope_;
            $httpBackend = _$httpBackend_;
            $dataSQL = _dataSQL_;
        });
    });

    /** Set MFCore configuration */
    beforeEach(
        inject(function (MFConfigurationService, MFInitScheduler, MFDatabaseTypeSelector) {
            // Set db info
            MFConfigurationService.setValue('databaseConfig', {"name": dbName, "version": "1"});
            MFConfigurationService.setValue('dataBaseType', {
                "browser": {
                    "chrome": [{
                        "comparator": ">=",
                        "version": "23",
                        "database": "WebSql"
                    }]
                }
            });
            MFConfigurationService.setValue('selectedDatabase', 'WebSql');
            MFConfigurationService.setValue('dalPlatform', "Chrome");
            MFConfigurationService.setValue('dalPlatformType', 'browser');
            MFConfigurationService.setValue('dalDatabaseType', 'Sql');
            // Set log level
            console.setLogLevel('ERROR');

            // Block calls to MFInitScheduler.notify
            spyOn(MFInitScheduler, 'notify');

            MFDatabaseTypeSelector.isSQL = function () {
                return true;
            };
        }));

    /**** Prepare HTTP Responses *****/
    beforeEach(function () {
        //jasmine.getJSONFixtures().fixturesPath = 'base/test/unit/data/sql/daotest';
        $httpBackend.whenGET('assets/data/sql/create_usermodel.sql').respond($dataSQL.daotestDataModel);
        $httpBackend.whenGET('assets/data/sql/create_userdata.sql').respond($dataSQL.daotestData);
    });

    /***** Unit test *****/
    it('should create stores from files', function (done) {
        inject(function (MFDalWebSql, CreateUserTable, MFContextFactory) {
            var context = MFContextFactory.createInstance();
            // Expect a GET call
            MFDalWebSql.openDatabase(true).then(function (db) {
                CreateUserTable.createTable(context, true, function (ok) {
                    if (ok) {
                        testCreateUserTable(db, done);
                    } else {
                        fail('create user table fail');
                    }
                });
                $httpBackend.flush();
                $rootScope.$apply();

            });
            // Load data and create DB

            // Resolve promises and http requests
        });
    });
    it('should add data in the stores', function (done) {
        inject(function (MFInitFillInUserTables, MFContextFactory, MFDalWebSql, FillUserTable) {
            var context = MFContextFactory.createInstance();

            MFDalWebSql.openDatabase(false).then(
                function (db) {
                    FillUserTable.fillTable(context, true, function (ok) {
                        if (ok) {
                            testFillUserTable(db, done);
                        } else {
                            fail('fill user table fail');
                            done();
                        }

                    });
                    $httpBackend.flush();
                    $rootScope.$apply();
                }
            );
        });
    });

    function testCreateUserTable(db, done) {
        var test = true
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
        var test = true
        var number = 0;
        var length = table.length;
        db.transaction(function (tx) {
            for (var i = 0; i < length; i += 1) {
                tx.executeSql('SELECT * FROM ' + table[i], [], function (t, data) {
                    number += 1;
                    if (data.rows.length !== 17) {
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