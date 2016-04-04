'use strict';
/**
 *
 *
 * <p>Copyright (c) 2010</p>
 * <p>Company: Adeuza</p>
 *
 */

//@non-generated-start[jshint-override]
//@non-generated-end

angular.module('data-daotest-sql').factory('AgenceDaoSql',
    ['ActiviteDaoProxy', 'AgenceDaoMapping', 'AgenceDetailDaoProxy', 'AgencePhotosDaoProxy', 'ClientDaoProxy', 'EmployeeDaoProxy', 'MFSyncPromiseProvider', 'MFDaoSqlAbstract', 'MFUtils', 'MFMappingHelper',
//@non-generated-start[dependencies-names][X]
//@non-generated-end

//@non-generated-start[dependencies-classes][X]
        function (ActiviteDaoProxy, AgenceDaoMapping, AgenceDetailDaoProxy, AgencePhotosDaoProxy, ClientDaoProxy, EmployeeDaoProxy, $qSync, MFDaoSqlAbstract, MFUtils, MFMappingHelper
                  //@non-generated-end
        ) {

            var AgenceDaoSql = function AgenceDaoSql() {
                // Constructor
//@non-generated-start[constructor][X]
                AgenceDaoSql._Parent.call(this);
                this.lastId = null;
                this.mapping = AgenceDaoMapping.mappingSql;
                this.syncDisabled = false;
                this.tableName = 'T_AGENCE';
                this.entityName = 'Agence';
                this.cascadeDefinition = [
                    {
                        readAction: 'get', parentAttrPointingChild: 'activite4',
                        childDao: ActiviteDaoProxy, childAttrPointingParent: 'agence4'
                    },
                    {
                        readAction: 'get', parentAttrPointingChild: 'detail',
                        childDao: AgenceDetailDaoProxy, childAttrPointingParent: 'agence'
                    },
                    {
                        readAction: 'get', parentAttrPointingChild: 'activite3',
                        childDao: ActiviteDaoProxy, childAttrPointingParent: ''
                    },
                    {
                        readAction: 'get', parentAttrPointingChild: 'activite2',
                        childDao: ActiviteDaoProxy, childAttrPointingParent: ''
                    },
                    {
                        readAction: 'get', parentAttrPointingChild: 'activite1',
                        childDao: ActiviteDaoProxy, childAttrPointingParent: 'agence1'
                    },
                    {
                        readAction: 'get', parentAttrPointingChild: 'mainClient',
                        childDao: ClientDaoProxy, childAttrPointingParent: 'agency'
                    },
                    {
                        readAction: 'getList', parentAttrPointingChild: 'clients',
                        childDao: ClientDaoProxy, childAttrPointingParent: 'agence'
                    },
                    {
                        readAction: 'getList', parentAttrPointingChild: 'employees',
                        childDao: EmployeeDaoProxy, childAttrPointingParent: 'agence'
                    },
                    {
                        readAction: 'getList', parentAttrPointingChild: 'photos',
                        childDao: AgencePhotosDaoProxy, childAttrPointingParent: 'photosAgence'
                    }
                ];

//@non-generated-end
            };

            MFUtils.extendFromInstance(AgenceDaoSql, MFDaoSqlAbstract);


            //==================================================================================
            //========   SPECIFIC METHODS - GET
            //==================================================================================
            /**
             * @ngdoc method
             * @name AgenceDaoSql#getAgenceById
             * @function
             *
             * @description
             * Returns a Agence by id.
             *
             * @param {Integer} p_id Integer id of the Agence to process
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             *
             * @returns {Agence} Returns the Agence, including children if required
             */
            AgenceDaoSql.prototype.getAgenceById = function (p_id, p_context, p_cascadeSet) {

//@non-generated-start[getAgenceById-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDaoSql.getAgenceById() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'AgenceDaoSql.getAgenceById() : p_cascadeSet is required and should be an array');
                console.assert(!angular.isUndefinedOrNull(p_id), 'AgenceDaoSql.getAgenceById() : p_id is required');

                var deferred = $qSync.defer();
                var self = this;

                self.getEntitiesByProperty('id', p_id, p_context).then(
                    function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
                        self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
                            function (returnedSuccess_cascade) {
                                deferred.resolve(returnedSuccess_executeQueryToRead[0]);
                            },
                            function (returnedError_cascade) {
                                console.error('AgenceDaoSql.getAgenceById(): cascade error: ', returnedError_cascade);
                                p_context.addError('AgenceDaoSql.getAgenceById(): cascade error: ' + returnedError_cascade);
                                deferred.reject(returnedError_cascade);
                            }
                        );
                    },
                    function (returnedError_executeQueryToRead) { /* ERROR */
                        console.error('AgenceDaoSql.getAgenceById(): error: ', returnedError_executeQueryToRead);
                        p_context.addError('AgenceDaoSql.getAgenceById(): error: ' + returnedError_executeQueryToRead);
                        deferred.reject(returnedError_executeQueryToRead);
                    }
                );

//@non-generated-start[getAgenceById-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name AgenceDaoSql#getListAgence
             * @function
             *
             * @description
             * Returns a list of Agences according to the parameter(s).
             *
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             *
             * @returns {Array<String>} Returns an Array of Agences, including children if required.
             */
            AgenceDaoSql.prototype.getListAgence = function (p_context, p_cascadeSet) {

//@non-generated-start[getListAgence-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDaoSql.getListAgence() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'AgenceDaoSql.getListAgence() : p_cascadeSet is required and should be an array');

                var deferred = $qSync.defer();
                var self = this;

                self.getEntitiesByProperty('*', [], p_context).then(
                    function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
                        self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
                            function (returnedSuccess_cascade) {
                                deferred.resolve(returnedSuccess_executeQueryToRead);
                            },
                            function (returnedError_cascade) {
                                console.error('AgenceDaoSql.getListAgence(): cascade error: ', returnedError_cascade);
                                p_context.addError('AgenceDaoSql.getListAgence(): cascade error: ' + returnedError_cascade);
                                deferred.reject(returnedError_cascade);
                            }
                        );
                    },
                    function (returnedError_executeQueryToRead) { /* ERROR */
                        console.error('AgenceDaoSql.getListAgence(): error: ', returnedError_executeQueryToRead);
                        p_context.addError('AgenceDaoSql.getListAgence(): error: ' + returnedError_executeQueryToRead);
                        deferred.reject(returnedError_executeQueryToRead);
                    }
                );

//@non-generated-start[getListAgence-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name AgenceDaoSql#getListAgenceByIds
             * @function
             *
             * @description
             * Returns a list of Agences by ids.
             *
             * @param {Array<Integer>} p_ids Array containing ids of Agences to process (optional)
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             *
             * @returns {Array<String>} Returns an Array of Agences, including children if required.
             */
            AgenceDaoSql.prototype.getListAgenceByIds = function (p_ids, p_context, p_cascadeSet) {

//@non-generated-start[getListAgenceByIds-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDaoSql.getListAgenceByIds() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'AgenceDaoSql.getListAgenceByIds() : p_cascadeSet is required and should be an array');
                console.assert(angular.isUndefinedOrNull(p_ids) || angular.isArray(p_ids), 'AgenceDaoSql.getListAgenceByIds() : p_ids should be an array, if given');

                var deferred = $qSync.defer();
                var self = this;

                self.getEntitiesByProperty('id', p_ids, p_context).then(
                    function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
                        self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
                            function (returnedSuccess_cascade) {
                                deferred.resolve(returnedSuccess_executeQueryToRead);
                            },
                            function (returnedError_cascade) {
                                console.error('AgenceDaoSql.getListAgenceByIds(): cascade error: ', returnedError_cascade);
                                p_context.addError('AgenceDaoSql.getListAgenceByIds(): cascade error: ' + returnedError_cascade);
                                deferred.reject(returnedError_cascade);
                            }
                        );
                    },
                    function (returnedError_executeQueryToRead) { /* ERROR */
                        console.error('AgenceDaoSql.getListAgenceByIds(): error: ', returnedError_executeQueryToRead);
                        p_context.addError('AgenceDaoSql.getListAgenceByIds(): error: ' + returnedError_executeQueryToRead);
                        deferred.reject(returnedError_executeQueryToRead);
                    }
                );

//@non-generated-start[getListAgenceByIds-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name AgenceDaoSql#getListAgenceByActivite4
             * @function
             *
             * @description
             * Returns a list of Agences according to the parameter(s).
             *
             * @param {Array<Integer>} p_foreignKeys_activite4
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             *
             * @returns {Array<String>} Returns an Array of Agences, including children if required.
             */
            AgenceDaoSql.prototype.getListAgenceByActivite4 = function (p_foreignKeys_activite4, p_context, p_cascadeSet) {

//@non-generated-start[getListAgenceByActivite4-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDaoSql.getListAgenceByActivite4() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'AgenceDaoSql.getListAgenceByActivite4() : p_cascadeSet is required and should be an array');
                console.assert(!angular.isUndefinedOrNull(p_foreignKeys_activite4), 'AgenceDaoSql.getListAgenceByActivite4() : p_foreignKeys_activite4 is required');

                var deferred = $qSync.defer();
                var self = this;

                var o_sqlQuery = 'select * from T_AGENCE where ACTIVITE4ID in (' + self.produceQueryInPart(p_foreignKeys_activite4.idToString) + ');';
                var o_sqlParameters = [].concat(p_foreignKeys_activite4.idToString);

                self.executeQueryToRead(
                    'AgenceDaoSql.getListAgenceByActivite4()', p_context, o_sqlQuery, o_sqlParameters).then(
                    function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
                        self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
                            function (returnedSuccess_cascade) {
                                deferred.resolve(returnedSuccess_executeQueryToRead);
                            },
                            function (returnedError_cascade) {
                                console.error('AgenceDaoSql.getListAgenceByActivite4(): cascade error: ', returnedError_cascade);
                                p_context.addError('AgenceDaoSql.getListAgenceByActivite4(): cascade error: ' + returnedError_cascade);
                                deferred.reject(returnedError_cascade);
                            }
                        );
                    },
                    function (returnedError_executeQueryToRead) { /* ERROR */
                        console.error('AgenceDaoSql.getListAgenceByActivite4(): error: ', returnedError_executeQueryToRead);
                        p_context.addError('AgenceDaoSql.getListAgenceByActivite4(): error: ' + returnedError_executeQueryToRead);
                        deferred.reject(returnedError_executeQueryToRead);
                    }
                );

//@non-generated-start[getListAgenceByActivite4-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name AgenceDaoSql#getListAgenceByActivite4id
             * @function
             *
             * @description
             * Returns a list of Agences according to the parameter(s).
             *
             * @param {Array<Integer>} p_foreignKeys_activite4id
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             *
             * @returns {Array<String>} Returns an Array of Agences, including children if required.
             */
            AgenceDaoSql.prototype.getListAgenceByActivite4id = function (p_foreignKeys_activite4id, p_context, p_cascadeSet) {

//@non-generated-start[getListAgenceByActivite4id-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDaoSql.getListAgenceByActivite4id() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'AgenceDaoSql.getListAgenceByActivite4id() : p_cascadeSet is required and should be an array');
                console.assert(!angular.isUndefinedOrNull(p_foreignKeys_activite4id), 'AgenceDaoSql.getListAgenceByActivite4id() : p_foreignKeys_activite4id is required');

                var deferred = $qSync.defer();
                var self = this;

                var o_sqlQuery = 'select * from T_AGENCE where ACTIVITE4ID in (' + self.produceQueryInPart(p_foreignKeys_activite4id) + ');';
                var o_sqlParameters = [].concat(p_foreignKeys_activite4id);

                self.executeQueryToRead(
                    'AgenceDaoSql.getListAgenceByActivite4id()', p_context, o_sqlQuery, o_sqlParameters).then(
                    function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
                        self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
                            function (returnedSuccess_cascade) {
                                deferred.resolve(returnedSuccess_executeQueryToRead);
                            },
                            function (returnedError_cascade) {
                                console.error('AgenceDaoSql.getListAgenceByActivite4id(): cascade error: ', returnedError_cascade);
                                p_context.addError('AgenceDaoSql.getListAgenceByActivite4id(): cascade error: ' + returnedError_cascade);
                                deferred.reject(returnedError_cascade);
                            }
                        );
                    },
                    function (returnedError_executeQueryToRead) { /* ERROR */
                        console.error('AgenceDaoSql.getListAgenceByActivite4id(): error: ', returnedError_executeQueryToRead);
                        p_context.addError('AgenceDaoSql.getListAgenceByActivite4id(): error: ' + returnedError_executeQueryToRead);
                        deferred.reject(returnedError_executeQueryToRead);
                    }
                );

