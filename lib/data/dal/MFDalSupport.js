'use strict';
/**
 * Created by Cabelguen on 28/03/14.
 */

angular.module('mfcore').factory('MFDalSupport', ['MFIntegerConverter', 'MFConfigurationService', 'MFDeviceInfo', function (MFIntegerConverter, MFConfigurationService, MFDeviceInfo) {


    var MFDalSupport = function MFDalSupport() {
        Object.defineProperty(this,'selectedDatabase', {
            value: null,
            enumerable: true,
            configurable: false,
            writable: true
        });
        Object.defineProperty(this,'selectedComparator', {
            value: null,
            enumerable: true,
            configurable: false,
            writable: true
        });

    };

    var getComparatorScore = function(comparator) {
        if (angular.isUndefinedOrNullOrEmpty(comparator)) {
            return 0;
        }
        if (comparator === '*') {
            return 1;
        }
        if (comparator === '<=' || comparator === '=<' || comparator === '>=' || comparator === '=>') {
            return 2;
        }
        if (comparator === '<' || comparator === '>') {
            return 3;
        }
        if (comparator === '=' || comparator === '==') {
            return 4;
        }
    };

    MFDalSupport.prototype.init = function(){
        var selectedDatabase = MFConfigurationService.getValue('selectedDatabase', null);

        if(selectedDatabase === null){
            this.evaluatePlatform();
            MFConfigurationService.setValue('selectedDatabase', this.selectedDatabase);
        }
        else {
            this.selectedDatabase = selectedDatabase;
            this.selectedComparator = '*';
        }
    };


    MFDalSupport.prototype.evaluatePlatform = function () {


        var dataBaseType = MFConfigurationService.getValue('dataBaseType', null);

        console.assert(!angular.isUndefinedOrNullOrEmpty(dataBaseType),'dataBaseType should be defined in the configuration');

        var platformType = MFDeviceInfo.isNative ? 'native':'browser';

        console.assert(!angular.isUndefinedOrNullOrEmpty(dataBaseType[platformType]),'dataBaseType.'+platformType+' should be defined in the configuration');

        var platformName = MFDeviceInfo.platform.toLowerCase();
        var prefBaseTypes;
        if (dataBaseType[platformType].hasOwnProperty(platformName)) {
            prefBaseTypes = dataBaseType[platformType][platformName];
        }
        else {
            console.warn(platformName+'not found in the configuration => use default');
            prefBaseTypes  = dataBaseType[platformType]['default'];
        }

        this.selectedComparator = null;
        var deviceVersion = MFIntegerConverter.fromVersion(MFDeviceInfo.deviceVersion);

        for (var i=0;i<prefBaseTypes.length;i++) {

            var currentPreference = prefBaseTypes[i];

            if(getComparatorScore(currentPreference.comparator) >= getComparatorScore(this.selectedComparator)) {

                var preferenceMatch = false;
                var currentPreferenceVersion = MFIntegerConverter.fromVersion(currentPreference.version);

                if (currentPreference.comparator === '*') {
                    preferenceMatch = true;

                } else if (currentPreference.comparator === '=' || currentPreference.comparator === '==') {
                    preferenceMatch = (deviceVersion === currentPreferenceVersion);

                } else if (currentPreference.comparator === '<'){
                    preferenceMatch = (deviceVersion < currentPreferenceVersion);

                } else if (currentPreference.comparator === '>') {
                    preferenceMatch = (deviceVersion > currentPreferenceVersion);

                } else if (currentPreference.comparator === '<=' || currentPreference.comparator === '=<') {
                    preferenceMatch = (deviceVersion <= currentPreferenceVersion);

                } else if (currentPreference.comparator === '>=' || currentPreference.comparator === '=>') {
                    preferenceMatch = (deviceVersion >= currentPreferenceVersion);

                }

                if(preferenceMatch) {
                    this.selectedDatabase = currentPreference.database.toUpperCase();
                    this.selectedComparator = currentPreference.comparator;
                }

            }
        }


    };

    MFDalSupport.prototype.getDalSupportDeviceAndBase = function () {


        return MFDeviceInfo.platform + '_' + this.getDalSupportBase();
    };

    MFDalSupport.prototype.getDalSupportBase = function () {

        if (angular.isUndefinedOrNullOrEmpty(this.selectedDatabase)) {
            this.init();
        }
        return this.selectedDatabase;
    };

    return new MFDalSupport();

}]);