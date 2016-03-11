'use strict';

angular.module('data-myexpense').factory('CustomerCascade', ['MFAbstractEnum', function (MFAbstractEnum) {

    var CustomerCascade = function CustomerCascade() {
      this.mainEntityName = 'Customer';
      this.foreignEntitiesName = {REPORTS : 'reports'};
    };
    MFAbstractEnum.defineEnum(CustomerCascade, ['REPORTS']);

    return CustomerCascade;
}]);
