'use strict';

/**
* Enumeration class : ActiviteCascade
*/

//@non-generated-start[jshint-override]
//@non-generated-end

angular.module('data-daotest-sql').factory('ActiviteCascade', ['MFAbstractEnum', function (MFAbstractEnum)
{


var ActiviteCascade = function ActiviteCascade() {
this.entityName = 'Activite'; 
this.foreignEntitiesNames = {AGENCE4: 'agence4',AGENCE1: 'agence1'};
 };
MFAbstractEnum.defineEnum(ActiviteCascade, ['AGENCE4','AGENCE1']);

return ActiviteCascade;
}]);
