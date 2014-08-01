'use strict';
/**
 * Created by Cabelguen on 28/03/14.
 */

angular.module('mfcore').factory('MFDalSqlProxy',
    ['$injector', 'MFDalException', 'MFDalSupport',
        function ($injector, MFDalException, MFDalSupport) {

            var MFDalSqlProxy = function MFDalSqlProxy() {
                //constructor
                this.pointerDal = null;
            };


            MFDalSqlProxy.prototype.getPointer = function () {

                if (this.pointerDal === null) {
                    switch (MFDalSupport.getDalSupportDeviceAndBase()) {
                        case 'WEB_WEBSQL':
                        case 'CHROME_WEBSQL':
                        case 'SAFARI_WEBSQL':
                        case 'IE_WEBSQL':
                        case 'FIREFOX_WEBSQL':
                        case 'ANDROID_WEBSQL':
                        case 'ANDROID_WEBSQL':
                        case 'ANDROID_WEBSQL':
                        case 'IOS_WEBSQL':
                            this.pointerDal = $injector.get('MFDalWebSql');
                            break;
                        case 'ANDROID_SQLITE':
                            this.pointerDal = $injector.get('MFDalSqliteAndroid');
                            break;
                        case 'IOS_SQLITE':
                            this.pointerDal = $injector.get('MFDalSqliteIos');
                            break;
                        case 'WINDOWS8_SQLITE':
                            this.pointerDal = $injector.get('MFDalSqliteWindows8');
                            break;
                        case 'WP8_SQLITE':
                            this.pointerDal = $injector.get('MFDalSqliteWp8');
                            break;
                        default:
                            throw new MFDalException('Cannot find mapping DAL to ' + MFDalSupport.getDalSupportDeviceAndBase());
                    }
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