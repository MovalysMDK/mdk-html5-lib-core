'use strict';
/**
 * 
 *
 * <p>Copyright (c) 2010</p>
 * <p>Company: Sopra Steria</p>
 *
 */

angular.module('data-myexpense').factory('CustomerDaoNoSql', ['CustomerDaoMapping', 'MFDaoNoSqlAbstract', 'MFUtils',

    function(CustomerDaoMapping,MFDaoNoSqlAbstract, MFUtils
    ) {

        var CustomerDaoNoSql = function CustomerDaoNoSql() {
            // Constructor
            CustomerDaoNoSql._Parent.call(this, 'Customer');
            //@non-generated-start[constructor][X]
            this.lastId = null;
            this.mapping = CustomerDaoMapping.mappingNoSql;
            this.syncDisabled = false;
            this.objectStoreName = 'Customer';
            this.cascadeDefinition = {
                reports: {
                    cardinality: 'one-to-many',
                    foreignEntity: 'Report',
                    childAttrPointingParent: 'customer',
                    composite: false
                }
            };

        };

        MFUtils.extendFromInstance(CustomerDaoNoSql, MFDaoNoSqlAbstract);

        return new CustomerDaoNoSql();
    }
]);