'use strict';
/**
 * Created by Cabelguen on 28/03/14.
 */

angular.module('mfcore').factory('MFDatabaseTypeSelector', ['MFIntegerConverter', 'MFConfigurationService', 'MFDeviceInfo','MFDalException', function (MFIntegerConverter, MFConfigurationService, MFDeviceInfo,MFDalException) {


    var MFDatabaseTypeSelector = function MFDatabaseTypeSelector() {
        Object.defineProperty(this,'selectedDatabase', {
            value: null,
            enumerable: true,
            configurable: false,
            writable: true
        });
        Object.defineProperty(this,'platform', {
            value: null,
            enumerable: true,
            configurable: false,
            writable: true
        });
        Object.defineProperty(this,'platformType', {
            value: null,
            enumerable: true,
            configurable: false,
            writable: true
        });
        Object.defineProperty(this,'databaseType', {
            value: null,
            enumerable: true,
            configurable: false,
            writable: true
        });
    };

    var availableDatabasesList = {
        NoSql:[
            'IndexedDB',
            'Couchbase'
        ],
        Sql:[
            'WebSql',
            'SQLiteForAndroid',
            'SQLiteForIos',
            'SQLiteForWp8',
            'SQLiteForWindows8'
        ]
    };


    MFDatabaseTypeSelector.prototype.getDaoClassName = function (entityName) {
        if (angular.isUndefinedOrNullOrEmpty(this.databaseType)) {
            this.init();
        }
        return entityName+'Dao'+this.databaseType;
    };

    MFDatabaseTypeSelector.prototype.getDalClassName = function () {
        if (angular.isUndefinedOrNullOrEmpty(this.selectedDatabase)) {
            this.init();
        }
        return 'MFDal'+this.selectedDatabase;
    };

    MFDatabaseTypeSelector.prototype.isSQL = function () {
        if (angular.isUndefinedOrNullOrEmpty(this.databaseType)) {
            this.init();
        }
        return this.databaseType === 'Sql';
    };

    MFDatabaseTypeSelector.prototype.isNoSQL = function () {
        if (angular.isUndefinedOrNullOrEmpty(this.databaseType)) {
            this.init();
        }
        return this.databaseType === 'NoSql';
    };

    MFDatabaseTypeSelector.prototype.init = function(){
        var selectedDatabase = MFConfigurationService.getValue('selectedDatabase', null);
        var platform = MFConfigurationService.getValue('dalPlatform', null);
        var platformType = MFConfigurationService.getValue('dalPlatformType', null);
        var databaseType = MFConfigurationService.getValue('dalDatabaseType', null);


        if(selectedDatabase === null || platform === null || platformType === null){
            this.evaluatePlatform();
            MFConfigurationService.setValue('selectedDatabase', this.selectedDatabase);
            MFConfigurationService.setValue('dalPlatform', this.platform);
            MFConfigurationService.setValue('dalPlatformType', this.platformType);
            MFConfigurationService.setValue('dalDatabaseType', this.databaseType);
        }
        else {
            this.selectedDatabase = selectedDatabase;
            this.platform = platform;
            this.platformType = platformType;
            this.databaseType = databaseType;
        }
    };


    MFDatabaseTypeSelector.prototype.evaluatePlatform = function () {

        var dbPrefFromConfigJson = MFConfigurationService.getValue('dataBaseType', null);
        this.platformType = MFDeviceInfo.isNative ? 'native':'browser';

        this.selectedDatabase = null;
        this.platform = MFDeviceInfo.isNative ? MFDeviceInfo.deviceOS : MFDeviceInfo.browser;

        if (
            !angular.isUndefinedOrNullOrEmpty(dbPrefFromConfigJson) &&
            !angular.isUndefinedOrNullOrEmpty(dbPrefFromConfigJson[this.platformType]) &&
            dbPrefFromConfigJson[this.platformType].hasOwnProperty(this.platform.toLowerCase())) {

            var prefBaseTypes = dbPrefFromConfigJson[this.platformType][this.platform.toLowerCase()];

            if(prefBaseTypes){
                var selectedComparator = null;
                var platformVersion;
                if(MFDeviceInfo.isNative) {
                    platformVersion = MFIntegerConverter.fromVersion(MFDeviceInfo.deviceVersion);
                }
                else {
                    platformVersion = MFIntegerConverter.fromVersion(MFDeviceInfo.browserVersion); // to replace by MFDeviceInfo.browserMajorVersion
                }
                for (var i=0;i<prefBaseTypes.length;i++) {

                    var currentPreference = prefBaseTypes[i];
                    if (currentPreference.version === '*') {
                        currentPreference.comparator = '*';
                    }

                    if(getComparatorScore(currentPreference.comparator) >= getComparatorScore(selectedComparator)) {

                        var preferenceMatch = false;
                        var currentPreferenceVersion = MFIntegerConverter.fromVersion(currentPreference.version);

                        if (currentPreference.comparator === '*') {
                            preferenceMatch = true;

                        } else if (currentPreference.comparator === '=' || currentPreference.comparator === '==') {
                            preferenceMatch = (platformVersion === currentPreferenceVersion);

                        } else if (currentPreference.comparator === '<'){
                            preferenceMatch = (platformVersion < currentPreferenceVersion);

                        } else if (currentPreference.comparator === '>') {
                            preferenceMatch = (platformVersion > currentPreferenceVersion);

                        } else if (currentPreference.comparator === '<=' || currentPreference.comparator === '=<') {
                            preferenceMatch = (platformVersion <= currentPreferenceVersion);

                        } else if (currentPreference.comparator === '>=' || currentPreference.comparator === '=>') {
                            preferenceMatch = (platformVersion >= currentPreferenceVersion);

                        }

                        if(preferenceMatch) {
                            this.setSelectedDatabase(currentPreference.database);
                            selectedComparator = currentPreference.comparator;
                        }

                    }
                }
            }
        }

        if(this.selectedDatabase === null){
            console.warn(this.platform+' ('+this.platformType+') not found in the configuration => use default');
            if(Modernizr.indexedDB){
                this.setSelectedDatabase('IndexedDB');
            }
            else if(Modernizr.websqldatabase){
                this.setSelectedDatabase('WebSql');
            }
            else {
                throw new MFDalException('Your browser does not support local database');
            }
        }
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

    MFDatabaseTypeSelector.prototype.setSelectedDatabase = function (database) {

        if(availableDatabasesList.NoSql.indexOf(database) >= 0){
            this.selectedDatabase = database;
            this.databaseType = 'NoSql';
        }
        else if(availableDatabasesList.Sql.indexOf(database) >= 0){
            this.selectedDatabase = database;
            this.databaseType = 'Sql';
        }
        else {
            throw new MFDalException(database+'is an unknown type of database');

        }


    };

    return new MFDatabaseTypeSelector();

}]);