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

angular.module('data-daotest-sql').factory('EmplSkillDaoSql',
	['EmplSkillDaoMapping', 'MFSyncPromiseProvider', 'MFDaoSqlAbstract', 'MFUtils', 'MFMappingHelper',
//@non-generated-start[dependencies-names][X]
//@non-generated-end

//@non-generated-start[dependencies-classes][X]
function(EmplSkillDaoMapping, $qSync, MFDaoSqlAbstract, MFUtils, MFMappingHelper
//@non-generated-end
)
{

	var EmplSkillDaoSql = function EmplSkillDaoSql(){
		// Constructor
//@non-generated-start[constructor][X]
		EmplSkillDaoSql._Parent.call(this);
		this.lastId = null;
		this.mapping = EmplSkillDaoMapping.mappingSql;
		this.syncDisabled = false;
		this.tableName = 'T_EMPLSKILL';
		this.entityName = 'EmplSkill';
		this.cascadeDefinition = [
		];

//@non-generated-end
	};

	MFUtils.extendFromInstance(EmplSkillDaoSql, MFDaoSqlAbstract);



	//==================================================================================
	//========   SPECIFIC METHODS - GET
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name EmplSkillDaoSql#getEmplSkillById
	 * @function
	 *
	 * @description
	 * Returns a EmplSkill by id.
	 *
	 * @param {Integer} p_id Integer id of the EmplSkill to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {EmplSkill} Returns the EmplSkill, including children if required
	 */
	EmplSkillDaoSql.prototype.getEmplSkillById = function(p_id, p_context, p_cascadeSet) {

//@non-generated-start[getEmplSkillById-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'EmplSkillDaoSql.getEmplSkillById() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'EmplSkillDaoSql.getEmplSkillById() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_id), 'EmplSkillDaoSql.getEmplSkillById() : p_id is required');

		var deferred = $qSync.defer();
		var self = this;

		self.getEntitiesByProperty('employeeId', p_id, p_context).then(

function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
function (returnedSuccess_cascade) {
deferred.resolve(returnedSuccess_executeQueryToRead[0]);
},
function (returnedError_cascade) {
console.error('EmplSkillDaoSql.getEmplSkillById(): cascade error: ', returnedError_cascade);
p_context.addError('EmplSkillDaoSql.getEmplSkillById(): cascade error: '+ returnedError_cascade);
deferred.reject(returnedError_cascade);
}
);
},
function (returnedError_executeQueryToRead) { /* ERROR */
console.error('EmplSkillDaoSql.getEmplSkillById(): error: ', returnedError_executeQueryToRead);
p_context.addError('EmplSkillDaoSql.getEmplSkillById(): error: '+ returnedError_executeQueryToRead);
deferred.reject(returnedError_executeQueryToRead);
}
);

//@non-generated-start[getEmplSkillById-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name EmplSkillDaoSql#getListEmplSkill
	 * @function
	 *
	 * @description
	 * Returns a list of EmplSkills according to the parameter(s).
	 *
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of EmplSkills, including children if required.
	 */
	EmplSkillDaoSql.prototype.getListEmplSkill = function(p_context, p_cascadeSet) {

//@non-generated-start[getListEmplSkill-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'EmplSkillDaoSql.getListEmplSkill() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'EmplSkillDaoSql.getListEmplSkill() : p_cascadeSet is required and should be an array');

		var deferred = $qSync.defer();
		var self = this;

		self.getEntitiesByProperty('*', [], p_context).then(

function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
function (returnedSuccess_cascade) {
deferred.resolve(returnedSuccess_executeQueryToRead);
},
function (returnedError_cascade) {
console.error('EmplSkillDaoSql.getListEmplSkill(): cascade error: ', returnedError_cascade);
p_context.addError('EmplSkillDaoSql.getListEmplSkill(): cascade error: '+ returnedError_cascade);
deferred.reject(returnedError_cascade);
}
);
},
function (returnedError_executeQueryToRead) { /* ERROR */
console.error('EmplSkillDaoSql.getListEmplSkill(): error: ', returnedError_executeQueryToRead);
p_context.addError('EmplSkillDaoSql.getListEmplSkill(): error: '+ returnedError_executeQueryToRead);
deferred.reject(returnedError_executeQueryToRead);
}
);

//@non-generated-start[getListEmplSkill-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name EmplSkillDaoSql#getListEmplSkillByIds
	 * @function
	 *
	 * @description
	 * Returns a list of EmplSkills by ids.
	 *
	 * @param {Array<Integer>} p_ids Array containing ids of EmplSkills to process (optional)
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of EmplSkills, including children if required.
	 */
	EmplSkillDaoSql.prototype.getListEmplSkillByIds = function(p_ids, p_context, p_cascadeSet) {

//@non-generated-start[getListEmplSkillByIds-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'EmplSkillDaoSql.getListEmplSkillByIds() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'EmplSkillDaoSql.getListEmplSkillByIds() : p_cascadeSet is required and should be an array');
		console.assert(angular.isUndefinedOrNull(p_ids) || angular.isArray(p_ids), 'EmplSkillDaoSql.getListEmplSkillByIds() : p_ids should be an array, if given');

		var deferred = $qSync.defer();
		var self = this;

		self.getEntitiesByProperty('employeeId', p_ids, p_context).then(

function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
function (returnedSuccess_cascade) {
deferred.resolve(returnedSuccess_executeQueryToRead);
},
function (returnedError_cascade) {
console.error('EmplSkillDaoSql.getListEmplSkillByIds(): cascade error: ', returnedError_cascade);
p_context.addError('EmplSkillDaoSql.getListEmplSkillByIds(): cascade error: '+ returnedError_cascade);
deferred.reject(returnedError_cascade);
}
);
},
function (returnedError_executeQueryToRead) { /* ERROR */
console.error('EmplSkillDaoSql.getListEmplSkillByIds(): error: ', returnedError_executeQueryToRead);
p_context.addError('EmplSkillDaoSql.getListEmplSkillByIds(): error: '+ returnedError_executeQueryToRead);
deferred.reject(returnedError_executeQueryToRead);
}
);

