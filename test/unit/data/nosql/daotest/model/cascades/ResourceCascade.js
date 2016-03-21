'use strict';

/**
 * Enumeration class : ResourceCascade
 */

//@non-generated-start[jshint-override]
//@non-generated-end

angular.module('data-daotest').factory('ResourceCascade', ['MFAbstractEnum', function(MFAbstractEnum) {


    var ResourceCascade = function ResourceCascade() {
        this.entityName = 'Resource';
        this.foreignEntitiesNames = {
            RESERVATIONS: 'reservations'
        };
    };
    MFAbstractEnum.defineEnum(ResourceCascade, ['RESERVATIONS']);

    return ResourceCascade;
}]);