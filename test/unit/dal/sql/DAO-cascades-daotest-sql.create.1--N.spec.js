'use strict';

describe('DAO-cascades-daotest-sql.create.1--N.spec.js', function () {
    var dbName = 'CreateCascade-1-N';
    var $TestService;
    /* Inject angular dependencies */
    /* Set MFCore configuration */
    /* Prepare HTTP Responses */
    beforeEach(function (done) {
        module('data-daotest-sql');
        inject(function (_TestService_) {
            $TestService = _TestService_;
        });
        $TestService.initDataBase(dbName, success, error);
        function success() {
            done();
        }

        function error() {
            fail('Init dataBase');
        }
    });
    /***** Unit test *****/

        // 1<>--N (Composite)
  /*  it('should save A&B (Relation: A 1<>--N B, Main: A). No cascade requested', function (done) {
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
        inject(function (MFContextFactory, AgenceDaoNoSql, MFDalNoSqlProxy, AgenceFactory, AgenceDetailFactory, ClientFactory, AgenceCascade) {
            tx = MFDalNoSqlProxy.openTransaction();
            var context = MFContextFactory.createInstance();
            context.dbTransaction = tx;

            AgenceDaoNoSql.cascadeDefinition.clients.composite = false;

            AgenceDaoNoSql._getRecordById(-2, context, []).then(function (entity) {
                expect(entity).toBeNull();

                // Create data
                var agence = AgenceFactory.createInstance();
                agence.nom = 'NewName';
                agence.detail = AgenceDetailFactory.createInstance();
                agence.clients = [];
                agence.clients.push(ClientFactory.createInstance());
                agence.clients.push(ClientFactory.createInstance());

                AgenceDaoNoSql._saveRecord(agence, context, [AgenceCascade.CLIENTS], false, []).then(function (savedEntity) {

                    AgenceDaoNoSql._getRecordById(-2, context, [AgenceCascade.CLIENTS]).then(function (entity) {
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


    afterEach(function (done) {
        inject(function (MFDalIndexedDB, MFDalIndexedDBTransaction) {
            waitUntil(function () {
                return MFDalIndexedDBTransaction.startedTransactions.length === 0;
            }, 500).then(
                function () {
                    MFDalIndexedDB.closeDatabase();
                    done();
                }
            );
        });
    });
});