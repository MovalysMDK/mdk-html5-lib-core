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

