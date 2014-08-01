/**
 * ResetBase
 * Created by Francois Cabelguen on 07/04/14.
 */

'use strict';
angular.module('mfcore').factory('MFSyncInvocationConfig', ['$q',
    function ($q) {

        var MFSyncInvocationConfig = function MFSyncInvocationConfig() {

            this.requestWriterTable = null;
            this.responseReaderTable = null;

        };

        MFSyncInvocationConfig.prototype.setRequestWriter = function (p_oRestRequestWriter) {

            this.requestWriterTable = p_oRestRequestWriter;

        };

        MFSyncInvocationConfig.prototype.setResponseReader = function (p_oRestResponseReader) {

            this.responseReaderTable = p_oRestResponseReader;

        };

        MFSyncInvocationConfig.prototype.getRequestWriter = function () {
            return this.requestWriterTable;
        };

        MFSyncInvocationConfig.prototype.getResponseReader = function () {
            return this.responseReaderTable;
        };

        return MFSyncInvocationConfig;

    }]);