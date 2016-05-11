'use strict';
/**
* Factory class for object ResourceFactory
*/

//@non-generated-start[jshint-override]
//@non-generated-end

angular.module('data-daotest-sql').factory('ResourceFactory', ['Resource', 'ResourceType',
//@non-generated-start[dependencies-names][X]
//@non-generated-end

//@non-generated-start[dependencies-classes][X]
function(Resource, ResourceType
//@non-generated-end
)
{
return {
 createInstance: function () {
 var result = new Resource();
result.id = -1;
result.label = null;
result.enable = true;
result.resourceType = ResourceType.MATERIAL;
result.reservations = [];

//@non-generated-start[child-instantiation-factory][X]
//@non-generated-end

//@non-generated-start[createInstance]
//@non-generated-end

return result;

 }

//@non-generated-start[functions]
//@non-generated-end
};
}]);
