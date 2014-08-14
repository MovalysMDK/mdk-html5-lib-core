'use strict';
/**
 * MFConfigurationService
 *
 */


var MFSystemModule = angular.module('mfcore');

MFSystemModule.value('MFConfigurationValues', {
    'mdk-config-file': 'assets/config/mdk-config.json',
    'project-config-file': 'assets/config/project-config.json'
});

MFSystemModule.factory('MFConfigurationService', ['MFSystem', 'MFConfigurationValues', '$q', function (MFSystem, MFConfigurationValues, $q) {
    // instance du service
    var MFConfigurationService = function MFConfigurationService() {
        var _registry = {};
        Object.defineProperty(this, 'registry', {
            get: function () {
                return _registry;
            },
            set: function (value) {
                _registry = value;
            },
            enumerable: true,
            configurable: false
        });
    };
    //registry accessors
    MFConfigurationService.prototype.getValue = function (key, defaultValue) {
        if (!(key in this.registry)) {
            return defaultValue;
        } else {
            return this.registry[key];
        }
    };
    MFConfigurationService.prototype.setValue = function (key, value) {
        this.registry[key] = value;
        if(Modernizr.localstorage){
            localStorage['configuration#registry'] = JSON.stringify(this.registry);
        }
    };

    MFConfigurationService.prototype.userConfigIsValid = function () {
        return (this.getValue('username', '') !== '' &&
            this.getValue('password', '') !== '');
    };

    //registry init
    MFConfigurationService.prototype.init = function () {
        var deferred = $q.defer();

        var params = ['mdk-config-file', 'project-config-file'];
        var self = this;
        var registryData;
        if(Modernizr.localstorage) {
            registryData = localStorage['configuration#registry'];
        }
        if (registryData === undefined) {
            var parallelCalls = [];

            angular.forEach(params, function (value, key) {
                parallelCalls.push(
                    MFSystem.getAsset(MFConfigurationValues[value], false).then(
                        function (response) {
                            self.registry = merge(self.registry, response.data);
                        },
                        function (error) {
                            deferred.reject(error);
                        }
                    )
                );
            });
            $q.all(parallelCalls).then(
                function (response) {
                    if(Modernizr.localstorage) {
                        localStorage['configuration#registry'] = JSON.stringify(self.registry);
                    }
                    deferred.resolve(self.registry);
                },
                function (error) {
                    deferred.reject(error);
                }
            );
        } else {
            self.registry = JSON.parse(registryData);
            deferred.resolve(self.registry);
        }

        return deferred.promise;
    };

    //merge
    var merge = function (obj1, obj2) {
        console.assert(!angular.isUndefinedOrNull(obj1), 'MFConfigurationService.merge(): The parameter obj1 is required');
        console.assert(!angular.isUndefinedOrNull(obj2), 'MFConfigurationService.merge(): The parameter obj2 is required');

        var result = null;

        if (angular.isArray(obj1) && angular.isArray(obj2)) {
            result = angular.copy(obj1);

            for(var i2=0;i2 < obj2.length;i2++){
                var isInObj1 = false;
                for(var i1=0;i1 < obj1.length;i1++){
                    if(angular.equals(obj1[i1],obj2[i2])){
                        isInObj1 = true;
                        break;
                    }
                }
                if(!isInObj1){
                    result.push(obj2[i2]);
                }
            }
        }
        else {

            result = {};

            for (var attr1 in obj1) {
                if (obj1.hasOwnProperty(attr1)) {
                    if (attr1 in obj2){
                        if( typeof obj1[attr1] === 'object' ) {
                            result[attr1] = merge(obj1[attr1], obj2[attr1]); // if it's an object, merge
                        }
                        else {
                            result[attr1] = obj2[attr1];
                        }
                    }
                    else {
                        result[attr1] = obj1[attr1]; // add it to result
                    }
                }
            }
            for (var attr2 in obj2) {
                if (obj2.hasOwnProperty(attr2)) {
                    if (!(attr2 in result)) {
                        result[attr2] = obj2[attr2];
                    }
                }
            }
        }

        return result;
    };
    return new MFConfigurationService(MFConfigurationValues);
}]);