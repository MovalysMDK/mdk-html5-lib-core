'use strict';
/**
 * Utils
 * Created by Cabelguen on 21/01/14.
 */




angular.module('mfcore').factory('MFUtils', function () {
	var MFUtils = function MFUtils() {};

    MFUtils.toArray = function(obj) {
        if(angular.isArray(obj)){
            return obj;
        }
        else {
            return [obj];
        }
    };


	MFUtils.isUndefinedOrNullOrEmpty = function (value) {
		return angular.isUndefined(value)  ||  value.length === 0;
	};

	MFUtils.isUndefinedOrNull = function(obj) {
		return angular.isUndefined(obj)  || obj===null;
	};


    MFUtils.extend = function (childClass, parentClass) {
		console.assert(!angular.isUndefinedOrNull(childClass), 'The parameter "childClass" of the function "extend" is required');
		console.assert(!angular.isUndefinedOrNull(parentClass), 'The parameter "parentClass" of the function "extend" is required');

		for (var staticProperty in parentClass) {
			childClass[staticProperty] = parentClass[staticProperty];
		}

		var tmp__ = Object.create(parentClass.prototype);
		tmp__.constructor = childClass;
		childClass.prototype = tmp__;

		Object.defineProperty(childClass, '_Parent', {
			value: parentClass,
			writable: false,
			enumerable: false,
			configurable: false
		});

		Object.defineProperty(childClass, '_super', {
			value: parentClass.prototype,
			writable: false,
			enumerable: false,
			configurable: false
		});
	};

	MFUtils.extendFromInstance = function (childClass, parentInstance) {
        MFUtils.extend(childClass, parentInstance.constructor);
	};

	MFUtils.defineAttributes = function(object, names, writable, configurable, enumerable) {
		writable = writable === undefined || !!writable;
		configurable = !(configurable === undefined || !!configurable);
		enumerable = enumerable === undefined || !!enumerable;

		for (var i = 0; i < names.length; ++i) {
			Object.defineProperty(object, names[i], {
				value: null,
				writable: writable,
				configurable: configurable,
				enumerable: enumerable
			});
		}
	};

    MFUtils.isAttrInObject = function(obj){
        for(var key in obj) {
            if (obj.hasOwnProperty(key)) {
                return true;
            }
        }
        return false;
    };

    Object.freeze(MFUtils);
	return MFUtils;
});



