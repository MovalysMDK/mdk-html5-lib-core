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
angular.module('mfcore').factory('MFSyncAction', [
    'MFSyncPromiseProvider',
    'MFSyncSchedulerInvocation',
    'MFUtils',
    'MFActionLauncher',
    '$http',
    'MFBaseAction',
    'MFSyncConnectionConfig',
    'MFSyncRequest',
    'MFSyncResponse',
    'MFLocalCredentialService', 'MFSyncActionResult',
    function ($qSync, MFSyncSchedulerInvocation, MFUtils, MFActionLauncher, $http, MFBaseAction, MFSyncConnectionConfig, MFSyncRequest, MFSyncResponse, MFLocalCredentialService, MFSyncActionResult) {
        var syncAction = {


            createInstance: function () {

                var action = MFBaseAction.createInstance({
                    atomic: true,
                    database: true,
                    type: 'MFSyncAction'
                });

                /**
                 * Execute operations
                 **/
                action.doAction = function (context, params) {

                    /*
                     params:
                     object MFSyncSchedulerInvocation
                     object Response (contient les data de retour du serveur)

                     */

                    console.assert(!angular.isUndefinedOrNull(params), 'MFSyncAction.doAction() : Params should not be empty');

                    var that = this;
                    var currentInvocation = null;
                    //Init params
                    MFSyncRequest.root = {firstRequest: params.firstRequest};
                    MFSyncRequest.endTransaction = !params.firstRequest;

                    try {

                        //On recupere la premiere invocation
                        currentInvocation = MFSyncSchedulerInvocation.getInvocation();

                        if (currentInvocation) { //Si une invocation disponible on l'execute

                            $qSync.when(true).then(function () {

                                console.log('********** RESPONSE_READER **********');
                                if (MFUtils.isAttrInObject(MFSyncResponse.root)) {
                                    MFSyncRequest.root.fullRequest = false;
                                    return currentInvocation.getResponseReader().prepare(context);

                                } else if (MFLocalCredentialService.isPreviousSyncDate()) { //On verifie que l'on a eu une premiere synchro
                                    MFSyncRequest.root.fullRequest = true;
                                }

                            }).then(function () {

                                console.log('********** REQUEST_WRITER **********');
                                if (!MFSyncRequest.root.fullRequest) {
                                    return currentInvocation.getRequestWriter().prepare(context);
                                }

                            }).then(function () {

                                console.log('--------- REQUEST_SERVER ---------');

                                if (MFUtils.isAttrInObject(MFSyncRequest.root)) {

                                    var paramsHttp = MFSyncConnectionConfig.getConnexionConfig();

                                    paramsHttp.data = MFSyncRequest.root;

                                    //on ajoute si on est sur la premiere requete ou non

                                    console.log(paramsHttp);
                                    $http(paramsHttp).then(function (response) {
                                            console.log('--------- RESPONSE_SERVER ---------');
                                            MFSyncResponse.root = null;
                                            if (!MFUtils.isUndefinedOrNullOrEmpty(response)) {
                                                MFSyncResponse.root = response.data;
                                            }

                                            console.log(MFSyncResponse.root);
                                            // if( MFUtils.isAttrInObject(MFSyncResponse.root)){

                                            console.log('Launch Action Recursif');
                                            if (MFSyncRequest.endTransaction) {
                                                console.log('Launch Action Recursif: On supprime Invocation');
                                                MFSyncSchedulerInvocation.deleteInvocation();
                                            }
                                            var actionSync = syncAction.createInstance();
                                            return MFActionLauncher.launchAction(actionSync, {firstRequest: false});
                                        },
                                        function (error) {
                                            console.error('HTTP request failed', error);
                                            MFSyncActionResult.deferred.reject(error);
                                        }
                                    );
                                }

                            }).then(function () {
                                console.log('--------- END TRANSACTION ---------');
                                that.resolvePromise(null, context);
                            }, function (error) {
                                console.log('--------- ERROR TRANSACTION ---------');
                                that.rejectPromise(error, context);

                            });

                        } else { //Si pas d'invocation on quitte sans erreur
                            console.log('pas d\'invocation');
                            MFSyncActionResult.deferred.resolve('end of synchro');
                            that.resolvePromise(null, context);
                        }

                    } catch (error) {
                        that.rejectPromise(error, context);
                    }
                    return this;
                };

                return action;
            }

        };

        return syncAction;

    }
]);