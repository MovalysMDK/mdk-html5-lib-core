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

angular.module('data-daotest-sql').factory('ReservationDaoSql',
	['EmployeeDaoProxy', 'ReservationDaoMapping', 'ResourceDaoProxy', 'MFSyncPromiseProvider', 'MFDaoSqlAbstract', 'MFUtils', 'MFMappingHelper',
//@non-generated-start[dependencies-names][X]
//@non-generated-end

//@non-generated-start[dependencies-classes][X]
function(EmployeeDaoProxy, ReservationDaoMapping, ResourceDaoProxy, $qSync, MFDaoSqlAbstract, MFUtils, MFMappingHelper
//@non-generated-end
)
{

	var ReservationDaoSql = function ReservationDaoSql(){
		// Constructor
//@non-generated-start[constructor][X]
		ReservationDaoSql._Parent.call(this);
		this.lastId = null;
		this.mapping = ReservationDaoMapping.mappingSql;
		this.syncDisabled = false;
		this.tableName = 'T_RESERVATION';
		this.entityName = 'Reservation';
		this.cascadeDefinition = [
			{
				readAction: 'get', parentAttrPointingChild: 'resource',
				childDao: ResourceDaoProxy, childAttrPointingParent: 'reservations'
			},
			{
				readAction: 'get', parentAttrPointingChild: 'employe',
				childDao: EmployeeDaoProxy, childAttrPointingParent: 'reservations'
			}
		];

//@non-generated-end
	};

	MFUtils.extendFromInstance(ReservationDaoSql, MFDaoSqlAbstract);



	//==================================================================================
	//========   SPECIFIC METHODS - GET
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name ReservationDaoSql#getReservationById
	 * @function
	 *
	 * @description
	 * Returns a Reservation by id.
	 *
	 * @param {Integer} p_id Integer id of the Reservation to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Reservation} Returns the Reservation, including children if required
	 */
	ReservationDaoSql.prototype.getReservationById = function(p_id, p_context, p_cascadeSet) {

//@non-generated-start[getReservationById-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ReservationDaoSql.getReservationById() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ReservationDaoSql.getReservationById() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_id), 'ReservationDaoSql.getReservationById() : p_id is required');

		var deferred = $qSync.defer();
		var self = this;

		self.getEntitiesByProperty('id', p_id, p_context).then(

function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
function (returnedSuccess_cascade) {
deferred.resolve(returnedSuccess_executeQueryToRead[0]);
},
function (returnedError_cascade) {
console.error('ReservationDaoSql.getReservationById(): cascade error: ', returnedError_cascade);
p_context.addError('ReservationDaoSql.getReservationById(): cascade error: '+ returnedError_cascade);
deferred.reject(returnedError_cascade);
}
);
},
function (returnedError_executeQueryToRead) { /* ERROR */
console.error('ReservationDaoSql.getReservationById(): error: ', returnedError_executeQueryToRead);
p_context.addError('ReservationDaoSql.getReservationById(): error: '+ returnedError_executeQueryToRead);
deferred.reject(returnedError_executeQueryToRead);
}
);

//@non-generated-start[getReservationById-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name ReservationDaoSql#getListReservation
	 * @function
	 *
	 * @description
	 * Returns a list of Reservations according to the parameter(s).
	 *
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Reservations, including children if required.
	 */
	ReservationDaoSql.prototype.getListReservation = function(p_context, p_cascadeSet) {

//@non-generated-start[getListReservation-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ReservationDaoSql.getListReservation() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ReservationDaoSql.getListReservation() : p_cascadeSet is required and should be an array');

		var deferred = $qSync.defer();
		var self = this;

		self.getEntitiesByProperty('*', [], p_context).then(

function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
function (returnedSuccess_cascade) {
deferred.resolve(returnedSuccess_executeQueryToRead);
},
function (returnedError_cascade) {
console.error('ReservationDaoSql.getListReservation(): cascade error: ', returnedError_cascade);
p_context.addError('ReservationDaoSql.getListReservation(): cascade error: '+ returnedError_cascade);
deferred.reject(returnedError_cascade);
}
);
},
function (returnedError_executeQueryToRead) { /* ERROR */
console.error('ReservationDaoSql.getListReservation(): error: ', returnedError_executeQueryToRead);
p_context.addError('ReservationDaoSql.getListReservation(): error: '+ returnedError_executeQueryToRead);
deferred.reject(returnedError_executeQueryToRead);
}
);

