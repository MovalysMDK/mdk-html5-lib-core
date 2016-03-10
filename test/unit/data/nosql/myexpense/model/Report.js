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

angular.module('data-myexpense').factory('Report', ['MFAbstractEntity', 'MFUtils',
    //@non-generated-start[dependencies-names][X]
    //@non-generated-end

    //@non-generated-start[dependencies-classes][X]
    function(MFAbstractEntity, MFUtils
        //@non-generated-end
    ) {

        var Report = function Report() {


            Report._Parent.call(this);

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
             * <p>Attribute DATE</p>
             * <p> type=Timestamp mandatory=true</p>
             */

            var _date = null;

            /**
             * 
             * 
             * <p>Attribute REASON</p>
             * <p> type=String mandatory=false</p>
             */

            var _reason = null;

            /**
             * 
             * 
             * <p>Attribute STATE</p>
             * <p> type=ReportState mandatory=false</p>
             */

            var _state = null;

            /**
             * 
             * 
             * <p>Attribute AMOUNTTOTAL</p>
             * <p> type=Double mandatory=true</p>
             */

            var _amountTotal = null;

            /**
             * 
             * 
             * <p>Cascade EXPENSES</p>
             * 
            	 type de relation
            	<p>Relation OneToMany</p>
            	objet cible
            	<p> targetEntity=Expense
            	obligatoire
            	
            	proprietaire de la relation
            	 relationOwner=true
            	transient
            	 transient=false</p>
             */

            var _expenses = null;

            /**
             * 
             * 
             * <p>Cascade CUSTOMER</p>
             * 
            	 type de relation
            	<p>Relation ManyToOne</p>
            	objet cible
            	<p> targetEntity=Customer
            	obligatoire
            	 mandatory=true
            	proprietaire de la relation
            	 relationOwner=true
            	transient
            	 transient=false</p>
             */

            var _customer = null;


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


                'date': {
                    get: function() {

                        //@non-generated-start[getter-date]
                        //@non-generated-end
                        return _date;

                    },
                    set: function(date) {
                        _date = date;
                        //@non-generated-start[setter-date][X]
                        //@non-generated-end

                    },
                    //@non-generated-start[attribute-date-settings][X]


                    enumerable: true,
                    configurable: false
                        //@non-generated-end

                },


                'reason': {
                    get: function() {

                        //@non-generated-start[getter-reason]
                        //@non-generated-end
                        return _reason;

                    },
                    set: function(reason) {
                        _reason = reason;
                        //@non-generated-start[setter-reason][X]
                        //@non-generated-end

                    },
                    //@non-generated-start[attribute-reason-settings][X]


                    enumerable: true,
                    configurable: false
                        //@non-generated-end

                },


                'state': {
                    get: function() {

                        //@non-generated-start[getter-state]
                        //@non-generated-end
                        return _state;

                    },
                    set: function(state) {
                        _state = state;
                        //@non-generated-start[setter-state][X]
                        //@non-generated-end

                    },
                    //@non-generated-start[attribute-state-settings][X]


                    enumerable: true,
                    configurable: false
                        //@non-generated-end

                },


                'amountTotal': {
                    get: function() {

                        //@non-generated-start[getter-amountTotal]
                        //@non-generated-end
                        return _amountTotal;

                    },
                    set: function(amountTotal) {
                        _amountTotal = amountTotal;
                        //@non-generated-start[setter-amountTotal][X]
                        //@non-generated-end

                    },
                    //@non-generated-start[attribute-amountTotal-settings][X]


                    enumerable: true,
                    configurable: false
                        //@non-generated-end

                },


                'expenses': {
                    get: function() {

                        //@non-generated-start[getter-expenses]
                        //@non-generated-end
                        return _expenses;

                    },
                    set: function(expenses) {
                        _expenses = expenses;
                        //@non-generated-start[setter-expenses][X]
                        //@non-generated-end

                    },
                    //@non-generated-start[attribute-expenses-settings][X]


                    enumerable: true,
                    configurable: false
                        //@non-generated-end

                },


                'customer': {
                    get: function() {

                        //@non-generated-start[getter-customer]
                        //@non-generated-end
                        return _customer;

                    },
                    set: function(customer) {
                        _customer = customer;
                        //@non-generated-start[setter-customer][X]
                        //@non-generated-end

                    },
                    //@non-generated-start[attribute-customer-settings][X]


                    enumerable: true,
                    configurable: false
                        //@non-generated-end

                }

            });

        };
        /**
         * Inheritance of the entity
         */
        //@non-generated-start[heritage-Report-settings][X]

        MFUtils.extend(Report, MFAbstractEntity);
        Report.prototype._transient = false;

        //@non-generated-end


        /**
         * Add function for the list Expenses
         */
        Report.prototype.addExpenses = function(obj) {
            if (this.expenses === null) {
                this.expenses = [];
            }

            this.expenses.push(obj);
        };
        return Report;
    }
]);