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

angular.module('data-daotest-sql').factory('ClientDaoSql',
	['AgenceDaoProxy', 'ClientDaoMapping', 'MFSyncPromiseProvider', 'MFDaoSqlAbstract', 'MFUtils', 'MFMappingHelper',
//@non-generated-start[dependencies-names][X]
//@non-generated-end

//@non-generated-start[dependencies-classes][X]
function(AgenceDaoProxy, ClientDaoMapping, $qSync, MFDaoSqlAbstract, MFUtils, MFMappingHelper
//@non-generated-end
)
{

	var ClientDaoSql = function ClientDaoSql(){
		// Constructor
//@non-generated-start[constructor][X]
		ClientDaoSql._Parent.call(this);
		this.lastId = null;
		this.mapping = ClientDaoMapping.mappingSql;
		this.syncDisabled = false;
		this.tableName = 'T_CLIENT';
		this.entityName = 'Client';
		this.cascadeDefinition = [
			{
				readAction: 'get', parentAttrPointingChild: 'agence',
				childDao: AgenceDaoProxy, childAttrPointingParent: 'clients'
			},
			{
				readAction: 'get', parentAttrPointingChild: 'agency',
				childDao: AgenceDaoProxy, childAttrPointingParent: 'mainClient'
			}
		];

//@non-generated-end
	};

	MFUtils.extendFromInstance(ClientDaoSql, MFDaoSqlAbstract);



	//==================================================================================
	//========   SPECIFIC METHODS - GET
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name ClientDaoSql#getClientById
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
	ClientDaoSql.prototype.getClientById = function(p_id, p_context, p_cascadeSet) {

//@non-generated-start[getClientById-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ClientDaoSql.getClientById() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ClientDaoSql.getClientById() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_id), 'ClientDaoSql.getClientById() : p_id is required');

		var deferred = $qSync.defer();
		var self = this;

		self.getEntitiesByProperty('id', p_id, p_context).then(

function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
function (returnedSuccess_cascade) {
deferred.resolve(returnedSuccess_executeQueryToRead[0]);
},
function (returnedError_cascade) {
console.error('ClientDaoSql.getClientById(): cascade error: ', returnedError_cascade);
p_context.addError('ClientDaoSql.getClientById(): cascade error: '+ returnedError_cascade);
deferred.reject(returnedError_cascade);
}
);
},
function (returnedError_executeQueryToRead) { /* ERROR */
console.error('ClientDaoSql.getClientById(): error: ', returnedError_executeQueryToRead);
p_context.addError('ClientDaoSql.getClientById(): error: '+ returnedError_executeQueryToRead);
deferred.reject(returnedError_executeQueryToRead);
}
);

//@non-generated-start[getClientById-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name ClientDaoSql#getListClient
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
	ClientDaoSql.prototype.getListClient = function(p_context, p_cascadeSet) {

//@non-generated-start[getListClient-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ClientDaoSql.getListClient() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ClientDaoSql.getListClient() : p_cascadeSet is required and should be an array');

		var deferred = $qSync.defer();
		var self = this;

		self.getEntitiesByProperty('*', [], p_context).then(

function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
function (returnedSuccess_cascade) {
deferred.resolve(returnedSuccess_executeQueryToRead);
},
function (returnedError_cascade) {
console.error('ClientDaoSql.getListClient(): cascade error: ', returnedError_cascade);
p_context.addError('ClientDaoSql.getListClient(): cascade error: '+ returnedError_cascade);
deferred.reject(returnedError_cascade);
}
);
},
function (returnedError_executeQueryToRead) { /* ERROR */
console.error('ClientDaoSql.getListClient(): error: ', returnedError_executeQueryToRead);
p_context.addError('ClientDaoSql.getListClient(): error: '+ returnedError_executeQueryToRead);
deferred.reject(returnedError_executeQueryToRead);
}
);

//@non-generated-start[getListClient-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name ClientDaoSql#getListClientByIds
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
	ClientDaoSql.prototype.getListClientByIds = function(p_ids, p_context, p_cascadeSet) {

//@non-generated-start[getListClientByIds-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ClientDaoSql.getListClientByIds() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ClientDaoSql.getListClientByIds() : p_cascadeSet is required and should be an array');
		console.assert(angular.isUndefinedOrNull(p_ids) || angular.isArray(p_ids), 'ClientDaoSql.getListClientByIds() : p_ids should be an array, if given');

		var deferred = $qSync.defer();
		var self = this;

		self.getEntitiesByProperty('id', p_ids, p_context).then(

function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
function (returnedSuccess_cascade) {
deferred.resolve(returnedSuccess_executeQueryToRead);
},
function (returnedError_cascade) {
console.error('ClientDaoSql.getListClientByIds(): cascade error: ', returnedError_cascade);
p_context.addError('ClientDaoSql.getListClientByIds(): cascade error: '+ returnedError_cascade);
deferred.reject(returnedError_cascade);
}
);
},
function (returnedError_executeQueryToRead) { /* ERROR */
console.error('ClientDaoSql.getListClientByIds(): error: ', returnedError_executeQueryToRead);
p_context.addError('ClientDaoSql.getListClientByIds(): error: '+ returnedError_executeQueryToRead);
deferred.reject(returnedError_executeQueryToRead);
}
);

