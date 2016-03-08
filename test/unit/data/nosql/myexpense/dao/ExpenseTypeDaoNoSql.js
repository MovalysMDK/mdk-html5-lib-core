'use strict';
/**
 * 
 *
 * <p>Copyright (c) 2010</p>
 * <p>Company: Sopra Steria</p>
 *
 */

angular.module('data-myexpense').factory('ExpenseTypeDaoNoSql', ['ExpenseTypeDaoMapping', 'MFDaoNoSqlAbstract', 'MFUtils',
    function(ExpenseTypeDaoMapping, MFDaoNoSqlAbstract, MFUtils
    ) {

        var ExpenseTypeDaoNoSql = function ExpenseTypeDaoNoSql() {
            // Constructor
            ExpenseTypeDaoNoSql._Parent.call(this, 'ExpenseType');
            //@non-generated-start[constructor][X]
            this.lastId = null;
            this.mapping = ExpenseTypeDaoMapping.mappingNoSql;
            this.syncDisabled = false;
            this.objectStoreName = 'ExpenseType';
            this.cascadeDefinition = {};

        };

        MFUtils.extendFromInstance(ExpenseTypeDaoNoSql, MFDaoNoSqlAbstract);


        return new ExpenseTypeDaoNoSql();
    }
]);