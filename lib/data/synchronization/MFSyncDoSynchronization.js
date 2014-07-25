/**
 * ResetBase
 * Created by Francois Cabelguen on 07/04/14.
 */

'use strict';
angular.module('mfcore').factory('MFSyncDoSynchronization', [
    '$q',
    'MFCordova',
    'MFSyncAction',
    'MFActionLauncher',
    'MFSyncSchedulerInvocation',
'MFDataModelCache',
    'MFSyncActionResult',
    function(
        $q,
        MFCordova,
        MFSyncAction,
        MFActionLauncher,
        MFSyncSchedulerInvocation,
        MFDataModelCache,
        MFSyncActionResult
        ) {

        var MFSyncDoSynchronization = function MFSyncDoSynchronization() {};

            /**
             * Execute operations
             **/
            MFSyncDoSynchronization.prototype.doAction = function () {

               // var deferred = $q.defer();
                var self = this;

                MFSyncActionResult.deferred = $q.defer();
                console.log('MFSyncDoSynchronization');
                MFDataModelCache.clear();
                //Test Network access
                if (MFCordova.detectNetwork !== 'NONE') {

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