//@non-generated-start[getListClientByIds-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name ClientDaoSql#getListClientByNomAndPrenom
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
	ClientDaoSql.prototype.getListClientByNomAndPrenom = function(p_properties, p_context, p_cascadeSet) {

//@non-generated-start[getListClientByNomAndPrenom-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ClientDaoSql.getListClientByNomAndPrenom() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ClientDaoSql.getListClientByNomAndPrenom() : p_cascadeSet is required and should be an array');
console.assert(!angular.isUndefinedOrNullOrEmpty(p_properties), '.getListClientByNomAndPrenom() : p_properties is required');

		var deferred = $qSync.defer();
		var self = this;

		self.getEntitiesByProperties(p_properties, p_context).then(

function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
function (returnedSuccess_cascade) {
deferred.resolve(returnedSuccess_executeQueryToRead);
},
function (returnedError_cascade) {
console.error('ClientDaoSql.getListClientByNomAndPrenom(): cascade error: ', returnedError_cascade);
p_context.addError('ClientDaoSql.getListClientByNomAndPrenom(): cascade error: '+ returnedError_cascade);
deferred.reject(returnedError_cascade);
}
);
},
function (returnedError_executeQueryToRead) { /* ERROR */
console.error('ClientDaoSql.getListClientByNomAndPrenom(): error: ', returnedError_executeQueryToRead);
p_context.addError('ClientDaoSql.getListClientByNomAndPrenom(): error: '+ returnedError_executeQueryToRead);
deferred.reject(returnedError_executeQueryToRead);
}
);

//@non-generated-start[getListClientByNomAndPrenom-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name ClientDaoSql#getNbEntitiesByNomAndPrenom
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
	ClientDaoSql.prototype.getNbEntitiesByNomAndPrenom = function(p_properties, p_context, p_cascadeSet) {

//@non-generated-start[getNbEntitiesByNomAndPrenom-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ClientDaoSql.getNbEntitiesByNomAndPrenom() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ClientDaoSql.getNbEntitiesByNomAndPrenom() : p_cascadeSet is required and should be an array');
console.assert(!angular.isUndefinedOrNullOrEmpty(p_properties), '.getNbEntitiesByNomAndPrenom() : p_properties is required');

		var deferred = $qSync.defer();
		var self = this;

		self.getEntitiesByProperties(p_properties, p_context).then(

function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
deferred.resolve(returnedSuccess_executeQueryToRead.length);
},
function (returnedError_executeQueryToRead) { /* ERROR */
console.error('ClientDaoSql.getNbEntitiesByNomAndPrenom(): error: ', returnedError_executeQueryToRead);
p_context.addError('ClientDaoSql.getNbEntitiesByNomAndPrenom(): error: '+ returnedError_executeQueryToRead);
deferred.reject(returnedError_executeQueryToRead);
}
);

