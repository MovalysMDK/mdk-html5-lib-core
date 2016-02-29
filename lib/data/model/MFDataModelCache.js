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

/**
 * Helper class to help managing cache.
 * getCacheIdentifier(factoryName, identifierAttributes) --> Generate an ID
 */
angular.module('mfcore').factory('MFDataModelCache', ['MFUtils', function (MFUtils) {

    //BE CAREFUL: do not define a constructor or attributes because it will be overwritten in the children
    var MFDataModelCache = function MFDataModelCache() {
    };

    /**
     * Compute the identifier used for the cache
     * @param factoryName the name of the factory
     * @param identifierAttributes the attributes used as identifiers in the object
     * @return the identifier for the cache (factoryname#attrId1_attrId2_...)
     */
    MFDataModelCache.prototype.getCacheIdentifier = function getCacheIdentifier(factoryName, identifierAttributes) {
        console.assert(!angular.isUndefinedOrNull(identifierAttributes), 'No identifier attributes found to calculate the cache identifier of this entity');
        
        if (angular.isUndefinedOrNullOrEmpty(factoryName)) {
            return null;
        }
        
        var identifierAttributesArray = MFUtils.toArray(identifierAttributes);

        var secondPortion = '';
        for (var idxForCacheId = 0; idxForCacheId < identifierAttributesArray.length; idxForCacheId++) {

            if (identifierAttributesArray[idxForCacheId] === -1) {
                return null;
            }

            if (secondPortion.length > 0) {
                secondPortion += '_';
            }
            secondPortion += identifierAttributesArray[idxForCacheId];
        }

        return factoryName + '#' + secondPortion;
    };

    return new MFDataModelCache();
}]);