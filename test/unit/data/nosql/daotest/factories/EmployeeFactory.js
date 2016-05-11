'use strict';
/**
 * Factory class for object EmployeeFactory
 */

//@non-generated-start[jshint-override]
//@non-generated-end

angular.module('data-daotest').factory('EmployeeFactory', ['Employee', 'MFPhotoFactory',
    //@non-generated-start[dependencies-names][X]
    //@non-generated-end

    //@non-generated-start[dependencies-classes][X]
    function(Employee, MFPhotoFactory
        //@non-generated-end
    ) {
        return {
            createInstance: function() {
                var result = new Employee();
                result.id = -1;
                result.firstName = null;
                result.lastName = null;
                result.photo = MFPhotoFactory.createInstance();
                result.skills = [];
                result.reservations = [];

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