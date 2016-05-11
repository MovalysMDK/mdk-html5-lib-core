'use strict';

describe('DAO-cascades-daotest-sql.create.1--N.spec.js', function () {
    var dbName = 'CreateCascade-1-N';
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
    it('should save A&B (Relation: A 1--N B, Main: A). Cascade: A.b', function (done) {
        inject(function (MFContextFactory, AgenceDaoSql, MFDalWebSql, AgenceFactory, ClientFactory, AgenceCascade, AgenceDetailFactory, ActiviteFactory) {
            var context = MFContextFactory.createInstance();
            MFDalWebSql.dbConnection.transaction(function (t) {
                context.dbTransaction = t;
                AgenceDaoSql.getAgenceById(-2, context, []).then(function (entity) {
                    expect(entity).not.toBeDefined();
                    // Create data
                    var agence = AgenceFactory.createInstance();
                    var mainClient = ClientFactory.createInstance();
                    mainClient.nom = 'NewClient';
                    mainClient.prenom = 'NewClient';
                    mainClient.telephone = 'NewClient';
                    mainClient.email = 'NewClient';
                    var client1 = ClientFactory.createInstance();
                    client1.nom = 'client1';
                    client1.prenom = 'client1';
                    client1.telephone = 'client1';
                    client1.email = 'client1';
                    var client2 = ClientFactory.createInstance();
                    client2.nom = 'client2';
                    client2.prenom = 'client2';
                    client2.telephone = 'client2';
                    client2.email = 'client2';
                    agence.nom = 'NewName';
                    agence.rue = 'NewStreet';
                    agence.codepostal = 'NewCP';
                    agence.ville = 'NewCity';
                    agence.website = "website";
                    agence.phone = "06881111111";
                    agence.decimal = 3;
                    agence.clients = [];
                    agence.employees = [];
                    agence.photos = [];
                    agence.detail = AgenceDetailFactory.createInstance();
                    agence.mainClient = mainClient;
                    agence.activite4 = ActiviteFactory.createInstance();
                    agence.activite3 = ActiviteFactory.createInstance();
                    agence.clients.push(client1);
                    agence.clients.push(client2);
                    AgenceDaoSql.saveAgence(agence, context, [AgenceCascade.CLIENTS,AgenceCascade.MAINCLIENT], false, []).then(function (savedEntity) {
                        AgenceDaoSql.getAgenceById(-2, context, [AgenceCascade.CLIENTS]).then(function (entity) {
                            expect(entity).not.toBeNull();
                            if (entity) { //
                                expect(entity.nom).toEqual('NewName');
                                expect(entity.clients.length).toEqual(2);
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