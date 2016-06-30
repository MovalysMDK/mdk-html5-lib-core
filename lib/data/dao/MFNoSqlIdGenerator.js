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

angular.module('mfcore').service('MFNoSqlIdGenerator', ['MFSyncPromiseProvider', 'MFDalNoSqlProxy', function($qSync, MFDalNoSqlProxy) {
    var lastIds = {};

    this.initIdGeneratorIfNeeded = function (p_context, p_objectStoreName) {
        var deferred = $qSync.defer();

        if (!(p_objectStoreName in lastIds)) {
            lastIds[p_objectStoreName] = {};
            lastIds[p_objectStoreName].pendingDao = MFDalNoSqlProxy.getLastId(p_context, p_objectStoreName).then(function (id) {
                lastIds[p_objectStoreName].pendingDao = null;
                lastIds[p_objectStoreName].id = id;
                deferred.resolve(id);
            }, function (error) {
                deferred.reject(error);
            });
        } else {
            if (lastIds[p_objectStoreName].pendingDao !== null) {
                return lastIds[p_objectStoreName].pendingDao;
            } else {
                deferred.resolve(lastIds[p_objectStoreName].id);
            }
        }

        return deferred.promise;
    };

    this.getNextId = function(p_objectStoreName) {
        return --lastIds[p_objectStoreName].id;
    };
}]);
