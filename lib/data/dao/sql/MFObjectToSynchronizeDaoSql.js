'use strict';

angular.module('mfcore').factory('MFObjectToSynchronizeDaoSql',
    [ 'MFSyncPromiseProvider', 'MFObjectToSynchronizeDaoProxy', 'MFDaoSqlAbstract', 'MFUtils','MFMappingHelper', 'MFObjectToSynchronizeDaoMapping',
    function ($qSync,  MFObjectToSynchronizeDaoProxy, MFDaoSqlAbstract, MFUtils, MFMappingHelper, MFObjectToSynchronizeDaoMapping) {

        var MFObjectToSynchronizeDaoSql = function MFObjectToSynchronizeDaoSql() {
            MFObjectToSynchronizeDaoSql._Parent.call(this);
            this.lastId = null;
            this.mapping = MFObjectToSynchronizeDaoMapping.mappingSql;
            this.syncDisabled = true;
            this.tableName = 'T_MOBJECTTOSYNCHRONIZE';
            this.entityName = 'MFObjectToSynchronize';
            this.cascadeDefinition = [];

        };

        MFUtils.extendFromInstance(MFObjectToSynchronizeDaoSql, MFDaoSqlAbstract);


        //==================================================================================
        //========   GET
        //==================================================================================
        MFObjectToSynchronizeDaoSql.prototype.getObjectToSynchronizeById = function getObjectToSynchronizeById(p_context, p_id) {

            console.assert(!angular.isUndefinedOrNullOrEmpty(p_id), 'MFObjectToSynchronizeDaoSql.getObjectToSynchronizeById() : p_id is required ');
            console.assert(!angular.isUndefinedOrNullOrEmpty(p_context), 'MFObjectToSynchronizeDaoSql.getObjectToSynchronizeById() : p_context is required ');

            var deferred = $qSync.defer();
            var self = this;


            self.getEntitiesByProperty('id', p_id, p_context).then(

                function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
                    deferred.resolve(returnedSuccess_executeQueryToRead);
                },
                function (returnedError_executeQueryToRead) { /* ERROR */
                    console.error('MFObjectToSynchronizeDaoSql.getObjectToSynchronizeById(): error: ', returnedError_executeQueryToRead);
                    p_context.addError(returnedError_executeQueryToRead);
                    deferred.reject(returnedError_executeQueryToRead);
                }
            );


            return deferred.promise;
        };



        MFObjectToSynchronizeDaoSql.prototype.getListObjectToSynchronizeByName = function getListObjectToSynchronize(p_context, p_sEntity) {
            console.assert(!angular.isUndefinedOrNull(p_context), 'MFObjectToSynchronizeDaoSql.getListObjectToSynchronize() : p_context is required ');
            console.assert(!angular.isUndefinedOrNull(p_sEntity), 'MFObjectToSynchronizeDaoSql.getListObjectToSynchronize() : p_sEntity is required ');

            var deferred = $qSync.defer();
            var self = this;

            var o_sqlQuery = 'select * from ' + this.tableName + ' where OBJECTNAME="' + p_sEntity + '";';
            var o_sqlParameters = [];

            this.executeQueryToRead(
                'MFObjectToSynchronizeDaoSql.getListObjectToSynchronize()', p_context, o_sqlQuery, o_sqlParameters).then(

                function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
                    deferred.resolve(returnedSuccess_executeQueryToRead);
                },
                function (returnedError_executeQueryToRead) { /* ERROR */
                    console.error('MFObjectToSynchronizeDaoSql.getListObjectToSynchronize(): error: ', returnedError_executeQueryToRead);
                    p_context.addError( returnedError_executeQueryToRead);
                    deferred.reject(returnedError_executeQueryToRead);
                }
            );

            return deferred.promise;

        };


        MFObjectToSynchronizeDaoSql.prototype.deleteObjectToSynchronizeByIdEntity = function(p_context, p_id) {
            console.assert(!angular.isUndefinedOrNull(p_context), 'MFObjectToSynchronizeDaoSql.deleteObjectToSynchronizeByIdById() : p_context is required ');
            console.assert(!angular.isUndefinedOrNull(p_id) , 'MFObjectToSynchronizeDaoSql.deleteObjectToSynchronizeByIdById() : p_entity is required ');
            var deferred = $qSync.defer();
            var self = this;
            this.getObjectToSynchronizeById(p_context, p_id).then(
                function(entity){


                    self.deleteEntity(entity, p_context).then(
                        function(returnedSuccess_executeQueryToWrite){

                            deferred.resolve(returnedSuccess_executeQueryToWrite);

                        },
                        function(returnedError_executeQueryToWrite) { /* ERROR */
                            console.error('MFObjectToSynchronizeDaoSql.deleteObjectToSynchronizeByIdById(): error: ', returnedError_executeQueryToWrite);
                            p_context.addError(returnedError_executeQueryToWrite);
                            deferred.reject(returnedError_executeQueryToWrite);
                        }
                    );

                },
                function(error){
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        };

        return new MFObjectToSynchronizeDaoSql();
    }]
);
