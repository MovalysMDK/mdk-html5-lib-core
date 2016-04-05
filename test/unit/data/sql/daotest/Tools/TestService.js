'use strict';
angular
    .module('data-daotest-sql')
    .factory('TestService', TestService);

TestService.$inject = ['MFSyncPromiseProvider', 'MFConfigurationService', 'MFDatabaseTypeSelector', 'MFInitScheduler', '$httpBackend', 'dataSQL', '$rootScope', 'MFDalWebSql', 'CreateUserTable', 'FillUserTable', 'MFContextFactory'];

function TestService($qSync, MFConfigurationService, MFDatabaseTypeSelector, MFInitScheduler, $httpBackend, dataSQL, $rootScope, MFDalWebSql, CreateUserTable, FillUserTable, MFContextFactory) {
    var service = {
        dbConfiguration: dbConfiguration,
        prepareHttp: prepareHttp,
        clearDataBase: clearDataBase,
        fillDataBase: fillDataBase,
        initDataBase: initDataBase,
        tables: ['T_AGENCEDETAIL',
            'T_ACTIVITE',
            'T_AGENCEPHOTOS',
            'T_SKILL',
            'T_RESERVATION',
            'T_EMPLOYEE',
            'T_RESOURCE',
            'T_CLIENT',
            'T_AGENCE',
            'T_WORD',
            'T_EMPLSKILL']
    };
    return service;
    ///////////////////////////

    function dbConfiguration(dbName) {
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
        console.setLogLevel('ERROR');
        spyOn(MFInitScheduler, 'notify');
        MFDatabaseTypeSelector.isSQL = function () {
            return true;
        };
    }

    function prepareHttp() {
        $httpBackend.whenGET('assets/data/sql/create_usermodel.sql').respond(dataSQL.daotestDataModel);
        $httpBackend.whenGET('assets/data/sql/create_userdata.sql').respond(dataSQL.daotestData);
    }

    function clearDataBase() {
        var deferred = $qSync.defer();
        var context = MFContextFactory.createInstance();
        MFDalWebSql.openDatabase(true).then(function (db) {
            CreateUserTable.createTable(context, true, function (ok) {
                if (ok) {
                    deferred.resolve(db);
                } else {
                    deferred.reject();
                }
            });
            $httpBackend.flush();
            $rootScope.$apply();
        });
        return deferred.promise;
    }

    function fillDataBase(success, error) {
        var deferred = $qSync.defer();
        var context = MFContextFactory.createInstance();
        MFDalWebSql.openDatabase(false).then(
            function (db) {
                FillUserTable.fillTable(context, true, function (ok) {
                    if (ok) {
                        deferred.resolve(db);
                    } else {
                        deferred.reject();
                    }

                });
                $httpBackend.flush();
                $rootScope.$apply();
            }
        );
        return deferred.promise;
    }

    function initDataBase(dbName) {
        var deferred = $qSync.defer();
        var context = MFContextFactory.createInstance();
        dbConfiguration(dbName);
        prepareHttp();
        MFDalWebSql.openDatabase(true).then(function (db) {
            CreateUserTable.createTable(context, true, function (ok) {
                if (ok) {
                    FillUserTable.fillTable(context, true, function (ok) {
                        if (ok) {
                            deferred.resolve(db);
                        } else {
                            deferred.reject();
                        }

                    });
                    $httpBackend.flush();
                    $rootScope.$apply();
                } else {
                    deferred.reject();
                }
            });
            $httpBackend.flush();
            $rootScope.$apply();
        });
        return deferred.promise;

    }
}

