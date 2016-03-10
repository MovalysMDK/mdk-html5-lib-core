'use strict';

/**
 * Enumeration class : ExpenseCategory
 */
//@non-generated-start[jshint-override]
//@non-generated-end
angular.module('data-myexpense').factory('ExpenseCategory', ['MFAbstractEnum', function(MFAbstractEnum) {


    var ExpenseCategory = function ExpenseCategory() {};
    MFAbstractEnum.defineEnum(ExpenseCategory, ['HOTEL', 'MEAL', 'TRAIN', 'CAR', 'OTHER']);

    return ExpenseCategory;
}]);