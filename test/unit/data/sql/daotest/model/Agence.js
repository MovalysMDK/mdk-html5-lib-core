'use strict';
/**
 * +ERREUR_NOEUD_POURRI_AGENCE+
 *
 * <p>Copyright (c) 2010</p>
 * <p>Company: Adeuza</p>
 *
 */

//@non-generated-start[jshint-override]
//@non-generated-end

angular.module('data-daotest-sql').factory('Agence', ['MFAbstractEntity', 'MFUtils',
//@non-generated-start[dependencies-names][X]
//@non-generated-end

//@non-generated-start[dependencies-classes][X]
    function (MFAbstractEntity, MFUtils
              //@non-generated-end
    ) {

        var Agence = function Agence() {


            Agence._Parent.call(this);

            /**
             *
             *
             * <p>Attribute ID</p>
             * <p> type=long mandatory=true</p>
             */

            var _id = null;

            /**
             * ERREUR_ATT_POURRI_AGENCE_NOM
             *
             * <p>Attribute NOM</p>
             * <p> type=String mandatory=true unique=true</p>
             */

            var _nom = null;

            /**
             *
             *
             * <p>Attribute RUE</p>
             * <p> type=String mandatory=true</p>
             */

            var _rue = null;

            /**
             *
             *
             * <p>Attribute CODEPOSTAL</p>
             * <p> type=String mandatory=true</p>
             */

            var _codepostal = null;

            /**
             *
             *
             * <p>Attribute VILLE</p>
             * <p> type=String mandatory=true</p>
             */

            var _ville = null;

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
             * <p>Attribute WEBSITE</p>
             * <p> type=String mandatory=true</p>
             */

            var _website = null;

            /**
             *
             *
             * <p>Attribute PHONE</p>
             * <p> type=String mandatory=true</p>
             */

            var _phone = null;

            /**
             *
             *
             * <p>Attribute DECIMAL</p>
             * <p> type=Double mandatory=true</p>
             */

            var _decimal = null;

            /**
             *
             *
             * <p>Cascade ACTIVITE4</p>
             *
             type de relation
             <p>Relation ManyToOne</p>
             objet cible
             <p> targetEntity=Activite
             obligatoire
             mandatory=true
             proprietaire de la relation
             relationOwner=true
             transient
             transient=false</p>
             */

            var _activite4 = null;

            /**
             *
             *
             * <p>Cascade CLIENTS</p>
             *
             type de relation
             <p>Relation OneToMany</p>
             objet cible
             <p> targetEntity=Client
             obligatoire

             proprietaire de la relation
             relationOwner=true
             transient
             transient=false</p>
             */

            var _clients = null;

            /**
             *
             *
             * <p>Cascade DETAIL</p>
             *
             type de relation
             <p>Relation OneToOne</p>
             objet cible
             <p> targetEntity=AgenceDetail
             obligatoire
             mandatory=true
             proprietaire de la relation
             relationOwner=true
             transient
             transient=false</p>
             */

            var _detail = null;

            /**
             *
             *
             * <p>Cascade ACTIVITE3</p>
             *
             type de relation
             <p>Relation ManyToOne</p>
             objet cible
             <p> targetEntity=Activite
             obligatoire
             mandatory=true
             proprietaire de la relation
             relationOwner=true
             transient
             transient=false</p>
             */

            var _activite3 = null;

            /**
             *
             *
             * <p>Cascade ACTIVITE2</p>
             *
             type de relation
             <p>Relation ManyToOne</p>
             objet cible
             <p> targetEntity=Activite
             obligatoire
             mandatory=false
             proprietaire de la relation
             relationOwner=true
             transient
             transient=false</p>
             */

            var _activite2 = null;

            /**
             *
             *
             * <p>Cascade ACTIVITE1</p>
             *
             type de relation
             <p>Relation ManyToOne</p>
             objet cible
             <p> targetEntity=Activite
             obligatoire
             mandatory=false
             proprietaire de la relation
             relationOwner=true
             transient
             transient=false</p>
             */

            var _activite1 = null;

            /**
             *
             *
             * <p>Cascade EMPLOYEES</p>
             *
             type de relation
             <p>Relation OneToMany</p>
             objet cible
             <p> targetEntity=Employee
             obligatoire

             proprietaire de la relation
             relationOwner=true
             transient
             transient=false</p>
             */

            var _employees = null;

            /**
             *
             *
             * <p>Cascade MAINCLIENT</p>
             *
             type de relation
             <p>Relation OneToOne</p>
             objet cible
             <p> targetEntity=Client
             obligatoire
             mandatory=true
             proprietaire de la relation
             relationOwner=true
             transient
             transient=false</p>
             */

            var _mainClient = null;

            /**
             *
             *
             * <p>Cascade PHOTOS</p>
             *
             type de relation
             <p>Relation OneToMany</p>
             objet cible
             <p> targetEntity=AgencePhotos
             obligatoire

             proprietaire de la relation
             relationOwner=true
             transient
             transient=false</p>
             */

            var _photos = null;


//@non-generated-start[attributes]
//@non-generated-end
            /**
             * define and initialize all of the attributes of the class
             */Object.defineProperties(this, {

                'id': {
                    get: function () {

//@non-generated-start[getter-id]
//@non-generated-end
                        return _id;

                    },
                    set: function (id) {
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
                    get: function () {
                        return _id;
                    },
                    enumerable: false,
                    configurable: false
                },


                'nom': {
                    get: function () {

//@non-generated-start[getter-nom]
//@non-generated-end
                        return _nom;

                    },
                    set: function (nom) {
                        _nom = nom;
//@non-generated-start[setter-nom][X]
//@non-generated-end

                    },
//@non-generated-start[attribute-nom-settings][X]


                    enumerable: true,
                    configurable: false
//@non-generated-end

                },


                'rue': {
                    get: function () {

//@non-generated-start[getter-rue]
//@non-generated-end
                        return _rue;

                    },
                    set: function (rue) {
                        _rue = rue;
//@non-generated-start[setter-rue][X]
//@non-generated-end

                    },
//@non-generated-start[attribute-rue-settings][X]


                    enumerable: true,
                    configurable: false
//@non-generated-end

                },


                'codepostal': {
                    get: function () {

//@non-generated-start[getter-codepostal]
//@non-generated-end
                        return _codepostal;

                    },
                    set: function (codepostal) {
                        _codepostal = codepostal;
//@non-generated-start[setter-codepostal][X]
//@non-generated-end

                    },
//@non-generated-start[attribute-codepostal-settings][X]


                    enumerable: true,
                    configurable: false
//@non-generated-end

                },


                'ville': {
                    get: function () {

//@non-generated-start[getter-ville]
//@non-generated-end
                        return _ville;

                    },
                    set: function (ville) {
                        _ville = ville;
//@non-generated-start[setter-ville][X]
//@non-generated-end

                    },
//@non-generated-start[attribute-ville-settings][X]


                    enumerable: true,
                    configurable: false
//@non-generated-end

                },


                'position': {
                    get: function () {

//@non-generated-start[getter-position]
//@non-generated-end
                        return _position;

                    },
                    set: function (position) {
                        _position = position;
//@non-generated-start[setter-position][X]
//@non-generated-end

                    },
//@non-generated-start[attribute-position-settings][X]


                    enumerable: true,
                    configurable: false
//@non-generated-end

                },


                'website': {
                    get: function () {

//@non-generated-start[getter-website]
//@non-generated-end
                        return _website;

                    },
                    set: function (website) {
                        _website = website;
//@non-generated-start[setter-website][X]
//@non-generated-end

                    },
//@non-generated-start[attribute-website-settings][X]


                    enumerable: true,
                    configurable: false
//@non-generated-end

                },


                'phone': {
                    get: function () {

//@non-generated-start[getter-phone]
//@non-generated-end
                        return _phone;

                    },
                    set: function (phone) {
                        _phone = phone;
//@non-generated-start[setter-phone][X]
//@non-generated-end

                    },
//@non-generated-start[attribute-phone-settings][X]


                    enumerable: true,
                    configurable: false
//@non-generated-end

                },


                'decimal': {
                    get: function () {

//@non-generated-start[getter-decimal]
//@non-generated-end
                        return _decimal;

                    },
                    set: function (decimal) {
                        _decimal = decimal;
//@non-generated-start[setter-decimal][X]
//@non-generated-end

                    },
//@non-generated-start[attribute-decimal-settings][X]


                    enumerable: true,
                    configurable: false
//@non-generated-end

                },


                'activite4': {
                    get: function () {

//@non-generated-start[getter-activite4]
//@non-generated-end
                        return _activite4;

                    },
                    set: function (activite4) {
                        _activite4 = activite4;
//@non-generated-start[setter-activite4][X]
//@non-generated-end

                    },
//@non-generated-start[attribute-activite4-settings][X]


                    enumerable: true,
                    configurable: false
//@non-generated-end

                },


                'clients': {
                    get: function () {

//@non-generated-start[getter-clients]
//@non-generated-end
                        return _clients;

                    },
                    set: function (clients) {
                        _clients = clients;
//@non-generated-start[setter-clients][X]
//@non-generated-end

                    },
//@non-generated-start[attribute-clients-settings][X]


                    enumerable: true,
                    configurable: false
//@non-generated-end

                },


                'detail': {
                    get: function () {

//@non-generated-start[getter-detail]
//@non-generated-end
                        return _detail;

                    },
                    set: function (detail) {
                        _detail = detail;
//@non-generated-start[setter-detail][X]
//@non-generated-end

                    },
//@non-generated-start[attribute-detail-settings][X]


                    enumerable: true,
                    configurable: false
//@non-generated-end

                },


                'activite3': {
                    get: function () {

//@non-generated-start[getter-activite3]
//@non-generated-end
                        return _activite3;

                    },
                    set: function (activite3) {
                        _activite3 = activite3;
//@non-generated-start[setter-activite3][X]
//@non-generated-end

                    },
//@non-generated-start[attribute-activite3-settings][X]


                    enumerable: true,
                    configurable: false
//@non-generated-end

                },


                'activite2': {
                    get: function () {

//@non-generated-start[getter-activite2]
//@non-generated-end
                        return _activite2;

                    },
                    set: function (activite2) {
                        _activite2 = activite2;
//@non-generated-start[setter-activite2][X]
//@non-generated-end

                    },
//@non-generated-start[attribute-activite2-settings][X]


                    enumerable: true,
                    configurable: false
//@non-generated-end

                },


                'activite1': {
                    get: function () {

//@non-generated-start[getter-activite1]
//@non-generated-end
                        return _activite1;

                    },
                    set: function (activite1) {
                        _activite1 = activite1;
//@non-generated-start[setter-activite1][X]
//@non-generated-end

                    },
//@non-generated-start[attribute-activite1-settings][X]


                    enumerable: true,
                    configurable: false
//@non-generated-end

                },


                'employees': {
                    get: function () {

//@non-generated-start[getter-employees]
//@non-generated-end
                        return _employees;

                    },
                    set: function (employees) {
                        _employees = employees;
//@non-generated-start[setter-employees][X]
//@non-generated-end

                    },
//@non-generated-start[attribute-employees-settings][X]


                    enumerable: true,
                    configurable: false
//@non-generated-end

                },


                'mainClient': {
                    get: function () {

//@non-generated-start[getter-mainClient]
//@non-generated-end
                        return _mainClient;

                    },
                    set: function (mainClient) {
                        _mainClient = mainClient;
//@non-generated-start[setter-mainClient][X]
//@non-generated-end

                    },
//@non-generated-start[attribute-mainClient-settings][X]


                    enumerable: true,
                    configurable: false
//@non-generated-end

                },


                'photos': {
                    get: function () {

//@non-generated-start[getter-photos]
//@non-generated-end
                        return _photos;

                    },
                    set: function (photos) {
                        _photos = photos;
//@non-generated-start[setter-photos][X]
//@non-generated-end

                    },
//@non-generated-start[attribute-photos-settings][X]


                    enumerable: true,
                    configurable: false
//@non-generated-end

                }

            });

        };
        /**
         * Inheritance of the entity
         */
//@non-generated-start[heritage-Agence-settings][X]

        MFUtils.extend(Agence, MFAbstractEntity);
        Agence.prototype._transient = false;

//@non-generated-end


        /**
         * Add function for the list Clients
         */
        Agence.prototype.addClients = function (obj) {
            if (this.clients === null) {
                this.clients = [];
            }

            this.clients.push(obj);
        };


        /**
         * Add function for the list Employees
         */
        Agence.prototype.addEmployees = function (obj) {
            if (this.employees === null) {
                this.employees = [];
            }

            this.employees.push(obj);
        };


        /**
         * Add function for the list Photos
         */
        Agence.prototype.addPhotos = function (obj) {
            if (this.photos === null) {
                this.photos = [];
            }

            this.photos.push(obj);
        };

//@non-generated-start[functions]
//@non-generated-end

        return Agence;
    }]);
