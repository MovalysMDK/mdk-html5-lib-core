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
                AgenceDetailDaoSql.getAgenceDetailById(3, context, [AgenceCascade.EMPLOYEES, AgenceDetailCascade.AGENCE]).then(function (entity) {
                    entity.notation = 666;
                    entity.agence.nom = 'Nom3Modified';
                    entity.agence.employees[0].firstName = 'Firstname3Modified';

                    AgenceDetailDaoSql.updateAgenceDetail(entity, context, [AgenceCascade.EMPLOYEES, AgenceDetailCascade.AGENCE], false, []).then(function (updatedEntity) {
                        AgenceDetailDaoSql.getAgenceDetailById(3, context, [AgenceCascade.EMPLOYEES, AgenceDetailCascade.AGENCE]).then(function (entity) {
                            expect(entity).not.toBeNull();
                            if (entity) { //
                                expect(entity.notation).toEqual(666);
                                expect(entity.agence).not.toBeNull();
                                expect(entity.agence.nom).toEqual('Nom3Modified');
                                expect(entity.agence.employees).not.toBeNull();
                                expect(entity.agence.employees.length).toEqual(1);
                                expect(entity.agence.employees[0].firstName).toEqual('Firstname3Modified');
                            }
                            done();
                        });
                    });
                });
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