//@non-generated-start[getListReservation-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name ReservationDaoSql#getListReservationByIds
	 * @function
	 *
	 * @description
	 * Returns a list of Reservations by ids.
	 *
	 * @param {Array<Integer>} p_ids Array containing ids of Reservations to process (optional)
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Reservations, including children if required.
	 */
	ReservationDaoSql.prototype.getListReservationByIds = function(p_ids, p_context, p_cascadeSet) {

//@non-generated-start[getListReservationByIds-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ReservationDaoSql.getListReservationByIds() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ReservationDaoSql.getListReservationByIds() : p_cascadeSet is required and should be an array');
		console.assert(angular.isUndefinedOrNull(p_ids) || angular.isArray(p_ids), 'ReservationDaoSql.getListReservationByIds() : p_ids should be an array, if given');

		var deferred = $qSync.defer();
		var self = this;

		self.getEntitiesByProperty('id', p_ids, p_context).then(

function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
function (returnedSuccess_cascade) {
deferred.resolve(returnedSuccess_executeQueryToRead);
},
function (returnedError_cascade) {
console.error('ReservationDaoSql.getListReservationByIds(): cascade error: ', returnedError_cascade);
p_context.addError('ReservationDaoSql.getListReservationByIds(): cascade error: '+ returnedError_cascade);
deferred.reject(returnedError_cascade);
}
);
},
function (returnedError_executeQueryToRead) { /* ERROR */
console.error('ReservationDaoSql.getListReservationByIds(): error: ', returnedError_executeQueryToRead);
p_context.addError('ReservationDaoSql.getListReservationByIds(): error: '+ returnedError_executeQueryToRead);
deferred.reject(returnedError_executeQueryToRead);
}
);

//@non-generated-start[getListReservationByIds-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name ReservationDaoSql#getListReservationByResource
	 * @function
	 *
	 * @description
	 * Returns a list of Reservations according to the parameter(s).
	 *
	 * @param {Array<Integer>} p_foreignKeys_resource
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Reservations, including children if required.
	 */
	ReservationDaoSql.prototype.getListReservationByResource = function(p_foreignKeys_resource, p_context, p_cascadeSet) {

//@non-generated-start[getListReservationByResource-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ReservationDaoSql.getListReservationByResource() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ReservationDaoSql.getListReservationByResource() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_foreignKeys_resource), 'ReservationDaoSql.getListReservationByResource() : p_foreignKeys_resource is required');

		var deferred = $qSync.defer();
		var self = this;

		var o_sqlQuery = 'select * from T_RESERVATION where RESOURCEID in ('+ self.produceQueryInPart(p_foreignKeys_resource.idToString) +');';
		var o_sqlParameters = [].concat(p_foreignKeys_resource.idToString);

		self.executeQueryToRead(
			'ReservationDaoSql.getListReservationByResource()', p_context, o_sqlQuery, o_sqlParameters).then(

function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
function (returnedSuccess_cascade) {
deferred.resolve(returnedSuccess_executeQueryToRead);
},
function (returnedError_cascade) {
console.error('ReservationDaoSql.getListReservationByResource(): cascade error: ', returnedError_cascade);
p_context.addError('ReservationDaoSql.getListReservationByResource(): cascade error: '+ returnedError_cascade);
deferred.reject(returnedError_cascade);
}
);
},
function (returnedError_executeQueryToRead) { /* ERROR */
console.error('ReservationDaoSql.getListReservationByResource(): error: ', returnedError_executeQueryToRead);
p_context.addError('ReservationDaoSql.getListReservationByResource(): error: '+ returnedError_executeQueryToRead);
deferred.reject(returnedError_executeQueryToRead);
}
);

