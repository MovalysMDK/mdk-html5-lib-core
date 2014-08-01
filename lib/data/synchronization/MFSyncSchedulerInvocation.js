/**
 * ResetBase
 * Created by Francois Cabelguen on 07/04/14.
 */

'use strict';
angular.module('mfcore').factory('MFSyncSchedulerInvocation', function () {

    var tabSyncInvocationConfig = [];

    return {

        init: function () {
            tabSyncInvocationConfig = [];
        },

        addInvocation: function (p_oSyncInvocationConfig) {
            tabSyncInvocationConfig.push(p_oSyncInvocationConfig);
        },

        addInvocations: function (p_aSyncInvocationConfig) {
            tabSyncInvocationConfig = tabSyncInvocationConfig.concat(p_aSyncInvocationConfig);
        },

        deleteInvocation: function () {
            if (tabSyncInvocationConfig.length > 0) {
                tabSyncInvocationConfig.splice(0, 1);
            }
        },

        getInvocation: function () {
            if (tabSyncInvocationConfig.length > 0) {
                return tabSyncInvocationConfig[0];
            }
            else {
                return null;
            }

        },

        checkInvocation: function () {
            return tabSyncInvocationConfig.length > 0;
        }

    };

});

