'use strict';
/**
 * +ERREUR_NOEUD_POURRI_SESSIONNAVIGATION+
 *
 * <p>Copyright (c) 2010</p>
 * <p>Company: Adeuza</p>
 *
 */

//@non-generated-start[jshint-override]
//@non-generated-end

angular.module('data-daotest').factory('SessionNavigation', ['MFAbstractEntity', 'MFUtils',
    //@non-generated-start[dependencies-names][X]
    //@non-generated-end

    //@non-generated-start[dependencies-classes][X]
    function(MFAbstractEntity, MFUtils
        //@non-generated-end
    ) {

        var SessionNavigation = function SessionNavigation() {


            SessionNavigation._Parent.call(this);

            /**
             * 
             * 
             * <p>Attribute </p>
             * <p> type=long mandatory=true</p>
             */

            var _id = null;

            /**
             * 
             * 
             * <p>Attribute </p>
             * <p> type=String mandatory=true</p>
             */

            var _criteriaFirstName = null;


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


                'criteriaFirstName': {
                    get: function() {

                        //@non-generated-start[getter-criteriaFirstName]
                        //@non-generated-end
                        return _criteriaFirstName;

                    },
                    set: function(criteriaFirstName) {
                        _criteriaFirstName = criteriaFirstName;
                        //@non-generated-start[setter-criteriaFirstName][X]
                        //@non-generated-end

                    },
                    //@non-generated-start[attribute-criteriaFirstName-settings][X]


                    enumerable: true,
                    configurable: false
                        //@non-generated-end

                }

            });

        };
        /**
         * Inheritance of the entity
         */
        //@non-generated-start[heritage-SessionNavigation-settings][X]

        MFUtils.extend(SessionNavigation, MFAbstractEntity);
        SessionNavigation.prototype._transient = true;

        //@non-generated-end

        //@non-generated-start[functions]
        //@non-generated-end

        return SessionNavigation;
    }
]);