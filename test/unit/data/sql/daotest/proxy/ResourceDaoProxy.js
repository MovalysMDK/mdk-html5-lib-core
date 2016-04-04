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

angular.module('data-daotest-sql').factory('ResourceDaoProxy',
	[
'MFUtils', 'MFDaoProxyAbstract',
//@non-generated-start[dependencies-names][X]
//@non-generated-end

//@non-generated-start[dependencies-classes][X]
function(MFUtils, MFDaoProxyAbstract
//@non-generated-end
)
{

	var ResourceDaoProxy = function ResourceDaoProxy(){
		// Constructor
		ResourceDaoProxy._Parent.call(this);

//@non-generated-start[constructor][X]
//@non-generated-end
	};

	MFUtils.extendFromInstance(ResourceDaoProxy, MFDaoProxyAbstract);



	//==================================================================================
	//========   ABSTRACT METHODS
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name ResourceDaoProxy#getNbEntities
	 * @function
	 *
	 * @description
	 * Returns the number of entities.
	 *
	 * @param {MFContext} p_context MFContext object
	 *
	 * @returns {Integer} Returns an Integer equal to the number of entities.
	 */
	ResourceDaoProxy.prototype.getNbEntities = function(p_context) {

		return this.getDaoImpl().getNbEntities(p_context);
	};



	//==================================================================================
	//========   SPECIFIC METHODS - GET
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name ResourceDaoProxy#getResourceById
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
	ResourceDaoProxy.prototype.getResourceById = function(p_id, p_context, p_cascadeSet) {

		return this.getDaoImpl().getResourceById(p_id, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name ResourceDaoProxy#getListResource
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
	ResourceDaoProxy.prototype.getListResource = function(p_context, p_cascadeSet) {

		return this.getDaoImpl().getListResource(p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name ResourceDaoProxy#getListResourceByIds
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
	ResourceDaoProxy.prototype.getListResourceByIds = function(p_ids, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListResourceByIds(p_ids, p_context, p_cascadeSet);
	};



	//==================================================================================
	//========   SPECIFIC METHODS - SAVE & UPDATE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name ResourceDaoProxy#saveResource
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
	ResourceDaoProxy.prototype.saveResource = function(p_entity, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().saveResource(p_entity, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name ResourceDaoProxy#saveListResource
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
	ResourceDaoProxy.prototype.saveListResource = function(p_entities, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().saveListResource(p_entities, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name ResourceDaoProxy#updateResource
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
	ResourceDaoProxy.prototype.updateResource = function(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

		return this.getDaoImpl().updateResource(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
	};


	/**
	 * @ngdoc method
	 * @name ResourceDaoProxy#updateListResource
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
	ResourceDaoProxy.prototype.updateListResource = function(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

		return this.getDaoImpl().updateListResource(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
	};


	/**
	 * @ngdoc method
	 * @name ResourceDaoProxy#saveOrUpdateResource
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
	ResourceDaoProxy.prototype.saveOrUpdateResource = function(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

		return this.getDaoImpl().saveOrUpdateResource(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
	};


	/**
	 * @ngdoc method
	 * @name ResourceDaoProxy#saveOrUpdateListResource
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
	ResourceDaoProxy.prototype.saveOrUpdateListResource = function(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

		return this.getDaoImpl().saveOrUpdateListResource(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
	};



	//==================================================================================
	//========   SPECIFIC METHODS - DELETE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name ResourceDaoProxy#deleteResource
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
	ResourceDaoProxy.prototype.deleteResource = function(p_entity, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().deleteResource(p_entity, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name ResourceDaoProxy#deleteResourceById
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
	ResourceDaoProxy.prototype.deleteResourceById = function(p_id, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().deleteResourceById(p_id, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name ResourceDaoProxy#deleteListResource
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
	ResourceDaoProxy.prototype.deleteListResource = function(p_entities, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().deleteListResource(p_entities, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name ResourceDaoProxy#deleteListResourceByIds
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
	ResourceDaoProxy.prototype.deleteListResourceByIds = function(p_ids, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().deleteListResourceByIds(p_ids, p_context, p_cascadeSet, p_toSync);
	};



//@non-generated-start[other-methods][X]
//@non-generated-end


	return new ResourceDaoProxy();
}]);
