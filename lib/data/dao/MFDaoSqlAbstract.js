'use strict';

// returns an instance of DAO
angular.module('mfcore').factory('MFDaoSqlAbstract', ['MFSyncPromiseProvider', 'MFDalSqlProxy', 'MFMappingHelper', 'MFDaoException', '$injector', 'MFUtils', 'MFDataModelCache',
    function ($qSync, MFDalSqlProxy, MFMappingHelper, MFDaoException, $injector, MFUtils, MFDataModelCache) {
        var MFDaoSqlAbstract = function MFDaoSqlAbstract() {
        };


        Object.defineProperty(MFDaoSqlAbstract.prototype, 'lastId', {
            value: null,
            writable: true,
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(MFDaoSqlAbstract.prototype, 'mapping', {
            value: null,
            writable: true,
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(MFDaoSqlAbstract.prototype, 'syncDisabled', {
            value: null,
            writable: true,
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(MFDaoSqlAbstract.prototype, 'tableName', {
            value: null,
            writable: true,
            enumerable: false,
            configurable: false
        });
        Object.defineProperty(MFDaoSqlAbstract.prototype, 'entityName', {
            value: null,
            writable: true,
            enumerable: false,
            configurable: false
        });
        Object.defineProperty(MFDaoSqlAbstract.prototype, 'cascadeDefinition', {
            value: null,
            writable: true,
            enumerable: false,
            configurable: false
        });

        /**
         * @ngdoc method
         * @name MFDaoSqlAbstract#getNextId
         * @function
         *
         * @description
         * Modifies the lastId value and returns the next id for inserting a entity.
         *
         * @param {MFContext} p_context MFContext object
         * @returns {Integer} Returns an Integer equal to the next id
         */
        MFDaoSqlAbstract.prototype.getNextId = function (p_MFContext) {
            var deferred = $qSync.defer();
            var self = this;

            console.assert(!angular.isUndefinedOrNullOrEmpty(this.tableName), 'this.tableName should be defined');

            /* if lastId === null,
             lastId = MIN-1 if entities already exists
             or lastId = -2 for first entity insert */
            if (angular.isUndefinedOrNull(self.lastId)) {
                var o_sqlQuery = 'select min(' + MFMappingHelper.getRightIdAttribute(this.mapping) + ') as M from ' + self.tableName + ';';

                MFDalSqlProxy.executeQuery(p_MFContext, o_sqlQuery, []).then(
                    function (returnedSuccess) { /* SUCCESS */
                        if (angular.isUndefinedOrNull(self.lastId)) {
                            if (returnedSuccess.rows.length > 0) {
                                var returnedMinId = returnedSuccess.rows.item(0).M;
                                console.info('MFDaoSqlAbstract.getNextId(): success: M=' + returnedMinId);

                                if (returnedMinId < 0) {
                                    self.lastId = returnedMinId;
                                } /* permits lastId = MIN-1 */
                                else {
                                    self.lastId = -1;
                                }
                                /* permits lastId = -2    */
                            }
                            else {
                                self.lastId = -1;
                            }
                        }

                        self.lastId--;
                        console.info('MFDaoSqlAbstract.getNextId(): ' + (self.lastId));
                        deferred.resolve(self.lastId);
                    },

                    function (returnedError) { /* ERROR */
                        console.error('MFDaoSqlAbstract.getNextId(): error: ', returnedError);
                        p_MFContext.addError(returnedError);
                        deferred.reject('MFDaoSqlAbstract.getNextId(): error: ' + returnedError);
                    }
                );

                /* else lastId = lastId-1 */
            } else {
                self.lastId--;
                console.info('MFDaoSqlAbstract.getNextId(): ' + (self.lastId));
                deferred.resolve(self.lastId);
            }


            return deferred.promise;
        };


        /**
         * @ngdoc method
         * @name MFDaoSqlAbstract#getNbEntities
         * @function
         *
         * @description
         * Returns the number of entites.
         *
         * @param {MFContext} p_context MFContext object
         * @returns {Integer} Returns an Integer equal to the number of entities
         */
        MFDaoSqlAbstract.prototype.getNbEntities = function (p_MFContext) {

            console.assert(!angular.isUndefinedOrNullOrEmpty(this.tableName), 'this.tableName should be defined');

            var deferred = $qSync.defer();


            var o_sqlQuery = 'select count(*) as C from ' + this.tableName + ';';

            MFDalSqlProxy.executeQuery(p_MFContext, o_sqlQuery, []).then(
                function (returnedSuccess) { /* SUCCESS */
                    console.info('MFDaoSqlAbstract.getNbEntities(): success: C=' + returnedSuccess.rows.item(0).C);
                    deferred.resolve(returnedSuccess.rows.item(0).C);
                },
                function (returnedError) { /* ERROR */
                    console.error('MFDaoSqlAbstract.getNbEntities(): error: ', returnedError);
                    p_MFContext.addError(returnedError);
                    deferred.reject('MFDaoSqlAbstract.getNbEntities(): error: ' + returnedError);
                }
            );


            return deferred.promise;
        };


        /**
         * @ngdoc method
         * @name MFDaoSqlAbstract#produceQueryInPart
         * @function
         *
         * @description
         * Produces a String with question(s) mark(s) and comma(s) for the IN ([...]) part of a query.
         *
         * @param {Array<Integer>} p_ids Array containing ids of entities concerned
         * @returns {String} Returns a String with a syntax in accordance with the number of ids
         */
        MFDaoSqlAbstract.prototype.produceQueryInPart = function (p_ids) {

            console.assert(!angular.isUndefinedOrNull(p_ids), 'p_ids should be defined');

            var r_sInPart;
            // produces ?, ?, ?, ...
            for (var i = 0; i < p_ids.length; i++) {
                if (r_sInPart === undefined) {
                    r_sInPart = '?';
                }
                else {
                    r_sInPart += ', ?';
                }
            }
            if (r_sInPart === undefined) {
                r_sInPart = '?';
            }
            return r_sInPart;
        };


        MFDaoSqlAbstract.prototype.produceQueryColumnsList = function () {
            var sqlColumns = MFMappingHelper.getLeftAttributesList(this.mapping);
            var o_sqlQuery = '';
            var isFirstColumn = true;

            for (var i = 0; i < sqlColumns.length; i++) {
                if (isFirstColumn) {
                    isFirstColumn = false;
                }
                else {
                    o_sqlQuery += ', ';
                }
                o_sqlQuery += sqlColumns[i];
            }

            return o_sqlQuery;
        };

        /**
         * @ngdoc method
         * @name MFDaoSqlAbstract#executeQueryToRead
         * @function
         *
         * @description
         * Executes a query on the DAL for reading entities. Allows to factorize the code in generated DAOs.
         *
         * @param {String} p_callerName String name of the calling method, which needs to executes the query
         * @param {MFContext} p_context MFContext object
         * @param {String} p_sqlQuery String statement which corresponds to the SQL query, with optional blank values
         * @param {Array<Object>} p_sqlParameters Array containing objects, to fill the optional blank values
         * @returns {Array<Object>} Returns an Array of one or several entities, including children if required // TODO doc fix
         */
        MFDaoSqlAbstract.prototype.executeQueryToRead = function (p_callerName, p_context, p_sqlQuery, p_sqlParameters) {
            var deferred = $qSync.defer();
            var self = this;

            console.assert(!angular.isUndefinedOrNullOrEmpty(this.mapping), 'this.mapping should be defined');
            console.assert(!angular.isUndefinedOrNullOrEmpty(p_callerName), 'p_callerName should be defined');
            console.assert(!angular.isUndefinedOrNullOrEmpty(p_sqlQuery), 'p_sqlQuery should be defined');
            console.assert(angular.isArray(p_sqlParameters), 'p_sqlParameters should be defined and should be an array');

            var childrenGroupings = MFMappingHelper.getLeftChildrenGroupings(self.mapping);
            var parentIdColumn = MFMappingHelper.getLeftIdAttribute(self.mapping);
            var recordsGroupingEnabled = !angular.isUndefinedOrNullOrEmpty(childrenGroupings);


            console.log(p_sqlQuery, p_sqlParameters);
            MFDalSqlProxy.executeQuery(p_context, p_sqlQuery, p_sqlParameters).then(
                function (returnedSuccess) { /* SUCCESS */
                    var aObjectsToReturn = [];
                    var result = null;

                    try {

                        if (returnedSuccess.rows.length === 0) { // No result
                            console.info(p_callerName + ': success: entities=', '0');
                            //                        deferred.resolve( aObjectsToReturn );
                            result = aObjectsToReturn;
                        } else { // One or more results

                            console.info(p_callerName + ': success: entities=', returnedSuccess.rows);

                            // map whose key is the ID of the record and the value is an SQL result (only one by parent occurence; the children are grouped in a list which is inside the parent)
                            var groupedRecords = {};

                            for (var i = 0; i < returnedSuccess.rows.length; i++) {
                                var currentRecord = returnedSuccess.rows.item(i);

                                if (recordsGroupingEnabled) {

                                    var firstOccurrence = false;
                                    if (angular.isUndefinedOrNull(groupedRecords[currentRecord[parentIdColumn]])) {
                                        groupedRecords[currentRecord[parentIdColumn]] = {};
                                        firstOccurrence = true;
                                    }

                                    var parentObj = groupedRecords[currentRecord[parentIdColumn]];

                                    for (var childrenListColumn in childrenGroupings) {
                                        if (childrenGroupings.hasOwnProperty(childrenListColumn)) {

                                            var childIdColumn = childrenGroupings[childrenListColumn].idColumn;
                                            var childOtherColumns = childrenGroupings[childrenListColumn].otherColumns;

                                            var childObj = {};

                                            for (var currentColumn in currentRecord) {
                                                if (childOtherColumns.indexOf(currentColumn) >= 0 || childIdColumn === currentColumn) {
                                                    // this attribute is part of one of the children
                                                    childObj[currentColumn] = currentRecord[currentColumn];
                                                }
                                            }
                                            if (firstOccurrence) {
                                                //create a list inside the parent object
                                                parentObj[childrenListColumn] = [];
                                            }
                                            parentObj[childrenListColumn].push(childObj);
                                        }
                                    }
                                    if (firstOccurrence) {
                                        //fill the parent columns
                                        for (var parentAttrIdx = 0; parentAttrIdx < self.mapping.attributes.length; parentAttrIdx++) {
                                            var parentAttrDesc = self.mapping.attributes[parentAttrIdx];
                                            if (!parentAttrDesc.multiple) {
                                                parentObj[parentAttrDesc.leftAttr] = currentRecord[parentAttrDesc.leftAttr];
                                            }
                                        }
                                    }
                                }
                                else {
                                    aObjectsToReturn.push(currentRecord);
                                }
                            }

                            if (recordsGroupingEnabled) {
                                for (var recordId in groupedRecords) {
                                    if (groupedRecords.hasOwnProperty(recordId)) {
                                        aObjectsToReturn.push(groupedRecords[recordId]);
                                    }
                                }
                            }

                            result = MFMappingHelper.convertListLeftIntoRight(aObjectsToReturn, self.mapping, p_context.daoSession);


                        }
                        deferred.resolve(result);
                    }
                    catch (error) {
                        console.error(p_callerName + ': error: ', error);
                        p_context.addError(error);
                        deferred.reject(error);
                    }

                },
                function (returnedError) { /* ERROR */
                    console.error(p_callerName + ': error: ', returnedError);
                    p_context.addError(returnedError);
                    deferred.reject(returnedError);
                }
            );


            return deferred.promise;
        };

        MFDaoSqlAbstract.prototype.addInnerJoinForMultipleAttr = function addInnerJoinForMultipleAttr(query) {
            for (var i = 0; i < this.mapping.attributes.length; i++) {
                var attr = this.mapping.attributes[i];
                if (attr.multiple) {
                    query += ' LEFT OUTER JOIN ' + attr.leftJoinTable + ' on ' + attr.leftJoinTable + '.' + attr.leftAttr + '=' + this.tableName + '.' + MFMappingHelper.getLeftIdAttribute(this.mapping);
                }
            }
        };

        MFDaoSqlAbstract.prototype.getEntitiesByProperty = function getEntitiesByProperty(p_propertyName, p_propertyValue, p_context) {
            var self = this;
            var deferred = $qSync.defer();


            console.assert(!angular.isUndefinedOrNullOrEmpty(self.mapping), 'the mapping should be defined');
            console.assert(!angular.isUndefinedOrNullOrEmpty(p_context), 'the context should be defined');
            console.assert(!angular.isUndefinedOrNullOrEmpty(self.tableName), 'the tableName should be defined');

            console.assert(!angular.isUndefinedOrNullOrEmpty(p_propertyName), 'p_propertyName is required ');
            console.assert(!angular.isUndefinedOrNullOrEmpty(p_propertyValue) || p_propertyName === '*', 'p_propertyValue is required');

            var areMultipleValues = angular.isArray(p_propertyValue);
            var values = MFUtils.toArray(p_propertyValue);


            var askForFullList = p_propertyName === '*';
            var isFullListInCache = MFDataModelCache.hasFullList(self.entityName);

            if (isFullListInCache) {
                console.log('getEntitiesByProperty - get data from cache : MFDataModelCache.getEntitiesByProperty(' + self.entityName + ',' + p_propertyName + ',' + p_propertyValue + ')');
                deferred.resolve(MFDataModelCache.getEntitiesByProperty(self.entityName, p_propertyName, p_propertyValue));
            }
            else {
                var o_sqlQueryParams = [];
                var o_sqlQuery = 'select ' + self.produceQueryColumnsList() + ' from ' + self.tableName;

                self.addInnerJoinForMultipleAttr(o_sqlQuery);

                if (!askForFullList) {

                    //  2.2 convert right into left
                    var sqlObject = MFMappingHelper.convertAttributeRightIntoLeft({name: p_propertyName, values: values}, self.mapping);
                    o_sqlQueryParams = sqlObject.values;

                    o_sqlQuery += ' where ' + sqlObject.name;
                    if (!areMultipleValues) {
                        o_sqlQuery += ' = ?;';
                    }
                    else {
                        o_sqlQuery += ' in ( ';
                        o_sqlQuery += this.produceQueryInPart(values);
                        o_sqlQuery += ' );  ';
                    }
                }
                console.log('getEntitiesByProperty - get data from DB : ' + o_sqlQuery);

                this.executeQueryToRead(
                        'getEntitiesBy' + p_propertyName, p_context, o_sqlQuery, o_sqlQueryParams
                    ).then(
                    function (result_success) {
                        if (askForFullList) {
                            p_context.fullListDone.push(self.entityName);
                        }
                        deferred.resolve(result_success);
                    },
                    function (returnedError) { /* ERROR */
                        console.error('getEntitiesBy' + p_propertyName + ': error: ', returnedError);
                        p_context.addError(returnedError);
                        deferred.reject(returnedError);
                    }
                );
            }
            return deferred.promise;
        };


        /**
         *
         * @param p_properties : { 'attrName1': ['value1', 'value2'], 'attrName2': ['value3', 'value4'] }
         * @param p_context
         * @returns {*}
         */

        MFDaoSqlAbstract.prototype.getEntitiesByProperties = function getEntitiesByProperties(p_properties, p_context) {
            var self = this;
            var deferred = $qSync.defer();


            console.assert(!angular.isUndefinedOrNullOrEmpty(self.mapping), 'the mapping should be defined');
            console.assert(!angular.isUndefinedOrNullOrEmpty(p_context), 'the context should be defined');
            console.assert(!angular.isUndefinedOrNullOrEmpty(self.tableName), 'the tableName should be defined');

            console.assert(!angular.isUndefinedOrNullOrEmpty(p_properties) && Object.keys(p_properties).length > 0, 'p_propertyName should be should be defined and not empty');

            var o_sqlQuery = 'select ' + self.produceQueryColumnsList() + ' from ' + self.tableName;

            self.addInnerJoinForMultipleAttr(o_sqlQuery);

            o_sqlQuery += ' where ';
            var o_sqlQueryParams = [];
            var isFirst = true;


            angular.forEach(p_properties, function (propertyValues, propertyName) {

                var areMultipleValues = angular.isArray(propertyValues);
                var values = MFUtils.toArray(propertyValues);


                //  2.2 convert right into left
                var sqlObject = MFMappingHelper.convertAttributeRightIntoLeft({name: propertyName, values: values}, self.mapping);

                for (var i = 0; i < sqlObject.values.length; i++) {
                    o_sqlQueryParams.push(sqlObject.values[i]);
                }


                if (isFirst) {
                    isFirst = false;
                }
                else {
                    o_sqlQuery += ' and ';
                }

                o_sqlQuery += sqlObject.name;

                if (!areMultipleValues) {
                    o_sqlQuery += ' = ? ';
                }
                else {
                    o_sqlQuery += ' in ( ';
                    o_sqlQuery += self.produceQueryInPart(values);
                    o_sqlQuery += ' )  ';
                }


            });

            o_sqlQuery += ';';


            this.executeQueryToRead(
                    'getEntitiesByProperties', p_context, o_sqlQuery, o_sqlQueryParams).then(
                function (result_success) {
                    deferred.resolve(result_success);
                },
                function (returnedError) { /* ERROR */
                    console.error('getEntitiesByProperties: error: ', returnedError);
                    p_context.addError(returnedError);
                    deferred.reject(returnedError);
                }
            );
            return deferred.promise;
        };


        MFDaoSqlAbstract.prototype.deleteEntity = function deleteEntity(p_entity, p_context, p_toSync) {
            var self = this;
            var deferred = $qSync.defer();


            console.assert(!angular.isUndefinedOrNullOrEmpty(self.mapping), 'the mapping should be defined');
            console.assert(!angular.isUndefinedOrNullOrEmpty(p_context), 'the context should be defined');
            console.assert(!angular.isUndefinedOrNullOrEmpty(self.tableName), 'the tableName should be defined');

            p_entity._deleted = true;
            p_context.addToDaoSession(self.entityName, p_entity);


            var o_sqlQuery = 'DELETE from ' + self.tableName + ' where ' + MFMappingHelper.getRightIdAttribute(self.mapping) + ' = ?;';

            this.executeQueryToWrite(
                    'delete' + self.entityName, p_context, o_sqlQuery, [p_entity.idToString], p_toSync).then(
                function (result_success) {
                    deferred.resolve(result_success);
                },
                function (returnedError) { /* ERROR */
                    console.error('delete' + self.entityName + ': error: ', returnedError);
                    p_context.addError(returnedError);
                    deferred.reject(returnedError);
                }
            );
            return deferred.promise;
        };

        MFDaoSqlAbstract.prototype.fixDoubleWaysRelationship = function resolveDoubleWaysRelationship(p_entity) {
            var self = this;
            for (var i = 0; i < self.cascadeDefinition.length; i++) {
                var children = MFUtils.toArray(p_entity[self.cascadeDefinition[i].parentAttrPointingChild]);
                for (var childIdx = 0; childIdx < children.length; childIdx++) {
                    var childFkAttr = self.cascadeDefinition[i].childAttrPointingParent;
                    var child = children[childIdx];
                    if (!angular.isUndefinedOrNull(child) && angular.isUndefinedOrNullOrEmpty(child[childFkAttr])) {
                        child[childFkAttr] = p_entity;
                    }
                }
            }
        };


        /**
         * SET ID attribute and save the entity
         * @param p_entity
         * @param p_context
         * @param p_toSync
         */
        MFDaoSqlAbstract.prototype.saveEntity = function saveEntity(p_entity, p_context, p_toSync) {
            var self = this;
            var deferred = $qSync.defer();


            console.assert(!angular.isUndefinedOrNullOrEmpty(self.mapping), 'the mapping should be defined');
            console.assert(!angular.isUndefinedOrNullOrEmpty(p_context), 'the context should be defined');
            console.assert(!angular.isUndefinedOrNullOrEmpty(self.tableName), 'the tableName should be defined');


            //  2.1 get next ID

            self.getNextId(p_context).then(
                function (returnedSuccess_nextId) {

                    //  2.2 convert right into left
                    var sqlObject = MFMappingHelper.convertRightIntoLeft(p_entity, self.mapping);


                    //  2.3 generate SQL query (with mapping object) and SQL parameters (with left object and next id)
                    var firstPartSqlQuery = 'insert into ' + self.tableName + ' (';
                    var secondPartSqlQuery = 'values (';
                    var o_sqlParameters = [];

                    for (var attrIdx = 0; attrIdx < self.mapping.attributes.length; attrIdx++) {
                        var currAttrDef = self.mapping.attributes[attrIdx];
                        if (!currAttrDef.multiple) {

                            var valueToInsert;

                            if (currAttrDef.identifier) {
                                valueToInsert = returnedSuccess_nextId;
                                p_entity[currAttrDef.rightAttr] = returnedSuccess_nextId;
                            }
                            else {
                                valueToInsert = sqlObject[currAttrDef.leftAttr];
                            }

                            if (!angular.isUndefinedOrNull(valueToInsert)) {
                                o_sqlParameters.push(valueToInsert);
                                firstPartSqlQuery += ' ' + currAttrDef.leftAttr + ',';
                                secondPartSqlQuery += ' ?,';
                            }

                        }
                    }

                    // remove last comma and add bracket
                    firstPartSqlQuery = firstPartSqlQuery.slice(0, -1) + ') ';
                    secondPartSqlQuery = secondPartSqlQuery.slice(0, -1) + ');';

                    p_context.addToDaoSession(self.entityName, p_entity);


                    self.executeQueryToWrite(
                            'saveEntity()', p_context, firstPartSqlQuery + secondPartSqlQuery, o_sqlParameters, p_toSync).then(
                        function (returnedSuccess_executeQueryToWrite) {
                            deferred.resolve(p_entity);
                        },
                        function (returnedError_executeQueryToWrite) { /* ERROR */
                            console.error('saveEntity(): error: ', returnedError_executeQueryToWrite);
                            p_context.addError(returnedError_executeQueryToWrite);
                            deferred.reject(returnedError_executeQueryToWrite);
                        }
                    );

                },
                function (returnedError_nextId) {
                    console.error('saveEntity(): error: ', returnedError_nextId);
                    p_context.addError(returnedError_nextId);
                    deferred.reject(returnedError_nextId);
                }
            );

            return deferred.promise;

        };


        MFDaoSqlAbstract.prototype.getChildrenIdsToRemove = function getChildrenIdsToRemove(p_context, p_entity, p_childAttributeName) {


            var cascadeChildDefinition;

            for (var i = 0; i < this.cascadeDefinition.length; i++) {
                if (this.cascadeDefinition[i].parentAttrPointingChild === p_childAttributeName) {
                    cascadeChildDefinition = this.cascadeDefinition[i];
                    break;
                }
            }

            console.assert(!angular.isUndefinedOrNullOrEmpty(cascadeChildDefinition.parentAttrPointingChild), 'p_config.parentAttrPointingChild is required');
            console.assert(!angular.isUndefinedOrNullOrEmpty(cascadeChildDefinition.childDao), 'p_config.childDao is required');
            console.assert(!angular.isUndefinedOrNullOrEmpty(cascadeChildDefinition.childDao.mapping), 'p_config.childDao.mapping is required');

            var childTable = cascadeChildDefinition.childDao.tableName;
            var childColumnPointingParent = MFMappingHelper.convertAttrNameRightToLeft(cascadeChildDefinition.childDao.mapping, cascadeChildDefinition.childAttrPointingParent);

            var childIdColumn = MFMappingHelper.getLeftIdAttribute(cascadeChildDefinition.childDao.mapping);

            var deferred = $qSync.defer();


            //   1.1 get the current list of children
            var childrenList = p_entity[cascadeChildDefinition.parentAttrPointingChild];
            if(!angular.isUndefinedOrNullOrEmpty(childrenList) && !angular.isArray(childrenList)){
                childrenList = [childrenList];
            }
            var childrenIdList = [];
            angular.forEach(childrenList, function (child, key) {
                this.push(child.idToString);
            }, childrenIdList);

            //   1.2 get the list of children IDs removed
            var sqlQuery = 'SELECT ' + childColumnPointingParent + ' FROM ' + childTable + ' WHERE ' + childColumnPointingParent + ' = ' + p_entity.idToString + ' AND ' + childIdColumn + ' NOT IN ( ' + childrenIdList.join(', ') + ' )';
            var sqlParameters = [];

            MFDalSqlProxy.executeQuery(p_context, sqlQuery, sqlParameters).then(
                function (returnedSuccess) {

                    var idsList = [];

                    if (returnedSuccess.rows.length > 0) {
                        for (var i = 0; i < returnedSuccess.rows.length; i++) {
                            idsList.push(returnedSuccess.rows.item(i)[childColumnPointingParent]);
                        }
                    }

                    deferred.resolve(idsList);
                },
                function (error) {
                    console.error(error);
                    p_context.addError(error);
                    deferred.reject(error);
                });

            return deferred.promise;
        };


        /**
         *  update the entity
         * @param p_entity
         * @param p_context
         * @param p_toSync
         */
        MFDaoSqlAbstract.prototype.updateEntity = function updateEntity(p_entity, p_context, p_toSync) {
            var self = this;
            var deferred = $qSync.defer();

            p_context.addToDaoSession(self.entityName, p_entity);

            console.assert(!angular.isUndefinedOrNullOrEmpty(self.mapping), 'the mapping should be defined');
            console.assert(!angular.isUndefinedOrNullOrEmpty(p_context), 'the context should be defined');
            console.assert(!angular.isUndefinedOrNullOrEmpty(self.tableName), 'the tableName should be defined');

            if (!p_entity._fulfilled) {
                console.warn('the entity to update is not fulfilled');
                deferred.resolve(p_entity);
            }
            else {


                //  2.2 convert right into left
                var sqlObject = MFMappingHelper.convertRightIntoLeft(p_entity, self.mapping);


                //  2.3 generate SQL query (with mapping object) and SQL parameters (with left object and next id)
                var firstPartSqlQuery = 'update ' + self.tableName + ' set ';
                var wherePartSqlQuery;
                var idValue;

                var o_sqlParameters = [];


                for (var attrIdx = 0; attrIdx < self.mapping.attributes.length; attrIdx++) {
                    var currAttrDef = self.mapping.attributes[attrIdx];
                    if (!currAttrDef.multiple) {

                        if (currAttrDef.identifier) {
                            wherePartSqlQuery = ' where ' + currAttrDef.leftAttr + ' = ? ';
                            idValue = sqlObject[currAttrDef.leftAttr];
                        }
                        else {
                            firstPartSqlQuery += ' ' + currAttrDef.leftAttr + ' = ?,';
                            o_sqlParameters.push(sqlObject[currAttrDef.leftAttr]);
                        }
                    }
                }
                // remove last comma
                firstPartSqlQuery = firstPartSqlQuery.slice(0, -1);
                console.assert(!angular.isUndefinedOrNullOrEmpty(wherePartSqlQuery) && !angular.isUndefinedOrNullOrEmpty(idValue), 'ID not found');
                // ID is the last param of the query
                o_sqlParameters.push(idValue);

                self.executeQueryToWrite(
                        'updateEntity()', p_context, firstPartSqlQuery + wherePartSqlQuery, o_sqlParameters, p_toSync
                    ).then(
                    function (returnedSuccess_executeQueryToWrite) {
                        deferred.resolve(p_entity);
                    },
                    function (returnedError_executeQueryToWrite) { /* ERROR */
                        console.error('saveEntity(): error: ', returnedError_executeQueryToWrite);
                        p_context.addError(returnedError_executeQueryToWrite);
                        deferred.reject(returnedError_executeQueryToWrite);
                    }
                );
            }

            return deferred.promise;

        };


        /**
         * @ngdoc method
         * @name MFDaoSqlAbstract#executeQueryToWrite
         * @function
         *
         * @description
         * Executes a query on the DAL to write entities. Allows to factorize the code in generated DAOs.
         *
         * @param {String} p_callerName String name of the calling method, which needs to executes the query
         * @param {MFContext} p_context MFContext object
         * @param {String} p_sqlQuery String statement which corresponds to the SQL query, with optional blank values
         * @param {Array<Object>} p_sqlParameters Array containing objects, to fill the optional blank values. The entity id must be the last value of the array
         * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
         * @returns {Integer} Returns an Integer equal to insertId for an insert query, or rowsAffected for an update or delete query // TODO doc fix
         */
        MFDaoSqlAbstract.prototype.executeQueryToWrite = function (p_callerName, p_context, p_sqlQuery, p_sqlParameters, p_toSync) {
            var deferred = $qSync.defer();
            var that = this;

            console.assert(!angular.isUndefinedOrNull(this.syncDisabled), 'this.syncDisabled should be defined');
            console.assert(!angular.isUndefinedOrNull(this.tableName), 'this.tableName should be defined');
            console.assert(!angular.isUndefinedOrNullOrEmpty(p_callerName), 'p_callerName should be defined');
            console.assert(!angular.isUndefinedOrNull(p_sqlQuery), 'p_sqlQuery should be defined');
            console.assert(angular.isArray(p_sqlParameters), 'p_sqlParameters should be defined');


            MFDalSqlProxy.executeQuery(p_context, p_sqlQuery, p_sqlParameters).then(
                function (returnedSuccess) { /* SUCCESS */
                    console.debug('Query success', returnedSuccess);
                    // must be equal to: insert, update or delete
                    var queryType = p_sqlQuery.substring(0, 6).toLowerCase();
                    var resultKey;
                    var resultValue;
                    var affectedId;


                    // result data handling
                    if (queryType === 'insert') {
                        resultKey = 'insertId';
                        resultValue = returnedSuccess.insertId;
                        affectedId = resultValue;

                    } else if (queryType === 'update' || queryType === 'delete') {
                        resultKey = 'rowsAffected';
                        resultValue = returnedSuccess.rowsAffected;
                        affectedId = p_sqlParameters[(p_sqlParameters.length) - 1];

                        // warning handling
                        if (resultValue === 0) {
                            p_context.addWarning(p_callerName + '(): success: rowsAffected === 0');
                        }

                    } else {
                        throw new MFDaoException('MFDaoSqlAbstract.executeQueryToWrite(): first instruction in query is unknown: only insert, update and delete are allowed.');

                    }
                    console.info(p_callerName + ': success: ' + resultKey + '=', resultValue);


                    // synchronization handling
                    // if entity must be registered or unregistered for synchronization
                    if (!that.syncDisabled && p_toSync) {

                        // if the entity was deleted and never synced yet, we need to unregister it
                        if ((queryType === 'delete') && (affectedId < 0)) {
                            deferred.resolve(that.unregisterEntityForSync(p_callerName, p_context, affectedId, resultValue));

                            // else if the entity was updated or deleted, we *might* need to register it
                        } else if ((queryType === 'update') || (queryType === 'delete')) {
                            var o_sqlQuery = 'select COUNT(ID) as C from T_MOBJECTTOSYNCHRONIZE where (OBJECTID=? and OBJECTNAME=?);';
                            var o_sqlParameters = [affectedId, that.tableName];

                            MFDalSqlProxy.executeQuery(p_context, o_sqlQuery, o_sqlParameters).then(
                                function (returnedSuccess) {
                                    /* SUCCESS */
                                    // if the entity was already registered for sync, we ignore it
                                    if (returnedSuccess.rows.item(0).C > 0) {
                                        console.info(p_callerName + ': entity sync ignored (already registered for sync)');
                                        deferred.resolve(resultValue);

                                        // else we need to register it
                                    } else {
                                        deferred.resolve(that.registerEntityForSync(p_callerName, p_context, affectedId, resultValue));
                                    }
                                },
                                function (returnedError) {
                                    /* ERROR */
                                    console.error(p_callerName + ': count for registerEntityForSync: error: ', returnedError);
                                    p_context.addError(p_callerName + ': count for registerEntityForSync: error: ' + returnedError);
                                    deferred.reject(false);
                                }
                            );

                            // else we need to register it
                        } else {
                            deferred.resolve(that.registerEntityForSync(p_callerName, p_context, affectedId, resultValue));
                        }

                        // else we don't care about synchronization for the entity
                    } else {
                        console.info(p_callerName + ': entity sync ignored (see syncDisabled/toSync values)');
                        deferred.resolve(resultValue);
                    }
                },
                function (returnedError) { /* ERROR */
                    console.error(p_callerName + ': error: ', returnedError);
                    p_context.addError(returnedError);
                    deferred.reject(returnedError);
                }
            );


            return deferred.promise;
        };


        /**
         * @ngdoc method
         * @name MFDaoSqlAbstract#registerEntityForSync
         * @function
         *
         * @description
         * Registers a modified (inserted, updated or deleted) entity for synchronization.
         *
         * @param {String} p_callerName String name of the calling method, which needs to executes the query
         * @param {MFContext} p_context MFContext object
         * @param {Integer} p_id Integer id of the entity to register
         * @param {Integer} p_resultToReturn Integer to return by the calling method
         * @returns {Integer} Returns an Integer equal to insertId for an insert query, or rowsAffected for an update or delete query
         */
        MFDaoSqlAbstract.prototype.registerEntityForSync = function (p_callerName, p_context, p_id, p_resultToReturn) {
            var deferred = $qSync.defer();
            var that = this;

            console.assert(!angular.isUndefinedOrNull(this.tableName), 'this.tableName should be defined');
            console.assert(!angular.isUndefinedOrNullOrEmpty(p_callerName), 'p_callerName should be defined');
            console.assert(!angular.isUndefinedOrNull(p_id), 'p_id should be defined');


            var o_sqlQuery = 'insert into T_MOBJECTTOSYNCHRONIZE (OBJECTID, OBJECTNAME) values (?, ?);';
            var o_sqlParameters = [p_id, that.tableName];

            MFDalSqlProxy.executeQuery(p_context, o_sqlQuery, o_sqlParameters).then(
                function (returnedSuccess) { /* SUCCESS */
                    console.info(p_callerName + ': registerEntityForSync: success: p_id=' + p_id + ', insertId=', returnedSuccess.insertId);
                    deferred.resolve(p_resultToReturn);
                },
                function (returnedError) { /* ERROR */
                    console.error(p_callerName + ': registerEntityForSync: error: ', returnedError);
                    p_context.addError(returnedError);
                    deferred.reject(p_callerName + ': registerEntityForSync: error: ' + returnedError);
                }
            );


            return deferred.promise;
        };


        /**
         * @ngdoc method
         * @name MFDaoSqlAbstract#unregisterEntityForSync
         * @function
         *
         * @description
         * Unregisters a deleted and never synced yet entity from synchronization.
         *
         * @param {String} p_callerName String name of the calling method, which needs to executes the query
         * @param {MFContext} p_context MFContext object
         * @param {Integer} p_id Integer id of the entity to unregister
         * @param {Integer} p_resultToReturn Integer to return by the calling method
         * @returns {Integer} Returns an Integer equal to rowsAffected for a delete query
         */
        MFDaoSqlAbstract.prototype.unregisterEntityForSync = function (p_callerName, p_context, p_id, p_resultToReturn) {
            var deferred = $qSync.defer();

            console.assert(!angular.isUndefinedOrNull(this.tableName), 'this.tableName should be defined');


            var o_sqlQuery = 'delete from T_MOBJECTTOSYNCHRONIZE where (OBJECTID=? and OBJECTNAME=?);';
            var o_sqlParameters = [p_id, this.tableName];

            MFDalSqlProxy.executeQuery(p_context, o_sqlQuery, o_sqlParameters).then(
                function (returnedSuccess) { /* SUCCESS */
                    console.info(p_callerName + ': unregisterEntityForSync: success: p_id=' + p_id + ', rowsAffected=', returnedSuccess.rowsAffected);
                    deferred.resolve(p_resultToReturn);
                },
                function (returnedError) { /* ERROR */
                    console.error(p_callerName + ': unregisterEntityForSync: error: ', returnedError);
                    p_context.addError(returnedError);
                    deferred.reject(p_callerName + ': unregisterEntityForSync: error: ' + returnedError);
                }
            );


            return deferred.promise;
        };


        /**
         * @ngdoc method
         * @name MFDaoSqlAbstract#loadChildrenIfNeeded
         * @function
         *
         * @description
         * Loads in cascade the children if requested by the param p_cascadeSet.
         *
         * @param p_context : context for the current DB transaction
         * @param parent : parent entity
         * @param p_cascadeSet : list of the name of the attributes whose loading is requested
         * @param childrenDefinition : description of the children to fill by cascade [
         *  {parentAttrPointingChild:'notes',
         *  childAttrPointingParent:'client',
         *  childDao:'NoteDaoSql',
         *  action:'get'/'getList'/'save' // getList for many-to-many and one-to-many }]
         */
        MFDaoSqlAbstract.prototype.loadChildrenIfNeeded = function (p_context, parent, p_cascadeSet) {

            var loadChildrenDeferred = $qSync.defer();

            console.assert(!angular.isUndefinedOrNullOrEmpty(this.entityName), 'this.entityName should be defined');

            console.assert(!angular.isUndefinedOrNull(this.cascadeDefinition), 'childrenDefinition should be defined');

            var loadAllChildren = angular.isUndefinedOrNull(p_cascadeSet);

            if (this.cascadeDefinition.length > 0 && !angular.isUndefinedOrNull(parent)) {

                var callsToDo = [];

                for (var childDefIdx = 0; childDefIdx < this.cascadeDefinition.length; childDefIdx++) {

                    var childDefinition = this.cascadeDefinition[childDefIdx];
                    console.assert(!angular.isUndefinedOrNullOrEmpty(childDefinition), 'childrenDefinition[' + childDefIdx + '] should be defined and not null');
                    console.assert(!angular.isUndefinedOrNullOrEmpty(childDefinition.parentAttrPointingChild), 'childrenDefinition[' + childDefIdx + '].parentAttrPointingChild should be defined');
                    console.assert(!angular.isUndefinedOrNull(childDefinition.childDao), 'childrenDefinition[' + childDefIdx + '].childDao should be defined');
                    console.assert(!angular.isUndefinedOrNullOrEmpty(childDefinition.childDao.entityName), 'childrenDefinition[' + childDefIdx + '].childDao.entityName should be defined');
                    console.assert(!angular.isUndefinedOrNullOrEmpty(childDefinition.childDao.mapping), 'childrenDefinition[' + childDefIdx + '].childDao.mapping should be defined');

                    console.assert(!angular.isUndefinedOrNullOrEmpty(childDefinition.childAttrPointingParent), 'childrenDefinition[' + childDefIdx + '].childAttrPointingParent should be defined');
                    console.assert(!angular.isUndefinedOrNullOrEmpty(childDefinition.readAction), 'childrenDefinition[' + childDefIdx + '].readAction should be defined');

                    var childAlreadyDefined = !angular.isUndefinedOrNull(parent[childDefinition.parentAttrPointingChild]) && (parent[childDefinition.parentAttrPointingChild]._fulfilled || angular.isArray(parent[childDefinition.parentAttrPointingChild]) && parent[childDefinition.parentAttrPointingChild].length > 0 && parent[childDefinition.parentAttrPointingChild][0]._fulfilled);


                    if (!childAlreadyDefined) {

                        if (angular.isUndefined(childDefinition.preFilled)) {
                            childDefinition.preFilled = MFMappingHelper.hasRightAttr(this.mapping, childDefinition.parentAttrPointingChild);
                        }

                        if (loadAllChildren) {
                            this.addDaoChildCall(p_context, parent, p_cascadeSet, childDefinition, callsToDo);
                        }
                        else {
                            var cascadeIdx = p_cascadeSet.indexOf(childDefinition.parentAttrPointingChild);
                            if (cascadeIdx > -1) {
                                var removedCascadeItm = p_cascadeSet.splice(cascadeIdx, 1);
                                console.log('Will process the cascade item "' + removedCascadeItm + '"');
                                this.addDaoChildCall(p_context, parent, p_cascadeSet, childDefinition, callsToDo);
                            }
                        }
                    }
                }

                if (callsToDo.length > 0) {

                    // execute in parallel all the child DAO calls

                    $qSync.all(callsToDo).then(
                        function (childrenSuccess) {
                            loadChildrenDeferred.resolve(childrenSuccess);
                        },
                        function (childrenError) {
                            loadChildrenDeferred.reject(childrenError);
                        }
                    );
                }
                else {
                    loadChildrenDeferred.resolve(parent);
                }
            }
            else {
                loadChildrenDeferred.resolve(parent);
            }
            return loadChildrenDeferred.promise;
        };


        /**
         * @description
         * Technical service called by MFDaoSqlAbstract#addDaoChildCall
         *
         * @param p_context
         * @param parent
         * @param childDefinition
         * @returns {Array}
         */
        MFDaoSqlAbstract.prototype.buildDaoChildCallParams = function buildDaoChildCallParams(p_context, parent, childDefinition) {
            var daoMethodParam = [];

            if (angular.isArray(parent)) {
                for (var resIdx = 0; resIdx < parent.length; resIdx++) {
                    if (!childDefinition.preFilled) {
                        daoMethodParam.push(parent[resIdx].idToString);
                    }
                    else {
                        if (!angular.isUndefinedOrNull(parent[resIdx][childDefinition.parentAttrPointingChild]) && !parent[resIdx][childDefinition.parentAttrPointingChild]._fulfilled) {
                            daoMethodParam.push(parent[resIdx][childDefinition.parentAttrPointingChild].id);
                        }
                    }
                }
            }
            else {
                if (!childDefinition.preFilled) {
                    daoMethodParam.push(parent.idToString);
                }
                else if (!parent[childDefinition.parentAttrPointingChild]._fulfilled) {
                    daoMethodParam.push(parent[childDefinition.parentAttrPointingChild].idToString);
                }
            }
            return daoMethodParam;
        };


        /**
         * @description
         * Technical service called by MFDaoSqlAbstract#addDaoChildCall
         *
         * @param p_context
         * @param parent
         * @param p_cascadeSet
         * @param childDefinition
         * @param callsToDo
         */
        MFDaoSqlAbstract.prototype.addDaoChildCall = function addDaoChildCall(p_context, parent, p_cascadeSet, childDefinition, callsToDo) {

            //calculate the params to give to the child DAO method
            var daoMethodParam = this.buildDaoChildCallParams(p_context, parent, childDefinition);
            var childEntity = childDefinition.childDao.entityName;
            console.assert(!angular.isUndefinedOrNullOrEmpty(childEntity), 'childDefinition.childDao.entityName is required');


            if (daoMethodParam.length > 0) {

                //calculate the name of the method to call in the child DAO
                var daoMethodToCall = null;

                var getterValue = childDefinition.readAction;
                if (!childDefinition.preFilled) {
                    daoMethodToCall = getterValue + childEntity + 'By' + childDefinition.childAttrPointingParent.capitalize() + 'id';
                    console.log('since the child attribute is not prefilled, get the children by their foreign key which points to the parent');
                }
                else {
                    daoMethodToCall = getterValue + childEntity + 'ById';
                }

                //if the function to call does not expect a list of IDs as parameter, transform the param from array to single value
                if (childDefinition.readAction.indexOf('List') < 0){
                    daoMethodParam = daoMethodParam[0];
                }
                else {
                    daoMethodToCall += 's';
                }

                console.log('Will call "' + daoMethodToCall + '()"');
                console.assert(angular.isFunction(childDefinition.childDao[daoMethodToCall]), daoMethodToCall + ' does not exist in ' + childDefinition.constructor.name);
                var daoPromise = childDefinition.childDao[daoMethodToCall](daoMethodParam, p_context, angular.copy(p_cascadeSet));

                daoPromise.then(
                    function (children) {
                        console.log('SUCCESS of child DAO call');

                        //TODO Suppression d'un problème ou d'un symptome?
                        if (!angular.isUndefinedOrNull(children)) {
                            if (!angular.isArray(children)) {
                                children = [children];
                            }

                            if (children.length > 0) {
                                var childrenByParent = {};
                                var childrenById = {};

                                children.forEach(function (child) {
                                    // Browsable from child to parent?
                                    if (child.hasOwnProperty(childDefinition.childAttrPointingParent)) {
                                        var childAttrPointingParent = child[childDefinition.childAttrPointingParent];

                                        if (angular.isArray(childAttrPointingParent)) {
                                            if (childAttrPointingParent.length > 0) {
                                                for (var pointedParentIdx = 0; pointedParentIdx < childAttrPointingParent.length; pointedParentIdx++) {
                                                    if (angular.isUndefinedOrNull(childrenByParent[childAttrPointingParent[pointedParentIdx].idToString])) {
                                                        childrenByParent[childAttrPointingParent[pointedParentIdx].idToString] = [];
                                                    }
                                                    childrenByParent[childAttrPointingParent[pointedParentIdx].idToString].push(child);
                                                }
                                            }
                                        }
                                        else {
                                            var parentId = child[childDefinition.childAttrPointingParent].idToString;
                                            if (angular.isUndefinedOrNull(childrenByParent[parentId])) {
                                                childrenByParent[parentId] = [];
                                            }
                                            childrenByParent[parentId].push(child);
                                        }
                                    }
                                    else { // Browsable from parent to child => many-to-one or one-to-one
                                        childrenById[child.idToString] = child;
                                    }
                                });

                                //2. fill the attribute of the parent
                                var fillParent = function(instance) {
                                    var parentAttrPointingChild = instance[childDefinition.parentAttrPointingChild];
                                    if (angular.isArray(parentAttrPointingChild)) {
                                        parentAttrPointingChild.push.apply(parentAttrPointingChild, childrenByParent[instance.idToString]);
                                    } else {
                                        instance[childDefinition.parentAttrPointingChild] = childrenById[parentAttrPointingChild.idToString];
                                    }
                                };

                                if (angular.isArray(parent)) {
                                    parent.forEach(fillParent);
                                } else {
                                    fillParent(parent);
                                }
                            }
                        }
                    }
                );
                callsToDo.push(daoPromise);

            }

        };

        return new MFDaoSqlAbstract();
    }]);
