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

angular.module('data-daotest-sql').factory('ActiviteDaoProxy',
	[
'MFUtils', 'MFDaoProxyAbstract',
//@non-generated-start[dependencies-names][X]
//@non-generated-end

//@non-generated-start[dependencies-classes][X]
function(MFUtils, MFDaoProxyAbstract
//@non-generated-end
)
{

	var ActiviteDaoProxy = function ActiviteDaoProxy(){
		// Constructor
		ActiviteDaoProxy._Parent.call(this);

//@non-generated-start[constructor][X]
//@non-generated-end
	};

	MFUtils.extendFromInstance(ActiviteDaoProxy, MFDaoProxyAbstract);



	//==================================================================================
	//========   ABSTRACT METHODS
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name ActiviteDaoProxy#getNbEntities
	 * @function
	 *
	 * @description
	 * Returns the number of entities.
	 *
	 * @param {MFContext} p_context MFContext object
	 *
	 * @returns {Integer} Returns an Integer equal to the number of entities.
	 */
	ActiviteDaoProxy.prototype.getNbEntities = function(p_context) {

		return this.getDaoImpl().getNbEntities(p_context);
	};



	//==================================================================================
	//========   SPECIFIC METHODS - GET
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name ActiviteDaoProxy#getActiviteById
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
	ActiviteDaoProxy.prototype.getActiviteById = function(p_id, p_context, p_cascadeSet) {

		return this.getDaoImpl().getActiviteById(p_id, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name ActiviteDaoProxy#getListActivite
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
	ActiviteDaoProxy.prototype.getListActivite = function(p_context, p_cascadeSet) {

		return this.getDaoImpl().getListActivite(p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name ActiviteDaoProxy#getListActiviteByIds
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
	ActiviteDaoProxy.prototype.getListActiviteByIds = function(p_ids, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListActiviteByIds(p_ids, p_context, p_cascadeSet);
	};



	//==================================================================================
	//========   SPECIFIC METHODS - SAVE & UPDATE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name ActiviteDaoProxy#saveActivite
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
	ActiviteDaoProxy.prototype.saveActivite = function(p_entity, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().saveActivite(p_entity, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name ActiviteDaoProxy#saveListActivite
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
	ActiviteDaoProxy.prototype.saveListActivite = function(p_entities, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().saveListActivite(p_entities, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name ActiviteDaoProxy#updateActivite
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
	ActiviteDaoProxy.prototype.updateActivite = function(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

		return this.getDaoImpl().updateActivite(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
	};


	/**
	 * @ngdoc method
	 * @name ActiviteDaoProxy#updateListActivite
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
	ActiviteDaoProxy.prototype.updateListActivite = function(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

		return this.getDaoImpl().updateListActivite(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
	};


	/**
	 * @ngdoc method
	 * @name ActiviteDaoProxy#saveOrUpdateActivite
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
	ActiviteDaoProxy.prototype.saveOrUpdateActivite = function(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

		return this.getDaoImpl().saveOrUpdateActivite(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
	};


	/**
	 * @ngdoc method
	 * @name ActiviteDaoProxy#saveOrUpdateListActivite
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
	ActiviteDaoProxy.prototype.saveOrUpdateListActivite = function(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

		return this.getDaoImpl().saveOrUpdateListActivite(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
	};



	//==================================================================================
	//========   SPECIFIC METHODS - DELETE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name ActiviteDaoProxy#deleteActivite
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
	ActiviteDaoProxy.prototype.deleteActivite = function(p_entity, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().deleteActivite(p_entity, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name ActiviteDaoProxy#deleteActiviteById
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
	ActiviteDaoProxy.prototype.deleteActiviteById = function(p_id, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().deleteActiviteById(p_id, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name ActiviteDaoProxy#deleteListActivite
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
	ActiviteDaoProxy.prototype.deleteListActivite = function(p_entities, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().deleteListActivite(p_entities, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name ActiviteDaoProxy#deleteListActiviteByIds
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
	ActiviteDaoProxy.prototype.deleteListActiviteByIds = function(p_ids, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().deleteListActiviteByIds(p_ids, p_context, p_cascadeSet, p_toSync);
	};



//@non-generated-start[other-methods][X]
//@non-generated-end


	return new ActiviteDaoProxy();
}]);
