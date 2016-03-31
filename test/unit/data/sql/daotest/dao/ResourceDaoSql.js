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

angular.module('data-daotest-sql').factory('ResourceDaoSql',
	['ReservationDaoProxy', 'ResourceDaoMapping', 'MFSyncPromiseProvider', 'MFDaoSqlAbstract', 'MFUtils', 'MFMappingHelper',
//@non-generated-start[dependencies-names][X]
//@non-generated-end

//@non-generated-start[dependencies-classes][X]
function(ReservationDaoProxy, ResourceDaoMapping, $qSync, MFDaoSqlAbstract, MFUtils, MFMappingHelper
//@non-generated-end
)
{

	var ResourceDaoSql = function ResourceDaoSql(){
		// Constructor
//@non-generated-start[constructor][X]
		ResourceDaoSql._Parent.call(this);
		this.lastId = null;
		this.mapping = ResourceDaoMapping.mappingSql;
		this.syncDisabled = false;
		this.tableName = 'T_RESOURCE';
		this.entityName = 'Resource';
		this.cascadeDefinition = [
			{
				readAction: 'getList', parentAttrPointingChild: 'reservations',
				childDao: ReservationDaoProxy, childAttrPointingParent: 'resource'
			}
		];

//@non-generated-end
	};

	MFUtils.extendFromInstance(ResourceDaoSql, MFDaoSqlAbstract);



	//==================================================================================
	//========   SPECIFIC METHODS - GET
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name ResourceDaoSql#getResourceById
	 * @function
	 *
	 * @description
	 * Returns a Resource by id.
	 *
	 * @param {Integer} p_id Integer id of the Resource to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Resource} Returns the Resource, including children if required
	 */
	ResourceDaoSql.prototype.getResourceById = function(p_id, p_context, p_cascadeSet) {

//@non-generated-start[getResourceById-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ResourceDaoSql.getResourceById() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ResourceDaoSql.getResourceById() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_id), 'ResourceDaoSql.getResourceById() : p_id is required');

		var deferred = $qSync.defer();
		var self = this;

		self.getEntitiesByProperty('id', p_id, p_context).then(

function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
function (returnedSuccess_cascade) {
deferred.resolve(returnedSuccess_executeQueryToRead[0]);
},
function (returnedError_cascade) {
console.error('ResourceDaoSql.getResourceById(): cascade error: ', returnedError_cascade);
p_context.addError('ResourceDaoSql.getResourceById(): cascade error: '+ returnedError_cascade);
deferred.reject(returnedError_cascade);
}
);
},
function (returnedError_executeQueryToRead) { /* ERROR */
console.error('ResourceDaoSql.getResourceById(): error: ', returnedError_executeQueryToRead);
p_context.addError('ResourceDaoSql.getResourceById(): error: '+ returnedError_executeQueryToRead);
deferred.reject(returnedError_executeQueryToRead);
}
);

//@non-generated-start[getResourceById-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name ResourceDaoSql#getListResource
	 * @function
	 *
	 * @description
	 * Returns a list of Resources according to the parameter(s).
	 *
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Resources, including children if required.
	 */
	ResourceDaoSql.prototype.getListResource = function(p_context, p_cascadeSet) {

//@non-generated-start[getListResource-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ResourceDaoSql.getListResource() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ResourceDaoSql.getListResource() : p_cascadeSet is required and should be an array');

		var deferred = $qSync.defer();
		var self = this;

		self.getEntitiesByProperty('*', [], p_context).then(

function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
function (returnedSuccess_cascade) {
deferred.resolve(returnedSuccess_executeQueryToRead);
},
function (returnedError_cascade) {
console.error('ResourceDaoSql.getListResource(): cascade error: ', returnedError_cascade);
p_context.addError('ResourceDaoSql.getListResource(): cascade error: '+ returnedError_cascade);
deferred.reject(returnedError_cascade);
}
);
},
function (returnedError_executeQueryToRead) { /* ERROR */
console.error('ResourceDaoSql.getListResource(): error: ', returnedError_executeQueryToRead);
p_context.addError('ResourceDaoSql.getListResource(): error: '+ returnedError_executeQueryToRead);
deferred.reject(returnedError_executeQueryToRead);
}
);

