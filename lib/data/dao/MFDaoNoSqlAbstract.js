'use strict';

//returns an instance of DAO
angular.module('mfcore').factory('MFDaoNoSqlAbstract', ['MFSyncPromiseProvider', 'MFDalNoSqlProxy', 'MFMappingHelper', 'MFDaoException','$injector', 'MFUtils','MFDataModelCache',
                                                        function ($qSync, MFDalNoSqlProxy, MFMappingHelper, MFDaoException,$injector, MFUtils,MFDataModelCache) {
    var MFDaoNoSqlAbstract = function MFDaoNoSqlAbstract(entityName) {
        MFUtils.defineAttributes(
                this,
                ['lastId', 'mapping', 'syncDisabled', 'objectStoreName', 'entityName'],
                true, false, false
        );
        this.entityName = entityName;
        MFDaoNoSqlAbstract.prototype.daoTable[entityName] = this;
    };

    MFDaoNoSqlAbstract.prototype.daoTable = {};

    /**
     * @ngdoc method
     * @name MFDaoNoSqlAbstract#getRecord
     * @function
     *
     * @description
     * Returns a Record by id.
     *
     * @param {MFContext} p_context MFContext object
     * @param {Array<String>} p_cascadeSet Array containing children tables names to process
     * @param {Integer} p_Id Integer id of the Record to get
     * @returns {Record} Returns the Record, including children if required
     */
    MFDaoNoSqlAbstract.prototype._getRecordById = function getRecordById(p_id, p_context, p_cascadeSet) {
        var deferred = $qSync.defer();
        var self = this;
        console.assert(!angular.isUndefinedOrNullOrEmpty(this.objectStoreName),'objectStoreName should be defined');
        console.assert(!angular.isUndefinedOrNullOrEmpty(p_id),'p_id should be defined');
        console.assert(!angular.isUndefinedOrNullOrEmpty(p_context),'p_context should be defined');
        console.assert(!angular.isUndefinedOrNullOrEmpty(this.mapping),'mapping should be defined');

        MFDalNoSqlProxy.find(p_context, this.objectStoreName, p_id).then(function(record) {
            if (record !== null) {
                var entity = self.record2Entity(p_context, record);
                self.resolveCascade(entity, p_context, p_cascadeSet).then(function() {
                    console.log('[MFDaoNoSqlAbstract.getRecordById] record found : ',entity);
                    deferred.resolve(entity);
                }, function(error) {
                    deferred.reject(error);
                });
            } else {
                deferred.resolve(null);
            }
        }, function(dalError) {
            // p_context.addError(dalError);
            deferred.reject(dalError);
        });

        return deferred.promise;
    };

    /**
     * @ngdoc method
     * @name MFDaoNoSqlAbstract#getListRecord
     * @function
     *
     * @description
     * Returns the list of all Records.
     *
     * @param {MFContext} p_context MFContext object
     * @param {Array<String>} p_cascadeSet Array containing children tables names to process
     * @param {Array<Integer>} p_ids Array containing ids of Records to get (optional)
     * @returns {Array<Record>} Returns an Array of Records, including children if required
     */
    MFDaoNoSqlAbstract.prototype._getListRecord = function getListRecord(p_context, p_cascadeSet) {
        var deferred = $qSync.defer();
        var self = this;

        console.assert(!angular.isUndefinedOrNullOrEmpty(this.objectStoreName),'objectStoreName should be defined');
        console.assert(!angular.isUndefinedOrNullOrEmpty(p_context),'p_context should be defined');
        console.assert(!angular.isUndefinedOrNullOrEmpty(this.mapping),'mapping should be defined');

        MFDalNoSqlProxy.find(p_context, this.objectStoreName).then(function(records) {
            self.records2EntitiesAndCascade(p_context, records, p_cascadeSet).then(function(result) {
                p_context.fullListDone.push(self.entityName);
                console.log('[MFDaoNoSqlAbstract.getListRecord] records found : ',result);
                deferred.resolve(result);
            }, function(error) {
                deferred.reject(error);
            });
        }, function(dalError) {
            // p_context.addError(dalError);
            deferred.reject(dalError);
        });

        return deferred.promise;
    };

    /**
     * @ngdoc method
     * @name MFDaoNoSqlAbstract#getListRecord
     * @function
     *
     * @description
     * Returns the list of all Records.
     *
     * @param {MFContext} p_context MFContext object
     * @param {Array<String>} p_cascadeSet Array containing children tables names to process
     * @param {Array<Integer>} p_ids Array containing ids of Records to get (optional)
     * @returns {Array<Record>} Returns an Array of Records, including children if required
     */
    MFDaoNoSqlAbstract.prototype._getListRecordByIds = function getListRecordByIds(p_ids, p_context, p_cascadeSet) {
        var deferred = $qSync.defer();
        var self = this;
        p_ids = MFUtils.toArray(p_ids);

        console.assert(!angular.isUndefinedOrNullOrEmpty(this.objectStoreName),'objectStoreName should be defined');
        console.assert(!angular.isUndefinedOrNullOrEmpty(p_context),'p_context should be defined');
        console.assert(!angular.isUndefinedOrNullOrEmpty(p_ids) && angular.isArray(p_ids),'p_id should be defined and be an array');
        console.assert(!angular.isUndefinedOrNullOrEmpty(this.mapping),'mapping should be defined');

        MFDalNoSqlProxy.find(p_context, this.objectStoreName, p_ids).then(function(records) {
            self.records2EntitiesAndCascade(p_context, records, p_cascadeSet).then(function(result) {
                console.log('[MFDaoNoSqlAbstract.getListRecordByIds] records found : ',result);
                deferred.resolve(result);
            }, function(error) {
                deferred.reject(error);
            });
        }, function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    /**
     * @ngdoc method
     * @name MFDaoNoSqlAbstract#getListRecord
     * @function
     *
     * @description
     * Returns the list of all Records.
     *
     * @param {MFContext} p_context MFContext object
     * @param {Array<String>} p_cascadeSet Array containing children tables names to process
     * @param {Array<Integer>} p_ids Array containing ids of Records to get (optional)
     * @returns {Array<Record>} Returns an Array of Records, including children if required
     */
    MFDaoNoSqlAbstract.prototype._getRecordByAttribute = function(p_attributeName) {

        console.assert(!angular.isUndefinedOrNullOrEmpty(p_attributeName),'p_attributeName should be defined');

        return function(p_value, p_context, p_cascadeSet) {
            var deferred = $qSync.defer();
            var self = this;

            console.assert(!angular.isUndefinedOrNullOrEmpty(this.objectStoreName),'objectStoreName should be defined');
            console.assert(!angular.isUndefinedOrNullOrEmpty(p_context),'p_context should be defined');
            console.assert(!angular.isUndefinedOrNullOrEmpty(p_value),'p_value should be defined ');
            console.assert(!angular.isUndefinedOrNullOrEmpty(this.mapping),'mapping should be defined');

            var sqlObject = MFMappingHelper.convertAttributeRightIntoLeft({name: p_attributeName, values: [p_value]}, self.mapping);
            console.assert(!angular.isUndefinedOrNullOrEmpty(sqlObject) && !angular.isUndefinedOrNullOrEmpty(sqlObject.values) ,'p_value should be defined ');

            MFDalNoSqlProxy.find(p_context, this.objectStoreName, sqlObject.name, sqlObject.values[0]).then(function(records) {
                if(!angular.isUndefinedOrNullOrEmpty(records) ) {
                    if(records.length > 1){
                        console.warn('[MFDaoNoSqlAbstract.getRecordByAttribute] '+records.length+' records found instead of 1 ',records);
                    }
                    var entity = self.record2Entity(p_context, records[0]);
                    self.resolveCascade(entity, p_context, p_cascadeSet).then(function() {
                        console.log('[MFDaoNoSqlAbstract.getRecordByAttribute] records found : ',entity);
                        deferred.resolve(entity);
                    },
                    function(error){
                        deferred.reject(error);
                    });
                }
                else {
                    console.warn('[MFDaoNoSqlAbstract.getRecordByAttribute] no record found instead of 1 ');
                    deferred.resolve(null);
                }
            }, function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        };
    };
    /**
     * @ngdoc method
     * @name MFDaoNoSqlAbstract#getListRecord
     * @function
     *
     * @description
     * Returns the list of all Records.
     *
     * @param {MFContext} p_context MFContext object
     * @param {Array<String>} p_cascadeSet Array containing children tables names to process
     * @param {Array<Integer>} p_ids Array containing ids of Records to get (optional)
     * @returns {Array<Record>} Returns an Array of Records, including children if required
     */
    MFDaoNoSqlAbstract.prototype._getListRecordByAttribute = function(p_attributeName) {

        console.assert(!angular.isUndefinedOrNullOrEmpty(p_attributeName),'p_attributeName should be defined');

        return function(p_values, p_context, p_cascadeSet) {
            var deferred = $qSync.defer();
            var self = this;
            p_values = MFUtils.toArray(p_values);


            console.assert(!angular.isUndefinedOrNullOrEmpty(this.objectStoreName),'objectStoreName should be defined');
            console.assert(!angular.isUndefinedOrNullOrEmpty(p_context),'p_context should be defined');
            console.assert(!angular.isUndefinedOrNullOrEmpty(p_values) && angular.isArray(p_values),'p_values should be defined and should be an array');
            console.assert(!angular.isUndefinedOrNullOrEmpty(this.mapping),'objectStoreName should be defined');

            var sqlObject = MFMappingHelper.convertAttributeRightIntoLeft({name: p_attributeName, values: p_values}, self.mapping);
            console.assert(!angular.isUndefinedOrNullOrEmpty(sqlObject) && !angular.isUndefinedOrNullOrEmpty(sqlObject.values) ,'p_value should be defined ');

            MFDalNoSqlProxy.find(p_context, this.objectStoreName, sqlObject.name, sqlObject.values).then(function(records) {
                self.records2EntitiesAndCascade(p_context, records, p_cascadeSet).then(
                    function(result) {
                        console.log('[MFDaoNoSqlAbstract.getListRecordByAttribute] records found : ',result);
                        deferred.resolve(result);
                    },
                     function(error){
                         deferred.reject(error);
                     }
                );
            }, function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        };
    };


    MFDaoNoSqlAbstract.prototype._getListRecordByAttributeBis = function(p_attributeName, p_values, p_context, p_cascadeSet) {
        var deferred = $qSync.defer();
        var self = this;
        p_values = MFUtils.toArray(p_values);

        console.assert(!angular.isUndefinedOrNullOrEmpty(this.objectStoreName),'objectStoreName should be defined');
        console.assert(!angular.isUndefinedOrNullOrEmpty(p_context),'p_context should be defined');
        console.assert(!angular.isUndefinedOrNullOrEmpty(p_values) && angular.isArray(p_values),'p_values should be defined and should be an array');
        console.assert(!angular.isUndefinedOrNullOrEmpty(p_attributeName),'p_attributeName should be defined');
        console.assert(!angular.isUndefinedOrNullOrEmpty(this.mapping),'mapping should be defined');


        var sqlObject = MFMappingHelper.convertAttributeRightIntoLeft({name: p_attributeName, values: p_values}, self.mapping);
        console.assert(!angular.isUndefinedOrNullOrEmpty(sqlObject) && !angular.isUndefinedOrNullOrEmpty(sqlObject.values) ,'p_value should be defined ');

        MFDalNoSqlProxy.find(p_context, this.objectStoreName, sqlObject.name, sqlObject.values).then(function(records) {
            self.records2EntitiesAndCascade(p_context, records, p_cascadeSet).then(function(result) {
                console.log('[MFDaoNoSqlAbstract.getListRecordByAttribute] records found : ',result);
                deferred.resolve(result);
            }, function(error) {
                deferred.reject(error);
            });
        }, function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    //==================================================================================
    //========   SAVE & UPDATE
    //==================================================================================


    /**
     * @ngdoc method
     * @name MFDaoNoSqlAbstract#saveRecord
     * @function
     *
     * @description
     * Saves a Record.
     *
     * @param {MFContext} p_context MFContext object
     * @param {Array<String>} p_cascadeSet Array containing children tables names to process
     * @param {Record} p_entity Record to save
     * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
     * @returns {Promise} Returns a promise equal to true if the Record was saved, false otherwise
     */
    MFDaoNoSqlAbstract.prototype._saveRecord = function(p_entity, p_context, p_cascadeSet, p_toSync) {
        var deferred = $qSync.defer();
        var self = this;

        console.assert(!angular.isUndefinedOrNullOrEmpty(this.objectStoreName),'objectStoreName should be defined');
        console.assert(!angular.isUndefinedOrNullOrEmpty(p_context),'p_context should be defined');
        console.assert(!angular.isUndefinedOrNullOrEmpty(p_entity) ,'p_entity should be defined ');
        console.assert(!angular.isUndefinedOrNullOrEmpty(this.mapping),'mapping should be defined');
        console.log('[MFDaoNoSqlAbstract.saveRecord] will save : ',p_entity);

        this.completeChildren(p_entity);
        var record = this.entity2Record(p_context, p_entity);

        this.initIdGeneratorIfNeeded(p_context).then(function() {
            var nextId = self.getNextId();
            var leftIdAttr = MFMappingHelper.getLeftIdAttribute(self.mapping);
            record[leftIdAttr] = nextId;
            p_entity[MFMappingHelper.getRightIdAttribute(self.mapping)] = nextId;
            p_context.addToDaoSession(self.entityName,p_entity);

            self.resolveCascade(p_entity, p_context, p_cascadeSet, 'update').then(function() {
                MFDalNoSqlProxy.insert(p_context, self.objectStoreName, record, leftIdAttr).then(function(result) {
                    console.log('[MFDaoNoSqlAbstract.saveRecord] record saved : ',record);
                    if (p_toSync === true && self.syncDisabled === false) {
                        self.registerEntitiesForSync(p_context, nextId).then(function() {
                            deferred.resolve(p_entity);
                        }, function(error) {
                            deferred.resolve(p_entity);
                        });
                    } else {
                        deferred.resolve(p_entity);
                    }
                }, function(error) {
                    deferred.reject(error);
                });
            }, function(error) {
                deferred.reject(error);
            });
        }, function(error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };


    /**
     * @ngdoc method
     * @name MFDaoNoSqlAbstract#saveListRecord
     * @function
     *
     * @description
     * Saves a list of Records.
     *
     * @param {MFContext} p_context MFContext object
     * @param {Array<String>} p_cascadeSet Array containing children tables names to process
     * @param {Array<Record>} p_entitiesList Array containing Records to save
     * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
     * @returns {Array<Promise>} Returns an Array of promises results
     */
    MFDaoNoSqlAbstract.prototype._saveListRecord = function(p_entitiesList, p_context, p_cascadeSet,p_toSync) {

        var deferred = $qSync.defer();
        var self = this;

        console.assert(!angular.isUndefinedOrNullOrEmpty(this.objectStoreName),'objectStoreName should be defined');
        console.assert(!angular.isUndefinedOrNullOrEmpty(p_context),'p_context should be defined');
        console.assert(!angular.isUndefinedOrNullOrEmpty(p_entitiesList) &&  angular.isArray(p_entitiesList),'p_entity should be defined and an array');
        console.assert(!angular.isUndefinedOrNullOrEmpty(this.mapping),'mapping should be defined');
        console.log('[MFDaoNoSqlAbstract.saveRecord] will save : ',p_entitiesList);

        this.completeChildren(p_entitiesList);
        var records = self.entities2Records(p_context, p_entitiesList);
        var cascadePromises = [];
        var leftIdAttribute = MFMappingHelper.getLeftIdAttribute(self.mapping);
        var rightIdAttribute = MFMappingHelper.getRightIdAttribute(self.mapping);

        this.initIdGeneratorIfNeeded(p_context).then(function() {
            var ids = new Array(p_entitiesList.length);

            for (var i = 0; i < p_entitiesList.length; ++i) {
                var nextId = self.getNextId();
                records[i][leftIdAttribute] = nextId;
                p_entitiesList[i][rightIdAttribute] = nextId;
                ids[i] = nextId;
                cascadePromises.push(self.resolveCascade(p_entitiesList[i], p_context, p_cascadeSet, 'update'));
            }
            p_context.addToDaoSession(self.entityName,p_entitiesList);

            $qSync.all(cascadePromises).then(function() {
                MFDalNoSqlProxy.insert(p_context, self.objectStoreName, records, leftIdAttribute).then(function(result) {
                    console.log('[MFDaoNoSqlAbstract.saveRecord] records saved : ',records);
                    if (p_toSync === true && self.syncDisabled === false) {
                        self.registerEntitiesForSync(p_context, ids).then(function() {
                            deferred.resolve(p_entitiesList);
                        }, function(error) {
                            deferred.resolve(p_entitiesList);
                        });
                    } else {
                        deferred.resolve(p_entitiesList);
                    }
                }, function(error) {
                    deferred.reject(error);
                });
            }, function(error) {
                deferred.reject(error);
            });
        }, function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };


    /**
     * @ngdoc method
     * @name MFDaoNoSqlAbstract#updateRecord
     * @function
     *
     * @description
     * Updates a Record.
     *
     * @param {MFContext} p_context MFContext object
     * @param {Array<String>} p_cascadeSet Array containing children tables names to process
     * @param {Record} p_entity Record to update
     * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
     * @returns {Promise} Returns a promise equal to true if the Record was updated, false otherwise
     */
    MFDaoNoSqlAbstract.prototype._updateRecord = function(p_entity, p_context, p_cascadeSet,p_toSync, p_cascadeSetForDelete) {

        var deferred = $qSync.defer();
        var self = this;

        console.assert(!angular.isUndefinedOrNullOrEmpty(this.objectStoreName),'objectStoreName should be defined');
        console.assert(!angular.isUndefinedOrNullOrEmpty(p_context),'p_context should be defined');
        console.assert(!angular.isUndefinedOrNullOrEmpty(p_entity) ,'p_entity should be defined -');
        console.assert(!angular.isUndefinedOrNullOrEmpty(this.mapping),'mapping should be defined');
        console.log('[MFDaoNoSqlAbstract.updateRecord] will save : ',p_entity);

        this.completeChildren(p_entity);
        p_context.addToDaoSession(this.entityName,p_entity);
        var record = this.entity2Record(p_context, p_entity);
        this.resolveCascade(p_entity, p_context, p_cascadeSet, 'update').then(function() {
            var leftIdAttr = MFMappingHelper.getLeftIdAttribute(self.mapping);
            MFDalNoSqlProxy.save(p_context, self.objectStoreName, record, leftIdAttr).then(function(result) {
                console.log('[MFDaoNoSqlAbstract.updateRecord] records saved : ',record);
                if (p_toSync === true && self.syncDisabled === false) {
                    self.registerEntitiesForSync(p_context, p_entity[MFMappingHelper.getRightIdAttribute(self.mapping)]).then(function() {
                        deferred.resolve(p_entity);
                    }, function(error) {
                        deferred.resolve(p_entity);
                    });
                } else {
                    deferred.resolve(p_entity);
                }
            }, function(error) {
                deferred.reject(error);
            });
        }, function(error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };


    /**
     * @ngdoc method
     * @name MFDaoNoSqlAbstract#updateListRecord
     * @function
     *
     * @description
     * Updates a list of Records.
     *
     * @param {MFContext} p_context MFContext object
     * @param {Array<String>} p_cascadeSet Array containing children tables names to process
     * @param {Array<Record>} p_entitiesList Array containing Records to update
     * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
     * @returns {Array<Promise>} Returns an Array of promises results
     */
    MFDaoNoSqlAbstract.prototype._updateListRecord = function(p_entitiesList,p_context, p_cascadeSet,  p_toSync, p_cascadeSetForDelete) {

        var self = this;
        var deferred = $qSync.defer();

        console.assert(!angular.isUndefinedOrNullOrEmpty(this.objectStoreName),'objectStoreName should be defined');
        console.assert(!angular.isUndefinedOrNullOrEmpty(p_context),'p_context should be defined');
        console.assert(!angular.isUndefinedOrNullOrEmpty(p_entitiesList) && angular.isArray(p_entitiesList) ,'p_entity should be defined and an array');
        console.assert(!angular.isUndefinedOrNullOrEmpty(this.mapping),'mapping should be defined');
        console.log('[MFDaoNoSqlAbstract.updateListRecord] will save : ',p_entitiesList);

        this.completeChildren(p_entitiesList);
        p_context.addToDaoSession(this.entityName,p_entitiesList);

        var records = this.entities2Records(p_context, p_entitiesList);
        var cascadePromises = [];
        for (var i = 0; i < p_entitiesList.length; ++i) {
            cascadePromises.push(this.resolveCascade(p_entitiesList[i], p_context, p_cascadeSet, 'update'));
        }
        $qSync.all(cascadePromises).then(function() {
            var leftIdAttr = MFMappingHelper.getLeftIdAttribute(self.mapping);
            MFDalNoSqlProxy.save(p_context, self.objectStoreName, records, leftIdAttr).then(function(result) {
                console.log('[MFDaoNoSqlAbstract.updateListRecord] records saved : ',records);
                if (p_toSync === true && self.syncDisabled === false) {
                    var ids = new Array(p_entitiesList.length);
                    for (var i = 0; i < p_entitiesList.length; ++i) {
                        ids[i] = p_entitiesList[i][MFMappingHelper.getRightIdAttribute(self.mapping)];
                    }
                    self.registerEntitiesForSync(p_context, ids).then(function() {
                        deferred.resolve(p_entitiesList);
                    }, function(error) {
                        deferred.resolve(p_entitiesList);
                    });
                } else {
                    deferred.resolve(p_entitiesList);
                }
            }, function(error) {
                deferred.reject(error);
            });
        }, function(error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };


    /**
     * @ngdoc method
     * @name MFDaoNoSqlAbstract#saveOrUpdateRecord
     * @function
     *
     * @description
     * Save or updates a Record, according to its ID value.
     *
     * @param {MFContext} p_context MFContext object
     * @param {Array<String>} p_cascadeSet Array containing children tables names to process
     * @param {Record} p_entity Record to save or update
     * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
     * @returns {Promise} Returns a promise equal to true if the Record was saved or updated, false otherwise
     */
    MFDaoNoSqlAbstract.prototype._saveOrUpdateRecord = function(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {
        if (p_entity[MFMappingHelper.getRightIdAttribute(this.mapping)] === -1) {
            return this._saveRecord(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
        } else {
            return this._updateRecord(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
        }
    };


    /**
     * @ngdoc method
     * @name MFDaoNoSqlAbstract#saveOrUpdateListRecord
     * @function
     *
     * @description
     * Save or updates a list of Records.
     *
     * @param {MFContext} p_context MFContext object
     * @param {Array<String>} p_cascadeSet Array containing children tables names to process
     * @param {Array<Record>} p_entitiesList Array containing Records to save or update
     * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
     * @returns {Array<Promise>} Returns an Array of promises results
     */
    MFDaoNoSqlAbstract.prototype._saveOrUpdateListRecord = function(p_entitiesList, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {
        var entitiesToSave  =  [];
        var entitiesToUpdate = [];
        for (var i = 0; i < p_entitiesList.length; ++i) {
            if (p_entitiesList[i][MFMappingHelper.getRightIdAttribute(this.mapping)] === -1) {
                entitiesToSave.push(p_entitiesList[i]);
            } else {
                entitiesToUpdate.push(p_entitiesList[i]);
            }
        }
        return $qSync.all([this._saveListRecord(entitiesToSave, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete),
                           this._updateListRecord(entitiesToUpdate, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete)]);
    };


    //==================================================================================
    //========   DELETE
    //==================================================================================


    MFDaoNoSqlAbstract.prototype._deleteRecordById = function(p_entityId, p_context, p_cascadeSet, p_toSync) {
        var deferred = $qSync.defer();
        var self = this;

        console.assert(!angular.isUndefinedOrNullOrEmpty(this.objectStoreName),'objectStoreName should be defined');
        console.assert(!angular.isUndefinedOrNullOrEmpty(p_context),'p_context should be defined');
        console.assert(!angular.isUndefinedOrNull(p_entityId)  ,'p_entityId should be defined ');
        console.assert(!angular.isUndefinedOrNullOrEmpty(this.mapping),'mapping should be defined');
        console.log('[MFDaoNoSqlAbstract._deleteRecordById] will delete : ',p_entityId);

        self._getRecordById(p_entityId, p_context, p_cascadeSet).then(function(entity) {
            self._deleteRecord(entity, p_context, p_cascadeSet, p_toSync).then(function(result) {
                console.log('[MFDaoNoSqlAbstract._deleteRecordById]  deleted : ',result);
                deferred.resolve(result);
            }, function(error) {
                deferred.reject(error);
            });
        }, function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };


    MFDaoNoSqlAbstract.prototype._deleteRecordByAttribute = function(p_attributeName) {

        console.assert(!angular.isUndefinedOrNullOrEmpty(p_attributeName),'p_attributeName should be defined');

        var getRecordFunction = this._getRecordByAttribute(p_attributeName);

        return  function(p_value, p_context, p_cascadeSet, p_toSync) {

            var deferred = $qSync.defer();
            var self = this;

            console.assert(!angular.isUndefinedOrNullOrEmpty(this.objectStoreName),'objectStoreName should be defined');
            console.assert(!angular.isUndefinedOrNullOrEmpty(p_context),'p_context should be defined');
            console.assert(!angular.isUndefinedOrNullOrEmpty(p_value)  ,'p_value should be defined ');
            console.assert(!angular.isUndefinedOrNullOrEmpty(this.mapping),'mapping should be defined');
            console.log('[MFDaoNoSqlAbstract._deleteRecordByAttribute] will delete : '+p_attributeName+' = ',p_value);

            getRecordFunction(p_value, p_context, p_cascadeSet).then(function(entity) {
                self._deleteRecord(entity, p_context, p_cascadeSet, p_toSync).then(function() {
                    console.log('[MFDaoNoSqlAbstract._deleteRecordByAttribute]  deleted : ',entity);
                    deferred.resolve();
                }, function(error) {
                    deferred.reject(error);
                });
            }, function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        };
    };

    /**
     * @ngdoc method
     * @name MFDaoNoSqlAbstract#deleteRecord
     * @function
     *
     * @description
     * Deletes a Record.
     *
     * @param {MFContext} p_context MFContext object
     * @param {Array<String>} p_cascadeSet Array containing children tables names to process
     * @param {Record} p_entity Record to delete
     * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
     * @returns {Promise} Returns a promise equal to true if the Record was deleted, false otherwise
     */
    MFDaoNoSqlAbstract.prototype._deleteRecord = function(p_entity, p_context, p_cascadeSet, p_toSync) {
        var deferred = $qSync.defer();
        var self = this;

        console.assert(!angular.isUndefinedOrNullOrEmpty(this.objectStoreName),'objectStoreName should be defined');
        console.assert(!angular.isUndefinedOrNullOrEmpty(p_context),'p_context should be defined');
        console.assert(!angular.isUndefinedOrNullOrEmpty(p_entity)  ,'p_entity should be defined ');
        console.assert(!angular.isUndefinedOrNullOrEmpty(this.mapping),'mapping should be defined');
        console.log('[MFDaoNoSqlAbstract._deleteRecord] will delete : ',p_entity);

        p_entity._deleted = true;
        p_context.addToDaoSession(self.entityName,p_entity);

        this.resolveCascade(p_entity, p_context, p_cascadeSet, 'delete').then(function() {
            var idToRemove = p_entity[MFMappingHelper.getRightIdAttribute(self.mapping)];
            MFDalNoSqlProxy.remove(p_context, self.objectStoreName, idToRemove).then(function(result) {
                console.log('[MFDaoNoSqlAbstract._deleteRecord]  deleted : ',idToRemove);
                if (p_toSync === true && self.syncDisabled === false) {
                    if (idToRemove < 0) {
                        self.unregisterEntitiesForSync(p_context, idToRemove).then(function () {
                            deferred.resolve(idToRemove);
                        }, function(error) {
                            deferred.resolve(idToRemove);
                        });
                    } else {
                        self.registerEntitiesForSync(p_context, idToRemove).then(function () {
                            deferred.resolve(idToRemove);
                        }, function(error) {
                            deferred.resolve(idToRemove);
                        });
                    }
                }
                else {
                    deferred.resolve(result);
                }
            }, function(error) {
                deferred.reject(error);
            });
        }, function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };


    /**
     * @ngdoc method
     * @name MFDaoNoSqlAbstract#deleteListRecord
     * @function
     *
     * @description
     * Deletes a list of Records.
     *
     * @param {MFContext} p_context MFContext object
     * @param {Array<String>} p_cascadeSet Array containing children tables names to process
     * @param {Record} p_entitiesList Array containing Records to delete
     * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
     * @returns {Array<Promise>} Returns an Array of promises results
     */
    MFDaoNoSqlAbstract.prototype._deleteListRecordByIds = function( p_entitiesIdList, p_context, p_cascadeSet,p_toSync) {
        var deferred = $qSync.defer();
        var self = this;

        console.assert(!angular.isUndefinedOrNullOrEmpty(this.objectStoreName),'objectStoreName should be defined');
        console.assert(!angular.isUndefinedOrNullOrEmpty(p_context),'p_context should be defined');
        console.assert(!angular.isUndefinedOrNullOrEmpty(p_entitiesIdList) && angular.isArray(p_entitiesIdList) ,'p_entitiesIdList should be defined and an array');
        console.assert(!angular.isUndefinedOrNullOrEmpty(this.mapping),'mapping should be defined');
        console.log('[MFDaoNoSqlAbstract._deleteListRecordByIds] will delete : ',p_entitiesIdList);

        var synchronizedIds = [];
        var unSynchronizedIds = [];
        if (p_toSync === true && self.syncDisabled === false) {
            for (var i = 0; i < p_entitiesIdList.length; ++i) {
                if (p_entitiesIdList[i] < 0) {
                    unSynchronizedIds.push(p_entitiesIdList[i]);
                } else {
                    synchronizedIds.push(p_entitiesIdList[i]);
                }
            }
        }
        MFDalNoSqlProxy.remove(p_context, this.objectStoreName, p_entitiesIdList).then(function(result) {
            console.log('[MFDaoNoSqlAbstract._deleteListRecordByIds]  deleted : ',p_entitiesIdList);
            if (p_toSync === true && self.syncDisabled === false) {
                $qSync.all([self.registerEntitiesForSync(p_context, synchronizedIds),
                    self.unregisterEntitiesForSync(p_context, unSynchronizedIds)
                ]).then(function () {
                    deferred.resolve(result);
                }, function (error) {
                    deferred.resolve(result);
                });
            }
            else {
                deferred.resolve(result);
            }
        }, function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    /**
     * @ngdoc method
     * @name MFDaoNoSqlAbstract#deleteListRecord
     * @function
     *
     * @description
     * Deletes a list of Records.
     *
     * @param {MFContext} p_context MFContext object
     * @param {Array<String>} p_cascadeSet Array containing children tables names to process
     * @param {Record} p_entitiesList Array containing Records to delete
     * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
     * @returns {Array<Promise>} Returns an Array of promises results
     */
    MFDaoNoSqlAbstract.prototype._deleteListRecord = function(p_entitiesList, p_context, p_cascadeSet, p_toSync) {
        var deferred = $qSync.defer();
        var self = this;

        console.assert(!angular.isUndefinedOrNullOrEmpty(this.objectStoreName),'objectStoreName should be defined');
        console.assert(!angular.isUndefinedOrNullOrEmpty(p_context),'p_context should be defined');
        console.assert(!angular.isUndefinedOrNullOrEmpty(p_entitiesList) && angular.isArray(p_entitiesList) ,'p_entitiesList should be defined and an array');
        console.assert(!angular.isUndefinedOrNullOrEmpty(this.mapping),'mapping should be defined');
        console.log('[MFDaoNoSqlAbstract._deleteListRecordByIds] will delete : ',p_entitiesList);

        var rightIdAttribute = MFMappingHelper.getRightIdAttribute(self.mapping);
        var ids = new Array(p_entitiesList.length);
        var i, ii;
        for (i = 0; i < p_entitiesList.length; ++i) {
            ids[i] = p_entitiesList[i][rightIdAttribute];
        }
        var promisesCascade = [];
        for (i = 0, ii = p_entitiesList.length; i < ii; ++i) {
            promisesCascade.push(this.resolveCascade(p_entitiesList[i], p_context, p_cascadeSet, 'delete'));
        }
        $qSync.all(promisesCascade).then(function() {
            self._deleteListRecordByIds(ids, p_context, p_cascadeSet, p_toSync).then(function() {
                console.log('[MFDaoNoSqlAbstract._deleteListRecord] deleted : ',p_entitiesList);
                deferred.resolve(p_entitiesList);
            }, function(error) {
                deferred.reject(error);
            });
        }, function(error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };

    /**
     * @ngdoc method
     * @name MFDaoSqlAbstract#registerEntitiesForSync
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
    MFDaoNoSqlAbstract.prototype.registerEntitiesForSync = function(p_context, p_ids) {

        console.assert(!angular.isUndefinedOrNullOrEmpty(this.objectStoreName),'objectStoreName should be defined');
        console.assert(!angular.isUndefinedOrNullOrEmpty(p_context),'p_context should be defined');

        p_ids = Array.isArray(p_ids) ? p_ids : [p_ids];
        var deferred = $qSync.defer();
        var self = this;
        var records = [];
        for (var i = 0; i < p_ids.length; ++i) {
            if(!angular.isUndefinedOrNullOrEmpty( p_ids[i])){
                records.push({
                    id: self.objectStoreName + '#' + p_ids[i],
                    objectId: p_ids[i],
                    objectName: self.objectStoreName
                });
            }
        }
        MFDalNoSqlProxy.save(p_context,  'ObjectToSynchronize', records, 'id').then(function(result) {
            deferred.resolve(result);
        }, function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };


    /**
     * @ngdoc method
     * @name MFDaoSqlAbstract#unregisterEntitiesForSync
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
    MFDaoNoSqlAbstract.prototype.unregisterEntitiesForSync = function(p_context, p_ids) {

        var deferred = $qSync.defer();
        var self = this;

        console.assert(!angular.isUndefinedOrNullOrEmpty(this.objectStoreName),'objectStoreName should be defined');
        console.assert(!angular.isUndefinedOrNullOrEmpty(p_context),'p_context should be defined');

        p_ids = Array.isArray(p_ids) ? p_ids : [p_ids];
        var ids = [];
        for (var i = 0; i < p_ids.length; ++i) {
            if(!angular.isUndefinedOrNullOrEmpty( p_ids[i])) {
                ids.push(self.objectStoreName + '#' + p_ids[i]);
            }
        }
        MFDalNoSqlProxy.remove(p_context, 'ObjectToSynchronize', ids).then(function(result) {
            deferred.resolve(result);
        }, function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    MFDaoNoSqlAbstract.prototype.record2Entity = function(p_context, record) {
        return  MFMappingHelper.convertLeftIntoRight(record, this.mapping, p_context.daoSession);
    };

    MFDaoNoSqlAbstract.prototype.entity2Record = function(p_context, entity) {
        return MFMappingHelper.convertRightIntoLeft(entity, this.mapping, p_context.daoSession);
    };

    MFDaoNoSqlAbstract.prototype.records2EntitiesAndCascade = function(p_context, records, cascade) {
        var deferred = $qSync.defer();
        if (!Array.isArray(records)) {
            var recordsArray = [];
            for (var id in records) {
                recordsArray.push(records[id]);
            }
            records = recordsArray;
        }
        var entities = MFMappingHelper.convertListLeftIntoRight(records, this.mapping, p_context.daoSession);
        var promises = [];
        for (var i = 0, ii = entities.length; i < ii; ++i) {
            promises.push(this.resolveCascade(entities[i], p_context, cascade));
        }
        $qSync.all(promises).then(function() {
            deferred.resolve(entities);
        },function(error) {
            console.error(entities);
            deferred.reject(error);
        });
        return deferred.promise;
    };

    MFDaoNoSqlAbstract.prototype.entities2Records = function(p_context, entities) {
        return MFMappingHelper.convertListRightIntoLeft(entities, this.mapping, p_context.daoSession);
    };

    MFDaoNoSqlAbstract.prototype.initIdGeneratorIfNeeded = function(p_context) {
        var deferred = $qSync.defer();
        var self = this;
        if (!this.lastId) {
            MFDalNoSqlProxy.getLastId(p_context, this.objectStoreName).then(function(id) {
                self.lastId = id;
                deferred.resolve(id);
            },function(error) {
                deferred.reject(error);
            });
        } else {
            deferred.resolve(self.lastId);
        }

        return deferred.promise;
    };

    MFDaoNoSqlAbstract.prototype.getNextId = function() {
        return --this.lastId;
    };

/*
=========================
=== RESOLVE CASCADE =====
 */

   var deleteMissingChildren = function(entity, attribute, p_context,childDao,subCascade, p_toSync, childAttrPointingParent ) {
       var self = this;

       return childDao._getListRecordByAttributeBis(childAttrPointingParent, entity, p_context, subCascade).then(function(existingChildren){

           if(!angular.isUndefinedOrNullOrEmpty(existingChildren)){
               var entitiesToDelete = [];
               var i, ii;
               var rightIdAttribute = MFMappingHelper.getRightIdAttribute(childDao.mapping);
               existingChildren = MFUtils.toArray(existingChildren);

               if(angular.isArray(entity[attribute])){
                   var remainingChildrenIds = [];
                   for (i = 0, ii = entity[attribute].length; i < ii; ++i) {
                       remainingChildrenIds[i] = entity[attribute][i][rightIdAttribute];
                   }

                   for (i = 0, ii = existingChildren.length; i < ii; ++i) {
                       if(remainingChildrenIds.indexOf(existingChildren[i][rightIdAttribute]) === -1) {
                           entitiesToDelete.push(existingChildren[i]);
                       }
                   }
               }
               else {
                   for (i = 0, ii = existingChildren.length; i < ii; ++i) {
                       var currChildId = entity[attribute][rightIdAttribute];
                       if(currChildId !== existingChildren[i][rightIdAttribute]) {
                           entitiesToDelete.push(existingChildren[i]);
                       }
                   }
               }
               return childDao._deleteListRecord(entitiesToDelete, p_context, subCascade, p_toSync);
           }
       });
   };

    var updateChildrenFkWhenParentRemoved = function(entity, p_context, childDao,subCascade, p_toSync, childAttrPointingParent) {
        return childDao._getListRecordByAttributeBis(childAttrPointingParent, entity, p_context, subCascade).then(function(existingChildren){

            //remove from each child the reference to the parent
            for (var i = 0, ii = existingChildren.length; i < ii; ++i) {
                if(angular.isArray(existingChildren[i][childAttrPointingParent])){
                    var newFkList = [];
                    for (var fkIdx = 0; fkIdx < existingChildren[i][childAttrPointingParent].length; fkIdx++) {
                        var currFk = existingChildren[i][childAttrPointingParent][fkIdx];
                        if(currFk.idToString !== entity.idToString){
                            newFkList.push(currFk);
                        }
                    }
                    existingChildren[i][childAttrPointingParent] = newFkList;
                }
                else {
                    existingChildren[i][childAttrPointingParent] = null;
                }
            }
            return childDao._updateListRecord(existingChildren, p_context, subCascade, p_toSync);
        });
    };






    MFDaoNoSqlAbstract.prototype.resolveCascade = function(entity, p_context, cascade, operation, p_toSync) {
        var deferred = $qSync.defer();
        var self = this;
        operation = operation === undefined ? 'read' : operation;

        var subCascade = cascade.slice(0, cascade.length);
        var cascadePromises = [];
        var cascadePromise;
        var setResult = function(entity, attribute, results) {
            entity[attribute] = results;
        };

        for (var attribute in this.cascadeDefinition) {
            var index = subCascade.indexOf(attribute);
            var cascadeRequested = index > -1;
            if (cascadeRequested) {
                subCascade.splice(index, 1);
            }
            var attributeDefinition = this.cascadeDefinition[attribute];
            var foreignDao = this.daoTable[attributeDefinition.foreignEntity];
            if (foreignDao === undefined) {
                $injector.get(attributeDefinition.foreignEntity + 'DaoNoSql');
                foreignDao = this.daoTable[attributeDefinition.foreignEntity];
            }

            console.assert(!attributeDefinition.composite || attributeDefinition.cardinality === 'one-to-one' || attributeDefinition.cardinality === 'one-to-many', 'This relationship cannot be composite!!');
            if(cascadeRequested ||attributeDefinition.composite){
                switch (operation) {
                    case 'read':
                        switch (attributeDefinition.cardinality) {
                            case 'one-to-one':
                            case 'many-to-one':
                                cascadePromise = foreignDao._getRecordById(entity[attribute][MFMappingHelper.getRightIdAttribute(foreignDao.mapping)], p_context, subCascade);
                                cascadePromises.push(cascadePromise);
                                break;
                            case 'one-to-many':
                                cascadePromise = foreignDao._getListRecordByAttributeBis(attributeDefinition.childAttrPointingParent, entity, p_context, subCascade);
                                cascadePromise.then(setResult.bind(null, entity, attribute));
                                cascadePromises.push(cascadePromise);
                                break;
                            case 'many-to-many':
                                var ids = [];
                                for (var i = 0, ii = entity[attribute].length; i < ii; ++i) {
                                    ids[i] = entity[attribute][i][MFMappingHelper.getRightIdAttribute(self.mapping)];
                                }
                                cascadePromise = foreignDao._getListRecordByIds(ids, p_context, subCascade);
                                cascadePromises.push(cascadePromise);
                                break;
                        }
                        break;
                    case 'save':
                        switch (attributeDefinition.cardinality) {
                            case 'one-to-one':
                            case 'many-to-one':
                                cascadePromise = foreignDao._saveOrUpdateRecord(entity[attribute], p_context, subCascade, p_toSync);
                                cascadePromises.push(cascadePromise);
                                break;
                            case 'one-to-many':
                            case 'many-to-many':
                                cascadePromise = foreignDao._saveOrUpdateListRecord(entity[attribute], p_context, subCascade, p_toSync);
                                cascadePromises.push(cascadePromise);
                                break;
                        }
                        break;
                    case 'update':
                        switch (attributeDefinition.cardinality) {
                            case 'one-to-one':
                                  cascadePromise = deleteMissingChildren( entity, attribute, p_context,foreignDao, subCascade, p_toSync, attributeDefinition.childAttrPointingParent);
                                  cascadePromises.push(cascadePromise);
                                  cascadePromise = foreignDao._saveOrUpdateRecord(entity[attribute], p_context, subCascade, p_toSync);
                                  cascadePromises.push(cascadePromise);
                                  break;
                            case 'many-to-one':
                                cascadePromise = foreignDao._saveOrUpdateRecord(entity[attribute], p_context, subCascade, p_toSync);
                                cascadePromises.push(cascadePromise);
                                break;

                            case 'one-to-many':
                                cascadePromise = deleteMissingChildren( entity, attribute, p_context,foreignDao, subCascade, p_toSync, attributeDefinition.childAttrPointingParent);
                                cascadePromises.push(cascadePromise);
                                cascadePromise = foreignDao._saveOrUpdateListRecord(entity[attribute], p_context, subCascade, p_toSync);
                                cascadePromises.push(cascadePromise);
                                break;
                            case 'many-to-many':
                                cascadePromise = foreignDao._saveOrUpdateListRecord(entity[attribute], p_context, subCascade, p_toSync);
                                cascadePromises.push(cascadePromise);
                                break;
                        }
                        break;
                    case 'delete':
                        switch (attributeDefinition.cardinality) {
                            case 'one-to-one':
                                cascadePromise = foreignDao._deleteRecord(entity[attribute], p_context, subCascade, p_toSync);
                                cascadePromises.push(cascadePromise);
                                break;
                            case 'many-to-one':
                                var errorMsg1 = 'The cascade of delete is forbidden for the relationships many-to-one';
                                console.error(errorMsg1);
                                deferred.reject(errorMsg1);
                                break;
                            case 'one-to-many':
                                cascadePromise = foreignDao._deleteListRecord(entity[attribute], p_context, subCascade, p_toSync);
                                cascadePromises.push(cascadePromise);
                                break;
                            case 'many-to-many':
                                var errorMsg2 = 'The cascade of delete is forbidden for the relationships many-to-many';
                                console.error(errorMsg2);
                                deferred.reject(errorMsg2);
                                break;
                        }
                        break;
                }
            }
            else if((attributeDefinition.cardinality === 'many-to-many' || attributeDefinition.cardinality === 'one-to-many' || attributeDefinition.cardinality === 'one-to-one')  && operation === 'delete' && !angular.isUndefinedOrNull(attributeDefinition.childAttrPointingParent)){
                cascadePromise = updateChildrenFkWhenParentRemoved(entity, p_context, foreignDao,subCascade, p_toSync, attributeDefinition.childAttrPointingParent);
                cascadePromises.push(cascadePromise);
            }
        }
        $qSync.all(cascadePromises).then(function(result) {
            deferred.resolve(result);
        },
        function(error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };





    MFDaoNoSqlAbstract.prototype.completeChildren = function(p_entity) {
        var entitiesList = MFUtils.toArray(p_entity);

        for(var entIdx = 0; entIdx < entitiesList.length; entIdx++){
            var currentEntity = entitiesList[entIdx];

            for (var attribute in this.cascadeDefinition) {
                var children = currentEntity[attribute];
                if(!angular.isUndefinedOrNullOrEmpty(children)){
                    children = MFUtils.toArray(children);
                    for (var i = 0; i < children.length; i++) {
                        var mappingDefinitionRecord = this.cascadeDefinition[attribute];
                        if ( !angular.isUndefinedOrNullOrEmpty(mappingDefinitionRecord.childAttrPointingParent)) {
                            var parentAttribute = children[i][mappingDefinitionRecord.childAttrPointingParent];
                            if (angular.isUndefinedOrNull(parentAttribute)) {
                                children[i][mappingDefinitionRecord.childAttrPointingParent] = currentEntity;
                            }
                        }
                    }
                }
            }
        }
    };


    return new MFDaoNoSqlAbstract('MFDaoSqlAbstract');
}]);