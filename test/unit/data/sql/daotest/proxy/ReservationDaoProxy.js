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

angular.module('data-daotest-sql').factory('ReservationDaoProxy',
	[
'MFUtils', 'MFDaoProxyAbstract',
//@non-generated-start[dependencies-names][X]
//@non-generated-end

//@non-generated-start[dependencies-classes][X]
function(MFUtils, MFDaoProxyAbstract
//@non-generated-end
)
{

	var ReservationDaoProxy = function ReservationDaoProxy(){
		// Constructor
		ReservationDaoProxy._Parent.call(this);

//@non-generated-start[constructor][X]
//@non-generated-end
	};

	MFUtils.extendFromInstance(ReservationDaoProxy, MFDaoProxyAbstract);



	//==================================================================================
	//========   ABSTRACT METHODS
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name ReservationDaoProxy#getNbEntities
	 * @function
	 *
	 * @description
	 * Returns the number of entities.
	 *
	 * @param {MFContext} p_context MFContext object
	 *
	 * @returns {Integer} Returns an Integer equal to the number of entities.
	 */
	ReservationDaoProxy.prototype.getNbEntities = function(p_context) {

		return this.getDaoImpl().getNbEntities(p_context);
	};



	//==================================================================================
	//========   SPECIFIC METHODS - GET
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name ReservationDaoProxy#getReservationById
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
	ReservationDaoProxy.prototype.getReservationById = function(p_id, p_context, p_cascadeSet) {

		return this.getDaoImpl().getReservationById(p_id, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name ReservationDaoProxy#getListReservation
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
	ReservationDaoProxy.prototype.getListReservation = function(p_context, p_cascadeSet) {

		return this.getDaoImpl().getListReservation(p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name ReservationDaoProxy#getListReservationByIds
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
	ReservationDaoProxy.prototype.getListReservationByIds = function(p_ids, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListReservationByIds(p_ids, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name ReservationDaoProxy#getListReservationByResource
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
	ReservationDaoProxy.prototype.getListReservationByResource = function(p_foreignKeys_resource, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListReservationByResource(p_foreignKeys_resource, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name ReservationDaoProxy#getListReservationByResourceid
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
	ReservationDaoProxy.prototype.getListReservationByResourceid = function(p_foreignKeys_resourceid, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListReservationByResourceid(p_foreignKeys_resourceid, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name ReservationDaoProxy#getListReservationByEmploye
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
	ReservationDaoProxy.prototype.getListReservationByEmploye = function(p_foreignKeys_employe, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListReservationByEmploye(p_foreignKeys_employe, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name ReservationDaoProxy#getListReservationByEmployeid
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
	ReservationDaoProxy.prototype.getListReservationByEmployeid = function(p_foreignKeys_employeid, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListReservationByEmployeid(p_foreignKeys_employeid, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name ReservationDaoProxy#getListReservationByResourceids
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
	ReservationDaoProxy.prototype.getListReservationByResourceids = function(p_foreignKeys_resourceids, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListReservationByResourceids(p_foreignKeys_resourceids, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name ReservationDaoProxy#getListReservationByEmployeids
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
	ReservationDaoProxy.prototype.getListReservationByEmployeids = function(p_foreignKeys_employeids, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListReservationByEmployeids(p_foreignKeys_employeids, p_context, p_cascadeSet);
	};



	//==================================================================================
	//========   SPECIFIC METHODS - SAVE & UPDATE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name ReservationDaoProxy#saveReservation
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
	ReservationDaoProxy.prototype.saveReservation = function(p_entity, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().saveReservation(p_entity, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name ReservationDaoProxy#saveListReservation
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
	ReservationDaoProxy.prototype.saveListReservation = function(p_entities, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().saveListReservation(p_entities, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name ReservationDaoProxy#updateReservation
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
	ReservationDaoProxy.prototype.updateReservation = function(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

		return this.getDaoImpl().updateReservation(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
	};


	/**
	 * @ngdoc method
	 * @name ReservationDaoProxy#updateListReservation
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
	ReservationDaoProxy.prototype.updateListReservation = function(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

		return this.getDaoImpl().updateListReservation(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
	};


	/**
	 * @ngdoc method
	 * @name ReservationDaoProxy#saveOrUpdateReservation
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
	ReservationDaoProxy.prototype.saveOrUpdateReservation = function(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

		return this.getDaoImpl().saveOrUpdateReservation(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
	};


	/**
	 * @ngdoc method
	 * @name ReservationDaoProxy#saveOrUpdateListReservation
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
	ReservationDaoProxy.prototype.saveOrUpdateListReservation = function(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

		return this.getDaoImpl().saveOrUpdateListReservation(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
	};



	//==================================================================================
	//========   SPECIFIC METHODS - DELETE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name ReservationDaoProxy#deleteReservation
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
	ReservationDaoProxy.prototype.deleteReservation = function(p_entity, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().deleteReservation(p_entity, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name ReservationDaoProxy#deleteReservationById
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
	ReservationDaoProxy.prototype.deleteReservationById = function(p_id, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().deleteReservationById(p_id, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name ReservationDaoProxy#deleteListReservation
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
	ReservationDaoProxy.prototype.deleteListReservation = function(p_entities, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().deleteListReservation(p_entities, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name ReservationDaoProxy#deleteListReservationByIds
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
	ReservationDaoProxy.prototype.deleteListReservationByIds = function(p_ids, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().deleteListReservationByIds(p_ids, p_context, p_cascadeSet, p_toSync);
	};



//@non-generated-start[other-methods][X]
//@non-generated-end


	return new ReservationDaoProxy();
}]);
