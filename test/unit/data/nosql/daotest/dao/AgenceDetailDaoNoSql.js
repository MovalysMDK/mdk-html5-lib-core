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

angular.module('data-daotest').factory('AgenceDetailDaoNoSql', ['AgenceDetailDaoMapping', 'MFDaoNoSqlAbstract', 'MFUtils',
    //@non-generated-start[dependencies-names][X]
    //@non-generated-end

    //@non-generated-start[dependencies-classes][X]
    function(AgenceDetailDaoMapping, MFDaoNoSqlAbstract, MFUtils
        //@non-generated-end
    ) {

        var AgenceDetailDaoNoSql = function AgenceDetailDaoNoSql() {
            // Constructor
            AgenceDetailDaoNoSql._Parent.call(this, 'AgenceDetail');
            //@non-generated-start[constructor][X]
            this.lastId = null;
            this.mapping = AgenceDetailDaoMapping.mappingNoSql;
            this.syncDisabled = false;
            this.objectStoreName = 'AgenceDetail';
            this.cascadeDefinition = {
                agence: {
                    cardinality: 'one-to-one',
                    foreignEntity: 'Agence',
                    childAttrPointingParent: 'detail',
                    relationOwner: false,
                    composite: false
                }
            };

            //@non-generated-end
        };

        MFUtils.extendFromInstance(AgenceDetailDaoNoSql, MFDaoNoSqlAbstract);




        return new AgenceDetailDaoNoSql();
    }
]);