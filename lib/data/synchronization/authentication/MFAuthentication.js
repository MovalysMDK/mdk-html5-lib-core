'use strict';

/**
 * Created by fcabelguen on 21/05/2014.
 */

angular.module('mfcore').factory('MFAuthentication', ['$q',
    function ($q) {

        return {
            //TODO Add function: check valid token, request new token, token to insert HTTP header
            /* Si on est en Web il faut générer un id de terminal (Prefixe WEB + Login + TimeStamp en millisecond) sinon on utilise un UUID du terminal via cordova
             */

        };
    }]);
