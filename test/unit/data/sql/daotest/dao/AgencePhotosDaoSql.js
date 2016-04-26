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

angular.module('data-daotest-sql').factory('AgencePhotosDaoSql',
	['AgenceDaoProxy', 'AgencePhotosDaoMapping', 'MFSyncPromiseProvider', 'MFDaoSqlAbstract', 'MFUtils', 'MFMappingHelper',
//@non-generated-start[dependencies-names][X]
//@non-generated-end

//@non-generated-start[dependencies-classes][X]
function(AgenceDaoProxy, AgencePhotosDaoMapping, $qSync, MFDaoSqlAbstract, MFUtils, MFMappingHelper
//@non-generated-end
)
{

	var AgencePhotosDaoSql = function AgencePhotosDaoSql(){
		// Constructor
//@non-generated-start[constructor][X]
		AgencePhotosDaoSql._Parent.call(this);
		this.lastId = null;
		this.mapping = AgencePhotosDaoMapping.mappingSql;
		this.syncDisabled = false;
		this.tableName = 'T_AGENCEPHOTOS';
		this.entityName = 'AgencePhotos';
		this.cascadeDefinition = [
			{
				readAction: 'get', parentAttrPointingChild: 'photosAgence',
				childDao: AgenceDaoProxy, childAttrPointingParent: 'photos'
			}
		];

//@non-generated-end
	};

	MFUtils.extendFromInstance(AgencePhotosDaoSql, MFDaoSqlAbstract);



	//==================================================================================
	//========   SPECIFIC METHODS - GET
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name AgencePhotosDaoSql#getAgencePhotosById
	 * @function
	 *
	 * @description
	 * Returns a AgencePhotos by id.
	 *
	 * @param {Integer} p_id Integer id of the AgencePhotos to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {AgencePhotos} Returns the AgencePhotos, including children if required
	 */
	AgencePhotosDaoSql.prototype.getAgencePhotosById = function(p_id, p_context, p_cascadeSet) {

//@non-generated-start[getAgencePhotosById-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'AgencePhotosDaoSql.getAgencePhotosById() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'AgencePhotosDaoSql.getAgencePhotosById() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_id), 'AgencePhotosDaoSql.getAgencePhotosById() : p_id is required');

		var deferred = $qSync.defer();
		var self = this;

		self.getEntitiesByProperty('identifier', p_id, p_context).then(

function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
function (returnedSuccess_cascade) {
deferred.resolve(returnedSuccess_executeQueryToRead[0]);
},
function (returnedError_cascade) {
console.error('AgencePhotosDaoSql.getAgencePhotosById(): cascade error: ', returnedError_cascade);
p_context.addError('AgencePhotosDaoSql.getAgencePhotosById(): cascade error: '+ returnedError_cascade);
deferred.reject(returnedError_cascade);
}
);
},
function (returnedError_executeQueryToRead) { /* ERROR */
console.error('AgencePhotosDaoSql.getAgencePhotosById(): error: ', returnedError_executeQueryToRead);
p_context.addError('AgencePhotosDaoSql.getAgencePhotosById(): error: '+ returnedError_executeQueryToRead);
deferred.reject(returnedError_executeQueryToRead);
}
);

//@non-generated-start[getAgencePhotosById-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name AgencePhotosDaoSql#getListAgencePhotos
	 * @function
	 *
	 * @description
	 * Returns a list of AgencePhotoss according to the parameter(s).
	 *
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of AgencePhotoss, including children if required.
	 */
	AgencePhotosDaoSql.prototype.getListAgencePhotos = function(p_context, p_cascadeSet) {

//@non-generated-start[getListAgencePhotos-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'AgencePhotosDaoSql.getListAgencePhotos() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'AgencePhotosDaoSql.getListAgencePhotos() : p_cascadeSet is required and should be an array');

		var deferred = $qSync.defer();
		var self = this;

		self.getEntitiesByProperty('*', [], p_context).then(

function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
function (returnedSuccess_cascade) {
deferred.resolve(returnedSuccess_executeQueryToRead);
},
function (returnedError_cascade) {
console.error('AgencePhotosDaoSql.getListAgencePhotos(): cascade error: ', returnedError_cascade);
p_context.addError('AgencePhotosDaoSql.getListAgencePhotos(): cascade error: '+ returnedError_cascade);
deferred.reject(returnedError_cascade);
}
);
},
function (returnedError_executeQueryToRead) { /* ERROR */
console.error('AgencePhotosDaoSql.getListAgencePhotos(): error: ', returnedError_executeQueryToRead);
p_context.addError('AgencePhotosDaoSql.getListAgencePhotos(): error: '+ returnedError_executeQueryToRead);
deferred.reject(returnedError_executeQueryToRead);
}
);

//@non-generated-start[getListAgencePhotos-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name AgencePhotosDaoSql#getListAgencePhotosByIds
	 * @function
	 *
	 * @description
	 * Returns a list of AgencePhotoss by ids.
	 *
	 * @param {Array<Integer>} p_ids Array containing ids of AgencePhotoss to process (optional)
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of AgencePhotoss, including children if required.
	 */
	AgencePhotosDaoSql.prototype.getListAgencePhotosByIds = function(p_ids, p_context, p_cascadeSet) {

//@non-generated-start[getListAgencePhotosByIds-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'AgencePhotosDaoSql.getListAgencePhotosByIds() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'AgencePhotosDaoSql.getListAgencePhotosByIds() : p_cascadeSet is required and should be an array');
		console.assert(angular.isUndefinedOrNull(p_ids) || angular.isArray(p_ids), 'AgencePhotosDaoSql.getListAgencePhotosByIds() : p_ids should be an array, if given');

		var deferred = $qSync.defer();
		var self = this;

		self.getEntitiesByProperty('identifier', p_ids, p_context).then(

function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
function (returnedSuccess_cascade) {
deferred.resolve(returnedSuccess_executeQueryToRead);
},
function (returnedError_cascade) {
console.error('AgencePhotosDaoSql.getListAgencePhotosByIds(): cascade error: ', returnedError_cascade);
p_context.addError('AgencePhotosDaoSql.getListAgencePhotosByIds(): cascade error: '+ returnedError_cascade);
deferred.reject(returnedError_cascade);
}
);
},
function (returnedError_executeQueryToRead) { /* ERROR */
console.error('AgencePhotosDaoSql.getListAgencePhotosByIds(): error: ', returnedError_executeQueryToRead);
p_context.addError('AgencePhotosDaoSql.getListAgencePhotosByIds(): error: '+ returnedError_executeQueryToRead);
deferred.reject(returnedError_executeQueryToRead);
}
);

