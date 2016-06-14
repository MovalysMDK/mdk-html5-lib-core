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

angular.module('mfcore').factory('MFDalSqlite', ['$rootScope', 'MFUtils', 'MFSyncPromiseProvider', 'MFDalException', 'MFConfigurationService', 'MFDalWebSql',
    function ($rootScope, MFUtils, MFSyncPromiseProvider, MFDalException, MFConfigurationService, MFDalWebSql) {

        var MFDalSqlite = function MFDalSqlite() {
            MFDalSqlite._Parent.call(this);
        };

        MFUtils.extendFromInstance(MFDalSqlite, MFDalWebSql);

        MFDalSqlite.prototype.openDatabase = function (purge) {
            purge = purge !== undefined && purge;
            var self = this;
            localStorage.addNotSuppressibleKey('dalWebSql#systemTables');

            var deferred = MFSyncPromiseProvider.defer();
            if (window.sqlitePlugin.openDatabase) {
                if (angular.isUndefinedOrNull(this.dbConnection)) {

                    var databaseConfig = MFConfigurationService.getValue('databaseConfig');

                    console.assert(!angular.isUndefinedOrNull(databaseConfig), 'MFConfigurationService.openDatabase() : databaseConfig field undefined');
                    this.dbConnection = window.sqlitePlugin.openDatabase({
                        name: databaseConfig.name,
                        iosDatabaseLocation: 'Library',
                        bgType: 1
                    });

                    if (this.dbConnection) {
                        if (localStorage['dalWebSql#systemTables'] === undefined) {
                            this.getSystemTableNames().then(function () {
                                deferred.resolve(self.dbConnection);
                            }, function () {
                                deferred.reject();
                            });
                        } else {
                            if (purge) {
                                var systemTables = JSON.parse(localStorage['dalWebSql#systemTables']);
                                this.purgeDatabase(systemTables).then(function () {
                                    deferred.resolve(self.dbConnection);
                                }, function () {
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
                throw new MFDalException('SqlLite for this API is not available');
            }
            return deferred.promise;
        };

        return new MFDalSqlite();
    }]);

