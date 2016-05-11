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

angular.module('data-daotest').factory('AgencePhotosDaoNoSql', ['AgencePhotosDaoMapping', 'MFDaoNoSqlAbstract', 'MFUtils',
    //@non-generated-start[dependencies-names][X]
    //@non-generated-end

    //@non-generated-start[dependencies-classes][X]
    function(AgencePhotosDaoMapping, MFDaoNoSqlAbstract, MFUtils
        //@non-generated-end
    ) {

        var AgencePhotosDaoNoSql = function AgencePhotosDaoNoSql() {
            // Constructor
            AgencePhotosDaoNoSql._Parent.call(this, 'AgencePhotos');
            //@non-generated-start[constructor][X]
            this.lastId = null;
            this.mapping = AgencePhotosDaoMapping.mappingNoSql;
            this.syncDisabled = false;
            this.objectStoreName = 'AgencePhotos';
            this.cascadeDefinition = {
                photosAgence: {
                    cardinality: 'many-to-one',
                    foreignEntity: 'Agence',
                    childAttrPointingParent: 'photos',
                    composite: false
                }
            };

            //@non-generated-end
        };

        MFUtils.extendFromInstance(AgencePhotosDaoNoSql, MFDaoNoSqlAbstract);



        return new AgencePhotosDaoNoSql();
    }
]);