//@non-generated-start[getNbEntitiesByNomAndPrenom-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name ClientDaoSql#getListClientByAgence
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
	ClientDaoSql.prototype.getListClientByAgence = function(p_foreignKeys_agence, p_context, p_cascadeSet) {

//@non-generated-start[getListClientByAgence-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ClientDaoSql.getListClientByAgence() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ClientDaoSql.getListClientByAgence() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_foreignKeys_agence), 'ClientDaoSql.getListClientByAgence() : p_foreignKeys_agence is required');

		var deferred = $qSync.defer();
		var self = this;

		var o_sqlQuery = 'select * from T_CLIENT where AGENCEID12 in ('+ self.produceQueryInPart(p_foreignKeys_agence.idToString) +');';
		var o_sqlParameters = [].concat(p_foreignKeys_agence.idToString);

		self.executeQueryToRead(
			'ClientDaoSql.getListClientByAgence()', p_context, o_sqlQuery, o_sqlParameters).then(

function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
function (returnedSuccess_cascade) {
deferred.resolve(returnedSuccess_executeQueryToRead);
},
function (returnedError_cascade) {
console.error('ClientDaoSql.getListClientByAgence(): cascade error: ', returnedError_cascade);
p_context.addError('ClientDaoSql.getListClientByAgence(): cascade error: '+ returnedError_cascade);
deferred.reject(returnedError_cascade);
}
);
},
function (returnedError_executeQueryToRead) { /* ERROR */
console.error('ClientDaoSql.getListClientByAgence(): error: ', returnedError_executeQueryToRead);
p_context.addError('ClientDaoSql.getListClientByAgence(): error: '+ returnedError_executeQueryToRead);
deferred.reject(returnedError_executeQueryToRead);
}
);

//@non-generated-start[getListClientByAgence-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name ClientDaoSql#getListClientByAgenceid
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
	ClientDaoSql.prototype.getListClientByAgenceid = function(p_foreignKeys_agenceid, p_context, p_cascadeSet) {

//@non-generated-start[getListClientByAgenceid-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ClientDaoSql.getListClientByAgenceid() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ClientDaoSql.getListClientByAgenceid() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_foreignKeys_agenceid), 'ClientDaoSql.getListClientByAgenceid() : p_foreignKeys_agenceid is required');

		var deferred = $qSync.defer();
		var self = this;

		var o_sqlQuery = 'select * from T_CLIENT where AGENCEID12 in ('+ self.produceQueryInPart(p_foreignKeys_agenceid) +');';
		var o_sqlParameters = [].concat(p_foreignKeys_agenceid);

		self.executeQueryToRead(
			'ClientDaoSql.getListClientByAgenceid()', p_context, o_sqlQuery, o_sqlParameters).then(

function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
function (returnedSuccess_cascade) {
deferred.resolve(returnedSuccess_executeQueryToRead);
},
function (returnedError_cascade) {
console.error('ClientDaoSql.getListClientByAgenceid(): cascade error: ', returnedError_cascade);
p_context.addError('ClientDaoSql.getListClientByAgenceid(): cascade error: '+ returnedError_cascade);
deferred.reject(returnedError_cascade);
}
);
},
function (returnedError_executeQueryToRead) { /* ERROR */
console.error('ClientDaoSql.getListClientByAgenceid(): error: ', returnedError_executeQueryToRead);
p_context.addError('ClientDaoSql.getListClientByAgenceid(): error: '+ returnedError_executeQueryToRead);
deferred.reject(returnedError_executeQueryToRead);
}
);