//@non-generated-start[getListAgenceByActivite4id-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name AgenceDaoSql#getAgenceByDetail
             * @function
             *
             * @description
             * Returns the list of all Agences.
             *
             * @param {Array<Integer>} p_foreignKeys_detail
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             *
             * @returns {Agence} Returns the Agence, including children if required
             */
            AgenceDaoSql.prototype.getAgenceByDetail = function (p_foreignKeys_detail, p_context, p_cascadeSet) {

//@non-generated-start[getAgenceByDetail-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDaoSql.getAgenceByDetail() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'AgenceDaoSql.getAgenceByDetail() : p_cascadeSet is required and should be an array');
                console.assert(!angular.isUndefinedOrNull(p_foreignKeys_detail), 'AgenceDaoSql.getAgenceByDetail() : p_foreignKeys_detail is required');

                var deferred = $qSync.defer();
                var self = this;

                var o_sqlQuery = 'select * from T_AGENCE where DETAILID in (' + self.produceQueryInPart(p_foreignKeys_detail.idToString) + ');';
                var o_sqlParameters = [].concat(p_foreignKeys_detail.idToString);

                self.executeQueryToRead(
                    'AgenceDaoSql.getAgenceByDetail()', p_context, o_sqlQuery, o_sqlParameters).then(
                    function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
                        self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
                            function (returnedSuccess_cascade) {
                                deferred.resolve(returnedSuccess_executeQueryToRead[0]);
                            },
                            function (returnedError_cascade) {
                                console.error('AgenceDaoSql.getAgenceByDetail(): cascade error: ', returnedError_cascade);
                                p_context.addError('AgenceDaoSql.getAgenceByDetail(): cascade error: ' + returnedError_cascade);
                                deferred.reject(returnedError_cascade);
                            }
                        );
                    },
                    function (returnedError_executeQueryToRead) { /* ERROR */
                        console.error('AgenceDaoSql.getAgenceByDetail(): error: ', returnedError_executeQueryToRead);
                        p_context.addError('AgenceDaoSql.getAgenceByDetail(): error: ' + returnedError_executeQueryToRead);
                        deferred.reject(returnedError_executeQueryToRead);
                    }
                );

//@non-generated-start[getAgenceByDetail-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name AgenceDaoSql#getAgenceByDetailid
             * @function
             *
             * @description
             * Returns the list of all Agences.
             *
             * @param {Array<Integer>} p_foreignKeys_detailid
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             *
             * @returns {Agence} Returns the Agence, including children if required
             */
            AgenceDaoSql.prototype.getAgenceByDetailid = function (p_foreignKeys_detailid, p_context, p_cascadeSet) {

//@non-generated-start[getAgenceByDetailid-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDaoSql.getAgenceByDetailid() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'AgenceDaoSql.getAgenceByDetailid() : p_cascadeSet is required and should be an array');
                console.assert(!angular.isUndefinedOrNull(p_foreignKeys_detailid), 'AgenceDaoSql.getAgenceByDetailid() : p_foreignKeys_detailid is required');

                var deferred = $qSync.defer();
                var self = this;

                var o_sqlQuery = 'select * from T_AGENCE where DETAILID in (' + self.produceQueryInPart(p_foreignKeys_detailid) + ');';
                var o_sqlParameters = [].concat(p_foreignKeys_detailid);

                self.executeQueryToRead(
                    'AgenceDaoSql.getAgenceByDetailid()', p_context, o_sqlQuery, o_sqlParameters).then(
                    function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
                        self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
                            function (returnedSuccess_cascade) {
                                deferred.resolve(returnedSuccess_executeQueryToRead[0]);
                            },
                            function (returnedError_cascade) {
                                console.error('AgenceDaoSql.getAgenceByDetailid(): cascade error: ', returnedError_cascade);
                                p_context.addError('AgenceDaoSql.getAgenceByDetailid(): cascade error: ' + returnedError_cascade);
                                deferred.reject(returnedError_cascade);
                            }
                        );
                    },
                    function (returnedError_executeQueryToRead) { /* ERROR */
                        console.error('AgenceDaoSql.getAgenceByDetailid(): error: ', returnedError_executeQueryToRead);
                        p_context.addError('AgenceDaoSql.getAgenceByDetailid(): error: ' + returnedError_executeQueryToRead);
                        deferred.reject(returnedError_executeQueryToRead);
                    }
                );

//@non-generated-start[getAgenceByDetailid-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name AgenceDaoSql#getListAgenceByActivite3
             * @function
             *
             * @description
             * Returns a list of Agences according to the parameter(s).
             *
             * @param {Array<Integer>} p_foreignKeys_activite3
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             *
             * @returns {Array<String>} Returns an Array of Agences, including children if required.
             */
            AgenceDaoSql.prototype.getListAgenceByActivite3 = function (p_foreignKeys_activite3, p_context, p_cascadeSet) {

//@non-generated-start[getListAgenceByActivite3-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDaoSql.getListAgenceByActivite3() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'AgenceDaoSql.getListAgenceByActivite3() : p_cascadeSet is required and should be an array');
                console.assert(!angular.isUndefinedOrNull(p_foreignKeys_activite3), 'AgenceDaoSql.getListAgenceByActivite3() : p_foreignKeys_activite3 is required');

                var deferred = $qSync.defer();
                var self = this;

                var o_sqlQuery = 'select * from T_AGENCE where ACTIVITE3ID in (' + self.produceQueryInPart(p_foreignKeys_activite3.idToString) + ');';
                var o_sqlParameters = [].concat(p_foreignKeys_activite3.idToString);

                self.executeQueryToRead(
                    'AgenceDaoSql.getListAgenceByActivite3()', p_context, o_sqlQuery, o_sqlParameters).then(
                    function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
                        self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
                            function (returnedSuccess_cascade) {
                                deferred.resolve(returnedSuccess_executeQueryToRead);
                            },
                            function (returnedError_cascade) {
                                console.error('AgenceDaoSql.getListAgenceByActivite3(): cascade error: ', returnedError_cascade);
                                p_context.addError('AgenceDaoSql.getListAgenceByActivite3(): cascade error: ' + returnedError_cascade);
                                deferred.reject(returnedError_cascade);
                            }
                        );
                    },
                    function (returnedError_executeQueryToRead) { /* ERROR */
                        console.error('AgenceDaoSql.getListAgenceByActivite3(): error: ', returnedError_executeQueryToRead);
                        p_context.addError('AgenceDaoSql.getListAgenceByActivite3(): error: ' + returnedError_executeQueryToRead);
                        deferred.reject(returnedError_executeQueryToRead);
                    }
                );

//@non-generated-start[getListAgenceByActivite3-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name AgenceDaoSql#getListAgenceByActivite3id
             * @function
             *
             * @description
             * Returns a list of Agences according to the parameter(s).
             *
             * @param {Array<Integer>} p_foreignKeys_activite3id
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             *
             * @returns {Array<String>} Returns an Array of Agences, including children if required.
             */
            AgenceDaoSql.prototype.getListAgenceByActivite3id = function (p_foreignKeys_activite3id, p_context, p_cascadeSet) {

//@non-generated-start[getListAgenceByActivite3id-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDaoSql.getListAgenceByActivite3id() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'AgenceDaoSql.getListAgenceByActivite3id() : p_cascadeSet is required and should be an array');
                console.assert(!angular.isUndefinedOrNull(p_foreignKeys_activite3id), 'AgenceDaoSql.getListAgenceByActivite3id() : p_foreignKeys_activite3id is required');

                var deferred = $qSync.defer();
                var self = this;

                var o_sqlQuery = 'select * from T_AGENCE where ACTIVITE3ID in (' + self.produceQueryInPart(p_foreignKeys_activite3id) + ');';
                var o_sqlParameters = [].concat(p_foreignKeys_activite3id);

                self.executeQueryToRead(
                    'AgenceDaoSql.getListAgenceByActivite3id()', p_context, o_sqlQuery, o_sqlParameters).then(
                    function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
                        self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
                            function (returnedSuccess_cascade) {
                                deferred.resolve(returnedSuccess_executeQueryToRead);
                            },
                            function (returnedError_cascade) {
                                console.error('AgenceDaoSql.getListAgenceByActivite3id(): cascade error: ', returnedError_cascade);
                                p_context.addError('AgenceDaoSql.getListAgenceByActivite3id(): cascade error: ' + returnedError_cascade);
                                deferred.reject(returnedError_cascade);
                            }
                        );
                    },
                    function (returnedError_executeQueryToRead) { /* ERROR */
                        console.error('AgenceDaoSql.getListAgenceByActivite3id(): error: ', returnedError_executeQueryToRead);
                        p_context.addError('AgenceDaoSql.getListAgenceByActivite3id(): error: ' + returnedError_executeQueryToRead);
                        deferred.reject(returnedError_executeQueryToRead);
                    }
                );

//@non-generated-start[getListAgenceByActivite3id-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name AgenceDaoSql#getListAgenceByActivite2
             * @function
             *
             * @description
             * Returns a list of Agences according to the parameter(s).
             *
             * @param {Array<Integer>} p_foreignKeys_activite2
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             *
             * @returns {Array<String>} Returns an Array of Agences, including children if required.
             */
            AgenceDaoSql.prototype.getListAgenceByActivite2 = function (p_foreignKeys_activite2, p_context, p_cascadeSet) {

//@non-generated-start[getListAgenceByActivite2-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDaoSql.getListAgenceByActivite2() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'AgenceDaoSql.getListAgenceByActivite2() : p_cascadeSet is required and should be an array');
                console.assert(!angular.isUndefinedOrNull(p_foreignKeys_activite2), 'AgenceDaoSql.getListAgenceByActivite2() : p_foreignKeys_activite2 is required');

                var deferred = $qSync.defer();
                var self = this;

                var o_sqlQuery = 'select * from T_AGENCE where ACTIVITE2ID in (' + self.produceQueryInPart(p_foreignKeys_activite2.idToString) + ');';
                var o_sqlParameters = [].concat(p_foreignKeys_activite2.idToString);

                self.executeQueryToRead(
                    'AgenceDaoSql.getListAgenceByActivite2()', p_context, o_sqlQuery, o_sqlParameters).then(
                    function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
                        self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
                            function (returnedSuccess_cascade) {
                                deferred.resolve(returnedSuccess_executeQueryToRead);
                            },
                            function (returnedError_cascade) {
                                console.error('AgenceDaoSql.getListAgenceByActivite2(): cascade error: ', returnedError_cascade);
                                p_context.addError('AgenceDaoSql.getListAgenceByActivite2(): cascade error: ' + returnedError_cascade);
                                deferred.reject(returnedError_cascade);
                            }
                        );
                    },
                    function (returnedError_executeQueryToRead) { /* ERROR */
                        console.error('AgenceDaoSql.getListAgenceByActivite2(): error: ', returnedError_executeQueryToRead);
                        p_context.addError('AgenceDaoSql.getListAgenceByActivite2(): error: ' + returnedError_executeQueryToRead);
                        deferred.reject(returnedError_executeQueryToRead);
                    }
                );

//@non-generated-start[getListAgenceByActivite2-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name AgenceDaoSql#getListAgenceByActivite2id
             * @function
             *
             * @description
             * Returns a list of Agences according to the parameter(s).
             *
             * @param {Array<Integer>} p_foreignKeys_activite2id
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             *
             * @returns {Array<String>} Returns an Array of Agences, including children if required.
             */
            AgenceDaoSql.prototype.getListAgenceByActivite2id = function (p_foreignKeys_activite2id, p_context, p_cascadeSet) {

//@non-generated-start[getListAgenceByActivite2id-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDaoSql.getListAgenceByActivite2id() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'AgenceDaoSql.getListAgenceByActivite2id() : p_cascadeSet is required and should be an array');
                console.assert(!angular.isUndefinedOrNull(p_foreignKeys_activite2id), 'AgenceDaoSql.getListAgenceByActivite2id() : p_foreignKeys_activite2id is required');

                var deferred = $qSync.defer();
                var self = this;

                var o_sqlQuery = 'select * from T_AGENCE where ACTIVITE2ID in (' + self.produceQueryInPart(p_foreignKeys_activite2id) + ');';
                var o_sqlParameters = [].concat(p_foreignKeys_activite2id);

                self.executeQueryToRead(
                    'AgenceDaoSql.getListAgenceByActivite2id()', p_context, o_sqlQuery, o_sqlParameters).then(
                    function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
                        self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
                            function (returnedSuccess_cascade) {
                                deferred.resolve(returnedSuccess_executeQueryToRead);
                            },
                            function (returnedError_cascade) {
                                console.error('AgenceDaoSql.getListAgenceByActivite2id(): cascade error: ', returnedError_cascade);
                                p_context.addError('AgenceDaoSql.getListAgenceByActivite2id(): cascade error: ' + returnedError_cascade);
                                deferred.reject(returnedError_cascade);
                            }
                        );
                    },
                    function (returnedError_executeQueryToRead) { /* ERROR */
                        console.error('AgenceDaoSql.getListAgenceByActivite2id(): error: ', returnedError_executeQueryToRead);
                        p_context.addError('AgenceDaoSql.getListAgenceByActivite2id(): error: ' + returnedError_executeQueryToRead);
                        deferred.reject(returnedError_executeQueryToRead);
                    }
                );