//@non-generated-start[getListResource-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name ResourceDaoSql#getListResourceByIds
	 * @function
	 *
	 * @description
	 * Returns a list of Resources by ids.
	 *
	 * @param {Array<Integer>} p_ids Array containing ids of Resources to process (optional)
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Resources, including children if required.
	 */
	ResourceDaoSql.prototype.getListResourceByIds = function(p_ids, p_context, p_cascadeSet) {

//@non-generated-start[getListResourceByIds-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ResourceDaoSql.getListResourceByIds() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ResourceDaoSql.getListResourceByIds() : p_cascadeSet is required and should be an array');
		console.assert(angular.isUndefinedOrNull(p_ids) || angular.isArray(p_ids), 'ResourceDaoSql.getListResourceByIds() : p_ids should be an array, if given');

		var deferred = $qSync.defer();
		var self = this;

		self.getEntitiesByProperty('id', p_ids, p_context).then(

function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
function (returnedSuccess_cascade) {
deferred.resolve(returnedSuccess_executeQueryToRead);
},
function (returnedError_cascade) {
console.error('ResourceDaoSql.getListResourceByIds(): cascade error: ', returnedError_cascade);
p_context.addError('ResourceDaoSql.getListResourceByIds(): cascade error: '+ returnedError_cascade);
deferred.reject(returnedError_cascade);
}
);
},
function (returnedError_executeQueryToRead) { /* ERROR */
console.error('ResourceDaoSql.getListResourceByIds(): error: ', returnedError_executeQueryToRead);
p_context.addError('ResourceDaoSql.getListResourceByIds(): error: '+ returnedError_executeQueryToRead);
deferred.reject(returnedError_executeQueryToRead);
}
);

//@non-generated-start[getListResourceByIds-after][X]
//@non-generated-end

		return deferred.promise;
	};



	//==================================================================================
	//========   SPECIFIC METHODS - SAVE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name ResourceDaoSql#saveResource
	 * @function
	 *
	 * @description
	 * Saves a Resource.
	 *
	 * @param {Resource} p_entity Resource to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Promise} Returns a promise equal to true if the Resource was saved, false otherwise.
	 */
	ResourceDaoSql.prototype.saveResource = function(p_entity, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[saveResource-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ResourceDaoSql.saveResource() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ResourceDaoSql.saveResource() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_entity), 'ResourceDaoSql.saveResource() : p_entity is required');

		var deferred = $qSync.defer();
		var self = this;

		self.fixDoubleWaysRelationship(p_entity);
		// --------------------------
		// 1. save or update children pointed by the parent : for relationships xxx_to_one
		// --------------------------
		var savePointedChildren = [];


		$qSync.all(savePointedChildren).then(
			function(success) { /* SUCCESS */
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

						var reservationsIdx = p_cascadeSet.indexOf('reservations');
						if( reservationsIdx > -1) {
							p_cascadeSet.splice(reservationsIdx, 1);
							saveOtherChildren.push( ReservationDaoProxy.saveOrUpdateListReservation(p_entity.reservations, p_context, p_cascadeSet, p_toSync) );
						}


						$qSync.all(saveOtherChildren).then(
							function(success) {
								deferred.resolve(success_result);
							},
							function(error) {
								deferred.reject(error);
							}
						);
					},
					function(failure_result) {
						deferred.reject(failure_result);
					}
				);
			},
			function (error) { /* ERROR */
				deferred.reject(error);
			}
		);


