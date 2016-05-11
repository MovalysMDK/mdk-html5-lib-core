'use strict';

describe('DAO-cascades-daotest-sql.read.N--1.spec.js', function () {
    var dbName = 'ReadCascade-N-1';
    var $TestService;
    var $rootScope;
    /* Inject angular dependencies */
    /* Set MFCore configuration */
    /* Prepare HTTP Responses */
    beforeEach(function (done) {
        module('data-daotest-sql');
        inject(function (_TestService_, _$rootScope_) {
            $TestService = _TestService_;
            $rootScope = _$rootScope_;
        });
        $TestService.initDataBase(dbName).then(success, error);
        function success() {
            done();
        }

        function error() {
            fail('Init dataBase');
        }
    });
    /***** Unit test *****/
        // 1--N
    it('should get B (Relation: A N--1 B, Main: B). No cascade requested', function (done) {
        inject(function (MFContextFactory, EmployeeDaoSql, MFDalWebSql) {
            var context = MFContextFactory.createInstance();
            MFDalWebSql.dbConnection.transaction(function (t) {
                context.dbTransaction = t;
                EmployeeDaoSql.getEmployeeById(3, context, []).then(function (entity) {
                    expect(entity).not.toBeNull();
                    if (entity) { //
                        expect(entity.lastName).toEqual('Lastname3');
                        expect(entity.agence.nom).toBeNull();
                    }

                    done();
                });

                // Resolve promises and http requests
                $rootScope.$apply();
            });
        });
    });

    it('should get A&B (Relation: A N<>--1 B, Main: A). No cascade requested', function (done) {
        inject(function (MFContextFactory, EmployeeDaoSql, MFDalWebSql, EmployeeCascade) {
            var context = MFContextFactory.createInstance();
            MFDalWebSql.dbConnection.transaction(function (t) {
                context.dbTransaction = t;
                EmployeeDaoSql.getEmployeeById(3, context, [EmployeeCascade.AGENCE]).then(function (entity) {
                    expect(entity).not.toBeNull();
                    if (entity) { //
                        expect(entity.lastName).toEqual('Lastname3');
                        expect(entity.agence).not.toBeNull();
                        expect(entity.agence.nom).toEqual('Nom3');
                    }

                    done();
                });
                // Resolve promises and http requests
                $rootScope.$apply();
            });
        });
    });
    afterEach(function (done) {
        inject(function (MFDalWebSql) {
            MFDalWebSql.closeDatabase();
            done();
        });
    });
});