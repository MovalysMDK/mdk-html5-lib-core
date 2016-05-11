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

angular.module('data-daotest').factory('EmplSkillDaoMapping', [
    //@non-generated-start[dependencies-names][X]
    //@non-generated-end

    //@non-generated-start[dependencies-classes][X]
    function(
        //@non-generated-end
    ) {

        return {

            //@non-generated-start[mapping][X]
            mappingSql: {
                rightFactory: 'EmplSkillFactory',
                attributes: [{
                    leftAttr: 'EMPLOYEEID',
                    rightAttr: 'employeeId',
                    identifier: true
                }]
            },

            mappingNoSql: {
                rightFactory: 'EmplSkillFactory',
                attributes: [{
                    leftAttr: 'employeeId',
                    rightAttr: 'employeeId',
                    identifier: true
                }]
            }
            //@non-generated-end

        };

    }
]);