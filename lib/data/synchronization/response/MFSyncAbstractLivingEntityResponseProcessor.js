/**
 * ResetBase
 * Created by Francois Cabelguen on 07/04/14.
 */

'use strict';
angular.module('mfcore').factory('MFSyncAbstractLivingEntityResponseProcessor', ['MFUtils', 'MFSyncAbstractResponseProcessor', 'MFObjectToSynchronizeDaoProxy',
    function (MFUtils, MFSyncAbstractResponseProcessor, MFObjectToSynchronizeDaoProxy) {

        var MFSyncAbstractLivingEntityResponseProcessor = function MFSyncAbstractLivingEntityResponseProcessor() {

            MFSyncAbstractLivingEntityResponseProcessor._Parent.call(this);

            this.entityName = null;
        };

        MFUtils.extend(MFSyncAbstractLivingEntityResponseProcessor, MFSyncAbstractResponseProcessor);

        MFSyncAbstractLivingEntityResponseProcessor.prototype.getObjectToSynchronize = function (p_oContext) {

            return MFObjectToSynchronizeDaoProxy.getListObjectToSynchronizeByName(p_oContext, this.entityName).then(function (objectToSynchronizes) {

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

        MFSyncAbstractLivingEntityResponseProcessor.prototype.deleteObjectToSynchronizeByIdEntity = function (p_oContext, p_iIdEntity) {

            var mapObjectToSynchronizes = this.getObjectToSynchronize(p_oContext, this.entityName);

            for (var i = 0; i < mapObjectToSynchronizes.length; i++) {
                if (mapObjectToSynchronizes[i].id === p_iIdEntity) {
                    return MFObjectToSynchronizeDaoProxy.deleteObjectToSynchronizeById(p_oContext, p_iIdEntity);
                }
            }

        };


        MFSyncAbstractLivingEntityResponseProcessor.prototype.getListIdEntity = function (p_aMapEntityToObjectToSynchronizes) {
            var listId = [];
            if (!angular.isUndefinedOrNull(p_aMapEntityToObjectToSynchronizes)) {
                for (var i = 0; i < p_aMapEntityToObjectToSynchronizes.length; i++) {
                    listId.push(p_aMapEntityToObjectToSynchronizes[i].objectid);
                }
            }

            return listId;
        };

        MFSyncAbstractLivingEntityResponseProcessor.prototype.setEntityName = function (p_sName) {
            this.entityName = p_sName;
        };

        MFSyncAbstractLivingEntityResponseProcessor.prototype.getEntityName = function () {
            return this.entityName;
        };

        MFSyncAbstractLivingEntityResponseProcessor.prototype.prepare = function () {

            //Example
//            this.setReferentielEntityName('client');
//            this.setNode('client.miseAJour');
        };

        return MFSyncAbstractLivingEntityResponseProcessor;

    }]);