'use strict'	;
/**
 * 
 *
 * <p>Copyright (c) 2010</p>
 * <p>Company: Adeuza</p>
 *
 */

//@non-generated-start[jshint-override]
//@non-generated-end

angular.module('data-daotest-sql').factory('Reservation',['MFAbstractEntity', 'MFUtils',
//@non-generated-start[dependencies-names][X]
//@non-generated-end

//@non-generated-start[dependencies-classes][X]
function(MFAbstractEntity, MFUtils
//@non-generated-end
)
{

var Reservation = function Reservation(){


Reservation._Parent.call(this);

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
		 * <p>Attribute STARTDATE</p>
		 * <p> type=Timestamp mandatory=true</p>
		 */

		 var _startDate = null;

		/**
		 * 
		 * 
		 * <p>Attribute ENDDATE</p>
		 * <p> type=Timestamp mandatory=true</p>
		 */

		 var _endDate = null;

		/**
		 * 
		 * 
		 * <p>Cascade RESOURCE</p>
		 * 
			 type de relation
			<p>Relation ManyToOne</p>
			objet cible
			<p> targetEntity=Resource
			obligatoire
			 mandatory=true
			proprietaire de la relation
			 relationOwner=true
			transient
			 transient=false</p>
		 */

		 var _resource = null;

		/**
		 * 
		 * 
		 * <p>Cascade EMPLOYE</p>
		 * 
			 type de relation
			<p>Relation ManyToOne</p>
			objet cible
			<p> targetEntity=Employee
			obligatoire
			 mandatory=true
			proprietaire de la relation
			 relationOwner=true
			transient
			 transient=false</p>
		 */

		 var _employe = null;


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


'startDate': {
get: function () {

//@non-generated-start[getter-startDate]
//@non-generated-end
return _startDate;

        },
set: function (startDate) {
_startDate = startDate;
//@non-generated-start[setter-startDate][X]
//@non-generated-end

},
//@non-generated-start[attribute-startDate-settings][X]


enumerable:true,
configurable:false
//@non-generated-end

},


'endDate': {
get: function () {

//@non-generated-start[getter-endDate]
//@non-generated-end
return _endDate;

        },
set: function (endDate) {
_endDate = endDate;
//@non-generated-start[setter-endDate][X]
//@non-generated-end

},
//@non-generated-start[attribute-endDate-settings][X]


enumerable:true,
configurable:false
//@non-generated-end

},


'resource': {
get: function () {

//@non-generated-start[getter-resource]
//@non-generated-end
return _resource;

        },
set: function (resource) {
_resource = resource;
//@non-generated-start[setter-resource][X]
//@non-generated-end

},
//@non-generated-start[attribute-resource-settings][X]


enumerable:true,
configurable:false
//@non-generated-end

},


'employe': {
get: function () {

//@non-generated-start[getter-employe]
//@non-generated-end
return _employe;

        },
set: function (employe) {
_employe = employe;
//@non-generated-start[setter-employe][X]
//@non-generated-end

},
//@non-generated-start[attribute-employe-settings][X]


enumerable:true,
configurable:false
//@non-generated-end

}

});

};
/**
* Inheritance of the entity
*/
//@non-generated-start[heritage-Reservation-settings][X]

MFUtils.extend(Reservation, MFAbstractEntity);
Reservation.prototype._transient = false;

//@non-generated-end

//@non-generated-start[functions]
//@non-generated-end

return Reservation;
}]);
