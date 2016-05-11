'use strict';

describe('DAO-cascades-daotest-sql.create.1--1.spec.js', function () {
    var dbName = 'CreateCascade-1-1';
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

    it('should save A&B (Relation: A 1<>--1 B, Main: A). No cascade requested', function (done) {
        inject(function (MFContextFactory, AgenceDaoSql, MFDalWebSql, AgenceFactory, ClientFactory, AgenceCascade, AgenceDetailFactory, ActiviteFactory) {
            var context = MFContextFactory.createInstance();
            MFDalWebSql.dbConnection.transaction(function (t) {
                context.dbTransaction = t;
                AgenceDaoSql.getAgenceById(-2, context, []).then(function (entity) {
                    expect(entity).not.toBeDefined();
                    var agence = AgenceFactory.createInstance();
                    agence.nom = 'NewName';
                    agence.detail = AgenceDetailFactory.createInstance();
                    agence.detail.notation = 666;
                    agence.rue = 'NewStreet';
                    agence.codepostal = 'NewCP';
                    agence.ville = 'NewCity';
                    agence.website = "website";
                    agence.phone = "06881111111";
                    agence.decimal = 3;
                    agence.clients = [];
                    agence.employees = [];
                    agence.photos = [];
                    agence.mainClient = ClientFactory.createInstance();
                    agence.activite4 = ActiviteFactory.createInstance();
                    agence.activite3 = ActiviteFactory.createInstance();
                    AgenceDaoSql.saveAgence(agence, context, [AgenceCascade.DETAIL], false, []).then(function (savedEntity) {
                        AgenceDaoSql.getAgenceById(-2, context, []).then(function (entity) {
                            expect(entity).not.toBeNull();
                            if (entity) {
                                expect(entity.nom).toEqual('NewName');
                                expect(entity.detail).not.toBeNull();
                                expect(entity.detail.notation).toEqual(666);
                            }
                            done();
                        });
                    });
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