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

angular.module('data-daotest-sql').factory('EmployeeDaoSql',
    ['AgenceDaoProxy', 'EmployeeDaoMapping', 'ReservationDaoProxy', 'SkillDaoProxy', 'MFSyncPromiseProvider', 'MFDaoSqlAbstract', 'MFUtils', 'MFMappingHelper',
//@non-generated-start[dependencies-names][X]
//@non-generated-end

//@non-generated-start[dependencies-classes][X]
        function (AgenceDaoProxy, EmployeeDaoMapping, ReservationDaoProxy, SkillDaoProxy, $qSync, MFDaoSqlAbstract, MFUtils, MFMappingHelper
                  //@non-generated-end
        ) {

            var EmployeeDaoSql = function EmployeeDaoSql() {
                // Constructor
//@non-generated-start[constructor][X]
                EmployeeDaoSql._Parent.call(this);
                this.lastId = null;
                this.mapping = EmployeeDaoMapping.mappingSql;
                this.syncDisabled = false;
                this.tableName = 'T_EMPLOYEE';
                this.entityName = 'Employee';
                this.cascadeDefinition = [
                    {
                        readAction: 'get', parentAttrPointingChild: 'agence',
                        childDao: AgenceDaoProxy, childAttrPointingParent: 'employees'
                    },
                    {
                        readAction: 'getList', parentAttrPointingChild: 'skills',
                        childDao: SkillDaoProxy, childAttrPointingParent: 'employees'
                    },
                    {
                        readAction: 'getList', parentAttrPointingChild: 'reservations',
                        childDao: ReservationDaoProxy, childAttrPointingParent: 'employe'
                    }
                ];

//@non-generated-end
            };

            MFUtils.extendFromInstance(EmployeeDaoSql, MFDaoSqlAbstract);


            //==================================================================================
            //========   SPECIFIC METHODS - GET
            //==================================================================================
            /**
             * @ngdoc method
             * @name EmployeeDaoSql#getEmployeeById
             * @function
             *
             * @description
             * Returns a Employee by id.
             *
             * @param {Integer} p_id Integer id of the Employee to process
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             *
             * @returns {Employee} Returns the Employee, including children if required
             */
            EmployeeDaoSql.prototype.getEmployeeById = function (p_id, p_context, p_cascadeSet) {

//@non-generated-start[getEmployeeById-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'EmployeeDaoSql.getEmployeeById() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'EmployeeDaoSql.getEmployeeById() : p_cascadeSet is required and should be an array');
                console.assert(!angular.isUndefinedOrNull(p_id), 'EmployeeDaoSql.getEmployeeById() : p_id is required');

                var deferred = $qSync.defer();
                var self = this;

                self.getEntitiesByProperty('id', p_id, p_context).then(
                    function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
                        self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
                            function (returnedSuccess_cascade) {
                                deferred.resolve(returnedSuccess_executeQueryToRead[0]);
                            },
                            function (returnedError_cascade) {
                                console.error('EmployeeDaoSql.getEmployeeById(): cascade error: ', returnedError_cascade);
                                p_context.addError('EmployeeDaoSql.getEmployeeById(): cascade error: ' + returnedError_cascade);
                                deferred.reject(returnedError_cascade);
                            }
                        );
                    },
                    function (returnedError_executeQueryToRead) { /* ERROR */
                        console.error('EmployeeDaoSql.getEmployeeById(): error: ', returnedError_executeQueryToRead);
                        p_context.addError('EmployeeDaoSql.getEmployeeById(): error: ' + returnedError_executeQueryToRead);
                        deferred.reject(returnedError_executeQueryToRead);
                    }
                );

//@non-generated-start[getEmployeeById-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name EmployeeDaoSql#getListEmployee
             * @function
             *
             * @description
             * Returns a list of Employees according to the parameter(s).
             *
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             *
             * @returns {Array<String>} Returns an Array of Employees, including children if required.
             */
            EmployeeDaoSql.prototype.getListEmployee = function (p_context, p_cascadeSet) {

//@non-generated-start[getListEmployee-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'EmployeeDaoSql.getListEmployee() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'EmployeeDaoSql.getListEmployee() : p_cascadeSet is required and should be an array');

                var deferred = $qSync.defer();
                var self = this;

                self.getEntitiesByProperty('*', [], p_context).then(
                    function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
                        self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
                            function (returnedSuccess_cascade) {
                                deferred.resolve(returnedSuccess_executeQueryToRead);
                            },
                            function (returnedError_cascade) {
                                console.error('EmployeeDaoSql.getListEmployee(): cascade error: ', returnedError_cascade);
                                p_context.addError('EmployeeDaoSql.getListEmployee(): cascade error: ' + returnedError_cascade);
                                deferred.reject(returnedError_cascade);
                            }
                        );
                    },
                    function (returnedError_executeQueryToRead) { /* ERROR */
                        console.error('EmployeeDaoSql.getListEmployee(): error: ', returnedError_executeQueryToRead);
                        p_context.addError('EmployeeDaoSql.getListEmployee(): error: ' + returnedError_executeQueryToRead);
                        deferred.reject(returnedError_executeQueryToRead);
                    }
                );

//@non-generated-start[getListEmployee-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name EmployeeDaoSql#getListEmployeeByIds
             * @function
             *
             * @description
             * Returns a list of Employees by ids.
             *
             * @param {Array<Integer>} p_ids Array containing ids of Employees to process (optional)
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             *
             * @returns {Array<String>} Returns an Array of Employees, including children if required.
             */
            EmployeeDaoSql.prototype.getListEmployeeByIds = function (p_ids, p_context, p_cascadeSet) {

//@non-generated-start[getListEmployeeByIds-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'EmployeeDaoSql.getListEmployeeByIds() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'EmployeeDaoSql.getListEmployeeByIds() : p_cascadeSet is required and should be an array');
                console.assert(angular.isUndefinedOrNull(p_ids) || angular.isArray(p_ids), 'EmployeeDaoSql.getListEmployeeByIds() : p_ids should be an array, if given');

                var deferred = $qSync.defer();
                var self = this;

                self.getEntitiesByProperty('id', p_ids, p_context).then(
                    function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
                        self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
                            function (returnedSuccess_cascade) {
                                deferred.resolve(returnedSuccess_executeQueryToRead);
                            },
                            function (returnedError_cascade) {
                                console.error('EmployeeDaoSql.getListEmployeeByIds(): cascade error: ', returnedError_cascade);
                                p_context.addError('EmployeeDaoSql.getListEmployeeByIds(): cascade error: ' + returnedError_cascade);
                                deferred.reject(returnedError_cascade);
                            }
                        );
                    },
                    function (returnedError_executeQueryToRead) { /* ERROR */
                        console.error('EmployeeDaoSql.getListEmployeeByIds(): error: ', returnedError_executeQueryToRead);
                        p_context.addError('EmployeeDaoSql.getListEmployeeByIds(): error: ' + returnedError_executeQueryToRead);
                        deferred.reject(returnedError_executeQueryToRead);
                    }
                );

