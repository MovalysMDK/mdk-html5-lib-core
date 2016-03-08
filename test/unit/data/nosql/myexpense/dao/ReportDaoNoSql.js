'use strict';
/**
 * 
 *
 * <p>Copyright (c) 2010</p>
 * <p>Company: Sopra Steria</p>
 *
 */


angular.module('data-myexpense').factory('ReportDaoNoSql', ['ReportDaoMapping', 'MFDaoNoSqlAbstract', 'MFUtils',

    function(ReportDaoMapping, MFDaoNoSqlAbstract, MFUtils
    ) {

        var ReportDaoNoSql = function ReportDaoNoSql() {
            // Constructor
            ReportDaoNoSql._Parent.call(this, 'Report');
            //@non-generated-start[constructor][X]
            this.lastId = null;
            this.mapping = ReportDaoMapping.mappingNoSql;
            this.syncDisabled = false;
            this.objectStoreName = 'Report';
            this.cascadeDefinition = {
                expenses: {
                    cardinality: 'one-to-many',
                    foreignEntity: 'Expense',
                    childAttrPointingParent: 'report',
                    composite: false
                },
                customer: {
                    cardinality: 'many-to-one',
                    foreignEntity: 'Customer',
                    childAttrPointingParent: 'reports',
                    composite: false
                }
            };
        };

        MFUtils.extendFromInstance(ReportDaoNoSql, MFDaoNoSqlAbstract);


        return new ReportDaoNoSql();
    }
]);