'use strict';
/**
 * Factory class for object CustomerFactory
 */

//@non-generated-start[jshint-override]
//@non-generated-end

angular.module('data-myexpense').factory('CustomerFactory', ['Customer', 'MFAddressLocationFactory',
    //@non-generated-start[dependencies-names][X]
    //@non-generated-end

    //@non-generated-start[dependencies-classes][X]
    function(Customer, MFAddressLocationFactory
        //@non-generated-end
    ) {
        return {
            createInstance: function() {
                var result = new Customer();
                result.id = -1;
                result.name = null;
                result.address = MFAddressLocationFactory.createInstance();
                result.reports = [];

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