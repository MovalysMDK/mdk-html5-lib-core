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

angular.module('data-daotest-sql').factory('EmplSkillDaoProxy',
	[
'MFUtils', 'MFDaoProxyAbstract',
//@non-generated-start[dependencies-names][X]
//@non-generated-end

//@non-generated-start[dependencies-classes][X]
function(MFUtils, MFDaoProxyAbstract
//@non-generated-end
)
{

	var EmplSkillDaoProxy = function EmplSkillDaoProxy(){
		// Constructor
		EmplSkillDaoProxy._Parent.call(this);

//@non-generated-start[constructor][X]
//@non-generated-end
	};

	MFUtils.extendFromInstance(EmplSkillDaoProxy, MFDaoProxyAbstract);



	//==================================================================================
	//========   ABSTRACT METHODS
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name EmplSkillDaoProxy#getNbEntities
	 * @function
	 *
	 * @description
	 * Returns the number of entities.
	 *
	 * @param {MFContext} p_context MFContext object
	 *
	 * @returns {Integer} Returns an Integer equal to the number of entities.
	 */
	EmplSkillDaoProxy.prototype.getNbEntities = function(p_context) {

		return this.getDaoImpl().getNbEntities(p_context);
	};



	//==================================================================================
	//========   SPECIFIC METHODS - GET
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name EmplSkillDaoProxy#getEmplSkillById
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
	EmplSkillDaoProxy.prototype.getEmplSkillById = function(p_id, p_context, p_cascadeSet) {

		return this.getDaoImpl().getEmplSkillById(p_id, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name EmplSkillDaoProxy#getListEmplSkill
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
	EmplSkillDaoProxy.prototype.getListEmplSkill = function(p_context, p_cascadeSet) {

		return this.getDaoImpl().getListEmplSkill(p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name EmplSkillDaoProxy#getListEmplSkillByIds
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
	EmplSkillDaoProxy.prototype.getListEmplSkillByIds = function(p_ids, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListEmplSkillByIds(p_ids, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name EmplSkillDaoProxy#getListEmplSkillByEmployeeId
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
	EmplSkillDaoProxy.prototype.getListEmplSkillByEmployeeId = function(p_employeeId, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListEmplSkillByEmployeeId(p_employeeId, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name EmplSkillDaoProxy#getListEmplSkillBySkillId
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
	EmplSkillDaoProxy.prototype.getListEmplSkillBySkillId = function(p_skillId, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListEmplSkillBySkillId(p_skillId, p_context, p_cascadeSet);
	};



	//==================================================================================
	//========   SPECIFIC METHODS - SAVE & UPDATE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name EmplSkillDaoProxy#saveEmplSkill
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
	EmplSkillDaoProxy.prototype.saveEmplSkill = function(p_entity, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().saveEmplSkill(p_entity, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name EmplSkillDaoProxy#saveListEmplSkill
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
	EmplSkillDaoProxy.prototype.saveListEmplSkill = function(p_entities, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().saveListEmplSkill(p_entities, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name EmplSkillDaoProxy#updateEmplSkill
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
	EmplSkillDaoProxy.prototype.updateEmplSkill = function(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

		return this.getDaoImpl().updateEmplSkill(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
	};


	/**
	 * @ngdoc method
	 * @name EmplSkillDaoProxy#updateListEmplSkill
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
	EmplSkillDaoProxy.prototype.updateListEmplSkill = function(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

		return this.getDaoImpl().updateListEmplSkill(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
	};


	/**
	 * @ngdoc method
	 * @name EmplSkillDaoProxy#saveOrUpdateEmplSkill
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
	EmplSkillDaoProxy.prototype.saveOrUpdateEmplSkill = function(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

		return this.getDaoImpl().saveOrUpdateEmplSkill(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
	};


	/**
	 * @ngdoc method
	 * @name EmplSkillDaoProxy#saveOrUpdateListEmplSkill
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
	EmplSkillDaoProxy.prototype.saveOrUpdateListEmplSkill = function(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

		return this.getDaoImpl().saveOrUpdateListEmplSkill(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
	};



	//==================================================================================
	//========   SPECIFIC METHODS - DELETE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name EmplSkillDaoProxy#deleteEmplSkill
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
	EmplSkillDaoProxy.prototype.deleteEmplSkill = function(p_entity, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().deleteEmplSkill(p_entity, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name EmplSkillDaoProxy#deleteEmplSkillById
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
	EmplSkillDaoProxy.prototype.deleteEmplSkillById = function(p_id, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().deleteEmplSkillById(p_id, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name EmplSkillDaoProxy#deleteListEmplSkill
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
	EmplSkillDaoProxy.prototype.deleteListEmplSkill = function(p_entities, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().deleteListEmplSkill(p_entities, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name EmplSkillDaoProxy#deleteListEmplSkillByIds
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
	EmplSkillDaoProxy.prototype.deleteListEmplSkillByIds = function(p_ids, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().deleteListEmplSkillByIds(p_ids, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name EmplSkillDaoProxy#deleteEmplSkillByEmployeeId
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
	EmplSkillDaoProxy.prototype.deleteEmplSkillByEmployeeId = function(p_employeeId, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().deleteEmplSkillByEmployeeId(p_employeeId, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name EmplSkillDaoProxy#deleteEmplSkillBySkillId
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
	EmplSkillDaoProxy.prototype.deleteEmplSkillBySkillId = function(p_skillId, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().deleteEmplSkillBySkillId(p_skillId, p_context, p_cascadeSet, p_toSync);
	};



//@non-generated-start[other-methods][X]
//@non-generated-end


	return new EmplSkillDaoProxy();
}]);
