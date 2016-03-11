'use strict';

angular.module('data-myexpense').factory('ReportCascade', ['MFAbstractEnum', function (MFAbstractEnum) {

    var ReportCascade = function ReportCascade() {
      this.mainEntityName = 'Report';
      this.foreignEntitiesName = {EXPENSES : 'expenses'};
    };
    MFAbstractEnum.defineEnum(ReportCascade, ['EXPENSES']);

    return ReportCascade;
}]);
