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

angular.module('mfcore').factory('MFInitEvent', ['MFAbstractEnum', function (MFAbstractEnum) {
    var MFInitEvent = function MFInitEvent(type, task, progress, context) {
        Object.defineProperties(this, {
            'type': {
                value: type,
                writable: false,
                configurable: false,
                enumerable: true
            },
            'task': {
                value: task,
                writable: false,
                configurable: false,
                enumerable: true
            },
            'progress': {
                value: progress,
                writable: false,
                configurable: false,
                enumerable: true
            },
            'context': {
                value: context,
                writable: false,
                configurable: false,
                enumerable: true
            }

        });
    };

    var MFInitEventType = function MFInitEventType() {
    };
    MFAbstractEnum.defineEnum(MFInitEventType, ['START', 'FAIL', 'SUCCESS', 'TASK_STARTED', 'TASK_SUCCEEDED', 'TASK_FAILED', 'TASK_ABORTED']);
    Object.defineProperty(MFInitEvent, 'Type', {
        value: MFInitEventType,
        writable: false,
        configurable: false,
        enumerable: true
    });

    return MFInitEvent;
}]);

