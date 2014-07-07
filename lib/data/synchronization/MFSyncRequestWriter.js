/**
 * ResetBase
 * Created by Francois Cabelguen on 07/04/14.
 */

'use strict';
angular.module('mfcore').factory('MFSyncRequestWriter', ['MFSyncPromiseProvider', 'MFSyncReferentialEntitiesRequestBuilder', function($qSync, MFSyncReferentialEntitiesRequestBuilder) {

        var MFSyncRequestWriter = function MFSyncRequestWriter() {

            this.requestBuilder = [];
            this.requestEntityBuilder = [];

            this.requestBuilder.push(new MFSyncReferentialEntitiesRequestBuilder());

        };

        MFSyncRequestWriter.prototype.addEntityRequestBuilder = function(p_oSyncEntityRequestBuilder){

            this.requestEntityBuilder.push(p_oSyncEntityRequestBuilder);

        };

        MFSyncRequestWriter.prototype.addRequestBuilder = function(p_oSyncRequestBuilder){

            this.requestBuilder.push(p_oSyncRequestBuilder);

        };

        MFSyncRequestWriter.prototype.prepare = function(p_oContext){

            var i=0;
            var tabPromiseBuildRequest = [];
            //loop requestBuilder
            for(i=0;i< this.requestBuilder.length;i++){
                tabPromiseBuildRequest.push(this.requestBuilder[i].buildRequest(p_oContext));
            }

            //loop requestEntityBuilder
            for(i=0;i< this.requestEntityBuilder.length;i++){
                tabPromiseBuildRequest.push(this.requestEntityBuilder[i].buildRequest(p_oContext));
            }

            return $qSync.all(tabPromiseBuildRequest);

        };

        return MFSyncRequestWriter;

}]);