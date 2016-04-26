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

angular.module('data-daotest-sql').factory('ActiviteDaoSql',
	['ActiviteDaoMapping', 'AgenceDaoProxy', 'MFSyncPromiseProvider', 'MFDaoSqlAbstract', 'MFUtils', 'MFMappingHelper',
//@non-generated-start[dependencies-names][X]
//@non-generated-end

//@non-generated-start[dependencies-classes][X]
function(ActiviteDaoMapping, AgenceDaoProxy, $qSync, MFDaoSqlAbstract, MFUtils, MFMappingHelper
//@non-generated-end
)
{

	var ActiviteDaoSql = function ActiviteDaoSql(){
		// Constructor
//@non-generated-start[constructor][X]
		ActiviteDaoSql._Parent.call(this);
		this.lastId = null;
		this.mapping = ActiviteDaoMapping.mappingSql;
		this.syncDisabled = false;
		this.tableName = 'T_ACTIVITE';
		this.entityName = 'Activite';
		this.cascadeDefinition = [
			{
				readAction: 'getList', parentAttrPointingChild: 'agence4',
				childDao: AgenceDaoProxy, childAttrPointingParent: 'activite4'
			},
			{
				readAction: 'getList', parentAttrPointingChild: 'agence1',
				childDao: AgenceDaoProxy, childAttrPointingParent: 'activite1'
			}
		];

//@non-generated-end
	};

	MFUtils.extendFromInstance(ActiviteDaoSql, MFDaoSqlAbstract);



	//==================================================================================
	//========   SPECIFIC METHODS - GET
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name ActiviteDaoSql#getActiviteById
	 * @function
	 *
	 * @description
	 * Returns a Activite by id.
	 *
	 * @param {Integer} p_id Integer id of the Activite to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Activite} Returns the Activite, including children if required
	 */
	ActiviteDaoSql.prototype.getActiviteById = function(p_id, p_context, p_cascadeSet) {

//@non-generated-start[getActiviteById-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ActiviteDaoSql.getActiviteById() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ActiviteDaoSql.getActiviteById() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_id), 'ActiviteDaoSql.getActiviteById() : p_id is required');

		var deferred = $qSync.defer();
		var self = this;

		self.getEntitiesByProperty('id', p_id, p_context).then(

function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
function (returnedSuccess_cascade) {
deferred.resolve(returnedSuccess_executeQueryToRead[0]);
},
function (returnedError_cascade) {
console.error('ActiviteDaoSql.getActiviteById(): cascade error: ', returnedError_cascade);
p_context.addError('ActiviteDaoSql.getActiviteById(): cascade error: '+ returnedError_cascade);
deferred.reject(returnedError_cascade);
}
);
},
function (returnedError_executeQueryToRead) { /* ERROR */
console.error('ActiviteDaoSql.getActiviteById(): error: ', returnedError_executeQueryToRead);
p_context.addError('ActiviteDaoSql.getActiviteById(): error: '+ returnedError_executeQueryToRead);
deferred.reject(returnedError_executeQueryToRead);
}
);

//@non-generated-start[getActiviteById-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name ActiviteDaoSql#getListActivite
	 * @function
	 *
	 * @description
	 * Returns a list of Activites according to the parameter(s).
	 *
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Activites, including children if required.
	 */
	ActiviteDaoSql.prototype.getListActivite = function(p_context, p_cascadeSet) {

//@non-generated-start[getListActivite-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ActiviteDaoSql.getListActivite() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ActiviteDaoSql.getListActivite() : p_cascadeSet is required and should be an array');

		var deferred = $qSync.defer();
		var self = this;

		self.getEntitiesByProperty('*', [], p_context).then(

function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
function (returnedSuccess_cascade) {
deferred.resolve(returnedSuccess_executeQueryToRead);
},
function (returnedError_cascade) {
console.error('ActiviteDaoSql.getListActivite(): cascade error: ', returnedError_cascade);
p_context.addError('ActiviteDaoSql.getListActivite(): cascade error: '+ returnedError_cascade);
deferred.reject(returnedError_cascade);
}
);
},
function (returnedError_executeQueryToRead) { /* ERROR */
console.error('ActiviteDaoSql.getListActivite(): error: ', returnedError_executeQueryToRead);
p_context.addError('ActiviteDaoSql.getListActivite(): error: '+ returnedError_executeQueryToRead);
deferred.reject(returnedError_executeQueryToRead);
}
);

