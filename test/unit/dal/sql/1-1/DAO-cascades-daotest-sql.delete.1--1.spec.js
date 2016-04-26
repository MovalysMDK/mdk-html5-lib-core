'use strict';

describe('DAO-cascades-daotest-sql.delete.1--1.spec.js', function () {
    var dbName = 'DeleteCascade-1-1';
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
    it('should delete  A&B (Relation: A 1--1 B, Main: A). Cascade A.b', function (done) {
        inject(function (MFContextFactory, AgenceDaoSql, MFDalWebSql, AgenceFactory, ClientFactory, AgenceCascade, AgenceDetailDaoSql) {
            var context = MFContextFactory.createInstance();
            MFDalWebSql.dbConnection.transaction(function (t) {
                context.dbTransaction = t;
                AgenceDaoSql.getAgenceById(2, context, [AgenceCascade.DETAIL]).then(function (entity) {
                    expect(entity).not.toBeNull();
                    if (entity) { //
                        expect(entity.nom).toEqual('Nom2');
                        expect(entity.detail).not.toBeNull();
                        expect(entity.detail.notation).toEqual(2);
                    }
                    AgenceDaoSql.deleteAgenceById(2, context, [AgenceCascade.DETAIL], false).then(function () {
                        AgenceDaoSql.getAgenceById(2, context, []).then(function (entity) {
                            expect(entity).not.toBeDefined();
                            AgenceDetailDaoSql.getAgenceDetailById(2, context, []).then(function (entity) {
                                expect(entity).not.toBeDefined();
                                done();
                            });
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