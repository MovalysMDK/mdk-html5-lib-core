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

angular.module('data-daotest-sql').factory('AgenceDaoProxy',
	[
'MFUtils', 'MFDaoProxyAbstract',
//@non-generated-start[dependencies-names][X]
//@non-generated-end

//@non-generated-start[dependencies-classes][X]
function(MFUtils, MFDaoProxyAbstract
//@non-generated-end
)
{

	var AgenceDaoProxy = function AgenceDaoProxy(){
		// Constructor
		AgenceDaoProxy._Parent.call(this);

//@non-generated-start[constructor][X]
//@non-generated-end
	};

	MFUtils.extendFromInstance(AgenceDaoProxy, MFDaoProxyAbstract);



	//==================================================================================
	//========   ABSTRACT METHODS
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name AgenceDaoProxy#getNbEntities
	 * @function
	 *
	 * @description
	 * Returns the number of entities.
	 *
	 * @param {MFContext} p_context MFContext object
	 *
	 * @returns {Integer} Returns an Integer equal to the number of entities.
	 */
	AgenceDaoProxy.prototype.getNbEntities = function(p_context) {

		return this.getDaoImpl().getNbEntities(p_context);
	};



	//==================================================================================
	//========   SPECIFIC METHODS - GET
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name AgenceDaoProxy#getAgenceById
	 * @function
	 *
	 * @description
	 * Returns a Agence by id.
	 *
	 * @param {Integer} p_id Integer id of the Agence to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Agence} Returns the Agence, including children if required
	 */
	AgenceDaoProxy.prototype.getAgenceById = function(p_id, p_context, p_cascadeSet) {

		return this.getDaoImpl().getAgenceById(p_id, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDaoProxy#getListAgence
	 * @function
	 *
	 * @description
	 * Returns a list of Agences according to the parameter(s).
	 *
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Agences, including children if required.
	 */
	AgenceDaoProxy.prototype.getListAgence = function(p_context, p_cascadeSet) {

		return this.getDaoImpl().getListAgence(p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDaoProxy#getListAgenceByIds
	 * @function
	 *
	 * @description
	 * Returns a list of Agences by ids.
	 *
	 * @param {Array<Integer>} p_ids Array containing ids of Agences to process (optional)
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Agences, including children if required.
	 */
	AgenceDaoProxy.prototype.getListAgenceByIds = function(p_ids, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListAgenceByIds(p_ids, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDaoProxy#getListAgenceByActivite4
	 * @function
	 *
	 * @description
	 * Returns a list of Agences according to the parameter(s).
	 *
	 * @param {Array<Integer>} p_foreignKeys_activite4
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Agences, including children if required.
	 */
	AgenceDaoProxy.prototype.getListAgenceByActivite4 = function(p_foreignKeys_activite4, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListAgenceByActivite4(p_foreignKeys_activite4, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDaoProxy#getListAgenceByActivite4id
	 * @function
	 *
	 * @description
	 * Returns a list of Agences according to the parameter(s).
	 *
	 * @param {Array<Integer>} p_foreignKeys_activite4id
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Agences, including children if required.
	 */
	AgenceDaoProxy.prototype.getListAgenceByActivite4id = function(p_foreignKeys_activite4id, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListAgenceByActivite4id(p_foreignKeys_activite4id, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDaoProxy#getAgenceByDetail
	 * @function
	 *
	 * @description
	 * Returns the list of all Agences.
	 *
	 * @param {Array<Integer>} p_foreignKeys_detail
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Agence} Returns the Agence, including children if required
	 */
	AgenceDaoProxy.prototype.getAgenceByDetail = function(p_foreignKeys_detail, p_context, p_cascadeSet) {

		return this.getDaoImpl().getAgenceByDetail(p_foreignKeys_detail, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDaoProxy#getAgenceByDetailid
	 * @function
	 *
	 * @description
	 * Returns the list of all Agences.
	 *
	 * @param {Array<Integer>} p_foreignKeys_detailid
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Agence} Returns the Agence, including children if required
	 */
	AgenceDaoProxy.prototype.getAgenceByDetailid = function(p_foreignKeys_detailid, p_context, p_cascadeSet) {

		return this.getDaoImpl().getAgenceByDetailid(p_foreignKeys_detailid, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDaoProxy#getListAgenceByActivite3
	 * @function
	 *
	 * @description
	 * Returns a list of Agences according to the parameter(s).
	 *
	 * @param {Array<Integer>} p_foreignKeys_activite3
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Agences, including children if required.
	 */
	AgenceDaoProxy.prototype.getListAgenceByActivite3 = function(p_foreignKeys_activite3, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListAgenceByActivite3(p_foreignKeys_activite3, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDaoProxy#getListAgenceByActivite3id
	 * @function
	 *
	 * @description
	 * Returns a list of Agences according to the parameter(s).
	 *
	 * @param {Array<Integer>} p_foreignKeys_activite3id
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Agences, including children if required.
	 */
	AgenceDaoProxy.prototype.getListAgenceByActivite3id = function(p_foreignKeys_activite3id, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListAgenceByActivite3id(p_foreignKeys_activite3id, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDaoProxy#getListAgenceByActivite2
	 * @function
	 *
	 * @description
	 * Returns a list of Agences according to the parameter(s).
	 *
	 * @param {Array<Integer>} p_foreignKeys_activite2
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Agences, including children if required.
	 */
	AgenceDaoProxy.prototype.getListAgenceByActivite2 = function(p_foreignKeys_activite2, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListAgenceByActivite2(p_foreignKeys_activite2, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDaoProxy#getListAgenceByActivite2id
	 * @function
	 *
	 * @description
	 * Returns a list of Agences according to the parameter(s).
	 *
	 * @param {Array<Integer>} p_foreignKeys_activite2id
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Agences, including children if required.
	 */
	AgenceDaoProxy.prototype.getListAgenceByActivite2id = function(p_foreignKeys_activite2id, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListAgenceByActivite2id(p_foreignKeys_activite2id, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDaoProxy#getListAgenceByActivite1
	 * @function
	 *
	 * @description
	 * Returns a list of Agences according to the parameter(s).
	 *
	 * @param {Array<Integer>} p_foreignKeys_activite1
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Agences, including children if required.
	 */
	AgenceDaoProxy.prototype.getListAgenceByActivite1 = function(p_foreignKeys_activite1, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListAgenceByActivite1(p_foreignKeys_activite1, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDaoProxy#getListAgenceByActivite1id
	 * @function
	 *
	 * @description
	 * Returns a list of Agences according to the parameter(s).
	 *
	 * @param {Array<Integer>} p_foreignKeys_activite1id
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Agences, including children if required.
	 */
	AgenceDaoProxy.prototype.getListAgenceByActivite1id = function(p_foreignKeys_activite1id, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListAgenceByActivite1id(p_foreignKeys_activite1id, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDaoProxy#getAgenceByMainClient
	 * @function
	 *
	 * @description
	 * Returns the list of all Agences.
	 *
	 * @param {Array<Integer>} p_foreignKeys_mainClient
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Agence} Returns the Agence, including children if required
	 */
	AgenceDaoProxy.prototype.getAgenceByMainClient = function(p_foreignKeys_mainClient, p_context, p_cascadeSet) {

		return this.getDaoImpl().getAgenceByMainClient(p_foreignKeys_mainClient, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDaoProxy#getAgenceByMainClientid
	 * @function
	 *
	 * @description
	 * Returns the list of all Agences.
	 *
	 * @param {Array<Integer>} p_foreignKeys_mainClientid
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Agence} Returns the Agence, including children if required
	 */
	AgenceDaoProxy.prototype.getAgenceByMainClientid = function(p_foreignKeys_mainClientid, p_context, p_cascadeSet) {

		return this.getDaoImpl().getAgenceByMainClientid(p_foreignKeys_mainClientid, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDaoProxy#getListAgenceByActivite4ids
	 * @function
	 *
	 * @description
	 * Returns a list of Agences according to the parameter(s).
	 *
	 * @param {Array<Integer>} p_foreignKeys_activite4ids
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Agences, including children if required.
	 */
	AgenceDaoProxy.prototype.getListAgenceByActivite4ids = function(p_foreignKeys_activite4ids, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListAgenceByActivite4ids(p_foreignKeys_activite4ids, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDaoProxy#getListAgenceByActivite4ids
	 * @function
	 *
	 * @description
	 * Returns a list of Agences according to the parameter(s).
	 *
	 * @param {Array<Integer>} p_foreignKeys_activite4ids
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Agences, including children if required.
	 */
	AgenceDaoProxy.prototype.getListAgenceByActivite4ids = function(p_foreignKeys_activite4ids, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListAgenceByActivite4ids(p_foreignKeys_activite4ids, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDaoProxy#getListAgenceByActivite4ids
	 * @function
	 *
	 * @description
	 * Returns a list of Agences according to the parameter(s).
	 *
	 * @param {Array<Integer>} p_foreignKeys_activite4ids
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Agences, including children if required.
	 */
	AgenceDaoProxy.prototype.getListAgenceByActivite4ids = function(p_foreignKeys_activite4ids, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListAgenceByActivite4ids(p_foreignKeys_activite4ids, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDaoProxy#getListAgenceByActivite4ids
	 * @function
	 *
	 * @description
	 * Returns a list of Agences according to the parameter(s).
	 *
	 * @param {Array<Integer>} p_foreignKeys_activite4ids
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Agences, including children if required.
	 */
	AgenceDaoProxy.prototype.getListAgenceByActivite4ids = function(p_foreignKeys_activite4ids, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListAgenceByActivite4ids(p_foreignKeys_activite4ids, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDaoProxy#getListAgenceByActivite3ids
	 * @function
	 *
	 * @description
	 * Returns a list of Agences according to the parameter(s).
	 *
	 * @param {Array<Integer>} p_foreignKeys_activite3ids
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Agences, including children if required.
	 */
	AgenceDaoProxy.prototype.getListAgenceByActivite3ids = function(p_foreignKeys_activite3ids, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListAgenceByActivite3ids(p_foreignKeys_activite3ids, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDaoProxy#getListAgenceByActivite3ids
	 * @function
	 *
	 * @description
	 * Returns a list of Agences according to the parameter(s).
	 *
	 * @param {Array<Integer>} p_foreignKeys_activite3ids
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Agences, including children if required.
	 */
	AgenceDaoProxy.prototype.getListAgenceByActivite3ids = function(p_foreignKeys_activite3ids, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListAgenceByActivite3ids(p_foreignKeys_activite3ids, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDaoProxy#getListAgenceByActivite3ids
	 * @function
	 *
	 * @description
	 * Returns a list of Agences according to the parameter(s).
	 *
	 * @param {Array<Integer>} p_foreignKeys_activite3ids
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Agences, including children if required.
	 */
	AgenceDaoProxy.prototype.getListAgenceByActivite3ids = function(p_foreignKeys_activite3ids, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListAgenceByActivite3ids(p_foreignKeys_activite3ids, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDaoProxy#getListAgenceByActivite3ids
	 * @function
	 *
	 * @description
	 * Returns a list of Agences according to the parameter(s).
	 *
	 * @param {Array<Integer>} p_foreignKeys_activite3ids
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Agences, including children if required.
	 */
	AgenceDaoProxy.prototype.getListAgenceByActivite3ids = function(p_foreignKeys_activite3ids, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListAgenceByActivite3ids(p_foreignKeys_activite3ids, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDaoProxy#getListAgenceByActivite2ids
	 * @function
	 *
	 * @description
	 * Returns a list of Agences according to the parameter(s).
	 *
	 * @param {Array<Integer>} p_foreignKeys_activite2ids
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Agences, including children if required.
	 */
	AgenceDaoProxy.prototype.getListAgenceByActivite2ids = function(p_foreignKeys_activite2ids, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListAgenceByActivite2ids(p_foreignKeys_activite2ids, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDaoProxy#getListAgenceByActivite2ids
	 * @function
	 *
	 * @description
	 * Returns a list of Agences according to the parameter(s).
	 *
	 * @param {Array<Integer>} p_foreignKeys_activite2ids
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Agences, including children if required.
	 */
	AgenceDaoProxy.prototype.getListAgenceByActivite2ids = function(p_foreignKeys_activite2ids, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListAgenceByActivite2ids(p_foreignKeys_activite2ids, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDaoProxy#getListAgenceByActivite2ids
	 * @function
	 *
	 * @description
	 * Returns a list of Agences according to the parameter(s).
	 *
	 * @param {Array<Integer>} p_foreignKeys_activite2ids
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Agences, including children if required.
	 */
	AgenceDaoProxy.prototype.getListAgenceByActivite2ids = function(p_foreignKeys_activite2ids, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListAgenceByActivite2ids(p_foreignKeys_activite2ids, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDaoProxy#getListAgenceByActivite2ids
	 * @function
	 *
	 * @description
	 * Returns a list of Agences according to the parameter(s).
	 *
	 * @param {Array<Integer>} p_foreignKeys_activite2ids
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Agences, including children if required.
	 */
	AgenceDaoProxy.prototype.getListAgenceByActivite2ids = function(p_foreignKeys_activite2ids, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListAgenceByActivite2ids(p_foreignKeys_activite2ids, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDaoProxy#getListAgenceByActivite1ids
	 * @function
	 *
	 * @description
	 * Returns a list of Agences according to the parameter(s).
	 *
	 * @param {Array<Integer>} p_foreignKeys_activite1ids
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Agences, including children if required.
	 */
	AgenceDaoProxy.prototype.getListAgenceByActivite1ids = function(p_foreignKeys_activite1ids, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListAgenceByActivite1ids(p_foreignKeys_activite1ids, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDaoProxy#getListAgenceByActivite1ids
	 * @function
	 *
	 * @description
	 * Returns a list of Agences according to the parameter(s).
	 *
	 * @param {Array<Integer>} p_foreignKeys_activite1ids
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Agences, including children if required.
	 */
	AgenceDaoProxy.prototype.getListAgenceByActivite1ids = function(p_foreignKeys_activite1ids, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListAgenceByActivite1ids(p_foreignKeys_activite1ids, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDaoProxy#getListAgenceByActivite1ids
	 * @function
	 *
	 * @description
	 * Returns a list of Agences according to the parameter(s).
	 *
	 * @param {Array<Integer>} p_foreignKeys_activite1ids
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Agences, including children if required.
	 */
	AgenceDaoProxy.prototype.getListAgenceByActivite1ids = function(p_foreignKeys_activite1ids, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListAgenceByActivite1ids(p_foreignKeys_activite1ids, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDaoProxy#getListAgenceByActivite1ids
	 * @function
	 *
	 * @description
	 * Returns a list of Agences according to the parameter(s).
	 *
	 * @param {Array<Integer>} p_foreignKeys_activite1ids
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Agences, including children if required.
	 */
	AgenceDaoProxy.prototype.getListAgenceByActivite1ids = function(p_foreignKeys_activite1ids, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListAgenceByActivite1ids(p_foreignKeys_activite1ids, p_context, p_cascadeSet);
	};



	//==================================================================================
	//========   SPECIFIC METHODS - SAVE & UPDATE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name AgenceDaoProxy#saveAgence
	 * @function
	 *
	 * @description
	 * Saves a Agence.
	 *
	 * @param {Agence} p_entity Agence to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Promise} Returns a promise equal to true if the Agence was saved, false otherwise.
	 */
	AgenceDaoProxy.prototype.saveAgence = function(p_entity, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().saveAgence(p_entity, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDaoProxy#saveListAgence
	 * @function
	 *
	 * @description
	 * Saves a list of Agences.
	 *
	 * @param {Array<Agence>} p_entities Array containing Agences to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of Agences was saved, false otherwise.
	 */
	AgenceDaoProxy.prototype.saveListAgence = function(p_entities, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().saveListAgence(p_entities, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDaoProxy#updateAgence
	 * @function
	 *
	 * @description
	 * Updates a Agence.
	 *
	 * @param {Agence} p_entity Agence to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
	 *
	 * @returns {Promise} Returns a promise equal to true if the Agence was updated, false otherwise.
	 */
	AgenceDaoProxy.prototype.updateAgence = function(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

		return this.getDaoImpl().updateAgence(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDaoProxy#updateListAgence
	 * @function
	 *
	 * @description
	 * Updates a list of Agences.
	 *
	 * @param {Array<Agence>} p_entities Array containing Agences to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of Agences was updated, false otherwise.
	 */
	AgenceDaoProxy.prototype.updateListAgence = function(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

		return this.getDaoImpl().updateListAgence(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDaoProxy#saveOrUpdateAgence
	 * @function
	 *
	 * @description
	 * Saves of updates a Agence.
	 *
	 * @param {Agence} p_entity Agence to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
	 *
	 * @returns {Promise} Returns a promise equal to true if the Agence was saved or updated, false otherwise.
	 */
	AgenceDaoProxy.prototype.saveOrUpdateAgence = function(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

		return this.getDaoImpl().saveOrUpdateAgence(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDaoProxy#saveOrUpdateListAgence
	 * @function
	 *
	 * @description
	 * Saves of updates a list of Agences.
	 *
	 * @param {Array<Agence>} p_entities Array containing Agences to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of Agences was saved or updated, false otherwise.
	 */
	AgenceDaoProxy.prototype.saveOrUpdateListAgence = function(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

		return this.getDaoImpl().saveOrUpdateListAgence(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
	};



	//==================================================================================
	//========   SPECIFIC METHODS - DELETE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name AgenceDaoProxy#deleteAgence
	 * @function
	 *
	 * @description
	 * Delete a Agence.
	 *
	 * @param {Agence} p_entity Agence to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Promise} Returns a promise equal to true if the Agence was deleted, false otherwise.
	 */
	AgenceDaoProxy.prototype.deleteAgence = function(p_entity, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().deleteAgence(p_entity, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDaoProxy#deleteAgenceById
	 * @function
	 *
	 * @description
	 * Deletes a Agence by id.
	 *
	 * @param {Integer} p_id Integer id of the Agence to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Promise} Returns a promise equal to true if the Agence was deleted, false otherwise.
	 */
	AgenceDaoProxy.prototype.deleteAgenceById = function(p_id, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().deleteAgenceById(p_id, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDaoProxy#deleteListAgence
	 * @function
	 *
	 * @description
	 * Deletes a list of Agences.
	 *
	 * @param {Array<Agence>} p_entities Array containing Agences to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of Agences was deleted, false otherwise.
	 */
	AgenceDaoProxy.prototype.deleteListAgence = function(p_entities, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().deleteListAgence(p_entities, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDaoProxy#deleteListAgenceByIds
	 * @function
	 *
	 * @description
	 * Deletes a list of Agences by ids.
	 *
	 * @param {Array<Integer>} p_ids Array containing ids of Agences to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of Agences was deleted, false otherwise.
	 */
	AgenceDaoProxy.prototype.deleteListAgenceByIds = function(p_ids, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().deleteListAgenceByIds(p_ids, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDaoProxy#deleteAgenceByDetail
	 * @function
	 *
	 * @description
	 *
	 * @param {Array<Integer>} p_foreignKeys_detail
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Promise} Returns a promise equal to true if the Agence was deleted, false otherwise.
	 */
	AgenceDaoProxy.prototype.deleteAgenceByDetail = function(p_foreignKeys_detail, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().deleteAgenceByDetail(p_foreignKeys_detail, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name AgenceDaoProxy#deleteAgenceByDetailid
	 * @function
	 *
	 * @description
	 *
	 * @param {Array<Integer>} p_foreignKeys_detailid
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Promise} Returns a promise equal to true if the Agence was deleted, false otherwise.
	 */
	AgenceDaoProxy.prototype.deleteAgenceByDetailid = function(p_foreignKeys_detailid, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().deleteAgenceByDetailid(p_foreignKeys_detailid, p_context, p_cascadeSet, p_toSync);
	};



//@non-generated-start[other-methods][X]
//@non-generated-end


	return new AgenceDaoProxy();
}]);
