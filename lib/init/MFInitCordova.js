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

angular.module('mfcore').factory('MFInitCordova', ['MFAbstractInitTask', 'MFInitTaskStatus', 'MFCordova', 'MFConfigurationService', 'MFCordovaStatusEnum', function (MFAbstractInitTask, MFInitTaskStatus, MFCordova, MFConfigurationService, MFCordovaStatusEnum) {
    var initTask = new MFAbstractInitTask();
    initTask.brief = 'Cordova';
    initTask.run = function (context, firstLaunch) {

        var self = this;

        var onCordovaAvailable = function onCordovaAvailable() {
            MFCordova.status = MFCordovaStatusEnum.AVAILABLE;
        };

        if (Modernizr.localstorage && localStorage['cordova#status'] === MFCordovaStatusEnum.NOT_AVAILABLE.key) {
            MFCordova.status = MFCordovaStatusEnum.NOT_AVAILABLE;
        } else {
            if (window.device === undefined) {
                document.addEventListener('deviceready', onCordovaAvailable, false);
                setTimeout(function () {
                    document.removeEventListener('deviceready', onCordovaAvailable, false);
                    if (MFCordova.status !== MFCordovaStatusEnum.AVAILABLE) {
                        MFCordova.status = MFCordovaStatusEnum.NOT_AVAILABLE;
                    }
                }, 2000);
            } else {
                MFCordova.status = MFCordovaStatusEnum.AVAILABLE;
            }
        }


        var onCordovaStatusChange = function () {
            if(Modernizr.localstorage){
                localStorage['cordova#status'] = MFCordova.status.key;
            }
            self.status = MFInitTaskStatus.SUCCEEDED;
        };

        MFCordova.onCordovaReady(onCordovaStatusChange, onCordovaStatusChange);


    };
    return initTask;
}]);