'use strict';

/**
 * Enumeration class : ExpenseState
 */
//@non-generated-start[jshint-override]
//@non-generated-end
angular.module('data-myexpense').factory('ExpenseState', ['MFAbstractEnum', function(MFAbstractEnum) {


    var ExpenseState = function ExpenseState() {};
    MFAbstractEnum.defineEnum(ExpenseState, ['AMOUNTOK', 'AMOUNTOVERMAX', 'AMOUNTNONE']);

    return ExpenseState;
}]);