//@non-generated-start[getListEmplSkillByIds-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name EmplSkillDaoSql#getListEmplSkillByEmployeeId
	 * @function
	 *
	 * @description
	 * Returns a list of EmplSkills according to the parameter(s).
	 *
	 * @param {Array<Integer>} p_employeeId
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of EmplSkills, including children if required.
	 */
	EmplSkillDaoSql.prototype.getListEmplSkillByEmployeeId = function(p_employeeId, p_context, p_cascadeSet) {

//@non-generated-start[getListEmplSkillByEmployeeId-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'EmplSkillDaoSql.getListEmplSkillByEmployeeId() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'EmplSkillDaoSql.getListEmplSkillByEmployeeId() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_employeeId), 'EmplSkillDaoSql.getListEmplSkillByEmployeeId() : p_employeeId is required');

		var deferred = $qSync.defer();
		var self = this;

		self.getEntitiesByProperty('employeeId', p_employeeId, p_context).then(

function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
function (returnedSuccess_cascade) {
deferred.resolve(returnedSuccess_executeQueryToRead);
},
function (returnedError_cascade) {
console.error('EmplSkillDaoSql.getListEmplSkillByEmployeeId(): cascade error: ', returnedError_cascade);
p_context.addError('EmplSkillDaoSql.getListEmplSkillByEmployeeId(): cascade error: '+ returnedError_cascade);
deferred.reject(returnedError_cascade);
}
);
},
function (returnedError_executeQueryToRead) { /* ERROR */
console.error('EmplSkillDaoSql.getListEmplSkillByEmployeeId(): error: ', returnedError_executeQueryToRead);
p_context.addError('EmplSkillDaoSql.getListEmplSkillByEmployeeId(): error: '+ returnedError_executeQueryToRead);
deferred.reject(returnedError_executeQueryToRead);
}
);

