'use strict';

describe('DAO-cascades-daotest-sql.update.1--1.spec.js', function () {
    var dbName = 'UpdateCascade-1-1';
    var $TestService;
    var $rootScope;
    var flag = false;
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
    it('should update A&B (Relation: A 1--1 B, Main: A). Cascade A.b', function (done) {
        inject(function (MFContextFactory, AgenceDaoSql, MFDalWebSql, AgenceFactory, ClientFactory, AgenceCascade) {
            var context = MFContextFactory.createInstance();
            MFDalWebSql.dbConnection.transaction(function (t) {
                context.dbTransaction = t;
                AgenceDaoSql.getAgenceById(2, context, [AgenceCascade.DETAIL]).then(function (entity) {
                    entity.nom = 'Nom2Modified';
                    entity.detail.notation = 6662;
                    AgenceDaoSql.updateAgence(entity, context, [AgenceCascade.DETAIL], false, []).then(function (updatedEntity) {
                        AgenceDaoSql.getAgenceById(2, context, [AgenceCascade.DETAIL]).then(function (entity) {
                            expect(entity).not.toBeNull();
                            if (entity) { //
                                expect(entity.nom).toEqual('Nom2Modified');
                                expect(entity.detail).not.toBeNull();
                                expect(entity.detail.notation).toEqual(6662);
                            }
                            done();
                        });
                    });
                });
            });
        });
    });

    it('should update A only (Relation: A 1--1 B, Main: A). Cascade A.b on GET only', function (done) {
        inject(function (MFContextFactory, AgenceDaoSql, MFDalWebSql, AgenceFactory, ClientFactory, AgenceCascade, AgenceDetailCascade, AgenceDetailDaoSql) {
            var context = MFContextFactory.createInstance();
            MFDalWebSql.dbConnection.transaction(function (t) {
                context.dbTransaction = t;
                AgenceDaoSql.getAgenceById(2, context, [AgenceCascade.DETAIL]).then(function (entity) {
                    entity.nom = 'Nom2Modified';
                    entity.detail.notation = 6662;
                    AgenceDaoSql.updateAgence(entity, context, [], false, []).then(function (updatedEntity) {
                        AgenceDaoSql.getAgenceById(2, context, [AgenceCascade.DETAIL]).then(function (entity) {
                            expect(entity).not.toBeNull();
                            if (entity) { //
                                expect(entity.nom).toEqual('Nom2Modified');
                                expect(entity.detail).not.toBeNull();
                                expect(entity.detail.notation).toEqual(2);
                            }
                            done();
                        });
                    });
                });
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