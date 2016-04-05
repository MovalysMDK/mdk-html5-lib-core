'use strict';

describe('DAO-cascades-daotest-sql.read.1--N.spec.js', function () {
    var dbName = 'ReadCascade-1-N';
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
    it('should get A (Relation: A 1--N B, Main: A). No cascade requested', function (done) {
        inject(function (MFContextFactory, AgenceDaoSql, MFDalWebSql) {
            var context = MFContextFactory.createInstance();
            MFDalWebSql.dbConnection.transaction(function (t) {
                context.dbTransaction = t;
                AgenceDaoSql.getAgenceById(3, context, []).then(function (entity) {
                    expect(entity).not.toBeNull();
                    if (entity) {
                        expect(entity.nom).toEqual('Nom3');
                        expect(entity.employees.length).toEqual(0);
                    }
                    done();
                });

                // Resolve promises and http requests
                $rootScope.$apply();
            });
        });
    });

    /* it('should get A&B (Relation: A 1<>--N B, Main: A). No cascade requested', function (done) {
     inject(function (MFContextFactory, AgenceDaoSql, MFDalWebSql) {
     var context = MFContextFactory.createInstance();
     MFDalWebSql.dbConnection.transaction(function (t) {
     context.dbTransaction = t;
     AgenceDaoSql.getAgenceById(4, context, []).then(function (entity) {
     expect(entity).not.toBeNull();
     if (entity) { //
     expect(entity.nom).toEqual('Nom4');
     expect(entity.detail).not.toBeNull();
     expect(entity.detail.notation).toEqual(4);
     }
     done();
     });
     // Resolve promises and http requests
     $rootScope.$apply();
     });
     });
     });*/

    it('should get A&B (Relation: A 1--N B, Main: A). Cascade: A.b', function (done) {
        inject(function (MFContextFactory, AgenceDaoSql, MFDalWebSql, AgenceCascade) {
            var context = MFContextFactory.createInstance();
            MFDalWebSql.dbConnection.transaction(function (t) {
                context.dbTransaction = t;
                AgenceDaoSql.getAgenceById(3, context, [AgenceCascade.EMPLOYEES]).then(function (entity) {
                    expect(entity).not.toBeNull();
                    if (entity) { //
                        expect(entity.nom).toEqual('Nom3');
                        expect(entity.employees.length).toEqual(1);
                        expect(entity.employees[0].firstName).toEqual('Firstname3');
                    }
                    done();
                });
                $rootScope.$apply();
            });
        });
    });

    // Multiple cascades
    it('should get A&B&C (Relation: A 1--N B, A 1--1 C, Main: A). Cascade: A.b, A.c', function (done) {
        inject(function (MFContextFactory, AgenceDaoSql, MFDalWebSql, AgenceCascade) {
            var context = MFContextFactory.createInstance();
            MFDalWebSql.dbConnection.transaction(function (t) {
                context.dbTransaction = t;
                AgenceDaoSql.getAgenceById(3, context, [AgenceCascade.EMPLOYEES, AgenceCascade.MAINCLIENT]).then(function (entity) {
                    expect(entity).not.toBeNull();
                    if (entity) { //
                        expect(entity.nom).toEqual('Nom3');
                        expect(entity.employees.length).toEqual(1);
                        expect(entity.employees[0].firstName).toEqual('Firstname3');
                        expect(entity.mainClient.email).toEqual('email@here.com3');
                    }
                    done();
                });
                // Resolve promises and http requests
                $rootScope.$apply();
            });
        });
    });

    it('should get A&B&C (Relation: A 1--1 B, B 1--1 C, Main: A). Cascade: A.b, B.c', function (done) {
        inject(function (MFContextFactory, AgenceDetailDaoSql, MFDalWebSql, AgenceCascade, AgenceDetailCascade) {
            var context = MFContextFactory.createInstance();
            MFDalWebSql.dbConnection.transaction(function (t) {
                context.dbTransaction = t;
                AgenceDetailDaoSql.getAgenceDetailById(3, context, [AgenceCascade.EMPLOYEES, AgenceDetailCascade.AGENCE]).then(function (entity) {
                    expect(entity).not.toBeNull();
                    if (entity) { //
                        expect(entity.notation).toEqual(3);
                        expect(entity.agence).not.toBeNull();
                        expect(entity.agence.nom).toEqual('Nom3');
                        expect(entity.agence.employees).not.toBeNull();
                        expect(entity.agence.employees.length).toEqual(1);
                        expect(entity.agence.employees[0].firstName).toEqual('Firstname3');
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