//@non-generated-start[getListAgencePhotosByIds-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name AgencePhotosDaoSql#getListAgencePhotosByPhotosAgence
	 * @function
	 *
	 * @description
	 * Returns a list of AgencePhotoss according to the parameter(s).
	 *
	 * @param {Array<Integer>} p_foreignKeys_photosAgence
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of AgencePhotoss, including children if required.
	 */
	AgencePhotosDaoSql.prototype.getListAgencePhotosByPhotosAgence = function(p_foreignKeys_photosAgence, p_context, p_cascadeSet) {

//@non-generated-start[getListAgencePhotosByPhotosAgence-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'AgencePhotosDaoSql.getListAgencePhotosByPhotosAgence() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'AgencePhotosDaoSql.getListAgencePhotosByPhotosAgence() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_foreignKeys_photosAgence), 'AgencePhotosDaoSql.getListAgencePhotosByPhotosAgence() : p_foreignKeys_photosAgence is required');

		var deferred = $qSync.defer();
		var self = this;

		var o_sqlQuery = 'select * from T_AGENCEPHOTOS where PHOTOSAGENCEID in ('+ self.produceQueryInPart(p_foreignKeys_photosAgence.idToString) +');';
		var o_sqlParameters = [].concat(p_foreignKeys_photosAgence.idToString);

		self.executeQueryToRead(
			'AgencePhotosDaoSql.getListAgencePhotosByPhotosAgence()', p_context, o_sqlQuery, o_sqlParameters).then(

function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
function (returnedSuccess_cascade) {
deferred.resolve(returnedSuccess_executeQueryToRead);
},
function (returnedError_cascade) {
console.error('AgencePhotosDaoSql.getListAgencePhotosByPhotosAgence(): cascade error: ', returnedError_cascade);
p_context.addError('AgencePhotosDaoSql.getListAgencePhotosByPhotosAgence(): cascade error: '+ returnedError_cascade);
deferred.reject(returnedError_cascade);
}
);
},
function (returnedError_executeQueryToRead) { /* ERROR */
console.error('AgencePhotosDaoSql.getListAgencePhotosByPhotosAgence(): error: ', returnedError_executeQueryToRead);
p_context.addError('AgencePhotosDaoSql.getListAgencePhotosByPhotosAgence(): error: '+ returnedError_executeQueryToRead);
deferred.reject(returnedError_executeQueryToRead);
}
);

