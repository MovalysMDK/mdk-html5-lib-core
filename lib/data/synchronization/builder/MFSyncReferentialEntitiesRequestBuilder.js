/**
 * ResetBase
 * Created by Francois Cabelguen on 07/04/14.
 */

'use strict';
angular.module('mfcore').factory('MFSyncReferentialEntitiesRequestBuilder', ['MFUtils', 'MFSyncAbstractRequestBuilder', 'MFSyncParameter', 'MFSyncRequest',
    function(MFUtils, MFSyncAbstractRequestBuilder, MFSyncParameter, MFSyncRequest) {

        var MFSyncReferentialEntitiesRequestBuilder = function MFSyncReferentialEntitiesRequestBuilder() {

            MFSyncReferentialEntitiesRequestBuilder._Parent.call(this);

        };

        MFUtils.extend(MFSyncReferentialEntitiesRequestBuilder, MFSyncAbstractRequestBuilder);

        MFSyncReferentialEntitiesRequestBuilder.prototype.buildRequest = function(p_oContext){

          //  console.log('JE SUIS LA: MFSyncReferentielEntitiesRequestBuilder buildRequest');

            return MFSyncParameter.getMap(p_oContext).then(function (mapParameterDaoProxy) {

                if(MFUtils.isAttrInObject(mapParameterDaoProxy)){

                    for (var element in mapParameterDaoProxy) {
                        if (mapParameterDaoProxy.hasOwnProperty(element)) {
                            MFSyncRequest.root[element] = mapParameterDaoProxy[element];
                        }
                    }
                }else{
                    MFSyncRequest.root.fullRequest = true;
                    MFSyncRequest.endTransaction= false;
                }
            });


        };

        return MFSyncReferentialEntitiesRequestBuilder;

}]);