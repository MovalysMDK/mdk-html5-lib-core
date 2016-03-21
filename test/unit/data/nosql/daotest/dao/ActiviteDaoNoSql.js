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

angular.module('data-daotest').factory('ActiviteDaoNoSql', ['ActiviteDaoMapping', 'MFDaoNoSqlAbstract', 'MFUtils',
    //@non-generated-start[dependencies-names][X]
    //@non-generated-end

    //@non-generated-start[dependencies-classes][X]
    function(ActiviteDaoMapping, MFDaoNoSqlAbstract, MFUtils
        //@non-generated-end
    ) {

        var ActiviteDaoNoSql = function ActiviteDaoNoSql() {
            // Constructor
            ActiviteDaoNoSql._Parent.call(this, 'Activite');
            //@non-generated-start[constructor][X]
            this.lastId = null;
            this.mapping = ActiviteDaoMapping.mappingNoSql;
            this.syncDisabled = false;
            this.objectStoreName = 'Activite';
            this.cascadeDefinition = {
                agence4: {
                    cardinality: 'one-to-many',
                    foreignEntity: 'Agence',
                    childAttrPointingParent: 'activite4',
                    composite: false
                },
                agence1: {
                    cardinality: 'one-to-many',
                    foreignEntity: 'Agence',
                    childAttrPointingParent: 'activite1',
                    composite: false
                }
            };

            //@non-generated-end
        };

        MFUtils.extendFromInstance(ActiviteDaoNoSql, MFDaoNoSqlAbstract);



        return new ActiviteDaoNoSql();
    }
]);