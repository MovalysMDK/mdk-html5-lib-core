'use strict';
/**
 * Factory class for object ExpenseFactory
 */

//@non-generated-start[jshint-override]
//@non-generated-end

angular.module('data-myexpense').factory('ExpenseFactory', ['Expense', 'ExpenseState', 'MFPhotoFactory',
    //@non-generated-start[dependencies-names][X]
    //@non-generated-end

    //@non-generated-start[dependencies-classes][X]
    function(Expense, ExpenseState, MFPhotoFactory
        //@non-generated-end
    ) {
        return {
            createInstance: function() {
                var result = new Expense();
                result.id = -1;
                result.description = null;
                result.amount = 0;
                result.photo = MFPhotoFactory.createInstance();
                result.state = ExpenseState.AMOUNTOK;

                //@non-generated-start[child-instantiation-factory][X]

                // uncomment the following line (and add imports) only if you want to instantiate the child object here	
                //result.type = ExpenseTypeFactory.createInstance();

                // uncomment the following line (and add imports) only if you want to instantiate the child object here	
                //result.report = ReportFactory.createInstance();
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