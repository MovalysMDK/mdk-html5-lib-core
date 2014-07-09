'use strict';

/**
* @file MFDalSqliteIos.js
* @brief Data Access Layer
* @author Francois Cabelguen
* @date 19/05/2014
*
* Copyright (c) 2014 Sopra Group. All rights reserved.
*
*/


angular.module('mfcore').factory('MFDalSqliteIos', ['$rootScope', 'MFUtils', 'MFSyncPromiseProvider', 'MFDalException','MFConfigurationService','MFDalWebSql',
    function ($rootScope, MFUtils, MFSyncPromiseProvider, MFDalException, MFConfigurationService, MFDalWebSql) {

    var MFDalSqliteIos = function MFDalSqliteIos(){
        MFDalSqliteIos._Parent.call(this);
    };

    MFUtils.extendFromInstance(MFDalSqliteIos, MFDalWebSql);

    MFDalSqliteIos.prototype.openDatabase = function(purge) {
        purge = purge !== undefined && purge;
        var self = this;
        localStorage.notSuppressibleKeys.push('dalWebSql#systemTables');

        var deferred = MFSyncPromiseProvider.defer();
        if (window.sqlitePlugin.openDatabase) {
            if (angular.isUndefinedOrNull(this.dbConnection)) {

                var databaseConfig = MFConfigurationService.getValue('databaseConfig');

                console.assert(!angular.isUndefinedOrNull(databaseConfig), 'MFConfigurationService.openDatabase() : databaseConfig field undefined');
                this.dbConnection = window.sqlitePlugin.openDatabase({name: databaseConfig.name, bgType: 1});

                if (this.dbConnection){
                    if (localStorage['dalWebSql#systemTables'] === undefined) {
                        this.getSystemTableNames().then(function() {
                            deferred.resolve(self.dbConnection);
                        }, function() {
                            deferred.reject();
                        });
                    } else {
                        if (purge) {
                            var systemTables = JSON.parse(localStorage['dalWebSql#systemTables']);
                            this.purgeDatabase(systemTables).then(function() {
                                deferred.resolve(self.dbConnection);
                            }, function() {
                                deferred.reject();
                            });
                        } else {
                            deferred.resolve(self.dbConnection);
                        }
                    }
                } else {
                    deferred.reject();
                }
            }
        } else {
            throw new MFDalException('SqlLite for iOS API is not available');
        }
        return deferred.promise;
    };

    return new MFDalSqliteIos();
}]);

