'use strict';
/**
 * +ERREUR_NOEUD_POURRI_CLIENT+
 *
 * <p>Copyright (c) 2010</p>
 * <p>Company: Adeuza</p>
 *
 */

//@non-generated-start[jshint-override]
//@non-generated-end

angular.module('data-daotest').factory('Client', ['MFAbstractEntity', 'MFUtils',
    //@non-generated-start[dependencies-names][X]
    //@non-generated-end

    //@non-generated-start[dependencies-classes][X]
    function(MFAbstractEntity, MFUtils
        //@non-generated-end
    ) {

        var Client = function Client() {


            Client._Parent.call(this);

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
             * <p>Attribute NOM</p>
             * <p> type=String mandatory=true unique-key=true unique-key-name=ukNomPrenom unique-key-relation=</p>
             */

            var _nom = null;

            /**
             * 
             * 
             * <p>Attribute PRENOM</p>
             * <p> type=String mandatory=true unique-key=true unique-key-name=ukNomPrenom unique-key-relation=</p>
             */

            var _prenom = null;

            /**
             * 
             * 
             * <p>Attribute TELEPHONE</p>
             * <p> type=String mandatory=true</p>
             */

            var _telephone = null;

            /**
             * 
             * 
             * <p>Attribute </p>
             * <p> type=MFAddressLocation mandatory=true</p>
             */

            var _position = null;

            /**
             * 
             * 
             * <p>Attribute EMAIL</p>
             * <p> type=String mandatory=true unique=true</p>
             */

            var _email = null;

            /**
             * 
             * 
             * <p>Cascade AGENCE</p>
             * 
            	 type de relation
            	<p>Relation ManyToOne</p>
            	objet cible
            	<p> targetEntity=Agence
            	obligatoire
            	 mandatory=false
            	proprietaire de la relation
            	 relationOwner=true
            	transient
            	 transient=false</p>
             */

            var _agence = null;

            /**
             * 
             * 
             * <p>Cascade AGENCY</p>
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

            var _agency = null;

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


                'nom': {
                    get: function() {

                        //@non-generated-start[getter-nom]
                        //@non-generated-end
                        return _nom;

                    },
                    set: function(nom) {
                        _nom = nom;
                        //@non-generated-start[setter-nom][X]
                        //@non-generated-end

                    },
                    //@non-generated-start[attribute-nom-settings][X]


                    enumerable: true,
                    configurable: false
                        //@non-generated-end

                },


                'prenom': {
                    get: function() {

                        //@non-generated-start[getter-prenom]
                        //@non-generated-end
                        return _prenom;

                    },
                    set: function(prenom) {
                        _prenom = prenom;
                        //@non-generated-start[setter-prenom][X]
                        //@non-generated-end

                    },
                    //@non-generated-start[attribute-prenom-settings][X]


                    enumerable: true,
                    configurable: false
                        //@non-generated-end

                },


                'telephone': {
                    get: function() {

                        //@non-generated-start[getter-telephone]
                        //@non-generated-end
                        return _telephone;

                    },
                    set: function(telephone) {
                        _telephone = telephone;
                        //@non-generated-start[setter-telephone][X]
                        //@non-generated-end

                    },
                    //@non-generated-start[attribute-telephone-settings][X]


                    enumerable: true,
                    configurable: false
                        //@non-generated-end

                },


                'position': {
                    get: function() {

                        //@non-generated-start[getter-position]
                        //@non-generated-end
                        return _position;

                    },
                    set: function(position) {
                        _position = position;
                        //@non-generated-start[setter-position][X]
                        //@non-generated-end

                    },
                    //@non-generated-start[attribute-position-settings][X]


                    enumerable: true,
                    configurable: false
                        //@non-generated-end

                },


                'email': {
                    get: function() {

                        //@non-generated-start[getter-email]
                        //@non-generated-end
                        return _email;

                    },
                    set: function(email) {
                        _email = email;
                        //@non-generated-start[setter-email][X]
                        //@non-generated-end

                    },
                    //@non-generated-start[attribute-email-settings][X]


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

                },                

                'agency': {
                    get: function() {

                        //@non-generated-start[getter-agency]
                        //@non-generated-end
                        return _agency;

                    },
                    set: function(agency) {
                        _agency = agency;
                        //@non-generated-start[setter-agency][X]
                        //@non-generated-end

                    },
                    //@non-generated-start[attribute-agency-settings][X]


                    enumerable: true,
                    configurable: false
                        //@non-generated-end

                }

            });

        };
        /**
         * Inheritance of the entity
         */
        //@non-generated-start[heritage-Client-settings][X]

        MFUtils.extend(Client, MFAbstractEntity);
        Client.prototype._transient = false;

        //@non-generated-end

        //@non-generated-start[functions]
        //@non-generated-end

        return Client;
    }
]);