//@non-generated-start[getListEmployeeByIds-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name EmployeeDaoSql#getListEmployeeBySkills
             * @function
             *
             * @description
             * Returns a list of Employees according to the parameter(s).
             *
             * @param {Array<Integer>} p_foreignKeys_skill
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             *
             * @returns {Array<String>} Returns an Array of Employees, including children if required.
             */
            EmployeeDaoSql.prototype.getListEmployeeBySkills = function (p_foreignKeys_skill, p_context, p_cascadeSet) {

//@non-generated-start[getListEmployeeBySkills-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'EmployeeDaoSql.getListEmployeeBySkills() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'EmployeeDaoSql.getListEmployeeBySkills() : p_cascadeSet is required and should be an array');
                console.assert(!angular.isUndefinedOrNull(p_foreignKeys_skill), 'EmployeeDaoSql.getListEmployeeBySkills() : p_foreignKeys_skill is required');

                var deferred = $qSync.defer();
                var self = this;

                var o_sqlQuery = 'select * from T_EMPLOYEE inner join T_EMPLSKILL on T_EMPLOYEE.ID = T_EMPLSKILL.EMPLOYEEID where T_EMPLSKILL.SKILLID in (' + self.produceQueryInPart(p_foreignKeys_skill.idToString) + ');';
                var o_sqlParameters = [].concat(p_foreignKeys_skill.idToString);

                self.executeQueryToRead(
                    'EmployeeDaoSql.getListEmployeeBySkills()', p_context, o_sqlQuery, o_sqlParameters).then(
                    function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
                        self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
                            function (returnedSuccess_cascade) {
                                deferred.resolve(returnedSuccess_executeQueryToRead);
                            },
                            function (returnedError_cascade) {
                                console.error('EmployeeDaoSql.getListEmployeeBySkills(): cascade error: ', returnedError_cascade);
                                p_context.addError('EmployeeDaoSql.getListEmployeeBySkills(): cascade error: ' + returnedError_cascade);
                                deferred.reject(returnedError_cascade);
                            }
                        );
                    },
                    function (returnedError_executeQueryToRead) { /* ERROR */
                        console.error('EmployeeDaoSql.getListEmployeeBySkills(): error: ', returnedError_executeQueryToRead);
                        p_context.addError('EmployeeDaoSql.getListEmployeeBySkills(): error: ' + returnedError_executeQueryToRead);
                        deferred.reject(returnedError_executeQueryToRead);
                    }
                );

