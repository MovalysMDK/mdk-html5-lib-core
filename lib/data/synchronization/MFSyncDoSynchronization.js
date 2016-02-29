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
angular.module('mfcore').factory('MFSyncDoSynchronization', [
    '$q',
    'MFDeviceInfo',
    'MFSyncAction',
    'MFActionLauncher',
    'MFSyncSchedulerInvocation',
    'MFSyncActionResult',
    function ($q, MFDeviceInfo, MFSyncAction, MFActionLauncher, MFSyncSchedulerInvocation, MFSyncActionResult) {

        var MFSyncDoSynchronization = function MFSyncDoSynchronization() {
        };

        /**
         * Execute operations
         **/
        MFSyncDoSynchronization.prototype.doAction = function () {

            // var deferred = $q.defer();
            var self = this;

            MFSyncActionResult.deferred = $q.defer();
            console.log('MFSyncDoSynchronization');
            
            //Test Network access
            if (MFDeviceInfo.connectionType !== 'NONE') {

                $q.when(MFSyncSchedulerInvocation.init()).then(function () { //Load Invocation

                    MFSyncSchedulerInvocation.addInvocations(self.getInvocationConfigs());

                }).then(function () { //Start SyncAction

                    console.log('Launch Action START');
                    var actionSync = MFSyncAction.createInstance();
                    return MFActionLauncher.launchAction(actionSync, {firstRequest: true});

                }).then(function (success) {
                    console.log('Launch Action END');

                }, function (error) {
                    console.log('Launch Action END');
                    MFSyncActionResult.deferred.reject(error);
                });

            } else {
                MFSyncActionResult.deferred.reject('No network, synchronization failed');
            }

            return MFSyncActionResult.deferred.promise;

        };


        var listRestInvocationConfig = [];
        MFSyncDoSynchronization.prototype.getInvocationConfigs = function () {
            return listRestInvocationConfig;
        };

        return new MFSyncDoSynchronization();
    }
]);