//@non-generated-start[getListAgenceByActivite2id-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name AgenceDaoSql#getListAgenceByActivite1
             * @function
             *
             * @description
             * Returns a list of Agences according to the parameter(s).
             *
             * @param {Array<Integer>} p_foreignKeys_activite1
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             *
             * @returns {Array<String>} Returns an Array of Agences, including children if required.
             */
            AgenceDaoSql.prototype.getListAgenceByActivite1 = function (p_foreignKeys_activite1, p_context, p_cascadeSet) {

//@non-generated-start[getListAgenceByActivite1-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDaoSql.getListAgenceByActivite1() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'AgenceDaoSql.getListAgenceByActivite1() : p_cascadeSet is required and should be an array');
                console.assert(!angular.isUndefinedOrNull(p_foreignKeys_activite1), 'AgenceDaoSql.getListAgenceByActivite1() : p_foreignKeys_activite1 is required');

                var deferred = $qSync.defer();
                var self = this;

                var o_sqlQuery = 'select * from T_AGENCE where ACTIVITE1ID in (' + self.produceQueryInPart(p_foreignKeys_activite1.idToString) + ');';
                var o_sqlParameters = [].concat(p_foreignKeys_activite1.idToString);

                self.executeQueryToRead(
                    'AgenceDaoSql.getListAgenceByActivite1()', p_context, o_sqlQuery, o_sqlParameters).then(
                    function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
                        self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
                            function (returnedSuccess_cascade) {
                                deferred.resolve(returnedSuccess_executeQueryToRead);
                            },
                            function (returnedError_cascade) {
                                console.error('AgenceDaoSql.getListAgenceByActivite1(): cascade error: ', returnedError_cascade);
                                p_context.addError('AgenceDaoSql.getListAgenceByActivite1(): cascade error: ' + returnedError_cascade);
                                deferred.reject(returnedError_cascade);
                            }
                        );
                    },
                    function (returnedError_executeQueryToRead) { /* ERROR */
                        console.error('AgenceDaoSql.getListAgenceByActivite1(): error: ', returnedError_executeQueryToRead);
                        p_context.addError('AgenceDaoSql.getListAgenceByActivite1(): error: ' + returnedError_executeQueryToRead);
                        deferred.reject(returnedError_executeQueryToRead);
                    }
                );

//@non-generated-start[getListAgenceByActivite1-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name AgenceDaoSql#getListAgenceByActivite1id
             * @function
             *
             * @description
             * Returns a list of Agences according to the parameter(s).
             *
             * @param {Array<Integer>} p_foreignKeys_activite1id
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             *
             * @returns {Array<String>} Returns an Array of Agences, including children if required.
             */
            AgenceDaoSql.prototype.getListAgenceByActivite1id = function (p_foreignKeys_activite1id, p_context, p_cascadeSet) {

//@non-generated-start[getListAgenceByActivite1id-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDaoSql.getListAgenceByActivite1id() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'AgenceDaoSql.getListAgenceByActivite1id() : p_cascadeSet is required and should be an array');
                console.assert(!angular.isUndefinedOrNull(p_foreignKeys_activite1id), 'AgenceDaoSql.getListAgenceByActivite1id() : p_foreignKeys_activite1id is required');

                var deferred = $qSync.defer();
                var self = this;

                var o_sqlQuery = 'select * from T_AGENCE where ACTIVITE1ID in (' + self.produceQueryInPart(p_foreignKeys_activite1id) + ');';
                var o_sqlParameters = [].concat(p_foreignKeys_activite1id);

                self.executeQueryToRead(
                    'AgenceDaoSql.getListAgenceByActivite1id()', p_context, o_sqlQuery, o_sqlParameters).then(
                    function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
                        self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
                            function (returnedSuccess_cascade) {
                                deferred.resolve(returnedSuccess_executeQueryToRead);
                            },
                            function (returnedError_cascade) {
                                console.error('AgenceDaoSql.getListAgenceByActivite1id(): cascade error: ', returnedError_cascade);
                                p_context.addError('AgenceDaoSql.getListAgenceByActivite1id(): cascade error: ' + returnedError_cascade);
                                deferred.reject(returnedError_cascade);
                            }
                        );
                    },
                    function (returnedError_executeQueryToRead) { /* ERROR */
                        console.error('AgenceDaoSql.getListAgenceByActivite1id(): error: ', returnedError_executeQueryToRead);
                        p_context.addError('AgenceDaoSql.getListAgenceByActivite1id(): error: ' + returnedError_executeQueryToRead);
                        deferred.reject(returnedError_executeQueryToRead);
                    }
                );

//@non-generated-start[getListAgenceByActivite1id-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name AgenceDaoSql#getAgenceByMainClient
             * @function
             *
             * @description
             * Returns the list of all Agences.
             *
             * @param {Array<Integer>} p_foreignKeys_mainClient
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             *
             * @returns {Agence} Returns the Agence, including children if required
             */
            AgenceDaoSql.prototype.getAgenceByMainClient = function (p_foreignKeys_mainClient, p_context, p_cascadeSet) {

//@non-generated-start[getAgenceByMainClient-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDaoSql.getAgenceByMainClient() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'AgenceDaoSql.getAgenceByMainClient() : p_cascadeSet is required and should be an array');
                console.assert(!angular.isUndefinedOrNull(p_foreignKeys_mainClient), 'AgenceDaoSql.getAgenceByMainClient() : p_foreignKeys_mainClient is required');

                var deferred = $qSync.defer();
                var self = this;

                var o_sqlQuery = 'select * from T_AGENCE where MAINCLIENTID in (' + self.produceQueryInPart(p_foreignKeys_mainClient.idToString) + ');';
                var o_sqlParameters = [].concat(p_foreignKeys_mainClient.idToString);

                self.executeQueryToRead(
                    'AgenceDaoSql.getAgenceByMainClient()', p_context, o_sqlQuery, o_sqlParameters).then(
                    function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
                        self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
                            function (returnedSuccess_cascade) {
                                deferred.resolve(returnedSuccess_executeQueryToRead[0]);
                            },
                            function (returnedError_cascade) {
                                console.error('AgenceDaoSql.getAgenceByMainClient(): cascade error: ', returnedError_cascade);
                                p_context.addError('AgenceDaoSql.getAgenceByMainClient(): cascade error: ' + returnedError_cascade);
                                deferred.reject(returnedError_cascade);
                            }
                        );
                    },
                    function (returnedError_executeQueryToRead) { /* ERROR */
                        console.error('AgenceDaoSql.getAgenceByMainClient(): error: ', returnedError_executeQueryToRead);
                        p_context.addError('AgenceDaoSql.getAgenceByMainClient(): error: ' + returnedError_executeQueryToRead);
                        deferred.reject(returnedError_executeQueryToRead);
                    }
                );

//@non-generated-start[getAgenceByMainClient-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name AgenceDaoSql#getAgenceByMainClientid
             * @function
             *
             * @description
             * Returns the list of all Agences.
             *
             * @param {Array<Integer>} p_foreignKeys_mainClientid
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             *
             * @returns {Agence} Returns the Agence, including children if required
             */
            AgenceDaoSql.prototype.getAgenceByMainClientid = function (p_foreignKeys_mainClientid, p_context, p_cascadeSet) {

//@non-generated-start[getAgenceByMainClientid-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDaoSql.getAgenceByMainClientid() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'AgenceDaoSql.getAgenceByMainClientid() : p_cascadeSet is required and should be an array');
                console.assert(!angular.isUndefinedOrNull(p_foreignKeys_mainClientid), 'AgenceDaoSql.getAgenceByMainClientid() : p_foreignKeys_mainClientid is required');

                var deferred = $qSync.defer();
                var self = this;

                var o_sqlQuery = 'select * from T_AGENCE where MAINCLIENTID in (' + self.produceQueryInPart(p_foreignKeys_mainClientid) + ');';
                var o_sqlParameters = [].concat(p_foreignKeys_mainClientid);

                self.executeQueryToRead(
                    'AgenceDaoSql.getAgenceByMainClientid()', p_context, o_sqlQuery, o_sqlParameters).then(
                    function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
                        self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
                            function (returnedSuccess_cascade) {
                                deferred.resolve(returnedSuccess_executeQueryToRead[0]);
                            },
                            function (returnedError_cascade) {
                                console.error('AgenceDaoSql.getAgenceByMainClientid(): cascade error: ', returnedError_cascade);
                                p_context.addError('AgenceDaoSql.getAgenceByMainClientid(): cascade error: ' + returnedError_cascade);
                                deferred.reject(returnedError_cascade);
                            }
                        );
                    },
                    function (returnedError_executeQueryToRead) { /* ERROR */
                        console.error('AgenceDaoSql.getAgenceByMainClientid(): error: ', returnedError_executeQueryToRead);
                        p_context.addError('AgenceDaoSql.getAgenceByMainClientid(): error: ' + returnedError_executeQueryToRead);
                        deferred.reject(returnedError_executeQueryToRead);
                    }
                );

//@non-generated-start[getAgenceByMainClientid-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name AgenceDaoSql#getListAgenceByActivite4ids
             * @function
             *
             * @description
             * Returns a list of Agences according to the parameter(s).
             *
             * @param {Array<Integer>} p_foreignKeys_activite4ids
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             *
             * @returns {Array<String>} Returns an Array of Agences, including children if required.
             */
            AgenceDaoSql.prototype.getListAgenceByActivite4ids = function (p_foreignKeys_activite4ids, p_context, p_cascadeSet) {

//@non-generated-start[getListAgenceByActivite4ids-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDaoSql.getListAgenceByActivite4ids() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'AgenceDaoSql.getListAgenceByActivite4ids() : p_cascadeSet is required and should be an array');
                console.assert(!angular.isUndefinedOrNull(p_foreignKeys_activite4ids), 'AgenceDaoSql.getListAgenceByActivite4ids() : p_foreignKeys_activite4ids is required');

                var deferred = $qSync.defer();
                var self = this;

                var o_sqlQuery = 'select * from T_AGENCE where ACTIVITE4ID in (' + self.produceQueryInPart(p_foreignKeys_activite4ids) + ');';
                var o_sqlParameters = [].concat(p_foreignKeys_activite4ids);

                self.executeQueryToRead(
                    'AgenceDaoSql.getListAgenceByActivite4ids()', p_context, o_sqlQuery, o_sqlParameters).then(
                    function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
                        self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
                            function (returnedSuccess_cascade) {
                                deferred.resolve(returnedSuccess_executeQueryToRead);
                            },
                            function (returnedError_cascade) {
                                console.error('AgenceDaoSql.getListAgenceByActivite4ids(): cascade error: ', returnedError_cascade);
                                p_context.addError('AgenceDaoSql.getListAgenceByActivite4ids(): cascade error: ' + returnedError_cascade);
                                deferred.reject(returnedError_cascade);
                            }
                        );
                    },
                    function (returnedError_executeQueryToRead) { /* ERROR */
                        console.error('AgenceDaoSql.getListAgenceByActivite4ids(): error: ', returnedError_executeQueryToRead);
                        p_context.addError('AgenceDaoSql.getListAgenceByActivite4ids(): error: ' + returnedError_executeQueryToRead);
                        deferred.reject(returnedError_executeQueryToRead);
                    }
                );

//@non-generated-start[getListAgenceByActivite4ids-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name AgenceDaoSql#getListAgenceByActivite4ids
             * @function
             *
             * @description
             * Returns a list of Agences according to the parameter(s).
             *
             * @param {Array<Integer>} p_foreignKeys_activite4ids
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             *
             * @returns {Array<String>} Returns an Array of Agences, including children if required.
             */
            AgenceDaoSql.prototype.getListAgenceByActivite4ids = function (p_foreignKeys_activite4ids, p_context, p_cascadeSet) {

//@non-generated-start[getListAgenceByActivite4ids-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDaoSql.getListAgenceByActivite4ids() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'AgenceDaoSql.getListAgenceByActivite4ids() : p_cascadeSet is required and should be an array');
                console.assert(!angular.isUndefinedOrNull(p_foreignKeys_activite4ids), 'AgenceDaoSql.getListAgenceByActivite4ids() : p_foreignKeys_activite4ids is required');

                var deferred = $qSync.defer();
                var self = this;

                var o_sqlQuery = 'select * from T_AGENCE where ACTIVITE4ID in (' + self.produceQueryInPart(p_foreignKeys_activite4ids) + ');';
                var o_sqlParameters = [].concat(p_foreignKeys_activite4ids);

                self.executeQueryToRead(
                    'AgenceDaoSql.getListAgenceByActivite4ids()', p_context, o_sqlQuery, o_sqlParameters).then(
                    function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
                        self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
                            function (returnedSuccess_cascade) {
                                deferred.resolve(returnedSuccess_executeQueryToRead);
                            },
                            function (returnedError_cascade) {
                                console.error('AgenceDaoSql.getListAgenceByActivite4ids(): cascade error: ', returnedError_cascade);
                                p_context.addError('AgenceDaoSql.getListAgenceByActivite4ids(): cascade error: ' + returnedError_cascade);
                                deferred.reject(returnedError_cascade);
                            }
                        );
                    },
                    function (returnedError_executeQueryToRead) { /* ERROR */
                        console.error('AgenceDaoSql.getListAgenceByActivite4ids(): error: ', returnedError_executeQueryToRead);
                        p_context.addError('AgenceDaoSql.getListAgenceByActivite4ids(): error: ' + returnedError_executeQueryToRead);
                        deferred.reject(returnedError_executeQueryToRead);
                    }
                );

