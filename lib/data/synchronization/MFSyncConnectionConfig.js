/**
 * ResetBase
 * Created by Francois Cabelguen on 07/04/14.
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