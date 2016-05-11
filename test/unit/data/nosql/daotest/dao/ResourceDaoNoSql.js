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

angular.module('data-daotest').factory('ResourceDaoNoSql', ['ResourceDaoMapping', 'MFDaoNoSqlAbstract', 'MFUtils',
    //@non-generated-start[dependencies-names][X]
    //@non-generated-end

    //@non-generated-start[dependencies-classes][X]
    function(ResourceDaoMapping, MFDaoNoSqlAbstract, MFUtils
        //@non-generated-end
    ) {

        var ResourceDaoNoSql = function ResourceDaoNoSql() {
            // Constructor
            ResourceDaoNoSql._Parent.call(this, 'Resource');
            //@non-generated-start[constructor][X]
            this.lastId = null;
            this.mapping = ResourceDaoMapping.mappingNoSql;
            this.syncDisabled = false;
            this.objectStoreName = 'Resource';
            this.cascadeDefinition = {
                reservations: {
                    cardinality: 'one-to-many',
                    foreignEntity: 'Reservation',
                    childAttrPointingParent: 'resource',
                    composite: false
                }
            };

            //@non-generated-end
        };

        MFUtils.extendFromInstance(ResourceDaoNoSql, MFDaoNoSqlAbstract);




        return new ResourceDaoNoSql();
    }
]);