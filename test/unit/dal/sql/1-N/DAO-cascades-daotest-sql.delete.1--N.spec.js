'use strict';

describe('DAO-cascades-daotest-sql.delete.1--N.spec.js', function () {
    var dbName = 'DeleteCascade-1-N';
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
    it('should delete  A&B (Relation: A 1--N B, Main: A). Cascade', function (done) {
        inject(function (MFContextFactory, AgenceDaoSql, MFDalWebSql, AgenceFactory, ClientFactory, AgenceCascade,ClientDaoSql) {
            var context = MFContextFactory.createInstance();
            MFDalWebSql.dbConnection.transaction(function (t) {
                context.dbTransaction = t;
                AgenceDaoSql.getAgenceById(2, context, [AgenceCascade.CLIENTS]).then(function (entity) {
                    expect(entity).not.toBeNull();
                    if (entity) { //
                        expect(entity.nom).toEqual('Nom2');
                        expect(entity.clients).not.toBeNull();
                        expect(entity.clients.length).toEqual(1);
                    }
                    AgenceDaoSql.deleteAgenceById(2, context, [AgenceCascade.CLIENTS], false).then(function() {
                        AgenceDaoSql.getAgenceById(2, context, []).then(function (entity) {
                            expect(entity).not.toBeDefined();
                            ClientDaoSql.getClientById(2, context, []).then(function (entity) {
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