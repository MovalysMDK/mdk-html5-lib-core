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
/**
 * Utils
 */

angular.module('mfcore').factory('MFInitConfiguration', ['MFAbstractInitTask', 'MFInitTaskStatus', 'MFConfigurationService', 'MFDeviceInfo', function (MFAbstractInitTask, MFInitTaskStatus, MFConfigurationService, MFDeviceInfo) {
    var initTask = new MFAbstractInitTask();
    initTask.brief = 'Configuration';

    initTask.run = function (context, firstLaunch) {
        var self = this;
        self.status = MFInitTaskStatus.STARTED;
        MFConfigurationService.init().then(
            function (result) {
                //
                console.setLogLevel(MFConfigurationService.getValue('logLevel'));
                //console.logLevel = MFConfigurationService.getValue('logLevel');

                console.log('[APP CONFIGURATION] ',MFConfigurationService.registry);

                MFDeviceInfo.init().then(
                    function success(){
                        console.log('[DEVICE INFOS] ',MFDeviceInfo);
                        self.status = MFInitTaskStatus.SUCCEEDED;

                    },
                    function failure(error){
                        context.addError(error);
                        self.status = MFInitTaskStatus.FAILED;
                    }
                );
            },
            function (error) {
                context.addError(error);
                self.status = MFInitTaskStatus.FAILED;
            }
        );
    };
    return initTask;
}]);
