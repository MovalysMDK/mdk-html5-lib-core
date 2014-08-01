/**
 * ResetBase
 * Created by Francois Cabelguen on 07/04/14.
 */

'use strict';
angular.module('mfcore').factory('MFSyncAbstractLivingEntityRequestBuilder', ['MFUtils', 'MFSyncAbstractRequestBuilder', 'MFObjectToSynchronizeDaoProxy',
    function (MFUtils, MFSyncAbstractRequestBuilder, MFObjectToSynchronizeDaoProxy) {

        var MFSyncAbstractLivingEntityRequestBuilder = function MFSyncAbstractLivingEntityRequestBuilder() {

            MFSyncAbstractLivingEntityRequestBuilder._Parent.call(this);

        };

        MFUtils.extendFromInstance(MFSyncAbstractLivingEntityRequestBuilder, MFSyncAbstractRequestBuilder);

        MFSyncAbstractLivingEntityRequestBuilder.prototype.getObjectToSynchronize = function (p_oContext, p_sEntity) {

            return MFObjectToSynchronizeDaoProxy.getListObjectToSynchronizeByName(p_oContext, p_sEntity).then(function (objectToSynchronizes) {

                var mapObjectToSynchronizes = [];
                for (var i = 0; i < objectToSynchronizes.length; i++) {
                    if (angular.isUndefinedOrNull(mapObjectToSynchronizes[objectToSynchronizes[i].objectname])) {
                        mapObjectToSynchronizes[objectToSynchronizes[i].objectname] = [];
                    }
                    mapObjectToSynchronizes[objectToSynchronizes[i].objectname].push({id: objectToSynchronizes[i].id, objectid: objectToSynchronizes[i].objectid});
                }

                return mapObjectToSynchronizes;
            });

        };

        MFSyncAbstractLivingEntityRequestBuilder.prototype.getListIdEntity = function (p_aMapEntityToObjectToSynchronizes) {
            var listId = [];
            if (!angular.isUndefinedOrNull(p_aMapEntityToObjectToSynchronizes)) {
                for (var i = 0; i < p_aMapEntityToObjectToSynchronizes.length; i++) {
                    listId.push(p_aMapEntityToObjectToSynchronizes[i].objectid);
                }
            }


            return listId;
        };

        return MFSyncAbstractLivingEntityRequestBuilder;

    }]);