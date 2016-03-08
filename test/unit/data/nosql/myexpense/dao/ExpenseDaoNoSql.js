'use strict';
/**
 * 
 *
 * <p>Copyright (c) 2010</p>
 * <p>Company: Sopra Steria</p>
 *
 */

angular.module('data-myexpense').factory('ExpenseDaoNoSql', ['ExpenseDaoMapping', 'MFDaoNoSqlAbstract', 'MFUtils',

    function(ExpenseDaoMapping, MFDaoNoSqlAbstract, MFUtils) {

        var ExpenseDaoNoSql = function ExpenseDaoNoSql() {
            // Constructor
            ExpenseDaoNoSql._Parent.call(this, 'Expense');
            //@non-generated-start[constructor][X]
            this.lastId = null;
            this.mapping = ExpenseDaoMapping.mappingNoSql;
            this.syncDisabled = false;
            this.objectStoreName = 'Expense';
            this.cascadeDefinition = {
                type: {
                    cardinality: 'many-to-one',
                    foreignEntity: 'ExpenseType',
                    composite: false
                },
                report: {
                    cardinality: 'many-to-one',
                    foreignEntity: 'Report',
                    childAttrPointingParent: 'expenses',
                    composite: false
                }
            };

        };

        MFUtils.extendFromInstance(ExpenseDaoNoSql, MFDaoNoSqlAbstract);



        return new ExpenseDaoNoSql();
    }
]);