'use strict';
/**
 * +ERREUR_NOEUD_POURRI_AGENCEDETAIL+
 *
 * <p>Copyright (c) 2010</p>
 * <p>Company: Adeuza</p>
 *
 */

//@non-generated-start[jshint-override]
//@non-generated-end

angular.module('data-daotest').factory('AgenceDetail', ['MFAbstractEntity', 'MFUtils',
    //@non-generated-start[dependencies-names][X]
    //@non-generated-end

    //@non-generated-start[dependencies-classes][X]
    function(MFAbstractEntity, MFUtils
        //@non-generated-end
    ) {

        var AgenceDetail = function AgenceDetail() {


            AgenceDetail._Parent.call(this);

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
             * <p>Attribute CREATION</p>
             * <p> type=Timestamp mandatory=false</p>
             */

            var _creation = null;

            /**
             * 
             * 
             * <p>Attribute NOTATION</p>
             * <p> type=Double mandatory=false</p>
             */

            var _notation = null;

            /**
             * 
             * 
             * <p>Cascade AGENCE</p>
             * 
            	 type de relation
            	<p>Relation OneToOne</p>
            	objet cible
            	<p> targetEntity=Agence
            	obligatoire
            	 mandatory=true
            	proprietaire de la relation
            	 relationOwner=false
            	transient
            	 transient=false</p>
             */

            var _agence = null;


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


                'creation': {
                    get: function() {

                        //@non-generated-start[getter-creation]
                        //@non-generated-end
                        return _creation;

                    },
                    set: function(creation) {
                        _creation = creation;
                        //@non-generated-start[setter-creation][X]
                        //@non-generated-end

                    },
                    //@non-generated-start[attribute-creation-settings][X]


                    enumerable: true,
                    configurable: false
                        //@non-generated-end

                },


                'notation': {
                    get: function() {

                        //@non-generated-start[getter-notation]
                        //@non-generated-end
                        return _notation;

                    },
                    set: function(notation) {
                        _notation = notation;
                        //@non-generated-start[setter-notation][X]
                        //@non-generated-end

                    },
                    //@non-generated-start[attribute-notation-settings][X]


                    enumerable: true,
                    configurable: false
                        //@non-generated-end

                },


                'agence': {
                    get: function() {

                        //@non-generated-start[getter-agence]
                        //@non-generated-end
                        return _agence;

                    },
                    set: function(agence) {
                        _agence = agence;
                        //@non-generated-start[setter-agence][X]
                        //@non-generated-end

                    },
                    //@non-generated-start[attribute-agence-settings][X]


                    enumerable: true,
                    configurable: false
                        //@non-generated-end

                }

            });

        };
        /**
         * Inheritance of the entity
         */
        //@non-generated-start[heritage-AgenceDetail-settings][X]

        MFUtils.extend(AgenceDetail, MFAbstractEntity);
        AgenceDetail.prototype._transient = false;

        //@non-generated-end

        //@non-generated-start[functions]
        //@non-generated-end

        return AgenceDetail;
    }
]);