//@non-generated-start[getListAgencePhotosByPhotosAgence-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name AgencePhotosDaoSql#getListAgencePhotosByPhotosAgenceid
	 * @function
	 *
	 * @description
	 * Returns a list of AgencePhotoss according to the parameter(s).
	 *
	 * @param {Array<Integer>} p_foreignKeys_photosAgenceid
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of AgencePhotoss, including children if required.
	 */
	AgencePhotosDaoSql.prototype.getListAgencePhotosByPhotosAgenceid = function(p_foreignKeys_photosAgenceid, p_context, p_cascadeSet) {

//@non-generated-start[getListAgencePhotosByPhotosAgenceid-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'AgencePhotosDaoSql.getListAgencePhotosByPhotosAgenceid() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'AgencePhotosDaoSql.getListAgencePhotosByPhotosAgenceid() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_foreignKeys_photosAgenceid), 'AgencePhotosDaoSql.getListAgencePhotosByPhotosAgenceid() : p_foreignKeys_photosAgenceid is required');

		var deferred = $qSync.defer();
		var self = this;

		var o_sqlQuery = 'select * from T_AGENCEPHOTOS where PHOTOSAGENCEID in ('+ self.produceQueryInPart(p_foreignKeys_photosAgenceid) +');';
		var o_sqlParameters = [].concat(p_foreignKeys_photosAgenceid);

		self.executeQueryToRead(
			'AgencePhotosDaoSql.getListAgencePhotosByPhotosAgenceid()', p_context, o_sqlQuery, o_sqlParameters).then(

function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
function (returnedSuccess_cascade) {
deferred.resolve(returnedSuccess_executeQueryToRead);
},
function (returnedError_cascade) {
console.error('AgencePhotosDaoSql.getListAgencePhotosByPhotosAgenceid(): cascade error: ', returnedError_cascade);
p_context.addError('AgencePhotosDaoSql.getListAgencePhotosByPhotosAgenceid(): cascade error: '+ returnedError_cascade);
deferred.reject(returnedError_cascade);
}
);
},
function (returnedError_executeQueryToRead) { /* ERROR */
console.error('AgencePhotosDaoSql.getListAgencePhotosByPhotosAgenceid(): error: ', returnedError_executeQueryToRead);
p_context.addError('AgencePhotosDaoSql.getListAgencePhotosByPhotosAgenceid(): error: '+ returnedError_executeQueryToRead);
deferred.reject(returnedError_executeQueryToRead);
}
);

