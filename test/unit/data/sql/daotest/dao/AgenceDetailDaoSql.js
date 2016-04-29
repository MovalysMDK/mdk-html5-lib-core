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

angular.module('data-daotest-sql').factory('AgenceDetailDaoSql',
	['AgenceDaoProxy', 'AgenceDetailDaoMapping', 'MFSyncPromiseProvider', 'MFDaoSqlAbstract', 'MFUtils', 'MFMappingHelper',
//@non-generated-start[dependencies-names][X]
//@non-generated-end

//@non-generated-start[dependencies-classes][X]
function(AgenceDaoProxy, AgenceDetailDaoMapping, $qSync, MFDaoSqlAbstract, MFUtils, MFMappingHelper
//@non-generated-end
)
{

	var AgenceDetailDaoSql = function AgenceDetailDaoSql(){
		// Constructor
//@non-generated-start[constructor][X]
		AgenceDetailDaoSql._Parent.call(this);
		this.lastId = null;
		this.mapping = AgenceDetailDaoMapping.mappingSql;
		this.syncDisabled = false;
		this.tableName = 'T_AGENCEDETAIL';
		this.entityName = 'AgenceDetail';
		this.cascadeDefinition = [
			{
				readAction: 'get', parentAttrPointingChild: 'agence',
				childDao: AgenceDaoProxy, childAttrPointingParent: 'detail'
			}
		];

//@non-generated-end
	};

	MFUtils.extendFromInstance(AgenceDetailDaoSql, MFDaoSqlAbstract);



	//==================================================================================
	//========   SPECIFIC METHODS - GET
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name AgenceDetailDaoSql#getAgenceDetailById
	 * @function
	 *
	 * @description
	 * Returns a AgenceDetail by id.
	 *
	 * @param {Integer} p_id Integer id of the AgenceDetail to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {AgenceDetail} Returns the AgenceDetail, including children if required
	 */
	AgenceDetailDaoSql.prototype.getAgenceDetailById = function(p_id, p_context, p_cascadeSet) {

//@non-generated-start[getAgenceDetailById-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDetailDaoSql.getAgenceDetailById() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'AgenceDetailDaoSql.getAgenceDetailById() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_id), 'AgenceDetailDaoSql.getAgenceDetailById() : p_id is required');

		var deferred = $qSync.defer();
		var self = this;

		self.getEntitiesByProperty('id', p_id, p_context).then(

function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
function (returnedSuccess_cascade) {
deferred.resolve(returnedSuccess_executeQueryToRead[0]);
},
function (returnedError_cascade) {
console.error('AgenceDetailDaoSql.getAgenceDetailById(): cascade error: ', returnedError_cascade);
p_context.addError('AgenceDetailDaoSql.getAgenceDetailById(): cascade error: '+ returnedError_cascade);
deferred.reject(returnedError_cascade);
}
);
},
function (returnedError_executeQueryToRead) { /* ERROR */
console.error('AgenceDetailDaoSql.getAgenceDetailById(): error: ', returnedError_executeQueryToRead);
p_context.addError('AgenceDetailDaoSql.getAgenceDetailById(): error: '+ returnedError_executeQueryToRead);
deferred.reject(returnedError_executeQueryToRead);
}
);

//@non-generated-start[getAgenceDetailById-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name AgenceDetailDaoSql#getListAgenceDetail
	 * @function
	 *
	 * @description
	 * Returns a list of AgenceDetails according to the parameter(s).
	 *
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of AgenceDetails, including children if required.
	 */
	AgenceDetailDaoSql.prototype.getListAgenceDetail = function(p_context, p_cascadeSet) {

//@non-generated-start[getListAgenceDetail-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDetailDaoSql.getListAgenceDetail() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'AgenceDetailDaoSql.getListAgenceDetail() : p_cascadeSet is required and should be an array');

		var deferred = $qSync.defer();
		var self = this;

		self.getEntitiesByProperty('*', [], p_context).then(

function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
function (returnedSuccess_cascade) {
deferred.resolve(returnedSuccess_executeQueryToRead);
},
function (returnedError_cascade) {
console.error('AgenceDetailDaoSql.getListAgenceDetail(): cascade error: ', returnedError_cascade);
p_context.addError('AgenceDetailDaoSql.getListAgenceDetail(): cascade error: '+ returnedError_cascade);
deferred.reject(returnedError_cascade);
}
);
},
function (returnedError_executeQueryToRead) { /* ERROR */
console.error('AgenceDetailDaoSql.getListAgenceDetail(): error: ', returnedError_executeQueryToRead);
p_context.addError('AgenceDetailDaoSql.getListAgenceDetail(): error: '+ returnedError_executeQueryToRead);
deferred.reject(returnedError_executeQueryToRead);
}
);

//@non-generated-start[getListAgenceDetail-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name AgenceDetailDaoSql#getListAgenceDetailByIds
	 * @function
	 *
	 * @description
	 * Returns a list of AgenceDetails by ids.
	 *
	 * @param {Array<Integer>} p_ids Array containing ids of AgenceDetails to process (optional)
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of AgenceDetails, including children if required.
	 */
	AgenceDetailDaoSql.prototype.getListAgenceDetailByIds = function(p_ids, p_context, p_cascadeSet) {

//@non-generated-start[getListAgenceDetailByIds-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDetailDaoSql.getListAgenceDetailByIds() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'AgenceDetailDaoSql.getListAgenceDetailByIds() : p_cascadeSet is required and should be an array');
		console.assert(angular.isUndefinedOrNull(p_ids) || angular.isArray(p_ids), 'AgenceDetailDaoSql.getListAgenceDetailByIds() : p_ids should be an array, if given');

		var deferred = $qSync.defer();
		var self = this;

		self.getEntitiesByProperty('id', p_ids, p_context).then(

function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
function (returnedSuccess_cascade) {
deferred.resolve(returnedSuccess_executeQueryToRead);
},
function (returnedError_cascade) {
console.error('AgenceDetailDaoSql.getListAgenceDetailByIds(): cascade error: ', returnedError_cascade);
p_context.addError('AgenceDetailDaoSql.getListAgenceDetailByIds(): cascade error: '+ returnedError_cascade);
deferred.reject(returnedError_cascade);
}
);
},
function (returnedError_executeQueryToRead) { /* ERROR */
console.error('AgenceDetailDaoSql.getListAgenceDetailByIds(): error: ', returnedError_executeQueryToRead);
p_context.addError('AgenceDetailDaoSql.getListAgenceDetailByIds(): error: '+ returnedError_executeQueryToRead);
deferred.reject(returnedError_executeQueryToRead);
}
);

