'use strict';
/**
 * Factory class for object ReportFactory
 */

//@non-generated-start[jshint-override]
//@non-generated-end

angular.module('data-myexpense').factory('ReportFactory', ['Report', 'ReportState',
    //@non-generated-start[dependencies-names][X]
    //@non-generated-end

    //@non-generated-start[dependencies-classes][X]
    function(Report, ReportState
        //@non-generated-end
    ) {
        return {
            createInstance: function() {
                var result = new Report();
                result.id = -1;
                result.date = null;
                result.reason = null;
                result.state = ReportState.PENDING;
                result.amountTotal = 0;
                result.expenses = [];

                //@non-generated-start[child-instantiation-factory][X]

                // uncomment the following line (and add imports) only if you want to instantiate the child object here	
                //result.customer = CustomerFactory.createInstance();
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