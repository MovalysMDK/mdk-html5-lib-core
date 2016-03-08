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

angular.module('data-myexpense').factory('ReportDaoMapping', [
    //@non-generated-start[dependencies-names][X]
    //@non-generated-end

    //@non-generated-start[dependencies-classes][X]
    function(
        //@non-generated-end
    ) {

        return {

            //@non-generated-start[mapping][X]
            mappingSql: {
                rightFactory: 'ReportFactory',
                attributes: [{
                    leftAttr: 'ID',
                    rightAttr: 'id',
                    identifier: true
                }, {
                    leftAttr: 'DATE',
                    rightAttr: 'date',
                    right2leftConverter: ['MFDateConverter', 'toMilliseconds'],
                    left2rightConverter: ['MFDateConverter', 'fromMilliseconds']
                }, {
                    leftAttr: 'REASON',
                    rightAttr: 'reason'
                }, {
                    leftAttr: 'STATE',
                    rightAttr: 'state',
                    right2leftConverter: ['MFGenericEnumConverter', 'toInteger'],
                    left2rightConverter: ['MFGenericEnumConverter', 'fromInteger', 'ReportState']
                }, {
                    leftAttr: 'AMOUNTTOTAL',
                    rightAttr: 'amountTotal'
                }, {
                    leftAttr: 'CUSTOMERID',
                    rightAttr: ['customer', 'id'],
                    rightFactory: 'CustomerFactory',
                    childIdentifier: true,
                    multiple: false
                }]
            },

            mappingNoSql: {
                rightFactory: 'ReportFactory',
                attributes: [{
                    leftAttr: 'id',
                    rightAttr: 'id',
                    identifier: true
                }, {
                    leftAttr: 'date',
                    rightAttr: 'date',
                    right2leftConverter: ['MFDateConverter', 'toMilliseconds'],
                    left2rightConverter: ['MFDateConverter', 'fromMilliseconds']
                }, {
                    leftAttr: 'reason',
                    rightAttr: 'reason'
                }, {
                    leftAttr: 'state',
                    rightAttr: 'state',
                    right2leftConverter: ['MFGenericEnumConverter', 'toInteger'],
                    left2rightConverter: ['MFGenericEnumConverter', 'fromInteger', 'ReportState']
                }, {
                    leftAttr: 'amounttotal',
                    rightAttr: 'amountTotal'
                }, {
                    leftAttr: 'customerid',
                    rightAttr: ['customer', 'id'],
                    rightFactory: 'CustomerFactory',
                    childIdentifier: true,
                    multiple: false
                }]
            }
            //@non-generated-end

        };

    }
]);