//@non-generated-start[getListEmplSkillByEmployeeId-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name EmplSkillDaoSql#getListEmplSkillBySkillId
	 * @function
	 *
	 * @description
	 * Returns a list of EmplSkills according to the parameter(s).
	 *
	 * @param {Array<Integer>} p_skillId
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of EmplSkills, including children if required.
	 */
	EmplSkillDaoSql.prototype.getListEmplSkillBySkillId = function(p_skillId, p_context, p_cascadeSet) {

//@non-generated-start[getListEmplSkillBySkillId-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'EmplSkillDaoSql.getListEmplSkillBySkillId() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'EmplSkillDaoSql.getListEmplSkillBySkillId() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_skillId), 'EmplSkillDaoSql.getListEmplSkillBySkillId() : p_skillId is required');

		var deferred = $qSync.defer();
		var self = this;

		self.getEntitiesByProperty('skillId', p_skillId, p_context).then(

function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
function (returnedSuccess_cascade) {
deferred.resolve(returnedSuccess_executeQueryToRead);
},
function (returnedError_cascade) {
console.error('EmplSkillDaoSql.getListEmplSkillBySkillId(): cascade error: ', returnedError_cascade);
p_context.addError('EmplSkillDaoSql.getListEmplSkillBySkillId(): cascade error: '+ returnedError_cascade);
deferred.reject(returnedError_cascade);
}
);
},
function (returnedError_executeQueryToRead) { /* ERROR */
console.error('EmplSkillDaoSql.getListEmplSkillBySkillId(): error: ', returnedError_executeQueryToRead);
p_context.addError('EmplSkillDaoSql.getListEmplSkillBySkillId(): error: '+ returnedError_executeQueryToRead);
deferred.reject(returnedError_executeQueryToRead);
}
);

//@non-generated-start[getListEmplSkillBySkillId-after][X]
//@non-generated-end

		return deferred.promise;
	};



	//==================================================================================
	//========   SPECIFIC METHODS - SAVE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name EmplSkillDaoSql#saveEmplSkill
	 * @function
	 *
	 * @description
	 * Saves a EmplSkill.
	 *
	 * @param {EmplSkill} p_entity EmplSkill to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Promise} Returns a promise equal to true if the EmplSkill was saved, false otherwise.
	 */
	EmplSkillDaoSql.prototype.saveEmplSkill = function(p_entity, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[saveEmplSkill-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'EmplSkillDaoSql.saveEmplSkill() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'EmplSkillDaoSql.saveEmplSkill() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_entity), 'EmplSkillDaoSql.saveEmplSkill() : p_entity is required');

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


