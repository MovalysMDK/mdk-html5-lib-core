'use strict';
/**
 * Factory class for object ExpenseTypeFactory
 */

//@non-generated-start[jshint-override]
//@non-generated-end

angular.module('data-myexpense').factory('ExpenseTypeFactory', ['ExpenseCategory', 'ExpenseType',
    //@non-generated-start[dependencies-names][X]
    //@non-generated-end

    //@non-generated-start[dependencies-classes][X]
    function(ExpenseCategory, ExpenseType
        //@non-generated-end
    ) {
        return {
            createInstance: function() {
                var result = new ExpenseType();
                result.id = -1;
                result.description = null;
                result.amountMax = null;
                result.category = ExpenseCategory.HOTEL;

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