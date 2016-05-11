'use strict';
/**
* Factory class for object ActiviteFactory
*/

//@non-generated-start[jshint-override]
//@non-generated-end

angular.module('data-daotest-sql').factory('ActiviteFactory', ['Activite',
//@non-generated-start[dependencies-names][X]
//@non-generated-end

//@non-generated-start[dependencies-classes][X]
function(Activite
//@non-generated-end
)
{
return {
 createInstance: function () {
 var result = new Activite();
result.id = -1;
result.label = null;
result.agence4 = [];
result.agence1 = [];

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
