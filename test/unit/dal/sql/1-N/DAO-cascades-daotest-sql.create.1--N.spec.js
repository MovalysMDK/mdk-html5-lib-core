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

    /*     // 1<>--N (Composite)
     it('should save A&B (Relation: A 1<>--N B, Main: A). No cascade requested', function (done) {
     inject(function (MFContextFactory, AgenceDaoNoSql, MFDalNoSqlProxy, AgenceFactory, AgenceDetailFactory, ClientFactory) {
     tx = MFDalNoSqlProxy.openTransaction();
     var context = MFContextFactory.createInstance();
     context.dbTransaction = tx;

     // Force the composite:false for the test
     AgenceDaoNoSql.cascadeDefinition.clients.composite = true;

     AgenceDaoNoSql._getRecordById(-2, context, []).then(function (entity) {
     expect(entity).toBeNull();

     // Create data
     var agence = AgenceFactory.createInstance();
     agence.nom = 'NewName';
     agence.clients = [];
     agence.detail = AgenceDetailFactory.createInstance();
     agence.clients.push(ClientFactory.createInstance());
     agence.clients.push(ClientFactory.createInstance());

     AgenceDaoNoSql._saveRecord(agence, context, [], false, []).then(function (savedEntity) {

     AgenceDaoNoSql._getRecordById(-2, context, []).then(function (entity) {
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
     });*/

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
                    agence.clients.push(ClientFactory.createInstance());
                    agence.clients.push(ClientFactory.createInstance());
                    agence.mainClient = ClientFactory.createInstance();
                    agence.activite4 = ActiviteFactory.createInstance();
                    agence.activite3 = ActiviteFactory.createInstance();
                    AgenceDaoSql.saveAgence(agence, context, [AgenceCascade.CLIENTS], false, []).then(function (savedEntity) {
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