//@non-generated-start[getListAgenceByActivite4ids-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name AgenceDaoSql#getListAgenceByActivite4ids
             * @function
             *
             * @description
             * Returns a list of Agences according to the parameter(s).
             *
             * @param {Array<Integer>} p_foreignKeys_activite4ids
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             *
             * @returns {Array<String>} Returns an Array of Agences, including children if required.
             */
            AgenceDaoSql.prototype.getListAgenceByActivite4ids = function (p_foreignKeys_activite4ids, p_context, p_cascadeSet) {

//@non-generated-start[getListAgenceByActivite4ids-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDaoSql.getListAgenceByActivite4ids() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'AgenceDaoSql.getListAgenceByActivite4ids() : p_cascadeSet is required and should be an array');
                console.assert(!angular.isUndefinedOrNull(p_foreignKeys_activite4ids), 'AgenceDaoSql.getListAgenceByActivite4ids() : p_foreignKeys_activite4ids is required');

                var deferred = $qSync.defer();
                var self = this;

                var o_sqlQuery = 'select * from T_AGENCE where ACTIVITE4ID in (' + self.produceQueryInPart(p_foreignKeys_activite4ids) + ');';
                var o_sqlParameters = [].concat(p_foreignKeys_activite4ids);

                self.executeQueryToRead(
                    'AgenceDaoSql.getListAgenceByActivite4ids()', p_context, o_sqlQuery, o_sqlParameters).then(
                    function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
                        self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
                            function (returnedSuccess_cascade) {
                                deferred.resolve(returnedSuccess_executeQueryToRead);
                            },
                            function (returnedError_cascade) {
                                console.error('AgenceDaoSql.getListAgenceByActivite4ids(): cascade error: ', returnedError_cascade);
                                p_context.addError('AgenceDaoSql.getListAgenceByActivite4ids(): cascade error: ' + returnedError_cascade);
                                deferred.reject(returnedError_cascade);
                            }
                        );
                    },
                    function (returnedError_executeQueryToRead) { /* ERROR */
                        console.error('AgenceDaoSql.getListAgenceByActivite4ids(): error: ', returnedError_executeQueryToRead);
                        p_context.addError('AgenceDaoSql.getListAgenceByActivite4ids(): error: ' + returnedError_executeQueryToRead);
                        deferred.reject(returnedError_executeQueryToRead);
                    }
                );

//@non-generated-start[getListAgenceByActivite4ids-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name AgenceDaoSql#getListAgenceByActivite4ids
             * @function
             *
             * @description
             * Returns a list of Agences according to the parameter(s).
             *
             * @param {Array<Integer>} p_foreignKeys_activite4ids
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             *
             * @returns {Array<String>} Returns an Array of Agences, including children if required.
             */
            AgenceDaoSql.prototype.getListAgenceByActivite4ids = function (p_foreignKeys_activite4ids, p_context, p_cascadeSet) {

//@non-generated-start[getListAgenceByActivite4ids-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDaoSql.getListAgenceByActivite4ids() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'AgenceDaoSql.getListAgenceByActivite4ids() : p_cascadeSet is required and should be an array');
                console.assert(!angular.isUndefinedOrNull(p_foreignKeys_activite4ids), 'AgenceDaoSql.getListAgenceByActivite4ids() : p_foreignKeys_activite4ids is required');

                var deferred = $qSync.defer();
                var self = this;

                var o_sqlQuery = 'select * from T_AGENCE where ACTIVITE4ID in (' + self.produceQueryInPart(p_foreignKeys_activite4ids) + ');';
                var o_sqlParameters = [].concat(p_foreignKeys_activite4ids);

                self.executeQueryToRead(
                    'AgenceDaoSql.getListAgenceByActivite4ids()', p_context, o_sqlQuery, o_sqlParameters).then(
                    function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
                        self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
                            function (returnedSuccess_cascade) {
                                deferred.resolve(returnedSuccess_executeQueryToRead);
                            },
                            function (returnedError_cascade) {
                                console.error('AgenceDaoSql.getListAgenceByActivite4ids(): cascade error: ', returnedError_cascade);
                                p_context.addError('AgenceDaoSql.getListAgenceByActivite4ids(): cascade error: ' + returnedError_cascade);
                                deferred.reject(returnedError_cascade);
                            }
                        );
                    },
                    function (returnedError_executeQueryToRead) { /* ERROR */
                        console.error('AgenceDaoSql.getListAgenceByActivite4ids(): error: ', returnedError_executeQueryToRead);
                        p_context.addError('AgenceDaoSql.getListAgenceByActivite4ids(): error: ' + returnedError_executeQueryToRead);
                        deferred.reject(returnedError_executeQueryToRead);
                    }
                );

//@non-generated-start[getListAgenceByActivite4ids-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name AgenceDaoSql#getListAgenceByActivite3ids
             * @function
             *
             * @description
             * Returns a list of Agences according to the parameter(s).
             *
             * @param {Array<Integer>} p_foreignKeys_activite3ids
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             *
             * @returns {Array<String>} Returns an Array of Agences, including children if required.
             */
            AgenceDaoSql.prototype.getListAgenceByActivite3ids = function (p_foreignKeys_activite3ids, p_context, p_cascadeSet) {

//@non-generated-start[getListAgenceByActivite3ids-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDaoSql.getListAgenceByActivite3ids() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'AgenceDaoSql.getListAgenceByActivite3ids() : p_cascadeSet is required and should be an array');
                console.assert(!angular.isUndefinedOrNull(p_foreignKeys_activite3ids), 'AgenceDaoSql.getListAgenceByActivite3ids() : p_foreignKeys_activite3ids is required');

                var deferred = $qSync.defer();
                var self = this;

                var o_sqlQuery = 'select * from T_AGENCE where ACTIVITE3ID in (' + self.produceQueryInPart(p_foreignKeys_activite3ids) + ');';
                var o_sqlParameters = [].concat(p_foreignKeys_activite3ids);

                self.executeQueryToRead(
                    'AgenceDaoSql.getListAgenceByActivite3ids()', p_context, o_sqlQuery, o_sqlParameters).then(
                    function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
                        self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
                            function (returnedSuccess_cascade) {
                                deferred.resolve(returnedSuccess_executeQueryToRead);
                            },
                            function (returnedError_cascade) {
                                console.error('AgenceDaoSql.getListAgenceByActivite3ids(): cascade error: ', returnedError_cascade);
                                p_context.addError('AgenceDaoSql.getListAgenceByActivite3ids(): cascade error: ' + returnedError_cascade);
                                deferred.reject(returnedError_cascade);
                            }
                        );
                    },
                    function (returnedError_executeQueryToRead) { /* ERROR */
                        console.error('AgenceDaoSql.getListAgenceByActivite3ids(): error: ', returnedError_executeQueryToRead);
                        p_context.addError('AgenceDaoSql.getListAgenceByActivite3ids(): error: ' + returnedError_executeQueryToRead);
                        deferred.reject(returnedError_executeQueryToRead);
                    }
                );

//@non-generated-start[getListAgenceByActivite3ids-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name AgenceDaoSql#getListAgenceByActivite3ids
             * @function
             *
             * @description
             * Returns a list of Agences according to the parameter(s).
             *
             * @param {Array<Integer>} p_foreignKeys_activite3ids
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             *
             * @returns {Array<String>} Returns an Array of Agences, including children if required.
             */
            AgenceDaoSql.prototype.getListAgenceByActivite3ids = function (p_foreignKeys_activite3ids, p_context, p_cascadeSet) {

//@non-generated-start[getListAgenceByActivite3ids-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDaoSql.getListAgenceByActivite3ids() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'AgenceDaoSql.getListAgenceByActivite3ids() : p_cascadeSet is required and should be an array');
                console.assert(!angular.isUndefinedOrNull(p_foreignKeys_activite3ids), 'AgenceDaoSql.getListAgenceByActivite3ids() : p_foreignKeys_activite3ids is required');

                var deferred = $qSync.defer();
                var self = this;

                var o_sqlQuery = 'select * from T_AGENCE where ACTIVITE3ID in (' + self.produceQueryInPart(p_foreignKeys_activite3ids) + ');';
                var o_sqlParameters = [].concat(p_foreignKeys_activite3ids);

                self.executeQueryToRead(
                    'AgenceDaoSql.getListAgenceByActivite3ids()', p_context, o_sqlQuery, o_sqlParameters).then(
                    function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
                        self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
                            function (returnedSuccess_cascade) {
                                deferred.resolve(returnedSuccess_executeQueryToRead);
                            },
                            function (returnedError_cascade) {
                                console.error('AgenceDaoSql.getListAgenceByActivite3ids(): cascade error: ', returnedError_cascade);
                                p_context.addError('AgenceDaoSql.getListAgenceByActivite3ids(): cascade error: ' + returnedError_cascade);
                                deferred.reject(returnedError_cascade);
                            }
                        );
                    },
                    function (returnedError_executeQueryToRead) { /* ERROR */
                        console.error('AgenceDaoSql.getListAgenceByActivite3ids(): error: ', returnedError_executeQueryToRead);
                        p_context.addError('AgenceDaoSql.getListAgenceByActivite3ids(): error: ' + returnedError_executeQueryToRead);
                        deferred.reject(returnedError_executeQueryToRead);
                    }
                );

//@non-generated-start[getListAgenceByActivite3ids-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name AgenceDaoSql#getListAgenceByActivite3ids
             * @function
             *
             * @description
             * Returns a list of Agences according to the parameter(s).
             *
             * @param {Array<Integer>} p_foreignKeys_activite3ids
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             *
             * @returns {Array<String>} Returns an Array of Agences, including children if required.
             */
            AgenceDaoSql.prototype.getListAgenceByActivite3ids = function (p_foreignKeys_activite3ids, p_context, p_cascadeSet) {

//@non-generated-start[getListAgenceByActivite3ids-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDaoSql.getListAgenceByActivite3ids() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'AgenceDaoSql.getListAgenceByActivite3ids() : p_cascadeSet is required and should be an array');
                console.assert(!angular.isUndefinedOrNull(p_foreignKeys_activite3ids), 'AgenceDaoSql.getListAgenceByActivite3ids() : p_foreignKeys_activite3ids is required');

                var deferred = $qSync.defer();
                var self = this;

                var o_sqlQuery = 'select * from T_AGENCE where ACTIVITE3ID in (' + self.produceQueryInPart(p_foreignKeys_activite3ids) + ');';
                var o_sqlParameters = [].concat(p_foreignKeys_activite3ids);

                self.executeQueryToRead(
                    'AgenceDaoSql.getListAgenceByActivite3ids()', p_context, o_sqlQuery, o_sqlParameters).then(
                    function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
                        self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
                            function (returnedSuccess_cascade) {
                                deferred.resolve(returnedSuccess_executeQueryToRead);
                            },
                            function (returnedError_cascade) {
                                console.error('AgenceDaoSql.getListAgenceByActivite3ids(): cascade error: ', returnedError_cascade);
                                p_context.addError('AgenceDaoSql.getListAgenceByActivite3ids(): cascade error: ' + returnedError_cascade);
                                deferred.reject(returnedError_cascade);
                            }
                        );
                    },
                    function (returnedError_executeQueryToRead) { /* ERROR */
                        console.error('AgenceDaoSql.getListAgenceByActivite3ids(): error: ', returnedError_executeQueryToRead);
                        p_context.addError('AgenceDaoSql.getListAgenceByActivite3ids(): error: ' + returnedError_executeQueryToRead);
                        deferred.reject(returnedError_executeQueryToRead);
                    }
                );

