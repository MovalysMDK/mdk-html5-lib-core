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

angular.module('data-daotest').factory('ResourceDaoMapping', [
    //@non-generated-start[dependencies-names][X]
    //@non-generated-end

    //@non-generated-start[dependencies-classes][X]
    function(
        //@non-generated-end
    ) {

        return {

            //@non-generated-start[mapping][X]
            mappingSql: {
                rightFactory: 'ResourceFactory',
                attributes: [{
                    leftAttr: 'ID',
                    rightAttr: 'id',
                    identifier: true
                }, {
                    leftAttr: 'LABEL',
                    rightAttr: 'label'
                }, {
                    leftAttr: 'ENABLE',
                    rightAttr: 'enable',
                    right2leftConverter: ['MFBooleanConverter', 'toInteger'],
                    left2rightConverter: ['MFBooleanConverter', 'fromInteger']
                }, {
                    leftAttr: 'RESOURCETYPE',
                    rightAttr: 'resourceType',
                    right2leftConverter: ['MFGenericEnumConverter', 'toInteger'],
                    left2rightConverter: ['MFGenericEnumConverter', 'fromInteger', 'ResourceType']
                }]
            },

            mappingNoSql: {
                rightFactory: 'ResourceFactory',
                attributes: [{
                    leftAttr: 'id',
                    rightAttr: 'id',
                    identifier: true
                }, {
                    leftAttr: 'label',
                    rightAttr: 'label'
                }, {
                    leftAttr: 'enable',
                    rightAttr: 'enable',
                    right2leftConverter: ['MFBooleanConverter', 'toInteger'],
                    left2rightConverter: ['MFBooleanConverter', 'fromInteger']
                }, {
                    leftAttr: 'resourcetype',
                    rightAttr: 'resourceType',
                    right2leftConverter: ['MFGenericEnumConverter', 'toInteger'],
                    left2rightConverter: ['MFGenericEnumConverter', 'fromInteger', 'ResourceType']
                }]
            }
            //@non-generated-end

        };

    }
]);