//@non-generated-start[getListAgenceDetailByIds-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name AgenceDetailDaoSql#getAgenceDetailByAgence
	 * @function
	 *
	 * @description
	 * Returns the list of all AgenceDetails.
	 *
	 * @param {Array<Integer>} p_foreignKeys_agence
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {AgenceDetail} Returns the AgenceDetail, including children if required
	 */
	AgenceDetailDaoSql.prototype.getAgenceDetailByAgence = function(p_foreignKeys_agence, p_context, p_cascadeSet) {

//@non-generated-start[getAgenceDetailByAgence-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDetailDaoSql.getAgenceDetailByAgence() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'AgenceDetailDaoSql.getAgenceDetailByAgence() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_foreignKeys_agence), 'AgenceDetailDaoSql.getAgenceDetailByAgence() : p_foreignKeys_agence is required');

		var deferred = $qSync.defer();
		var self = this;

		var o_sqlQuery = 'select * from T_AGENCEDETAIL where AGENCEID in ('+ self.produceQueryInPart(p_foreignKeys_agence.idToString) +');';
		var o_sqlParameters = [].concat(p_foreignKeys_agence.idToString);

		self.executeQueryToRead(
			'AgenceDetailDaoSql.getAgenceDetailByAgence()', p_context, o_sqlQuery, o_sqlParameters).then(

function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
function (returnedSuccess_cascade) {
deferred.resolve(returnedSuccess_executeQueryToRead[0]);
},
function (returnedError_cascade) {
console.error('AgenceDetailDaoSql.getAgenceDetailByAgence(): cascade error: ', returnedError_cascade);
p_context.addError('AgenceDetailDaoSql.getAgenceDetailByAgence(): cascade error: '+ returnedError_cascade);
deferred.reject(returnedError_cascade);
}
);
},
function (returnedError_executeQueryToRead) { /* ERROR */
console.error('AgenceDetailDaoSql.getAgenceDetailByAgence(): error: ', returnedError_executeQueryToRead);
p_context.addError('AgenceDetailDaoSql.getAgenceDetailByAgence(): error: '+ returnedError_executeQueryToRead);
deferred.reject(returnedError_executeQueryToRead);
}
);

