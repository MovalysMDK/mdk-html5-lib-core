'use strict';
/**
 * Factory class for object SkillFactory
 */

//@non-generated-start[jshint-override]
//@non-generated-end

angular.module('data-daotest').factory('SkillFactory', ['Skill',
    //@non-generated-start[dependencies-names][X]
    //@non-generated-end

    //@non-generated-start[dependencies-classes][X]
    function(Skill
        //@non-generated-end
    ) {
        return {
            createInstance: function() {
                var result = new Skill();
                result.id = -1;
                result.label = null;
                result.employees = [];

                //@non-generated-start[child-instantiation-factory][X]
                //@non-generated-end

                //@non-generated-start[createInstance]
                //@non-generated-end

                return result;

            }

            //@non-generated-start[functions]
            //@non-generated-end
        };
    }
]);