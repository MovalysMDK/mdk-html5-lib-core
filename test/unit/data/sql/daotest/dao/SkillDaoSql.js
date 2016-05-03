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

angular.module('data-daotest-sql').factory('SkillDaoSql',
	['EmployeeDaoProxy', 'SkillDaoMapping', 'MFSyncPromiseProvider', 'MFDaoSqlAbstract', 'MFUtils', 'MFMappingHelper',
//@non-generated-start[dependencies-names][X]
//@non-generated-end

//@non-generated-start[dependencies-classes][X]
function(EmployeeDaoProxy, SkillDaoMapping, $qSync, MFDaoSqlAbstract, MFUtils, MFMappingHelper
//@non-generated-end
)
{

	var SkillDaoSql = function SkillDaoSql(){
		// Constructor
//@non-generated-start[constructor][X]
		SkillDaoSql._Parent.call(this);
		this.lastId = null;
		this.mapping = SkillDaoMapping.mappingSql;
		this.syncDisabled = false;
		this.tableName = 'T_SKILL';
		this.entityName = 'Skill';
		this.cascadeDefinition = [
			{
				readAction: 'getList', parentAttrPointingChild: 'employees',
				childDao: EmployeeDaoProxy, childAttrPointingParent: 'skills'
			}
		];

//@non-generated-end
	};

	MFUtils.extendFromInstance(SkillDaoSql, MFDaoSqlAbstract);



	//==================================================================================
	//========   SPECIFIC METHODS - GET
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name SkillDaoSql#getSkillById
	 * @function
	 *
	 * @description
	 * Returns a Skill by id.
	 *
	 * @param {Integer} p_id Integer id of the Skill to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Skill} Returns the Skill, including children if required
	 */
	SkillDaoSql.prototype.getSkillById = function(p_id, p_context, p_cascadeSet) {

//@non-generated-start[getSkillById-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'SkillDaoSql.getSkillById() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'SkillDaoSql.getSkillById() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_id), 'SkillDaoSql.getSkillById() : p_id is required');

		var deferred = $qSync.defer();
		var self = this;

		self.getEntitiesByProperty('id', p_id, p_context).then(

function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
function (returnedSuccess_cascade) {
deferred.resolve(returnedSuccess_executeQueryToRead[0]);
},
function (returnedError_cascade) {
console.error('SkillDaoSql.getSkillById(): cascade error: ', returnedError_cascade);
p_context.addError('SkillDaoSql.getSkillById(): cascade error: '+ returnedError_cascade);
deferred.reject(returnedError_cascade);
}
);
},
function (returnedError_executeQueryToRead) { /* ERROR */
console.error('SkillDaoSql.getSkillById(): error: ', returnedError_executeQueryToRead);
p_context.addError('SkillDaoSql.getSkillById(): error: '+ returnedError_executeQueryToRead);
deferred.reject(returnedError_executeQueryToRead);
}
);

//@non-generated-start[getSkillById-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name SkillDaoSql#getListSkill
	 * @function
	 *
	 * @description
	 * Returns a list of Skills according to the parameter(s).
	 *
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Skills, including children if required.
	 */
	SkillDaoSql.prototype.getListSkill = function(p_context, p_cascadeSet) {

//@non-generated-start[getListSkill-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'SkillDaoSql.getListSkill() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'SkillDaoSql.getListSkill() : p_cascadeSet is required and should be an array');

		var deferred = $qSync.defer();
		var self = this;

		self.getEntitiesByProperty('*', [], p_context).then(

function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
function (returnedSuccess_cascade) {
deferred.resolve(returnedSuccess_executeQueryToRead);
},
function (returnedError_cascade) {
console.error('SkillDaoSql.getListSkill(): cascade error: ', returnedError_cascade);
p_context.addError('SkillDaoSql.getListSkill(): cascade error: '+ returnedError_cascade);
deferred.reject(returnedError_cascade);
}
);
},
function (returnedError_executeQueryToRead) { /* ERROR */
console.error('SkillDaoSql.getListSkill(): error: ', returnedError_executeQueryToRead);
p_context.addError('SkillDaoSql.getListSkill(): error: '+ returnedError_executeQueryToRead);
deferred.reject(returnedError_executeQueryToRead);
}
);