//@non-generated-start[getListReservationByResource-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name ReservationDaoSql#getListReservationByResourceid
	 * @function
	 *
	 * @description
	 * Returns a list of Reservations according to the parameter(s).
	 *
	 * @param {Array<Integer>} p_foreignKeys_resourceid
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Reservations, including children if required.
	 */
	ReservationDaoSql.prototype.getListReservationByResourceid = function(p_foreignKeys_resourceid, p_context, p_cascadeSet) {

//@non-generated-start[getListReservationByResourceid-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ReservationDaoSql.getListReservationByResourceid() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ReservationDaoSql.getListReservationByResourceid() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_foreignKeys_resourceid), 'ReservationDaoSql.getListReservationByResourceid() : p_foreignKeys_resourceid is required');

		var deferred = $qSync.defer();
		var self = this;

		var o_sqlQuery = 'select * from T_RESERVATION where RESOURCEID in ('+ self.produceQueryInPart(p_foreignKeys_resourceid) +');';
		var o_sqlParameters = [].concat(p_foreignKeys_resourceid);

		self.executeQueryToRead(
			'ReservationDaoSql.getListReservationByResourceid()', p_context, o_sqlQuery, o_sqlParameters).then(

function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
function (returnedSuccess_cascade) {
deferred.resolve(returnedSuccess_executeQueryToRead);
},
function (returnedError_cascade) {
console.error('ReservationDaoSql.getListReservationByResourceid(): cascade error: ', returnedError_cascade);
p_context.addError('ReservationDaoSql.getListReservationByResourceid(): cascade error: '+ returnedError_cascade);
deferred.reject(returnedError_cascade);
}
);
},
function (returnedError_executeQueryToRead) { /* ERROR */
console.error('ReservationDaoSql.getListReservationByResourceid(): error: ', returnedError_executeQueryToRead);
p_context.addError('ReservationDaoSql.getListReservationByResourceid(): error: '+ returnedError_executeQueryToRead);
deferred.reject(returnedError_executeQueryToRead);
}
);

//@non-generated-start[getListReservationByResourceid-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name ReservationDaoSql#getListReservationByEmploye
	 * @function
	 *
	 * @description
	 * Returns a list of Reservations according to the parameter(s).
	 *
	 * @param {Array<Integer>} p_foreignKeys_employe
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Reservations, including children if required.
	 */
	ReservationDaoSql.prototype.getListReservationByEmploye = function(p_foreignKeys_employe, p_context, p_cascadeSet) {

//@non-generated-start[getListReservationByEmploye-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ReservationDaoSql.getListReservationByEmploye() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ReservationDaoSql.getListReservationByEmploye() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_foreignKeys_employe), 'ReservationDaoSql.getListReservationByEmploye() : p_foreignKeys_employe is required');

		var deferred = $qSync.defer();
		var self = this;

		var o_sqlQuery = 'select * from T_RESERVATION where EMPLOYEID in ('+ self.produceQueryInPart(p_foreignKeys_employe.idToString) +');';
		var o_sqlParameters = [].concat(p_foreignKeys_employe.idToString);

		self.executeQueryToRead(
			'ReservationDaoSql.getListReservationByEmploye()', p_context, o_sqlQuery, o_sqlParameters).then(

function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
function (returnedSuccess_cascade) {
deferred.resolve(returnedSuccess_executeQueryToRead);
},
function (returnedError_cascade) {
console.error('ReservationDaoSql.getListReservationByEmploye(): cascade error: ', returnedError_cascade);
p_context.addError('ReservationDaoSql.getListReservationByEmploye(): cascade error: '+ returnedError_cascade);
deferred.reject(returnedError_cascade);
}
);
},
function (returnedError_executeQueryToRead) { /* ERROR */
console.error('ReservationDaoSql.getListReservationByEmploye(): error: ', returnedError_executeQueryToRead);
p_context.addError('ReservationDaoSql.getListReservationByEmploye(): error: '+ returnedError_executeQueryToRead);
deferred.reject(returnedError_executeQueryToRead);
}
);

