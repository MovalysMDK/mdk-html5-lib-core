'use strict';

/**
 * Enumeration class : ReportCascade
 */

//@non-generated-start[jshint-override]
//@non-generated-end

angular.module('data-myexpense').factory('ReportCascade', ['MFAbstractEnum', function(MFAbstractEnum) {


    var ReportCascade = function ReportCascade() {
        this.entityName = 'Report';
        this.foreignEntitiesNames = {
            EXPENSES: 'expenses',
            CUSTOMER: 'customer'
        };
    };
    MFAbstractEnum.defineEnum(ReportCascade, ['EXPENSES', 'CUSTOMER']);

    return ReportCascade;
}]);