//@non-generated-start[getListActivite-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name ActiviteDaoSql#getListActiviteByIds
	 * @function
	 *
	 * @description
	 * Returns a list of Activites by ids.
	 *
	 * @param {Array<Integer>} p_ids Array containing ids of Activites to process (optional)
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Activites, including children if required.
	 */
	ActiviteDaoSql.prototype.getListActiviteByIds = function(p_ids, p_context, p_cascadeSet) {

//@non-generated-start[getListActiviteByIds-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ActiviteDaoSql.getListActiviteByIds() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ActiviteDaoSql.getListActiviteByIds() : p_cascadeSet is required and should be an array');
		console.assert(angular.isUndefinedOrNull(p_ids) || angular.isArray(p_ids), 'ActiviteDaoSql.getListActiviteByIds() : p_ids should be an array, if given');

		var deferred = $qSync.defer();
		var self = this;

		self.getEntitiesByProperty('id', p_ids, p_context).then(

function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
function (returnedSuccess_cascade) {
deferred.resolve(returnedSuccess_executeQueryToRead);
},
function (returnedError_cascade) {
console.error('ActiviteDaoSql.getListActiviteByIds(): cascade error: ', returnedError_cascade);
p_context.addError('ActiviteDaoSql.getListActiviteByIds(): cascade error: '+ returnedError_cascade);
deferred.reject(returnedError_cascade);
}
);
},
function (returnedError_executeQueryToRead) { /* ERROR */
console.error('ActiviteDaoSql.getListActiviteByIds(): error: ', returnedError_executeQueryToRead);
p_context.addError('ActiviteDaoSql.getListActiviteByIds(): error: '+ returnedError_executeQueryToRead);
deferred.reject(returnedError_executeQueryToRead);
}
);

//@non-generated-start[getListActiviteByIds-after][X]
//@non-generated-end

		return deferred.promise;
	};



	//==================================================================================
	//========   SPECIFIC METHODS - SAVE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name ActiviteDaoSql#saveActivite
	 * @function
	 *
	 * @description
	 * Saves a Activite.
	 *
	 * @param {Activite} p_entity Activite to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Promise} Returns a promise equal to true if the Activite was saved, false otherwise.
	 */
	ActiviteDaoSql.prototype.saveActivite = function(p_entity, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[saveActivite-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ActiviteDaoSql.saveActivite() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ActiviteDaoSql.saveActivite() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_entity), 'ActiviteDaoSql.saveActivite() : p_entity is required');

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

