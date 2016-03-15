'use strict';

/**
 * Enumeration class : CustomerCascade
 */

//@non-generated-start[jshint-override]
//@non-generated-end

angular.module('data-myexpense').factory('CustomerCascade', ['MFAbstractEnum', function(MFAbstractEnum) {


    var CustomerCascade = function CustomerCascade() {
        this.entityName = 'Customer';
        this.foreignEntitiesNames = {
            REPORTS: 'reports'
        };
    };
    MFAbstractEnum.defineEnum(CustomerCascade, ['REPORTS']);

    return CustomerCascade;
}]);