/**
 * Copyright (C) 2016 Sopra Steria Group (movalys.support@soprasteria.com)
 *
 * This file is part of Movalys MDK.
 * Movalys MDK is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * Movalys MDK is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 * You should have received a copy of the GNU Lesser General Public License
 * along with Movalys MDK. If not, see <http://www.gnu.org/licenses/>.
 */
'use strict';

angular.module('mfcore').factory('MFParameterDaoSql',
    [ 'MFSyncPromiseProvider', 'MFParameterDaoProxy', 'MFDaoSqlAbstract', 'MFUtils', 'MFMappingHelper', 'MFParameterDaoMapping',
        function ($qSync, MFParameterDaoProxy, MFDaoSqlAbstract, MFUtils, MFMappingHelper, MFParameterDaoMapping) {

            var MFParameterDaoSql = function MFParameterDaoSql() {
                MFParameterDaoSql._Parent.call(this);
                this.lastId = null;
                this.mapping = MFParameterDaoMapping.mappingSql;
                this.syncDisabled = true;
                this.tableName = 'T_MPARAMETERS';
                this.entityName = 'MFParameter';
                this.cascadeDefinition = [];

            };

            MFUtils.extendFromInstance(MFParameterDaoSql, MFDaoSqlAbstract);


            //==================================================================================
            //========   GET
            //==================================================================================

            MFParameterDaoSql.prototype.getListParameterByName = function (p_names, p_context) {
                console.assert(!angular.isUndefinedOrNull(p_context), 'MFParameterDaoSql.getListParameterByName() : p_context is required ');

                var deferred = $qSync.defer();
                var self = this;

                var o_sqlQuery = 'select * from ' + self.tableName + ' where NAME LIKE \'' + p_names + '\';';
                var o_sqlParameters = [];


                self.executeQueryToRead(
                    'MFParameterDaoSql.getListParameter()', p_context, o_sqlQuery, o_sqlParameters).then(
                    function (returnedSuccess_executeQueryToRead) { /* SUCCESS */

                        deferred.resolve(returnedSuccess_executeQueryToRead);
                    },
                    function (returnedError_executeQueryToRead) { /* ERROR */
                        console.error('MFParameterDaoSql.getListParameterByName(): error: ', returnedError_executeQueryToRead);
                        p_context.addError(returnedError_executeQueryToRead);
                        deferred.reject(returnedError_executeQueryToRead);
                    }
                );

                return deferred.promise;
            };


            MFParameterDaoSql.prototype.getListParameter = function getListParameter(p_context, p_sPrefix) {
                console.assert(!angular.isUndefinedOrNull(p_context), 'MFParameterDaoSql.getListParameter() : p_context is required ');

                var deferred = $qSync.defer();
                var self = this;

                var o_sqlQuery = 'select * from ' + self.tableName + ' ;';
                var o_sqlParameters = [];

                if (!angular.isUndefinedOrNull(p_context)) {
                    o_sqlQuery = 'select * from ' + self.tableName + ' WHERE NAME LIKE \'' + p_sPrefix + '%\';';
                }


                self.executeQueryToRead(
                    'MFParameterDaoSql.getListParameter()', p_context, o_sqlQuery, o_sqlParameters).then(
                    function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
                        deferred.resolve(returnedSuccess_executeQueryToRead);
                    },
                    function (returnedError_executeQueryToRead) { /* ERROR */
                        console.error('MFParameterDaoSql.getListParameter(): error: ', returnedError_executeQueryToRead);
                        p_context.addError(returnedError_executeQueryToRead);
                        deferred.reject(returnedError_executeQueryToRead);
                    }
                );

                return deferred.promise;

            };


            //==================================================================================
            //========   SAVE & UPDATE
            //==================================================================================
            MFParameterDaoSql.prototype.saveParameter = function (p_entity, p_context) {

                console.assert(!angular.isUndefinedOrNull(p_context), 'MFParameterDaoSql.saveParameter() : p_context is required ');
                console.assert(!angular.isUndefinedOrNull(p_entity), 'MFParameterDaoSql.saveParameter() : p_entity is required ');

                var deferred = $qSync.defer();

                this.saveEntity(p_entity, p_context, false).then(
                    function (success_result) {
                        deferred.resolve(success_result);

                    },
                    function (failure_result) {
                        deferred.reject(failure_result);

                    });

                return deferred.promise;
            };

            MFParameterDaoSql.prototype.saveOrUpdateParameter = function (p_entity, p_context) {

                console.assert(!angular.isUndefinedOrNull(p_context), 'MFParameterDaoSql.saveOrUpdateParameter() : p_context is required ');
                console.assert(!angular.isUndefinedOrNull(p_entity), 'MFParameterDaoSql.saveOrUpdateParameter() : p_entity is required ');

                if (p_entity.id === -1) {
                    return this.saveParameter(p_entity, p_context, false);
                } else {
                    return this.updateEntity(p_entity, p_context, false);
                }


            };

            MFParameterDaoSql.prototype.saveOrUpdateListParameter = function (p_entitiesList, p_context) {

                console.assert(!angular.isUndefinedOrNull(p_context), 'MFParameterDaoSql.saveOrUpdateListParameter() : p_context is required ');
                console.assert(angular.isArray(p_entitiesList), 'MFParameterDaoSql.saveOrUpdateListParameter() : p_entitiesList is required and should be an array');

                var deferred = $qSync.defer();
                var self = this;

                var o_arrayPromisesSaveOrUpdateParameter = [];
                for (var i = 0; i < p_entitiesList.length; i++) {
                    o_arrayPromisesSaveOrUpdateParameter.push(self.saveOrUpdateParameter(p_entitiesList[i], p_context));
                }
                // $qSync.all() returns an array of the results of o_arrayPromisesSaveOrUpdateParameter.
                // If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
                deferred.resolve($qSync.all(o_arrayPromisesSaveOrUpdateParameter));


                return deferred.promise;
            };

            return new MFParameterDaoSql();
        }]
);