//@non-generated-start[getListAgenceByActivite3ids-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name AgenceDaoSql#getListAgenceByActivite3ids
             * @function
             *
             * @description
             * Returns a list of Agences according to the parameter(s).
             *
             * @param {Array<Integer>} p_foreignKeys_activite3ids
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             *
             * @returns {Array<String>} Returns an Array of Agences, including children if required.
             */
            AgenceDaoSql.prototype.getListAgenceByActivite3ids = function (p_foreignKeys_activite3ids, p_context, p_cascadeSet) {

//@non-generated-start[getListAgenceByActivite3ids-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDaoSql.getListAgenceByActivite3ids() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'AgenceDaoSql.getListAgenceByActivite3ids() : p_cascadeSet is required and should be an array');
                console.assert(!angular.isUndefinedOrNull(p_foreignKeys_activite3ids), 'AgenceDaoSql.getListAgenceByActivite3ids() : p_foreignKeys_activite3ids is required');

                var deferred = $qSync.defer();
                var self = this;

                var o_sqlQuery = 'select * from T_AGENCE where ACTIVITE3ID in (' + self.produceQueryInPart(p_foreignKeys_activite3ids) + ');';
                var o_sqlParameters = [].concat(p_foreignKeys_activite3ids);

                self.executeQueryToRead(
                    'AgenceDaoSql.getListAgenceByActivite3ids()', p_context, o_sqlQuery, o_sqlParameters).then(
                    function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
                        self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
                            function (returnedSuccess_cascade) {
                                deferred.resolve(returnedSuccess_executeQueryToRead);
                            },
                            function (returnedError_cascade) {
                                console.error('AgenceDaoSql.getListAgenceByActivite3ids(): cascade error: ', returnedError_cascade);
                                p_context.addError('AgenceDaoSql.getListAgenceByActivite3ids(): cascade error: ' + returnedError_cascade);
                                deferred.reject(returnedError_cascade);
                            }
                        );
                    },
                    function (returnedError_executeQueryToRead) { /* ERROR */
                        console.error('AgenceDaoSql.getListAgenceByActivite3ids(): error: ', returnedError_executeQueryToRead);
                        p_context.addError('AgenceDaoSql.getListAgenceByActivite3ids(): error: ' + returnedError_executeQueryToRead);
                        deferred.reject(returnedError_executeQueryToRead);
                    }
                );

//@non-generated-start[getListAgenceByActivite3ids-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name AgenceDaoSql#getListAgenceByActivite2ids
             * @function
             *
             * @description
             * Returns a list of Agences according to the parameter(s).
             *
             * @param {Array<Integer>} p_foreignKeys_activite2ids
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             *
             * @returns {Array<String>} Returns an Array of Agences, including children if required.
             */
            AgenceDaoSql.prototype.getListAgenceByActivite2ids = function (p_foreignKeys_activite2ids, p_context, p_cascadeSet) {

//@non-generated-start[getListAgenceByActivite2ids-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDaoSql.getListAgenceByActivite2ids() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'AgenceDaoSql.getListAgenceByActivite2ids() : p_cascadeSet is required and should be an array');
                console.assert(!angular.isUndefinedOrNull(p_foreignKeys_activite2ids), 'AgenceDaoSql.getListAgenceByActivite2ids() : p_foreignKeys_activite2ids is required');

                var deferred = $qSync.defer();
                var self = this;

                var o_sqlQuery = 'select * from T_AGENCE where ACTIVITE2ID in (' + self.produceQueryInPart(p_foreignKeys_activite2ids) + ');';
                var o_sqlParameters = [].concat(p_foreignKeys_activite2ids);

                self.executeQueryToRead(
                    'AgenceDaoSql.getListAgenceByActivite2ids()', p_context, o_sqlQuery, o_sqlParameters).then(
                    function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
                        self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
                            function (returnedSuccess_cascade) {
                                deferred.resolve(returnedSuccess_executeQueryToRead);
                            },
                            function (returnedError_cascade) {
                                console.error('AgenceDaoSql.getListAgenceByActivite2ids(): cascade error: ', returnedError_cascade);
                                p_context.addError('AgenceDaoSql.getListAgenceByActivite2ids(): cascade error: ' + returnedError_cascade);
                                deferred.reject(returnedError_cascade);
                            }
                        );
                    },
                    function (returnedError_executeQueryToRead) { /* ERROR */
                        console.error('AgenceDaoSql.getListAgenceByActivite2ids(): error: ', returnedError_executeQueryToRead);
                        p_context.addError('AgenceDaoSql.getListAgenceByActivite2ids(): error: ' + returnedError_executeQueryToRead);
                        deferred.reject(returnedError_executeQueryToRead);
                    }
                );

//@non-generated-start[getListAgenceByActivite2ids-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name AgenceDaoSql#getListAgenceByActivite2ids
             * @function
             *
             * @description
             * Returns a list of Agences according to the parameter(s).
             *
             * @param {Array<Integer>} p_foreignKeys_activite2ids
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             *
             * @returns {Array<String>} Returns an Array of Agences, including children if required.
             */
            AgenceDaoSql.prototype.getListAgenceByActivite2ids = function (p_foreignKeys_activite2ids, p_context, p_cascadeSet) {

//@non-generated-start[getListAgenceByActivite2ids-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDaoSql.getListAgenceByActivite2ids() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'AgenceDaoSql.getListAgenceByActivite2ids() : p_cascadeSet is required and should be an array');
                console.assert(!angular.isUndefinedOrNull(p_foreignKeys_activite2ids), 'AgenceDaoSql.getListAgenceByActivite2ids() : p_foreignKeys_activite2ids is required');

                var deferred = $qSync.defer();
                var self = this;

                var o_sqlQuery = 'select * from T_AGENCE where ACTIVITE2ID in (' + self.produceQueryInPart(p_foreignKeys_activite2ids) + ');';
                var o_sqlParameters = [].concat(p_foreignKeys_activite2ids);

                self.executeQueryToRead(
                    'AgenceDaoSql.getListAgenceByActivite2ids()', p_context, o_sqlQuery, o_sqlParameters).then(
                    function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
                        self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
                            function (returnedSuccess_cascade) {
                                deferred.resolve(returnedSuccess_executeQueryToRead);
                            },
                            function (returnedError_cascade) {
                                console.error('AgenceDaoSql.getListAgenceByActivite2ids(): cascade error: ', returnedError_cascade);
                                p_context.addError('AgenceDaoSql.getListAgenceByActivite2ids(): cascade error: ' + returnedError_cascade);
                                deferred.reject(returnedError_cascade);
                            }
                        );
                    },
                    function (returnedError_executeQueryToRead) { /* ERROR */
                        console.error('AgenceDaoSql.getListAgenceByActivite2ids(): error: ', returnedError_executeQueryToRead);
                        p_context.addError('AgenceDaoSql.getListAgenceByActivite2ids(): error: ' + returnedError_executeQueryToRead);
                        deferred.reject(returnedError_executeQueryToRead);
                    }
                );

//@non-generated-start[getListAgenceByActivite2ids-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name AgenceDaoSql#getListAgenceByActivite2ids
             * @function
             *
             * @description
             * Returns a list of Agences according to the parameter(s).
             *
             * @param {Array<Integer>} p_foreignKeys_activite2ids
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             *
             * @returns {Array<String>} Returns an Array of Agences, including children if required.
             */
            AgenceDaoSql.prototype.getListAgenceByActivite2ids = function (p_foreignKeys_activite2ids, p_context, p_cascadeSet) {

//@non-generated-start[getListAgenceByActivite2ids-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDaoSql.getListAgenceByActivite2ids() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'AgenceDaoSql.getListAgenceByActivite2ids() : p_cascadeSet is required and should be an array');
                console.assert(!angular.isUndefinedOrNull(p_foreignKeys_activite2ids), 'AgenceDaoSql.getListAgenceByActivite2ids() : p_foreignKeys_activite2ids is required');

                var deferred = $qSync.defer();
                var self = this;

                var o_sqlQuery = 'select * from T_AGENCE where ACTIVITE2ID in (' + self.produceQueryInPart(p_foreignKeys_activite2ids) + ');';
                var o_sqlParameters = [].concat(p_foreignKeys_activite2ids);

                self.executeQueryToRead(
                    'AgenceDaoSql.getListAgenceByActivite2ids()', p_context, o_sqlQuery, o_sqlParameters).then(
                    function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
                        self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
                            function (returnedSuccess_cascade) {
                                deferred.resolve(returnedSuccess_executeQueryToRead);
                            },
                            function (returnedError_cascade) {
                                console.error('AgenceDaoSql.getListAgenceByActivite2ids(): cascade error: ', returnedError_cascade);
                                p_context.addError('AgenceDaoSql.getListAgenceByActivite2ids(): cascade error: ' + returnedError_cascade);
                                deferred.reject(returnedError_cascade);
                            }
                        );
                    },
                    function (returnedError_executeQueryToRead) { /* ERROR */
                        console.error('AgenceDaoSql.getListAgenceByActivite2ids(): error: ', returnedError_executeQueryToRead);
                        p_context.addError('AgenceDaoSql.getListAgenceByActivite2ids(): error: ' + returnedError_executeQueryToRead);
                        deferred.reject(returnedError_executeQueryToRead);
                    }
                );

//@non-generated-start[getListAgenceByActivite2ids-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name AgenceDaoSql#getListAgenceByActivite2ids
             * @function
             *
             * @description
             * Returns a list of Agences according to the parameter(s).
             *
             * @param {Array<Integer>} p_foreignKeys_activite2ids
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             *
             * @returns {Array<String>} Returns an Array of Agences, including children if required.
             */
            AgenceDaoSql.prototype.getListAgenceByActivite2ids = function (p_foreignKeys_activite2ids, p_context, p_cascadeSet) {

//@non-generated-start[getListAgenceByActivite2ids-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDaoSql.getListAgenceByActivite2ids() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'AgenceDaoSql.getListAgenceByActivite2ids() : p_cascadeSet is required and should be an array');
                console.assert(!angular.isUndefinedOrNull(p_foreignKeys_activite2ids), 'AgenceDaoSql.getListAgenceByActivite2ids() : p_foreignKeys_activite2ids is required');

                var deferred = $qSync.defer();
                var self = this;

                var o_sqlQuery = 'select * from T_AGENCE where ACTIVITE2ID in (' + self.produceQueryInPart(p_foreignKeys_activite2ids) + ');';
                var o_sqlParameters = [].concat(p_foreignKeys_activite2ids);

                self.executeQueryToRead(
                    'AgenceDaoSql.getListAgenceByActivite2ids()', p_context, o_sqlQuery, o_sqlParameters).then(
                    function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
                        self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
                            function (returnedSuccess_cascade) {
                                deferred.resolve(returnedSuccess_executeQueryToRead);
                            },
                            function (returnedError_cascade) {
                                console.error('AgenceDaoSql.getListAgenceByActivite2ids(): cascade error: ', returnedError_cascade);
                                p_context.addError('AgenceDaoSql.getListAgenceByActivite2ids(): cascade error: ' + returnedError_cascade);
                                deferred.reject(returnedError_cascade);
                            }
                        );
                    },
                    function (returnedError_executeQueryToRead) { /* ERROR */
                        console.error('AgenceDaoSql.getListAgenceByActivite2ids(): error: ', returnedError_executeQueryToRead);
                        p_context.addError('AgenceDaoSql.getListAgenceByActivite2ids(): error: ' + returnedError_executeQueryToRead);
                        deferred.reject(returnedError_executeQueryToRead);
                    }
                );

//@non-generated-start[getListAgenceByActivite2ids-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name AgenceDaoSql#getListAgenceByActivite1ids
             * @function
             *
             * @description
             * Returns a list of Agences according to the parameter(s).
             *
             * @param {Array<Integer>} p_foreignKeys_activite1ids
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             *
             * @returns {Array<String>} Returns an Array of Agences, including children if required.
             */
            AgenceDaoSql.prototype.getListAgenceByActivite1ids = function (p_foreignKeys_activite1ids, p_context, p_cascadeSet) {

//@non-generated-start[getListAgenceByActivite1ids-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDaoSql.getListAgenceByActivite1ids() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'AgenceDaoSql.getListAgenceByActivite1ids() : p_cascadeSet is required and should be an array');
                console.assert(!angular.isUndefinedOrNull(p_foreignKeys_activite1ids), 'AgenceDaoSql.getListAgenceByActivite1ids() : p_foreignKeys_activite1ids is required');

                var deferred = $qSync.defer();
                var self = this;

                var o_sqlQuery = 'select * from T_AGENCE where ACTIVITE1ID in (' + self.produceQueryInPart(p_foreignKeys_activite1ids) + ');';
                var o_sqlParameters = [].concat(p_foreignKeys_activite1ids);

                self.executeQueryToRead(
                    'AgenceDaoSql.getListAgenceByActivite1ids()', p_context, o_sqlQuery, o_sqlParameters).then(
                    function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
                        self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
                            function (returnedSuccess_cascade) {
                                deferred.resolve(returnedSuccess_executeQueryToRead);
                            },
                            function (returnedError_cascade) {
                                console.error('AgenceDaoSql.getListAgenceByActivite1ids(): cascade error: ', returnedError_cascade);
                                p_context.addError('AgenceDaoSql.getListAgenceByActivite1ids(): cascade error: ' + returnedError_cascade);
                                deferred.reject(returnedError_cascade);
                            }
                        );
                    },
                    function (returnedError_executeQueryToRead) { /* ERROR */
                        console.error('AgenceDaoSql.getListAgenceByActivite1ids(): error: ', returnedError_executeQueryToRead);
                        p_context.addError('AgenceDaoSql.getListAgenceByActivite1ids(): error: ' + returnedError_executeQueryToRead);
                        deferred.reject(returnedError_executeQueryToRead);
                    }
                );