//@non-generated-start[getListSkill-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name SkillDaoSql#getListSkillByIds
	 * @function
	 *
	 * @description
	 * Returns a list of Skills by ids.
	 *
	 * @param {Array<Integer>} p_ids Array containing ids of Skills to process (optional)
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Skills, including children if required.
	 */
	SkillDaoSql.prototype.getListSkillByIds = function(p_ids, p_context, p_cascadeSet) {

//@non-generated-start[getListSkillByIds-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'SkillDaoSql.getListSkillByIds() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'SkillDaoSql.getListSkillByIds() : p_cascadeSet is required and should be an array');
		console.assert(angular.isUndefinedOrNull(p_ids) || angular.isArray(p_ids), 'SkillDaoSql.getListSkillByIds() : p_ids should be an array, if given');

		var deferred = $qSync.defer();
		var self = this;

		self.getEntitiesByProperty('id', p_ids, p_context).then(

function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
function (returnedSuccess_cascade) {
deferred.resolve(returnedSuccess_executeQueryToRead);
},
function (returnedError_cascade) {
console.error('SkillDaoSql.getListSkillByIds(): cascade error: ', returnedError_cascade);
p_context.addError('SkillDaoSql.getListSkillByIds(): cascade error: '+ returnedError_cascade);
deferred.reject(returnedError_cascade);
}
);
},
function (returnedError_executeQueryToRead) { /* ERROR */
console.error('SkillDaoSql.getListSkillByIds(): error: ', returnedError_executeQueryToRead);
p_context.addError('SkillDaoSql.getListSkillByIds(): error: '+ returnedError_executeQueryToRead);
deferred.reject(returnedError_executeQueryToRead);
}
);

//@non-generated-start[getListSkillByIds-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name SkillDaoSql#getListSkillByEmployees
	 * @function
	 *
	 * @description
	 * Returns a list of Skills according to the parameter(s).
	 *
	 * @param {Array<Integer>} p_foreignKeys_employee
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Skills, including children if required.
	 */
	SkillDaoSql.prototype.getListSkillByEmployees = function(p_foreignKeys_employee, p_context, p_cascadeSet) {

//@non-generated-start[getListSkillByEmployees-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'SkillDaoSql.getListSkillByEmployees() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'SkillDaoSql.getListSkillByEmployees() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_foreignKeys_employee), 'SkillDaoSql.getListSkillByEmployees() : p_foreignKeys_employee is required');

		var deferred = $qSync.defer();
		var self = this;

		var o_sqlQuery = 'select * from T_SKILL inner join T_EMPLSKILL on T_SKILL.ID = T_EMPLSKILL.SKILLID where T_EMPLSKILL.EMPLOYEEID in ('+ self.produceQueryInPart(p_foreignKeys_employee.idToString) +');';
		var o_sqlParameters = [].concat(p_foreignKeys_employee.idToString);

		self.executeQueryToRead(
			'SkillDaoSql.getListSkillByEmployees()', p_context, o_sqlQuery, o_sqlParameters).then(

function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
function (returnedSuccess_cascade) {
deferred.resolve(returnedSuccess_executeQueryToRead);
},
function (returnedError_cascade) {
console.error('SkillDaoSql.getListSkillByEmployees(): cascade error: ', returnedError_cascade);
p_context.addError('SkillDaoSql.getListSkillByEmployees(): cascade error: '+ returnedError_cascade);
deferred.reject(returnedError_cascade);
}
);
},
function (returnedError_executeQueryToRead) { /* ERROR */
console.error('SkillDaoSql.getListSkillByEmployees(): error: ', returnedError_executeQueryToRead);
p_context.addError('SkillDaoSql.getListSkillByEmployees(): error: '+ returnedError_executeQueryToRead);
deferred.reject(returnedError_executeQueryToRead);
}
);