//@non-generated-start[getListReservationByEmploye-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name ReservationDaoSql#getListReservationByEmployeid
	 * @function
	 *
	 * @description
	 * Returns a list of Reservations according to the parameter(s).
	 *
	 * @param {Array<Integer>} p_foreignKeys_employeid
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Reservations, including children if required.
	 */
	ReservationDaoSql.prototype.getListReservationByEmployeid = function(p_foreignKeys_employeid, p_context, p_cascadeSet) {

//@non-generated-start[getListReservationByEmployeid-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ReservationDaoSql.getListReservationByEmployeid() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ReservationDaoSql.getListReservationByEmployeid() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_foreignKeys_employeid), 'ReservationDaoSql.getListReservationByEmployeid() : p_foreignKeys_employeid is required');

		var deferred = $qSync.defer();
		var self = this;

		var o_sqlQuery = 'select * from T_RESERVATION where EMPLOYEID in ('+ self.produceQueryInPart(p_foreignKeys_employeid) +');';
		var o_sqlParameters = [].concat(p_foreignKeys_employeid);

		self.executeQueryToRead(
			'ReservationDaoSql.getListReservationByEmployeid()', p_context, o_sqlQuery, o_sqlParameters).then(

function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
function (returnedSuccess_cascade) {
deferred.resolve(returnedSuccess_executeQueryToRead);
},
function (returnedError_cascade) {
console.error('ReservationDaoSql.getListReservationByEmployeid(): cascade error: ', returnedError_cascade);
p_context.addError('ReservationDaoSql.getListReservationByEmployeid(): cascade error: '+ returnedError_cascade);
deferred.reject(returnedError_cascade);
}
);
},
function (returnedError_executeQueryToRead) { /* ERROR */
console.error('ReservationDaoSql.getListReservationByEmployeid(): error: ', returnedError_executeQueryToRead);
p_context.addError('ReservationDaoSql.getListReservationByEmployeid(): error: '+ returnedError_executeQueryToRead);
deferred.reject(returnedError_executeQueryToRead);
}
);

//@non-generated-start[getListReservationByEmployeid-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name ReservationDaoSql#getListReservationByResourceids
	 * @function
	 *
	 * @description
	 * Returns a list of Reservations according to the parameter(s).
	 *
	 * @param {Array<Integer>} p_foreignKeys_resourceids
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Reservations, including children if required.
	 */
	ReservationDaoSql.prototype.getListReservationByResourceids = function(p_foreignKeys_resourceids, p_context, p_cascadeSet) {

//@non-generated-start[getListReservationByResourceids-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ReservationDaoSql.getListReservationByResourceids() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ReservationDaoSql.getListReservationByResourceids() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_foreignKeys_resourceids), 'ReservationDaoSql.getListReservationByResourceids() : p_foreignKeys_resourceids is required');

		var deferred = $qSync.defer();
		var self = this;

		var o_sqlQuery = 'select * from T_RESERVATION where RESOURCEID in ('+ self.produceQueryInPart(p_foreignKeys_resourceids) +');';
		var o_sqlParameters = [].concat(p_foreignKeys_resourceids);

		self.executeQueryToRead(
			'ReservationDaoSql.getListReservationByResourceids()', p_context, o_sqlQuery, o_sqlParameters).then(

function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
function (returnedSuccess_cascade) {
deferred.resolve(returnedSuccess_executeQueryToRead);
},
function (returnedError_cascade) {
console.error('ReservationDaoSql.getListReservationByResourceids(): cascade error: ', returnedError_cascade);
p_context.addError('ReservationDaoSql.getListReservationByResourceids(): cascade error: '+ returnedError_cascade);
deferred.reject(returnedError_cascade);
}
);
},
function (returnedError_executeQueryToRead) { /* ERROR */
console.error('ReservationDaoSql.getListReservationByResourceids(): error: ', returnedError_executeQueryToRead);
p_context.addError('ReservationDaoSql.getListReservationByResourceids(): error: '+ returnedError_executeQueryToRead);
deferred.reject(returnedError_executeQueryToRead);
}
);