//@non-generated-start[getListAgencePhotosByPhotosAgenceid-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name AgencePhotosDaoSql#getListAgencePhotosByPhotosAgenceids
	 * @function
	 *
	 * @description
	 * Returns a list of AgencePhotoss according to the parameter(s).
	 *
	 * @param {Array<Integer>} p_foreignKeys_photosAgenceids
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of AgencePhotoss, including children if required.
	 */
	AgencePhotosDaoSql.prototype.getListAgencePhotosByPhotosAgenceids = function(p_foreignKeys_photosAgenceids, p_context, p_cascadeSet) {

//@non-generated-start[getListAgencePhotosByPhotosAgenceids-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'AgencePhotosDaoSql.getListAgencePhotosByPhotosAgenceids() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'AgencePhotosDaoSql.getListAgencePhotosByPhotosAgenceids() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_foreignKeys_photosAgenceids), 'AgencePhotosDaoSql.getListAgencePhotosByPhotosAgenceids() : p_foreignKeys_photosAgenceids is required');

		var deferred = $qSync.defer();
		var self = this;

		var o_sqlQuery = 'select * from T_AGENCEPHOTOS where PHOTOSAGENCEID in ('+ self.produceQueryInPart(p_foreignKeys_photosAgenceids) +');';
		var o_sqlParameters = [].concat(p_foreignKeys_photosAgenceids);

		self.executeQueryToRead(
			'AgencePhotosDaoSql.getListAgencePhotosByPhotosAgenceids()', p_context, o_sqlQuery, o_sqlParameters).then(

function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
function (returnedSuccess_cascade) {
deferred.resolve(returnedSuccess_executeQueryToRead);
},
function (returnedError_cascade) {
console.error('AgencePhotosDaoSql.getListAgencePhotosByPhotosAgenceids(): cascade error: ', returnedError_cascade);
p_context.addError('AgencePhotosDaoSql.getListAgencePhotosByPhotosAgenceids(): cascade error: '+ returnedError_cascade);
deferred.reject(returnedError_cascade);
}
);
},
function (returnedError_executeQueryToRead) { /* ERROR */
console.error('AgencePhotosDaoSql.getListAgencePhotosByPhotosAgenceids(): error: ', returnedError_executeQueryToRead);
p_context.addError('AgencePhotosDaoSql.getListAgencePhotosByPhotosAgenceids(): error: '+ returnedError_executeQueryToRead);
deferred.reject(returnedError_executeQueryToRead);
}
);

