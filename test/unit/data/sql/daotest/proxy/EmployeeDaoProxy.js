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

angular.module('data-daotest-sql').factory('EmployeeDaoProxy',
	[
'MFUtils', 'MFDaoProxyAbstract',
//@non-generated-start[dependencies-names][X]
//@non-generated-end

//@non-generated-start[dependencies-classes][X]
function(MFUtils, MFDaoProxyAbstract
//@non-generated-end
)
{

	var EmployeeDaoProxy = function EmployeeDaoProxy(){
		// Constructor
		EmployeeDaoProxy._Parent.call(this);

//@non-generated-start[constructor][X]
//@non-generated-end
	};

	MFUtils.extendFromInstance(EmployeeDaoProxy, MFDaoProxyAbstract);



	//==================================================================================
	//========   ABSTRACT METHODS
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name EmployeeDaoProxy#getNbEntities
	 * @function
	 *
	 * @description
	 * Returns the number of entities.
	 *
	 * @param {MFContext} p_context MFContext object
	 *
	 * @returns {Integer} Returns an Integer equal to the number of entities.
	 */
	EmployeeDaoProxy.prototype.getNbEntities = function(p_context) {

		return this.getDaoImpl().getNbEntities(p_context);
	};



	//==================================================================================
	//========   SPECIFIC METHODS - GET
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name EmployeeDaoProxy#getEmployeeById
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
	EmployeeDaoProxy.prototype.getEmployeeById = function(p_id, p_context, p_cascadeSet) {

		return this.getDaoImpl().getEmployeeById(p_id, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name EmployeeDaoProxy#getListEmployee
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
	EmployeeDaoProxy.prototype.getListEmployee = function(p_context, p_cascadeSet) {

		return this.getDaoImpl().getListEmployee(p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name EmployeeDaoProxy#getListEmployeeByIds
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
	EmployeeDaoProxy.prototype.getListEmployeeByIds = function(p_ids, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListEmployeeByIds(p_ids, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name EmployeeDaoProxy#getListEmployeeBySkills
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
	EmployeeDaoProxy.prototype.getListEmployeeBySkills = function(p_foreignKeys_skill, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListEmployeeBySkills(p_foreignKeys_skill, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name EmployeeDaoProxy#getListEmployeeBySkillskillId
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
	EmployeeDaoProxy.prototype.getListEmployeeBySkillskillId = function(p_foreignKeys_skillskillId, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListEmployeeBySkillskillId(p_foreignKeys_skillskillId, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name EmployeeDaoProxy#getListEmployeeByAgence
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
	EmployeeDaoProxy.prototype.getListEmployeeByAgence = function(p_foreignKeys_agence, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListEmployeeByAgence(p_foreignKeys_agence, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name EmployeeDaoProxy#getListEmployeeByAgenceid
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
	EmployeeDaoProxy.prototype.getListEmployeeByAgenceid = function(p_foreignKeys_agenceid, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListEmployeeByAgenceid(p_foreignKeys_agenceid, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name EmployeeDaoProxy#getListEmployeeBySkillsids
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
	EmployeeDaoProxy.prototype.getListEmployeeBySkillsids = function(p_foreignKeys_skillids, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListEmployeeBySkillsids(p_foreignKeys_skillids, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name EmployeeDaoProxy#getListEmployeeByAgenceids
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
	EmployeeDaoProxy.prototype.getListEmployeeByAgenceids = function(p_foreignKeys_agenceids, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListEmployeeByAgenceids(p_foreignKeys_agenceids, p_context, p_cascadeSet);
	};



	//==================================================================================
	//========   SPECIFIC METHODS - SAVE & UPDATE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name EmployeeDaoProxy#saveEmployee
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
	EmployeeDaoProxy.prototype.saveEmployee = function(p_entity, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().saveEmployee(p_entity, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name EmployeeDaoProxy#saveListEmployee
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
	EmployeeDaoProxy.prototype.saveListEmployee = function(p_entities, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().saveListEmployee(p_entities, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name EmployeeDaoProxy#updateEmployee
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
	EmployeeDaoProxy.prototype.updateEmployee = function(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

		return this.getDaoImpl().updateEmployee(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
	};


	/**
	 * @ngdoc method
	 * @name EmployeeDaoProxy#updateListEmployee
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
	EmployeeDaoProxy.prototype.updateListEmployee = function(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

		return this.getDaoImpl().updateListEmployee(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
	};


	/**
	 * @ngdoc method
	 * @name EmployeeDaoProxy#saveOrUpdateEmployee
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
	EmployeeDaoProxy.prototype.saveOrUpdateEmployee = function(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

		return this.getDaoImpl().saveOrUpdateEmployee(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
	};


	/**
	 * @ngdoc method
	 * @name EmployeeDaoProxy#saveOrUpdateListEmployee
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
	EmployeeDaoProxy.prototype.saveOrUpdateListEmployee = function(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

		return this.getDaoImpl().saveOrUpdateListEmployee(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
	};



	//==================================================================================
	//========   SPECIFIC METHODS - DELETE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name EmployeeDaoProxy#deleteEmployee
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
	EmployeeDaoProxy.prototype.deleteEmployee = function(p_entity, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().deleteEmployee(p_entity, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name EmployeeDaoProxy#deleteEmployeeById
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
	EmployeeDaoProxy.prototype.deleteEmployeeById = function(p_id, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().deleteEmployeeById(p_id, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name EmployeeDaoProxy#deleteListEmployee
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
	EmployeeDaoProxy.prototype.deleteListEmployee = function(p_entities, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().deleteListEmployee(p_entities, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name EmployeeDaoProxy#deleteListEmployeeByIds
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
	EmployeeDaoProxy.prototype.deleteListEmployeeByIds = function(p_ids, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().deleteListEmployeeByIds(p_ids, p_context, p_cascadeSet, p_toSync);
	};



//@non-generated-start[other-methods][X]
//@non-generated-end


	return new EmployeeDaoProxy();
}]);