//@non-generated-start[getListEmployeeBySkills-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name EmployeeDaoSql#getListEmployeeBySkillskillId
             * @function
             *
             * @description
             * Returns a list of Employees according to the parameter(s).
             *
             * @param {Array<Integer>} p_foreignKeys_skillskillId
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             *
             * @returns {Array<String>} Returns an Array of Employees, including children if required.
             */
            EmployeeDaoSql.prototype.getListEmployeeBySkillskillId = function (p_foreignKeys_skillskillId, p_context, p_cascadeSet) {

//@non-generated-start[getListEmployeeBySkillskillId-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'EmployeeDaoSql.getListEmployeeBySkillskillId() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'EmployeeDaoSql.getListEmployeeBySkillskillId() : p_cascadeSet is required and should be an array');
                console.assert(!angular.isUndefinedOrNull(p_foreignKeys_skillskillId), 'EmployeeDaoSql.getListEmployeeBySkillskillId() : p_foreignKeys_skillskillId is required');

                var deferred = $qSync.defer();
                var self = this;

                var o_sqlQuery = 'select * from T_EMPLOYEE inner join T_EMPLSKILL on T_EMPLOYEE.ID = T_EMPLSKILL.EMPLOYEEID where T_EMPLSKILL.SKILLID in (' + self.produceQueryInPart(p_foreignKeys_skillskillId) + ');';
                var o_sqlParameters = [].concat(p_foreignKeys_skillskillId);

                self.executeQueryToRead(
                    'EmployeeDaoSql.getListEmployeeBySkillskillId()', p_context, o_sqlQuery, o_sqlParameters).then(
                    function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
                        self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
                            function (returnedSuccess_cascade) {
                                deferred.resolve(returnedSuccess_executeQueryToRead);
                            },
                            function (returnedError_cascade) {
                                console.error('EmployeeDaoSql.getListEmployeeBySkillskillId(): cascade error: ', returnedError_cascade);
                                p_context.addError('EmployeeDaoSql.getListEmployeeBySkillskillId(): cascade error: ' + returnedError_cascade);
                                deferred.reject(returnedError_cascade);
                            }
                        );
                    },
                    function (returnedError_executeQueryToRead) { /* ERROR */
                        console.error('EmployeeDaoSql.getListEmployeeBySkillskillId(): error: ', returnedError_executeQueryToRead);
                        p_context.addError('EmployeeDaoSql.getListEmployeeBySkillskillId(): error: ' + returnedError_executeQueryToRead);
                        deferred.reject(returnedError_executeQueryToRead);
                    }
                );

//@non-generated-start[getListEmployeeBySkillskillId-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name EmployeeDaoSql#getListEmployeeByAgence
             * @function
             *
             * @description
             * Returns a list of Employees according to the parameter(s).
             *
             * @param {Array<Integer>} p_foreignKeys_agence
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             *
             * @returns {Array<String>} Returns an Array of Employees, including children if required.
             */
            EmployeeDaoSql.prototype.getListEmployeeByAgence = function (p_foreignKeys_agence, p_context, p_cascadeSet) {

//@non-generated-start[getListEmployeeByAgence-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'EmployeeDaoSql.getListEmployeeByAgence() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'EmployeeDaoSql.getListEmployeeByAgence() : p_cascadeSet is required and should be an array');
                console.assert(!angular.isUndefinedOrNull(p_foreignKeys_agence), 'EmployeeDaoSql.getListEmployeeByAgence() : p_foreignKeys_agence is required');

                var deferred = $qSync.defer();
                var self = this;

                var o_sqlQuery = 'select * from T_EMPLOYEE where AGENCEID1 in (' + self.produceQueryInPart(p_foreignKeys_agence.idToString) + ');';
                var o_sqlParameters = [].concat(p_foreignKeys_agence.idToString);

                self.executeQueryToRead(
                    'EmployeeDaoSql.getListEmployeeByAgence()', p_context, o_sqlQuery, o_sqlParameters).then(
                    function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
                        self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
                            function (returnedSuccess_cascade) {
                                deferred.resolve(returnedSuccess_executeQueryToRead);
                            },
                            function (returnedError_cascade) {
                                console.error('EmployeeDaoSql.getListEmployeeByAgence(): cascade error: ', returnedError_cascade);
                                p_context.addError('EmployeeDaoSql.getListEmployeeByAgence(): cascade error: ' + returnedError_cascade);
                                deferred.reject(returnedError_cascade);
                            }
                        );
                    },
                    function (returnedError_executeQueryToRead) { /* ERROR */
                        console.error('EmployeeDaoSql.getListEmployeeByAgence(): error: ', returnedError_executeQueryToRead);
                        p_context.addError('EmployeeDaoSql.getListEmployeeByAgence(): error: ' + returnedError_executeQueryToRead);
                        deferred.reject(returnedError_executeQueryToRead);
                    }
                );

