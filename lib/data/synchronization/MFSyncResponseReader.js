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
angular.module('mfcore').factory('MFSyncResponseReader', ['MFSyncPromiseProvider',
    function ($qSync) {


        var MFSyncResponseReader = function MFSyncResponseReader() {

            this.responseProcessor = [];
            this.responseEntityProcessor = [];

        };

        MFSyncResponseReader.prototype.addEntityResponseProcessor = function (p_oSyncEntityResponseProcessor) {

            this.responseEntityProcessor.push(p_oSyncEntityResponseProcessor);

        };

        MFSyncResponseReader.prototype.addResponseProcessor = function (p_oSyncResponseProcessor) {

            this.responseProcessor.push(p_oSyncResponseProcessor);

        };

        MFSyncResponseReader.prototype.prepare = function (p_oContext) {

            var i = 0;
            var tabPromiseResponseProcessor = [];
            //loop responseProcessor
            for (i = 0; i < this.responseProcessor.length; i++) {
                tabPromiseResponseProcessor.push(this.responseProcessor[i].readResponse(p_oContext));
            }

            //loop requestEntityBuilder
            for (i = 0; i < this.responseEntityProcessor.length; i++) {
                tabPromiseResponseProcessor.push(this.responseEntityProcessor[i].readResponse(p_oContext));
            }

            return $qSync.all(tabPromiseResponseProcessor);

        };


        return MFSyncResponseReader;

    }]);