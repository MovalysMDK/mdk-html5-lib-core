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
angular.module('mfcore').factory('MFSyncConnectionConfig', [ 'MFConfigurationService',
    function (MFConfigurationService) {

        var configHtpp = {
            method: 'POST',
            url: '',
            headers: {'Content-Type': 'application/json'},
            data: '',
            timeout: 2000
        };

        //var uniqueId = LocalCredentialService.getUniqueId();
        var uniqueId = 123456;
        var urlServer = MFConfigurationService.getValue('server_url', 'http://localhost');

        return {

            setTimeout: function (p_iTimeout) {

                configHtpp.timeout = !angular.isUndefinedOrNull(p_iTimeout) ? p_iTimeout : configHtpp.timeout;

            },

            setMethod: function () {
                //TODO setMethod
            },

            setHeaders: function () {
                //TODO setHeaders
            },

            getConnexionConfig: function () {

                //Create URL
                configHtpp.url = urlServer + uniqueId;

                return configHtpp;
            }
        };

    }]);