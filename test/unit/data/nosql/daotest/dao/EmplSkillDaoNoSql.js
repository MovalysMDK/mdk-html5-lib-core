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

angular.module('data-daotest').factory('EmplSkillDaoNoSql', ['EmplSkillDaoMapping', 'MFDaoNoSqlAbstract', 'MFUtils',
    //@non-generated-start[dependencies-names][X]
    //@non-generated-end

    //@non-generated-start[dependencies-classes][X]
    function(EmplSkillDaoMapping, MFDaoNoSqlAbstract, MFUtils
        //@non-generated-end
    ) {

        var EmplSkillDaoNoSql = function EmplSkillDaoNoSql() {
            // Constructor
            EmplSkillDaoNoSql._Parent.call(this, 'EmplSkill');
            //@non-generated-start[constructor][X]
            this.lastId = null;
            this.mapping = EmplSkillDaoMapping.mappingNoSql;
            this.syncDisabled = false;
            this.objectStoreName = 'EmplSkill';
            this.cascadeDefinition = {};

            //@non-generated-end
        };

        MFUtils.extendFromInstance(EmplSkillDaoNoSql, MFDaoNoSqlAbstract);



        return new EmplSkillDaoNoSql();
    }
]);