//@non-generated-start[getAgenceDetailByAgence-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name AgenceDetailDaoSql#getAgenceDetailByAgenceid
	 * @function
	 *
	 * @description
	 * Returns the list of all AgenceDetails.
	 *
	 * @param {Array<Integer>} p_foreignKeys_agenceid
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {AgenceDetail} Returns the AgenceDetail, including children if required
	 */
	AgenceDetailDaoSql.prototype.getAgenceDetailByAgenceid = function(p_foreignKeys_agenceid, p_context, p_cascadeSet) {

//@non-generated-start[getAgenceDetailByAgenceid-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDetailDaoSql.getAgenceDetailByAgenceid() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'AgenceDetailDaoSql.getAgenceDetailByAgenceid() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_foreignKeys_agenceid), 'AgenceDetailDaoSql.getAgenceDetailByAgenceid() : p_foreignKeys_agenceid is required');

		var deferred = $qSync.defer();
		var self = this;

		var o_sqlQuery = 'select * from T_AGENCEDETAIL where AGENCEID in ('+ self.produceQueryInPart(p_foreignKeys_agenceid) +');';
		var o_sqlParameters = [].concat(p_foreignKeys_agenceid);

		self.executeQueryToRead(
			'AgenceDetailDaoSql.getAgenceDetailByAgenceid()', p_context, o_sqlQuery, o_sqlParameters).then(

function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
function (returnedSuccess_cascade) {
deferred.resolve(returnedSuccess_executeQueryToRead[0]);
},
function (returnedError_cascade) {
console.error('AgenceDetailDaoSql.getAgenceDetailByAgenceid(): cascade error: ', returnedError_cascade);
p_context.addError('AgenceDetailDaoSql.getAgenceDetailByAgenceid(): cascade error: '+ returnedError_cascade);
deferred.reject(returnedError_cascade);
}
);
},
function (returnedError_executeQueryToRead) { /* ERROR */
console.error('AgenceDetailDaoSql.getAgenceDetailByAgenceid(): error: ', returnedError_executeQueryToRead);
p_context.addError('AgenceDetailDaoSql.getAgenceDetailByAgenceid(): error: '+ returnedError_executeQueryToRead);
deferred.reject(returnedError_executeQueryToRead);
}
);

