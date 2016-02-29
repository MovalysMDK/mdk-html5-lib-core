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