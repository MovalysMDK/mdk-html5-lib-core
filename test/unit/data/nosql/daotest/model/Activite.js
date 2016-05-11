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

angular.module('data-daotest').factory('Activite', ['MFAbstractEntity', 'MFUtils',
    //@non-generated-start[dependencies-names][X]
    //@non-generated-end

    //@non-generated-start[dependencies-classes][X]
    function(MFAbstractEntity, MFUtils
        //@non-generated-end
    ) {

        var Activite = function Activite() {


            Activite._Parent.call(this);

            /**
             * 
             * 
             * <p>Attribute ID</p>
             * <p> type=Long mandatory=true</p>
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
             * <p>Cascade AGENCE4</p>
             * 
            	 type de relation
            	<p>Relation OneToMany</p>
            	objet cible
            	<p> targetEntity=Agence
            	obligatoire
            	
            	proprietaire de la relation
            	 relationOwner=false
            	transient
            	 transient=false</p>
             */

            var _agence4 = null;

            /**
             * 
             * 
             * <p>Cascade AGENCE1</p>
             * 
            	 type de relation
            	<p>Relation OneToMany</p>
            	objet cible
            	<p> targetEntity=Agence
            	obligatoire
            	
            	proprietaire de la relation
            	 relationOwner=false
            	transient
            	 transient=false</p>
             */

            var _agence1 = null;


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


                'agence4': {
                    get: function() {

                        //@non-generated-start[getter-agence4]
                        //@non-generated-end
                        return _agence4;

                    },
                    set: function(agence4) {
                        _agence4 = agence4;
                        //@non-generated-start[setter-agence4][X]
                        //@non-generated-end

                    },
                    //@non-generated-start[attribute-agence4-settings][X]


                    enumerable: true,
                    configurable: false
                        //@non-generated-end

                },


                'agence1': {
                    get: function() {

                        //@non-generated-start[getter-agence1]
                        //@non-generated-end
                        return _agence1;

                    },
                    set: function(agence1) {
                        _agence1 = agence1;
                        //@non-generated-start[setter-agence1][X]
                        //@non-generated-end

                    },
                    //@non-generated-start[attribute-agence1-settings][X]


                    enumerable: true,
                    configurable: false
                        //@non-generated-end

                }

            });

        };
        /**
         * Inheritance of the entity
         */
        //@non-generated-start[heritage-Activite-settings][X]

        MFUtils.extend(Activite, MFAbstractEntity);
        Activite.prototype._transient = false;

        //@non-generated-end


        /**
         * Add function for the list Agence4
         */
        Activite.prototype.addAgence4 = function(obj) {
            if (this.agence4 === null) {
                this.agence4 = [];
            }

            this.agence4.push(obj);
        };


        /**
         * Add function for the list Agence1
         */
        Activite.prototype.addAgence1 = function(obj) {
            if (this.agence1 === null) {
                this.agence1 = [];
            }

            this.agence1.push(obj);
        };

        //@non-generated-start[functions]
        //@non-generated-end

        return Activite;
    }
]);