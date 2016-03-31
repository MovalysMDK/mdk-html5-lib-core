'use strict';

/**
* Enumeration class : AgencePhotosCascade
*/

//@non-generated-start[jshint-override]
//@non-generated-end

angular.module('data-daotest-sql').factory('AgencePhotosCascade', ['MFAbstractEnum', function (MFAbstractEnum)
{


var AgencePhotosCascade = function AgencePhotosCascade() {
this.entityName = 'AgencePhotos'; 
this.foreignEntitiesNames = {PHOTOSAGENCE: 'photosAgence'};
 };
MFAbstractEnum.defineEnum(AgencePhotosCascade, ['PHOTOSAGENCE']);

return AgencePhotosCascade;
}]);
