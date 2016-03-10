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

angular.module('data-myexpense').factory('Expense', ['MFAbstractEntity', 'MFUtils',
    //@non-generated-start[dependencies-names][X]
    //@non-generated-end

    //@non-generated-start[dependencies-classes][X]
    function(MFAbstractEntity, MFUtils
        //@non-generated-end
    ) {

        var Expense = function Expense() {


            Expense._Parent.call(this);

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
             * <p>Attribute DESCRIPTION</p>
             * <p> type=String mandatory=true</p>
             */

            var _description = null;

            /**
             * 
             * 
             * <p>Attribute AMOUNT</p>
             * <p> type=Double mandatory=true</p>
             */

            var _amount = null;

            /**
             * 
             * 
             * <p>Attribute </p>
             * <p> type=MFPhoto mandatory=true</p>
             */

            var _photo = null;

            /**
             * 
             * 
             * <p>Attribute STATE</p>
             * <p> type=ExpenseState mandatory=true</p>
             */

            var _state = null;

            /**
             * 
             * 
             * <p>Cascade TYPE</p>
             * 
            	 type de relation
            	<p>Relation ManyToOne</p>
            	objet cible
            	<p> targetEntity=ExpenseType
            	obligatoire
            	 mandatory=true
            	proprietaire de la relation
            	 relationOwner=true
            	transient
            	 transient=false</p>
             */

            var _type = null;

            /**
             * 
             * 
             * <p>Cascade REPORT</p>
             * 
            	 type de relation
            	<p>Relation ManyToOne</p>
            	objet cible
            	<p> targetEntity=Report
            	obligatoire
            	 mandatory=true
            	proprietaire de la relation
            	 relationOwner=true
            	transient
            	 transient=false</p>
             */

            var _report = null;


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


                'description': {
                    get: function() {

                        //@non-generated-start[getter-description]
                        //@non-generated-end
                        return _description;

                    },
                    set: function(description) {
                        _description = description;
                        //@non-generated-start[setter-description][X]
                        //@non-generated-end

                    },
                    //@non-generated-start[attribute-description-settings][X]


                    enumerable: true,
                    configurable: false
                        //@non-generated-end

                },


                'amount': {
                    get: function() {

                        //@non-generated-start[getter-amount]
                        //@non-generated-end
                        return _amount;

                    },
                    set: function(amount) {
                        _amount = amount;
                        //@non-generated-start[setter-amount][X]
                        //@non-generated-end

                    },
                    //@non-generated-start[attribute-amount-settings][X]


                    enumerable: true,
                    configurable: false
                        //@non-generated-end

                },


                'photo': {
                    get: function() {

                        //@non-generated-start[getter-photo]
                        //@non-generated-end
                        return _photo;

                    },
                    set: function(photo) {
                        _photo = photo;
                        //@non-generated-start[setter-photo][X]
                        //@non-generated-end

                    },
                    //@non-generated-start[attribute-photo-settings][X]


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


                'type': {
                    get: function() {

                        //@non-generated-start[getter-type]
                        //@non-generated-end
                        return _type;

                    },
                    set: function(type) {
                        _type = type;
                        //@non-generated-start[setter-type][X]
                        //@non-generated-end

                    },
                    //@non-generated-start[attribute-type-settings][X]


                    enumerable: true,
                    configurable: false
                        //@non-generated-end

                },


                'report': {
                    get: function() {

                        //@non-generated-start[getter-report]
                        //@non-generated-end
                        return _report;

                    },
                    set: function(report) {
                        _report = report;
                        //@non-generated-start[setter-report][X]
                        //@non-generated-end

                    },
                    //@non-generated-start[attribute-report-settings][X]


                    enumerable: true,
                    configurable: false
                        //@non-generated-end

                }

            });

        };
        /**
         * Inheritance of the entity
         */
        //@non-generated-start[heritage-Expense-settings][X]

        MFUtils.extend(Expense, MFAbstractEntity);
        Expense.prototype._transient = false;

        //@non-generated-end
        return Expense;
    }
]);