//@non-generated-start[getListAgencePhotosByPhotosAgenceids-after][X]
//@non-generated-end

		return deferred.promise;
	};



	//==================================================================================
	//========   SPECIFIC METHODS - SAVE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name AgencePhotosDaoSql#saveAgencePhotos
	 * @function
	 *
	 * @description
	 * Saves a AgencePhotos.
	 *
	 * @param {AgencePhotos} p_entity AgencePhotos to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Promise} Returns a promise equal to true if the AgencePhotos was saved, false otherwise.
	 */
	AgencePhotosDaoSql.prototype.saveAgencePhotos = function(p_entity, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[saveAgencePhotos-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'AgencePhotosDaoSql.saveAgencePhotos() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'AgencePhotosDaoSql.saveAgencePhotos() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_entity), 'AgencePhotosDaoSql.saveAgencePhotos() : p_entity is required');

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
if( p_cascadeSet[i].key === 'PHOTOSAGENCE') {
			savePointedChildren.push( AgenceDaoProxy.saveOrUpdateAgence(p_entity.photosAgence, p_context, p_cascadeSet, p_toSync) );
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


//@non-generated-start[saveAgencePhotos-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name AgencePhotosDaoSql#saveListAgencePhotos
	 * @function
	 *
	 * @description
	 * Saves a list of AgencePhotoss.
	 *
	 * @param {Array<AgencePhotos>} p_entities Array containing AgencePhotoss to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of AgencePhotoss was saved, false otherwise.
	 */
	AgencePhotosDaoSql.prototype.saveListAgencePhotos = function(p_entities, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[saveListAgencePhotos-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'AgencePhotosDaoSql.saveListAgencePhotos() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'AgencePhotosDaoSql.saveListAgencePhotos() : p_cascadeSet is required and should be an array');
		console.assert(angular.isArray(p_entities), 'AgencePhotosDaoSql.saveListAgencePhotos() : p_entities is required and should be an array');

		var deferred = $qSync.defer();
		var self = this;

		/* saveListAgencePhotos() => saveAgencePhotos() */
		var o_arrayPromisesSaveAgencePhotos = [];
		for( var i = 0; i < p_entities.length; i++ ) {
			o_arrayPromisesSaveAgencePhotos.push( self.saveAgencePhotos(p_entities[i], p_context, angular.copy(p_cascadeSet), p_toSync) );
		}
		// $qSync.all() returns an array of the results of o_arrayPromisesSaveAgencePhotos.
		// If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
		deferred.resolve( $qSync.all(o_arrayPromisesSaveAgencePhotos) );


//@non-generated-start[saveListAgencePhotos-after][X]
//@non-generated-end

		return deferred.promise;
	};



	//==================================================================================
	//========   SPECIFIC METHODS - UPDATE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name AgencePhotosDaoSql#updateAgencePhotos
	 * @function
	 *
	 * @description
	 * Updates a AgencePhotos.
	 *
	 * @param {AgencePhotos} p_entity AgencePhotos to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
	 *
	 * @returns {Promise} Returns a promise equal to true if the AgencePhotos was updated, false otherwise.
	 */
	AgencePhotosDaoSql.prototype.updateAgencePhotos = function(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

//@non-generated-start[updateAgencePhotos-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'AgencePhotosDaoSql.updateAgencePhotos() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'AgencePhotosDaoSql.updateAgencePhotos() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_entity), 'AgencePhotosDaoSql.updateAgencePhotos() : p_entity is required');

		var deferred = $qSync.defer();
		var self = this;

		var childrenPromises = [];

		self.fixDoubleWaysRelationship(p_entity);


		// 2. save or update all the other children (no matter the type of relationship), if asked by p_cascadeset
/*jshint loopfunc: true *//* jshint shadow:true */for (var i = 0 , cascadeSetLength = p_cascadeSet.length ; i < cascadeSetLength ; i += 1) {
if( p_cascadeSet[i].entityName === p_entity._type ) {
if( p_cascadeSet[i].key === 'PHOTOSAGENCE') {
			childrenPromises.push( AgenceDaoProxy.saveOrUpdateAgence(p_entity.photosAgence, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) );
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


//@non-generated-start[updateAgencePhotos-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name AgencePhotosDaoSql#updateListAgencePhotos
	 * @function
	 *
	 * @description
	 * Updates a list of AgencePhotoss.
	 *
	 * @param {Array<AgencePhotos>} p_entities Array containing AgencePhotoss to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of AgencePhotoss was updated, false otherwise.
	 */
	AgencePhotosDaoSql.prototype.updateListAgencePhotos = function(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

//@non-generated-start[updateListAgencePhotos-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'AgencePhotosDaoSql.updateListAgencePhotos() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'AgencePhotosDaoSql.updateListAgencePhotos() : p_cascadeSet is required and should be an array');
		console.assert(angular.isArray(p_entities), 'AgencePhotosDaoSql.updateListAgencePhotos() : p_entities is required and should be an array');

		var deferred = $qSync.defer();
		var self = this;

		/* updateListAgencePhotos() => updateAgencePhotos() */
		var o_arrayPromisesUpdateAgencePhotos = [];
		for( var i = 0; i < p_entities.length; i++ ) {
			o_arrayPromisesUpdateAgencePhotos.push( self.updateAgencePhotos(p_entities[i], p_context, angular.copy(p_cascadeSet), p_toSync, angular.copy(p_cascadeSetForDelete)) );
		}
		// $qSync.all() returns an array of the results of o_arrayPromisesUpdateAgencePhotos.
		// If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
		deferred.resolve( $qSync.all(o_arrayPromisesUpdateAgencePhotos) );


//@non-generated-start[updateListAgencePhotos-after][X]
//@non-generated-end

		return deferred.promise;
	};



	//==================================================================================
	//========   SPECIFIC METHODS - SAVE & UPDATE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name AgencePhotosDaoSql#saveOrUpdateAgencePhotos
	 * @function
	 *
	 * @description
	 * Saves of updates a AgencePhotos.
	 *
	 * @param {AgencePhotos} p_entity AgencePhotos to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
	 *
	 * @returns {Promise} Returns a promise equal to true if the AgencePhotos was saved or updated, false otherwise.
	 */
	AgencePhotosDaoSql.prototype.saveOrUpdateAgencePhotos = function(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

//@non-generated-start[saveOrUpdateAgencePhotos-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'AgencePhotosDaoSql.saveOrUpdateAgencePhotos() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'AgencePhotosDaoSql.saveOrUpdateAgencePhotos() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_entity), 'AgencePhotosDaoSql.saveOrUpdateAgencePhotos() : p_entity is required');

		var deferred = $qSync.defer();
		var self = this;

		if(p_entity.idToString !== -1) { 
			this.exist(p_entity, p_context).then(function(result) {
				if(result){ 
					/* updateAgencePhotos */
					console.log('AgencePhotosDaoSql.saveOrUpdateAgencePhotos(): entity exists  => updateAgencePhotos()');
					deferred.resolve( self.updateAgencePhotos(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) );
				} else {
				/* saveAgencePhotos */
					console.log('AgencePhotosDaoSql.saveOrUpdateAgencePhotos(): entity does not exist  => saveAgencePhotos()');
					deferred.resolve( self.saveAgencePhotos(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) ); // last parameter ignored by called method
				}
			},
 			function(error) { 
				deferred.reject(error); 
			});
		} else { 
			/* saveAgencePhotos */
			console.log('AgencePhotosDaoSql.saveOrUpdateAgencePhotos(): entity does not exist  => saveAgencePhotos()');
			deferred.resolve( self.saveAgencePhotos(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) ); // last parameter ignored by called method
		}


//@non-generated-start[saveOrUpdateAgencePhotos-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name AgencePhotosDaoSql#saveOrUpdateListAgencePhotos
	 * @function
	 *
	 * @description
	 * Saves of updates a list of AgencePhotoss.
	 *
	 * @param {Array<AgencePhotos>} p_entities Array containing AgencePhotoss to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of AgencePhotoss was saved or updated, false otherwise.
	 */
	AgencePhotosDaoSql.prototype.saveOrUpdateListAgencePhotos = function(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

//@non-generated-start[saveOrUpdateListAgencePhotos-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'AgencePhotosDaoSql.saveOrUpdateListAgencePhotos() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'AgencePhotosDaoSql.saveOrUpdateListAgencePhotos() : p_cascadeSet is required and should be an array');
		console.assert(angular.isArray(p_entities), 'AgencePhotosDaoSql.saveOrUpdateListAgencePhotos() : p_entities is required and should be an array');

		var deferred = $qSync.defer();
		var self = this;

		/* saveOrUpdateListAgencePhotos() => saveOrUpdateAgencePhotos() */
		var o_arrayPromisesSaveOrUpdateAgencePhotos = [];
		for(var i = 0; i < p_entities.length; i++) {
			o_arrayPromisesSaveOrUpdateAgencePhotos.push( self.saveOrUpdateAgencePhotos(p_entities[i], p_context, angular.copy(p_cascadeSet), p_toSync, angular.copy(p_cascadeSetForDelete)) );
		}
		// $qSync.all() returns an array of the results of o_arrayPromisesSaveOrUpdateAgencePhotos.
		// If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
		deferred.resolve( $qSync.all(o_arrayPromisesSaveOrUpdateAgencePhotos) );


//@non-generated-start[saveOrUpdateListAgencePhotos-after][X]
//@non-generated-end

		return deferred.promise;
	};



	//==================================================================================
	//========   SPECIFIC METHODS - DELETE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name AgencePhotosDaoSql#deleteAgencePhotos
	 * @function
	 *
	 * @description
	 * Delete a AgencePhotos.
	 *
	 * @param {AgencePhotos} p_entity AgencePhotos to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Promise} Returns a promise equal to true if the AgencePhotos was deleted, false otherwise.
	 */
	AgencePhotosDaoSql.prototype.deleteAgencePhotos = function(p_entity, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[deleteAgencePhotos-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'AgencePhotosDaoSql.deleteAgencePhotos() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'AgencePhotosDaoSql.deleteAgencePhotos() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_entity), 'AgencePhotosDaoSql.deleteAgencePhotos() : p_entity is required');

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
if( p_cascadeSet[i].key === 'PHOTOSAGENCE') {
									pointersDeletes.push( AgenceDaoProxy.deleteAgence(p_entity.photosAgence, p_context, p_cascadeSet, p_toSync) );
								}
		}
		}

								$qSync.all(pointersDeletes).then(
									function(returnedSuccess_executeQuery2ToDelete) { /* SUCCESS */
										deferred.resolve(returnedSuccess_executeQuery2ToDelete);
									},
									function (returnedError_executeQuery2ToDelete) { /* ERROR */
										console.error('AgencePhotosDaoSql.deleteAgencePhotos(): error: ', returnedError_executeQuery2ToDelete);
										p_context.addError('AgencePhotosDaoSql.deleteAgencePhotos(): error: '+ returnedError_executeQuery2ToDelete);
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

//@non-generated-start[deleteAgencePhotos-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name AgencePhotosDaoSql#deleteAgencePhotosById
	 * @function
	 *
	 * @description
	 * Deletes a AgencePhotos by id.
	 *
	 * @param {Integer} p_id Integer id of the AgencePhotos to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Promise} Returns a promise equal to true if the AgencePhotos was deleted, false otherwise.
	 */
	AgencePhotosDaoSql.prototype.deleteAgencePhotosById = function(p_id, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[deleteAgencePhotosById-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'AgencePhotosDaoSql.deleteAgencePhotosById() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'AgencePhotosDaoSql.deleteAgencePhotosById() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_id), 'AgencePhotosDaoSql.deleteAgencePhotosById() : p_id is required');

		var deferred = $qSync.defer();
		var self = this;

		self.getAgencePhotosById(p_id, p_context, angular.copy(p_cascadeSet), p_toSync).then(
			function(entity){
				deferred.resolve( self.deleteAgencePhotos(entity, p_context, angular.copy(p_cascadeSet), p_toSync) );
			},
			function(error){
				deferred.reject(error);
			}
		);


//@non-generated-start[deleteAgencePhotosById-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name AgencePhotosDaoSql#deleteListAgencePhotos
	 * @function
	 *
	 * @description
	 * Deletes a list of AgencePhotoss.
	 *
	 * @param {Array<AgencePhotos>} p_entities Array containing AgencePhotoss to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of AgencePhotoss was deleted, false otherwise.
	 */
	AgencePhotosDaoSql.prototype.deleteListAgencePhotos = function(p_entities, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[deleteListAgencePhotos-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'AgencePhotosDaoSql.deleteListAgencePhotos() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'AgencePhotosDaoSql.deleteListAgencePhotos() : p_cascadeSet is required and should be an array');
		console.assert(angular.isArray(p_entities), 'AgencePhotosDaoSql.deleteListAgencePhotos() : p_entities is required and should be an array');

		var deferred = $qSync.defer();
		var self = this;

		/* deleteListAgencePhotos() => deleteAgencePhotos() */
		var o_arrayPromisesDeleteAgencePhotos = [];
		for( var i = 0; i < p_entities.length; i++ ) {
			o_arrayPromisesDeleteAgencePhotos.push( self.deleteAgencePhotos(p_entities[i], p_context, angular.copy(p_cascadeSet), p_toSync) );
		}
		// $qSync.all() returns an array of the results of o_arrayPromisesDeleteAgencePhotos.
		// If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
		deferred.resolve( $qSync.all(o_arrayPromisesDeleteAgencePhotos) );


//@non-generated-start[deleteListAgencePhotos-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name AgencePhotosDaoSql#deleteListAgencePhotosByIds
	 * @function
	 *
	 * @description
	 * Deletes a list of AgencePhotoss by ids.
	 *
	 * @param {Array<Integer>} p_ids Array containing ids of AgencePhotoss to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of AgencePhotoss was deleted, false otherwise.
	 */
	AgencePhotosDaoSql.prototype.deleteListAgencePhotosByIds = function(p_ids, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[deleteListAgencePhotosByIds-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'AgencePhotosDaoSql.deleteListAgencePhotosByIds() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'AgencePhotosDaoSql.deleteListAgencePhotosByIds() : p_cascadeSet is required and should be an array');
		console.assert(angular.isUndefinedOrNull(p_ids) || angular.isArray(p_ids), 'AgencePhotosDaoSql.deleteListAgencePhotosByIds() : p_ids should be an array, if given');

		var deferred = $qSync.defer();
		var self = this;

		/* deleteListAgencePhotosByIds() => deleteListAgencePhotosById() */
		var o_arrayPromisesDeleteAgencePhotos = [];
		for( var i = 0; i < p_ids.length; i++ ) {
			o_arrayPromisesDeleteAgencePhotos.push( self.deleteAgencePhotosById(p_ids[i], p_context, angular.copy(p_cascadeSet), p_toSync) );
		}
		// $qSync.all() returns an array of the results of o_arrayPromisesDeleteAgencePhotos.
		// If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
		deferred.resolve( $qSync.all(o_arrayPromisesDeleteAgencePhotos) );


//@non-generated-start[deleteListAgencePhotosByIds-after][X]
//@non-generated-end

		return deferred.promise;
	};



//@non-generated-start[other-methods][X]
//@non-generated-end


	return new AgencePhotosDaoSql();
}]);
