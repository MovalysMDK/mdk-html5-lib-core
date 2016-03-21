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

angular.module('data-daotest').factory('ClientDaoNoSql', ['ClientDaoMapping', 'MFDaoNoSqlAbstract', 'MFUtils',
    //@non-generated-start[dependencies-names][X]
    //@non-generated-end

    //@non-generated-start[dependencies-classes][X]
    function(ClientDaoMapping, MFDaoNoSqlAbstract, MFUtils
        //@non-generated-end
    ) {

        var ClientDaoNoSql = function ClientDaoNoSql() {
            // Constructor
            ClientDaoNoSql._Parent.call(this, 'Client');
            //@non-generated-start[constructor][X]
            this.lastId = null;
            this.mapping = ClientDaoMapping.mappingNoSql;
            this.syncDisabled = false;
            this.objectStoreName = 'Client';
            this.cascadeDefinition = {
                agence: {
                    cardinality: 'many-to-one',
                    foreignEntity: 'Agence',
                    childAttrPointingParent: 'clients',
                    composite: false
                },
                agency: {
                    cardinality: 'one-to-one',
                    foreignEntity: 'Agence',
                    childAttrPointingParent: 'mainClient',
                    relationOwner: false,
                    composite: false
                }
            };

            //@non-generated-end
        };

        MFUtils.extendFromInstance(ClientDaoNoSql, MFDaoNoSqlAbstract);




        return new ClientDaoNoSql();
    }
]);