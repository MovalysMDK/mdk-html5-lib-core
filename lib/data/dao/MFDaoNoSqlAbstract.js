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
        MFDalNoSqlProxy.find(p_context, this.objectStoreName, p_id).then(function(record) {
            if (record !== null) {
                self.record2Entity(p_context, record, p_cascadeSet).then(function(result) {
                    deferred.resolve(result);
                });
            } else {
                deferred.resolve(null);
            }
        }, function(dalError) {
            p_context.addError(dalError);
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
        MFDalNoSqlProxy.find(p_context, this.objectStoreName).then(function(records) {
            self.records2Entities(p_context, records, p_cascadeSet).then(function(result) {
                p_context.fullListDone.push(self.entityName);
                deferred.resolve(result);
            });
        }, function(dalError) {
            p_context.addError(dalError);
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
        MFDalNoSqlProxy.find(p_context, this.objectStoreName, p_ids).then(function(records) {
            self.records2Entities(p_context, records, p_cascadeSet).then(function(result) {
                deferred.resolve(result);
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
        return function(p_value, p_context, p_cascadeSet) {
            var deferred = $qSync.defer();
            var self = this;
            var sqlObject = MFMappingHelper.convertAttributeRightIntoLeft({name: p_attributeName, values: [p_value]}, self.mapping);
            if(angular.isUndefinedOrNull(sqlObject.values) || sqlObject.values.length !== 1){
                deferred.reject('the parameter p_value of _getRecordByAttribute() is required');
            }
            else {
                MFDalNoSqlProxy.find(p_context, this.objectStoreName, sqlObject.name, sqlObject.values[0]).then(function(records) {
                    if(!angular.isUndefinedOrNullOrEmpty(records) ) {
                        self.record2Entity(p_context, records[0], p_cascadeSet).then(
                            function (result) {
                                deferred.resolve(result);
                            },
                            function(error){
                                deferred.reject(error);
                            }
                        );
                    }
                    else {
                        deferred.reject('No record found');
                    }
                }, function(error) {
                    deferred.reject(error);
                });

            }

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
        return function(p_values, p_context, p_cascadeSet) {
            var deferred = $qSync.defer();
            var self = this;
            p_values = MFUtils.toArray(p_values);

            var sqlObject = MFMappingHelper.convertAttributeRightIntoLeft({name: p_attributeName, values: p_values}, self.mapping);

            MFDalNoSqlProxy.find(p_context, this.objectStoreName, sqlObject.name, sqlObject.values).then(function(records) {
                self.records2Entities(p_context, records, p_cascadeSet).then(
                    function(result) {
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

        var sqlObject = MFMappingHelper.convertAttributeRightIntoLeft({name: p_attributeName, values: p_values}, self.mapping);

        MFDalNoSqlProxy.find(p_context, this.objectStoreName, sqlObject.name, sqlObject.values).then(function(records) {
            self.records2Entities(p_context, records, p_cascadeSet).then(function(result) {
                deferred.resolve(result);
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
        p_toSync = p_toSync === undefined || p_toSync;
        var deferred = $qSync.defer();
         this.completeChildren(p_entity);
        var record = this.entity2Record(p_context, p_entity);
        var self = this;
        this.initIdGeneratorIfNeeded(p_context).then(function() {
            var nextId = self.getNextId();
            var leftIdAttr = MFMappingHelper.getLeftIdAttribute(self.mapping);
            record[leftIdAttr] = nextId;
            p_entity[MFMappingHelper.getRightIdAttribute(self.mapping)] = nextId;
            p_context.addToDaoSession(self.entityName,p_entity);

            self.resolveCascade(p_entity, p_context, p_cascadeSet, 'update').then(function() {
                MFDalNoSqlProxy.insert(p_context, self.objectStoreName, record, leftIdAttr).then(function(result) {
                    if (p_toSync && !self.syncDisabled) {
                        self.registerEntitiesForSync(p_context, p_entity[MFMappingHelper.getRightIdAttribute(self.mapping)]).then(function() {
                            deferred.resolve(result);
                        });
                    } else {
                        deferred.resolve(result);
                    }
                }, function(error) {
                    deferred.reject(error);
                });
            });
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
        p_toSync = p_toSync === undefined || p_toSync;
        var deferred = $qSync.defer();
        var self = this;
        this.completeChildren(p_entitiesList);
        var records = self.entities2Records(p_context, p_entitiesList);
        var cascadePromises = [];
        this.initIdGeneratorIfNeeded(p_context).then(function() {
            var ids = new Array(p_entitiesList.length);
            var leftIdAttr = MFMappingHelper.getLeftIdAttribute(self.mapping);
            var rightIdAttr = MFMappingHelper.getLeftIdAttribute(self.mapping);

            for (var i = 0; i < p_entitiesList.length; ++i) {
                var nextId = self.getNextId();
                records[i][leftIdAttr] = nextId;
                p_entitiesList[i][rightIdAttr] = nextId;
                ids[i] = nextId;
                cascadePromises.push(self.resolveCascade(p_entitiesList[i], p_context, p_cascadeSet, 'update'));
            }
            p_context.addToDaoSession(self.entityName,p_entitiesList);

            $qSync.all(cascadePromises).then(function() {
                MFDalNoSqlProxy.insert(p_context, self.objectStoreName, records, leftIdAttr).then(function(result) {
                    if (p_toSync && !self.syncDisabled) {
                        self.registerEntitiesForSync(p_context, ids).then(function() {
                            deferred.resolve(result);
                        });
                    } else {
                        deferred.resolve(result);
                    }
                }, function(error) {
                    deferred.reject(error);
                });
            }, function(error) {
                deferred.reject(error);
            });
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

        p_context.addToDaoSession(this.entityName,p_entity);
        p_toSync = p_toSync === undefined || p_toSync;
        var deferred = $qSync.defer();
        this.completeChildren(p_entity);
        var record = this.entity2Record(p_context, p_entity);
        var self = this;
        this.resolveCascade(p_entity, p_context, p_cascadeSet, 'update').then(function() {
            var leftIdAttr = MFMappingHelper.getLeftIdAttribute(self.mapping);
            MFDalNoSqlProxy.save(p_context, self.objectStoreName, record, leftIdAttr).then(function(result) {
                if (p_toSync && !self.syncDisabled) {
                    self.registerEntitiesForSync(p_context, p_entity[MFMappingHelper.getRightIdAttribute(self.mapping)]).then(function() {
                        deferred.resolve(result);
                    });
                } else {
                    deferred.resolve(result);
                }
            }, function(error) {
                deferred.reject(error);
            });
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
        p_context.addToDaoSession(this.entityName,p_entitiesList);
        p_toSync = p_toSync === undefined || p_toSync;
        var deferred = $qSync.defer();
        this.completeChildren(p_entitiesList);
        var records = this.entities2Records(p_context, p_entitiesList);
        var self = this;
        var cascadePromises = [];
        for (var i = 0; i < p_entitiesList.length; ++i) {
            cascadePromises.push(this.resolveCascade(p_entitiesList[i], p_context, p_cascadeSet, 'update'));
        }
        $qSync.all(cascadePromises).then(function() {
            var leftIdAttr = MFMappingHelper.getLeftIdAttribute(self.mapping);
            MFDalNoSqlProxy.save(p_context, self.objectStoreName, records, leftIdAttr).then(function(result) {
                var ids = new Array(p_entitiesList.length);
                for (var i = 0; i < p_entitiesList.length; ++i) {
                    ids[i] = p_entitiesList[i][MFMappingHelper.getRightIdAttribute(self.mapping)];
                }
                if (p_toSync && !self.syncDisabled) {
                    self.registerEntitiesForSync(p_context, ids).then(function() {
                        deferred.resolve(result);
                    });
                } else {
                    deferred.resolve(result);
                }
            }, function(error) {
                deferred.reject(error);
            });
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
        p_toSync = p_toSync === undefined || p_toSync;
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
        p_toSync = p_toSync === undefined || p_toSync;
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
        p_toSync = p_toSync === undefined || p_toSync;
        var deferred = $qSync.defer();
        var self = this;
        //TODO refactor to call deleteRecord
        this._getRecordById(p_entityId, p_context, p_cascadeSet).then(function(result) {
            this._deleteRecord(result, p_context, p_cascadeSet, p_toSync).then(function() {
                deferred.resolve();
            }, function(error) {
                deferred.reject(error);
            });
        }, function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };


    MFDaoNoSqlAbstract.prototype._deleteRecordByAttribute = function(p_attributeName) {
        var getRecordFunction = this._getRecordByAttribute(p_attributeName);

        return  function(p_value, p_context, p_cascadeSet, p_toSync) {

            p_toSync = p_toSync === undefined || p_toSync;
            var deferred = $qSync.defer();
            var self = this;
            getRecordFunction(p_value, p_context, p_cascadeSet).then(function(result) {
                this._deleteRecord(result, p_context, p_cascadeSet, p_toSync).then(function() {
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
        p_toSync = p_toSync === undefined || p_toSync;
        var deferred = $qSync.defer();
        var self = this;
        p_entity._deleted = true;
        p_context.addToDaoSession(self.entityName,p_entity);

        this.resolveCascade(p_entity, p_context, p_cascadeSet, 'delete').then(function() {
            MFDalNoSqlProxy.remove(p_context, self.objectStoreName, p_entity[MFMappingHelper.getRightIdAttribute(self.mapping)]).then(function(result) {
                if (p_entity[MFMappingHelper.getRightIdAttribute(self.mapping)] < 0) {
                    self.unregisterEntitiesForSync(p_context, p_entity[MFMappingHelper.getRightIdAttribute(self.mapping)]).then(function() { deferred.resolve(result); });
                } else {
                    self.registerEntitiesForSync(p_context, p_entity[MFMappingHelper.getRightIdAttribute(self.mapping)]).then(function() { deferred.resolve(result); });
                }
            }, function(error) {
                deferred.reject(error);
            });
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
        p_toSync = p_toSync === undefined || p_toSync;
        var deferred = $qSync.defer();
        var self = this;
        var synchronizedIds = [];
        var unSynchronizedIds = [];
        for (var i = 0; i < p_entitiesIdList.length; ++i) {
            if (p_entitiesIdList[i] < 0) {
                unSynchronizedIds.push(p_entitiesIdList[i]);
            } else {
                synchronizedIds.push(p_entitiesIdList[i]);
            }
        }
        MFDalNoSqlProxy.remove(p_context, this.objectStoreName, p_entitiesIdList).then(function(result) {
            $qSync.all([self.registerEntitiesForSync(p_context, synchronizedIds),
                        self.unregisterEntitiesForSync(p_context, unSynchronizedIds)
                        ]).then(function() {
                            deferred.resolve();
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
    MFDaoNoSqlAbstract.prototype._deleteListRecord = function(p_entitiesList, p_context, p_cascadeSet, p_toSync) {
        p_toSync = p_toSync === undefined || p_toSync;
        var deferred = $qSync.defer();
        var self = this;
        var ids = new Array(p_entitiesList.length);
        var i, ii;
        for (i = 0; i < p_entitiesList.length; ++i) {
            ids[i] = p_entitiesList[i][MFMappingHelper.getRightIdAttribute(self.mapping)];
        }
        var promises = [];
        for (i = 0, ii = p_entitiesList.length; i < ii; ++i) {
            promises.push(this.resolveCascade(p_entitiesList[i], p_context, p_cascadeSet, 'delete'));
        }
        $qSync.all(promises).then(function() {
            self._deleteListRecordByIds(ids, p_context, p_cascadeSet, p_toSync).then(function() {
                deferred.resolve(p_entitiesList);
            }, function(error) {
                deferred.reject(error);
            });
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
        p_ids = Array.isArray(p_ids) ? p_ids : [p_ids];
        var deferred = $qSync.defer();
        var self = this;
        var records = new Array(p_ids.length);
        for (var i = 0; i < p_ids.length; ++i) {
            records[i] = {
                    id: self.objectStoreName + '#' + p_ids[i],
                    objectId: p_ids[i],
                    objectName: self.objectStoreName
            };
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
        p_ids = Array.isArray(p_ids) ? p_ids : [p_ids];
        var deferred = $qSync.defer();
        var self = this;
        var ids = new Array(p_ids.length);
        for (var i = 0; i < p_ids.length; ++i) {
            ids[i] = self.objectStoreName + '#' + p_ids[i];
        }
        MFDalNoSqlProxy.remove(p_context, 'ObjectToSynchronize', ids).then(function() {
            deferred.resolve();
        }, function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    MFDaoNoSqlAbstract.prototype.resolveCascade = function() {};
    MFDaoNoSqlAbstract.prototype.resolveCreateCascade = function() {};
    MFDaoNoSqlAbstract.prototype.resolveUpdateCascade = function() {};
    MFDaoNoSqlAbstract.prototype.resolveDeleteCascade = function() {};

    MFDaoNoSqlAbstract.prototype.record2Entity = function(p_context, record, cascade) {
        var deferred = $qSync.defer();
        var entity =  MFMappingHelper.convertLeftIntoRight(record, this.mapping, p_context.daoSession);
        this.resolveCascade(entity, p_context, cascade).then(function() {
            deferred.resolve(entity);
        });
        return deferred.promise;
    };

    MFDaoNoSqlAbstract.prototype.entity2Record = function(p_context, entity) {
        return MFMappingHelper.convertRightIntoLeft(entity, this.mapping, p_context.daoSession);
    };

    MFDaoNoSqlAbstract.prototype.records2Entities = function(p_context, records, cascade) {
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

    MFDaoNoSqlAbstract.prototype.resolveCascade = function(entity, p_context, cascade, operation, p_toSync) {
        var deferred = $qSync.defer();
        var self = this;
        operation = operation === undefined ? 'read' : operation;
        p_toSync = p_toSync === undefined && p_toSync;

        var subCascade = cascade.slice(0, cascade.length);
        var cascadePromises = [];
        var cascadePromise;
        var setResult = function(entity, attribute, results) {
            entity[attribute] = results;
        };

        var cascadeChildrenDeletion = function(entities, p_context, subCascade, p_toSync, cascadePromises, results) {
            var ids = new Array(entity[attribute].length);
            var entitiesToDelete = [];
            var i, ii;

            for (i = 0, ii = ids.length; i < ii; ++i) {
                ids[i] = entity[attribute][MFMappingHelper.getRightIdAttribute(foreignDao.mapping)];
            }
            for (i = 0, ii = results.length; i < ii; ++i) {
                if(entity[attribute].indexOf(results[i][MFMappingHelper.getRightIdAttribute(foreignDao.mapping)]) === -1) {
                    entitiesToDelete.push(results[i]);
                }
            }
            cascadePromises.push(foreignDao._deleteListRecord(entitiesToDelete, p_context, subCascade, p_toSync));
        };

        var cascadeChildrenUpdate = function(entities, foreignKey, p_context, subCascade, p_toSync, cascadePromises, results) {
            var ids = new Array(entity[attribute].length);
            var entitiesToUpdate = [];
            var i, ii;

            for (i = 0, ii = ids.length; i < ii; ++i) {
                ids[i] = entity[attribute][MFMappingHelper.getRightIdAttribute(foreignDao.mapping)];
            }
            var mappingAttributes = foreignDao.mapping.attributes;
            var foreignAttribute = null;
            for (i = 0, ii = mappingAttributes.length; i < ii; ++i) {
                if (mappingAttributes.leftAttr === foreignKey) {
                    foreignAttribute = Array.isArray(mappingAttributes.rightAttr) ? mappingAttributes.rightAttr[0] : mappingAttributes.rightAttr;
                }
            }
            for (i = 0, ii = results.length; i < ii; ++i) {
                if(entity[attribute].indexOf(results[i][MFMappingHelper.getRightIdAttribute(foreignDao.mapping)]) === -1) {
                    if (foreignAttribute !== null) {
                        results[i].foreignAttribute = null;
                    }
                    entitiesToUpdate.push(results[i]);
                }
            }
            cascadePromises.push(foreignDao._updateListRecord(entitiesToUpdate, p_context, [], p_toSync));
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

            if(cascadeRequested || attributeDefinition.composite){
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
                            case 'many-to-one':
                                cascadePromise = foreignDao._saveOrUpdateRecord(entity[attribute], p_context, subCascade, p_toSync);
                                cascadePromises.push(cascadePromise);
                                break;
                            case 'one-to-many':
                            case 'many-to-many':
                                cascadePromise = foreignDao._getListRecordByAttributeBis(attributeDefinition.childAttrPointingParent, entity, p_context, subCascade);
                                cascadePromise.then(cascadeChildrenDeletion.bind(null, entity[attribute], p_context, subCascade, p_toSync, cascadePromises));
                                cascadePromises.push(cascadePromise);
                                cascadePromise = foreignDao._saveOrUpdateListRecord(entity[attribute], p_context, subCascade, p_toSync);
                                cascadePromises.push(cascadePromise);
                                break;
                        }
                        break;
                    case 'delete':
                        switch (attributeDefinition.cardinality) {
                            case 'one-to-one':
                            case 'many-to-one':
                                cascadePromise = foreignDao._deleteRecord(entity[attribute], p_context, subCascade, p_toSync);
                                cascadePromises.push(cascadePromise);
                                break;
                            case 'one-to-many':
                                cascadePromise = foreignDao._deleteListRecord(entity[attribute], p_context, subCascade, p_toSync);
                                cascadePromises.push(cascadePromise);
                                break;
                            case 'many-to-many':
                                break;
                        }
                        break;
                }
            }
        }
        $qSync.all(cascadePromises).then(function() {
            deferred.resolve();
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