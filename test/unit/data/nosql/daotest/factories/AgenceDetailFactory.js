'use strict';
/**
 * Factory class for object AgenceDetailFactory
 */

//@non-generated-start[jshint-override]
//@non-generated-end

angular.module('data-daotest').factory('AgenceDetailFactory', ['AgenceDetail',
    //@non-generated-start[dependencies-names][X]
    //@non-generated-end

    //@non-generated-start[dependencies-classes][X]
    function(AgenceDetail
        //@non-generated-end
    ) {
        return {
            createInstance: function() {
                var result = new AgenceDetail();
                result.id = -1;
                result.creation = null;
                result.notation = 10;

                //@non-generated-start[child-instantiation-factory][X]

                // uncomment the following line (and add imports) only if you want to instantiate the child object here	
                //result.agence = AgenceFactory.createInstance();
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