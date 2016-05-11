'use strict';
/**
 * +ERREUR_NOEUD_POURRI_SKILL+
 *
 * <p>Copyright (c) 2010</p>
 * <p>Company: Adeuza</p>
 *
 */

//@non-generated-start[jshint-override]
//@non-generated-end

angular.module('data-daotest').factory('Skill', ['MFAbstractEntity', 'MFUtils',
    //@non-generated-start[dependencies-names][X]
    //@non-generated-end

    //@non-generated-start[dependencies-classes][X]
    function(MFAbstractEntity, MFUtils
        //@non-generated-end
    ) {

        var Skill = function Skill() {


            Skill._Parent.call(this);

            /**
             * 
             * 
             * <p>Attribute ID</p>
             * <p> type=long mandatory=true</p>
             */

            var _id = null;

            /**
             * 
             * 
             * <p>Attribute LABEL</p>
             * <p> type=String mandatory=true</p>
             */

            var _label = null;

            /**
             * 
             * 
             * <p>Cascade EMPLOYEES</p>
             * 
            	 type de relation
            	<p>Relation ManyToMany</p>
            	objet cible
            	<p> targetEntity=Employee
            	obligatoire
            	
            	proprietaire de la relation
            	 relationOwner=false
            	transient
            	 transient=false</p>
             */

            var _employees = null;


            //@non-generated-start[attributes]
            //@non-generated-end
            /**
             * define and initialize all of the attributes of the class   
             */
            Object.defineProperties(this, {

                'id': {
                    get: function() {

                        //@non-generated-start[getter-id]
                        //@non-generated-end
                        return _id;

                    },
                    set: function(id) {
                        _id = id;
                        //@non-generated-start[setter-id][X]
                        //@non-generated-end

                    },
                    //@non-generated-start[attribute-id-settings][X]


                    enumerable: true,
                    configurable: false
                        //@non-generated-end

                },

                'idToString': {
                    get: function() {
                        return _id;
                    },
                    enumerable: false,
                    configurable: false
                },


                'label': {
                    get: function() {

                        //@non-generated-start[getter-label]
                        //@non-generated-end
                        return _label;

                    },
                    set: function(label) {
                        _label = label;
                        //@non-generated-start[setter-label][X]
                        //@non-generated-end

                    },
                    //@non-generated-start[attribute-label-settings][X]


                    enumerable: true,
                    configurable: false
                        //@non-generated-end

                },


                'employees': {
                    get: function() {

                        //@non-generated-start[getter-employees]
                        //@non-generated-end
                        return _employees;

                    },
                    set: function(employees) {
                        _employees = employees;
                        //@non-generated-start[setter-employees][X]
                        //@non-generated-end

                    },
                    //@non-generated-start[attribute-employees-settings][X]


                    enumerable: true,
                    configurable: false
                        //@non-generated-end

                }

            });

        };
        /**
         * Inheritance of the entity
         */
        //@non-generated-start[heritage-Skill-settings][X]

        MFUtils.extend(Skill, MFAbstractEntity);
        Skill.prototype._transient = false;

        //@non-generated-end


        /**
         * Add function for the list Employees
         */
        Skill.prototype.addEmployees = function(obj) {
            if (this.employees === null) {
                this.employees = [];
            }

            this.employees.push(obj);
        };

        //@non-generated-start[functions]
        //@non-generated-end

        return Skill;
    }
]);