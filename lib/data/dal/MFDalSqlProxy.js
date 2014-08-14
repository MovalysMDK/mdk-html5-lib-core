'use strict';
/**
 * Created by Cabelguen on 28/03/14.
 */

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