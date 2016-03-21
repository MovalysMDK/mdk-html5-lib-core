'use strict';

/**
 * Enumeration class : ClientCascade
 */

//@non-generated-start[jshint-override]
//@non-generated-end

angular.module('data-daotest').factory('ClientCascade', ['MFAbstractEnum', function(MFAbstractEnum) {


    var ClientCascade = function ClientCascade() {
        this.entityName = 'Client';
        this.foreignEntitiesNames = {
            AGENCE: 'agence',
            AGENCY: 'agency'
        };
    };
    MFAbstractEnum.defineEnum(ClientCascade, ['AGENCE', 'AGENCY']);

    return ClientCascade;
}]);