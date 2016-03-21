'use strict';
/**
 * Factory class for object AgenceFactory
 */

//@non-generated-start[jshint-override]
//@non-generated-end

angular.module('data-daotest').factory('AgenceFactory', ['Agence', 'MFAddressLocationFactory',
    //@non-generated-start[dependencies-names][X]
    //@non-generated-end

    //@non-generated-start[dependencies-classes][X]
    function(Agence, MFAddressLocationFactory
        //@non-generated-end
    ) {
        return {
            createInstance: function() {
                var result = new Agence();
                result.id = -1;
                result.nom = null;
                result.rue = null;
                result.codepostal = null;
                result.ville = null;
                result.position = MFAddressLocationFactory.createInstance();
                result.website = null;
                result.phone = null;
                result.decimal = null;
                result.clients = [];
                result.employees = [];
                result.photos = [];

                //@non-generated-start[child-instantiation-factory][X]

                // uncomment the following line (and add imports) only if you want to instantiate the child object here	
                //result.activite4 = ActiviteFactory.createInstance();

                // uncomment the following line (and add imports) only if you want to instantiate the child object here	
                //result.detail = AgenceDetailFactory.createInstance();

                // uncomment the following line (and add imports) only if you want to instantiate the child object here	
                //result.activite3 = ActiviteFactory.createInstance();

                // uncomment the following line (and add imports) only if you want to instantiate the child object here	
                //result.activite2 = ActiviteFactory.createInstance();

                // uncomment the following line (and add imports) only if you want to instantiate the child object here	
                //result.activite1 = ActiviteFactory.createInstance();
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