//@non-generated-start[getListReservationByResourceids-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name ReservationDaoSql#getListReservationByEmployeids
	 * @function
	 *
	 * @description
	 * Returns a list of Reservations according to the parameter(s).
	 *
	 * @param {Array<Integer>} p_foreignKeys_employeids
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Reservations, including children if required.
	 */
	ReservationDaoSql.prototype.getListReservationByEmployeids = function(p_foreignKeys_employeids, p_context, p_cascadeSet) {

//@non-generated-start[getListReservationByEmployeids-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ReservationDaoSql.getListReservationByEmployeids() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ReservationDaoSql.getListReservationByEmployeids() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_foreignKeys_employeids), 'ReservationDaoSql.getListReservationByEmployeids() : p_foreignKeys_employeids is required');

		var deferred = $qSync.defer();
		var self = this;

		var o_sqlQuery = 'select * from T_RESERVATION where EMPLOYEID in ('+ self.produceQueryInPart(p_foreignKeys_employeids) +');';
		var o_sqlParameters = [].concat(p_foreignKeys_employeids);

		self.executeQueryToRead(
			'ReservationDaoSql.getListReservationByEmployeids()', p_context, o_sqlQuery, o_sqlParameters).then(

function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
function (returnedSuccess_cascade) {
deferred.resolve(returnedSuccess_executeQueryToRead);
},
function (returnedError_cascade) {
console.error('ReservationDaoSql.getListReservationByEmployeids(): cascade error: ', returnedError_cascade);
p_context.addError('ReservationDaoSql.getListReservationByEmployeids(): cascade error: '+ returnedError_cascade);
deferred.reject(returnedError_cascade);
}
);
},
function (returnedError_executeQueryToRead) { /* ERROR */
console.error('ReservationDaoSql.getListReservationByEmployeids(): error: ', returnedError_executeQueryToRead);
p_context.addError('ReservationDaoSql.getListReservationByEmployeids(): error: '+ returnedError_executeQueryToRead);
deferred.reject(returnedError_executeQueryToRead);
}
);

