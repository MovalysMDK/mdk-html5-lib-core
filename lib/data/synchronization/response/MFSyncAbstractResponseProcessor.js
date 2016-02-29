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
angular.module('mfcore').factory('MFSyncAbstractResponseProcessor', [ 'MFUtils', function (MFUtils) {

    var MFSyncAbstractResponseProcessor = function MFSyncAbstractResponseProcessor() {
        this.aNode = null;
    };

    MFSyncAbstractResponseProcessor.prototype.setNode = function (p_sNode) {
        this.aNode = p_sNode.split('.');
    };

    MFSyncAbstractResponseProcessor.prototype.getNode = function () {
        return this.aNode;
    };

    MFSyncAbstractResponseProcessor.prototype.getDataByNode = function (p_oResponse) {
        var data = p_oResponse;
        angular.forEach(this.aNode, function (value, key) {
            data = data[value];
        });
        return data;
    };

    MFSyncAbstractResponseProcessor.prototype.addDataInNode = function (p_oObject, p_oNode, pbTypeArray, p_oData) {

        if (pbTypeArray) {
            if (MFUtils.isUndefinedOrNull(p_oObject[p_oNode])) {
                p_oObject[p_oNode] = [];
                p_oObject[p_oNode].push(p_oData);
            } else {
                p_oObject[p_oNode].push(p_oData);
            }
        } else {
            p_oObject[p_oNode] = p_oData;
        }

    };

    return MFSyncAbstractResponseProcessor;

}]);