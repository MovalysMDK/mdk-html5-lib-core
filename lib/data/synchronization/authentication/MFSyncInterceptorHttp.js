/**
 * Copyright (C) 2016 Sopra Steria Group (movalys.support@soprasteria.com)
 *
 * This file is part of Movalys MDK.
 * Movalys MDK is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * Movalys MDK is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 * You should have received a copy of the GNU Lesser General Public License
 * along with Movalys MDK. If not, see <http://www.gnu.org/licenses/>.
 */
'use strict';

angular.module('mfcore').factory('MFSyncInterceptorHttp', ['$q', 'MFAuthentication',
    function ($q, MFAuthentication) {

        return {
            /**
             * called before sending a request (always)
             to add a header or parameter (eg authentication token)
             to query and retrieve an authentication token before the requested query
             * @param config
             * @returns {*}
             */
            request: function (config) {

                //TODO add support for authentication via MFAuthentication Service
                /*
                 Ajouter une vérification de la provenance de la requete HTTP:
                 Si correspond au serveur référencé dans la configuration, on vérifie, deux choix possibles :
                 Si on a un Token disponible on vérifie sa validité:
                 Token valide, on ajoute le token dans le header
                 Token expiré on demande un nouveau Token, on charge le nouveau Token dans le header de la requête et on envoi la requete
                 Si pas de Token on envoi la requete tel quelle et le traitement se fera sur le retour.

                 */
                /*
                 if (!SessionService.isAnonymus) {
                 config.headers['x-session-token'] = SessionService.token;
                 }
                 return config;
                 }
                 */
                /*var token = $cookieStore.get("auth");
                 config.url =  URI(config.url).addSearch({'_auth_token':token}).toString();
                 return config;
                 */
                return config;
            },

            /**
             * called if an interceptor 'request' threw an exception or returned an error promised resolved
             * @param rejection
             */
            requestError: function (rejection) {

                return rejection;
            },

            /**
             * called after receiving the response
             synchronous or asynchronous processing responses
             centralized management errors
             token authentication (post)
             * @param response
             */
            response: function (response) {


                return response;
            },

            /**
             * if an interceptor called 'response' threw an exception or returned an error promised resolved
             * @param rejection
             */
            responseError: function (rejection) {

                /*
                 Si correspond au serveur référencé dans la configuration:
                 On vérifie le retour serveur si on demande une authentification, on envoi le login et mot de passe
                 Si Retour Token on relance la requête avec le Token en Header
                 Si retour erreur d'authentification on remonte une erreur.
                 Sinon on retourne la réponse sans changement
                 */

                /*
                 // Session has expired
                 if (response.status == 419){
                 var SessionService = $injector.get('SessionService');
                 var $http = $injector.get('$http');
                 var deferred = $q.defer();

                 // Create a new session (recover the session)
                 // We use login method that logs the user in using the current credentials and
                 // returns a promise
                 SessionService.login().then(deferred.resolve, deferred.reject);

                 // When the session recovered, make the same backend call again and chain the request
                 return deferred.promise.then(function() {
                 return $http(response.config);
                 });
                 }
                 return $q.reject(response);
                 }
                 */

                return rejection;
            }

        };
    }]);
