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
                var that = this;
                var mapTimeStamp = null;
                var mapObjectToSynchronizes = null;

                MFSyncActionResult.deferred = $q.defer();
                console.log('MFSyncDoSynchronization');
                MFDataModelCache.clear();
                //Test Network access
                if (MFCordova.checkConnection !== 'NONE') {

                    $q.when(MFSyncSchedulerInvocation.init()).then(function () { //Load Invocation

                        MFSyncSchedulerInvocation.addInvocations(that.getInvocationConfigs());

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


            MFSyncDoSynchronization.prototype.getInvocationConfigs = function () {

                var ListRestInvocationConfig = [];

                return ListRestInvocationConfig;

            };

        return new MFSyncDoSynchronization();
    }
]);
