'use strict';

/**
 * Enumeration class : ExpenseCascade
 */

//@non-generated-start[jshint-override]
//@non-generated-end

angular.module('data-myexpense').factory('ExpenseCascade', ['MFAbstractEnum', function(MFAbstractEnum) {


    var ExpenseCascade = function ExpenseCascade() {
        this.entityName = 'Expense';
        this.foreignEntitiesNames = {
            TYPE: 'type',
            REPORT: 'report'
        };
    };
    MFAbstractEnum.defineEnum(ExpenseCascade, ['TYPE', 'REPORT']);

    return ExpenseCascade;
}]);