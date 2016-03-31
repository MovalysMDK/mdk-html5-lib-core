'use strict'	;
/**
 * +ERREUR_NOEUD_POURRI_EMPLOYEE+
 *
 * <p>Copyright (c) 2010</p>
 * <p>Company: Adeuza</p>
 *
 */

//@non-generated-start[jshint-override]
//@non-generated-end

angular.module('data-daotest-sql').factory('Employee',['MFAbstractEntity', 'MFUtils',
//@non-generated-start[dependencies-names][X]
//@non-generated-end

//@non-generated-start[dependencies-classes][X]
function(MFAbstractEntity, MFUtils
//@non-generated-end
)
{

var Employee = function Employee(){


Employee._Parent.call(this);

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
		 * <p>Attribute FIRSTNAME</p>
		 * <p> type=String mandatory=true unique-key=true unique-key-name=firstlastname unique-key-relation=</p>
		 */

		 var _firstName = null;

		/**
		 * 
		 * 
		 * <p>Attribute LASTNAME</p>
		 * <p> type=String mandatory=true unique-key=true unique-key-name=firstlastname unique-key-relation=</p>
		 */

		 var _lastName = null;

		/**
		 * 
		 * 
		 * <p>Attribute </p>
		 * <p> type=MFPhoto mandatory=true</p>
		 */

		 var _photo = null;

		/**
		 * 
		 * 
		 * <p>Cascade SKILLS</p>
		 * 
			 type de relation
			<p>Relation ManyToMany</p>
			objet cible
			<p> targetEntity=Skill
			obligatoire
			
			proprietaire de la relation
			 relationOwner=true
			transient
			 transient=false</p>
		 */

		 var _skills = null;

		/**
		 * 
		 * 
		 * <p>Cascade AGENCE</p>
		 * 
			 type de relation
			<p>Relation ManyToOne</p>
			objet cible
			<p> targetEntity=Agence
			obligatoire
			 mandatory=true
			proprietaire de la relation
			 relationOwner=true
			transient
			 transient=false</p>
		 */

		 var _agence = null;

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


'firstName': {
get: function () {

//@non-generated-start[getter-firstName]
//@non-generated-end
return _firstName;

        },
set: function (firstName) {
_firstName = firstName;
//@non-generated-start[setter-firstName][X]
//@non-generated-end

},
//@non-generated-start[attribute-firstName-settings][X]


enumerable:true,
configurable:false
//@non-generated-end

},


'lastName': {
get: function () {

//@non-generated-start[getter-lastName]
//@non-generated-end
return _lastName;

        },
set: function (lastName) {
_lastName = lastName;
//@non-generated-start[setter-lastName][X]
//@non-generated-end

},
//@non-generated-start[attribute-lastName-settings][X]


enumerable:true,
configurable:false
//@non-generated-end

},


'photo': {
get: function () {

//@non-generated-start[getter-photo]
//@non-generated-end
return _photo;

        },
set: function (photo) {
_photo = photo;
//@non-generated-start[setter-photo][X]
//@non-generated-end

},
//@non-generated-start[attribute-photo-settings][X]


enumerable:true,
configurable:false
//@non-generated-end

},


'skills': {
get: function () {

//@non-generated-start[getter-skills]
//@non-generated-end
return _skills;

        },
set: function (skills) {
_skills = skills;
//@non-generated-start[setter-skills][X]
//@non-generated-end

},
//@non-generated-start[attribute-skills-settings][X]


enumerable:true,
configurable:false
//@non-generated-end

},


'agence': {
get: function () {

//@non-generated-start[getter-agence]
//@non-generated-end
return _agence;

        },
set: function (agence) {
_agence = agence;
//@non-generated-start[setter-agence][X]
//@non-generated-end

},
//@non-generated-start[attribute-agence-settings][X]


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
//@non-generated-start[heritage-Employee-settings][X]

MFUtils.extend(Employee, MFAbstractEntity);
Employee.prototype._transient = false;

//@non-generated-end


/**
* Add function for the list Skills
*/
Employee.prototype.addSkills= function (obj) {
if (this.skills === null) {
this.skills = [];
}

this.skills.push(obj);
};


/**
* Add function for the list Reservations
*/
Employee.prototype.addReservations= function (obj) {
if (this.reservations === null) {
this.reservations = [];
}

this.reservations.push(obj);
};

//@non-generated-start[functions]
//@non-generated-end

return Employee;
}]);