//@non-generated-start[getAgenceDetailByAgenceid-after][X]
//@non-generated-end

		return deferred.promise;
	};



	//==================================================================================
	//========   SPECIFIC METHODS - SAVE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name AgenceDetailDaoSql#saveAgenceDetail
	 * @function
	 *
	 * @description
	 * Saves a AgenceDetail.
	 *
	 * @param {AgenceDetail} p_entity AgenceDetail to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Promise} Returns a promise equal to true if the AgenceDetail was saved, false otherwise.
	 */
	AgenceDetailDaoSql.prototype.saveAgenceDetail = function(p_entity, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[saveAgenceDetail-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDetailDaoSql.saveAgenceDetail() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'AgenceDetailDaoSql.saveAgenceDetail() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_entity), 'AgenceDetailDaoSql.saveAgenceDetail() : p_entity is required');

		var deferred = $qSync.defer();
		var self = this;

		self.fixDoubleWaysRelationship(p_entity);
		// --------------------------
		// 1. save or update children pointed by the parent : for relationships xxx_to_one
		// --------------------------
		var savePointedChildren = [];

		//		1.1  call saveOrUpdate function of the child dao
		//		1.2  check that the ID attribute of the children model entities is updated (update foreign key of the parent pointing the child just saved)
/*jshint loopfunc: true *//* jshint shadow:true */for (var i = 0 , cascadeSetLength = p_cascadeSet.length ; i < cascadeSetLength ; i += 1) {
if( p_cascadeSet[i].entityName === p_entity._type ) {
if( p_cascadeSet[i].key === 'AGENCE') {
			savePointedChildren.push( AgenceDaoProxy.saveOrUpdateAgence(p_entity.agence, p_context, p_cascadeSet, p_toSync) );
		}
		}
		}

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
if( p_cascadeSet[i].key === 'AGENCE') {
							saveOtherChildren.push( AgenceDaoProxy.saveOrUpdateAgence(p_entity.agence, p_context, p_cascadeSet, p_toSync) );
}
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


//@non-generated-start[saveAgenceDetail-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name AgenceDetailDaoSql#saveListAgenceDetail
	 * @function
	 *
	 * @description
	 * Saves a list of AgenceDetails.
	 *
	 * @param {Array<AgenceDetail>} p_entities Array containing AgenceDetails to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of AgenceDetails was saved, false otherwise.
	 */
	AgenceDetailDaoSql.prototype.saveListAgenceDetail = function(p_entities, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[saveListAgenceDetail-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDetailDaoSql.saveListAgenceDetail() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'AgenceDetailDaoSql.saveListAgenceDetail() : p_cascadeSet is required and should be an array');
		console.assert(angular.isArray(p_entities), 'AgenceDetailDaoSql.saveListAgenceDetail() : p_entities is required and should be an array');

		var deferred = $qSync.defer();
		var self = this;

		/* saveListAgenceDetail() => saveAgenceDetail() */
		var o_arrayPromisesSaveAgenceDetail = [];
		for( var i = 0; i < p_entities.length; i++ ) {
			o_arrayPromisesSaveAgenceDetail.push( self.saveAgenceDetail(p_entities[i], p_context, angular.copy(p_cascadeSet), p_toSync) );
		}
		// $qSync.all() returns an array of the results of o_arrayPromisesSaveAgenceDetail.
		// If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
		deferred.resolve( $qSync.all(o_arrayPromisesSaveAgenceDetail) );


//@non-generated-start[saveListAgenceDetail-after][X]
//@non-generated-end

		return deferred.promise;
	};



	//==================================================================================
	//========   SPECIFIC METHODS - UPDATE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name AgenceDetailDaoSql#updateAgenceDetail
	 * @function
	 *
	 * @description
	 * Updates a AgenceDetail.
	 *
	 * @param {AgenceDetail} p_entity AgenceDetail to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
	 *
	 * @returns {Promise} Returns a promise equal to true if the AgenceDetail was updated, false otherwise.
	 */
	AgenceDetailDaoSql.prototype.updateAgenceDetail = function(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

//@non-generated-start[updateAgenceDetail-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDetailDaoSql.updateAgenceDetail() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'AgenceDetailDaoSql.updateAgenceDetail() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_entity), 'AgenceDetailDaoSql.updateAgenceDetail() : p_entity is required');

		var deferred = $qSync.defer();
		var self = this;

		var childrenPromises = [];

		self.fixDoubleWaysRelationship(p_entity);
		// for composition relationships one_to_xxx
/*jshint loopfunc: true *//* jshint shadow:true */for (var i = 0 , cascadeSetLength = p_cascadeSet.length ; i < cascadeSetLength ; i += 1) {
if( p_cascadeSet[i].entityName === p_entity._type ) {

if( p_cascadeSet[i].key === 'AGENCE') {

			// 1. delete the children that are not in p_entity if composition relationship one_to_xxx (delete from CHILD where PARENTID=xxx and CHILDID not in(xxx, xxx)
			childrenPromises.push(
				self.getChildrenIdsToRemove(p_context, p_entity, 'agence').then(
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
			childrenPromises.push( AgenceDaoProxy.saveOrUpdateAgence(p_entity.agence, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) );
		}
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


//@non-generated-start[updateAgenceDetail-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name AgenceDetailDaoSql#updateListAgenceDetail
	 * @function
	 *
	 * @description
	 * Updates a list of AgenceDetails.
	 *
	 * @param {Array<AgenceDetail>} p_entities Array containing AgenceDetails to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of AgenceDetails was updated, false otherwise.
	 */
	AgenceDetailDaoSql.prototype.updateListAgenceDetail = function(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

//@non-generated-start[updateListAgenceDetail-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDetailDaoSql.updateListAgenceDetail() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'AgenceDetailDaoSql.updateListAgenceDetail() : p_cascadeSet is required and should be an array');
		console.assert(angular.isArray(p_entities), 'AgenceDetailDaoSql.updateListAgenceDetail() : p_entities is required and should be an array');

		var deferred = $qSync.defer();
		var self = this;

		/* updateListAgenceDetail() => updateAgenceDetail() */
		var o_arrayPromisesUpdateAgenceDetail = [];
		for( var i = 0; i < p_entities.length; i++ ) {
			o_arrayPromisesUpdateAgenceDetail.push( self.updateAgenceDetail(p_entities[i], p_context, angular.copy(p_cascadeSet), p_toSync, angular.copy(p_cascadeSetForDelete)) );
		}
		// $qSync.all() returns an array of the results of o_arrayPromisesUpdateAgenceDetail.
		// If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
		deferred.resolve( $qSync.all(o_arrayPromisesUpdateAgenceDetail) );


//@non-generated-start[updateListAgenceDetail-after][X]
//@non-generated-end

		return deferred.promise;
	};



	//==================================================================================
	//========   SPECIFIC METHODS - SAVE & UPDATE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name AgenceDetailDaoSql#saveOrUpdateAgenceDetail
	 * @function
	 *
	 * @description
	 * Saves of updates a AgenceDetail.
	 *
	 * @param {AgenceDetail} p_entity AgenceDetail to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
	 *
	 * @returns {Promise} Returns a promise equal to true if the AgenceDetail was saved or updated, false otherwise.
	 */
	AgenceDetailDaoSql.prototype.saveOrUpdateAgenceDetail = function(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

//@non-generated-start[saveOrUpdateAgenceDetail-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDetailDaoSql.saveOrUpdateAgenceDetail() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'AgenceDetailDaoSql.saveOrUpdateAgenceDetail() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_entity), 'AgenceDetailDaoSql.saveOrUpdateAgenceDetail() : p_entity is required');

		var deferred = $qSync.defer();
		var self = this;

		if(p_entity.idToString !== -1) { 
			this.exist(p_entity, p_context).then(function(result) {
				if(result){ 
					/* updateAgenceDetail */
					console.log('AgenceDetailDaoSql.saveOrUpdateAgenceDetail(): entity exists  => updateAgenceDetail()');
					deferred.resolve( self.updateAgenceDetail(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) );
				} else {
				/* saveAgenceDetail */
					console.log('AgenceDetailDaoSql.saveOrUpdateAgenceDetail(): entity does not exist  => saveAgenceDetail()');
					deferred.resolve( self.saveAgenceDetail(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) ); // last parameter ignored by called method
				}
			},
 			function(error) { 
				deferred.reject(error); 
			});
		} else { 
			/* saveAgenceDetail */
			console.log('AgenceDetailDaoSql.saveOrUpdateAgenceDetail(): entity does not exist  => saveAgenceDetail()');
			deferred.resolve( self.saveAgenceDetail(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) ); // last parameter ignored by called method
		}


//@non-generated-start[saveOrUpdateAgenceDetail-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name AgenceDetailDaoSql#saveOrUpdateListAgenceDetail
	 * @function
	 *
	 * @description
	 * Saves of updates a list of AgenceDetails.
	 *
	 * @param {Array<AgenceDetail>} p_entities Array containing AgenceDetails to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of AgenceDetails was saved or updated, false otherwise.
	 */
	AgenceDetailDaoSql.prototype.saveOrUpdateListAgenceDetail = function(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

//@non-generated-start[saveOrUpdateListAgenceDetail-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDetailDaoSql.saveOrUpdateListAgenceDetail() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'AgenceDetailDaoSql.saveOrUpdateListAgenceDetail() : p_cascadeSet is required and should be an array');
		console.assert(angular.isArray(p_entities), 'AgenceDetailDaoSql.saveOrUpdateListAgenceDetail() : p_entities is required and should be an array');

		var deferred = $qSync.defer();
		var self = this;

		/* saveOrUpdateListAgenceDetail() => saveOrUpdateAgenceDetail() */
		var o_arrayPromisesSaveOrUpdateAgenceDetail = [];
		for(var i = 0; i < p_entities.length; i++) {
			o_arrayPromisesSaveOrUpdateAgenceDetail.push( self.saveOrUpdateAgenceDetail(p_entities[i], p_context, angular.copy(p_cascadeSet), p_toSync, angular.copy(p_cascadeSetForDelete)) );
		}
		// $qSync.all() returns an array of the results of o_arrayPromisesSaveOrUpdateAgenceDetail.
		// If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
		deferred.resolve( $qSync.all(o_arrayPromisesSaveOrUpdateAgenceDetail) );


//@non-generated-start[saveOrUpdateListAgenceDetail-after][X]
//@non-generated-end

		return deferred.promise;
	};



	//==================================================================================
	//========   SPECIFIC METHODS - DELETE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name AgenceDetailDaoSql#deleteAgenceDetail
	 * @function
	 *
	 * @description
	 * Delete a AgenceDetail.
	 *
	 * @param {AgenceDetail} p_entity AgenceDetail to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Promise} Returns a promise equal to true if the AgenceDetail was deleted, false otherwise.
	 */
	AgenceDetailDaoSql.prototype.deleteAgenceDetail = function(p_entity, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[deleteAgenceDetail-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDetailDaoSql.deleteAgenceDetail() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'AgenceDetailDaoSql.deleteAgenceDetail() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_entity), 'AgenceDetailDaoSql.deleteAgenceDetail() : p_entity is required');

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

								//5. for composition and aggregation relationships xxx_to_one
/*jshint loopfunc: true *//* jshint shadow:true */for (var i = 0 , cascadeSetLength = p_cascadeSet.length ; i < cascadeSetLength ; i += 1) {
if( p_cascadeSet[i].entityName === p_entity._type ) {
if( p_cascadeSet[i].key === 'AGENCE') {
									pointersDeletes.push( AgenceDaoProxy.deleteAgence(p_entity.agence, p_context, p_cascadeSet, p_toSync) );
								}
		}
		}

								$qSync.all(pointersDeletes).then(
									function(returnedSuccess_executeQuery2ToDelete) { /* SUCCESS */
										deferred.resolve(returnedSuccess_executeQuery2ToDelete);
									},
									function (returnedError_executeQuery2ToDelete) { /* ERROR */
										console.error('AgenceDetailDaoSql.deleteAgenceDetail(): error: ', returnedError_executeQuery2ToDelete);
										p_context.addError('AgenceDetailDaoSql.deleteAgenceDetail(): error: '+ returnedError_executeQuery2ToDelete);
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

//@non-generated-start[deleteAgenceDetail-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name AgenceDetailDaoSql#deleteAgenceDetailById
	 * @function
	 *
	 * @description
	 * Deletes a AgenceDetail by id.
	 *
	 * @param {Integer} p_id Integer id of the AgenceDetail to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Promise} Returns a promise equal to true if the AgenceDetail was deleted, false otherwise.
	 */
	AgenceDetailDaoSql.prototype.deleteAgenceDetailById = function(p_id, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[deleteAgenceDetailById-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDetailDaoSql.deleteAgenceDetailById() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'AgenceDetailDaoSql.deleteAgenceDetailById() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_id), 'AgenceDetailDaoSql.deleteAgenceDetailById() : p_id is required');

		var deferred = $qSync.defer();
		var self = this;

		self.getAgenceDetailById(p_id, p_context, angular.copy(p_cascadeSet), p_toSync).then(
			function(entity){
				deferred.resolve( self.deleteAgenceDetail(entity, p_context, angular.copy(p_cascadeSet), p_toSync) );
			},
			function(error){
				deferred.reject(error);
			}
		);


//@non-generated-start[deleteAgenceDetailById-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name AgenceDetailDaoSql#deleteListAgenceDetail
	 * @function
	 *
	 * @description
	 * Deletes a list of AgenceDetails.
	 *
	 * @param {Array<AgenceDetail>} p_entities Array containing AgenceDetails to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of AgenceDetails was deleted, false otherwise.
	 */
	AgenceDetailDaoSql.prototype.deleteListAgenceDetail = function(p_entities, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[deleteListAgenceDetail-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDetailDaoSql.deleteListAgenceDetail() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'AgenceDetailDaoSql.deleteListAgenceDetail() : p_cascadeSet is required and should be an array');
		console.assert(angular.isArray(p_entities), 'AgenceDetailDaoSql.deleteListAgenceDetail() : p_entities is required and should be an array');

		var deferred = $qSync.defer();
		var self = this;

		/* deleteListAgenceDetail() => deleteAgenceDetail() */
		var o_arrayPromisesDeleteAgenceDetail = [];
		for( var i = 0; i < p_entities.length; i++ ) {
			o_arrayPromisesDeleteAgenceDetail.push( self.deleteAgenceDetail(p_entities[i], p_context, angular.copy(p_cascadeSet), p_toSync) );
		}
		// $qSync.all() returns an array of the results of o_arrayPromisesDeleteAgenceDetail.
		// If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
		deferred.resolve( $qSync.all(o_arrayPromisesDeleteAgenceDetail) );


//@non-generated-start[deleteListAgenceDetail-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name AgenceDetailDaoSql#deleteListAgenceDetailByIds
	 * @function
	 *
	 * @description
	 * Deletes a list of AgenceDetails by ids.
	 *
	 * @param {Array<Integer>} p_ids Array containing ids of AgenceDetails to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of AgenceDetails was deleted, false otherwise.
	 */
	AgenceDetailDaoSql.prototype.deleteListAgenceDetailByIds = function(p_ids, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[deleteListAgenceDetailByIds-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'AgenceDetailDaoSql.deleteListAgenceDetailByIds() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'AgenceDetailDaoSql.deleteListAgenceDetailByIds() : p_cascadeSet is required and should be an array');
		console.assert(angular.isUndefinedOrNull(p_ids) || angular.isArray(p_ids), 'AgenceDetailDaoSql.deleteListAgenceDetailByIds() : p_ids should be an array, if given');

		var deferred = $qSync.defer();
		var self = this;

		/* deleteListAgenceDetailByIds() => deleteListAgenceDetailById() */
		var o_arrayPromisesDeleteAgenceDetail = [];
		for( var i = 0; i < p_ids.length; i++ ) {
			o_arrayPromisesDeleteAgenceDetail.push( self.deleteAgenceDetailById(p_ids[i], p_context, angular.copy(p_cascadeSet), p_toSync) );
		}
		// $qSync.all() returns an array of the results of o_arrayPromisesDeleteAgenceDetail.
		// If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
		deferred.resolve( $qSync.all(o_arrayPromisesDeleteAgenceDetail) );


//@non-generated-start[deleteListAgenceDetailByIds-after][X]
//@non-generated-end

		return deferred.promise;
	};



//@non-generated-start[other-methods][X]
//@non-generated-end


	return new AgenceDetailDaoSql();
}]);
