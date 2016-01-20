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