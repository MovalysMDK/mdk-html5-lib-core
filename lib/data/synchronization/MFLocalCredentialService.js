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

angular.module('mfcore').factory('MFLocalCredentialService', ['MFUtils', '$q', 'MFConfigurationService', 'MFDeviceInfo',
    function (MFUtils, $q, MFConfigurationService, MFDeviceInfo) {

        return {


            getUniqueId: function () {

                var resourceId = MFConfigurationService.getValue('resourceId', null);

                if (angular.isUndefinedOrNull(resourceId)) {
                    resourceId = MFDeviceInfo.UUID;
                    MFConfigurationService.setValue('resourceId', resourceId);
                }
                return MFConfigurationService.getValue('resourceId', null);
            },

            getPreviousSyncDate: function () {
                return  parseInt(MFConfigurationService.getValue('previousSyncDate', 0), 10);
            },

            isPreviousSyncDate: function () {
                return angular.isUndefinedOrNull(MFConfigurationService.getValue('previousSyncDate', null));
            },

            setPreviousSyncDate: function (p_oDate) {
                if (angular.isUndefinedOrNull()) {
                    p_oDate = Date.now();
                }
                MFConfigurationService.setValue('synchronizationMaxTimeWithoutSync', p_oDate);
            },


            /**
             * Check that the period of the last synchronization is not exceeded
             * @returns {*|boolean}
             */
            isSynchronizationDelayExceeded: function () {

                var dateNow = Date.now();
                var synchronizationMaxTimeWithoutSync = MFConfigurationService.getValue('synchronizationMaxTimeWithoutSync', null);
                var previousSyncDate = this.getPreviousSyncDate();

                return angular.isUndefinedOrNull(synchronizationMaxTimeWithoutSync) || dateNow > (previousSyncDate + (synchronizationMaxTimeWithoutSync * 1000));

            },

            /**
             * Test if you can continue to use local data, synchronization and delay ok not exceeded
             * @returns {boolean}
             */
            doIdentify: function () {

                if (!angular.isUndefinedOrNull(MFConfigurationService.getValue('username', null)) && !angular.isUndefinedOrNull(MFConfigurationService.getValue('password', null)) && !angular.isUndefinedOrNull(this.getUniqueId())) {
                    console.log('Ok pour les params');
                    if (this.getPreviousSyncDate() !== 0) {
                        console.log('ok il  ya deja eu une synchro');
                        if (!this.isSynchronizationDelayExceeded()) {
                            console.log('ok la date max est pas encore passé');
                            return true;
                        }
                    }
                }
                console.log('c pas bon pour la synchro ou la date est passé');
                return false;

            }


        };

    }]);
