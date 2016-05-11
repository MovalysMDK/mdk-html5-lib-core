'use strict'	;
/**
 * +ERREUR_NOEUD_POURRI_RESOURCE+
 *
 * <p>Copyright (c) 2010</p>
 * <p>Company: Adeuza</p>
 *
 */

//@non-generated-start[jshint-override]
//@non-generated-end

angular.module('data-daotest-sql').factory('Resource',['MFAbstractEntity', 'MFUtils',
//@non-generated-start[dependencies-names][X]
//@non-generated-end

//@non-generated-start[dependencies-classes][X]
function(MFAbstractEntity, MFUtils
//@non-generated-end
)
{

var Resource = function Resource(){


Resource._Parent.call(this);

		/**
		 * 
		 * 
		 * <p>Attribute ID</p>
		 * <p> type=long mandatory=true</p>
		 */

		 var _id = null;

		/**
		 * 
		 * 
		 * <p>Attribute LABEL</p>
		 * <p> type=String mandatory=true</p>
		 */

		 var _label = null;

		/**
		 * 
		 * 
		 * <p>Attribute ENABLE</p>
		 * <p> type=boolean mandatory=true</p>
		 */

		 var _enable = null;

		/**
		 * 
		 * 
		 * <p>Attribute RESOURCETYPE</p>
		 * <p> type=ResourceType mandatory=true</p>
		 */

		 var _resourceType = null;

		/**
		 * 
		 * 
		 * <p>Cascade RESERVATIONS</p>
		 * 
			 type de relation
			<p>Relation OneToMany</p>
			objet cible
			<p> targetEntity=Reservation
			obligatoire
			
			proprietaire de la relation
			 relationOwner=false
			transient
			 transient=false</p>
		 */

		 var _reservations = null;


//@non-generated-start[attributes]
//@non-generated-end
/**
* define and initialize all of the attributes of the class   
*/Object.defineProperties(this, {

'id': {
get: function () {

//@non-generated-start[getter-id]
//@non-generated-end
return _id;

        },
set: function (id) {
_id = id;
//@non-generated-start[setter-id][X]
//@non-generated-end

},
//@non-generated-start[attribute-id-settings][X]


enumerable:true,
configurable:false
//@non-generated-end

},

'idToString':{
get: function () {
return _id;
},
enumerable: false,
configurable: false
},


'label': {
get: function () {

//@non-generated-start[getter-label]
//@non-generated-end
return _label;

        },
set: function (label) {
_label = label;
//@non-generated-start[setter-label][X]
//@non-generated-end

},
//@non-generated-start[attribute-label-settings][X]


enumerable:true,
configurable:false
//@non-generated-end

},


'enable': {
get: function () {

//@non-generated-start[getter-enable]
//@non-generated-end
return _enable;

        },
set: function (enable) {
_enable = enable;
//@non-generated-start[setter-enable][X]
//@non-generated-end

},
//@non-generated-start[attribute-enable-settings][X]


enumerable:true,
configurable:false
//@non-generated-end

},


'resourceType': {
get: function () {

//@non-generated-start[getter-resourceType]
//@non-generated-end
return _resourceType;

        },
set: function (resourceType) {
_resourceType = resourceType;
//@non-generated-start[setter-resourceType][X]
//@non-generated-end

},
//@non-generated-start[attribute-resourceType-settings][X]


enumerable:true,
configurable:false
//@non-generated-end

},


'reservations': {
get: function () {

//@non-generated-start[getter-reservations]
//@non-generated-end
return _reservations;

        },
set: function (reservations) {
_reservations = reservations;
//@non-generated-start[setter-reservations][X]
//@non-generated-end

},
//@non-generated-start[attribute-reservations-settings][X]


enumerable:true,
configurable:false
//@non-generated-end

}

});

};
/**
* Inheritance of the entity
*/
//@non-generated-start[heritage-Resource-settings][X]

MFUtils.extend(Resource, MFAbstractEntity);
Resource.prototype._transient = false;

//@non-generated-end


/**
* Add function for the list Reservations
*/
Resource.prototype.addReservations= function (obj) {
if (this.reservations === null) {
this.reservations = [];
}

this.reservations.push(obj);
};

//@non-generated-start[functions]
//@non-generated-end

return Resource;
}]);
