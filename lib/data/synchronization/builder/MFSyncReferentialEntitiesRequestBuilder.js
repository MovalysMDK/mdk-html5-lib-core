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
angular.module('mfcore').factory('MFSyncReferentialEntitiesRequestBuilder', ['MFUtils', 'MFSyncAbstractRequestBuilder', 'MFSyncParameter', 'MFSyncRequest',
    function (MFUtils, MFSyncAbstractRequestBuilder, MFSyncParameter, MFSyncRequest) {

        var MFSyncReferentialEntitiesRequestBuilder = function MFSyncReferentialEntitiesRequestBuilder() {

            MFSyncReferentialEntitiesRequestBuilder._Parent.call(this);

        };

        MFUtils.extend(MFSyncReferentialEntitiesRequestBuilder, MFSyncAbstractRequestBuilder);

        MFSyncReferentialEntitiesRequestBuilder.prototype.buildRequest = function (p_oContext) {

            //  console.log('JE SUIS LA: MFSyncReferentielEntitiesRequestBuilder buildRequest');

            return MFSyncParameter.getMap(p_oContext).then(function (mapParameterDaoProxy) {

                if (MFUtils.isAttrInObject(mapParameterDaoProxy)) {

                    for (var element in mapParameterDaoProxy) {
                        if (mapParameterDaoProxy.hasOwnProperty(element)) {
                            MFSyncRequest.root[element] = mapParameterDaoProxy[element];
                        }
                    }
                } else {
                    MFSyncRequest.root.fullRequest = true;
                    MFSyncRequest.endTransaction = false;
                }
            });


        };

        return MFSyncReferentialEntitiesRequestBuilder;

    }]);