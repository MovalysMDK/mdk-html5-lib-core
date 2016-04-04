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

angular.module('data-daotest-sql').factory('SkillDaoProxy',
	[
'MFUtils', 'MFDaoProxyAbstract',
//@non-generated-start[dependencies-names][X]
//@non-generated-end

//@non-generated-start[dependencies-classes][X]
function(MFUtils, MFDaoProxyAbstract
//@non-generated-end
)
{

	var SkillDaoProxy = function SkillDaoProxy(){
		// Constructor
		SkillDaoProxy._Parent.call(this);

//@non-generated-start[constructor][X]
//@non-generated-end
	};

	MFUtils.extendFromInstance(SkillDaoProxy, MFDaoProxyAbstract);



	//==================================================================================
	//========   ABSTRACT METHODS
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name SkillDaoProxy#getNbEntities
	 * @function
	 *
	 * @description
	 * Returns the number of entities.
	 *
	 * @param {MFContext} p_context MFContext object
	 *
	 * @returns {Integer} Returns an Integer equal to the number of entities.
	 */
	SkillDaoProxy.prototype.getNbEntities = function(p_context) {

		return this.getDaoImpl().getNbEntities(p_context);
	};



	//==================================================================================
	//========   SPECIFIC METHODS - GET
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name SkillDaoProxy#getSkillById
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
	SkillDaoProxy.prototype.getSkillById = function(p_id, p_context, p_cascadeSet) {

		return this.getDaoImpl().getSkillById(p_id, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name SkillDaoProxy#getListSkill
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
	SkillDaoProxy.prototype.getListSkill = function(p_context, p_cascadeSet) {

		return this.getDaoImpl().getListSkill(p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name SkillDaoProxy#getListSkillByIds
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
	SkillDaoProxy.prototype.getListSkillByIds = function(p_ids, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListSkillByIds(p_ids, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name SkillDaoProxy#getListSkillByEmployees
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
	SkillDaoProxy.prototype.getListSkillByEmployees = function(p_foreignKeys_employee, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListSkillByEmployees(p_foreignKeys_employee, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name SkillDaoProxy#getListSkillByEmployeeemployeeId
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
	SkillDaoProxy.prototype.getListSkillByEmployeeemployeeId = function(p_foreignKeys_employeeemployeeId, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListSkillByEmployeeemployeeId(p_foreignKeys_employeeemployeeId, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name SkillDaoProxy#getListSkillByEmployeesids
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
	SkillDaoProxy.prototype.getListSkillByEmployeesids = function(p_foreignKeys_employeeids, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListSkillByEmployeesids(p_foreignKeys_employeeids, p_context, p_cascadeSet);
	};



	//==================================================================================
	//========   SPECIFIC METHODS - SAVE & UPDATE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name SkillDaoProxy#saveSkill
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
	SkillDaoProxy.prototype.saveSkill = function(p_entity, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().saveSkill(p_entity, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name SkillDaoProxy#saveListSkill
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
	SkillDaoProxy.prototype.saveListSkill = function(p_entities, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().saveListSkill(p_entities, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name SkillDaoProxy#updateSkill
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
	SkillDaoProxy.prototype.updateSkill = function(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

		return this.getDaoImpl().updateSkill(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
	};


	/**
	 * @ngdoc method
	 * @name SkillDaoProxy#updateListSkill
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
	SkillDaoProxy.prototype.updateListSkill = function(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

		return this.getDaoImpl().updateListSkill(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
	};


	/**
	 * @ngdoc method
	 * @name SkillDaoProxy#saveOrUpdateSkill
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
	SkillDaoProxy.prototype.saveOrUpdateSkill = function(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

		return this.getDaoImpl().saveOrUpdateSkill(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
	};


	/**
	 * @ngdoc method
	 * @name SkillDaoProxy#saveOrUpdateListSkill
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
	SkillDaoProxy.prototype.saveOrUpdateListSkill = function(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

		return this.getDaoImpl().saveOrUpdateListSkill(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
	};



	//==================================================================================
	//========   SPECIFIC METHODS - DELETE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name SkillDaoProxy#deleteSkill
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
	SkillDaoProxy.prototype.deleteSkill = function(p_entity, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().deleteSkill(p_entity, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name SkillDaoProxy#deleteSkillById
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
	SkillDaoProxy.prototype.deleteSkillById = function(p_id, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().deleteSkillById(p_id, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name SkillDaoProxy#deleteListSkill
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
	SkillDaoProxy.prototype.deleteListSkill = function(p_entities, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().deleteListSkill(p_entities, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name SkillDaoProxy#deleteListSkillByIds
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
	SkillDaoProxy.prototype.deleteListSkillByIds = function(p_ids, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().deleteListSkillByIds(p_ids, p_context, p_cascadeSet, p_toSync);
	};



//@non-generated-start[other-methods][X]
//@non-generated-end


	return new SkillDaoProxy();
}]);