//@non-generated-start[getListClientByAgenceid-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name ClientDaoSql#getClientByAgency
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
	ClientDaoSql.prototype.getClientByAgency = function(p_foreignKeys_agency, p_context, p_cascadeSet) {

//@non-generated-start[getClientByAgency-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ClientDaoSql.getClientByAgency() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ClientDaoSql.getClientByAgency() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_foreignKeys_agency), 'ClientDaoSql.getClientByAgency() : p_foreignKeys_agency is required');

		var deferred = $qSync.defer();
		var self = this;

		var o_sqlQuery = 'select * from T_CLIENT where AGENCYID in ('+ self.produceQueryInPart(p_foreignKeys_agency.idToString) +');';
		var o_sqlParameters = [].concat(p_foreignKeys_agency.idToString);

		self.executeQueryToRead(
			'ClientDaoSql.getClientByAgency()', p_context, o_sqlQuery, o_sqlParameters).then(

function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
function (returnedSuccess_cascade) {
deferred.resolve(returnedSuccess_executeQueryToRead[0]);
},
function (returnedError_cascade) {
console.error('ClientDaoSql.getClientByAgency(): cascade error: ', returnedError_cascade);
p_context.addError('ClientDaoSql.getClientByAgency(): cascade error: '+ returnedError_cascade);
deferred.reject(returnedError_cascade);
}
);
},
function (returnedError_executeQueryToRead) { /* ERROR */
console.error('ClientDaoSql.getClientByAgency(): error: ', returnedError_executeQueryToRead);
p_context.addError('ClientDaoSql.getClientByAgency(): error: '+ returnedError_executeQueryToRead);
deferred.reject(returnedError_executeQueryToRead);
}
);

//@non-generated-start[getClientByAgency-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name ClientDaoSql#getClientByAgencyid
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
	ClientDaoSql.prototype.getClientByAgencyid = function(p_foreignKeys_agencyid, p_context, p_cascadeSet) {

//@non-generated-start[getClientByAgencyid-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ClientDaoSql.getClientByAgencyid() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ClientDaoSql.getClientByAgencyid() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_foreignKeys_agencyid), 'ClientDaoSql.getClientByAgencyid() : p_foreignKeys_agencyid is required');

		var deferred = $qSync.defer();
		var self = this;

		var o_sqlQuery = 'select * from T_CLIENT where AGENCYID in ('+ self.produceQueryInPart(p_foreignKeys_agencyid) +');';
		var o_sqlParameters = [].concat(p_foreignKeys_agencyid);

		self.executeQueryToRead(
			'ClientDaoSql.getClientByAgencyid()', p_context, o_sqlQuery, o_sqlParameters).then(

function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
function (returnedSuccess_cascade) {
deferred.resolve(returnedSuccess_executeQueryToRead[0]);
},
function (returnedError_cascade) {
console.error('ClientDaoSql.getClientByAgencyid(): cascade error: ', returnedError_cascade);
p_context.addError('ClientDaoSql.getClientByAgencyid(): cascade error: '+ returnedError_cascade);
deferred.reject(returnedError_cascade);
}
);
},
function (returnedError_executeQueryToRead) { /* ERROR */
console.error('ClientDaoSql.getClientByAgencyid(): error: ', returnedError_executeQueryToRead);
p_context.addError('ClientDaoSql.getClientByAgencyid(): error: '+ returnedError_executeQueryToRead);
deferred.reject(returnedError_executeQueryToRead);
}
);

//@non-generated-start[getClientByAgencyid-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name ClientDaoSql#getListClientByAgenceids
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
	ClientDaoSql.prototype.getListClientByAgenceids = function(p_foreignKeys_agenceids, p_context, p_cascadeSet) {

//@non-generated-start[getListClientByAgenceids-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ClientDaoSql.getListClientByAgenceids() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ClientDaoSql.getListClientByAgenceids() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_foreignKeys_agenceids), 'ClientDaoSql.getListClientByAgenceids() : p_foreignKeys_agenceids is required');

		var deferred = $qSync.defer();
		var self = this;

		var o_sqlQuery = 'select * from T_CLIENT where AGENCEID12 in ('+ self.produceQueryInPart(p_foreignKeys_agenceids) +');';
		var o_sqlParameters = [].concat(p_foreignKeys_agenceids);

		self.executeQueryToRead(
			'ClientDaoSql.getListClientByAgenceids()', p_context, o_sqlQuery, o_sqlParameters).then(

function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
function (returnedSuccess_cascade) {
deferred.resolve(returnedSuccess_executeQueryToRead);
},
function (returnedError_cascade) {
console.error('ClientDaoSql.getListClientByAgenceids(): cascade error: ', returnedError_cascade);
p_context.addError('ClientDaoSql.getListClientByAgenceids(): cascade error: '+ returnedError_cascade);
deferred.reject(returnedError_cascade);
}
);
},
function (returnedError_executeQueryToRead) { /* ERROR */
console.error('ClientDaoSql.getListClientByAgenceids(): error: ', returnedError_executeQueryToRead);
p_context.addError('ClientDaoSql.getListClientByAgenceids(): error: '+ returnedError_executeQueryToRead);
deferred.reject(returnedError_executeQueryToRead);
}
);

