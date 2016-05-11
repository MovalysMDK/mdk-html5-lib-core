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

angular.module('data-daotest').factory('AgenceDetailDaoMapping', [
    //@non-generated-start[dependencies-names][X]
    //@non-generated-end

    //@non-generated-start[dependencies-classes][X]
    function(
        //@non-generated-end
    ) {

        return {

            //@non-generated-start[mapping][X]
            mappingSql: {
                rightFactory: 'AgenceDetailFactory',
                attributes: [{
                    leftAttr: 'ID',
                    rightAttr: 'id',
                    identifier: true
                }, {
                    leftAttr: 'CREATION',
                    rightAttr: 'creation',
                    right2leftConverter: ['MFDateConverter', 'toMilliseconds'],
                    left2rightConverter: ['MFDateConverter', 'fromMilliseconds']
                }, {
                    leftAttr: 'NOTATION',
                    rightAttr: 'notation'
                }]
            },

            mappingNoSql: {
                rightFactory: 'AgenceDetailFactory',
                attributes: [{
                    leftAttr: 'id',
                    rightAttr: 'id',
                    identifier: true
                }, {
                    leftAttr: 'creation',
                    rightAttr: 'creation',
                    right2leftConverter: ['MFDateConverter', 'toMilliseconds'],
                    left2rightConverter: ['MFDateConverter', 'fromMilliseconds']
                }, {
                    leftAttr: 'notation',
                    rightAttr: 'notation'
                }]
            }
            //@non-generated-end

        };

    }
]);