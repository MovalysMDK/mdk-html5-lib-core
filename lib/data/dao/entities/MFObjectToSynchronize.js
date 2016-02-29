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


angular.module('mfcore').factory('MFObjectToSynchronize', ['MFAbstractEntity', 'MFUtils', function (MFAbstractEntity, MFUtils) {

    function MFObjectToSynchronize() {

        MFObjectToSynchronize._Parent.call(this);

        var _id;
        var _objectid;
        var _objectname;

        Object.defineProperty(this, 'id', {
            get: function () {
                return _id;
            },
            set: function (value) {
                _id = value;
            },
            enumerable: true,
            configurable: false
        });

        Object.defineProperty(this, 'objectid', {
            get: function () {
                return _objectid;
            },
            set: function (objectid) {
                _objectid = objectid;
            },
            enumerable: true,
            configurable: false
        });

        Object.defineProperty(this, 'objectname', {
            get: function () {
                return _objectname;
            },
            set: function (objectname) {
                _objectname = objectname;
            },
            enumerable: true,
            configurable: false
        });

    }

    MFUtils.extend(MFObjectToSynchronize, MFAbstractEntity);
    MFObjectToSynchronize.prototype._transient = false;
    return MFObjectToSynchronize;
}]);
