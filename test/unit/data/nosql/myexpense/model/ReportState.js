'use strict';

/**
 * Enumeration class : ReportState
 */
//@non-generated-start[jshint-override]
//@non-generated-end
angular.module('data-myexpense').factory('ReportState', ['MFAbstractEnum', function(MFAbstractEnum) {


    var ReportState = function ReportState() {};
    MFAbstractEnum.defineEnum(ReportState, ['PENDING', 'ACCEPTED', 'REFUSED']);

    return ReportState;
}]);