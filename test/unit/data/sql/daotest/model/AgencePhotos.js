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

angular.module('data-daotest-sql').factory('AgencePhotos',['MFAbstractEntity', 'MFUtils',
//@non-generated-start[dependencies-names][X]
//@non-generated-end

//@non-generated-start[dependencies-classes][X]
function(MFAbstractEntity, MFUtils
//@non-generated-end
)
{

var AgencePhotos = function AgencePhotos(){


AgencePhotos._Parent.call(this);

		/**
		 * 
		 * 
		 * <p>Attribute IDENTIFIER</p>
		 * <p> type=long mandatory=true</p>
		 */

		 var _identifier = null;

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
		 * <p>Cascade PHOTOSAGENCE</p>
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

		 var _photosAgence = null;


//@non-generated-start[attributes]
//@non-generated-end
/**
* define and initialize all of the attributes of the class   
*/Object.defineProperties(this, {

'identifier': {
get: function () {

//@non-generated-start[getter-identifier]
//@non-generated-end
return _identifier;

        },
set: function (identifier) {
_identifier = identifier;
//@non-generated-start[setter-identifier][X]
//@non-generated-end

},
//@non-generated-start[attribute-identifier-settings][X]


enumerable:true,
configurable:false
//@non-generated-end

},

'idToString':{
get: function () {
return _identifier;
},
enumerable: false,
configurable: false
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


'photosAgence': {
get: function () {

//@non-generated-start[getter-photosAgence]
//@non-generated-end
return _photosAgence;

        },
set: function (photosAgence) {
_photosAgence = photosAgence;
//@non-generated-start[setter-photosAgence][X]
//@non-generated-end

},
//@non-generated-start[attribute-photosAgence-settings][X]


enumerable:true,
configurable:false
//@non-generated-end

}

});

};
/**
* Inheritance of the entity
*/
//@non-generated-start[heritage-AgencePhotos-settings][X]

MFUtils.extend(AgencePhotos, MFAbstractEntity);
AgencePhotos.prototype._transient = false;

//@non-generated-end

//@non-generated-start[functions]
//@non-generated-end

return AgencePhotos;
}]);