//@non-generated-start[getListEmployeeByAgence-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name EmployeeDaoSql#getListEmployeeByAgenceid
             * @function
             *
             * @description
             * Returns a list of Employees according to the parameter(s).
             *
             * @param {Array<Integer>} p_foreignKeys_agenceid
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             *
             * @returns {Array<String>} Returns an Array of Employees, including children if required.
             */
            EmployeeDaoSql.prototype.getListEmployeeByAgenceid = function (p_foreignKeys_agenceid, p_context, p_cascadeSet) {

//@non-generated-start[getListEmployeeByAgenceid-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'EmployeeDaoSql.getListEmployeeByAgenceid() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'EmployeeDaoSql.getListEmployeeByAgenceid() : p_cascadeSet is required and should be an array');
                console.assert(!angular.isUndefinedOrNull(p_foreignKeys_agenceid), 'EmployeeDaoSql.getListEmployeeByAgenceid() : p_foreignKeys_agenceid is required');

                var deferred = $qSync.defer();
                var self = this;

                var o_sqlQuery = 'select * from T_EMPLOYEE where AGENCEID1 in (' + self.produceQueryInPart(p_foreignKeys_agenceid) + ');';
                var o_sqlParameters = [].concat(p_foreignKeys_agenceid);

                self.executeQueryToRead(
                    'EmployeeDaoSql.getListEmployeeByAgenceid()', p_context, o_sqlQuery, o_sqlParameters).then(
                    function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
                        self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
                            function (returnedSuccess_cascade) {
                                deferred.resolve(returnedSuccess_executeQueryToRead);
                            },
                            function (returnedError_cascade) {
                                console.error('EmployeeDaoSql.getListEmployeeByAgenceid(): cascade error: ', returnedError_cascade);
                                p_context.addError('EmployeeDaoSql.getListEmployeeByAgenceid(): cascade error: ' + returnedError_cascade);
                                deferred.reject(returnedError_cascade);
                            }
                        );
                    },
                    function (returnedError_executeQueryToRead) { /* ERROR */
                        console.error('EmployeeDaoSql.getListEmployeeByAgenceid(): error: ', returnedError_executeQueryToRead);
                        p_context.addError('EmployeeDaoSql.getListEmployeeByAgenceid(): error: ' + returnedError_executeQueryToRead);
                        deferred.reject(returnedError_executeQueryToRead);
                    }
                );

//@non-generated-start[getListEmployeeByAgenceid-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name EmployeeDaoSql#getListEmployeeBySkillsids
             * @function
             *
             * @description
             * Returns a list of Employees according to the parameter(s).
             *
             * @param {Array<Integer>} p_foreignKeys_skillids
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             *
             * @returns {Array<String>} Returns an Array of Employees, including children if required.
             */
            EmployeeDaoSql.prototype.getListEmployeeBySkillsids = function (p_foreignKeys_skillids, p_context, p_cascadeSet) {

//@non-generated-start[getListEmployeeBySkillsids-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'EmployeeDaoSql.getListEmployeeBySkillsids() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'EmployeeDaoSql.getListEmployeeBySkillsids() : p_cascadeSet is required and should be an array');
                console.assert(!angular.isUndefinedOrNull(p_foreignKeys_skillids), 'EmployeeDaoSql.getListEmployeeBySkillsids() : p_foreignKeys_skillids is required');

                var deferred = $qSync.defer();
                var self = this;

                var o_sqlQuery = 'select * from T_EMPLOYEE inner join T_EMPLSKILL on T_EMPLOYEE.ID = T_EMPLSKILL.EMPLOYEEID where T_EMPLSKILL.SKILLID in (' + self.produceQueryInPart(p_foreignKeys_skillids) + ');';
                var o_sqlParameters = [].concat(p_foreignKeys_skillids);

                self.executeQueryToRead(
                    'EmployeeDaoSql.getListEmployeeBySkillsids()', p_context, o_sqlQuery, o_sqlParameters).then(
                    function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
                        self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
                            function (returnedSuccess_cascade) {
                                deferred.resolve(returnedSuccess_executeQueryToRead);
                            },
                            function (returnedError_cascade) {
                                console.error('EmployeeDaoSql.getListEmployeeBySkillsids(): cascade error: ', returnedError_cascade);
                                p_context.addError('EmployeeDaoSql.getListEmployeeBySkillsids(): cascade error: ' + returnedError_cascade);
                                deferred.reject(returnedError_cascade);
                            }
                        );
                    },
                    function (returnedError_executeQueryToRead) { /* ERROR */
                        console.error('EmployeeDaoSql.getListEmployeeBySkillsids(): error: ', returnedError_executeQueryToRead);
                        p_context.addError('EmployeeDaoSql.getListEmployeeBySkillsids(): error: ' + returnedError_executeQueryToRead);
                        deferred.reject(returnedError_executeQueryToRead);
                    }
                );

//@non-generated-start[getListEmployeeBySkillsids-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name EmployeeDaoSql#getListEmployeeByAgenceids
             * @function
             *
             * @description
             * Returns a list of Employees according to the parameter(s).
             *
             * @param {Array<Integer>} p_foreignKeys_agenceids
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             *
             * @returns {Array<String>} Returns an Array of Employees, including children if required.
             */
            EmployeeDaoSql.prototype.getListEmployeeByAgenceids = function (p_foreignKeys_agenceids, p_context, p_cascadeSet) {

//@non-generated-start[getListEmployeeByAgenceids-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'EmployeeDaoSql.getListEmployeeByAgenceids() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'EmployeeDaoSql.getListEmployeeByAgenceids() : p_cascadeSet is required and should be an array');
                console.assert(!angular.isUndefinedOrNull(p_foreignKeys_agenceids), 'EmployeeDaoSql.getListEmployeeByAgenceids() : p_foreignKeys_agenceids is required');

                var deferred = $qSync.defer();
                var self = this;

                var o_sqlQuery = 'select * from T_EMPLOYEE where AGENCEID1 in (' + self.produceQueryInPart(p_foreignKeys_agenceids) + ');';
                var o_sqlParameters = [].concat(p_foreignKeys_agenceids);

                self.executeQueryToRead(
                    'EmployeeDaoSql.getListEmployeeByAgenceids()', p_context, o_sqlQuery, o_sqlParameters).then(
                    function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
                        self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
                            function (returnedSuccess_cascade) {
                                deferred.resolve(returnedSuccess_executeQueryToRead);
                            },
                            function (returnedError_cascade) {
                                console.error('EmployeeDaoSql.getListEmployeeByAgenceids(): cascade error: ', returnedError_cascade);
                                p_context.addError('EmployeeDaoSql.getListEmployeeByAgenceids(): cascade error: ' + returnedError_cascade);
                                deferred.reject(returnedError_cascade);
                            }
                        );
                    },
                    function (returnedError_executeQueryToRead) { /* ERROR */
                        console.error('EmployeeDaoSql.getListEmployeeByAgenceids(): error: ', returnedError_executeQueryToRead);
                        p_context.addError('EmployeeDaoSql.getListEmployeeByAgenceids(): error: ' + returnedError_executeQueryToRead);
                        deferred.reject(returnedError_executeQueryToRead);
                    }
                );

