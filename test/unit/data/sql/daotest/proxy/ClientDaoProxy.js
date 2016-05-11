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

angular.module('data-daotest-sql').factory('ClientDaoProxy',
	[
'MFUtils', 'MFDaoProxyAbstract',
//@non-generated-start[dependencies-names][X]
//@non-generated-end

//@non-generated-start[dependencies-classes][X]
function(MFUtils, MFDaoProxyAbstract
//@non-generated-end
)
{

	var ClientDaoProxy = function ClientDaoProxy(){
		// Constructor
		ClientDaoProxy._Parent.call(this);

//@non-generated-start[constructor][X]
//@non-generated-end
	};

	MFUtils.extendFromInstance(ClientDaoProxy, MFDaoProxyAbstract);



	//==================================================================================
	//========   ABSTRACT METHODS
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name ClientDaoProxy#getNbEntities
	 * @function
	 *
	 * @description
	 * Returns the number of entities.
	 *
	 * @param {MFContext} p_context MFContext object
	 *
	 * @returns {Integer} Returns an Integer equal to the number of entities.
	 */
	ClientDaoProxy.prototype.getNbEntities = function(p_context) {

		return this.getDaoImpl().getNbEntities(p_context);
	};



	//==================================================================================
	//========   SPECIFIC METHODS - GET
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name ClientDaoProxy#getClientById
	 * @function
	 *
	 * @description
	 * Returns a Client by id.
	 *
	 * @param {Integer} p_id Integer id of the Client to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Client} Returns the Client, including children if required
	 */
	ClientDaoProxy.prototype.getClientById = function(p_id, p_context, p_cascadeSet) {

		return this.getDaoImpl().getClientById(p_id, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name ClientDaoProxy#getListClient
	 * @function
	 *
	 * @description
	 * Returns a list of Clients according to the parameter(s).
	 *
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Clients, including children if required.
	 */
	ClientDaoProxy.prototype.getListClient = function(p_context, p_cascadeSet) {

		return this.getDaoImpl().getListClient(p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name ClientDaoProxy#getListClientByIds
	 * @function
	 *
	 * @description
	 * Returns a list of Clients by ids.
	 *
	 * @param {Array<Integer>} p_ids Array containing ids of Clients to process (optional)
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Clients, including children if required.
	 */
	ClientDaoProxy.prototype.getListClientByIds = function(p_ids, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListClientByIds(p_ids, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name ClientDaoProxy#getListClientByNomAndPrenom
	 * @function
	 *
	 * @description
	 * Returns a list of Clients according to the parameter(s).
	 *
	 * @param {Array<Integer>} p_nom
	 * @param {Array<Integer>} p_prenom
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Clients, including children if required.
	 */
	ClientDaoProxy.prototype.getListClientByNomAndPrenom = function(p_properties, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListClientByNomAndPrenom(p_properties, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name ClientDaoProxy#getNbEntitiesByNomAndPrenom
	 * @function
	 *
	 * @description
	 * Returns the list of all Clients.
	 *
	 * @param {Array<Integer>} p_nom
	 * @param {Array<Integer>} p_prenom
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Client} Returns the Client, including children if required
	 */
	ClientDaoProxy.prototype.getNbEntitiesByNomAndPrenom = function(p_properties, p_context, p_cascadeSet) {

		return this.getDaoImpl().getNbEntitiesByNomAndPrenom(p_properties, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name ClientDaoProxy#getListClientByAgence
	 * @function
	 *
	 * @description
	 * Returns a list of Clients according to the parameter(s).
	 *
	 * @param {Array<Integer>} p_foreignKeys_agence
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Clients, including children if required.
	 */
	ClientDaoProxy.prototype.getListClientByAgence = function(p_foreignKeys_agence, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListClientByAgence(p_foreignKeys_agence, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name ClientDaoProxy#getListClientByAgenceid
	 * @function
	 *
	 * @description
	 * Returns a list of Clients according to the parameter(s).
	 *
	 * @param {Array<Integer>} p_foreignKeys_agenceid
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Clients, including children if required.
	 */
	ClientDaoProxy.prototype.getListClientByAgenceid = function(p_foreignKeys_agenceid, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListClientByAgenceid(p_foreignKeys_agenceid, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name ClientDaoProxy#getClientByAgency
	 * @function
	 *
	 * @description
	 * Returns the list of all Clients.
	 *
	 * @param {Array<Integer>} p_foreignKeys_agency
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Client} Returns the Client, including children if required
	 */
	ClientDaoProxy.prototype.getClientByAgency = function(p_foreignKeys_agency, p_context, p_cascadeSet) {

		return this.getDaoImpl().getClientByAgency(p_foreignKeys_agency, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name ClientDaoProxy#getClientByAgencyid
	 * @function
	 *
	 * @description
	 * Returns the list of all Clients.
	 *
	 * @param {Array<Integer>} p_foreignKeys_agencyid
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Client} Returns the Client, including children if required
	 */
	ClientDaoProxy.prototype.getClientByAgencyid = function(p_foreignKeys_agencyid, p_context, p_cascadeSet) {

		return this.getDaoImpl().getClientByAgencyid(p_foreignKeys_agencyid, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name ClientDaoProxy#getListClientByAgenceids
	 * @function
	 *
	 * @description
	 * Returns a list of Clients according to the parameter(s).
	 *
	 * @param {Array<Integer>} p_foreignKeys_agenceids
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Clients, including children if required.
	 */
	ClientDaoProxy.prototype.getListClientByAgenceids = function(p_foreignKeys_agenceids, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListClientByAgenceids(p_foreignKeys_agenceids, p_context, p_cascadeSet);
	};



	//==================================================================================
	//========   SPECIFIC METHODS - SAVE & UPDATE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name ClientDaoProxy#saveClient
	 * @function
	 *
	 * @description
	 * Saves a Client.
	 *
	 * @param {Client} p_entity Client to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Promise} Returns a promise equal to true if the Client was saved, false otherwise.
	 */
	ClientDaoProxy.prototype.saveClient = function(p_entity, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().saveClient(p_entity, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name ClientDaoProxy#saveListClient
	 * @function
	 *
	 * @description
	 * Saves a list of Clients.
	 *
	 * @param {Array<Client>} p_entities Array containing Clients to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of Clients was saved, false otherwise.
	 */
	ClientDaoProxy.prototype.saveListClient = function(p_entities, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().saveListClient(p_entities, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name ClientDaoProxy#updateClient
	 * @function
	 *
	 * @description
	 * Updates a Client.
	 *
	 * @param {Client} p_entity Client to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
	 *
	 * @returns {Promise} Returns a promise equal to true if the Client was updated, false otherwise.
	 */
	ClientDaoProxy.prototype.updateClient = function(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

		return this.getDaoImpl().updateClient(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
	};


	/**
	 * @ngdoc method
	 * @name ClientDaoProxy#updateListClient
	 * @function
	 *
	 * @description
	 * Updates a list of Clients.
	 *
	 * @param {Array<Client>} p_entities Array containing Clients to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of Clients was updated, false otherwise.
	 */
	ClientDaoProxy.prototype.updateListClient = function(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

		return this.getDaoImpl().updateListClient(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
	};


	/**
	 * @ngdoc method
	 * @name ClientDaoProxy#saveOrUpdateClient
	 * @function
	 *
	 * @description
	 * Saves of updates a Client.
	 *
	 * @param {Client} p_entity Client to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
	 *
	 * @returns {Promise} Returns a promise equal to true if the Client was saved or updated, false otherwise.
	 */
	ClientDaoProxy.prototype.saveOrUpdateClient = function(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

		return this.getDaoImpl().saveOrUpdateClient(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
	};


	/**
	 * @ngdoc method
	 * @name ClientDaoProxy#saveOrUpdateListClient
	 * @function
	 *
	 * @description
	 * Saves of updates a list of Clients.
	 *
	 * @param {Array<Client>} p_entities Array containing Clients to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of Clients was saved or updated, false otherwise.
	 */
	ClientDaoProxy.prototype.saveOrUpdateListClient = function(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

		return this.getDaoImpl().saveOrUpdateListClient(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
	};



	//==================================================================================
	//========   SPECIFIC METHODS - DELETE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name ClientDaoProxy#deleteClient
	 * @function
	 *
	 * @description
	 * Delete a Client.
	 *
	 * @param {Client} p_entity Client to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Promise} Returns a promise equal to true if the Client was deleted, false otherwise.
	 */
	ClientDaoProxy.prototype.deleteClient = function(p_entity, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().deleteClient(p_entity, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name ClientDaoProxy#deleteClientById
	 * @function
	 *
	 * @description
	 * Deletes a Client by id.
	 *
	 * @param {Integer} p_id Integer id of the Client to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Promise} Returns a promise equal to true if the Client was deleted, false otherwise.
	 */
	ClientDaoProxy.prototype.deleteClientById = function(p_id, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().deleteClientById(p_id, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name ClientDaoProxy#deleteListClient
	 * @function
	 *
	 * @description
	 * Deletes a list of Clients.
	 *
	 * @param {Array<Client>} p_entities Array containing Clients to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of Clients was deleted, false otherwise.
	 */
	ClientDaoProxy.prototype.deleteListClient = function(p_entities, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().deleteListClient(p_entities, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name ClientDaoProxy#deleteListClientByIds
	 * @function
	 *
	 * @description
	 * Deletes a list of Clients by ids.
	 *
	 * @param {Array<Integer>} p_ids Array containing ids of Clients to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of Clients was deleted, false otherwise.
	 */
	ClientDaoProxy.prototype.deleteListClientByIds = function(p_ids, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().deleteListClientByIds(p_ids, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name ClientDaoProxy#deleteClientByNomAndPrenom
	 * @function
	 *
	 * @description
	 *
	 * @param {Array<Integer>} p_nom
	 * @param {Array<Integer>} p_prenom
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Promise} Returns a promise equal to true if the Client was deleted, false otherwise.
	 */
	ClientDaoProxy.prototype.deleteClientByNomAndPrenom = function(p_properties, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().deleteClientByNomAndPrenom(p_properties, p_context, p_cascadeSet, p_toSync);
	};



//@non-generated-start[other-methods][X]
//@non-generated-end


	return new ClientDaoProxy();
}]);
