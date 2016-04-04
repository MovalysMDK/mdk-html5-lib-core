'use strict';

describe('DAO-cascades-daotest.read.1--N.spec.js', function () {
    var dbName = 'CreateCascade-1-N';
    var $TestService;
    var $rootScope;
    var tx;
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
     inject(function (MFContextFactory, AgenceDaoNoSql, MFDalNoSqlProxy) {
     tx = MFDalNoSqlProxy.openTransaction();
     var context = MFContextFactory.createInstance();
     context.dbTransaction = tx;

     // Force the composite:true for the test
     var oldValue = AgenceDaoNoSql.cascadeDefinition.clients.composite;
     AgenceDaoNoSql.cascadeDefinition.clients.composite = true;

     AgenceDaoNoSql._getRecordById(3, context, []).then(function (entity) {
     expect(entity).not.toBeNull();
     if (entity) { //
     expect(entity.nom).toEqual('Nom3');
     expect(entity.clients).not.toBeNull();
     expect(entity.clients.length).toEqual(1);
     expect(entity.clients[0].email).toEqual('email@here.com3');
     }

     // Set back old value
     AgenceDaoNoSql.cascadeDefinition.clients.composite = oldValue;
     done();
     });

     // Resolve promises and http requests
     $rootScope.$apply();
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

    /*it('should get A&B&C (Relation: A 1--1 B, B 1--1 C, Main: A). Cascade: A.b, B.c', function (done) {
     inject(function (MFContextFactory, AgenceDaoNoSql, AgenceDetailDaoNoSql, AgenceCascade, AgenceDetailCascade, MFDalNoSqlProxy) {
     tx = MFDalNoSqlProxy.openTransaction();
     var context = MFContextFactory.createInstance();
     context.dbTransaction = tx;

     var oldValue = AgenceDaoNoSql.cascadeDefinition.detail.composite;
     AgenceDaoNoSql.cascadeDefinition.detail.composite = false;

     AgenceDetailDaoNoSql._getRecordById(3, context, [AgenceCascade.EMPLOYEES, AgenceDetailCascade.AGENCE]).then(function (entity) {
     expect(entity).not.toBeNull();

     if (entity) { //
     expect(entity.notation).toEqual(3);
     expect(entity.agence).not.toBeNull();
     expect(entity.agence.nom).toEqual('Nom3');
     expect(entity.agence.employees).not.toBeNull();
     expect(entity.agence.employees.length).toEqual(1);
     expect(entity.agence.employees[0].firstName).toEqual('Firstname3');
     }

     AgenceDaoNoSql.cascadeDefinition.detail.composite = oldValue;
     done();
     });
     // Resolve promises and http requests
     $rootScope.$apply();
     });
     });*/

    afterEach(function (done) {
        inject(function (MFDalWebSql) {
            MFDalWebSql.closeDatabase();
            done();
        });
    });
});