//@non-generated-start[getListEmployeeByAgenceids-after][X]
//@non-generated-end

                return deferred.promise;
            };


            //==================================================================================
            //========   SPECIFIC METHODS - SAVE
            //==================================================================================
            /**
             * @ngdoc method
             * @name EmployeeDaoSql#saveEmployee
             * @function
             *
             * @description
             * Saves a Employee.
             *
             * @param {Employee} p_entity Employee to process
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
             *
             * @returns {Promise} Returns a promise equal to true if the Employee was saved, false otherwise.
             */
            EmployeeDaoSql.prototype.saveEmployee = function (p_entity, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[saveEmployee-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'EmployeeDaoSql.saveEmployee() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'EmployeeDaoSql.saveEmployee() : p_cascadeSet is required and should be an array');
                console.assert(!angular.isUndefinedOrNull(p_entity), 'EmployeeDaoSql.saveEmployee() : p_entity is required');

                var deferred = $qSync.defer();
                var self = this;

                self.fixDoubleWaysRelationship(p_entity);
                // --------------------------
                // 1. save or update children pointed by the parent : for relationships xxx_to_one
                // --------------------------
                var savePointedChildren = [];

                //		1.1  call saveOrUpdate function of the child dao
                //		1.2  check that the ID attribute of the children model entities is updated (update foreign key of the parent pointing the child just saved)
                /*jshint loopfunc: true */
                /* jshint shadow:true */
                for (var i = 0, cascadeSetLength = p_cascadeSet.length; i < cascadeSetLength; i += 1) {
                    if (p_cascadeSet[i].entityName === p_entity._type) {
                        if (p_cascadeSet[i].key === 'AGENCE') {
                            savePointedChildren.push(AgenceDaoProxy.saveOrUpdateAgence(p_entity.agence, p_context, p_cascadeSet, p_toSync));
                        }
                    }
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

                                /*jshint loopfunc: true */
                                /* jshint shadow:true */
                                for (var i = 0, cascadeSetLength = p_cascadeSet.length; i < cascadeSetLength; i += 1) {
                                    if (p_cascadeSet[i].entityName === p_entity._type) {
                                        if (p_cascadeSet[i].key === 'RESERVATIONS') {
                                            saveOtherChildren.push(ReservationDaoProxy.saveOrUpdateListReservation(p_entity.reservations, p_context, p_cascadeSet, p_toSync));
                                        }
                                    }
                                }

                                // --------------------------
                                // 4. save association records: for relationships many_to_many
                                // --------------------------
                                // foreach child attr
                                // 		4.1 define SQL query
                                // 		4.2 get next ID of this association table
                                // 		4.3 define SQL parameters
                                // 		4.4 execute query
                                // TODO write an example


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


//@non-generated-start[saveEmployee-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name EmployeeDaoSql#saveListEmployee
             * @function
             *
             * @description
             * Saves a list of Employees.
             *
             * @param {Array<Employee>} p_entities Array containing Employees to process
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
             *
             * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of Employees was saved, false otherwise.
             */
            EmployeeDaoSql.prototype.saveListEmployee = function (p_entities, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[saveListEmployee-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'EmployeeDaoSql.saveListEmployee() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'EmployeeDaoSql.saveListEmployee() : p_cascadeSet is required and should be an array');
                console.assert(angular.isArray(p_entities), 'EmployeeDaoSql.saveListEmployee() : p_entities is required and should be an array');

                var deferred = $qSync.defer();
                var self = this;

                /* saveListEmployee() => saveEmployee() */
                var o_arrayPromisesSaveEmployee = [];
                for (var i = 0; i < p_entities.length; i++) {
                    o_arrayPromisesSaveEmployee.push(self.saveEmployee(p_entities[i], p_context, angular.copy(p_cascadeSet), p_toSync));
                }
                // $qSync.all() returns an array of the results of o_arrayPromisesSaveEmployee.
                // If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
                deferred.resolve($qSync.all(o_arrayPromisesSaveEmployee));


//@non-generated-start[saveListEmployee-after][X]
//@non-generated-end

                return deferred.promise;
            };


            //==================================================================================
            //========   SPECIFIC METHODS - UPDATE
            //==================================================================================
            /**
             * @ngdoc method
             * @name EmployeeDaoSql#updateEmployee
             * @function
             *
             * @description
             * Updates a Employee.
             *
             * @param {Employee} p_entity Employee to process
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
             * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
             *
             * @returns {Promise} Returns a promise equal to true if the Employee was updated, false otherwise.
             */
            EmployeeDaoSql.prototype.updateEmployee = function (p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

//@non-generated-start[updateEmployee-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'EmployeeDaoSql.updateEmployee() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'EmployeeDaoSql.updateEmployee() : p_cascadeSet is required and should be an array');
                console.assert(!angular.isUndefinedOrNull(p_entity), 'EmployeeDaoSql.updateEmployee() : p_entity is required');

                var deferred = $qSync.defer();
                var self = this;

                var childrenPromises = [];

                self.fixDoubleWaysRelationship(p_entity);
                // for composition relationships one_to_xxx
                /*jshint loopfunc: true */
                /* jshint shadow:true */
                for (var i = 0, cascadeSetLength = p_cascadeSet.length; i < cascadeSetLength; i += 1) {
                    if (p_cascadeSet[i].entityName === p_entity._type) {

                        if (p_cascadeSet[i].key === 'RESERVATIONS') {

                            // 1. delete the children that are not in p_entity if composition relationship one_to_xxx (delete from CHILD where PARENTID=xxx and CHILDID not in(xxx, xxx)
                            childrenPromises.push(
                                self.getChildrenIdsToRemove(p_context, p_entity, 'reservations').then(
                                    function (idsToRemove) {
                                        console.log('children to remove found', idsToRemove);
                                        return ReservationDaoProxy.deleteListReservationByIds(idsToRemove, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
                                    },
                                    function (error) {
                                        deferred.reject(error);
                                    }
                                )
                            );

                            // 2. save or update the remaining children if composition relationship one_to_xxx
                            childrenPromises.push(ReservationDaoProxy.saveOrUpdateListReservation(p_entity.reservations, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete));
                        }
                    }
                }


                // 2. save or update all the other children (no matter the type of relationship), if asked by p_cascadeset
                /*jshint loopfunc: true */
                /* jshint shadow:true */
                for (var i = 0, cascadeSetLength = p_cascadeSet.length; i < cascadeSetLength; i += 1) {
                    if (p_cascadeSet[i].entityName === p_entity._type) {
                        if (p_cascadeSet[i].key === 'SKILLS') {
                            childrenPromises.push(SkillDaoProxy.saveOrUpdateListSkill(p_entity.skills, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete));
                            continue;
                        }
                        if (p_cascadeSet[i].key === 'AGENCE') {
                            childrenPromises.push(AgenceDaoProxy.saveOrUpdateAgence(p_entity.agence, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete));
                            continue;
                        }
                    }
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


//@non-generated-start[updateEmployee-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name EmployeeDaoSql#updateListEmployee
             * @function
             *
             * @description
             * Updates a list of Employees.
             *
             * @param {Array<Employee>} p_entities Array containing Employees to process
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
             * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
             *
             * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of Employees was updated, false otherwise.
             */
            EmployeeDaoSql.prototype.updateListEmployee = function (p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

//@non-generated-start[updateListEmployee-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'EmployeeDaoSql.updateListEmployee() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'EmployeeDaoSql.updateListEmployee() : p_cascadeSet is required and should be an array');
                console.assert(angular.isArray(p_entities), 'EmployeeDaoSql.updateListEmployee() : p_entities is required and should be an array');

                var deferred = $qSync.defer();
                var self = this;

                /* updateListEmployee() => updateEmployee() */
                var o_arrayPromisesUpdateEmployee = [];
                for (var i = 0; i < p_entities.length; i++) {
                    o_arrayPromisesUpdateEmployee.push(self.updateEmployee(p_entities[i], p_context, angular.copy(p_cascadeSet), p_toSync, angular.copy(p_cascadeSetForDelete)));
                }
                // $qSync.all() returns an array of the results of o_arrayPromisesUpdateEmployee.
                // If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
                deferred.resolve($qSync.all(o_arrayPromisesUpdateEmployee));


//@non-generated-start[updateListEmployee-after][X]
//@non-generated-end

                return deferred.promise;
            };


            //==================================================================================
            //========   SPECIFIC METHODS - SAVE & UPDATE
            //==================================================================================
            /**
             * @ngdoc method
             * @name EmployeeDaoSql#saveOrUpdateEmployee
             * @function
             *
             * @description
             * Saves of updates a Employee.
             *
             * @param {Employee} p_entity Employee to process
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
             * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
             *
             * @returns {Promise} Returns a promise equal to true if the Employee was saved or updated, false otherwise.
             */
            EmployeeDaoSql.prototype.saveOrUpdateEmployee = function (p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

//@non-generated-start[saveOrUpdateEmployee-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'EmployeeDaoSql.saveOrUpdateEmployee() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'EmployeeDaoSql.saveOrUpdateEmployee() : p_cascadeSet is required and should be an array');
                console.assert(!angular.isUndefinedOrNull(p_entity), 'EmployeeDaoSql.saveOrUpdateEmployee() : p_entity is required');

                var deferred = $qSync.defer();
                var self = this;

                if (p_entity.idToString !== -1) {
                    this.exist(p_entity, p_context).then(function (result) {
                            if (result) {
                                /* updateEmployee */
                                console.log('EmployeeDaoSql.saveOrUpdateEmployee(): entity exists  => updateEmployee()');
                                deferred.resolve(self.updateEmployee(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete));
                            } else {
                                /* saveEmployee */
                                console.log('EmployeeDaoSql.saveOrUpdateEmployee(): entity does not exist  => saveEmployee()');
                                deferred.resolve(self.saveEmployee(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete)); // last parameter ignored by called method
                            }
                        },
                        function (error) {
                            deferred.reject(error);
                        });
                } else {
                    /* saveEmployee */
                    console.log('EmployeeDaoSql.saveOrUpdateEmployee(): entity does not exist  => saveEmployee()');
                    deferred.resolve(self.saveEmployee(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete)); // last parameter ignored by called method
                }


//@non-generated-start[saveOrUpdateEmployee-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name EmployeeDaoSql#saveOrUpdateListEmployee
             * @function
             *
             * @description
             * Saves of updates a list of Employees.
             *
             * @param {Array<Employee>} p_entities Array containing Employees to process
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
             * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
             *
             * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of Employees was saved or updated, false otherwise.
             */
            EmployeeDaoSql.prototype.saveOrUpdateListEmployee = function (p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

//@non-generated-start[saveOrUpdateListEmployee-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'EmployeeDaoSql.saveOrUpdateListEmployee() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'EmployeeDaoSql.saveOrUpdateListEmployee() : p_cascadeSet is required and should be an array');
                console.assert(angular.isArray(p_entities), 'EmployeeDaoSql.saveOrUpdateListEmployee() : p_entities is required and should be an array');

                var deferred = $qSync.defer();
                var self = this;

                /* saveOrUpdateListEmployee() => saveOrUpdateEmployee() */
                var o_arrayPromisesSaveOrUpdateEmployee = [];
                for (var i = 0; i < p_entities.length; i++) {
                    o_arrayPromisesSaveOrUpdateEmployee.push(self.saveOrUpdateEmployee(p_entities[i], p_context, angular.copy(p_cascadeSet), p_toSync, angular.copy(p_cascadeSetForDelete)));
                }
                // $qSync.all() returns an array of the results of o_arrayPromisesSaveOrUpdateEmployee.
                // If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
                deferred.resolve($qSync.all(o_arrayPromisesSaveOrUpdateEmployee));


//@non-generated-start[saveOrUpdateListEmployee-after][X]
//@non-generated-end

                return deferred.promise;
            };


            //==================================================================================
            //========   SPECIFIC METHODS - DELETE
            //==================================================================================
            /**
             * @ngdoc method
             * @name EmployeeDaoSql#deleteEmployee
             * @function
             *
             * @description
             * Delete a Employee.
             *
             * @param {Employee} p_entity Employee to process
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
             *
             * @returns {Promise} Returns a promise equal to true if the Employee was deleted, false otherwise.
             */
            EmployeeDaoSql.prototype.deleteEmployee = function (p_entity, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[deleteEmployee-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'EmployeeDaoSql.deleteEmployee() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'EmployeeDaoSql.deleteEmployee() : p_cascadeSet is required and should be an array');
                console.assert(!angular.isUndefinedOrNull(p_entity), 'EmployeeDaoSql.deleteEmployee() : p_entity is required');

                var deferred = $qSync.defer();
                var self = this;

                //0. load children that should always be deleted or updated
                self.loadChildrenIfNeeded(p_context, p_entity, p_cascadeSet).then(
                    function (returnedSuccess_loadChildrenIfNeeded) {
                        var pointersDeletes = [];

                        // 1. delete association records : for relationships many_to_many
                        var o_sqlQuery = 'delete from T_EMPLSKILL' +
                            ' inner join T_EMPLSKILL on ' +
                            ' T_EMPLOYEE.ID = T_EMPLSKILL.EMPLOYEEID' +
                            ' where ' +
                            '		T_EMPLOYEE.EMPLOYEEID = ?;';
                        var o_sqlParameters = [].concat(p_entity.idToString);
                        pointersDeletes.push(self.executeQueryToWrite(
                            'EmployeeDaoSql.deleteEmployee()', p_context, o_sqlQuery, o_sqlParameters));


                        $qSync.all(pointersDeletes).then(
                            function (returnedSuccess_pointers) { /* SUCCESS */

                                // 4. delete the parent
                                self.deleteEntity(p_entity, p_context, p_toSync).then(
                                    function (returnedSuccess_executeQueryToDelete) { /* SUCCESS */
                                        pointersDeletes = [];

                                        //5. for composition and aggregation relationships xxx_to_one
                                        /*jshint loopfunc: true */
                                        /* jshint shadow:true */
                                        for (var i = 0, cascadeSetLength = p_cascadeSet.length; i < cascadeSetLength; i += 1) {
                                            if (p_cascadeSet[i].entityName === p_entity._type) {
                                                if (p_cascadeSet[i].key === 'AGENCE') {
                                                    pointersDeletes.push(AgenceDaoProxy.deleteAgence(p_entity.agence, p_context, p_cascadeSet, p_toSync));
                                                }
                                            }
                                        }

                                        $qSync.all(pointersDeletes).then(
                                            function (returnedSuccess_executeQuery2ToDelete) { /* SUCCESS */
                                                deferred.resolve(returnedSuccess_executeQuery2ToDelete);
                                            },
                                            function (returnedError_executeQuery2ToDelete) { /* ERROR */
                                                console.error('EmployeeDaoSql.deleteEmployee(): error: ', returnedError_executeQuery2ToDelete);
                                                p_context.addError('EmployeeDaoSql.deleteEmployee(): error: ' + returnedError_executeQuery2ToDelete);
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

//@non-generated-start[deleteEmployee-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name EmployeeDaoSql#deleteEmployeeById
             * @function
             *
             * @description
             * Deletes a Employee by id.
             *
             * @param {Integer} p_id Integer id of the Employee to process
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
             *
             * @returns {Promise} Returns a promise equal to true if the Employee was deleted, false otherwise.
             */
            EmployeeDaoSql.prototype.deleteEmployeeById = function (p_id, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[deleteEmployeeById-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'EmployeeDaoSql.deleteEmployeeById() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'EmployeeDaoSql.deleteEmployeeById() : p_cascadeSet is required and should be an array');
                console.assert(!angular.isUndefinedOrNull(p_id), 'EmployeeDaoSql.deleteEmployeeById() : p_id is required');

                var deferred = $qSync.defer();
                var self = this;

                self.getEmployeeById(p_id, p_context, angular.copy(p_cascadeSet), p_toSync).then(
                    function (entity) {
                        deferred.resolve(self.deleteEmployee(entity, p_context, angular.copy(p_cascadeSet), p_toSync));
                    },
                    function (error) {
                        deferred.reject(error);
                    }
                );


//@non-generated-start[deleteEmployeeById-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name EmployeeDaoSql#deleteListEmployee
             * @function
             *
             * @description
             * Deletes a list of Employees.
             *
             * @param {Array<Employee>} p_entities Array containing Employees to process
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
             *
             * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of Employees was deleted, false otherwise.
             */
            EmployeeDaoSql.prototype.deleteListEmployee = function (p_entities, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[deleteListEmployee-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'EmployeeDaoSql.deleteListEmployee() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'EmployeeDaoSql.deleteListEmployee() : p_cascadeSet is required and should be an array');
                console.assert(angular.isArray(p_entities), 'EmployeeDaoSql.deleteListEmployee() : p_entities is required and should be an array');

                var deferred = $qSync.defer();
                var self = this;

                /* deleteListEmployee() => deleteEmployee() */
                var o_arrayPromisesDeleteEmployee = [];
                for (var i = 0; i < p_entities.length; i++) {
                    o_arrayPromisesDeleteEmployee.push(self.deleteEmployee(p_entities[i], p_context, angular.copy(p_cascadeSet), p_toSync));
                }
                // $qSync.all() returns an array of the results of o_arrayPromisesDeleteEmployee.
                // If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
                deferred.resolve($qSync.all(o_arrayPromisesDeleteEmployee));


//@non-generated-start[deleteListEmployee-after][X]
//@non-generated-end

                return deferred.promise;
            };


            /**
             * @ngdoc method
             * @name EmployeeDaoSql#deleteListEmployeeByIds
             * @function
             *
             * @description
             * Deletes a list of Employees by ids.
             *
             * @param {Array<Integer>} p_ids Array containing ids of Employees to process
             * @param {MFContext} p_context MFContext object
             * @param {Array<String>} p_cascadeSet Array containing children tables names to process
             * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
             *
             * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of Employees was deleted, false otherwise.
             */
            EmployeeDaoSql.prototype.deleteListEmployeeByIds = function (p_ids, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[deleteListEmployeeByIds-before][X]
//@non-generated-end

                console.assert(!angular.isUndefinedOrNull(p_context), 'EmployeeDaoSql.deleteListEmployeeByIds() : p_context is required ');
                console.assert(angular.isArray(p_cascadeSet), 'EmployeeDaoSql.deleteListEmployeeByIds() : p_cascadeSet is required and should be an array');
                console.assert(angular.isUndefinedOrNull(p_ids) || angular.isArray(p_ids), 'EmployeeDaoSql.deleteListEmployeeByIds() : p_ids should be an array, if given');

                var deferred = $qSync.defer();
                var self = this;

                /* deleteListEmployeeByIds() => deleteListEmployeeById() */
                var o_arrayPromisesDeleteEmployee = [];
                for (var i = 0; i < p_ids.length; i++) {
                    o_arrayPromisesDeleteEmployee.push(self.deleteEmployeeById(p_ids[i], p_context, angular.copy(p_cascadeSet), p_toSync));
                }
                // $qSync.all() returns an array of the results of o_arrayPromisesDeleteEmployee.
                // If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
                deferred.resolve($qSync.all(o_arrayPromisesDeleteEmployee));


//@non-generated-start[deleteListEmployeeByIds-after][X]
//@non-generated-end

                return deferred.promise;
            };


//@non-generated-start[other-methods][X]
//@non-generated-end


            return new EmployeeDaoSql();
        }]);
