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

angular.module('data-daotest-sql').factory('AgencePhotosDaoProxy',
	[
'MFUtils', 'MFDaoProxyAbstract',
//@non-generated-start[dependencies-names][X]
//@non-generated-end

//@non-generated-start[dependencies-classes][X]
function(MFUtils, MFDaoProxyAbstract
//@non-generated-end
)
{

	var AgencePhotosDaoProxy = function AgencePhotosDaoProxy(){
		// Constructor
		AgencePhotosDaoProxy._Parent.call(this);

//@non-generated-start[constructor][X]
//@non-generated-end
	};

	MFUtils.extendFromInstance(AgencePhotosDaoProxy, MFDaoProxyAbstract);



	//==================================================================================
	//========   ABSTRACT METHODS
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name AgencePhotosDaoProxy#getNbEntities
	 * @function
	 *
	 * @description
	 * Returns the number of entities.
	 *
	 * @param {MFContext} p_context MFContext object
	 *
	 * @returns {Integer} Returns an Integer equal to the number of entities.
	 */
	AgencePhotosDaoProxy.prototype.getNbEntities = function(p_context) {

		return this.getDaoImpl().getNbEntities(p_context);
	};



	//==================================================================================
	//========   SPECIFIC METHODS - GET
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name AgencePhotosDaoProxy#getAgencePhotosById
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
	AgencePhotosDaoProxy.prototype.getAgencePhotosById = function(p_id, p_context, p_cascadeSet) {

		return this.getDaoImpl().getAgencePhotosById(p_id, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name AgencePhotosDaoProxy#getListAgencePhotos
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
	AgencePhotosDaoProxy.prototype.getListAgencePhotos = function(p_context, p_cascadeSet) {

		return this.getDaoImpl().getListAgencePhotos(p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name AgencePhotosDaoProxy#getListAgencePhotosByIds
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
	AgencePhotosDaoProxy.prototype.getListAgencePhotosByIds = function(p_ids, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListAgencePhotosByIds(p_ids, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name AgencePhotosDaoProxy#getListAgencePhotosByPhotosAgence
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
	AgencePhotosDaoProxy.prototype.getListAgencePhotosByPhotosAgence = function(p_foreignKeys_photosAgence, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListAgencePhotosByPhotosAgence(p_foreignKeys_photosAgence, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name AgencePhotosDaoProxy#getListAgencePhotosByPhotosAgenceid
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
	AgencePhotosDaoProxy.prototype.getListAgencePhotosByPhotosAgenceid = function(p_foreignKeys_photosAgenceid, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListAgencePhotosByPhotosAgenceid(p_foreignKeys_photosAgenceid, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name AgencePhotosDaoProxy#getListAgencePhotosByPhotosAgenceids
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
	AgencePhotosDaoProxy.prototype.getListAgencePhotosByPhotosAgenceids = function(p_foreignKeys_photosAgenceids, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListAgencePhotosByPhotosAgenceids(p_foreignKeys_photosAgenceids, p_context, p_cascadeSet);
	};



	//==================================================================================
	//========   SPECIFIC METHODS - SAVE & UPDATE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name AgencePhotosDaoProxy#saveAgencePhotos
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
	AgencePhotosDaoProxy.prototype.saveAgencePhotos = function(p_entity, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().saveAgencePhotos(p_entity, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name AgencePhotosDaoProxy#saveListAgencePhotos
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
	AgencePhotosDaoProxy.prototype.saveListAgencePhotos = function(p_entities, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().saveListAgencePhotos(p_entities, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name AgencePhotosDaoProxy#updateAgencePhotos
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
	AgencePhotosDaoProxy.prototype.updateAgencePhotos = function(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

		return this.getDaoImpl().updateAgencePhotos(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
	};


	/**
	 * @ngdoc method
	 * @name AgencePhotosDaoProxy#updateListAgencePhotos
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
	AgencePhotosDaoProxy.prototype.updateListAgencePhotos = function(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

		return this.getDaoImpl().updateListAgencePhotos(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
	};


	/**
	 * @ngdoc method
	 * @name AgencePhotosDaoProxy#saveOrUpdateAgencePhotos
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
	AgencePhotosDaoProxy.prototype.saveOrUpdateAgencePhotos = function(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

		return this.getDaoImpl().saveOrUpdateAgencePhotos(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
	};


	/**
	 * @ngdoc method
	 * @name AgencePhotosDaoProxy#saveOrUpdateListAgencePhotos
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
	AgencePhotosDaoProxy.prototype.saveOrUpdateListAgencePhotos = function(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

		return this.getDaoImpl().saveOrUpdateListAgencePhotos(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
	};



	//==================================================================================
	//========   SPECIFIC METHODS - DELETE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name AgencePhotosDaoProxy#deleteAgencePhotos
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
	AgencePhotosDaoProxy.prototype.deleteAgencePhotos = function(p_entity, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().deleteAgencePhotos(p_entity, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name AgencePhotosDaoProxy#deleteAgencePhotosById
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
	AgencePhotosDaoProxy.prototype.deleteAgencePhotosById = function(p_id, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().deleteAgencePhotosById(p_id, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name AgencePhotosDaoProxy#deleteListAgencePhotos
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
	AgencePhotosDaoProxy.prototype.deleteListAgencePhotos = function(p_entities, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().deleteListAgencePhotos(p_entities, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name AgencePhotosDaoProxy#deleteListAgencePhotosByIds
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
	AgencePhotosDaoProxy.prototype.deleteListAgencePhotosByIds = function(p_ids, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().deleteListAgencePhotosByIds(p_ids, p_context, p_cascadeSet, p_toSync);
	};



//@non-generated-start[other-methods][X]
//@non-generated-end


	return new AgencePhotosDaoProxy();
}]);
