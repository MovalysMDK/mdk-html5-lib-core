'use strict';

/**
 * Enumeration class : AgenceCascade
 */

//@non-generated-start[jshint-override]
//@non-generated-end

angular.module('data-daotest').factory('AgenceCascade', ['MFAbstractEnum', function(MFAbstractEnum) {


    var AgenceCascade = function AgenceCascade() {
        this.entityName = 'Agence';
        this.foreignEntitiesNames = {
            ACTIVITE4: 'activite4',
            CLIENTS: 'clients',
            DETAIL: 'detail',
            ACTIVITE3: 'activite3',
            ACTIVITE2: 'activite2',
            ACTIVITE1: 'activite1',
            EMPLOYEES: 'employees',
            MAINCLIENT: 'mainClient',
            PHOTOS: 'photos'
        };
    };
    MFAbstractEnum.defineEnum(AgenceCascade, ['ACTIVITE4', 'CLIENTS', 'DETAIL', 'ACTIVITE3', 'ACTIVITE2', 'ACTIVITE1', 'EMPLOYEES', 'MAINCLIENT', 'PHOTOS']);

    return AgenceCascade;
}]);