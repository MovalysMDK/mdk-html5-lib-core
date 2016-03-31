'use strict';
/**
* Factory class for object AgencePhotosFactory
*/

//@non-generated-start[jshint-override]
//@non-generated-end

angular.module('data-daotest-sql').factory('AgencePhotosFactory', ['AgencePhotos', 'MFPhotoFactory',
//@non-generated-start[dependencies-names][X]
//@non-generated-end

//@non-generated-start[dependencies-classes][X]
function(AgencePhotos, MFPhotoFactory
//@non-generated-end
)
{
return {
 createInstance: function () {
 var result = new AgencePhotos();
result.identifier = -1;
result.photo = MFPhotoFactory.createInstance();

//@non-generated-start[child-instantiation-factory][X]

// uncomment the following line (and add imports) only if you want to instantiate the child object here	
//result.photosAgence = AgenceFactory.createInstance();
//@non-generated-end

//@non-generated-start[createInstance]
//@non-generated-end

return result;

 }

//@non-generated-start[functions]
//@non-generated-end
};
}]);
