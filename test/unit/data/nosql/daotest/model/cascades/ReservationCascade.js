'use strict';

/**
 * Enumeration class : ReservationCascade
 */

//@non-generated-start[jshint-override]
//@non-generated-end

angular.module('data-daotest').factory('ReservationCascade', ['MFAbstractEnum', function(MFAbstractEnum) {


    var ReservationCascade = function ReservationCascade() {
        this.entityName = 'Reservation';
        this.foreignEntitiesNames = {
            RESOURCE: 'resource',
            EMPLOYE: 'employe'
        };
    };
    MFAbstractEnum.defineEnum(ReservationCascade, ['RESOURCE', 'EMPLOYE']);

    return ReservationCascade;
}]);