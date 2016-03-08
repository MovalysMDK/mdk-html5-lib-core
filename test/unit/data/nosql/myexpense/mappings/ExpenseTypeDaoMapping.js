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

angular.module('data-myexpense').factory('ExpenseTypeDaoMapping', [
    //@non-generated-start[dependencies-names][X]
    //@non-generated-end

    //@non-generated-start[dependencies-classes][X]
    function(
        //@non-generated-end
    ) {

        return {

            //@non-generated-start[mapping][X]
            mappingSql: {
                rightFactory: 'ExpenseTypeFactory',
                attributes: [{
                    leftAttr: 'ID',
                    rightAttr: 'id',
                    identifier: true
                }, {
                    leftAttr: 'DESCRIPTION',
                    rightAttr: 'description'
                }, {
                    leftAttr: 'AMOUNTMAX',
                    rightAttr: 'amountMax'
                }, {
                    leftAttr: 'CATEGORY',
                    rightAttr: 'category',
                    right2leftConverter: ['MFGenericEnumConverter', 'toInteger'],
                    left2rightConverter: ['MFGenericEnumConverter', 'fromInteger', 'ExpenseCategory']
                }]
            },

            mappingNoSql: {
                rightFactory: 'ExpenseTypeFactory',
                attributes: [{
                    leftAttr: 'id',
                    rightAttr: 'id',
                    identifier: true
                }, {
                    leftAttr: 'description',
                    rightAttr: 'description'
                }, {
                    leftAttr: 'amountmax',
                    rightAttr: 'amountMax'
                }, {
                    leftAttr: 'category',
                    rightAttr: 'category',
                    right2leftConverter: ['MFGenericEnumConverter', 'toInteger'],
                    left2rightConverter: ['MFGenericEnumConverter', 'fromInteger', 'ExpenseCategory']
                }]
            }
            //@non-generated-end

        };

    }
]);