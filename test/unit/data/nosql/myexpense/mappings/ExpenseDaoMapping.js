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

angular.module('data-myexpense').factory('ExpenseDaoMapping', [
    //@non-generated-start[dependencies-names][X]
    //@non-generated-end

    //@non-generated-start[dependencies-classes][X]
    function(
        //@non-generated-end
    ) {

        return {

            //@non-generated-start[mapping][X]
            mappingSql: {
                rightFactory: 'ExpenseFactory',
                attributes: [{
                    leftAttr: 'ID',
                    rightAttr: 'id',
                    identifier: true
                }, {
                    leftAttr: 'DESCRIPTION',
                    rightAttr: 'description'
                }, {
                    leftAttr: 'AMOUNT',
                    rightAttr: 'amount'
                }, {
                    leftAttr: 'PHOTO_NAME',
                    rightAttr: ['photo', 'name'],
                    rightFactory: 'MFPhotoFactory'
                }, {
                    leftAttr: 'PHOTO_URI',
                    rightAttr: ['photo', 'uri'],
                    rightFactory: 'MFPhotoFactory'
                }, {
                    leftAttr: 'PHOTO_DATE',
                    rightAttr: ['photo', 'date'],
                    rightFactory: 'MFPhotoFactory',
                    right2leftConverter: ['MFDateConverter', 'toMilliseconds'],
                    left2rightConverter: ['MFDateConverter', 'fromMilliseconds']
                }, {
                    leftAttr: 'PHOTO_DESC',
                    rightAttr: ['photo', 'desc'],
                    rightFactory: 'MFPhotoFactory'
                }, {
                    leftAttr: 'PHOTO_PHOTOSTATE',
                    rightAttr: ['photo', 'photoState'],
                    rightFactory: 'MFPhotoFactory',
                    right2leftConverter: ['MFGenericEnumConverter', 'toInteger'],
                    left2rightConverter: ['MFGenericEnumConverter', 'fromInteger', 'MFPhotoState']
                }, {
                    leftAttr: 'STATE',
                    rightAttr: 'state',
                    right2leftConverter: ['MFGenericEnumConverter', 'toInteger'],
                    left2rightConverter: ['MFGenericEnumConverter', 'fromInteger', 'ExpenseState']
                }, {
                    leftAttr: 'TYPEID',
                    rightAttr: ['type', 'id'],
                    rightFactory: 'ExpenseTypeFactory',
                    childIdentifier: true,
                    multiple: false
                }, {
                    leftAttr: 'REPORTID',
                    rightAttr: ['report', 'id'],
                    rightFactory: 'ReportFactory',
                    childIdentifier: true,
                    multiple: false
                }]
            },

            mappingNoSql: {
                rightFactory: 'ExpenseFactory',
                attributes: [{
                    leftAttr: 'id',
                    rightAttr: 'id',
                    identifier: true
                }, {
                    leftAttr: 'description',
                    rightAttr: 'description'
                }, {
                    leftAttr: 'amount',
                    rightAttr: 'amount'
                }, {
                    leftAttr: ['photo', 'name'],
                    rightAttr: ['photo', 'name'],
                    rightFactory: 'MFPhotoFactory'
                }, {
                    leftAttr: ['photo', 'uri'],
                    rightAttr: ['photo', 'uri'],
                    rightFactory: 'MFPhotoFactory'
                }, {
                    leftAttr: ['photo', 'date'],
                    rightAttr: ['photo', 'date'],
                    rightFactory: 'MFPhotoFactory',
                    right2leftConverter: ['MFDateConverter', 'toMilliseconds'],
                    left2rightConverter: ['MFDateConverter', 'fromMilliseconds']
                }, {
                    leftAttr: ['photo', 'desc'],
                    rightAttr: ['photo', 'desc'],
                    rightFactory: 'MFPhotoFactory'
                }, {
                    leftAttr: ['photo', 'photoState'],
                    rightAttr: ['photo', 'photoState'],
                    rightFactory: 'MFPhotoFactory',
                    right2leftConverter: ['MFGenericEnumConverter', 'toInteger'],
                    left2rightConverter: ['MFGenericEnumConverter', 'fromInteger', 'MFPhotoState']
                }, {
                    leftAttr: 'state',
                    rightAttr: 'state',
                    right2leftConverter: ['MFGenericEnumConverter', 'toInteger'],
                    left2rightConverter: ['MFGenericEnumConverter', 'fromInteger', 'ExpenseState']
                }, {
                    leftAttr: 'typeid',
                    rightAttr: ['type', 'id'],
                    rightFactory: 'ExpenseTypeFactory',
                    childIdentifier: true,
                    multiple: false
                }, {
                    leftAttr: 'reportid',
                    rightAttr: ['report', 'id'],
                    rightFactory: 'ReportFactory',
                    childIdentifier: true,
                    multiple: false
                }]
            }
            //@non-generated-end

        };

    }
]);