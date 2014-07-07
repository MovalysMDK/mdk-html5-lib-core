/**
 * ResetBase
 * Created by Francois Cabelguen on 07/04/14.
 */

'use strict';
angular.module('mfcore').factory('MFSyncResponseReader', ['MFSyncPromiseProvider',
    function($qSync) {


        var MFSyncResponseReader = function MFSyncResponseReader() {

            this.responseProcessor = [];
            this.responseEntityProcessor = [];

        };

        MFSyncResponseReader.prototype.addEntityResponseProcessor = function(p_oSyncEntityResponseProcessor){

            this.responseEntityProcessor.push(p_oSyncEntityResponseProcessor);

        };

        MFSyncResponseReader.prototype.addResponseProcessor = function(p_oSyncResponseProcessor){

            this.responseProcessor.push(p_oSyncResponseProcessor);

        };

        MFSyncResponseReader.prototype.prepare = function(p_oContext){

            var i=0;
            var tabPromiseResponseProcessor = [];
            //loop responseProcessor
            for(i=0;i< this.responseProcessor.length;i++){
                tabPromiseResponseProcessor.push(this.responseProcessor[i].readResponse(p_oContext));
            }

            //loop requestEntityBuilder
            for(i=0;i< this.responseEntityProcessor.length;i++){
                tabPromiseResponseProcessor.push(this.responseEntityProcessor[i].readResponse(p_oContext));
            }

            return $qSync.all(tabPromiseResponseProcessor);

        };


        return MFSyncResponseReader;

}]);