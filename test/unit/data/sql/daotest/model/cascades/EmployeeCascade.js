'use strict';

/**
* Enumeration class : EmployeeCascade
*/

//@non-generated-start[jshint-override]
//@non-generated-end

angular.module('data-daotest-sql').factory('EmployeeCascade', ['MFAbstractEnum', function (MFAbstractEnum)
{


var EmployeeCascade = function EmployeeCascade() {
this.entityName = 'Employee'; 
this.foreignEntitiesNames = {SKILLS: 'skills',AGENCE: 'agence',RESERVATIONS: 'reservations'};
 };
MFAbstractEnum.defineEnum(EmployeeCascade, ['SKILLS','AGENCE','RESERVATIONS']);

return EmployeeCascade;
}]);
