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

angular.module('data-daotest').factory('Word', ['MFAbstractEntity', 'MFUtils',
    //@non-generated-start[dependencies-names][X]
    //@non-generated-end

    //@non-generated-start[dependencies-classes][X]
    function(MFAbstractEntity, MFUtils
        //@non-generated-end
    ) {

        var Word = function Word() {


            Word._Parent.call(this);

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
             * <p> type=String mandatory=true</p>
             */

            var _nom = null;


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

                }

            });

        };
        /**
         * Inheritance of the entity
         */
        //@non-generated-start[heritage-Word-settings][X]

        MFUtils.extend(Word, MFAbstractEntity);
        Word.prototype._transient = false;

        //@non-generated-end

        //@non-generated-start[functions]
        //@non-generated-end

        return Word;
    }
]);