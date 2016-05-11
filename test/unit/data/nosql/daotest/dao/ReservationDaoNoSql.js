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

angular.module('data-daotest').factory('ReservationDaoNoSql', ['ReservationDaoMapping', 'MFDaoNoSqlAbstract', 'MFUtils',
    //@non-generated-start[dependencies-names][X]
    //@non-generated-end

    //@non-generated-start[dependencies-classes][X]
    function(ReservationDaoMapping, MFDaoNoSqlAbstract, MFUtils
        //@non-generated-end
    ) {

        var ReservationDaoNoSql = function ReservationDaoNoSql() {
            // Constructor
            ReservationDaoNoSql._Parent.call(this, 'Reservation');
            //@non-generated-start[constructor][X]
            this.lastId = null;
            this.mapping = ReservationDaoMapping.mappingNoSql;
            this.syncDisabled = false;
            this.objectStoreName = 'Reservation';
            this.cascadeDefinition = {
                resource: {
                    cardinality: 'many-to-one',
                    foreignEntity: 'Resource',
                    childAttrPointingParent: 'reservations',
                    composite: false
                },
                employe: {
                    cardinality: 'many-to-one',
                    foreignEntity: 'Employee',
                    childAttrPointingParent: 'reservations',
                    composite: false
                }
            };

            //@non-generated-end
        };

        MFUtils.extendFromInstance(ReservationDaoNoSql, MFDaoNoSqlAbstract);



        return new ReservationDaoNoSql();
    }
]);