//@non-generated-start[getListAgenceByActivite1ids-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name AgenceDaoSql#getListAgenceByActivite1ids
             * @function
             *
             * @description
             * Returns a list of Agences according to the parameter(s).
             *
             * @param {Array<Integer>} p_foreignKeys_activite1ids
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             *
             * @returns {Array<String>} Returns an Array of Agences, including children if required.
             */
            AgenceDaoSql.prototype.getListAgenceByActivite1ids = function (p_foreignKeys_activite1ids, p_context, p_cascadeSet) {

//@non-generated-start[getListAgenceByActivite1ids-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDaoSql.getListAgenceByActivite1ids() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'AgenceDaoSql.getListAgenceByActivite1ids() : p_cascadeSet is required and should be an array');
                console.assert(!angular.isUndefinedOrNull(p_foreignKeys_activite1ids), 'AgenceDaoSql.getListAgenceByActivite1ids() : p_foreignKeys_activite1ids is required');

                var deferred = $qSync.defer();
                var self = this;

                var o_sqlQuery = 'select * from T_AGENCE where ACTIVITE1ID in (' + self.produceQueryInPart(p_foreignKeys_activite1ids) + ');';
                var o_sqlParameters = [].concat(p_foreignKeys_activite1ids);

                self.executeQueryToRead(
                    'AgenceDaoSql.getListAgenceByActivite1ids()', p_context, o_sqlQuery, o_sqlParameters).then(
                    function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
                        self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
                            function (returnedSuccess_cascade) {
                                deferred.resolve(returnedSuccess_executeQueryToRead);
                            },
                            function (returnedError_cascade) {
                                console.error('AgenceDaoSql.getListAgenceByActivite1ids(): cascade error: ', returnedError_cascade);
                                p_context.addError('AgenceDaoSql.getListAgenceByActivite1ids(): cascade error: ' + returnedError_cascade);
                                deferred.reject(returnedError_cascade);
                            }
                        );
                    },
                    function (returnedError_executeQueryToRead) { /* ERROR */
                        console.error('AgenceDaoSql.getListAgenceByActivite1ids(): error: ', returnedError_executeQueryToRead);
                        p_context.addError('AgenceDaoSql.getListAgenceByActivite1ids(): error: ' + returnedError_executeQueryToRead);
                        deferred.reject(returnedError_executeQueryToRead);
                    }
                );

//@non-generated-start[getListAgenceByActivite1ids-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name AgenceDaoSql#getListAgenceByActivite1ids
             * @function
             *
             * @description
             * Returns a list of Agences according to the parameter(s).
             *
             * @param {Array<Integer>} p_foreignKeys_activite1ids
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             *
             * @returns {Array<String>} Returns an Array of Agences, including children if required.
             */
            AgenceDaoSql.prototype.getListAgenceByActivite1ids = function (p_foreignKeys_activite1ids, p_context, p_cascadeSet) {

//@non-generated-start[getListAgenceByActivite1ids-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDaoSql.getListAgenceByActivite1ids() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'AgenceDaoSql.getListAgenceByActivite1ids() : p_cascadeSet is required and should be an array');
                console.assert(!angular.isUndefinedOrNull(p_foreignKeys_activite1ids), 'AgenceDaoSql.getListAgenceByActivite1ids() : p_foreignKeys_activite1ids is required');

                var deferred = $qSync.defer();
                var self = this;

                var o_sqlQuery = 'select * from T_AGENCE where ACTIVITE1ID in (' + self.produceQueryInPart(p_foreignKeys_activite1ids) + ');';
                var o_sqlParameters = [].concat(p_foreignKeys_activite1ids);

                self.executeQueryToRead(
                    'AgenceDaoSql.getListAgenceByActivite1ids()', p_context, o_sqlQuery, o_sqlParameters).then(
                    function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
                        self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
                            function (returnedSuccess_cascade) {
                                deferred.resolve(returnedSuccess_executeQueryToRead);
                            },
                            function (returnedError_cascade) {
                                console.error('AgenceDaoSql.getListAgenceByActivite1ids(): cascade error: ', returnedError_cascade);
                                p_context.addError('AgenceDaoSql.getListAgenceByActivite1ids(): cascade error: ' + returnedError_cascade);
                                deferred.reject(returnedError_cascade);
                            }
                        );
                    },
                    function (returnedError_executeQueryToRead) { /* ERROR */
                        console.error('AgenceDaoSql.getListAgenceByActivite1ids(): error: ', returnedError_executeQueryToRead);
                        p_context.addError('AgenceDaoSql.getListAgenceByActivite1ids(): error: ' + returnedError_executeQueryToRead);
                        deferred.reject(returnedError_executeQueryToRead);
                    }
                );

//@non-generated-start[getListAgenceByActivite1ids-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name AgenceDaoSql#getListAgenceByActivite1ids
             * @function
             *
             * @description
             * Returns a list of Agences according to the parameter(s).
             *
             * @param {Array<Integer>} p_foreignKeys_activite1ids
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             *
             * @returns {Array<String>} Returns an Array of Agences, including children if required.
             */
            AgenceDaoSql.prototype.getListAgenceByActivite1ids = function (p_foreignKeys_activite1ids, p_context, p_cascadeSet) {

//@non-generated-start[getListAgenceByActivite1ids-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDaoSql.getListAgenceByActivite1ids() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'AgenceDaoSql.getListAgenceByActivite1ids() : p_cascadeSet is required and should be an array');
                console.assert(!angular.isUndefinedOrNull(p_foreignKeys_activite1ids), 'AgenceDaoSql.getListAgenceByActivite1ids() : p_foreignKeys_activite1ids is required');

                var deferred = $qSync.defer();
                var self = this;

                var o_sqlQuery = 'select * from T_AGENCE where ACTIVITE1ID in (' + self.produceQueryInPart(p_foreignKeys_activite1ids) + ');';
                var o_sqlParameters = [].concat(p_foreignKeys_activite1ids);

                self.executeQueryToRead(
                    'AgenceDaoSql.getListAgenceByActivite1ids()', p_context, o_sqlQuery, o_sqlParameters).then(
                    function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
                        self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
                            function (returnedSuccess_cascade) {
                                deferred.resolve(returnedSuccess_executeQueryToRead);
                            },
                            function (returnedError_cascade) {
                                console.error('AgenceDaoSql.getListAgenceByActivite1ids(): cascade error: ', returnedError_cascade);
                                p_context.addError('AgenceDaoSql.getListAgenceByActivite1ids(): cascade error: ' + returnedError_cascade);
                                deferred.reject(returnedError_cascade);
                            }
                        );
                    },
                    function (returnedError_executeQueryToRead) { /* ERROR */
                        console.error('AgenceDaoSql.getListAgenceByActivite1ids(): error: ', returnedError_executeQueryToRead);
                        p_context.addError('AgenceDaoSql.getListAgenceByActivite1ids(): error: ' + returnedError_executeQueryToRead);
                        deferred.reject(returnedError_executeQueryToRead);
                    }
                );

