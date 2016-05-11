'use strict';
/**
 * Factory class for object WordFactory
 */

//@non-generated-start[jshint-override]
//@non-generated-end

angular.module('data-daotest').factory('WordFactory', ['Word',
    //@non-generated-start[dependencies-names][X]
    //@non-generated-end

    //@non-generated-start[dependencies-classes][X]
    function(Word
        //@non-generated-end
    ) {
        return {
            createInstance: function() {
                var result = new Word();
                result.id = -1;
                result.nom = null;

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