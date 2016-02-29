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

angular.module('mfcore').factory('MFAbstractEntity', function () {

    //BE CAREFUL: do not define a constructor or attributes because it will be overwritten in the children

    var MFAbstractEntity = function MFAbstractEntity() {

        Object.defineProperty(this, '_fulfilled', {
            value: false,
            enumerable: false,
            configurable: false,
            writable: true
        });

        // attribute used in MFMappingHelper for converting SQL object into model object
    };

    MFAbstractEntity._transient = false;
    Object.defineProperty(MFAbstractEntity.prototype, '_transient', {
        get: function () {
            return this.constructor._transient;
        },
        set: function (value) {
            this.constructor._transient = value;
        },
        enumerable: false,
        configurable: false
    });

    Object.defineProperty(MFAbstractEntity.prototype, '_type', {
        get: function () {
            return this.constructor.name;
        },
        enumerable: false,
        configurable: false
    });

    Object.defineProperty(MFAbstractEntity.prototype, '_deleted', {
        value: false,
        writable: true,
        enumerable: false,
        configurable: false
    });


    MFAbstractEntity.serialize = function (entity) {
        if (!entity._transient) {
            var flatEntity = {};
            for (var attributeName in entity) {
                if (entity.hasOwnProperty(attributeName)) {
                    var attributeValue = entity[attributeName];
                    if (attributeValue instanceof MFAbstractEntity) {
                        if (!attributeValue._transient) {
                            flatEntity['(' + attributeValue._type + ')' + attributeName + '.id'] = attributeValue.id;
                        }
                    } else {
                        flatEntity[attributeName] = attributeValue;
                    }
                }
            }
            return JSON.stringify(flatEntity);
        }
        else {
            return null;
        }
    };

    MFAbstractEntity.prototype.serialize = function () {
        return MFAbstractEntity.serialize(this);
    };

    MFAbstractEntity.prototype.equals = function (obj) {
        return angular.equals(this, obj);
    };


    return MFAbstractEntity;

});