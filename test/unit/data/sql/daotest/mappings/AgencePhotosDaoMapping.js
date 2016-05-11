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

angular.module('data-daotest-sql').factory('AgencePhotosDaoMapping',
[
//@non-generated-start[dependencies-names][X]
//@non-generated-end

//@non-generated-start[dependencies-classes][X]
function (
//@non-generated-end
) {

	return {

//@non-generated-start[mapping][X]
		mappingSql: {
rightFactory: 'AgencePhotosFactory',
attributes: [
{leftAttr: 'IDENTIFIER', rightAttr: 'identifier', identifier: true},
{leftAttr: 'PHOTO_NAME', rightAttr: ['photo', 'name'], rightFactory: 'MFPhotoFactory'},
{leftAttr: 'PHOTO_URI', rightAttr: ['photo', 'uri'], rightFactory: 'MFPhotoFactory'},
{leftAttr: 'PHOTO_DATE', rightAttr: ['photo', 'date'], rightFactory: 'MFPhotoFactory', right2leftConverter: ['MFDateConverter', 'toMilliseconds'], left2rightConverter: ['MFDateConverter', 'fromMilliseconds']},
{leftAttr: 'PHOTO_DESC', rightAttr: ['photo', 'desc'], rightFactory: 'MFPhotoFactory'},
{leftAttr: 'PHOTO_PHOTOSTATE', rightAttr: ['photo', 'photoState'], rightFactory: 'MFPhotoFactory', right2leftConverter:['MFGenericEnumConverter','toInteger'], left2rightConverter:['MFGenericEnumConverter','fromInteger','MFPhotoState']},
{leftAttr: 'PHOTOSAGENCEID', rightAttr: ['photosAgence', 'id'], rightFactory: 'AgenceFactory', childIdentifier: true}
]
			},

		mappingNoSql: {rightFactory: 'AgencePhotosFactory',
attributes: [
{leftAttr: 'identifier', rightAttr: 'identifier', identifier: true},
{leftAttr: ['photo', 'name'], rightAttr: ['photo', 'name'], rightFactory: 'MFPhotoFactory'},
{leftAttr: ['photo', 'uri'], rightAttr: ['photo', 'uri'], rightFactory: 'MFPhotoFactory'},
{leftAttr: ['photo', 'date'], rightAttr: ['photo', 'date'], rightFactory: 'MFPhotoFactory', right2leftConverter: ['MFDateConverter', 'toMilliseconds'], left2rightConverter: ['MFDateConverter', 'fromMilliseconds']},
{leftAttr: ['photo', 'desc'], rightAttr: ['photo', 'desc'], rightFactory: 'MFPhotoFactory'},
{leftAttr: ['photo', 'photoState'], rightAttr: ['photo', 'photoState'], rightFactory: 'MFPhotoFactory', right2leftConverter:['MFGenericEnumConverter','toInteger'], left2rightConverter:['MFGenericEnumConverter','fromInteger','MFPhotoState']},
{leftAttr: 'photosagenceid', rightAttr: ['photosAgence', 'id'], rightFactory: 'AgenceFactory', childIdentifier: true}
]
}
//@non-generated-end

	};

}]);