//@non-generated-start[saveResource-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name ResourceDaoSql#saveListResource
	 * @function
	 *
	 * @description
	 * Saves a list of Resources.
	 *
	 * @param {Array<Resource>} p_entities Array containing Resources to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of Resources was saved, false otherwise.
	 */
	ResourceDaoSql.prototype.saveListResource = function(p_entities, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[saveListResource-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ResourceDaoSql.saveListResource() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ResourceDaoSql.saveListResource() : p_cascadeSet is required and should be an array');
		console.assert(angular.isArray(p_entities), 'ResourceDaoSql.saveListResource() : p_entities is required and should be an array');

		var deferred = $qSync.defer();
		var self = this;

		/* saveListResource() => saveResource() */
		var o_arrayPromisesSaveResource = [];
		for( var i = 0; i < p_entities.length; i++ ) {
			o_arrayPromisesSaveResource.push( self.saveResource(p_entities[i], p_context, angular.copy(p_cascadeSet), p_toSync) );
		}
		// $qSync.all() returns an array of the results of o_arrayPromisesSaveResource.
		// If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
		deferred.resolve( $qSync.all(o_arrayPromisesSaveResource) );


//@non-generated-start[saveListResource-after][X]
//@non-generated-end

		return deferred.promise;
	};



	//==================================================================================
	//========   SPECIFIC METHODS - UPDATE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name ResourceDaoSql#updateResource
	 * @function
	 *
	 * @description
	 * Updates a Resource.
	 *
	 * @param {Resource} p_entity Resource to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
	 *
	 * @returns {Promise} Returns a promise equal to true if the Resource was updated, false otherwise.
	 */
	ResourceDaoSql.prototype.updateResource = function(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

//@non-generated-start[updateResource-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ResourceDaoSql.updateResource() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ResourceDaoSql.updateResource() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_entity), 'ResourceDaoSql.updateResource() : p_entity is required');

		var deferred = $qSync.defer();
		var self = this;

		var childrenPromises = [];

		self.fixDoubleWaysRelationship(p_entity);
		// for composition relationships one_to_xxx

		var reservationsIdx = p_cascadeSet.indexOf('reservations');
		if( reservationsIdx > -1) {
			p_cascadeSet.splice(reservationsIdx, 1);

			// 1. delete the children that are not in p_entity if composition relationship one_to_xxx (delete from CHILD where PARENTID=xxx and CHILDID not in(xxx, xxx)
			childrenPromises.push(
				self.getChildrenIdsToRemove(p_context, p_entity, 'reservations').then(
					function(idsToRemove) {
						console.log('children to remove found', idsToRemove);
						return ReservationDaoProxy.deleteListReservationByIds(idsToRemove, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
					},
					function(error) {
						deferred.reject(error);
					}
				)
			);

			// 2. save or update the remaining children if composition relationship one_to_xxx
			childrenPromises.push( ReservationDaoProxy.saveOrUpdateListReservation(p_entity.reservations, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) );
		}




		$qSync.all(childrenPromises).then(
			function(success){
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
			function(error){
				deferred.reject(error);
			}
		);


//@non-generated-start[updateResource-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name ResourceDaoSql#updateListResource
	 * @function
	 *
	 * @description
	 * Updates a list of Resources.
	 *
	 * @param {Array<Resource>} p_entities Array containing Resources to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of Resources was updated, false otherwise.
	 */
	ResourceDaoSql.prototype.updateListResource = function(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

//@non-generated-start[updateListResource-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ResourceDaoSql.updateListResource() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ResourceDaoSql.updateListResource() : p_cascadeSet is required and should be an array');
		console.assert(angular.isArray(p_entities), 'ResourceDaoSql.updateListResource() : p_entities is required and should be an array');

		var deferred = $qSync.defer();
		var self = this;

		/* updateListResource() => updateResource() */
		var o_arrayPromisesUpdateResource = [];
		for( var i = 0; i < p_entities.length; i++ ) {
			o_arrayPromisesUpdateResource.push( self.updateResource(p_entities[i], p_context, angular.copy(p_cascadeSet), p_toSync, angular.copy(p_cascadeSetForDelete)) );
		}
		// $qSync.all() returns an array of the results of o_arrayPromisesUpdateResource.
		// If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
		deferred.resolve( $qSync.all(o_arrayPromisesUpdateResource) );


//@non-generated-start[updateListResource-after][X]
//@non-generated-end

		return deferred.promise;
	};



	//==================================================================================
	//========   SPECIFIC METHODS - SAVE & UPDATE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name ResourceDaoSql#saveOrUpdateResource
	 * @function
	 *
	 * @description
	 * Saves of updates a Resource.
	 *
	 * @param {Resource} p_entity Resource to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
	 *
	 * @returns {Promise} Returns a promise equal to true if the Resource was saved or updated, false otherwise.
	 */
	ResourceDaoSql.prototype.saveOrUpdateResource = function(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

//@non-generated-start[saveOrUpdateResource-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ResourceDaoSql.saveOrUpdateResource() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ResourceDaoSql.saveOrUpdateResource() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_entity), 'ResourceDaoSql.saveOrUpdateResource() : p_entity is required');

		var deferred = $qSync.defer();
		var self = this;

		if(p_entity.idToString !== -1) { 
			this.exist(p_entity, p_context).then(function(result) {
				if(result){ 
					/* updateResource */
					console.log('ResourceDaoSql.saveOrUpdateResource(): entity exists  => updateResource()');
					deferred.resolve( self.updateResource(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) );
				} else {
				/* saveResource */
					console.log('ResourceDaoSql.saveOrUpdateResource(): entity does not exist  => saveResource()');
					deferred.resolve( self.saveResource(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) ); // last parameter ignored by called method
				}
			},
 			function(error) { 
				deferred.reject(error); 
			});
		} else { 
			/* saveResource */
			console.log('ResourceDaoSql.saveOrUpdateResource(): entity does not exist  => saveResource()');
			deferred.resolve( self.saveResource(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) ); // last parameter ignored by called method
		}


//@non-generated-start[saveOrUpdateResource-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name ResourceDaoSql#saveOrUpdateListResource
	 * @function
	 *
	 * @description
	 * Saves of updates a list of Resources.
	 *
	 * @param {Array<Resource>} p_entities Array containing Resources to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of Resources was saved or updated, false otherwise.
	 */
	ResourceDaoSql.prototype.saveOrUpdateListResource = function(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

//@non-generated-start[saveOrUpdateListResource-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ResourceDaoSql.saveOrUpdateListResource() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ResourceDaoSql.saveOrUpdateListResource() : p_cascadeSet is required and should be an array');
		console.assert(angular.isArray(p_entities), 'ResourceDaoSql.saveOrUpdateListResource() : p_entities is required and should be an array');

		var deferred = $qSync.defer();
		var self = this;

		/* saveOrUpdateListResource() => saveOrUpdateResource() */
		var o_arrayPromisesSaveOrUpdateResource = [];
		for(var i = 0; i < p_entities.length; i++) {
			o_arrayPromisesSaveOrUpdateResource.push( self.saveOrUpdateResource(p_entities[i], p_context, angular.copy(p_cascadeSet), p_toSync, angular.copy(p_cascadeSetForDelete)) );
		}
		// $qSync.all() returns an array of the results of o_arrayPromisesSaveOrUpdateResource.
		// If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
		deferred.resolve( $qSync.all(o_arrayPromisesSaveOrUpdateResource) );


//@non-generated-start[saveOrUpdateListResource-after][X]
//@non-generated-end

		return deferred.promise;
	};



	//==================================================================================
	//========   SPECIFIC METHODS - DELETE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name ResourceDaoSql#deleteResource
	 * @function
	 *
	 * @description
	 * Delete a Resource.
	 *
	 * @param {Resource} p_entity Resource to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Promise} Returns a promise equal to true if the Resource was deleted, false otherwise.
	 */
	ResourceDaoSql.prototype.deleteResource = function(p_entity, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[deleteResource-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ResourceDaoSql.deleteResource() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ResourceDaoSql.deleteResource() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_entity), 'ResourceDaoSql.deleteResource() : p_entity is required');

		var deferred = $qSync.defer();
		var self = this;

		//0. load children that should always be deleted or updated
		self.loadChildrenIfNeeded(p_context, p_entity, p_cascadeSet).then(
			function(returnedSuccess_loadChildrenIfNeeded){
				var pointersDeletes = [];




				$qSync.all(pointersDeletes).then(
					function(returnedSuccess_pointers){ /* SUCCESS */

						// 4. delete the parent
						self.deleteEntity(p_entity, p_context, p_toSync).then(
							function (returnedSuccess_executeQueryToDelete) { /* SUCCESS */
								pointersDeletes = [];

								$qSync.all(pointersDeletes).then(
									function(returnedSuccess_executeQuery2ToDelete) { /* SUCCESS */
										deferred.resolve(returnedSuccess_executeQuery2ToDelete);
									},
									function (returnedError_executeQuery2ToDelete) { /* ERROR */
										console.error('ResourceDaoSql.deleteResource(): error: ', returnedError_executeQuery2ToDelete);
										p_context.addError('ResourceDaoSql.deleteResource(): error: '+ returnedError_executeQuery2ToDelete);
										deferred.reject(returnedError_executeQuery2ToDelete);
									}
								);

							},
							function(returnedError_executeQueryToDelete){ /* ERROR */
								deferred.reject(returnedError_executeQueryToDelete);
							}
						);

					},
					function(returnedError_pointers){ /* ERROR */
						deferred.reject(returnedError_pointers);
					}
				);
			},
			function(returnedError_loadChildrenIfNeeded){ /* ERROR */
				deferred.reject(returnedError_loadChildrenIfNeeded);
			}
		);

//@non-generated-start[deleteResource-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name ResourceDaoSql#deleteResourceById
	 * @function
	 *
	 * @description
	 * Deletes a Resource by id.
	 *
	 * @param {Integer} p_id Integer id of the Resource to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Promise} Returns a promise equal to true if the Resource was deleted, false otherwise.
	 */
	ResourceDaoSql.prototype.deleteResourceById = function(p_id, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[deleteResourceById-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ResourceDaoSql.deleteResourceById() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ResourceDaoSql.deleteResourceById() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_id), 'ResourceDaoSql.deleteResourceById() : p_id is required');

		var deferred = $qSync.defer();
		var self = this;

		self.getResourceById(p_id, p_context, angular.copy(p_cascadeSet), p_toSync).then(
			function(entity){
				deferred.resolve( self.deleteResource(entity, p_context, angular.copy(p_cascadeSet), p_toSync) );
			},
			function(error){
				deferred.reject(error);
			}
		);


//@non-generated-start[deleteResourceById-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name ResourceDaoSql#deleteListResource
	 * @function
	 *
	 * @description
	 * Deletes a list of Resources.
	 *
	 * @param {Array<Resource>} p_entities Array containing Resources to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of Resources was deleted, false otherwise.
	 */
	ResourceDaoSql.prototype.deleteListResource = function(p_entities, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[deleteListResource-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ResourceDaoSql.deleteListResource() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ResourceDaoSql.deleteListResource() : p_cascadeSet is required and should be an array');
		console.assert(angular.isArray(p_entities), 'ResourceDaoSql.deleteListResource() : p_entities is required and should be an array');

		var deferred = $qSync.defer();
		var self = this;

		/* deleteListResource() => deleteResource() */
		var o_arrayPromisesDeleteResource = [];
		for( var i = 0; i < p_entities.length; i++ ) {
			o_arrayPromisesDeleteResource.push( self.deleteResource(p_entities[i], p_context, angular.copy(p_cascadeSet), p_toSync) );
		}
		// $qSync.all() returns an array of the results of o_arrayPromisesDeleteResource.
		// If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
		deferred.resolve( $qSync.all(o_arrayPromisesDeleteResource) );


//@non-generated-start[deleteListResource-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name ResourceDaoSql#deleteListResourceByIds
	 * @function
	 *
	 * @description
	 * Deletes a list of Resources by ids.
	 *
	 * @param {Array<Integer>} p_ids Array containing ids of Resources to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of Resources was deleted, false otherwise.
	 */
	ResourceDaoSql.prototype.deleteListResourceByIds = function(p_ids, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[deleteListResourceByIds-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ResourceDaoSql.deleteListResourceByIds() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ResourceDaoSql.deleteListResourceByIds() : p_cascadeSet is required and should be an array');
		console.assert(angular.isUndefinedOrNull(p_ids) || angular.isArray(p_ids), 'ResourceDaoSql.deleteListResourceByIds() : p_ids should be an array, if given');

		var deferred = $qSync.defer();
		var self = this;

		/* deleteListResourceByIds() => deleteListResourceById() */
		var o_arrayPromisesDeleteResource = [];
		for( var i = 0; i < p_ids.length; i++ ) {
			o_arrayPromisesDeleteResource.push( self.deleteResourceById(p_ids[i], p_context, angular.copy(p_cascadeSet), p_toSync) );
		}
		// $qSync.all() returns an array of the results of o_arrayPromisesDeleteResource.
		// If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
		deferred.resolve( $qSync.all(o_arrayPromisesDeleteResource) );


//@non-generated-start[deleteListResourceByIds-after][X]
//@non-generated-end

		return deferred.promise;
	};



//@non-generated-start[other-methods][X]
//@non-generated-end


	return new ResourceDaoSql();
}]);
