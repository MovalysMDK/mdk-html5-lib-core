'use strict';

describe('DAO-cascades-daotest-sql.update.1--N.spec.js', function () {
    var dbName = 'UpdateCascade-1-N';
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
    it('should update A&B&C (Relation: A 1--1 B, B 1--N C, Main: A). Cascade: A.b, B.c', function (done) {
        inject(function (MFContextFactory, AgenceDaoSql, MFDalWebSql, AgenceFactory, ClientFactory, AgenceCascade, AgenceDetailCascade, AgenceDetailDaoSql) {
            var context = MFContextFactory.createInstance();
            MFDalWebSql.dbConnection.transaction(function (t) {
                context.dbTransaction = t;
                AgenceDetailDaoSql.getAgenceDetailById(3, context, [AgenceCascade.EMPLOYEES,AgenceCascade.CLIENTS, AgenceDetailCascade.AGENCE]).then(function (entity) {
                    entity.notation = 666;
                    entity.agence.nom = 'Nom3Modified';
                    entity.agence.employees[0].firstName = 'Firstname3Modified';
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
                    entity.agence.clients.splice(0,1);
                    entity.agence.clients.push(client1);
                    entity.agence.clients.push(client2);
                    AgenceDetailDaoSql.updateAgenceDetail(entity, context, [AgenceCascade.EMPLOYEES,AgenceCascade.CLIENTS, AgenceDetailCascade.AGENCE], false, []).then(function (updatedEntity) {
                        AgenceDetailDaoSql.getAgenceDetailById(3, context, [AgenceCascade.EMPLOYEES,AgenceCascade.CLIENTS, AgenceDetailCascade.AGENCE]).then(function (entity) {
                            expect(entity).not.toBeNull();
                            if (entity) {
                                expect(entity.notation).toEqual(666);
                                expect(entity.agence).not.toBeNull();
                                expect(entity.agence.nom).toEqual('Nom3Modified');
                                expect(entity.agence.employees).not.toBeNull();
                                expect(entity.agence.employees.length).toEqual(1);
                                expect(entity.agence.employees[0].firstName).toEqual('Firstname3Modified');
                                expect(entity.agence.clients).not.toBeNull();
                                expect(entity.agence.clients.length).toEqual(2);
                                expect(entity.agence.clients[0].nom).toEqual('client2');
                            }
                            done();
                        });
                        $rootScope.$apply();
                    });
                    $rootScope.$apply();
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