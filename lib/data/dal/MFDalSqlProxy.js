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

angular.module('mfcore').factory('MFDalSqlProxy',
    ['$injector', 'MFDalException', 'MFDatabaseTypeSelector',
        function ($injector, MFDalException, MFDatabaseTypeSelector) {

            var MFDalSqlProxy = function MFDalSqlProxy() {
                //constructor
                this.pointerDal = null;
            };


            MFDalSqlProxy.prototype.getPointer = function () {

                if (this.pointerDal === null) {
                    this.pointerDal = $injector.get(MFDatabaseTypeSelector.getDalClassName());
                }
                return this.pointerDal;
            };

            /**
             * Open Database Interface
             * @param context
             * @returns {*}
             */
            MFDalSqlProxy.prototype.openDatabase = function openDatabase(firstLaunch) {

                return this.getPointer().openDatabase(firstLaunch);
            };

            MFDalSqlProxy.prototype.closeDatabase = function closeDatabase(context) {

                return this.getPointer().closeDatabase(context);
            };

            MFDalSqlProxy.prototype.executeQuery = function executeQuery(context, query, parameters) {

                return this.getPointer().executeQuery(context, query, parameters);
            };

            MFDalSqlProxy.prototype.executeQueries = function executeQueries(context, queries) {

                return this.getPointer().executeQueries(context, queries);
            };

            MFDalSqlProxy.prototype.dbConnection = function dbConnection() {

                return this.getPointer().dbConnection;
            };

            return new MFDalSqlProxy();

        }]);