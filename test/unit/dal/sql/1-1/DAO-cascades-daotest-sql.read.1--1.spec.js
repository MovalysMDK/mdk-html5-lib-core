'use strict';

describe('DAO-cascades-daotest-sql.read.1--1.spec.js', function () {
    var dbName = 'ReadCascade-1-1';
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
    // 1--1
    it('should get A only (Relation: A 1--1 B, Main: A). No cascade requested.', function (done) {
        inject(function (MFContextFactory, AgenceDaoSql, MFDalWebSql) {
            var context = MFContextFactory.createInstance();
            MFDalWebSql.dbConnection.transaction(function (t) {
                context.dbTransaction = t;
                AgenceDaoSql.getAgenceById(1, context, []).then(function (entity) {
                    expect(entity).not.toBeNull();
                    if (entity) { //
                        expect(entity.nom).toEqual('Nom1');
                        expect(entity.mainClient.nom).toBeNull();
                    }
                    done();
                });
                // Resolve promises and http requests
                $rootScope.$apply();
            });
        });
    });

    it('should get B only (Relation: A 1--1 B, Main: B). No cascade requested.', function (done) {
        inject(function (MFContextFactory, ClientDaoSql, MFDalWebSql) {
            var context = MFContextFactory.createInstance();
            MFDalWebSql.dbConnection.transaction(function (t) {
                context.dbTransaction = t;
                ClientDaoSql.getClientById(1, context, []).then(function (entity) {
                    expect(entity).not.toBeNull();
                    if (entity) { //
                        expect(entity.email).toEqual("email@here.com1");
                        expect(entity.agency.nom).toBeNull();
                    }
                    done();
                });
                // Resolve promises and http requests
                $rootScope.$apply();
            });
        });
    });

    it('should get A&B (Relation: A 1--1 B, Main: A). Cascade A.b', function (done) {
        inject(function (MFContextFactory, AgenceDaoSql, MFDalWebSql, AgenceCascade) {
            var context = MFContextFactory.createInstance();
            MFDalWebSql.dbConnection.transaction(function (t) {
                context.dbTransaction = t;
                AgenceDaoSql.getAgenceById(2, context, [AgenceCascade.MAINCLIENT]).then(function (entity) {
                    expect(entity).not.toBeNull();
                    if (entity) { //
                        expect(entity.nom).toEqual('Nom2');
                        expect(entity.mainClient).not.toBeNull();
                        expect(entity.mainClient.email).toEqual('email@here.com2');
                    }
                    done();
                });
                // Resolve promises and http requests
                $rootScope.$apply();
            });
        });
    });

    it('should get A&B (Relation: A 1--1 B, Main: B). Cascade B.a', function (done) {
        inject(function (MFContextFactory, ClientDaoSql, MFDalWebSql, ClientCascade) {
            var context = MFContextFactory.createInstance();
            MFDalWebSql.dbConnection.transaction(function (t) {
                context.dbTransaction = t;
                ClientDaoSql.getClientById(2, context, [ClientCascade.AGENCY]).then(function (entity) {
                    expect(entity).not.toBeNull();
                    if (entity) { //
                        expect(entity.email).toEqual("email@here.com2");
                        expect(entity.agency).not.toBeNull();
                        expect(entity.agency.nom).toEqual('Nom2');
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