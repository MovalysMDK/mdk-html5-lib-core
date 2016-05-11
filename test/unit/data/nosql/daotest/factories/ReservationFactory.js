'use strict';
/**
 * Factory class for object ReservationFactory
 */

//@non-generated-start[jshint-override]
//@non-generated-end

angular.module('data-daotest').factory('ReservationFactory', ['Reservation',
    //@non-generated-start[dependencies-names][X]
    //@non-generated-end

    //@non-generated-start[dependencies-classes][X]
    function(Reservation
        //@non-generated-end
    ) {
        return {
            createInstance: function() {
                var result = new Reservation();
                result.id = -1;
                result.startDate = null;
                result.endDate = null;

                //@non-generated-start[child-instantiation-factory][X]

                // uncomment the following line (and add imports) only if you want to instantiate the child object here	
                //result.resource = ResourceFactory.createInstance();

                // uncomment the following line (and add imports) only if you want to instantiate the child object here	
                //result.employe = EmployeeFactory.createInstance();
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