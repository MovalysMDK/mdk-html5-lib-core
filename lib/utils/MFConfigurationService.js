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

MFSystemModule.factory('MFConfigurationService', ['MFSystem', 'MFConfigurationValues','$q', function (MFSystem, MFConfigurationValues,$q) {
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
        localStorage['configuration#registry'] = JSON.stringify(this.registry);
    };

    MFConfigurationService.prototype.userConfigIsValid = function () {
        return (this.getValue('username', '') !== '' &&
                this.getValue('password', '') !== '');
    };

    //registry init
    MFConfigurationService.prototype.init = function() {
        var deferred = $q.defer();

        var params = ['mdk-config-file','project-config-file'];
        var self = this;
        var registryData = localStorage['configuration#registry'];
        if (registryData === undefined) {
            var parallelCalls = [];

            angular.forEach(params, function(value, key) {
                parallelCalls.push(
                        MFSystem.getAsset(MFConfigurationValues[value], false).then(
                                function(response){
                                    self.registry = merge(self.registry, response.data);
                                },
                                function(error){
                                    deferred.reject(error);
                                }
                        )
                );
            });
            $q.all(parallelCalls).then(
                    function(response){
                        localStorage['configuration#registry'] = JSON.stringify(self.registry);
                        deferred.resolve(self.registry);
                    },
                    function(error){
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
    var merge = function(obj1,obj2){
        console.assert(!angular.isUndefinedOrNull(obj1), 'MFConfigurationService.merge(): The parameter obj1 is required');
        console.assert(!angular.isUndefinedOrNull(obj2), 'MFConfigurationService.merge(): The parameter obj2 is required');

        var result = null;

        if (angular.isArray(obj1) || angular.isArray(obj1)){
            result = obj1.concat(obj2);
        }
        else {

            result = {};

            for (var i in obj1) {
                if ( (i in obj2) && (typeof obj1[i] === 'object') && (i !== null) ) {
                    result[i] = merge(obj1[i],obj2[i]); // if it's an object, merge
                }
                else {
                    result[i] = obj1[i]; // add it to result
                }
            }
            for (var j in obj2) {
                //conflict overide by obj2 last config object is always right
                if (j in result && typeof obj2[j] === 'object') {
                    console.info('The config parameter "'+j+'" is overwritten');
                    continue;
                }
                result[j] = obj2[j];
            }
        }

        return result;
    };
    return new MFConfigurationService(MFConfigurationValues);
}]);