//@non-generated-start[getListSkillByEmployees-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name SkillDaoSql#getListSkillByEmployeeemployeeId
	 * @function
	 *
	 * @description
	 * Returns a list of Skills according to the parameter(s).
	 *
	 * @param {Array<Integer>} p_foreignKeys_employeeemployeeId
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Skills, including children if required.
	 */
	SkillDaoSql.prototype.getListSkillByEmployeeemployeeId = function(p_foreignKeys_employeeemployeeId, p_context, p_cascadeSet) {

//@non-generated-start[getListSkillByEmployeeemployeeId-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'SkillDaoSql.getListSkillByEmployeeemployeeId() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'SkillDaoSql.getListSkillByEmployeeemployeeId() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_foreignKeys_employeeemployeeId), 'SkillDaoSql.getListSkillByEmployeeemployeeId() : p_foreignKeys_employeeemployeeId is required');

		var deferred = $qSync.defer();
		var self = this;

		var o_sqlQuery = 'select * from T_SKILL inner join T_EMPLSKILL on T_SKILL.ID = T_EMPLSKILL.SKILLID where T_EMPLSKILL.EMPLOYEEID in ('+ self.produceQueryInPart(p_foreignKeys_employeeemployeeId) +');';
		var o_sqlParameters = [].concat(p_foreignKeys_employeeemployeeId);

		self.executeQueryToRead(
			'SkillDaoSql.getListSkillByEmployeeemployeeId()', p_context, o_sqlQuery, o_sqlParameters).then(

function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
function (returnedSuccess_cascade) {
deferred.resolve(returnedSuccess_executeQueryToRead);
},
function (returnedError_cascade) {
console.error('SkillDaoSql.getListSkillByEmployeeemployeeId(): cascade error: ', returnedError_cascade);
p_context.addError('SkillDaoSql.getListSkillByEmployeeemployeeId(): cascade error: '+ returnedError_cascade);
deferred.reject(returnedError_cascade);
}
);
},
function (returnedError_executeQueryToRead) { /* ERROR */
console.error('SkillDaoSql.getListSkillByEmployeeemployeeId(): error: ', returnedError_executeQueryToRead);
p_context.addError('SkillDaoSql.getListSkillByEmployeeemployeeId(): error: '+ returnedError_executeQueryToRead);
deferred.reject(returnedError_executeQueryToRead);
}
);

//@non-generated-start[getListSkillByEmployeeemployeeId-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name SkillDaoSql#getListSkillByEmployeesids
	 * @function
	 *
	 * @description
	 * Returns a list of Skills according to the parameter(s).
	 *
	 * @param {Array<Integer>} p_foreignKeys_employeeids
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Skills, including children if required.
	 */
	SkillDaoSql.prototype.getListSkillByEmployeesids = function(p_foreignKeys_employeeids, p_context, p_cascadeSet) {

//@non-generated-start[getListSkillByEmployeesids-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'SkillDaoSql.getListSkillByEmployeesids() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'SkillDaoSql.getListSkillByEmployeesids() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_foreignKeys_employeeids), 'SkillDaoSql.getListSkillByEmployeesids() : p_foreignKeys_employeeids is required');

		var deferred = $qSync.defer();
		var self = this;

		var o_sqlQuery = 'select * from T_SKILL inner join T_EMPLSKILL on T_SKILL.ID = T_EMPLSKILL.SKILLID where T_EMPLSKILL.EMPLOYEEID in ('+ self.produceQueryInPart(p_foreignKeys_employeeids) +');';
		var o_sqlParameters = [].concat(p_foreignKeys_employeeids);

		self.executeQueryToRead(
			'SkillDaoSql.getListSkillByEmployeesids()', p_context, o_sqlQuery, o_sqlParameters).then(

function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
function (returnedSuccess_cascade) {
deferred.resolve(returnedSuccess_executeQueryToRead);
},
function (returnedError_cascade) {
console.error('SkillDaoSql.getListSkillByEmployeesids(): cascade error: ', returnedError_cascade);
p_context.addError('SkillDaoSql.getListSkillByEmployeesids(): cascade error: '+ returnedError_cascade);
deferred.reject(returnedError_cascade);
}
);
},
function (returnedError_executeQueryToRead) { /* ERROR */
console.error('SkillDaoSql.getListSkillByEmployeesids(): error: ', returnedError_executeQueryToRead);
p_context.addError('SkillDaoSql.getListSkillByEmployeesids(): error: '+ returnedError_executeQueryToRead);
deferred.reject(returnedError_executeQueryToRead);
}
);

//@non-generated-start[getListSkillByEmployeesids-after][X]
//@non-generated-end

		return deferred.promise;
	};



	//==================================================================================
	//========   SPECIFIC METHODS - SAVE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name SkillDaoSql#saveSkill
	 * @function
	 *
	 * @description
	 * Saves a Skill.
	 *
	 * @param {Skill} p_entity Skill to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Promise} Returns a promise equal to true if the Skill was saved, false otherwise.
	 */
	SkillDaoSql.prototype.saveSkill = function(p_entity, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[saveSkill-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'SkillDaoSql.saveSkill() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'SkillDaoSql.saveSkill() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_entity), 'SkillDaoSql.saveSkill() : p_entity is required');

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
						// 4. save association records: for relationships many_to_many
						// --------------------------
						// foreach child attr
						// 		4.1 define SQL query
						// 		4.2 get next ID of this association table
						// 		4.3 define SQL parameters
						// 		4.4 execute query
						// TODO write an example


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


