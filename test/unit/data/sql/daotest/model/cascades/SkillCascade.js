'use strict';

/**
* Enumeration class : SkillCascade
*/

//@non-generated-start[jshint-override]
//@non-generated-end

angular.module('data-daotest-sql').factory('SkillCascade', ['MFAbstractEnum', function (MFAbstractEnum)
{


var SkillCascade = function SkillCascade() {
this.entityName = 'Skill'; 
this.foreignEntitiesNames = {EMPLOYEES: 'employees'};
 };
MFAbstractEnum.defineEnum(SkillCascade, ['EMPLOYEES']);

return SkillCascade;
}]);
