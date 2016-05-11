'use strict';
/**
 * 
 *
 * <p>Copyright (c) 2010</p>
 * <p>Company: Adeuza</p>
 *
 */

//@non-generated-start[jshint-override]
//@non-generated-end

angular.module('data-daotest').factory('SkillDaoNoSql', [ 'SkillDaoMapping', 'MFDaoNoSqlAbstract', 'MFUtils',
    //@non-generated-start[dependencies-names][X]
    //@non-generated-end

    //@non-generated-start[dependencies-classes][X]
    function(SkillDaoMapping, MFDaoNoSqlAbstract, MFUtils
        //@non-generated-end
    ) {

        var SkillDaoNoSql = function SkillDaoNoSql() {
            // Constructor
            SkillDaoNoSql._Parent.call(this, 'Skill');
            //@non-generated-start[constructor][X]
            this.lastId = null;
            this.mapping = SkillDaoMapping.mappingNoSql;
            this.syncDisabled = false;
            this.objectStoreName = 'Skill';
            this.cascadeDefinition = {
                employees: {
                    cardinality: 'many-to-many',
                    foreignEntity: 'Employee',
                    childAttrPointingParent: 'skills',
                    composite: false
                }
            };

            //@non-generated-end
        };

        MFUtils.extendFromInstance(SkillDaoNoSql, MFDaoNoSqlAbstract);



        return new SkillDaoNoSql();
    }
]);