/*jshint loopfunc: true *//* jshint shadow:true */for (var i = 0 , cascadeSetLength = p_cascadeSet.length ; i < cascadeSetLength ; i += 1) {
if( p_cascadeSet[i].entityName === p_entity._type ) {
if( p_cascadeSet[i].key === 'AGENCE4') {
							saveOtherChildren.push( AgenceDaoProxy.saveOrUpdateListAgence(p_entity.agence4, p_context, p_cascadeSet, p_toSync) );
continue ;}

if( p_cascadeSet[i].key === 'AGENCE1') {
							saveOtherChildren.push( AgenceDaoProxy.saveOrUpdateListAgence(p_entity.agence1, p_context, p_cascadeSet, p_toSync) );
continue ;}
		}
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


//@non-generated-start[saveActivite-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name ActiviteDaoSql#saveListActivite
	 * @function
	 *
	 * @description
	 * Saves a list of Activites.
	 *
	 * @param {Array<Activite>} p_entities Array containing Activites to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of Activites was saved, false otherwise.
	 */
	ActiviteDaoSql.prototype.saveListActivite = function(p_entities, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[saveListActivite-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ActiviteDaoSql.saveListActivite() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ActiviteDaoSql.saveListActivite() : p_cascadeSet is required and should be an array');
		console.assert(angular.isArray(p_entities), 'ActiviteDaoSql.saveListActivite() : p_entities is required and should be an array');

		var deferred = $qSync.defer();
		var self = this;

		/* saveListActivite() => saveActivite() */
		var o_arrayPromisesSaveActivite = [];
		for( var i = 0; i < p_entities.length; i++ ) {
			o_arrayPromisesSaveActivite.push( self.saveActivite(p_entities[i], p_context, angular.copy(p_cascadeSet), p_toSync) );
		}
		// $qSync.all() returns an array of the results of o_arrayPromisesSaveActivite.
		// If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
		deferred.resolve( $qSync.all(o_arrayPromisesSaveActivite) );


//@non-generated-start[saveListActivite-after][X]
//@non-generated-end

		return deferred.promise;
	};



	//==================================================================================
	//========   SPECIFIC METHODS - UPDATE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name ActiviteDaoSql#updateActivite
	 * @function
	 *
	 * @description
	 * Updates a Activite.
	 *
	 * @param {Activite} p_entity Activite to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
	 *
	 * @returns {Promise} Returns a promise equal to true if the Activite was updated, false otherwise.
	 */
	ActiviteDaoSql.prototype.updateActivite = function(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

//@non-generated-start[updateActivite-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ActiviteDaoSql.updateActivite() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ActiviteDaoSql.updateActivite() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_entity), 'ActiviteDaoSql.updateActivite() : p_entity is required');

		var deferred = $qSync.defer();
		var self = this;

		var childrenPromises = [];

		self.fixDoubleWaysRelationship(p_entity);
		// for composition relationships one_to_xxx
/*jshint loopfunc: true *//* jshint shadow:true */for (var i = 0 , cascadeSetLength = p_cascadeSet.length ; i < cascadeSetLength ; i += 1) {
if( p_cascadeSet[i].entityName === p_entity._type ) {

if( p_cascadeSet[i].key === 'AGENCE4') {

			// 1. delete the children that are not in p_entity if composition relationship one_to_xxx (delete from CHILD where PARENTID=xxx and CHILDID not in(xxx, xxx)
			childrenPromises.push(
				self.getChildrenIdsToRemove(p_context, p_entity, 'agence4').then(
					function(idsToRemove) {
						console.log('children to remove found', idsToRemove);
						return AgenceDaoProxy.deleteListAgenceByIds(idsToRemove, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
					},
					function(error) {
						deferred.reject(error);
					}
				)
			);

			// 2. save or update the remaining children if composition relationship one_to_xxx
			childrenPromises.push( AgenceDaoProxy.saveOrUpdateListAgence(p_entity.agence4, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) );
continue ;		}

if( p_cascadeSet[i].key === 'AGENCE1') {

			// 1. delete the children that are not in p_entity if composition relationship one_to_xxx (delete from CHILD where PARENTID=xxx and CHILDID not in(xxx, xxx)
			childrenPromises.push(
				self.getChildrenIdsToRemove(p_context, p_entity, 'agence1').then(
					function(idsToRemove) {
						console.log('children to remove found', idsToRemove);
						return AgenceDaoProxy.deleteListAgenceByIds(idsToRemove, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
					},
					function(error) {
						deferred.reject(error);
					}
				)
			);

			// 2. save or update the remaining children if composition relationship one_to_xxx
			childrenPromises.push( AgenceDaoProxy.saveOrUpdateListAgence(p_entity.agence1, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) );
continue ;		}
		}
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


//@non-generated-start[updateActivite-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name ActiviteDaoSql#updateListActivite
	 * @function
	 *
	 * @description
	 * Updates a list of Activites.
	 *
	 * @param {Array<Activite>} p_entities Array containing Activites to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of Activites was updated, false otherwise.
	 */
	ActiviteDaoSql.prototype.updateListActivite = function(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

//@non-generated-start[updateListActivite-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ActiviteDaoSql.updateListActivite() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ActiviteDaoSql.updateListActivite() : p_cascadeSet is required and should be an array');
		console.assert(angular.isArray(p_entities), 'ActiviteDaoSql.updateListActivite() : p_entities is required and should be an array');

		var deferred = $qSync.defer();
		var self = this;

		/* updateListActivite() => updateActivite() */
		var o_arrayPromisesUpdateActivite = [];
		for( var i = 0; i < p_entities.length; i++ ) {
			o_arrayPromisesUpdateActivite.push( self.updateActivite(p_entities[i], p_context, angular.copy(p_cascadeSet), p_toSync, angular.copy(p_cascadeSetForDelete)) );
		}
		// $qSync.all() returns an array of the results of o_arrayPromisesUpdateActivite.
		// If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
		deferred.resolve( $qSync.all(o_arrayPromisesUpdateActivite) );


//@non-generated-start[updateListActivite-after][X]
//@non-generated-end

		return deferred.promise;
	};



	//==================================================================================
	//========   SPECIFIC METHODS - SAVE & UPDATE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name ActiviteDaoSql#saveOrUpdateActivite
	 * @function
	 *
	 * @description
	 * Saves of updates a Activite.
	 *
	 * @param {Activite} p_entity Activite to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
	 *
	 * @returns {Promise} Returns a promise equal to true if the Activite was saved or updated, false otherwise.
	 */
	ActiviteDaoSql.prototype.saveOrUpdateActivite = function(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

//@non-generated-start[saveOrUpdateActivite-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ActiviteDaoSql.saveOrUpdateActivite() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ActiviteDaoSql.saveOrUpdateActivite() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_entity), 'ActiviteDaoSql.saveOrUpdateActivite() : p_entity is required');

		var deferred = $qSync.defer();
		var self = this;

		if(p_entity.idToString !== -1) { 
			this.exist(p_entity, p_context).then(function(result) {
				if(result){ 
					/* updateActivite */
					console.log('ActiviteDaoSql.saveOrUpdateActivite(): entity exists  => updateActivite()');
					deferred.resolve( self.updateActivite(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) );
				} else {
				/* saveActivite */
					console.log('ActiviteDaoSql.saveOrUpdateActivite(): entity does not exist  => saveActivite()');
					deferred.resolve( self.saveActivite(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) ); // last parameter ignored by called method
				}
			},
 			function(error) { 
				deferred.reject(error); 
			});
		} else { 
			/* saveActivite */
			console.log('ActiviteDaoSql.saveOrUpdateActivite(): entity does not exist  => saveActivite()');
			deferred.resolve( self.saveActivite(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) ); // last parameter ignored by called method
		}


//@non-generated-start[saveOrUpdateActivite-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name ActiviteDaoSql#saveOrUpdateListActivite
	 * @function
	 *
	 * @description
	 * Saves of updates a list of Activites.
	 *
	 * @param {Array<Activite>} p_entities Array containing Activites to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of Activites was saved or updated, false otherwise.
	 */
	ActiviteDaoSql.prototype.saveOrUpdateListActivite = function(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

//@non-generated-start[saveOrUpdateListActivite-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ActiviteDaoSql.saveOrUpdateListActivite() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ActiviteDaoSql.saveOrUpdateListActivite() : p_cascadeSet is required and should be an array');
		console.assert(angular.isArray(p_entities), 'ActiviteDaoSql.saveOrUpdateListActivite() : p_entities is required and should be an array');

		var deferred = $qSync.defer();
		var self = this;

		/* saveOrUpdateListActivite() => saveOrUpdateActivite() */
		var o_arrayPromisesSaveOrUpdateActivite = [];
		for(var i = 0; i < p_entities.length; i++) {
			o_arrayPromisesSaveOrUpdateActivite.push( self.saveOrUpdateActivite(p_entities[i], p_context, angular.copy(p_cascadeSet), p_toSync, angular.copy(p_cascadeSetForDelete)) );
		}
		// $qSync.all() returns an array of the results of o_arrayPromisesSaveOrUpdateActivite.
		// If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
		deferred.resolve( $qSync.all(o_arrayPromisesSaveOrUpdateActivite) );


//@non-generated-start[saveOrUpdateListActivite-after][X]
//@non-generated-end

		return deferred.promise;
	};



	//==================================================================================
	//========   SPECIFIC METHODS - DELETE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name ActiviteDaoSql#deleteActivite
	 * @function
	 *
	 * @description
	 * Delete a Activite.
	 *
	 * @param {Activite} p_entity Activite to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Promise} Returns a promise equal to true if the Activite was deleted, false otherwise.
	 */
	ActiviteDaoSql.prototype.deleteActivite = function(p_entity, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[deleteActivite-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ActiviteDaoSql.deleteActivite() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ActiviteDaoSql.deleteActivite() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_entity), 'ActiviteDaoSql.deleteActivite() : p_entity is required');

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
										console.error('ActiviteDaoSql.deleteActivite(): error: ', returnedError_executeQuery2ToDelete);
										p_context.addError('ActiviteDaoSql.deleteActivite(): error: '+ returnedError_executeQuery2ToDelete);
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

//@non-generated-start[deleteActivite-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name ActiviteDaoSql#deleteActiviteById
	 * @function
	 *
	 * @description
	 * Deletes a Activite by id.
	 *
	 * @param {Integer} p_id Integer id of the Activite to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Promise} Returns a promise equal to true if the Activite was deleted, false otherwise.
	 */
	ActiviteDaoSql.prototype.deleteActiviteById = function(p_id, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[deleteActiviteById-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ActiviteDaoSql.deleteActiviteById() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ActiviteDaoSql.deleteActiviteById() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_id), 'ActiviteDaoSql.deleteActiviteById() : p_id is required');

		var deferred = $qSync.defer();
		var self = this;

		self.getActiviteById(p_id, p_context, angular.copy(p_cascadeSet), p_toSync).then(
			function(entity){
				deferred.resolve( self.deleteActivite(entity, p_context, angular.copy(p_cascadeSet), p_toSync) );
			},
			function(error){
				deferred.reject(error);
			}
		);


//@non-generated-start[deleteActiviteById-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name ActiviteDaoSql#deleteListActivite
	 * @function
	 *
	 * @description
	 * Deletes a list of Activites.
	 *
	 * @param {Array<Activite>} p_entities Array containing Activites to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of Activites was deleted, false otherwise.
	 */
	ActiviteDaoSql.prototype.deleteListActivite = function(p_entities, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[deleteListActivite-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ActiviteDaoSql.deleteListActivite() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ActiviteDaoSql.deleteListActivite() : p_cascadeSet is required and should be an array');
		console.assert(angular.isArray(p_entities), 'ActiviteDaoSql.deleteListActivite() : p_entities is required and should be an array');

		var deferred = $qSync.defer();
		var self = this;

		/* deleteListActivite() => deleteActivite() */
		var o_arrayPromisesDeleteActivite = [];
		for( var i = 0; i < p_entities.length; i++ ) {
			o_arrayPromisesDeleteActivite.push( self.deleteActivite(p_entities[i], p_context, angular.copy(p_cascadeSet), p_toSync) );
		}
		// $qSync.all() returns an array of the results of o_arrayPromisesDeleteActivite.
		// If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
		deferred.resolve( $qSync.all(o_arrayPromisesDeleteActivite) );


//@non-generated-start[deleteListActivite-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name ActiviteDaoSql#deleteListActiviteByIds
	 * @function
	 *
	 * @description
	 * Deletes a list of Activites by ids.
	 *
	 * @param {Array<Integer>} p_ids Array containing ids of Activites to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of Activites was deleted, false otherwise.
	 */
	ActiviteDaoSql.prototype.deleteListActiviteByIds = function(p_ids, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[deleteListActiviteByIds-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ActiviteDaoSql.deleteListActiviteByIds() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ActiviteDaoSql.deleteListActiviteByIds() : p_cascadeSet is required and should be an array');
		console.assert(angular.isUndefinedOrNull(p_ids) || angular.isArray(p_ids), 'ActiviteDaoSql.deleteListActiviteByIds() : p_ids should be an array, if given');

		var deferred = $qSync.defer();
		var self = this;

		/* deleteListActiviteByIds() => deleteListActiviteById() */
		var o_arrayPromisesDeleteActivite = [];
		for( var i = 0; i < p_ids.length; i++ ) {
			o_arrayPromisesDeleteActivite.push( self.deleteActiviteById(p_ids[i], p_context, angular.copy(p_cascadeSet), p_toSync) );
		}
		// $qSync.all() returns an array of the results of o_arrayPromisesDeleteActivite.
		// If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
		deferred.resolve( $qSync.all(o_arrayPromisesDeleteActivite) );


//@non-generated-start[deleteListActiviteByIds-after][X]
//@non-generated-end

		return deferred.promise;
	};



//@non-generated-start[other-methods][X]
//@non-generated-end


	return new ActiviteDaoSql();
}]);
