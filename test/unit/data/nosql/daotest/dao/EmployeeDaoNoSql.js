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

angular.module('data-daotest').factory('EmployeeDaoNoSql', ['EmployeeDaoMapping', 'MFDaoNoSqlAbstract', 'MFUtils',
    //@non-generated-start[dependencies-names][X]
    //@non-generated-end

    //@non-generated-start[dependencies-classes][X]
    function(EmployeeDaoMapping, MFDaoNoSqlAbstract, MFUtils
        //@non-generated-end
    ) {

        var EmployeeDaoNoSql = function EmployeeDaoNoSql() {
            // Constructor
            EmployeeDaoNoSql._Parent.call(this, 'Employee');
            //@non-generated-start[constructor][X]
            this.lastId = null;
            this.mapping = EmployeeDaoMapping.mappingNoSql;
            this.syncDisabled = false;
            this.objectStoreName = 'Employee';
            this.cascadeDefinition = {
                skills: {
                    cardinality: 'many-to-many',
                    foreignEntity: 'Skill',
                    childAttrPointingParent: 'employees',
                    composite: false
                },
                agence: {
                    cardinality: 'many-to-one',
                    foreignEntity: 'Agence',
                    childAttrPointingParent: 'employees',
                    composite: false
                },
                reservations: {
                    cardinality: 'one-to-many',
                    foreignEntity: 'Reservation',
                    childAttrPointingParent: 'employe',
                    composite: false
                }
            };

            //@non-generated-end
        };

        MFUtils.extendFromInstance(EmployeeDaoNoSql, MFDaoNoSqlAbstract);



        return new EmployeeDaoNoSql();
    }
]);