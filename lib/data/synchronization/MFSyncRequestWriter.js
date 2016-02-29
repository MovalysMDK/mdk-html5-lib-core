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
angular.module('mfcore').factory('MFSyncRequestWriter', ['MFSyncPromiseProvider', 'MFSyncReferentialEntitiesRequestBuilder', function ($qSync, MFSyncReferentialEntitiesRequestBuilder) {

    var MFSyncRequestWriter = function MFSyncRequestWriter() {

        this.requestBuilder = [];
        this.requestEntityBuilder = [];

        this.requestBuilder.push(new MFSyncReferentialEntitiesRequestBuilder());

    };

    MFSyncRequestWriter.prototype.addEntityRequestBuilder = function (p_oSyncEntityRequestBuilder) {

        this.requestEntityBuilder.push(p_oSyncEntityRequestBuilder);

    };

    MFSyncRequestWriter.prototype.addRequestBuilder = function (p_oSyncRequestBuilder) {

        this.requestBuilder.push(p_oSyncRequestBuilder);

    };

    MFSyncRequestWriter.prototype.prepare = function (p_oContext) {

        var i = 0;
        var tabPromiseBuildRequest = [];
        //loop requestBuilder
        for (i = 0; i < this.requestBuilder.length; i++) {
            tabPromiseBuildRequest.push(this.requestBuilder[i].buildRequest(p_oContext));
        }

        //loop requestEntityBuilder
        for (i = 0; i < this.requestEntityBuilder.length; i++) {
            tabPromiseBuildRequest.push(this.requestEntityBuilder[i].buildRequest(p_oContext));
        }

        return $qSync.all(tabPromiseBuildRequest);

    };

    return MFSyncRequestWriter;

}]);