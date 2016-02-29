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

angular.module('mfcore').factory('MFDalNoSqlProxy',
    ['$injector', 'MFDalException', 'MFDatabaseTypeSelector',
        function ($injector, MFDalException, MFDatabaseTypeSelector) {

            var MFDalNoSqlProxy = function MFDalNoSqlProxy() {
                //constructor
                this.pointerDal = null;
            };


            MFDalNoSqlProxy.prototype.getPointer = function () {

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
            MFDalNoSqlProxy.prototype.openDatabase = function openDatabase(onUpgradeNeeded) {

                return this.getPointer().openDatabase(onUpgradeNeeded);
            };
            MFDalNoSqlProxy.prototype.initDatabase = function initDatabase(createStoresScripts) {
                return this.getPointer().initDatabase(createStoresScripts);
            };


            MFDalNoSqlProxy.prototype.closeDatabase = function closeDatabase() {

                return this.getPointer().closeDatabase();
            };

            MFDalNoSqlProxy.prototype.deleteDatabase = function deleteDatabase() {

                return this.getPointer().deleteDatabase();
            };

            MFDalNoSqlProxy.prototype.openTransaction = function openTransaction() {

                return this.getPointer().openTransaction();
            };

            MFDalNoSqlProxy.prototype.clearObjectStore = function (context, objectStoreName) {

                return this.getPointer().clearObjectStore(context, objectStoreName);
            };

            MFDalNoSqlProxy.prototype.find = function find(context, objectStoreName, propertyValues, propertyName, filteringFunction) {
                return this.getPointer().find(context, objectStoreName, propertyValues, propertyName, filteringFunction);
            };

            MFDalNoSqlProxy.prototype.insert = function (context, objectStore, data, idAttributeName) {

                return this.getPointer().insert(context, objectStore, data, idAttributeName);
            };

            MFDalNoSqlProxy.prototype.save = function (context, objectStore, data, idAttributeName) {

                return this.getPointer().save(context, objectStore, data, idAttributeName);
            };

            MFDalNoSqlProxy.prototype.remove = function (context, objectStore, key) {

                return this.getPointer().remove(context, objectStore, key);
            };

            MFDalNoSqlProxy.prototype.getAll = function (context, objectStore) {

                return this.getPointer().findByFilter(context, objectStore);
            };

            MFDalNoSqlProxy.prototype.prepare = function (context, objectStores, writable) {

                return this.getPointer().prepare(context, objectStores, writable);
            };

            MFDalNoSqlProxy.prototype.getLastId = function (context, objectStores) {

                return this.getPointer().getLastId(context, objectStores);
            };

            return new MFDalNoSqlProxy();

        }]);