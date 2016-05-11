'use strict';

/**
* Enumeration class : ResourceType
*/
//@non-generated-start[jshint-override]
//@non-generated-end
angular.module('data-daotest-sql').factory('ResourceType', ['MFAbstractEnum', function (MFAbstractEnum)
{


var ResourceType = function ResourceType() {};
MFAbstractEnum.defineEnum(ResourceType, ['MATERIAL','ROOM','OTHER']);

return ResourceType;
}]);
