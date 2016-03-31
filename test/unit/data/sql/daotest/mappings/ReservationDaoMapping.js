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

angular.module('data-daotest-sql').factory('ReservationDaoMapping',
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
rightFactory: 'ReservationFactory',
attributes: [
{leftAttr: 'ID', rightAttr: 'id', identifier: true},
{leftAttr: 'STARTDATE', rightAttr: 'startDate', right2leftConverter: ['MFDateConverter', 'toMilliseconds'], left2rightConverter: ['MFDateConverter', 'fromMilliseconds']},
{leftAttr: 'ENDDATE', rightAttr: 'endDate', right2leftConverter: ['MFDateConverter', 'toMilliseconds'], left2rightConverter: ['MFDateConverter', 'fromMilliseconds']},
{leftAttr: 'RESOURCEID', rightAttr: ['resource', 'id'], rightFactory: 'ResourceFactory', childIdentifier: true},
{leftAttr: 'EMPLOYEID', rightAttr: ['employe', 'id'], rightFactory: 'EmployeeFactory', childIdentifier: true}
]
			},

		mappingNoSql: {rightFactory: 'ReservationFactory',
attributes: [
{leftAttr: 'id', rightAttr: 'id', identifier: true},
{leftAttr: 'startdate', rightAttr: 'startDate', right2leftConverter: ['MFDateConverter', 'toMilliseconds'], left2rightConverter: ['MFDateConverter', 'fromMilliseconds']},
{leftAttr: 'enddate', rightAttr: 'endDate', right2leftConverter: ['MFDateConverter', 'toMilliseconds'], left2rightConverter: ['MFDateConverter', 'fromMilliseconds']},
{leftAttr: 'resourceid', rightAttr: ['resource', 'id'], rightFactory: 'ResourceFactory', childIdentifier: true},
{leftAttr: 'employeid', rightAttr: ['employe', 'id'], rightFactory: 'EmployeeFactory', childIdentifier: true}
]
}
//@non-generated-end

	};

}]);
