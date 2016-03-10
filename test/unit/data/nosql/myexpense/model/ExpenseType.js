'use strict';
/**
 * Types of expenses, which are linked to Notes.
@see Expense
@see Note
 *
 * <p>Copyright (c) 2010</p>
 * <p>Company: Adeuza</p>
 *
 */

//@non-generated-start[jshint-override]
//@non-generated-end

angular.module('data-myexpense').factory('ExpenseType', ['MFAbstractEntity', 'MFUtils',
    //@non-generated-start[dependencies-names][X]
    //@non-generated-end

    //@non-generated-start[dependencies-classes][X]
    function(MFAbstractEntity, MFUtils
        //@non-generated-end
    ) {

        var ExpenseType = function ExpenseType() {


            ExpenseType._Parent.call(this);

            /**
             * 
             * 
             * <p>Attribute ID</p>
             * <p> type=long mandatory=true</p>
             */

            var _id = null;

            /**
		 * Generic description of the expense type.
Could be : HOTEL, MEAL, TRAIN, PARKING, CAR or OTHER.
		 * 
		 * <p>Attribute DESCRIPTION</p>
		 * <p> type=String mandatory=true</p>
		 */

            var _description = null;

            /**
             * Maximum amount generally refunded by the company, for this expense type.
             * 
             * <p>Attribute AMOUNTMAX</p>
             * <p> type=Double mandatory=false</p>
             */

            var _amountMax = null;

            /**
             * 
             * 
             * <p>Attribute CATEGORY</p>
             * <p> type=ExpenseCategory mandatory=true</p>
             */

            var _category = null;


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


                'amountMax': {
                    get: function() {

                        //@non-generated-start[getter-amountMax]
                        //@non-generated-end
                        return _amountMax;

                    },
                    set: function(amountMax) {
                        _amountMax = amountMax;
                        //@non-generated-start[setter-amountMax][X]
                        //@non-generated-end

                    },
                    //@non-generated-start[attribute-amountMax-settings][X]


                    enumerable: true,
                    configurable: false
                        //@non-generated-end

                },


                'category': {
                    get: function() {

                        //@non-generated-start[getter-category]
                        //@non-generated-end
                        return _category;

                    },
                    set: function(category) {
                        _category = category;
                        //@non-generated-start[setter-category][X]
                        //@non-generated-end

                    },
                    //@non-generated-start[attribute-category-settings][X]


                    enumerable: true,
                    configurable: false
                        //@non-generated-end

                }

            });

        };
        /**
         * Inheritance of the entity
         */
        //@non-generated-start[heritage-ExpenseType-settings][X]

        MFUtils.extend(ExpenseType, MFAbstractEntity);
        ExpenseType.prototype._transient = false;

        //@non-generated-end
        return ExpenseType;
    }
]);