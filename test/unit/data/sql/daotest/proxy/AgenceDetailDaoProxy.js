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

angular.module('data-daotest-sql').factory('AgenceDetailDaoProxy',
	[
'MFUtils', 'MFDaoProxyAbstract',
//@non-generated-start[dependencies-names][X]
//@non-generated-end

//@non-generated-start[dependencies-classes][X]
function(MFUtils, MFDaoProxyAbstract
//@non-generated-end
)
{

	var AgenceDetailDaoProxy = function AgenceDetailDaoProxy(){
		// Constructor
		AgenceDetailDaoProxy._Parent.call(this);

//@non-generated-start[constructor][X]
//@non-generated-end
	};

	MFUtils.extendFromInstance(AgenceDetailDaoProxy, MFDaoProxyAbstract);



	//==================================================================================
	//========   ABSTRACT METHODS
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name AgenceDetailDaoProxy#getNbEntities
	 * @function
	 *
	 * @description
	 * Returns the number of entities.
	 *
	 * @param {MFContext} p_context MFContext object
	 *
	 * @returns {Integer} Returns an Integer equal to the number of entities.
	 */
	AgenceDetailDaoProxy.prototype.getNbEntities = function(p_context) {

		return this.getDaoImpl().getNbEntities(p_context);
	};



	//==================================================================================
	//========   SPECIFIC METHODS - GET
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name AgenceDetailDaoProxy#getAgenceDetailById
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
	AgenceDetailDaoProxy.prototype.getAgenceDetailById = function(p_id, p_context, p_cascadeSet) {

		return this.getDaoImpl().getAgenceDetailById(p_id, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDetailDaoProxy#getListAgenceDetail
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
	AgenceDetailDaoProxy.prototype.getListAgenceDetail = function(p_context, p_cascadeSet) {

		return this.getDaoImpl().getListAgenceDetail(p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDetailDaoProxy#getListAgenceDetailByIds
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
	AgenceDetailDaoProxy.prototype.getListAgenceDetailByIds = function(p_ids, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListAgenceDetailByIds(p_ids, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDetailDaoProxy#getAgenceDetailByAgence
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
	AgenceDetailDaoProxy.prototype.getAgenceDetailByAgence = function(p_foreignKeys_agence, p_context, p_cascadeSet) {

		return this.getDaoImpl().getAgenceDetailByAgence(p_foreignKeys_agence, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDetailDaoProxy#getAgenceDetailByAgenceid
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
	AgenceDetailDaoProxy.prototype.getAgenceDetailByAgenceid = function(p_foreignKeys_agenceid, p_context, p_cascadeSet) {

		return this.getDaoImpl().getAgenceDetailByAgenceid(p_foreignKeys_agenceid, p_context, p_cascadeSet);
	};



	//==================================================================================
	//========   SPECIFIC METHODS - SAVE & UPDATE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name AgenceDetailDaoProxy#saveAgenceDetail
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
	AgenceDetailDaoProxy.prototype.saveAgenceDetail = function(p_entity, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().saveAgenceDetail(p_entity, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDetailDaoProxy#saveListAgenceDetail
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
	AgenceDetailDaoProxy.prototype.saveListAgenceDetail = function(p_entities, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().saveListAgenceDetail(p_entities, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDetailDaoProxy#updateAgenceDetail
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
	AgenceDetailDaoProxy.prototype.updateAgenceDetail = function(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

		return this.getDaoImpl().updateAgenceDetail(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDetailDaoProxy#updateListAgenceDetail
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
	AgenceDetailDaoProxy.prototype.updateListAgenceDetail = function(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

		return this.getDaoImpl().updateListAgenceDetail(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDetailDaoProxy#saveOrUpdateAgenceDetail
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
	AgenceDetailDaoProxy.prototype.saveOrUpdateAgenceDetail = function(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

		return this.getDaoImpl().saveOrUpdateAgenceDetail(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDetailDaoProxy#saveOrUpdateListAgenceDetail
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
	AgenceDetailDaoProxy.prototype.saveOrUpdateListAgenceDetail = function(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

		return this.getDaoImpl().saveOrUpdateListAgenceDetail(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
	};



	//==================================================================================
	//========   SPECIFIC METHODS - DELETE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name AgenceDetailDaoProxy#deleteAgenceDetail
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
	AgenceDetailDaoProxy.prototype.deleteAgenceDetail = function(p_entity, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().deleteAgenceDetail(p_entity, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDetailDaoProxy#deleteAgenceDetailById
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
	AgenceDetailDaoProxy.prototype.deleteAgenceDetailById = function(p_id, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().deleteAgenceDetailById(p_id, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDetailDaoProxy#deleteListAgenceDetail
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
	AgenceDetailDaoProxy.prototype.deleteListAgenceDetail = function(p_entities, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().deleteListAgenceDetail(p_entities, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDetailDaoProxy#deleteListAgenceDetailByIds
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
	AgenceDetailDaoProxy.prototype.deleteListAgenceDetailByIds = function(p_ids, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().deleteListAgenceDetailByIds(p_ids, p_context, p_cascadeSet, p_toSync);
	};



//@non-generated-start[other-methods][X]
//@non-generated-end


	return new AgenceDetailDaoProxy();
}]);