//@non-generated-start[getListReservationByEmployeids-after][X]
//@non-generated-end

		return deferred.promise;
	};



	//==================================================================================
	//========   SPECIFIC METHODS - SAVE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name ReservationDaoSql#saveReservation
	 * @function
	 *
	 * @description
	 * Saves a Reservation.
	 *
	 * @param {Reservation} p_entity Reservation to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Promise} Returns a promise equal to true if the Reservation was saved, false otherwise.
	 */
	ReservationDaoSql.prototype.saveReservation = function(p_entity, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[saveReservation-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ReservationDaoSql.saveReservation() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ReservationDaoSql.saveReservation() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_entity), 'ReservationDaoSql.saveReservation() : p_entity is required');

		var deferred = $qSync.defer();
		var self = this;

		self.fixDoubleWaysRelationship(p_entity);
		// --------------------------
		// 1. save or update children pointed by the parent : for relationships xxx_to_one
		// --------------------------
		var savePointedChildren = [];

		//		1.1  call saveOrUpdate function of the child dao
		//		1.2  check that the ID attribute of the children model entities is updated (update foreign key of the parent pointing the child just saved)
		var resourceIdx = p_cascadeSet.indexOf('resource');
		if( resourceIdx > -1) {
			p_cascadeSet.splice(resourceIdx, 1);
			savePointedChildren.push( ResourceDaoProxy.saveOrUpdateResource(p_entity.resource, p_context, p_cascadeSet, p_toSync) );
		}
		var employeIdx = p_cascadeSet.indexOf('employe');
		if( employeIdx > -1) {
			p_cascadeSet.splice(employeIdx, 1);
			savePointedChildren.push( EmployeeDaoProxy.saveOrUpdateEmployee(p_entity.employe, p_context, p_cascadeSet, p_toSync) );
		}

		$qSync.all(savePointedChildren).then(
			function(success) { /* SUCCESS */
				// --------------------------
				// 2. save the main entity
				// --------------------------

				self.saveEntity(p_entity, p_context, p_toSync).then(
					function (success_result) {

						var saveOtherChildren = [];


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


//@non-generated-start[saveReservation-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name ReservationDaoSql#saveListReservation
	 * @function
	 *
	 * @description
	 * Saves a list of Reservations.
	 *
	 * @param {Array<Reservation>} p_entities Array containing Reservations to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of Reservations was saved, false otherwise.
	 */
	ReservationDaoSql.prototype.saveListReservation = function(p_entities, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[saveListReservation-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ReservationDaoSql.saveListReservation() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ReservationDaoSql.saveListReservation() : p_cascadeSet is required and should be an array');
		console.assert(angular.isArray(p_entities), 'ReservationDaoSql.saveListReservation() : p_entities is required and should be an array');

		var deferred = $qSync.defer();
		var self = this;

		/* saveListReservation() => saveReservation() */
		var o_arrayPromisesSaveReservation = [];
		for( var i = 0; i < p_entities.length; i++ ) {
			o_arrayPromisesSaveReservation.push( self.saveReservation(p_entities[i], p_context, angular.copy(p_cascadeSet), p_toSync) );
		}
		// $qSync.all() returns an array of the results of o_arrayPromisesSaveReservation.
		// If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
		deferred.resolve( $qSync.all(o_arrayPromisesSaveReservation) );


//@non-generated-start[saveListReservation-after][X]
//@non-generated-end

		return deferred.promise;
	};



	//==================================================================================
	//========   SPECIFIC METHODS - UPDATE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name ReservationDaoSql#updateReservation
	 * @function
	 *
	 * @description
	 * Updates a Reservation.
	 *
	 * @param {Reservation} p_entity Reservation to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
	 *
	 * @returns {Promise} Returns a promise equal to true if the Reservation was updated, false otherwise.
	 */
	ReservationDaoSql.prototype.updateReservation = function(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

//@non-generated-start[updateReservation-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ReservationDaoSql.updateReservation() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ReservationDaoSql.updateReservation() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_entity), 'ReservationDaoSql.updateReservation() : p_entity is required');

		var deferred = $qSync.defer();
		var self = this;

		var childrenPromises = [];

		self.fixDoubleWaysRelationship(p_entity);


		// 2. save or update all the other children (no matter the type of relationship), if asked by p_cascadeset
		var resourceIdx = p_cascadeSet.indexOf('resource');
		if( resourceIdx > -1) {
			childrenPromises.push( ResourceDaoProxy.saveOrUpdateResource(p_entity.resource, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) );
		}
		var employeIdx = p_cascadeSet.indexOf('employe');
		if( employeIdx > -1) {
			childrenPromises.push( EmployeeDaoProxy.saveOrUpdateEmployee(p_entity.employe, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) );
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


//@non-generated-start[updateReservation-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name ReservationDaoSql#updateListReservation
	 * @function
	 *
	 * @description
	 * Updates a list of Reservations.
	 *
	 * @param {Array<Reservation>} p_entities Array containing Reservations to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of Reservations was updated, false otherwise.
	 */
	ReservationDaoSql.prototype.updateListReservation = function(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

//@non-generated-start[updateListReservation-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ReservationDaoSql.updateListReservation() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ReservationDaoSql.updateListReservation() : p_cascadeSet is required and should be an array');
		console.assert(angular.isArray(p_entities), 'ReservationDaoSql.updateListReservation() : p_entities is required and should be an array');

		var deferred = $qSync.defer();
		var self = this;

		/* updateListReservation() => updateReservation() */
		var o_arrayPromisesUpdateReservation = [];
		for( var i = 0; i < p_entities.length; i++ ) {
			o_arrayPromisesUpdateReservation.push( self.updateReservation(p_entities[i], p_context, angular.copy(p_cascadeSet), p_toSync, angular.copy(p_cascadeSetForDelete)) );
		}
		// $qSync.all() returns an array of the results of o_arrayPromisesUpdateReservation.
		// If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
		deferred.resolve( $qSync.all(o_arrayPromisesUpdateReservation) );


//@non-generated-start[updateListReservation-after][X]
//@non-generated-end

		return deferred.promise;
	};



	//==================================================================================
	//========   SPECIFIC METHODS - SAVE & UPDATE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name ReservationDaoSql#saveOrUpdateReservation
	 * @function
	 *
	 * @description
	 * Saves of updates a Reservation.
	 *
	 * @param {Reservation} p_entity Reservation to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
	 *
	 * @returns {Promise} Returns a promise equal to true if the Reservation was saved or updated, false otherwise.
	 */
	ReservationDaoSql.prototype.saveOrUpdateReservation = function(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

//@non-generated-start[saveOrUpdateReservation-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ReservationDaoSql.saveOrUpdateReservation() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ReservationDaoSql.saveOrUpdateReservation() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_entity), 'ReservationDaoSql.saveOrUpdateReservation() : p_entity is required');

		var deferred = $qSync.defer();
		var self = this;

		if(p_entity.idToString !== -1) { 
			this.exist(p_entity, p_context).then(function(result) {
				if(result){ 
					/* updateReservation */
					console.log('ReservationDaoSql.saveOrUpdateReservation(): entity exists  => updateReservation()');
					deferred.resolve( self.updateReservation(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) );
				} else {
				/* saveReservation */
					console.log('ReservationDaoSql.saveOrUpdateReservation(): entity does not exist  => saveReservation()');
					deferred.resolve( self.saveReservation(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) ); // last parameter ignored by called method
				}
			},
 			function(error) { 
				deferred.reject(error); 
			});
		} else { 
			/* saveReservation */
			console.log('ReservationDaoSql.saveOrUpdateReservation(): entity does not exist  => saveReservation()');
			deferred.resolve( self.saveReservation(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) ); // last parameter ignored by called method
		}


//@non-generated-start[saveOrUpdateReservation-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name ReservationDaoSql#saveOrUpdateListReservation
	 * @function
	 *
	 * @description
	 * Saves of updates a list of Reservations.
	 *
	 * @param {Array<Reservation>} p_entities Array containing Reservations to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of Reservations was saved or updated, false otherwise.
	 */
	ReservationDaoSql.prototype.saveOrUpdateListReservation = function(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

//@non-generated-start[saveOrUpdateListReservation-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ReservationDaoSql.saveOrUpdateListReservation() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ReservationDaoSql.saveOrUpdateListReservation() : p_cascadeSet is required and should be an array');
		console.assert(angular.isArray(p_entities), 'ReservationDaoSql.saveOrUpdateListReservation() : p_entities is required and should be an array');

		var deferred = $qSync.defer();
		var self = this;

		/* saveOrUpdateListReservation() => saveOrUpdateReservation() */
		var o_arrayPromisesSaveOrUpdateReservation = [];
		for(var i = 0; i < p_entities.length; i++) {
			o_arrayPromisesSaveOrUpdateReservation.push( self.saveOrUpdateReservation(p_entities[i], p_context, angular.copy(p_cascadeSet), p_toSync, angular.copy(p_cascadeSetForDelete)) );
		}
		// $qSync.all() returns an array of the results of o_arrayPromisesSaveOrUpdateReservation.
		// If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
		deferred.resolve( $qSync.all(o_arrayPromisesSaveOrUpdateReservation) );


//@non-generated-start[saveOrUpdateListReservation-after][X]
//@non-generated-end

		return deferred.promise;
	};



	//==================================================================================
	//========   SPECIFIC METHODS - DELETE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name ReservationDaoSql#deleteReservation
	 * @function
	 *
	 * @description
	 * Delete a Reservation.
	 *
	 * @param {Reservation} p_entity Reservation to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Promise} Returns a promise equal to true if the Reservation was deleted, false otherwise.
	 */
	ReservationDaoSql.prototype.deleteReservation = function(p_entity, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[deleteReservation-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ReservationDaoSql.deleteReservation() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ReservationDaoSql.deleteReservation() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_entity), 'ReservationDaoSql.deleteReservation() : p_entity is required');

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
								var resourceIdx = p_cascadeSet.indexOf('resource');
								// 	5.1. ONLY IF asked in p_cascadeset, delete children
								if( resourceIdx > -1) {
									p_cascadeSet.splice(resourceIdx, 1);
									pointersDeletes.push( ResourceDaoProxy.deleteListResource(p_entity.resource, p_context, p_cascadeSet, p_toSync) );
								}

								var employeIdx = p_cascadeSet.indexOf('employe');
								// 	5.1. ONLY IF asked in p_cascadeset, delete children
								if( employeIdx > -1) {
									p_cascadeSet.splice(employeIdx, 1);
									pointersDeletes.push( EmployeeDaoProxy.deleteListEmployee(p_entity.employe, p_context, p_cascadeSet, p_toSync) );
								}

								$qSync.all(pointersDeletes).then(
									function(returnedSuccess_executeQuery2ToDelete) { /* SUCCESS */
										deferred.resolve(returnedSuccess_executeQuery2ToDelete);
									},
									function (returnedError_executeQuery2ToDelete) { /* ERROR */
										console.error('ReservationDaoSql.deleteReservation(): error: ', returnedError_executeQuery2ToDelete);
										p_context.addError('ReservationDaoSql.deleteReservation(): error: '+ returnedError_executeQuery2ToDelete);
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

//@non-generated-start[deleteReservation-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name ReservationDaoSql#deleteReservationById
	 * @function
	 *
	 * @description
	 * Deletes a Reservation by id.
	 *
	 * @param {Integer} p_id Integer id of the Reservation to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Promise} Returns a promise equal to true if the Reservation was deleted, false otherwise.
	 */
	ReservationDaoSql.prototype.deleteReservationById = function(p_id, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[deleteReservationById-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ReservationDaoSql.deleteReservationById() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ReservationDaoSql.deleteReservationById() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_id), 'ReservationDaoSql.deleteReservationById() : p_id is required');

		var deferred = $qSync.defer();
		var self = this;

		self.getReservationById(p_id, p_context, angular.copy(p_cascadeSet), p_toSync).then(
			function(entity){
				deferred.resolve( self.deleteReservation(entity, p_context, angular.copy(p_cascadeSet), p_toSync) );
			},
			function(error){
				deferred.reject(error);
			}
		);


//@non-generated-start[deleteReservationById-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name ReservationDaoSql#deleteListReservation
	 * @function
	 *
	 * @description
	 * Deletes a list of Reservations.
	 *
	 * @param {Array<Reservation>} p_entities Array containing Reservations to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of Reservations was deleted, false otherwise.
	 */
	ReservationDaoSql.prototype.deleteListReservation = function(p_entities, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[deleteListReservation-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ReservationDaoSql.deleteListReservation() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ReservationDaoSql.deleteListReservation() : p_cascadeSet is required and should be an array');
		console.assert(angular.isArray(p_entities), 'ReservationDaoSql.deleteListReservation() : p_entities is required and should be an array');

		var deferred = $qSync.defer();
		var self = this;

		/* deleteListReservation() => deleteReservation() */
		var o_arrayPromisesDeleteReservation = [];
		for( var i = 0; i < p_entities.length; i++ ) {
			o_arrayPromisesDeleteReservation.push( self.deleteReservation(p_entities[i], p_context, angular.copy(p_cascadeSet), p_toSync) );
		}
		// $qSync.all() returns an array of the results of o_arrayPromisesDeleteReservation.
		// If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
		deferred.resolve( $qSync.all(o_arrayPromisesDeleteReservation) );


//@non-generated-start[deleteListReservation-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name ReservationDaoSql#deleteListReservationByIds
	 * @function
	 *
	 * @description
	 * Deletes a list of Reservations by ids.
	 *
	 * @param {Array<Integer>} p_ids Array containing ids of Reservations to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of Reservations was deleted, false otherwise.
	 */
	ReservationDaoSql.prototype.deleteListReservationByIds = function(p_ids, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[deleteListReservationByIds-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'ReservationDaoSql.deleteListReservationByIds() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'ReservationDaoSql.deleteListReservationByIds() : p_cascadeSet is required and should be an array');
		console.assert(angular.isUndefinedOrNull(p_ids) || angular.isArray(p_ids), 'ReservationDaoSql.deleteListReservationByIds() : p_ids should be an array, if given');

		var deferred = $qSync.defer();
		var self = this;

		/* deleteListReservationByIds() => deleteListReservationById() */
		var o_arrayPromisesDeleteReservation = [];
		for( var i = 0; i < p_ids.length; i++ ) {
			o_arrayPromisesDeleteReservation.push( self.deleteReservationById(p_ids[i], p_context, angular.copy(p_cascadeSet), p_toSync) );
		}
		// $qSync.all() returns an array of the results of o_arrayPromisesDeleteReservation.
		// If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
		deferred.resolve( $qSync.all(o_arrayPromisesDeleteReservation) );


//@non-generated-start[deleteListReservationByIds-after][X]
//@non-generated-end

		return deferred.promise;
	};



//@non-generated-start[other-methods][X]
//@non-generated-end


	return new ReservationDaoSql();
}]);
