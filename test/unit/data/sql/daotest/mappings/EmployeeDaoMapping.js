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

angular.module('data-daotest-sql').factory('EmployeeDaoMapping',
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
rightFactory: 'EmployeeFactory',
attributes: [
{leftAttr: 'ID', rightAttr: 'id', identifier: true},
{leftAttr: 'FIRSTNAME', rightAttr: 'firstName'},
{leftAttr: 'LASTNAME', rightAttr: 'lastName'},
{leftAttr: 'PHOTO_NAME', rightAttr: ['photo', 'name'], rightFactory: 'MFPhotoFactory'},
{leftAttr: 'PHOTO_URI', rightAttr: ['photo', 'uri'], rightFactory: 'MFPhotoFactory'},
{leftAttr: 'PHOTO_DATE', rightAttr: ['photo', 'date'], rightFactory: 'MFPhotoFactory', right2leftConverter: ['MFDateConverter', 'toMilliseconds'], left2rightConverter: ['MFDateConverter', 'fromMilliseconds']},
{leftAttr: 'PHOTO_DESC', rightAttr: ['photo', 'desc'], rightFactory: 'MFPhotoFactory'},
{leftAttr: 'PHOTO_PHOTOSTATE', rightAttr: ['photo', 'photoState'], rightFactory: 'MFPhotoFactory', right2leftConverter:['MFGenericEnumConverter','toInteger'], left2rightConverter:['MFGenericEnumConverter','fromInteger','MFPhotoState']},
{leftAttr: 'AGENCEID1', rightAttr: ['agence', 'id'], rightFactory: 'AgenceFactory', childIdentifier: true}
]
			},

		mappingNoSql: {rightFactory: 'EmployeeFactory',
attributes: [
{leftAttr: 'id', rightAttr: 'id', identifier: true},
{leftAttr: 'firstname', rightAttr: 'firstName'},
{leftAttr: 'lastname', rightAttr: 'lastName'},
{leftAttr: ['photo', 'name'], rightAttr: ['photo', 'name'], rightFactory: 'MFPhotoFactory'},
{leftAttr: ['photo', 'uri'], rightAttr: ['photo', 'uri'], rightFactory: 'MFPhotoFactory'},
{leftAttr: ['photo', 'date'], rightAttr: ['photo', 'date'], rightFactory: 'MFPhotoFactory', right2leftConverter: ['MFDateConverter', 'toMilliseconds'], left2rightConverter: ['MFDateConverter', 'fromMilliseconds']},
{leftAttr: ['photo', 'desc'], rightAttr: ['photo', 'desc'], rightFactory: 'MFPhotoFactory'},
{leftAttr: ['photo', 'photoState'], rightAttr: ['photo', 'photoState'], rightFactory: 'MFPhotoFactory', right2leftConverter:['MFGenericEnumConverter','toInteger'], left2rightConverter:['MFGenericEnumConverter','fromInteger','MFPhotoState']},
{leftAttr: 'agenceid1', rightAttr: ['agence', 'id'], rightFactory: 'AgenceFactory', childIdentifier: true}
]
}
//@non-generated-end

	};

}]);