//@non-generated-start[saveSkill-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name SkillDaoSql#saveListSkill
	 * @function
	 *
	 * @description
	 * Saves a list of Skills.
	 *
	 * @param {Array<Skill>} p_entities Array containing Skills to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of Skills was saved, false otherwise.
	 */
	SkillDaoSql.prototype.saveListSkill = function(p_entities, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[saveListSkill-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'SkillDaoSql.saveListSkill() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'SkillDaoSql.saveListSkill() : p_cascadeSet is required and should be an array');
		console.assert(angular.isArray(p_entities), 'SkillDaoSql.saveListSkill() : p_entities is required and should be an array');

		var deferred = $qSync.defer();
		var self = this;

		/* saveListSkill() => saveSkill() */
		var o_arrayPromisesSaveSkill = [];
		for( var i = 0; i < p_entities.length; i++ ) {
			o_arrayPromisesSaveSkill.push( self.saveSkill(p_entities[i], p_context, angular.copy(p_cascadeSet), p_toSync) );
		}
		// $qSync.all() returns an array of the results of o_arrayPromisesSaveSkill.
		// If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
		deferred.resolve( $qSync.all(o_arrayPromisesSaveSkill) );


//@non-generated-start[saveListSkill-after][X]
//@non-generated-end

		return deferred.promise;
	};



	//==================================================================================
	//========   SPECIFIC METHODS - UPDATE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name SkillDaoSql#updateSkill
	 * @function
	 *
	 * @description
	 * Updates a Skill.
	 *
	 * @param {Skill} p_entity Skill to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
	 *
	 * @returns {Promise} Returns a promise equal to true if the Skill was updated, false otherwise.
	 */
	SkillDaoSql.prototype.updateSkill = function(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

//@non-generated-start[updateSkill-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'SkillDaoSql.updateSkill() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'SkillDaoSql.updateSkill() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_entity), 'SkillDaoSql.updateSkill() : p_entity is required');

		var deferred = $qSync.defer();
		var self = this;

		var childrenPromises = [];

		self.fixDoubleWaysRelationship(p_entity);


		// 2. save or update all the other children (no matter the type of relationship), if asked by p_cascadeset
/*jshint loopfunc: true *//* jshint shadow:true */for (var i = 0 , cascadeSetLength = p_cascadeSet.length ; i < cascadeSetLength ; i += 1) {
if( p_cascadeSet[i].entityName === p_entity._type ) {
if( p_cascadeSet[i].key === 'EMPLOYEES') {
			childrenPromises.push( EmployeeDaoProxy.saveOrUpdateListEmployee(p_entity.employees, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) );
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


//@non-generated-start[updateSkill-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name SkillDaoSql#updateListSkill
	 * @function
	 *
	 * @description
	 * Updates a list of Skills.
	 *
	 * @param {Array<Skill>} p_entities Array containing Skills to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of Skills was updated, false otherwise.
	 */
	SkillDaoSql.prototype.updateListSkill = function(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

//@non-generated-start[updateListSkill-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'SkillDaoSql.updateListSkill() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'SkillDaoSql.updateListSkill() : p_cascadeSet is required and should be an array');
		console.assert(angular.isArray(p_entities), 'SkillDaoSql.updateListSkill() : p_entities is required and should be an array');

		var deferred = $qSync.defer();
		var self = this;

		/* updateListSkill() => updateSkill() */
		var o_arrayPromisesUpdateSkill = [];
		for( var i = 0; i < p_entities.length; i++ ) {
			o_arrayPromisesUpdateSkill.push( self.updateSkill(p_entities[i], p_context, angular.copy(p_cascadeSet), p_toSync, angular.copy(p_cascadeSetForDelete)) );
		}
		// $qSync.all() returns an array of the results of o_arrayPromisesUpdateSkill.
		// If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
		deferred.resolve( $qSync.all(o_arrayPromisesUpdateSkill) );


//@non-generated-start[updateListSkill-after][X]
//@non-generated-end

		return deferred.promise;
	};



	//==================================================================================
	//========   SPECIFIC METHODS - SAVE & UPDATE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name SkillDaoSql#saveOrUpdateSkill
	 * @function
	 *
	 * @description
	 * Saves of updates a Skill.
	 *
	 * @param {Skill} p_entity Skill to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
	 *
	 * @returns {Promise} Returns a promise equal to true if the Skill was saved or updated, false otherwise.
	 */
	SkillDaoSql.prototype.saveOrUpdateSkill = function(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

//@non-generated-start[saveOrUpdateSkill-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'SkillDaoSql.saveOrUpdateSkill() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'SkillDaoSql.saveOrUpdateSkill() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_entity), 'SkillDaoSql.saveOrUpdateSkill() : p_entity is required');

		var deferred = $qSync.defer();
		var self = this;

		if(p_entity.idToString !== -1) { 
			this.exist(p_entity, p_context).then(function(result) {
				if(result){ 
					/* updateSkill */
					console.log('SkillDaoSql.saveOrUpdateSkill(): entity exists  => updateSkill()');
					deferred.resolve( self.updateSkill(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) );
				} else {
				/* saveSkill */
					console.log('SkillDaoSql.saveOrUpdateSkill(): entity does not exist  => saveSkill()');
					deferred.resolve( self.saveSkill(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) ); // last parameter ignored by called method
				}
			},
 			function(error) { 
				deferred.reject(error); 
			});
		} else { 
			/* saveSkill */
			console.log('SkillDaoSql.saveOrUpdateSkill(): entity does not exist  => saveSkill()');
			deferred.resolve( self.saveSkill(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) ); // last parameter ignored by called method
		}


//@non-generated-start[saveOrUpdateSkill-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name SkillDaoSql#saveOrUpdateListSkill
	 * @function
	 *
	 * @description
	 * Saves of updates a list of Skills.
	 *
	 * @param {Array<Skill>} p_entities Array containing Skills to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of Skills was saved or updated, false otherwise.
	 */
	SkillDaoSql.prototype.saveOrUpdateListSkill = function(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

//@non-generated-start[saveOrUpdateListSkill-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'SkillDaoSql.saveOrUpdateListSkill() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'SkillDaoSql.saveOrUpdateListSkill() : p_cascadeSet is required and should be an array');
		console.assert(angular.isArray(p_entities), 'SkillDaoSql.saveOrUpdateListSkill() : p_entities is required and should be an array');

		var deferred = $qSync.defer();
		var self = this;

		/* saveOrUpdateListSkill() => saveOrUpdateSkill() */
		var o_arrayPromisesSaveOrUpdateSkill = [];
		for(var i = 0; i < p_entities.length; i++) {
			o_arrayPromisesSaveOrUpdateSkill.push( self.saveOrUpdateSkill(p_entities[i], p_context, angular.copy(p_cascadeSet), p_toSync, angular.copy(p_cascadeSetForDelete)) );
		}
		// $qSync.all() returns an array of the results of o_arrayPromisesSaveOrUpdateSkill.
		// If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
		deferred.resolve( $qSync.all(o_arrayPromisesSaveOrUpdateSkill) );


//@non-generated-start[saveOrUpdateListSkill-after][X]
//@non-generated-end

		return deferred.promise;
	};



	//==================================================================================
	//========   SPECIFIC METHODS - DELETE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name SkillDaoSql#deleteSkill
	 * @function
	 *
	 * @description
	 * Delete a Skill.
	 *
	 * @param {Skill} p_entity Skill to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Promise} Returns a promise equal to true if the Skill was deleted, false otherwise.
	 */
	SkillDaoSql.prototype.deleteSkill = function(p_entity, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[deleteSkill-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'SkillDaoSql.deleteSkill() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'SkillDaoSql.deleteSkill() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_entity), 'SkillDaoSql.deleteSkill() : p_entity is required');

		var deferred = $qSync.defer();
		var self = this;

		//0. load children that should always be deleted or updated
		self.loadChildrenIfNeeded(p_context, p_entity, p_cascadeSet).then(
			function(returnedSuccess_loadChildrenIfNeeded){
				var pointersDeletes = [];

				// 1. delete association records : for relationships many_to_many
				var o_sqlQuery = 'delete from T_EMPLSKILL' + 
								' inner join T_EMPLSKILL on ' + 
								' T_SKILL.ID = T_EMPLSKILL.SKILLID' + 
								' where ' + 
								'		T_SKILL.SKILLID = ?;';
				var o_sqlParameters = [].concat(p_entity.idToString);
				pointersDeletes.push( self.executeQueryToWrite(
					'SkillDaoSql.deleteSkill()', p_context, o_sqlQuery, o_sqlParameters) );




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
										console.error('SkillDaoSql.deleteSkill(): error: ', returnedError_executeQuery2ToDelete);
										p_context.addError('SkillDaoSql.deleteSkill(): error: '+ returnedError_executeQuery2ToDelete);
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

//@non-generated-start[deleteSkill-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name SkillDaoSql#deleteSkillById
	 * @function
	 *
	 * @description
	 * Deletes a Skill by id.
	 *
	 * @param {Integer} p_id Integer id of the Skill to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Promise} Returns a promise equal to true if the Skill was deleted, false otherwise.
	 */
	SkillDaoSql.prototype.deleteSkillById = function(p_id, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[deleteSkillById-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'SkillDaoSql.deleteSkillById() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'SkillDaoSql.deleteSkillById() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_id), 'SkillDaoSql.deleteSkillById() : p_id is required');

		var deferred = $qSync.defer();
		var self = this;

		self.getSkillById(p_id, p_context, angular.copy(p_cascadeSet), p_toSync).then(
			function(entity){
				deferred.resolve( self.deleteSkill(entity, p_context, angular.copy(p_cascadeSet), p_toSync) );
			},
			function(error){
				deferred.reject(error);
			}
		);


//@non-generated-start[deleteSkillById-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name SkillDaoSql#deleteListSkill
	 * @function
	 *
	 * @description
	 * Deletes a list of Skills.
	 *
	 * @param {Array<Skill>} p_entities Array containing Skills to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of Skills was deleted, false otherwise.
	 */
	SkillDaoSql.prototype.deleteListSkill = function(p_entities, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[deleteListSkill-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'SkillDaoSql.deleteListSkill() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'SkillDaoSql.deleteListSkill() : p_cascadeSet is required and should be an array');
		console.assert(angular.isArray(p_entities), 'SkillDaoSql.deleteListSkill() : p_entities is required and should be an array');

		var deferred = $qSync.defer();
		var self = this;

		/* deleteListSkill() => deleteSkill() */
		var o_arrayPromisesDeleteSkill = [];
		for( var i = 0; i < p_entities.length; i++ ) {
			o_arrayPromisesDeleteSkill.push( self.deleteSkill(p_entities[i], p_context, angular.copy(p_cascadeSet), p_toSync) );
		}
		// $qSync.all() returns an array of the results of o_arrayPromisesDeleteSkill.
		// If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
		deferred.resolve( $qSync.all(o_arrayPromisesDeleteSkill) );


//@non-generated-start[deleteListSkill-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name SkillDaoSql#deleteListSkillByIds
	 * @function
	 *
	 * @description
	 * Deletes a list of Skills by ids.
	 *
	 * @param {Array<Integer>} p_ids Array containing ids of Skills to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of Skills was deleted, false otherwise.
	 */
	SkillDaoSql.prototype.deleteListSkillByIds = function(p_ids, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[deleteListSkillByIds-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'SkillDaoSql.deleteListSkillByIds() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'SkillDaoSql.deleteListSkillByIds() : p_cascadeSet is required and should be an array');
		console.assert(angular.isUndefinedOrNull(p_ids) || angular.isArray(p_ids), 'SkillDaoSql.deleteListSkillByIds() : p_ids should be an array, if given');

		var deferred = $qSync.defer();
		var self = this;

		/* deleteListSkillByIds() => deleteListSkillById() */
		var o_arrayPromisesDeleteSkill = [];
		for( var i = 0; i < p_ids.length; i++ ) {
			o_arrayPromisesDeleteSkill.push( self.deleteSkillById(p_ids[i], p_context, angular.copy(p_cascadeSet), p_toSync) );
		}
		// $qSync.all() returns an array of the results of o_arrayPromisesDeleteSkill.
		// If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
		deferred.resolve( $qSync.all(o_arrayPromisesDeleteSkill) );


//@non-generated-start[deleteListSkillByIds-after][X]
//@non-generated-end

		return deferred.promise;
	};



//@non-generated-start[other-methods][X]
//@non-generated-end


	return new SkillDaoSql();
}]);
