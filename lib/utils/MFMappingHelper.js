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
 * Utils
 */

angular.module('mfcore').factory('MFMappingHelper', ['MFException', '$injector', 'MFUtils', 'MFDataModelCache', function (MFException, $injector, MFUtils, MFDataModelCache) {


    var applyConverter = function applyConverter(left2rightConverter, valueToConvert) {

        console.assert(!angular.isUndefinedOrNull(valueToConvert), 'The parameter "valueToConvert" of the function "applyConverter" is required');
        console.assert(!angular.isUndefinedOrNullOrEmpty(left2rightConverter) && left2rightConverter.length >= 2, 'The parameter "left2rightConverter" of the function "applyConverter" is required');

        var convertedValue = null;
        var rightConverter = null;

        try {
            rightConverter = $injector.get(left2rightConverter[0]);
        }
        catch (e) {
            console.log('left2rightConverter', left2rightConverter);
            console.error(e);
            throw new MFException('Cannot find the converter "' + left2rightConverter[0] + '", as defined in the mapping');
        }
        var rightConverterFunction = left2rightConverter[1];
        var rightConverterParam = left2rightConverter[2];

        console.assert(rightConverterFunction in rightConverter, 'Cannot find the function "' + rightConverterFunction + '" in the converter "' + left2rightConverter[0] + '", as defined in the mapping');

        if (angular.isUndefinedOrNull(rightConverterParam)) {
            convertedValue = rightConverter[rightConverterFunction](valueToConvert);
        }
        else {
            convertedValue = rightConverter[rightConverterFunction](valueToConvert, rightConverterParam);
        }

        return convertedValue;

    };

  /**
   * 
   */
    var initChildAttribute = function initChildAttribute(entity, attrToInit, childFactoryName, childAttrId, attrMapping, cacheActive, mappedObjectsCache, checkAttrExistence) {
        console.assert(!angular.isUndefinedOrNull(entity), 'the parameter "entity" of "initChildAttribute" is required');
        console.assert(!angular.isUndefinedOrNullOrEmpty(attrToInit), 'the parameter "attrToInit" of "initChildAttribute" is required');
        console.assert(!angular.isUndefinedOrNullOrEmpty(attrMapping), 'the parameter "attrMapping" of "initChildAttribute" is required');
        console.assert(!checkAttrExistence || attrToInit in entity, 'the attr "' + attrToInit + '" is not defined in "' + entity.constructor.name + '"');

        var cachedFound = false;

        // try to get the child object from the cache
        if (cacheActive && !angular.isUndefinedOrNull(childAttrId)) {
          // get child from cache
          var cachedChild = null;
          var cacheChildId = null;

          // Find the ID of the object
          if (!angular.isUndefinedOrNullOrEmpty(childFactoryName)) {
            cacheChildId = MFDataModelCache.getCacheIdentifier(childFactoryName, childAttrId);
            // Try to find it in the cache
            if (!angular.isUndefinedOrNull(cacheChildId)) {
              cachedChild = mappedObjectsCache[cacheChildId];
                  
              // We found it in the cache, set it
              if (!angular.isUndefinedOrNull(cachedChild)) {
                entity[attrToInit] = cachedChild;
                cachedFound = true;
              }
            }
          }
        }

        // Not found in cache, call the factory to create a new instance
        if (!cachedFound && angular.isUndefinedOrNull(entity[attrToInit])) {
            if (!angular.isUndefinedOrNullOrEmpty(childFactoryName)) {
                // create child object with child factory
                try {
                    var childFactory = $injector.get(childFactoryName);
                    entity[attrToInit] = childFactory.createInstance();
                } catch (e) {
                    throw new MFException('The factory "' + childFactoryName + '" defined for the attribute "' + attrToInit + '" of "' + entity.constructor.name + '" is not valid');
                }
            } else { //childFactoryName isn't defined.
                entity[attrToInit] = {};
                console.warn('there is no factory defined to build the attribute ' + attrToInit);
            }

        }
    };


    /**
     * CONVERT LEFT OBJECT INTO RIGHT OBJECT
     * @param leftObject
     * @param mapping
     * @param rightObjectsCache
     * @param existingRightObject
     * @returns {{rightObject}}
     */
    var convertLeftIntoRight = function (leftObject, mapping, rightObjectsCache, existingRightObject) {
      console.assert(!angular.isUndefinedOrNull(leftObject), 'The parameter "leftObject" of the function "convertLeftIntoRight" is required');
      console.assert(!angular.isUndefinedOrNull(mapping), 'The parameter "mapping" of the function "convertLeftIntoRight" is required');
      console.assert(!angular.isUndefinedOrNullOrEmpty(mapping.attributes), 'The parameter "mapping.attributes" of the function "convertLeftIntoRight" is required');

      // DEFINE IDENTIFIER OF RIGHT OBJECT
      var identifierForCache = '';

      if (!angular.isUndefinedOrNull(mapping.rightFactory)) {
        var identifierListForCache = [];
        for (var attrIndexToDefId in mapping.attributes) {
          if (mapping.attributes[attrIndexToDefId].identifier) {
            identifierListForCache.push(leftObject[mapping.attributes[attrIndexToDefId].leftAttr]);
          }
        }

        // Compute the identifier of the object for the cache (factoryname#attrId1_attrId2_...)
        identifierForCache = MFDataModelCache.getCacheIdentifier(mapping.rightFactory, identifierListForCache);
      }
        
      // Verify is the cache has been given
      var cacheActive = !angular.isUndefinedOrNull(rightObjectsCache);

      // INITIALIZE RIGHT OBJECT
      var rightObject = {};
      var checkRightAttrExistence = false;

      // Retrieve the right object
      // Has the right object been given as a parameter ?
      if (!angular.isUndefinedOrNullOrEmpty(existingRightObject)) {
        rightObject = existingRightObject;
        checkRightAttrExistence = true;
        // Right object is in cache ?
      } else if (cacheActive && !angular.isUndefinedOrNull(identifierForCache) &&
       identifierForCache in rightObjectsCache &&
       !angular.isUndefinedOrNull(rightObjectsCache[identifierForCache])) {
        rightObject = rightObjectsCache[identifierForCache];
        checkRightAttrExistence = true;
      }
      // Object wasn't given as a parameter nor present in the cache
      else {
        try {
          if (!angular.isUndefinedOrNull(mapping.rightFactory)) {
            var rightFactory = $injector.get(mapping.rightFactory);
            rightObject = rightFactory.createInstance();
            checkRightAttrExistence = true;
          }
        }
        catch (e) {
          console.warn(e);
          console.warn('The target entity factory "' + mapping.rightFactory + '" is not defined');
        }
      }


      // For each attributes in the mapping
      for (var attrMappingIndex in mapping.attributes) {
        if (mapping.attributes.hasOwnProperty(attrMappingIndex)) {
          var attrMapping = mapping.attributes[attrMappingIndex];

          // CHECK DEFINITION OF THE MAPPING
          console.assert(!angular.isUndefinedOrNull(attrMapping.leftAttr), 'The parameter "mapping.attributes[].leftAttr" of the function "convertLeftIntoRight" is required');
          console.assert(!angular.isUndefinedOrNull(attrMapping.rightAttr), 'The parameter "mapping.attributes[].rightAttr" of the function "convertLeftIntoRight" is required');

          // GET VALUE FROM LEFT OBJECT
          // 2 cases:
          // mapping.attributes[].leftAttr is an array
          // mapping.attributes[].leftAttr is not an array
          var leftValue;

          if (angular.isArray(attrMapping.leftAttr)) {// mapping.attributes[].leftAttr is an array
              // Flatten the argument tree
              // Example ['obj1','obj2','obj3','prop1'] --> leftValue = obj1.obj2.obj3.prop1
              var childLeftAttr = leftObject;
              for (var leftChildDepth = 0; leftChildDepth < attrMapping.leftAttr.length && !angular.isUndefinedOrNull(childLeftAttr); leftChildDepth++) {
                childLeftAttr = childLeftAttr[attrMapping.leftAttr[leftChildDepth]];
              }
              leftValue = childLeftAttr;
          } else { // mapping.attributes[].leftAttr is a single value
            leftValue = leftObject[attrMapping.leftAttr];
          }


          if (angular.isDefined(leftValue)) {
            // APPLY CONVERTER IF NEEDED
            if (leftValue !== null && !angular.isUndefinedOrNull(attrMapping.left2rightConverter)) {
               leftValue = applyConverter(attrMapping.left2rightConverter, leftValue);
            }

            // BUILD A CHILD OBJECT (and call to cache) IF NEEDED
            if (angular.isArray(attrMapping.rightAttr)) {// mapping.attributes[].rightAttr is an array
              if (attrMapping.rightAttr.length >= 2) {
                // Prepare right factory
                if (angular.isUndefinedOrNull(attrMapping.rightFactory)) {
                  attrMapping.rightFactory = [];
                } else {
                  attrMapping.rightFactory = MFUtils.toArray(attrMapping.rightFactory); // Force the rightFactory to be an array
                }

                var lastRightChildAttr = attrMapping.rightAttr[attrMapping.rightAttr.length - 1];
                // Don't create object if id is null
                // mapping.identifier == true
                if (!attrMapping.identifier || !angular.isUndefinedOrNull(leftValue)) {
                    var rightChild = rightObject;
                    // build the hierarchy for this attribute of the right object, before setting the value coming from the left object
                    for (var childDepth = 0; childDepth < attrMapping.rightAttr.length - 1; childDepth++) {
                      var rightChildAttr = attrMapping.rightAttr[childDepth];
                      var childAttrId = null;
                      if (attrMapping.childIdentifier && (childDepth === attrMapping.rightAttr.length - 1)) {
                        childAttrId = leftValue;
                      }
                      // Get from cache or initialize a new instance for the rightChild[rightChildAttr]
                      initChildAttribute(rightChild, rightChildAttr, attrMapping.rightFactory[childDepth], childAttrId, attrMapping, cacheActive, rightObjectsCache, checkRightAttrExistence);
                      
                      rightChild = rightChild[rightChildAttr];
                    }

                    // SET THE VALUE INTO THE CHILD
                    rightChild[lastRightChildAttr] = leftValue;
                                    
                    // PUT THE CHILD INTO THE CACHE if needed
                    if (cacheActive && attrMapping.childIdentifier && !angular.isUndefinedOrNull(leftValue)) {
                      var childCacheId = MFDataModelCache.getCacheIdentifier(attrMapping.rightFactory[attrMapping.rightFactory.length - 1], leftValue);
                      if (!angular.isUndefinedOrNull(childCacheId)) {
                        rightObjectsCache[childCacheId] = rightChild;
                      }
                    }
                }
              } else { //attrMapping.rightAttr.length < 2
                console.log('attrMapping.rightFactory', attrMapping.rightFactory);
                console.log('attrMapping.rightAttr', attrMapping.rightAttr);
                throw new MFException('The attribute  "' + attrMapping.rightAttr[0] + '" should be an array only to define a child entity object');
              }
            } else { // mapping.attributes[].rightAttr is NOT an array
              // "basic" mapping
              console.assert(!checkRightAttrExistence || (attrMapping.rightAttr in rightObject), 'Cannot find the attribute "' + attrMapping.rightAttr + '" in the object "' + rightObject._type + '", as defined in the mapping');

              // SET VALUE INTO RIGHT OBJECT
              rightObject[attrMapping.rightAttr] = leftValue;
            }
          } else { // Left Value is Undefined
            console.debug('In the object to convert, the attribute "' + attrMapping.leftAttr + '" was not defined');
          }
        }
      }
      // TELL THAT THE OBJECT COMES FROM THE DB AND IS COMPLETE (NOT ONLY WITH AN ID)

      if (typeof rightObject._fulfilled === 'undefined') {
        Object.defineProperty(rightObject, '_fulfilled', {
          value: false,
          enumerable: false,
          configurable: false,
          writable: true
        });
      }
      rightObject._fulfilled = true;


      // PUT RIGHT OBJECT INTO CACHE IF NEEDED
      if (cacheActive && !angular.isUndefinedOrNullOrEmpty(identifierForCache)) {
        rightObjectsCache[identifierForCache] = rightObject;
      }


      // RETURN RIGHT OBJECT
      return rightObject;
    };


    var setInverseMapping = function setInverseMapping(mapping) {
        if (angular.isUndefinedOrNull(mapping._inverse)) {

            mapping._inverse = {};
            mapping._inverse.leftFactory = mapping.rightFactory;
            mapping._inverse.rightFactory = mapping.leftFactory;
            mapping._inverse.attributes = [];

            for (var attrMappingIndex in mapping.attributes) {
                if (mapping.attributes.hasOwnProperty(attrMappingIndex)) {

                    mapping._inverse.attributes[attrMappingIndex] = {};
                    mapping._inverse.attributes[attrMappingIndex].rightAttr = mapping.attributes[attrMappingIndex].leftAttr;
                    mapping._inverse.attributes[attrMappingIndex].leftAttr = mapping.attributes[attrMappingIndex].rightAttr;

                    mapping._inverse.attributes[attrMappingIndex].rightFactory = mapping.attributes[attrMappingIndex].leftFactory;
                    mapping._inverse.attributes[attrMappingIndex].leftFactory = mapping.attributes[attrMappingIndex].rightFactory;

                    mapping._inverse.attributes[attrMappingIndex].left2rightConverter = mapping.attributes[attrMappingIndex].right2leftConverter;
                    mapping._inverse.attributes[attrMappingIndex].right2leftConverter = mapping.attributes[attrMappingIndex].left2rightConverter;

                    mapping._inverse.attributes[attrMappingIndex].childIdentifier = mapping.attributes[attrMappingIndex].childIdentifier;

                    mapping._inverse.attributes[attrMappingIndex].identifier = mapping.attributes[attrMappingIndex].identifier;
                }
            }
        }

    };

    var convertRightIntoLeft = function (rightObject, mapping, leftObjectsCache, existingLeftObject) {
      // create a mapping._inverse attribute
        setInverseMapping(mapping);
        return convertLeftIntoRight(rightObject, mapping._inverse, leftObjectsCache, existingLeftObject);
    };

    var convertListLeftIntoRight = function (leftObjectList, mapping, rightObjectsCache) {
        var rightObjList = [];
        for (var index in leftObjectList) {
            if (leftObjectList.hasOwnProperty(index)) {
                var rightObj = convertLeftIntoRight(leftObjectList[index], mapping, rightObjectsCache, null);
                rightObjList.push(rightObj);
            }
        }
        return rightObjList;
    };


    var convertListRightIntoLeft = function (rightObjectList, mapping, leftObjectsCache) {
        var leftObjList = [];
        for (var index in rightObjectList) {
            if (rightObjectList.hasOwnProperty(index)) {
                var rightObj = convertRightIntoLeft(rightObjectList[index], mapping, leftObjectsCache, null);
                leftObjList.push(rightObj);
            }
        }
        return leftObjList;
    };


    // ###############################################################################
    // ############## UTILS   ########################################################

    var convertAttributeRightIntoLeft = function convertAttributeRightIntoLeft(rightObj, mapping) {
        console.assert(!angular.isUndefinedOrNull(mapping), 'The attr "mapping" of "getChildEntityName" is required');
        console.assert(!angular.isUndefinedOrNullOrEmpty(rightObj) && !angular.isUndefinedOrNullOrEmpty(rightObj.name) && !angular.isUndefinedOrNullOrEmpty(rightObj.values), 'The parameter rightObj is required and should be like {name: ..., value: ....} ');


        for (var attrId = 0; attrId < mapping.attributes.length; attrId++) {
            var currAttr = mapping.attributes[attrId];
            var rightAttrName;
            if (angular.isArray(currAttr.rightAttr)) {
                rightAttrName = currAttr.rightAttr[0];
            }
            else {
                rightAttrName = currAttr.rightAttr;
            }

            if (rightAttrName === rightObj.name) {
                var leftObj = {name: '', values: []};

                for (var valId = 0; valId < rightObj.values.length; valId++) {
                    var rightVal = rightObj.values[valId];
                    //TODO FTO UNDERSTAND WHEN RIGHTVAL IS INT
                    if (angular.isArray(currAttr.rightAttr) && !angular.isNumber(rightVal) && !angular.isString(rightVal) ) {
                        for (var rightSubAttrId = 1; rightSubAttrId < currAttr.rightAttr.length; rightSubAttrId++) {
                            rightVal = rightVal[currAttr.rightAttr[rightSubAttrId]];
                        }
                    }

                    if (!angular.isUndefinedOrNull(currAttr.right2leftConverter)) {
                        leftObj.values.push(applyConverter(currAttr.right2leftConverter, rightVal));
                    }
                    else {
                        leftObj.values.push(rightVal);
                    }
                }
                leftObj.name = currAttr.leftAttr;
                return leftObj;
            }
        }

        //no mapping found
        console.warn('No mapping found for the attribute ' + rightObj.name);
        return { name: rightObj.name, values: rightObj.values};
    };


    var factoryWordStringLength = 'Factory'.length;

    var getRightChildEntityName = function getRightChildEntityName(mapping, attributeName) {

        console.assert(!angular.isUndefinedOrNull(mapping), 'The attr "mapping" of "getChildEntityName" is required');
        console.assert(!angular.isUndefinedOrNullOrEmpty(attributeName), 'The attr "attributeName" of "getChildEntityName" is required');

        for (var attrId = 0; attrId < mapping.attributes.length; attrId++) {
            var currAttr = mapping.attributes[attrId];
            if (currAttr.rightAttr[0] === attributeName) {
                console.assert(!angular.isUndefinedOrNullOrEmpty(currAttr.rightFactory), 'The right factory of this child should be defined');
                return currAttr.rightFactory.slice(0, -factoryWordStringLength);
            }
        }
        return '';
    };


    var getLeftChildEntityName = function getLeftChildEntityName(mapping, attributeName) {
        setInverseMapping(mapping);
        return getRightChildEntityName(mapping._inverse, attributeName);
    };


    var getLeftIdAttribute = function getLeftIdAttribute(mapping) {
        if (angular.isUndefined(mapping.leftIdAttribute)) {
            for (var i = 0; i < mapping.attributes.length; i++) {
                if (mapping.attributes[i].identifier) {
                    mapping.leftIdAttribute = mapping.attributes[i].leftAttr;
                }
            }
        }

        return mapping.leftIdAttribute;
    };


    var getLeftAttributesList = function getLeftAttributesList(mapping) {
        if (angular.isUndefined(mapping.leftAttributesList)) {
            mapping.leftAttributesList = [];
            for (var i = 0; i < mapping.attributes.length; i++) {
                mapping.leftAttributesList.push(mapping.attributes[i].leftAttr);
            }
        }
        return mapping.leftAttributesList;
    };


    var getRightIdAttribute = function getRightIdAttribute(mapping) {
        if (angular.isUndefined(mapping.rightIdAttribute)) {
            for (var i = 0; i < mapping.attributes.length; i++) {
                if (mapping.attributes[i].identifier) {
                    mapping.rightIdAttribute = mapping.attributes[i].rightAttr;
                }
            }
        }

        return mapping.rightIdAttribute;
    };


    var convertAttrNameLeftToRight = function convertAttrNameLeftToRight(mapping, leftAttrName) {
        for (var i = 0; i < mapping.attributes.length; i++) {

            if (angular.isArray(mapping.attributes[i].leftAttr) && mapping.attributes[i].leftAttr[0] === leftAttrName) {
                return mapping.attributes[i].rightAttr;
            }
            else if (mapping.attributes[i].leftAttr === leftAttrName) {
                return mapping.attributes[i].rightAttr;
            }
        }
        return null;
    };
    var convertAttrNameRightToLeft = function convertAttrNameRightToLeft(mapping, rightAttrName) {
        for (var i = 0; i < mapping.attributes.length; i++) {

            if (angular.isArray(mapping.attributes[i].rightAttr) && mapping.attributes[i].rightAttr[0] === rightAttrName) {
                return mapping.attributes[i].leftAttr;
            }
            else if (mapping.attributes[i].rightAttr === rightAttrName) {
                return mapping.attributes[i].leftAttr;
            }
        }
        return null;
    };

    var hasRightAttr = function hasRightAttr(mapping, rightAttrName) {
        for (var i = 0; i < mapping.attributes.length; i++) {
            if (angular.isArray(mapping.attributes[i].rightAttr) && mapping.attributes[i].rightAttr[0] === rightAttrName || mapping.attributes[i].rightAttr === rightAttrName) {
                return true;
            }
        }
        return false;
    };


    return {
        convertListRightIntoLeft: convertListRightIntoLeft,
        convertRightIntoLeft: convertRightIntoLeft,
        convertListLeftIntoRight: convertListLeftIntoRight,
        convertLeftIntoRight: convertLeftIntoRight,

        getRightChildEntityName: getRightChildEntityName,
        getLeftChildEntityName: getLeftChildEntityName,
        getLeftIdAttribute: getLeftIdAttribute,
        convertAttrNameLeftToRight: convertAttrNameLeftToRight,
        convertAttrNameRightToLeft: convertAttrNameRightToLeft,
        hasRightAttr: hasRightAttr,
        convertAttributeRightIntoLeft: convertAttributeRightIntoLeft,
        getRightIdAttribute: getRightIdAttribute,
        getLeftAttributesList: getLeftAttributesList
    };
}]);



