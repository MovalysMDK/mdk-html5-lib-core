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

angular.module('data-daotest').factory('AgenceDaoNoSql', ['AgenceDaoMapping', 'MFDaoNoSqlAbstract', 'MFUtils',
    //@non-generated-start[dependencies-names][X]
    //@non-generated-end

    //@non-generated-start[dependencies-classes][X]
    function(AgenceDaoMapping, MFDaoNoSqlAbstract, MFUtils
        //@non-generated-end
    ) {

        var AgenceDaoNoSql = function AgenceDaoNoSql() {
            // Constructor
            AgenceDaoNoSql._Parent.call(this, 'Agence');
            //@non-generated-start[constructor][X]
            this.lastId = null;
            this.mapping = AgenceDaoMapping.mappingNoSql;
            this.syncDisabled = false;
            this.objectStoreName = 'Agence';
            this.cascadeDefinition = {
                activite4: {
                    cardinality: 'many-to-one',
                    foreignEntity: 'Activite',
                    childAttrPointingParent: 'agence4',
                    composite: false
                },
                clients: {
                    cardinality: 'one-to-many',
                    foreignEntity: 'Client',
                    childAttrPointingParent: 'agence',
                    composite: false
                },
                detail: {
                    cardinality: 'one-to-one',
                    foreignEntity: 'AgenceDetail',
                    childAttrPointingParent: 'agence',
                    relationOwner: true,
                    composite: true
                },
                activite3: {
                    cardinality: 'many-to-one',
                    foreignEntity: 'Activite',
                    composite: false
                },
                activite2: {
                    cardinality: 'many-to-one',
                    foreignEntity: 'Activite',
                    composite: false
                },
                activite1: {
                    cardinality: 'many-to-one',
                    foreignEntity: 'Activite',
                    childAttrPointingParent: 'agence1',
                    composite: false
                },
                employees: {
                    cardinality: 'one-to-many',
                    foreignEntity: 'Employee',
                    childAttrPointingParent: 'agence',
                    composite: false
                },
                mainClient: {
                    cardinality: 'one-to-one',
                    foreignEntity: 'Client',
                    childAttrPointingParent: 'agency',
                    relationOwner: true,
                    composite: false
                },
                photos: {
                    cardinality: 'one-to-many',
                    foreignEntity: 'AgencePhotos',
                    childAttrPointingParent: 'photosAgence',
                    composite: true
                }
            };

            //@non-generated-end
        };

        MFUtils.extendFromInstance(AgenceDaoNoSql, MFDaoNoSqlAbstract);



        return new AgenceDaoNoSql();
    }
]);