'use strict';
/**
 * Utils
 */

angular.module('mfcore').factory('MFMappingHelper', ['MFException', '$injector', 'MFUtils', function (MFException, $injector, MFUtils) {


    /**
     * CONVERT LEFT OBJECT INTO RIGHT OBJECT
     * @param leftObject
     * @param mapping
     * @param rightObjectsCache
     * @param existingRightObject
     * @returns {{rightObject}}
     */
    var convertLeftIntoRight = function (leftObject, mapping, rightObjectsCache, existingRightObject) {


        console.assert(!angular.isUndefinedOrNull(leftObject),'The parameter "leftObject" of the function "convertLeftIntoRight" is required');

        console.assert(!angular.isUndefinedOrNull(mapping),'The parameter "mapping" of the function "convertLeftIntoRight" is required');

        console.assert(!angular.isUndefinedOrNullOrEmpty(mapping.attributes),'The parameter "mapping.attributes" of the function "convertLeftIntoRight" is required');

        // DEFINE IDENTIFIER OF RIGHT OBJECT

        var identifierForCache = '';

        if( !angular.isUndefinedOrNull(mapping.rightFactory)){
            var identifierListForCache = [];

            for (var attrIndexToDefId in mapping.attributes) {
                if(mapping.attributes[attrIndexToDefId].identifier){
                    identifierListForCache.push(leftObject[mapping.attributes[attrIndexToDefId].leftAttr]);
                }
            }

            identifierForCache = getCacheIdentifier(mapping.rightFactory,identifierListForCache);

        }
        var cacheActive = !angular.isUndefinedOrNull(rightObjectsCache) && !angular.isUndefinedOrNullOrEmpty(identifierForCache);


        // INITIALIZE RIGHT OBJECT

        var rightObject = {};

        var checkRightAttrExistence = false;

        if(!angular.isUndefinedOrNullOrEmpty(existingRightObject)) {
            rightObject = existingRightObject;
            checkRightAttrExistence = true;
        }
        else if(cacheActive &&  identifierForCache in rightObjectsCache){
            rightObject = rightObjectsCache[identifierForCache];
            checkRightAttrExistence = true;
        }
        else {
            try {
                if(!angular.isUndefinedOrNull(mapping.rightFactory)){
                    var rightFactory = $injector.get(mapping.rightFactory);
                    rightObject = rightFactory.createInstance();
                    checkRightAttrExistence = true;
                }
            }
            catch(e){
                console.warn(e);
                console.warn('The target entity factory "'+mapping.rightFactory+'" is not defined');
            }
        }




        for (var attrMappingIndex in mapping.attributes) {

            var attrMapping = mapping.attributes[attrMappingIndex];


            // CHECK DEFINITION OF THE MAPPING

            console.assert(!angular.isUndefinedOrNull(attrMapping.leftAttr),'The parameter "mapping.attributes[].leftAttr" of the function "convertLeftIntoRight" is required');
            console.assert(!angular.isUndefinedOrNull(attrMapping.rightAttr),'The parameter "mapping.attributes[].rightAttr" of the function "convertLeftIntoRight" is required');
            console.assert(!attrMapping.multiple || (angular.isArray(attrMapping.leftAttr) && attrMapping.leftAttr.length === 2),'The parameter "mapping.attributes[].leftAttr" should be an array of 2 items when this attribute is "multiple"');


            // GET VALUE FROM LEFT OBJECT
            var leftValue;

            if( angular.isArray(attrMapping.leftAttr )) {

                if(attrMapping.multiple){
                    leftValue = [];

                    var leftListChild = leftObject[attrMapping.leftAttr[0]];

                    console.assert(angular.isArray(leftListChild),'The attr "'+attrMapping.leftAttr[0]+'" of '+leftObject.constructor.name+' should be an array');

                    for(var leftChildIdx=0; leftChildIdx<leftListChild.length;leftChildIdx++){

                        // the goal here is to flatten the tree of objects of each child

                        var leftSubChild = leftListChild[leftChildIdx];
                        for(var leftSubchildDepth = 1; leftSubchildDepth < attrMapping.leftAttr.length && !angular.isUndefinedOrNull(leftSubChild);leftSubchildDepth++){
                            leftSubChild = leftSubChild[attrMapping.leftAttr[leftSubchildDepth]];
                        }
                        leftValue[leftChildIdx] = leftSubChild;
                    }
                }
                else {
                    var childLeftAttr = leftObject;
                    for(var leftChildDepth=0;leftChildDepth<attrMapping.leftAttr.length && !angular.isUndefinedOrNull(childLeftAttr);leftChildDepth++){
                        childLeftAttr = childLeftAttr[attrMapping.leftAttr[leftChildDepth]];
                    }
                    leftValue = childLeftAttr;
                }
            }
            else {
                leftValue = leftObject[attrMapping.leftAttr];
            }


            if(angular.isDefined(leftValue)) {

                console.assert(!attrMapping.multiple || (angular.isArray(leftValue) ),'the attribute '+attrMapping.leftAttr+' should be an array');

                // APPLY CONVERTER IF NEEDED

                if(!angular.isUndefinedOrNull(leftValue)){
                    if ( !angular.isUndefinedOrNull(attrMapping.left2rightConverter)) {
                        if(attrMapping.multiple){
                            for(var leftValIdx=0;leftValIdx<leftValue.length;leftValIdx++){
                                leftValue[leftValIdx] = applyConverter(attrMapping.left2rightConverter, leftValue[leftValIdx]);
                            }
                        }
                        else {
                            leftValue = applyConverter(attrMapping.left2rightConverter, leftValue);
                        }
                    }
                }
                else {
                    console.warn('In the object to convert, the attribute "'+attrMapping.leftAttr+'" was null or empty');
                }


                // BUILD A CHILD OBJECT (and call to cache) IF NEEDED

                if (angular.isArray(attrMapping.rightAttr)  && !angular.isUndefinedOrNull(leftValue)) {

                    console.assert(!angular.isUndefinedOrNull(attrMapping.rightFactory), 'The definition of a factory for the attribute "' + attrMapping.rightAttr[0] + '" is required');


                    if (attrMapping.rightAttr.length >= 2) {

                        if ( ! angular.isArray(attrMapping.rightFactory) ) {
                            var tmp = attrMapping.rightFactory;
                            attrMapping.rightFactory = [];
                            attrMapping.rightFactory.push(tmp);
                        }

                        console.assert(attrMapping.rightFactory.length === (attrMapping.rightAttr.length - 1), (attrMapping.rightAttr.length - 1) + ' factorie(s) need to be defined for the attribute "' + attrMapping.rightAttr[0] + '" ');



                        var lastRightChildAttr = attrMapping.rightAttr[attrMapping.rightAttr.length - 1];

                        if(!attrMapping.multiple ) {
                            var rightChild = rightObject;
                            // build the hierarchy for this attribute of the right object, before setting the value coming from the left object
                            for (var childDepth = 0; childDepth < attrMapping.rightFactory.length; childDepth++) {
                                var rightChildAttr = attrMapping.rightAttr[childDepth];
                                var childAttrId = null;
                                if(attrMapping.childIdentifier && childDepth === attrMapping.rightFactory.length-1){
                                    childAttrId = leftValue;
                                }
                                initChildAttribute(rightChild,rightChildAttr,attrMapping.rightFactory[childDepth],childAttrId,attrMapping,cacheActive,rightObjectsCache,checkRightAttrExistence);
                                rightChild = rightChild[rightChildAttr];
                            }

                            // SET THE VALUE INTO THE CHILD
                            console.assert(lastRightChildAttr in rightChild, 'Cannot find the attribute "' + lastRightChildAttr + '" in the object "' + rightChild.constructor.name + '", as defined in the mapping');
                            rightChild[lastRightChildAttr] = leftValue;

                            // PUT THE CHILD INTO THE CACHE if needed
                            if (cacheActive && attrMapping.childIdentifier ) {
                                var childCacheId = getCacheIdentifier(attrMapping.rightFactory[attrMapping.rightFactory.length - 1], leftValue);
                                if(!angular.isUndefinedOrNull(childCacheId)){
                                    rightObjectsCache[childCacheId] = rightChild;
                                }
                            }

                        }
                        else {
                            rightObject[attrMapping.rightAttr[0]] = [];

                            var rightListChild = rightObject[attrMapping.rightAttr[0]];//here, rightListChild is the list attribute of the main right object

                            for(var childIdx = 0; childIdx < leftValue.length;childIdx++){

                                var currChildAttrId = null;
                                if(attrMapping.childIdentifier && 0 === attrMapping.rightFactory.length-1){
                                    currChildAttrId = leftValue[childIdx];
                                }
                                initChildAttribute(rightListChild,childIdx,attrMapping.rightFactory[0],currChildAttrId,attrMapping,cacheActive,rightObjectsCache,false);

                                var rightSubChild = rightListChild[childIdx];

                                for (var subchildDepth = 1; subchildDepth < attrMapping.rightFactory.length; subchildDepth++) {
                                    var rightSubChildAttr = attrMapping.rightAttr[subchildDepth];
                                    currChildAttrId = null;
                                    if(attrMapping.childIdentifier && subchildDepth === attrMapping.rightFactory.length-1){
                                        currChildAttrId = leftValue[childIdx];
                                    }
                                    initChildAttribute(rightSubChild,rightSubChildAttr,attrMapping.rightFactory[subchildDepth],currChildAttrId,attrMapping,cacheActive,rightObjectsCache,checkRightAttrExistence);
                                    rightSubChild = rightSubChild[rightSubChildAttr];
                                }

                                // SET THE VALUE INTO THE CHILD
                                console.assert(lastRightChildAttr in rightSubChild, 'Cannot find the attribute "' + lastRightChildAttr + '" in the object "' + rightSubChild.constructor.name + '", as defined in the mapping');
                                rightSubChild[lastRightChildAttr] = leftValue[childIdx];

                                // PUT THE CHILD INTO THE CACHE if needed
                                if (cacheActive && attrMapping.childIdentifier && leftValue[childIdx] !== -1) {
                                    var subchildCacheId = getCacheIdentifier(attrMapping.rightFactory[attrMapping.rightFactory.length - 1], leftValue[childIdx]);
                                    if(!angular.isUndefinedOrNull(subchildCacheId)){
                                        rightObjectsCache[subchildCacheId] = rightSubChild;
                                    }
                                }
                            }
                        }
                    }
                    else {
                        console.log('attrMapping.rightFactory', attrMapping.rightFactory);
                        console.log('attrMapping.rightAttr', attrMapping.rightAttr);
                        throw new MFException('The attribute  "' + attrMapping.rightAttr[0] + '" should be an array only to define a child entity object');
                    }
                }
                else {

                    // "basic" mapping

                    console.assert(!checkRightAttrExistence|| angular.isArray(attrMapping.rightAttr) || (attrMapping.rightAttr in rightObject) , 'Cannot find the attribute "' + attrMapping.rightAttr + '" in the object "' + rightObject._type + '", as defined in the mapping');

                    // SET VALUE INTO RIGHT OBJECT
                    rightObject[attrMapping.rightAttr] = leftValue;
                }
            } else {
                console.warn('In the object to convert, the attribute "'+attrMapping.leftAttr+'" was not defined');
            }

        }

        // TELL THAT THE OBJECT COMES FROM THE DB AND IS COMPLETE (NOT ONLY WITH AN ID)

        if(rightObject._fulfilled === undefined){
            Object.defineProperty(rightObject, '_fulfilled', {
                value: false,
                enumerable: false,
                configurable: false,
                writable: true
            });
        }
        rightObject._fulfilled = true;


        // PUT RIGHT OBJECT INTO CACHE IF NEEDED

        if(cacheActive){
            rightObjectsCache[identifierForCache] = rightObject;
        }


        // RETURN RIGHT OBJECT

        return rightObject;

    };


    var convertRightIntoLeft = function (rightObject, mapping,leftObjectsCache, existingLeftObject) {

        setInverseMapping(mapping);
        return convertLeftIntoRight(rightObject, mapping._inverse,leftObjectsCache, existingLeftObject);
    };









    var convertListLeftIntoRight = function (leftObjectList, mapping, rightObjectsCache) {
        var rightObjList = [];
        for(var index in leftObjectList){
            var rightObj = convertLeftIntoRight(leftObjectList[index],mapping,rightObjectsCache);
            rightObjList.push(rightObj);
        }
        return rightObjList;
    };





    var convertListRightIntoLeft = function (rightObjectList, mapping, leftObjectsCache) {
        var leftObjList = [];
        for(var index in rightObjectList){
            var rightObj = convertRightIntoLeft(rightObjectList[index],mapping,leftObjectsCache);
            leftObjList.push(rightObj);
        }
        return leftObjList;
    };






    // ###############################################################################
    // ############## UTILS   ########################################################





    var getLeftChildrenGroupings = function getLeftChildrenGroupings(mapping){

        if(angular.isUndefinedOrNull(mapping.leftChildrenGroupings)){
            mapping.leftChildrenGroupings = {};

            for(var i= 0;i<mapping.attributes.length;i++){
                var currAttrDesc = mapping.attributes[i];
                if(currAttrDesc.multiple){
                    console.assert(angular.isArray(currAttrDesc.leftAttr),'since the attr '+currAttrDesc.leftAttr+' is multiple, the current entity will contain several children. In this case, "leftAttr" should describe in an array: (1) the attribute containing the list, (2) the attribute of the child to map');
                    console.assert(currAttrDesc.leftAttr.length === 2,'for the left attr '+currAttrDesc.leftAttr+', there are '+currAttrDesc.leftAttr.length+' attributes defined while the current implementation works only with 2 attributes defined: (1) the attribute containing the list, (2) the attribute of the child to map');
                    if(angular.isUndefined(mapping.leftChildrenGroupings[currAttrDesc.leftAttr[0]])){
                        mapping.leftChildrenGroupings[currAttrDesc.leftAttr[0]] = {idColumn: null, otherColumns:[]};
                    }
                    if(currAttrDesc.childIdentifier){
                        mapping.leftChildrenGroupings[currAttrDesc.leftAttr[0]].idColumn = currAttrDesc.leftAttr[1];
                    }
                    else {
                        mapping.leftChildrenGroupings[currAttrDesc.leftAttr[0]].otherColumns.push(currAttrDesc.leftAttr[1]);
                    }
                }
            }
        }

        return mapping.leftChildrenGroupings;

    };


    var convertAttributeRightIntoLeft = function convertAttributeRightIntoLeft(rightObj, mapping){
        console.assert(!angular.isUndefinedOrNull(mapping), 'The attr "mapping" of "getChildEntityName" is required');
        console.assert(!angular.isUndefinedOrNullOrEmpty(rightObj) && !angular.isUndefinedOrNullOrEmpty(rightObj.name) && !angular.isUndefinedOrNullOrEmpty(rightObj.values), 'The parameter rightObj is required and should be like {name: ..., value: ....} ');


        for(var attrId=0;attrId<mapping.attributes.length;attrId++){
            var currAttr = mapping.attributes[attrId];
            if(currAttr.rightAttr === rightObj.name ){
                var leftObj = {name:'',values:[]};

                for(var valId=0;valId<rightObj.values.length;valId++){
                    if (!angular.isUndefinedOrNull(currAttr.right2leftConverter)) {
                        leftObj.values.push(applyConverter(currAttr.right2leftConverter, rightObj.values[valId]));
                    }
                    else {
                        leftObj.values.push(rightObj.values[valId]);
                    }
                }
                leftObj.name = currAttr.leftAttr;
                return leftObj;
            }
        }

        //no mapping found
        console.warn('No mapping found for the attribute '+rightObj.name);
        return { name: rightObj.name, values: rightObj.values};
    };


    var factoryWordStringLength = 'Factory'.length;

    var getRightChildEntityName = function getRightChildEntityName(mapping, attributeName) {

        console.assert(!angular.isUndefinedOrNull(mapping), 'The attr "mapping" of "getChildEntityName" is required');
        console.assert(!angular.isUndefinedOrNullOrEmpty(attributeName), 'The attr "attributeName" of "getChildEntityName" is required');

        for(var attrId=0;attrId<mapping.attributes.length;attrId++){
            var currAttr = mapping.attributes[attrId];
            if(currAttr.rightAttr[0] === attributeName){
                console.assert(!angular.isUndefinedOrNullOrEmpty(currAttr.rightFactory),'The right factory of this child should be defined');
                return currAttr.rightFactory.slice(0,-factoryWordStringLength);
            }
        }
        return '';
    };




    var getLeftChildEntityName = function getLeftChildEntityName(mapping, attributeName) {
        setInverseMapping(mapping);
        return getRightChildEntityName(mapping._inverse, attributeName);
    };




    var getCacheIdentifier = function getCacheIdentifier(factoryName, identifierAttributes) {

        console.assert(!angular.isUndefinedOrNull(identifierAttributes), 'No identifier attributes found to calculate the cache identifier of this entity');
        console.assert(!angular.isUndefinedOrNullOrEmpty(factoryName), 'No factory found to calculate the cache identifier of this entity');

        var identifierAttributesArray = MFUtils.toArray(identifierAttributes);

        var secondPortion = '';
        for(var idxForCacheId=0; idxForCacheId<identifierAttributesArray.length;idxForCacheId++){

            if(identifierAttributesArray[idxForCacheId] === -1){
                return null;
            }

            if(secondPortion.length > 0){
                secondPortion += '_';
            }
            secondPortion += identifierAttributesArray[idxForCacheId];
        }

        return factoryName+'#'+secondPortion;
    };



    var applyConverter = function applyConverter(left2rightConverter, valueToConvert){

        console.assert(!angular.isUndefinedOrNull(valueToConvert),'The parameter "valueToConvert" of the function "applyConverter" is required');
        console.assert(!angular.isUndefinedOrNullOrEmpty(left2rightConverter) && left2rightConverter.length >= 2 ,'The parameter "left2rightConverter" of the function "applyConverter" is required');

        var convertedValue = null;
        var rightConverter = null;

        try {
            rightConverter = $injector.get(left2rightConverter[0]);
        }
        catch(e){
            console.log('left2rightConverter', left2rightConverter);
            console.error(e);
            throw new MFException('Cannot find the converter "'+left2rightConverter[0]+'", as defined in the mapping');
        }
        var rightConverterFunction = left2rightConverter[1];
        var rightConverterParam = left2rightConverter[2];

        console.assert(rightConverterFunction in rightConverter,'Cannot find the function "'+rightConverterFunction+'" in the converter "' + left2rightConverter[0] + '", as defined in the mapping' );

        if(angular.isUndefinedOrNull(rightConverterParam)){
            convertedValue = rightConverter[rightConverterFunction](valueToConvert);
        }
        else {
            convertedValue = rightConverter[rightConverterFunction](valueToConvert,rightConverterParam);
        }

        return convertedValue;

    };



    var setInverseMapping = function setInverseMapping(mapping){
        if( angular.isUndefinedOrNull(mapping._inverse) ){

            mapping._inverse = {};
            mapping._inverse.leftFactory = mapping.rightFactory;
            mapping._inverse.rightFactory = mapping.leftFactory;
            mapping._inverse.attributes = [];

            for (var attrMappingIndex in mapping.attributes) {
                mapping._inverse.attributes[attrMappingIndex] = {};
                mapping._inverse.attributes[attrMappingIndex].rightAttr = mapping.attributes[attrMappingIndex].leftAttr;
                mapping._inverse.attributes[attrMappingIndex].leftAttr = mapping.attributes[attrMappingIndex].rightAttr;

                mapping._inverse.attributes[attrMappingIndex].rightFactory = mapping.attributes[attrMappingIndex].leftFactory;
                mapping._inverse.attributes[attrMappingIndex].leftFactory = mapping.attributes[attrMappingIndex].rightFactory;

                mapping._inverse.attributes[attrMappingIndex].left2rightConverter = mapping.attributes[attrMappingIndex].right2leftConverter;
                mapping._inverse.attributes[attrMappingIndex].right2leftConverter = mapping.attributes[attrMappingIndex].left2rightConverter;

                mapping._inverse.attributes[attrMappingIndex].childIdentifier = mapping.attributes[attrMappingIndex].childIdentifier;

                mapping._inverse.attributes[attrMappingIndex].identifier = mapping.attributes[attrMappingIndex].identifier;
                mapping._inverse.attributes[attrMappingIndex].multiple = mapping.attributes[attrMappingIndex].multiple;
            }
        }

    };

    var getLeftIdAttribute = function getLeftIdAttribute(mapping){
        if(angular.isUndefined(mapping.leftIdAttribute)){
            for(var i=0;i<mapping.attributes.length;i++){
                if(mapping.attributes[i].identifier){
                    mapping.leftIdAttribute = mapping.attributes[i].leftAttr;
                }
            }
        }

        return mapping.leftIdAttribute;
    };


    var getLeftAttributesList = function getLeftAttributesList(mapping){
        if(angular.isUndefined(mapping.leftAttributesList)){
            mapping.leftAttributesList = [];
            for(var i=0;i<mapping.attributes.length;i++){
                mapping.leftAttributesList.push(mapping.attributes[i].leftAttr);
            }
        }
        return mapping.leftAttributesList;
    };



    var getRightIdAttribute = function getRightIdAttribute(mapping){
        if(angular.isUndefined(mapping.rightIdAttribute)){
            for(var i=0;i<mapping.attributes.length;i++){
                if(mapping.attributes[i].identifier){
                    mapping.rightIdAttribute = mapping.attributes[i].rightAttr;
                }
            }
        }

        return mapping.rightIdAttribute;
    };


    var convertAttrNameLeftToRight = function convertAttrNameLeftToRight(mapping, leftAttrName){
        for(var i=0;i<mapping.attributes.length;i++){

            if(angular.isArray(mapping.attributes[i].leftAttr) && mapping.attributes[i].leftAttr[0] === leftAttrName){
                return mapping.attributes[i].rightAttr;
            }
            else if(mapping.attributes[i].leftAttr === leftAttrName){
                return mapping.attributes[i].rightAttr;
            }
        }
        return null;
    };
    var convertAttrNameRightToLeft = function convertAttrNameRightToLeft(mapping, rightAttrName){
        for(var i=0;i<mapping.attributes.length;i++){

            if(angular.isArray(mapping.attributes[i].rightAttr) && mapping.attributes[i].rightAttr[0] === rightAttrName){
                return mapping.attributes[i].leftAttr;
            }
            else if(mapping.attributes[i].rightAttr === rightAttrName){
                return mapping.attributes[i].leftAttr;
            }
        }
        return null;
    };

    var hasRightAttr = function hasRightAttr(mapping, rightAttrName){
        for(var i=0;i<mapping.attributes.length;i++){
            if(angular.isArray(mapping.attributes[i].rightAttr) && mapping.attributes[i].rightAttr[0] === rightAttrName || mapping.attributes[i].rightAttr === rightAttrName){
                return true;
            }
        }
        return false;
    };


    var initChildAttribute = function initChildAttribute(entity, attrToInit, childFactoryName, childAttrId, attrMapping, cacheActive, mappedObjectsCache, checkAttrExistence ){

        console.assert(!angular.isUndefinedOrNull(entity),'the parameter "entity" of "initChildAttribute" is required');
        console.assert(!angular.isUndefinedOrNullOrEmpty(attrToInit),'the parameter "attrToInit" of "initChildAttribute" is required');
        console.assert(!angular.isUndefinedOrNullOrEmpty(attrMapping),'the parameter "attrMapping" of "initChildAttribute" is required');

        console.assert(!checkAttrExistence || attrToInit in entity,'the attr "'+attrToInit+'" is not defined in "'+entity.constructor.name+'"');


        //IF CHILD IN CACHE, USE IT

        // try to get the child object from the cache


        var cachedFound = false;

        if ( cacheActive && !angular.isUndefinedOrNull(childAttrId)) {

            // get child from cache
            var cacheChildId = getCacheIdentifier(childFactoryName, childAttrId);

            var cachedChild = null;

            if(!angular.isUndefinedOrNull(cacheChildId)){
                cachedChild = mappedObjectsCache[cacheChildId];
            }

            if (!angular.isUndefinedOrNull(cachedChild)) {
                entity[attrToInit] = cachedChild;
                cachedFound = true;
            }
        }

        // ELSE CALL FACTORY
        if (!cachedFound && angular.isUndefinedOrNull(entity[attrToInit])) {


            if(!angular.isUndefinedOrNullOrEmpty(childFactoryName)){
                // create child object with child factory
                try {
                    var childFactory = $injector.get(childFactoryName);
                    entity[attrToInit] = childFactory.createInstance();
                }
                catch (e) {
                    throw new MFException('The factory "' + childFactoryName + '" defined for the attribute "' + attrToInit + '" of "'+entity.constructor.name+'" is not valid');
                }
            }
            else {
                entity[attrToInit] = {};
                console.warn('there is no factory defined to build the attribute '+attrToInit);
            }

        }
    };



    return {
        convertListRightIntoLeft: convertListRightIntoLeft,
        convertRightIntoLeft: convertRightIntoLeft,
        convertListLeftIntoRight: convertListLeftIntoRight,
        convertLeftIntoRight: convertLeftIntoRight,

        getCacheIdentifier:getCacheIdentifier,
        getRightChildEntityName:getRightChildEntityName,
        getLeftChildEntityName:getLeftChildEntityName,
        getLeftChildrenGroupings:getLeftChildrenGroupings,
        getLeftIdAttribute:getLeftIdAttribute,
        convertAttrNameLeftToRight:convertAttrNameLeftToRight,
        convertAttrNameRightToLeft:convertAttrNameRightToLeft,
        hasRightAttr: hasRightAttr,
        convertAttributeRightIntoLeft: convertAttributeRightIntoLeft,
        getRightIdAttribute:getRightIdAttribute,
        getLeftAttributesList:getLeftAttributesList
    };
}]);



