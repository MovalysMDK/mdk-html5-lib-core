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


angular.module('mfcore').factory('MFParameter', ['MFAbstractEntity', 'MFUtils', function (MFAbstractEntity, MFUtils) {

    function MFParameter() {

        MFParameter._Parent.call(this);

        var _id;
        var _name;
        var _value;

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


        Object.defineProperty(this, 'name', {
            get: function () {
                return _name;
            },
            set: function (value) {
                _name = value;
            },
            enumerable: true,
            configurable: false
        });

        Object.defineProperty(this, 'value', {
            get: function () {
                return _value;
            },
            set: function (value) {
                _value = value;
            },
            enumerable: true,
            configurable: false
        });

    }

    MFUtils.extend(MFParameter, MFAbstractEntity);
    MFParameter.prototype._transient = false;
    return MFParameter;
}]);