//@non-generated-start[getListClientByAgenceids-after][X]
//@non-generated-end

		return deferred.promise;
	};



	//==================================================================================
	//========   SPECIFIC METHODS - SAVE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name ClientDaoSql#saveClient
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
	ClientDaoSql.prototype.saveClient = function(p_entity, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[saveClient-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ClientDaoSql.saveClient() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ClientDaoSql.saveClient() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_entity), 'ClientDaoSql.saveClient() : p_entity is required');

		var deferred = $qSync.defer();
		var self = this;

		self.fixDoubleWaysRelationship(p_entity);
		// --------------------------
		// 1. save or update children pointed by the parent : for relationships xxx_to_one
		// --------------------------
		var savePointedChildren = [];

		//		1.1  call saveOrUpdate function of the child dao
		//		1.2  check that the ID attribute of the children model entities is updated (update foreign key of the parent pointing the child just saved)
/*jshint loopfunc: true *//* jshint shadow:true */for (var i = 0 , cascadeSetLength = p_cascadeSet.length ; i < cascadeSetLength ; i += 1) {
if( p_cascadeSet[i].entityName === p_entity._type ) {
if( p_cascadeSet[i].key === 'AGENCE') {
			savePointedChildren.push( AgenceDaoProxy.saveOrUpdateAgence(p_entity.agence, p_context, p_cascadeSet, p_toSync) );
continue ;		}
if( p_cascadeSet[i].key === 'AGENCY') {
			savePointedChildren.push( AgenceDaoProxy.saveOrUpdateAgence(p_entity.agency, p_context, p_cascadeSet, p_toSync) );
continue ;		}
		}
		}

		$qSync.all(savePointedChildren).then(
			function(success) { /* SUCCESS */
				// --------------------------
				// 2. save the main entity
				// --------------------------

				self.saveEntity(p_entity, p_context, p_toSync).then(
					function (success_result) {

						var saveOtherChildren = [];

						// --------------------------
						// 3. save or update children not pointed by the parent : for relationships one_to_xxx and many_to_many
						// --------------------------
						// foreach child attr
						// 		3.1  call saveOrUpdate function of the child dao
						// 		3.2  check that the ID attribute of the children model entities is updated (update foreign key of the parent pointing the child just saved)

/*jshint loopfunc: true *//* jshint shadow:true */for (var i = 0 , cascadeSetLength = p_cascadeSet.length ; i < cascadeSetLength ; i += 1) {
if( p_cascadeSet[i].entityName === p_entity._type ) {
if( p_cascadeSet[i].key === 'AGENCY') {
							saveOtherChildren.push( AgenceDaoProxy.saveOrUpdateAgence(p_entity.agency, p_context, p_cascadeSet, p_toSync) );
}
		}
		}


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


//@non-generated-start[saveClient-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name ClientDaoSql#saveListClient
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
	ClientDaoSql.prototype.saveListClient = function(p_entities, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[saveListClient-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ClientDaoSql.saveListClient() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ClientDaoSql.saveListClient() : p_cascadeSet is required and should be an array');
		console.assert(angular.isArray(p_entities), 'ClientDaoSql.saveListClient() : p_entities is required and should be an array');

		var deferred = $qSync.defer();
		var self = this;

		/* saveListClient() => saveClient() */
		var o_arrayPromisesSaveClient = [];
		for( var i = 0; i < p_entities.length; i++ ) {
			o_arrayPromisesSaveClient.push( self.saveClient(p_entities[i], p_context, angular.copy(p_cascadeSet), p_toSync) );
		}
		// $qSync.all() returns an array of the results of o_arrayPromisesSaveClient.
		// If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
		deferred.resolve( $qSync.all(o_arrayPromisesSaveClient) );


//@non-generated-start[saveListClient-after][X]
//@non-generated-end

		return deferred.promise;
	};



	//==================================================================================
	//========   SPECIFIC METHODS - UPDATE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name ClientDaoSql#updateClient
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
	ClientDaoSql.prototype.updateClient = function(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

//@non-generated-start[updateClient-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ClientDaoSql.updateClient() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ClientDaoSql.updateClient() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_entity), 'ClientDaoSql.updateClient() : p_entity is required');

		var deferred = $qSync.defer();
		var self = this;

		var childrenPromises = [];

		self.fixDoubleWaysRelationship(p_entity);
		// for composition relationships one_to_xxx
/*jshint loopfunc: true *//* jshint shadow:true */for (var i = 0 , cascadeSetLength = p_cascadeSet.length ; i < cascadeSetLength ; i += 1) {
if( p_cascadeSet[i].entityName === p_entity._type ) {

if( p_cascadeSet[i].key === 'AGENCY') {

			// 1. delete the children that are not in p_entity if composition relationship one_to_xxx (delete from CHILD where PARENTID=xxx and CHILDID not in(xxx, xxx)
			childrenPromises.push(
				self.getChildrenIdsToRemove(p_context, p_entity, 'agency').then(
					function(idsToRemove) {
						console.log('children to remove found', idsToRemove);
						return AgenceDaoProxy.deleteListAgenceByIds(idsToRemove, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
					},
					function(error) {
						deferred.reject(error);
					}
				)
			);

			// 2. save or update the remaining children if composition relationship one_to_xxx
			childrenPromises.push( AgenceDaoProxy.saveOrUpdateAgence(p_entity.agency, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) );
		}
		}
		}


		// 2. save or update all the other children (no matter the type of relationship), if asked by p_cascadeset
/*jshint loopfunc: true *//* jshint shadow:true */for (var i = 0 , cascadeSetLength = p_cascadeSet.length ; i < cascadeSetLength ; i += 1) {
if( p_cascadeSet[i].entityName === p_entity._type ) {
if( p_cascadeSet[i].key === 'AGENCE') {
			childrenPromises.push( AgenceDaoProxy.saveOrUpdateAgence(p_entity.agence, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) );
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


//@non-generated-start[updateClient-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name ClientDaoSql#updateListClient
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
	ClientDaoSql.prototype.updateListClient = function(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

//@non-generated-start[updateListClient-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ClientDaoSql.updateListClient() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ClientDaoSql.updateListClient() : p_cascadeSet is required and should be an array');
		console.assert(angular.isArray(p_entities), 'ClientDaoSql.updateListClient() : p_entities is required and should be an array');

		var deferred = $qSync.defer();
		var self = this;

		/* updateListClient() => updateClient() */
		var o_arrayPromisesUpdateClient = [];
		for( var i = 0; i < p_entities.length; i++ ) {
			o_arrayPromisesUpdateClient.push( self.updateClient(p_entities[i], p_context, angular.copy(p_cascadeSet), p_toSync, angular.copy(p_cascadeSetForDelete)) );
		}
		// $qSync.all() returns an array of the results of o_arrayPromisesUpdateClient.
		// If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
		deferred.resolve( $qSync.all(o_arrayPromisesUpdateClient) );


//@non-generated-start[updateListClient-after][X]
//@non-generated-end

		return deferred.promise;
	};



	//==================================================================================
	//========   SPECIFIC METHODS - SAVE & UPDATE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name ClientDaoSql#saveOrUpdateClient
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
	ClientDaoSql.prototype.saveOrUpdateClient = function(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

//@non-generated-start[saveOrUpdateClient-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ClientDaoSql.saveOrUpdateClient() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ClientDaoSql.saveOrUpdateClient() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_entity), 'ClientDaoSql.saveOrUpdateClient() : p_entity is required');

		var deferred = $qSync.defer();
		var self = this;

		if(p_entity.idToString !== -1) { 
			this.exist(p_entity, p_context).then(function(result) {
				if(result){ 
					/* updateClient */
					console.log('ClientDaoSql.saveOrUpdateClient(): entity exists  => updateClient()');
					deferred.resolve( self.updateClient(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) );
				} else {
				/* saveClient */
					console.log('ClientDaoSql.saveOrUpdateClient(): entity does not exist  => saveClient()');
					deferred.resolve( self.saveClient(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) ); // last parameter ignored by called method
				}
			},
 			function(error) { 
				deferred.reject(error); 
			});
		} else { 
			/* saveClient */
			console.log('ClientDaoSql.saveOrUpdateClient(): entity does not exist  => saveClient()');
			deferred.resolve( self.saveClient(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) ); // last parameter ignored by called method
		}


//@non-generated-start[saveOrUpdateClient-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name ClientDaoSql#saveOrUpdateListClient
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
	ClientDaoSql.prototype.saveOrUpdateListClient = function(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

//@non-generated-start[saveOrUpdateListClient-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ClientDaoSql.saveOrUpdateListClient() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ClientDaoSql.saveOrUpdateListClient() : p_cascadeSet is required and should be an array');
		console.assert(angular.isArray(p_entities), 'ClientDaoSql.saveOrUpdateListClient() : p_entities is required and should be an array');

		var deferred = $qSync.defer();
		var self = this;

		/* saveOrUpdateListClient() => saveOrUpdateClient() */
		var o_arrayPromisesSaveOrUpdateClient = [];
		for(var i = 0; i < p_entities.length; i++) {
			o_arrayPromisesSaveOrUpdateClient.push( self.saveOrUpdateClient(p_entities[i], p_context, angular.copy(p_cascadeSet), p_toSync, angular.copy(p_cascadeSetForDelete)) );
		}
		// $qSync.all() returns an array of the results of o_arrayPromisesSaveOrUpdateClient.
		// If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
		deferred.resolve( $qSync.all(o_arrayPromisesSaveOrUpdateClient) );


//@non-generated-start[saveOrUpdateListClient-after][X]
//@non-generated-end

		return deferred.promise;
	};



	//==================================================================================
	//========   SPECIFIC METHODS - DELETE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name ClientDaoSql#deleteClient
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
	ClientDaoSql.prototype.deleteClient = function(p_entity, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[deleteClient-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ClientDaoSql.deleteClient() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ClientDaoSql.deleteClient() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_entity), 'ClientDaoSql.deleteClient() : p_entity is required');

		var deferred = $qSync.defer();
		var self = this;

		//0. load children that should always be deleted or updated
		self.loadChildrenIfNeeded(p_context, p_entity, p_cascadeSet).then(
			function(returnedSuccess_loadChildrenIfNeeded){
				var pointersDeletes = [];




				$qSync.all(pointersDeletes).then(
					function(returnedSuccess_pointers){ /* SUCCESS */

						// 4. delete the parent
						self.deleteEntity(p_entity, p_context, p_toSync).then(
							function (returnedSuccess_executeQueryToDelete) { /* SUCCESS */
								pointersDeletes = [];

								//5. for composition and aggregation relationships xxx_to_one
/*jshint loopfunc: true *//* jshint shadow:true */for (var i = 0 , cascadeSetLength = p_cascadeSet.length ; i < cascadeSetLength ; i += 1) {
if( p_cascadeSet[i].entityName === p_entity._type ) {
if( p_cascadeSet[i].key === 'AGENCE') {
									pointersDeletes.push( AgenceDaoProxy.deleteAgence(p_entity.agence, p_context, p_cascadeSet, p_toSync) );
continue ;								}

if( p_cascadeSet[i].key === 'AGENCY') {
									pointersDeletes.push( AgenceDaoProxy.deleteAgence(p_entity.agency, p_context, p_cascadeSet, p_toSync) );
continue ;								}
		}
		}

								$qSync.all(pointersDeletes).then(
									function(returnedSuccess_executeQuery2ToDelete) { /* SUCCESS */
										deferred.resolve(returnedSuccess_executeQuery2ToDelete);
									},
									function (returnedError_executeQuery2ToDelete) { /* ERROR */
										console.error('ClientDaoSql.deleteClient(): error: ', returnedError_executeQuery2ToDelete);
										p_context.addError('ClientDaoSql.deleteClient(): error: '+ returnedError_executeQuery2ToDelete);
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

//@non-generated-start[deleteClient-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name ClientDaoSql#deleteClientById
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
	ClientDaoSql.prototype.deleteClientById = function(p_id, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[deleteClientById-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ClientDaoSql.deleteClientById() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ClientDaoSql.deleteClientById() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_id), 'ClientDaoSql.deleteClientById() : p_id is required');

		var deferred = $qSync.defer();
		var self = this;

		self.getClientById(p_id, p_context, angular.copy(p_cascadeSet), p_toSync).then(
			function(entity){
				deferred.resolve( self.deleteClient(entity, p_context, angular.copy(p_cascadeSet), p_toSync) );
			},
			function(error){
				deferred.reject(error);
			}
		);


//@non-generated-start[deleteClientById-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name ClientDaoSql#deleteListClient
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
	ClientDaoSql.prototype.deleteListClient = function(p_entities, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[deleteListClient-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ClientDaoSql.deleteListClient() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ClientDaoSql.deleteListClient() : p_cascadeSet is required and should be an array');
		console.assert(angular.isArray(p_entities), 'ClientDaoSql.deleteListClient() : p_entities is required and should be an array');

		var deferred = $qSync.defer();
		var self = this;

		/* deleteListClient() => deleteClient() */
		var o_arrayPromisesDeleteClient = [];
		for( var i = 0; i < p_entities.length; i++ ) {
			o_arrayPromisesDeleteClient.push( self.deleteClient(p_entities[i], p_context, angular.copy(p_cascadeSet), p_toSync) );
		}
		// $qSync.all() returns an array of the results of o_arrayPromisesDeleteClient.
		// If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
		deferred.resolve( $qSync.all(o_arrayPromisesDeleteClient) );


//@non-generated-start[deleteListClient-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name ClientDaoSql#deleteListClientByIds
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
	ClientDaoSql.prototype.deleteListClientByIds = function(p_ids, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[deleteListClientByIds-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ClientDaoSql.deleteListClientByIds() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ClientDaoSql.deleteListClientByIds() : p_cascadeSet is required and should be an array');
		console.assert(angular.isUndefinedOrNull(p_ids) || angular.isArray(p_ids), 'ClientDaoSql.deleteListClientByIds() : p_ids should be an array, if given');

		var deferred = $qSync.defer();
		var self = this;

		/* deleteListClientByIds() => deleteListClientById() */
		var o_arrayPromisesDeleteClient = [];
		for( var i = 0; i < p_ids.length; i++ ) {
			o_arrayPromisesDeleteClient.push( self.deleteClientById(p_ids[i], p_context, angular.copy(p_cascadeSet), p_toSync) );
		}
		// $qSync.all() returns an array of the results of o_arrayPromisesDeleteClient.
		// If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
		deferred.resolve( $qSync.all(o_arrayPromisesDeleteClient) );


//@non-generated-start[deleteListClientByIds-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name ClientDaoSql#deleteClientByNomAndPrenom
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
	ClientDaoSql.prototype.deleteClientByNomAndPrenom = function(p_properties, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[deleteClientByNomAndPrenom-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ClientDaoSql.deleteClientByNomAndPrenom() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ClientDaoSql.deleteClientByNomAndPrenom() : p_cascadeSet is required and should be an array');
console.assert(!angular.isUndefinedOrNullOrEmpty(p_properties), '.deleteClientByNomAndPrenom() : p_properties is required');

		var deferred = $qSync.defer();
		var self = this;

self.getEntitiesByProperties(p_properties, p_context).then(
function(entities) { /* SUCCESS */
deferred.resolve(self.deleteListClient(entities,p_context,p_cascadeSet, p_toSync));
},
function(error){
deferred.reject(error);
}
);


//@non-generated-start[deleteClientByNomAndPrenom-after][X]
//@non-generated-end

		return deferred.promise;
	};



//@non-generated-start[other-methods][X]
//@non-generated-end


	return new ClientDaoSql();
}]);
