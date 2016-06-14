'use strict';

describe('DAO-cascades-daotest-sql.create.N--1.spec.js', function () {
    var dbName = 'CreateCascade-N-1';
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
        // N--1
    it('should save A&B (Relation: A N--1 B, Main: A). Cascade: A.b', function (done) {
        inject(function (MFContextFactory, AgenceDaoSql, MFDalWebSql, AgenceFactory, ClientFactory, AgenceCascade, ClientDaoSql, ClientCascade) {
            var context = MFContextFactory.createInstance();
            MFDalWebSql.dbConnection.transaction(function (t) {
                context.dbTransaction = t;
                ClientDaoSql.getClientById(-2, context, [ClientCascade.AGENCE]).then(function (entity) {
                    expect(entity).not.toBeDefined();
                    // Create data
                    var client = (ClientFactory.createInstance());
                    client.nom = 'NewClient';
                    client.prenom = 'LastnameNew';
                    client.telephone = 'NewClient';
                    client.email = 'NewClient';
                    AgenceDaoSql.getAgenceById(2, context, [AgenceCascade.CLIENTS]).then(function (entity) {
                        expect(entity).not.toBeNull();
                        expect(entity.clients.length).toEqual(3);
                        client.agency = entity;
                        client.agence = entity;
                        ClientDaoSql.saveClient(client, context, [ClientCascade.AGENCE], false).then(function (savedEntity) {
                            AgenceDaoSql.getAgenceById(2, context, [AgenceCascade.CLIENTS]).then(function (entity) {
                                expect(entity).not.toBeNull();
                                if (entity) { //
                                    expect(entity.clients.length).toEqual(4);
                                    expect(entity.clients[0].prenom).toEqual('LastnameNew');
                                }
                                done();
                            });
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