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

angular.module('data-daotest').factory('WordDaoNoSql', ['WordDaoMapping', 'MFDaoNoSqlAbstract', 'MFUtils',
    //@non-generated-start[dependencies-names][X]
    //@non-generated-end

    //@non-generated-start[dependencies-classes][X]
    function(WordDaoMapping, MFDaoNoSqlAbstract, MFUtils
        //@non-generated-end
    ) {

        var WordDaoNoSql = function WordDaoNoSql() {
            // Constructor
            WordDaoNoSql._Parent.call(this, 'Word');
            //@non-generated-start[constructor][X]
            this.lastId = null;
            this.mapping = WordDaoMapping.mappingNoSql;
            this.syncDisabled = false;
            this.objectStoreName = 'Word';
            this.cascadeDefinition = {};

            //@non-generated-end
        };

        MFUtils.extendFromInstance(WordDaoNoSql, MFDaoNoSqlAbstract);



        return new WordDaoNoSql();
    }
]);