//@non-generated-start[getListAgenceByActivite1ids-after][X]
//@non-generated-end

                return deferred.promise;
            };


            //==================================================================================
            //========   SPECIFIC METHODS - SAVE
            //==================================================================================
            /**
             * @ngdoc method
             * @name AgenceDaoSql#saveAgence
             * @function
             *
             * @description
             * Saves a Agence.
             *
             * @param {Agence} p_entity Agence to process
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
             *
             * @returns {Promise} Returns a promise equal to true if the Agence was saved, false otherwise.
             */
            AgenceDaoSql.prototype.saveAgence = function (p_entity, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[saveAgence-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDaoSql.saveAgence() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'AgenceDaoSql.saveAgence() : p_cascadeSet is required and should be an array');
                console.assert(!angular.isUndefinedOrNull(p_entity), 'AgenceDaoSql.saveAgence() : p_entity is required');

                var deferred = $qSync.defer();
                var self = this;

                self.fixDoubleWaysRelationship(p_entity);
                // --------------------------
                // 1. save or update children pointed by the parent : for relationships xxx_to_one
                // --------------------------
                var savePointedChildren = [];

                //		1.1  call saveOrUpdate function of the child dao
                //		1.2  check that the ID attribute of the children model entities is updated (update foreign key of the parent pointing the child just saved)
                var activite4Idx = p_cascadeSet.indexOf('activite4');
                if (activite4Idx > -1) {
                    p_cascadeSet.splice(activite4Idx, 1);
                    savePointedChildren.push(ActiviteDaoProxy.saveOrUpdateActivite(p_entity.activite4, p_context, p_cascadeSet, p_toSync));
                }
                var detailIdx = p_cascadeSet.indexOf('detail');
                if (detailIdx > -1) {
                    p_cascadeSet.splice(detailIdx, 1);
                    savePointedChildren.push(AgenceDetailDaoProxy.saveOrUpdateAgenceDetail(p_entity.detail, p_context, p_cascadeSet, p_toSync));
                }
                var activite3Idx = p_cascadeSet.indexOf('activite3');
                if (activite3Idx > -1) {
                    p_cascadeSet.splice(activite3Idx, 1);
                    savePointedChildren.push(ActiviteDaoProxy.saveOrUpdateActivite(p_entity.activite3, p_context, p_cascadeSet, p_toSync));
                }
                var activite2Idx = p_cascadeSet.indexOf('activite2');
                if (activite2Idx > -1) {
                    p_cascadeSet.splice(activite2Idx, 1);
                    savePointedChildren.push(ActiviteDaoProxy.saveOrUpdateActivite(p_entity.activite2, p_context, p_cascadeSet, p_toSync));
                }
                var activite1Idx = p_cascadeSet.indexOf('activite1');
                if (activite1Idx > -1) {
                    p_cascadeSet.splice(activite1Idx, 1);
                    savePointedChildren.push(ActiviteDaoProxy.saveOrUpdateActivite(p_entity.activite1, p_context, p_cascadeSet, p_toSync));
                }
                var mainClientIdx = p_cascadeSet.indexOf('mainClient');
                if (mainClientIdx > -1) {
                    p_cascadeSet.splice(mainClientIdx, 1);
                    savePointedChildren.push(ClientDaoProxy.saveOrUpdateClient(p_entity.mainClient, p_context, p_cascadeSet, p_toSync));
                }

                $qSync.all(savePointedChildren).then(
                    function (success) { /* SUCCESS */
                        // --------------------------
                        // 2. save the main entity
                        // --------------------------

                        self.saveEntity(p_entity, p_context, p_toSync).then(
                            function (success_result) {

                                var saveOtherChildren = [];

                                // --------------------------
                                // 3. save or update children not pointed by the parent : for relationships one_to_xxx and many_to_many
                                // --------------------------
                                // foreach child attr
                                // 		3.1  call saveOrUpdate function of the child dao
                                // 		3.2  check that the ID attribute of the children model entities is updated (update foreign key of the parent pointing the child just saved)

                                var clientsIdx = p_cascadeSet.indexOf('clients');
                                if (clientsIdx > -1) {
                                    p_cascadeSet.splice(clientsIdx, 1);
                                    saveOtherChildren.push(ClientDaoProxy.saveOrUpdateListClient(p_entity.clients, p_context, p_cascadeSet, p_toSync));
                                }

                                var detailIdx = p_cascadeSet.indexOf('detail');
                                if (detailIdx > -1) {
                                    p_cascadeSet.splice(detailIdx, 1);
                                    saveOtherChildren.push(AgenceDetailDaoProxy.saveOrUpdateAgenceDetail(p_entity.detail, p_context, p_cascadeSet, p_toSync));
                                }

                                var employeesIdx = p_cascadeSet.indexOf('employees');
                                if (employeesIdx > -1) {
                                    p_cascadeSet.splice(employeesIdx, 1);
                                    saveOtherChildren.push(EmployeeDaoProxy.saveOrUpdateListEmployee(p_entity.employees, p_context, p_cascadeSet, p_toSync));
                                }

                                var mainClientIdx = p_cascadeSet.indexOf('mainClient');
                                if (mainClientIdx > -1) {
                                    p_cascadeSet.splice(mainClientIdx, 1);
                                    saveOtherChildren.push(ClientDaoProxy.saveOrUpdateClient(p_entity.mainClient, p_context, p_cascadeSet, p_toSync));
                                }

                                var photosIdx = p_cascadeSet.indexOf('photos');
                                if (photosIdx > -1) {
                                    p_cascadeSet.splice(photosIdx, 1);
                                    saveOtherChildren.push(AgencePhotosDaoProxy.saveOrUpdateListAgencePhotos(p_entity.photos, p_context, p_cascadeSet, p_toSync));
                                }


                                $qSync.all(saveOtherChildren).then(
                                    function (success) {
                                        deferred.resolve(success_result);
                                    },
                                    function (error) {
                                        deferred.reject(error);
                                    }
                                );
                            },
                            function (failure_result) {
                                deferred.reject(failure_result);
                            }
                        );
                    },
                    function (error) { /* ERROR */
                        deferred.reject(error);
                    }
                );


//@non-generated-start[saveAgence-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name AgenceDaoSql#saveListAgence
             * @function
             *
             * @description
             * Saves a list of Agences.
             *
             * @param {Array<Agence>} p_entities Array containing Agences to process
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
             *
             * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of Agences was saved, false otherwise.
             */
            AgenceDaoSql.prototype.saveListAgence = function (p_entities, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[saveListAgence-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDaoSql.saveListAgence() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'AgenceDaoSql.saveListAgence() : p_cascadeSet is required and should be an array');
                console.assert(angular.isArray(p_entities), 'AgenceDaoSql.saveListAgence() : p_entities is required and should be an array');

                var deferred = $qSync.defer();
                var self = this;

                /* saveListAgence() => saveAgence() */
                var o_arrayPromisesSaveAgence = [];
                for (var i = 0; i < p_entities.length; i++) {
                    o_arrayPromisesSaveAgence.push(self.saveAgence(p_entities[i], p_context, angular.copy(p_cascadeSet), p_toSync));
                }
                // $qSync.all() returns an array of the results of o_arrayPromisesSaveAgence.
                // If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
                deferred.resolve($qSync.all(o_arrayPromisesSaveAgence));


//@non-generated-start[saveListAgence-after][X]
//@non-generated-end

                return deferred.promise;
            };


            //==================================================================================
            //========   SPECIFIC METHODS - UPDATE
            //==================================================================================
            /**
             * @ngdoc method
             * @name AgenceDaoSql#updateAgence
             * @function
             *
             * @description
             * Updates a Agence.
             *
             * @param {Agence} p_entity Agence to process
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
             * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
             *
             * @returns {Promise} Returns a promise equal to true if the Agence was updated, false otherwise.
             */
            AgenceDaoSql.prototype.updateAgence = function (p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

//@non-generated-start[updateAgence-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDaoSql.updateAgence() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'AgenceDaoSql.updateAgence() : p_cascadeSet is required and should be an array');
                console.assert(!angular.isUndefinedOrNull(p_entity), 'AgenceDaoSql.updateAgence() : p_entity is required');

                var deferred = $qSync.defer();
                var self = this;

                var childrenPromises = [];

                self.fixDoubleWaysRelationship(p_entity);
                // for composition relationships one_to_xxx

                var clientsIdx = p_cascadeSet.indexOf('clients');
                if (clientsIdx > -1) {
                    p_cascadeSet.splice(clientsIdx, 1);

                    // 1. delete the children that are not in p_entity if composition relationship one_to_xxx (delete from CHILD where PARENTID=xxx and CHILDID not in(xxx, xxx)
                    childrenPromises.push(
                        self.getChildrenIdsToRemove(p_context, p_entity, 'clients').then(
                            function (idsToRemove) {
                                console.log('children to remove found', idsToRemove);
                                return ClientDaoProxy.deleteListClientByIds(idsToRemove, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
                            },
                            function (error) {
                                deferred.reject(error);
                            }
                        )
                    );

                    // 2. save or update the remaining children if composition relationship one_to_xxx
                    childrenPromises.push(ClientDaoProxy.saveOrUpdateListClient(p_entity.clients, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete));
                }

                var detailIdx = p_cascadeSet.indexOf('detail');
                if (detailIdx > -1) {
                    p_cascadeSet.splice(detailIdx, 1);

                    // 1. delete the children that are not in p_entity if composition relationship one_to_xxx (delete from CHILD where PARENTID=xxx and CHILDID not in(xxx, xxx)
                    childrenPromises.push(
                        self.getChildrenIdsToRemove(p_context, p_entity, 'detail').then(
                            function (idsToRemove) {
                                console.log('children to remove found', idsToRemove);
                                return AgenceDetailDaoProxy.deleteListAgenceDetailByIds(idsToRemove, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
                            },
                            function (error) {
                                deferred.reject(error);
                            }
                        )
                    );

                    // 2. save or update the remaining children if composition relationship one_to_xxx
                    childrenPromises.push(AgenceDetailDaoProxy.saveOrUpdateAgenceDetail(p_entity.detail, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete));
                }

                var employeesIdx = p_cascadeSet.indexOf('employees');
                if (employeesIdx > -1) {
                    p_cascadeSet.splice(employeesIdx, 1);

                    // 1. delete the children that are not in p_entity if composition relationship one_to_xxx (delete from CHILD where PARENTID=xxx and CHILDID not in(xxx, xxx)
                    childrenPromises.push(
                        self.getChildrenIdsToRemove(p_context, p_entity, 'employees').then(
                            function (idsToRemove) {
                                console.log('children to remove found', idsToRemove);
                                return EmployeeDaoProxy.deleteListEmployeeByIds(idsToRemove, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
                            },
                            function (error) {
                                deferred.reject(error);
                            }
                        )
                    );

                    // 2. save or update the remaining children if composition relationship one_to_xxx
                    childrenPromises.push(EmployeeDaoProxy.saveOrUpdateListEmployee(p_entity.employees, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete));
                }

                var mainClientIdx = p_cascadeSet.indexOf('mainClient');
                if (mainClientIdx > -1) {
                    p_cascadeSet.splice(mainClientIdx, 1);

                    // 1. delete the children that are not in p_entity if composition relationship one_to_xxx (delete from CHILD where PARENTID=xxx and CHILDID not in(xxx, xxx)
                    childrenPromises.push(
                        self.getChildrenIdsToRemove(p_context, p_entity, 'mainClient').then(
                            function (idsToRemove) {
                                console.log('children to remove found', idsToRemove);
                                return ClientDaoProxy.deleteListClientByIds(idsToRemove, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
                            },
                            function (error) {
                                deferred.reject(error);
                            }
                        )
                    );

                    // 2. save or update the remaining children if composition relationship one_to_xxx
                    childrenPromises.push(ClientDaoProxy.saveOrUpdateClient(p_entity.mainClient, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete));
                }

                var photosIdx = p_cascadeSet.indexOf('photos');
                if (photosIdx > -1) {
                    p_cascadeSet.splice(photosIdx, 1);

                    // 1. delete the children that are not in p_entity if composition relationship one_to_xxx (delete from CHILD where PARENTID=xxx and CHILDID not in(xxx, xxx)
                    childrenPromises.push(
                        self.getChildrenIdsToRemove(p_context, p_entity, 'photos').then(
                            function (idsToRemove) {
                                console.log('children to remove found', idsToRemove);
                                return AgencePhotosDaoProxy.deleteListAgencePhotosByIds(idsToRemove, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
                            },
                            function (error) {
                                deferred.reject(error);
                            }
                        )
                    );

                    // 2. save or update the remaining children if composition relationship one_to_xxx
                    childrenPromises.push(AgencePhotosDaoProxy.saveOrUpdateListAgencePhotos(p_entity.photos, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete));
                }


                // 2. save or update all the other children (no matter the type of relationship), if asked by p_cascadeset
                var activite4Idx = p_cascadeSet.indexOf('activite4');
                if (activite4Idx > -1) {
                    childrenPromises.push(ActiviteDaoProxy.saveOrUpdateActivite(p_entity.activite4, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete));
                }
                var activite3Idx = p_cascadeSet.indexOf('activite3');
                if (activite3Idx > -1) {
                    childrenPromises.push(ActiviteDaoProxy.saveOrUpdateActivite(p_entity.activite3, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete));
                }
                var activite2Idx = p_cascadeSet.indexOf('activite2');
                if (activite2Idx > -1) {
                    childrenPromises.push(ActiviteDaoProxy.saveOrUpdateActivite(p_entity.activite2, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete));
                }
                var activite1Idx = p_cascadeSet.indexOf('activite1');
                if (activite1Idx > -1) {
                    childrenPromises.push(ActiviteDaoProxy.saveOrUpdateActivite(p_entity.activite1, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete));
                }


                $qSync.all(childrenPromises).then(
                    function (success) {
                        console.log('children updated', success);

                        // 3. update the parent
                        self.updateEntity(p_entity, p_context, p_toSync).then(
                            function (success_result) { /* SUCCESS */
                                console.log('parent updated', success_result);
                                deferred.resolve(success_result);
                            },
                            function (failure_result) { /* ERROR */
                                deferred.reject(failure_result);
                            }
                        );
                    },
                    function (error) {
                        deferred.reject(error);
                    }
                );


//@non-generated-start[updateAgence-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name AgenceDaoSql#updateListAgence
             * @function
             *
             * @description
             * Updates a list of Agences.
             *
             * @param {Array<Agence>} p_entities Array containing Agences to process
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
             * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
             *
             * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of Agences was updated, false otherwise.
             */
            AgenceDaoSql.prototype.updateListAgence = function (p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

//@non-generated-start[updateListAgence-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDaoSql.updateListAgence() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'AgenceDaoSql.updateListAgence() : p_cascadeSet is required and should be an array');
                console.assert(angular.isArray(p_entities), 'AgenceDaoSql.updateListAgence() : p_entities is required and should be an array');

                var deferred = $qSync.defer();
                var self = this;

                /* updateListAgence() => updateAgence() */
                var o_arrayPromisesUpdateAgence = [];
                for (var i = 0; i < p_entities.length; i++) {
                    o_arrayPromisesUpdateAgence.push(self.updateAgence(p_entities[i], p_context, angular.copy(p_cascadeSet), p_toSync, angular.copy(p_cascadeSetForDelete)));
                }
                // $qSync.all() returns an array of the results of o_arrayPromisesUpdateAgence.
                // If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
                deferred.resolve($qSync.all(o_arrayPromisesUpdateAgence));


//@non-generated-start[updateListAgence-after][X]
//@non-generated-end

                return deferred.promise;
            };


            //==================================================================================
            //========   SPECIFIC METHODS - SAVE & UPDATE
            //==================================================================================
            /**
             * @ngdoc method
             * @name AgenceDaoSql#saveOrUpdateAgence
             * @function
             *
             * @description
             * Saves of updates a Agence.
             *
             * @param {Agence} p_entity Agence to process
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
             * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
             *
             * @returns {Promise} Returns a promise equal to true if the Agence was saved or updated, false otherwise.
             */
            AgenceDaoSql.prototype.saveOrUpdateAgence = function (p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

//@non-generated-start[saveOrUpdateAgence-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDaoSql.saveOrUpdateAgence() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'AgenceDaoSql.saveOrUpdateAgence() : p_cascadeSet is required and should be an array');
                console.assert(!angular.isUndefinedOrNull(p_entity), 'AgenceDaoSql.saveOrUpdateAgence() : p_entity is required');

                var deferred = $qSync.defer();
                var self = this;

                if (p_entity.idToString !== -1) {
                    this.exist(p_entity, p_context).then(function (result) {
                            if (result) {
                                /* updateAgence */
                                console.log('AgenceDaoSql.saveOrUpdateAgence(): entity exists  => updateAgence()');
                                deferred.resolve(self.updateAgence(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete));
                            } else {
                                /* saveAgence */
                                console.log('AgenceDaoSql.saveOrUpdateAgence(): entity does not exist  => saveAgence()');
                                deferred.resolve(self.saveAgence(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete)); // last parameter ignored by called method
                            }
                        },
                        function (error) {
                            deferred.reject(error);
                        });
                } else {
                    /* saveAgence */
                    console.log('AgenceDaoSql.saveOrUpdateAgence(): entity does not exist  => saveAgence()');
                    deferred.resolve(self.saveAgence(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete)); // last parameter ignored by called method
                }


//@non-generated-start[saveOrUpdateAgence-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name AgenceDaoSql#saveOrUpdateListAgence
             * @function
             *
             * @description
             * Saves of updates a list of Agences.
             *
             * @param {Array<Agence>} p_entities Array containing Agences to process
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
             * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
             *
             * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of Agences was saved or updated, false otherwise.
             */
            AgenceDaoSql.prototype.saveOrUpdateListAgence = function (p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

//@non-generated-start[saveOrUpdateListAgence-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDaoSql.saveOrUpdateListAgence() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'AgenceDaoSql.saveOrUpdateListAgence() : p_cascadeSet is required and should be an array');
                console.assert(angular.isArray(p_entities), 'AgenceDaoSql.saveOrUpdateListAgence() : p_entities is required and should be an array');

                var deferred = $qSync.defer();
                var self = this;

                /* saveOrUpdateListAgence() => saveOrUpdateAgence() */
                var o_arrayPromisesSaveOrUpdateAgence = [];
                for (var i = 0; i < p_entities.length; i++) {
                    o_arrayPromisesSaveOrUpdateAgence.push(self.saveOrUpdateAgence(p_entities[i], p_context, angular.copy(p_cascadeSet), p_toSync, angular.copy(p_cascadeSetForDelete)));
                }
                // $qSync.all() returns an array of the results of o_arrayPromisesSaveOrUpdateAgence.
                // If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
                deferred.resolve($qSync.all(o_arrayPromisesSaveOrUpdateAgence));


//@non-generated-start[saveOrUpdateListAgence-after][X]
//@non-generated-end

                return deferred.promise;
            };


            //==================================================================================
            //========   SPECIFIC METHODS - DELETE
            //==================================================================================
            /**
             * @ngdoc method
             * @name AgenceDaoSql#deleteAgence
             * @function
             *
             * @description
             * Delete a Agence.
             *
             * @param {Agence} p_entity Agence to process
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
             *
             * @returns {Promise} Returns a promise equal to true if the Agence was deleted, false otherwise.
             */
            AgenceDaoSql.prototype.deleteAgence = function (p_entity, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[deleteAgence-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDaoSql.deleteAgence() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'AgenceDaoSql.deleteAgence() : p_cascadeSet is required and should be an array');
                console.assert(!angular.isUndefinedOrNull(p_entity), 'AgenceDaoSql.deleteAgence() : p_entity is required');

                var deferred = $qSync.defer();
                var self = this;

                //0. load children that should always be deleted or updated
                self.loadChildrenIfNeeded(p_context, p_entity, p_cascadeSet).then(
                    function (returnedSuccess_loadChildrenIfNeeded) {
                        var pointersDeletes = [];


                        // 2. for composition relationships one_to_xxx : ALWAYS delete children "nested" in the parent :
                        pointersDeletes.push(ClientDaoProxy.deleteListClient(p_entity.clients, p_context, p_cascadeSet, p_toSync));

                        // 2. for composition relationships one_to_xxx : ALWAYS delete children "nested" in the parent :
                        pointersDeletes.push(AgenceDetailDaoProxy.deleteListAgenceDetail(p_entity.detail, p_context, p_cascadeSet, p_toSync));

                        // 2. for composition relationships one_to_xxx : ALWAYS delete children "nested" in the parent :
                        pointersDeletes.push(AgencePhotosDaoProxy.deleteListAgencePhotos(p_entity.photos, p_context, p_cascadeSet, p_toSync));


                        // 3. for aggregation relationships one_to_xxx

                        var employeesIdx = p_cascadeSet.indexOf('employees');

                        // 	3.1. if asked in p_cascadeset, delete the other children pointing the parent
                        if (employeesIdx > -1) {
                            p_cascadeSet.splice(employeesIdx, 1);
                            pointersDeletes.push(EmployeeDaoProxy.deleteListEmployee(p_entity.employees, p_context, p_cascadeSet, p_toSync));
                            //  3.2  otherwise, just clear FKs pointing the parent				} else {
                            for (var i = 0; i < p_entity.employees; i++) {
                                p_entity.employees[i] = null;
                            }
                        }


                        $qSync.all(pointersDeletes).then(
                            function (returnedSuccess_pointers) { /* SUCCESS */

                                // 4. delete the parent
                                self.deleteEntity(p_entity, p_context, p_toSync).then(
                                    function (returnedSuccess_executeQueryToDelete) { /* SUCCESS */
                                        pointersDeletes = [];

                                        //5. for composition and aggregation relationships xxx_to_one
                                        var activite4Idx = p_cascadeSet.indexOf('activite4');
                                        // 	5.1. ONLY IF asked in p_cascadeset, delete children
                                        if (activite4Idx > -1) {
                                            p_cascadeSet.splice(activite4Idx, 1);
                                            pointersDeletes.push(ActiviteDaoProxy.deleteListActivite(p_entity.activite4, p_context, p_cascadeSet, p_toSync));
                                        }

                                        var detailIdx = p_cascadeSet.indexOf('detail');
                                        // 	5.1. ONLY IF asked in p_cascadeset, delete children
                                        if (detailIdx > -1) {
                                            p_cascadeSet.splice(detailIdx, 1);
                                            pointersDeletes.push(AgenceDetailDaoProxy.deleteListAgenceDetail(p_entity.detail, p_context, p_cascadeSet, p_toSync));
                                        }

                                        var activite3Idx = p_cascadeSet.indexOf('activite3');
                                        // 	5.1. ONLY IF asked in p_cascadeset, delete children
                                        if (activite3Idx > -1) {
                                            p_cascadeSet.splice(activite3Idx, 1);
                                            pointersDeletes.push(ActiviteDaoProxy.deleteListActivite(p_entity.activite3, p_context, p_cascadeSet, p_toSync));
                                        }

                                        var activite2Idx = p_cascadeSet.indexOf('activite2');
                                        // 	5.1. ONLY IF asked in p_cascadeset, delete children
                                        if (activite2Idx > -1) {
                                            p_cascadeSet.splice(activite2Idx, 1);
                                            pointersDeletes.push(ActiviteDaoProxy.deleteListActivite(p_entity.activite2, p_context, p_cascadeSet, p_toSync));
                                        }

                                        var activite1Idx = p_cascadeSet.indexOf('activite1');
                                        // 	5.1. ONLY IF asked in p_cascadeset, delete children
                                        if (activite1Idx > -1) {
                                            p_cascadeSet.splice(activite1Idx, 1);
                                            pointersDeletes.push(ActiviteDaoProxy.deleteListActivite(p_entity.activite1, p_context, p_cascadeSet, p_toSync));
                                        }

                                        var mainClientIdx = p_cascadeSet.indexOf('mainClient');
                                        // 	5.1. ONLY IF asked in p_cascadeset, delete children
                                        if (mainClientIdx > -1) {
                                            p_cascadeSet.splice(mainClientIdx, 1);
                                            pointersDeletes.push(ClientDaoProxy.deleteListClient(p_entity.mainClient, p_context, p_cascadeSet, p_toSync));
                                        }

                                        $qSync.all(pointersDeletes).then(
                                            function (returnedSuccess_executeQuery2ToDelete) { /* SUCCESS */
                                                deferred.resolve(returnedSuccess_executeQuery2ToDelete);
                                            },
                                            function (returnedError_executeQuery2ToDelete) { /* ERROR */
                                                console.error('AgenceDaoSql.deleteAgence(): error: ', returnedError_executeQuery2ToDelete);
                                                p_context.addError('AgenceDaoSql.deleteAgence(): error: ' + returnedError_executeQuery2ToDelete);
                                                deferred.reject(returnedError_executeQuery2ToDelete);
                                            }
                                        );

                                    },
                                    function (returnedError_executeQueryToDelete) { /* ERROR */
                                        deferred.reject(returnedError_executeQueryToDelete);
                                    }
                                );

                            },
                            function (returnedError_pointers) { /* ERROR */
                                deferred.reject(returnedError_pointers);
                            }
                        );
                    },
                    function (returnedError_loadChildrenIfNeeded) { /* ERROR */
                        deferred.reject(returnedError_loadChildrenIfNeeded);
                    }
                );

//@non-generated-start[deleteAgence-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name AgenceDaoSql#deleteAgenceById
             * @function
             *
             * @description
             * Deletes a Agence by id.
             *
             * @param {Integer} p_id Integer id of the Agence to process
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
             *
             * @returns {Promise} Returns a promise equal to true if the Agence was deleted, false otherwise.
             */
            AgenceDaoSql.prototype.deleteAgenceById = function (p_id, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[deleteAgenceById-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDaoSql.deleteAgenceById() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'AgenceDaoSql.deleteAgenceById() : p_cascadeSet is required and should be an array');
                console.assert(!angular.isUndefinedOrNull(p_id), 'AgenceDaoSql.deleteAgenceById() : p_id is required');

                var deferred = $qSync.defer();
                var self = this;

                self.getAgenceById(p_id, p_context, angular.copy(p_cascadeSet), p_toSync).then(
                    function (entity) {
                        deferred.resolve(self.deleteAgence(entity, p_context, angular.copy(p_cascadeSet), p_toSync));
                    },
                    function (error) {
                        deferred.reject(error);
                    }
                );


//@non-generated-start[deleteAgenceById-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name AgenceDaoSql#deleteListAgence
             * @function
             *
             * @description
             * Deletes a list of Agences.
             *
             * @param {Array<Agence>} p_entities Array containing Agences to process
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
             *
             * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of Agences was deleted, false otherwise.
             */
            AgenceDaoSql.prototype.deleteListAgence = function (p_entities, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[deleteListAgence-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDaoSql.deleteListAgence() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'AgenceDaoSql.deleteListAgence() : p_cascadeSet is required and should be an array');
                console.assert(angular.isArray(p_entities), 'AgenceDaoSql.deleteListAgence() : p_entities is required and should be an array');

                var deferred = $qSync.defer();
                var self = this;

                /* deleteListAgence() => deleteAgence() */
                var o_arrayPromisesDeleteAgence = [];
                for (var i = 0; i < p_entities.length; i++) {
                    o_arrayPromisesDeleteAgence.push(self.deleteAgence(p_entities[i], p_context, angular.copy(p_cascadeSet), p_toSync));
                }
                // $qSync.all() returns an array of the results of o_arrayPromisesDeleteAgence.
                // If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
                deferred.resolve($qSync.all(o_arrayPromisesDeleteAgence));


//@non-generated-start[deleteListAgence-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name AgenceDaoSql#deleteListAgenceByIds
             * @function
             *
             * @description
             * Deletes a list of Agences by ids.
             *
             * @param {Array<Integer>} p_ids Array containing ids of Agences to process
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
             *
             * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of Agences was deleted, false otherwise.
             */
            AgenceDaoSql.prototype.deleteListAgenceByIds = function (p_ids, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[deleteListAgenceByIds-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDaoSql.deleteListAgenceByIds() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'AgenceDaoSql.deleteListAgenceByIds() : p_cascadeSet is required and should be an array');
                console.assert(angular.isUndefinedOrNull(p_ids) || angular.isArray(p_ids), 'AgenceDaoSql.deleteListAgenceByIds() : p_ids should be an array, if given');

                var deferred = $qSync.defer();
                var self = this;

                /* deleteListAgenceByIds() => deleteListAgenceById() */
                var o_arrayPromisesDeleteAgence = [];
                for (var i = 0; i < p_ids.length; i++) {
                    o_arrayPromisesDeleteAgence.push(self.deleteAgenceById(p_ids[i], p_context, angular.copy(p_cascadeSet), p_toSync));
                }
                // $qSync.all() returns an array of the results of o_arrayPromisesDeleteAgence.
                // If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
                deferred.resolve($qSync.all(o_arrayPromisesDeleteAgence));


//@non-generated-start[deleteListAgenceByIds-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name AgenceDaoSql#deleteAgenceByDetail
             * @function
             *
             * @description
             *
             * @param {Array<Integer>} p_foreignKeys_detail
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
             *
             * @returns {Promise} Returns a promise equal to true if the Agence was deleted, false otherwise.
             */
            AgenceDaoSql.prototype.deleteAgenceByDetail = function (p_foreignKeys_detail, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[deleteAgenceByDetail-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDaoSql.deleteAgenceByDetail() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'AgenceDaoSql.deleteAgenceByDetail() : p_cascadeSet is required and should be an array');
                console.assert(!angular.isUndefinedOrNull(p_foreignKeys_detail), 'AgenceDaoSql.deleteAgenceByDetail() : p_foreignKeys_detail is required');

                var deferred = $qSync.defer();
                var self = this;

                self.getEntitiesByProperty('foreignKeys_detail', p_foreignKeys_detail, p_context).then(
                    function (entities) { /* SUCCESS */
                        deferred.resolve(self.deleteListAgence(entities, p_context, p_cascadeSet, p_toSync));
                    },
                    function (error) {
                        deferred.reject(error);
                    }
                );


//@non-generated-start[deleteAgenceByDetail-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name AgenceDaoSql#deleteAgenceByDetailid
             * @function
             *
             * @description
             *
             * @param {Array<Integer>} p_foreignKeys_detailid
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
             *
             * @returns {Promise} Returns a promise equal to true if the Agence was deleted, false otherwise.
             */
            AgenceDaoSql.prototype.deleteAgenceByDetailid = function (p_foreignKeys_detailid, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[deleteAgenceByDetailid-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDaoSql.deleteAgenceByDetailid() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'AgenceDaoSql.deleteAgenceByDetailid() : p_cascadeSet is required and should be an array');
                console.assert(!angular.isUndefinedOrNull(p_foreignKeys_detailid), 'AgenceDaoSql.deleteAgenceByDetailid() : p_foreignKeys_detailid is required');

                var deferred = $qSync.defer();
                var self = this;

                self.getEntitiesByProperty('foreignKeys_detailid', p_foreignKeys_detailid, p_context).then(
                    function (entities) { /* SUCCESS */
                        deferred.resolve(self.deleteListAgence(entities, p_context, p_cascadeSet, p_toSync));
                    },
                    function (error) {
                        deferred.reject(error);
                    }
                );


//@non-generated-start[deleteAgenceByDetailid-after][X]
//@non-generated-end

                return deferred.promise;
            };


//@non-generated-start[other-methods][X]
//@non-generated-end


            return new AgenceDaoSql();
        }]);