//@non-generated-start[saveEmplSkill-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name EmplSkillDaoSql#saveListEmplSkill
	 * @function
	 *
	 * @description
	 * Saves a list of EmplSkills.
	 *
	 * @param {Array<EmplSkill>} p_entities Array containing EmplSkills to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of EmplSkills was saved, false otherwise.
	 */
	EmplSkillDaoSql.prototype.saveListEmplSkill = function(p_entities, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[saveListEmplSkill-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'EmplSkillDaoSql.saveListEmplSkill() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'EmplSkillDaoSql.saveListEmplSkill() : p_cascadeSet is required and should be an array');
		console.assert(angular.isArray(p_entities), 'EmplSkillDaoSql.saveListEmplSkill() : p_entities is required and should be an array');

		var deferred = $qSync.defer();
		var self = this;

		/* saveListEmplSkill() => saveEmplSkill() */
		var o_arrayPromisesSaveEmplSkill = [];
		for( var i = 0; i < p_entities.length; i++ ) {
			o_arrayPromisesSaveEmplSkill.push( self.saveEmplSkill(p_entities[i], p_context, angular.copy(p_cascadeSet), p_toSync) );
		}
		// $qSync.all() returns an array of the results of o_arrayPromisesSaveEmplSkill.
		// If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
		deferred.resolve( $qSync.all(o_arrayPromisesSaveEmplSkill) );


//@non-generated-start[saveListEmplSkill-after][X]
//@non-generated-end

		return deferred.promise;
	};



	//==================================================================================
	//========   SPECIFIC METHODS - UPDATE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name EmplSkillDaoSql#updateEmplSkill
	 * @function
	 *
	 * @description
	 * Updates a EmplSkill.
	 *
	 * @param {EmplSkill} p_entity EmplSkill to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
	 *
	 * @returns {Promise} Returns a promise equal to true if the EmplSkill was updated, false otherwise.
	 */
	EmplSkillDaoSql.prototype.updateEmplSkill = function(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

//@non-generated-start[updateEmplSkill-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'EmplSkillDaoSql.updateEmplSkill() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'EmplSkillDaoSql.updateEmplSkill() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_entity), 'EmplSkillDaoSql.updateEmplSkill() : p_entity is required');

		var deferred = $qSync.defer();
		var self = this;

		var childrenPromises = [];

		self.fixDoubleWaysRelationship(p_entity);




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


//@non-generated-start[updateEmplSkill-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name EmplSkillDaoSql#updateListEmplSkill
	 * @function
	 *
	 * @description
	 * Updates a list of EmplSkills.
	 *
	 * @param {Array<EmplSkill>} p_entities Array containing EmplSkills to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of EmplSkills was updated, false otherwise.
	 */
	EmplSkillDaoSql.prototype.updateListEmplSkill = function(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

//@non-generated-start[updateListEmplSkill-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'EmplSkillDaoSql.updateListEmplSkill() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'EmplSkillDaoSql.updateListEmplSkill() : p_cascadeSet is required and should be an array');
		console.assert(angular.isArray(p_entities), 'EmplSkillDaoSql.updateListEmplSkill() : p_entities is required and should be an array');

		var deferred = $qSync.defer();
		var self = this;

		/* updateListEmplSkill() => updateEmplSkill() */
		var o_arrayPromisesUpdateEmplSkill = [];
		for( var i = 0; i < p_entities.length; i++ ) {
			o_arrayPromisesUpdateEmplSkill.push( self.updateEmplSkill(p_entities[i], p_context, angular.copy(p_cascadeSet), p_toSync, angular.copy(p_cascadeSetForDelete)) );
		}
		// $qSync.all() returns an array of the results of o_arrayPromisesUpdateEmplSkill.
		// If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
		deferred.resolve( $qSync.all(o_arrayPromisesUpdateEmplSkill) );


//@non-generated-start[updateListEmplSkill-after][X]
//@non-generated-end

		return deferred.promise;
	};



	//==================================================================================
	//========   SPECIFIC METHODS - SAVE & UPDATE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name EmplSkillDaoSql#saveOrUpdateEmplSkill
	 * @function
	 *
	 * @description
	 * Saves of updates a EmplSkill.
	 *
	 * @param {EmplSkill} p_entity EmplSkill to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
	 *
	 * @returns {Promise} Returns a promise equal to true if the EmplSkill was saved or updated, false otherwise.
	 */
	EmplSkillDaoSql.prototype.saveOrUpdateEmplSkill = function(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

//@non-generated-start[saveOrUpdateEmplSkill-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'EmplSkillDaoSql.saveOrUpdateEmplSkill() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'EmplSkillDaoSql.saveOrUpdateEmplSkill() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_entity), 'EmplSkillDaoSql.saveOrUpdateEmplSkill() : p_entity is required');

		var deferred = $qSync.defer();
		var self = this;

		if(p_entity.idToString !== -1) { 
			this.exist(p_entity, p_context).then(function(result) {
				if(result){ 
					/* updateEmplSkill */
					console.log('EmplSkillDaoSql.saveOrUpdateEmplSkill(): entity exists  => updateEmplSkill()');
					deferred.resolve( self.updateEmplSkill(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) );
				} else {
				/* saveEmplSkill */
					console.log('EmplSkillDaoSql.saveOrUpdateEmplSkill(): entity does not exist  => saveEmplSkill()');
					deferred.resolve( self.saveEmplSkill(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) ); // last parameter ignored by called method
				}
			},
 			function(error) { 
				deferred.reject(error); 
			});
		} else { 
			/* saveEmplSkill */
			console.log('EmplSkillDaoSql.saveOrUpdateEmplSkill(): entity does not exist  => saveEmplSkill()');
			deferred.resolve( self.saveEmplSkill(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) ); // last parameter ignored by called method
		}


//@non-generated-start[saveOrUpdateEmplSkill-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name EmplSkillDaoSql#saveOrUpdateListEmplSkill
	 * @function
	 *
	 * @description
	 * Saves of updates a list of EmplSkills.
	 *
	 * @param {Array<EmplSkill>} p_entities Array containing EmplSkills to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of EmplSkills was saved or updated, false otherwise.
	 */
	EmplSkillDaoSql.prototype.saveOrUpdateListEmplSkill = function(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

//@non-generated-start[saveOrUpdateListEmplSkill-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'EmplSkillDaoSql.saveOrUpdateListEmplSkill() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'EmplSkillDaoSql.saveOrUpdateListEmplSkill() : p_cascadeSet is required and should be an array');
		console.assert(angular.isArray(p_entities), 'EmplSkillDaoSql.saveOrUpdateListEmplSkill() : p_entities is required and should be an array');

		var deferred = $qSync.defer();
		var self = this;

		/* saveOrUpdateListEmplSkill() => saveOrUpdateEmplSkill() */
		var o_arrayPromisesSaveOrUpdateEmplSkill = [];
		for(var i = 0; i < p_entities.length; i++) {
			o_arrayPromisesSaveOrUpdateEmplSkill.push( self.saveOrUpdateEmplSkill(p_entities[i], p_context, angular.copy(p_cascadeSet), p_toSync, angular.copy(p_cascadeSetForDelete)) );
		}
		// $qSync.all() returns an array of the results of o_arrayPromisesSaveOrUpdateEmplSkill.
		// If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
		deferred.resolve( $qSync.all(o_arrayPromisesSaveOrUpdateEmplSkill) );


//@non-generated-start[saveOrUpdateListEmplSkill-after][X]
//@non-generated-end

		return deferred.promise;
	};



	//==================================================================================
	//========   SPECIFIC METHODS - DELETE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name EmplSkillDaoSql#deleteEmplSkill
	 * @function
	 *
	 * @description
	 * Delete a EmplSkill.
	 *
	 * @param {EmplSkill} p_entity EmplSkill to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Promise} Returns a promise equal to true if the EmplSkill was deleted, false otherwise.
	 */
	EmplSkillDaoSql.prototype.deleteEmplSkill = function(p_entity, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[deleteEmplSkill-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'EmplSkillDaoSql.deleteEmplSkill() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'EmplSkillDaoSql.deleteEmplSkill() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_entity), 'EmplSkillDaoSql.deleteEmplSkill() : p_entity is required');

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
										console.error('EmplSkillDaoSql.deleteEmplSkill(): error: ', returnedError_executeQuery2ToDelete);
										p_context.addError('EmplSkillDaoSql.deleteEmplSkill(): error: '+ returnedError_executeQuery2ToDelete);
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

//@non-generated-start[deleteEmplSkill-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name EmplSkillDaoSql#deleteEmplSkillById
	 * @function
	 *
	 * @description
	 * Deletes a EmplSkill by id.
	 *
	 * @param {Integer} p_id Integer id of the EmplSkill to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Promise} Returns a promise equal to true if the EmplSkill was deleted, false otherwise.
	 */
	EmplSkillDaoSql.prototype.deleteEmplSkillById = function(p_id, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[deleteEmplSkillById-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'EmplSkillDaoSql.deleteEmplSkillById() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'EmplSkillDaoSql.deleteEmplSkillById() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_id), 'EmplSkillDaoSql.deleteEmplSkillById() : p_id is required');

		var deferred = $qSync.defer();
		var self = this;

		self.getEmplSkillById(p_id, p_context, angular.copy(p_cascadeSet), p_toSync).then(
			function(entity){
				deferred.resolve( self.deleteEmplSkill(entity, p_context, angular.copy(p_cascadeSet), p_toSync) );
			},
			function(error){
				deferred.reject(error);
			}
		);


//@non-generated-start[deleteEmplSkillById-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name EmplSkillDaoSql#deleteListEmplSkill
	 * @function
	 *
	 * @description
	 * Deletes a list of EmplSkills.
	 *
	 * @param {Array<EmplSkill>} p_entities Array containing EmplSkills to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of EmplSkills was deleted, false otherwise.
	 */
	EmplSkillDaoSql.prototype.deleteListEmplSkill = function(p_entities, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[deleteListEmplSkill-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'EmplSkillDaoSql.deleteListEmplSkill() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'EmplSkillDaoSql.deleteListEmplSkill() : p_cascadeSet is required and should be an array');
		console.assert(angular.isArray(p_entities), 'EmplSkillDaoSql.deleteListEmplSkill() : p_entities is required and should be an array');

		var deferred = $qSync.defer();
		var self = this;

		/* deleteListEmplSkill() => deleteEmplSkill() */
		var o_arrayPromisesDeleteEmplSkill = [];
		for( var i = 0; i < p_entities.length; i++ ) {
			o_arrayPromisesDeleteEmplSkill.push( self.deleteEmplSkill(p_entities[i], p_context, angular.copy(p_cascadeSet), p_toSync) );
		}
		// $qSync.all() returns an array of the results of o_arrayPromisesDeleteEmplSkill.
		// If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
		deferred.resolve( $qSync.all(o_arrayPromisesDeleteEmplSkill) );


//@non-generated-start[deleteListEmplSkill-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name EmplSkillDaoSql#deleteListEmplSkillByIds
	 * @function
	 *
	 * @description
	 * Deletes a list of EmplSkills by ids.
	 *
	 * @param {Array<Integer>} p_ids Array containing ids of EmplSkills to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of EmplSkills was deleted, false otherwise.
	 */
	EmplSkillDaoSql.prototype.deleteListEmplSkillByIds = function(p_ids, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[deleteListEmplSkillByIds-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'EmplSkillDaoSql.deleteListEmplSkillByIds() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'EmplSkillDaoSql.deleteListEmplSkillByIds() : p_cascadeSet is required and should be an array');
		console.assert(angular.isUndefinedOrNull(p_ids) || angular.isArray(p_ids), 'EmplSkillDaoSql.deleteListEmplSkillByIds() : p_ids should be an array, if given');

		var deferred = $qSync.defer();
		var self = this;

		/* deleteListEmplSkillByIds() => deleteListEmplSkillById() */
		var o_arrayPromisesDeleteEmplSkill = [];
		for( var i = 0; i < p_ids.length; i++ ) {
			o_arrayPromisesDeleteEmplSkill.push( self.deleteEmplSkillById(p_ids[i], p_context, angular.copy(p_cascadeSet), p_toSync) );
		}
		// $qSync.all() returns an array of the results of o_arrayPromisesDeleteEmplSkill.
		// If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
		deferred.resolve( $qSync.all(o_arrayPromisesDeleteEmplSkill) );


//@non-generated-start[deleteListEmplSkillByIds-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name EmplSkillDaoSql#deleteEmplSkillByEmployeeId
	 * @function
	 *
	 * @description
	 *
	 * @param {Array<Integer>} p_employeeId
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Promise} Returns a promise equal to true if the EmplSkill was deleted, false otherwise.
	 */
	EmplSkillDaoSql.prototype.deleteEmplSkillByEmployeeId = function(p_employeeId, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[deleteEmplSkillByEmployeeId-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'EmplSkillDaoSql.deleteEmplSkillByEmployeeId() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'EmplSkillDaoSql.deleteEmplSkillByEmployeeId() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_employeeId), 'EmplSkillDaoSql.deleteEmplSkillByEmployeeId() : p_employeeId is required');

		var deferred = $qSync.defer();
		var self = this;

self.getEntitiesByProperty('employeeId', p_employeeId, p_context).then(
function(entities) { /* SUCCESS */
deferred.resolve(self.deleteListEmplSkill(entities,p_context,p_cascadeSet, p_toSync));
},
function(error){
deferred.reject(error);
}
);


//@non-generated-start[deleteEmplSkillByEmployeeId-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name EmplSkillDaoSql#deleteEmplSkillBySkillId
	 * @function
	 *
	 * @description
	 *
	 * @param {Array<Integer>} p_skillId
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Promise} Returns a promise equal to true if the EmplSkill was deleted, false otherwise.
	 */
	EmplSkillDaoSql.prototype.deleteEmplSkillBySkillId = function(p_skillId, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[deleteEmplSkillBySkillId-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'EmplSkillDaoSql.deleteEmplSkillBySkillId() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'EmplSkillDaoSql.deleteEmplSkillBySkillId() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_skillId), 'EmplSkillDaoSql.deleteEmplSkillBySkillId() : p_skillId is required');

		var deferred = $qSync.defer();
		var self = this;

self.getEntitiesByProperty('skillId', p_skillId, p_context).then(
function(entities) { /* SUCCESS */
deferred.resolve(self.deleteListEmplSkill(entities,p_context,p_cascadeSet, p_toSync));
},
function(error){
deferred.reject(error);
}
);


//@non-generated-start[deleteEmplSkillBySkillId-after][X]
//@non-generated-end

		return deferred.promise;
	};



//@non-generated-start[other-methods][X]
//@non-generated-end


	return new EmplSkillDaoSql();
}]);
