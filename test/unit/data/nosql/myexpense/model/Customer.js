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

angular.module('data-myexpense').factory('Customer', ['MFAbstractEntity', 'MFUtils',
    //@non-generated-start[dependencies-names][X]
    //@non-generated-end

    //@non-generated-start[dependencies-classes][X]
    function(MFAbstractEntity, MFUtils
        //@non-generated-end
    ) {

        var Customer = function Customer() {


            Customer._Parent.call(this);

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
             * <p>Attribute NAME</p>
             * <p> type=String mandatory=true</p>
             */

            var _name = null;

            /**
             * 
             * 
             * <p>Attribute </p>
             * <p> type=MFAddressLocation mandatory=true</p>
             */

            var _address = null;

            /**
             * 
             * 
             * <p>Cascade REPORTS</p>
             * 
            	 type de relation
            	<p>Relation OneToMany</p>
            	objet cible
            	<p> targetEntity=Report
            	obligatoire
            	
            	proprietaire de la relation
            	 relationOwner=true
            	transient
            	 transient=false</p>
             */

            var _reports = null;


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


                'name': {
                    get: function() {

                        //@non-generated-start[getter-name]
                        //@non-generated-end
                        return _name;

                    },
                    set: function(name) {
                        _name = name;
                        //@non-generated-start[setter-name][X]
                        //@non-generated-end

                    },
                    //@non-generated-start[attribute-name-settings][X]


                    enumerable: true,
                    configurable: false
                        //@non-generated-end

                },


                'address': {
                    get: function() {

                        //@non-generated-start[getter-address]
                        //@non-generated-end
                        return _address;

                    },
                    set: function(address) {
                        _address = address;
                        //@non-generated-start[setter-address][X]
                        //@non-generated-end

                    },
                    //@non-generated-start[attribute-address-settings][X]


                    enumerable: true,
                    configurable: false
                        //@non-generated-end

                },


                'reports': {
                    get: function() {

                        //@non-generated-start[getter-reports]
                        //@non-generated-end
                        return _reports;

                    },
                    set: function(reports) {
                        _reports = reports;
                        //@non-generated-start[setter-reports][X]
                        //@non-generated-end

                    },
                    //@non-generated-start[attribute-reports-settings][X]


                    enumerable: true,
                    configurable: false
                        //@non-generated-end

                }

            });

        };
        /**
         * Inheritance of the entity
         */
        //@non-generated-start[heritage-Customer-settings][X]

        MFUtils.extend(Customer, MFAbstractEntity);
        Customer.prototype._transient = false;

        //@non-generated-end


        /**
         * Add function for the list Reports
         */
        Customer.prototype.addReports = function(obj) {
            if (this.reports === null) {
                this.reports = [];
            }

            this.reports.push(obj);
        };
        return Customer;
    }
]);