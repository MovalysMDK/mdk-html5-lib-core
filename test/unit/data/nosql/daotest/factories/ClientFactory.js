'use strict';
/**
 * Factory class for object ClientFactory
 */

//@non-generated-start[jshint-override]
//@non-generated-end

angular.module('data-daotest').factory('ClientFactory', ['Client', 'MFAddressLocationFactory',
    //@non-generated-start[dependencies-names][X]
    //@non-generated-end

    //@non-generated-start[dependencies-classes][X]
    function(Client, MFAddressLocationFactory
        //@non-generated-end
    ) {
        return {
            createInstance: function() {
                var result = new Client();
                result.id = -1;
                result.nom = null;
                result.prenom = null;
                result.telephone = null;
                result.position = MFAddressLocationFactory.createInstance();
                result.email = null;

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