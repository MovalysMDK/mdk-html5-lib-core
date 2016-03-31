'use strict';

/**
* Enumeration class : AgenceDetailCascade
*/

//@non-generated-start[jshint-override]
//@non-generated-end

angular.module('data-daotest-sql').factory('AgenceDetailCascade', ['MFAbstractEnum', function (MFAbstractEnum)
{


var AgenceDetailCascade = function AgenceDetailCascade() {
this.entityName = 'AgenceDetail'; 
this.foreignEntitiesNames = {AGENCE: 'agence'};
 };
MFAbstractEnum.defineEnum(AgenceDetailCascade, ['AGENCE']);

return AgenceDetailCascade;
}]);
