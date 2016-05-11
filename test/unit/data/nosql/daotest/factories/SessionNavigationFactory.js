'use strict';
/**
 * Factory class for object SessionNavigationFactory
 */

//@non-generated-start[jshint-override]
//@non-generated-end

angular.module('data-daotest').factory('SessionNavigationFactory', ['SessionNavigation',
    //@non-generated-start[dependencies-names][X]
    //@non-generated-end

    //@non-generated-start[dependencies-classes][X]
    function(SessionNavigation
        //@non-generated-end
    ) {
        return {
            createInstance: function() {
                var result = new SessionNavigation();
                result.id = -1;
                result.criteriaFirstName = null;

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