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
        var request = openDatabase('testdao', '1', 'testdao database', 5000000);
        if (request) {
            for (var i = 0, length = table.length; i < length; i += 1) {
                request.transaction(function (tx) {
                    tx.executeSql('DROP TABLE ' + table[i]);
                });
            }
            done();
        } else {
            fail(event.target.webkitErrorMessage || event.target.errorCode);

        }
    });


    /** Inject angular dependencies */
    beforeEach(function () {
        module('data-daotest-sql');

        inject(function (_$q_, _$rootScope_, _$httpBackend_,dataSQL) {
            $q = _$q_;
            $rootScope = _$rootScope_;
            $httpBackend = _$httpBackend_;
            $dataSQL = dataSQL;
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
        $httpBackend.whenGET('base/test/unit/data/sql/daotest/daotest-data-model.sql').respond($dataSQL.daotestData);
        $httpBackend.whenGET('assets/data/sql/create_userdata.sql').respond($dataSQL.daotestDataModel);
    });

    /***** Unit test *****/
    it('should create stores from files', function (done) {
        inject(function (MFDalWebSql, MFSystem) {
            // Expect a GET call
            $httpBackend.expectGET('base/test/unit/data/sql/daotest/daotest-data-model.sql');

            // Load data and create DB
            MFSystem.getAssets(['base/test/unit/data/sql/daotest/daotest-data-model.sql'], false).then(
                function (createStoresScripts) {
                    MFDalWebSql.openDatabase(createStoresScripts).then(
                        function (db) {
                            // Open the DB
                            var transaction = db.transaction(['Expense', 'Customer', 'Report', 'ExpenseType']);
                            expect(transaction.objectStore('Expense')).not.toBeNull();
                            expect(transaction.objectStore('Customer')).not.toBeNull();
                            expect(transaction.objectStore('Report')).not.toBeNull();
                            expect(transaction.objectStore('ExpenseType')).not.toBeNull();
                            expect(function () {
                                transaction.objectStore('Dummy')
                            }).toThrow();
                            done();
                        });
                });

            // Resolve promises and http requests
            $httpBackend.flush();
            $rootScope.$apply();
        });
    });

    it('should add data in the stores', function (done) {
        inject(function (MFInitFillInUserTables, MFContextFactory, MFDalIndexedDB, MFInitTaskStatus) {
            var context = MFContextFactory.createInstance();

            MFDalIndexedDB.openDatabase().then(
                function (db) {
                    MFInitFillInUserTables.runTaskNoSql(context, true);

                    // Resolve promises and http requests
                    $rootScope.$apply();
                    $httpBackend.flush();

                    var transaction = db.transaction(['Expense', 'Customer', 'Report', 'ExpenseType']);
                    var expenseCountRequest = transaction.objectStore('Expense').count();
                    var customerCountRequest = transaction.objectStore('Customer').count();
                    var reportCountRequest = transaction.objectStore('Report').count();
                    var expenseTypeCountRequest = transaction.objectStore('ExpenseType').count();
                    var checksDone = 0;

                    expenseCountRequest.onsuccess = function () {
                        expect(expenseCountRequest.result).toEqual(5);
                        checksDone++;
                        console.log()
                    }
                    customerCountRequest.onsuccess = function () {
                        expect(customerCountRequest.result).toEqual(5);
                        checksDone++;
                    }
                    reportCountRequest.onsuccess = function () {
                        expect(reportCountRequest.result).toEqual(9);
                        checksDone++;
                    }
                    expenseTypeCountRequest.onsuccess = function () {
                        expect(expenseTypeCountRequest.result).toEqual(7);
                        checksDone++;
                    }

                    // Wait for checks to be done
                    waitUntil(function () {
                        return checksDone === 4;
                    }).then(function () {
                        done();
                    });
                }
            );
        });
    });
});