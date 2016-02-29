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

angular.module('mfcore').factory('MFAbstractInitTask', ['MFInitScheduler', 'MFInitTaskStatus', 'NotImplementedException', function (MFInitScheduler, MFInitTaskStatus, NotImplementedException) {
    var MFAbstractInitTask = function MFAbstractInitTask() {
        this.eventListeners = [];

        var tStart = 0;
        var tEnd = 0;
        var _status = MFInitTaskStatus.NOT_STARTED;
        Object.defineProperty(this, 'status', {
            get: function () {
                return _status;
            },
            set: function (value) {
                _status = value;
                switch (_status) {
                    case MFInitTaskStatus.STARTING:
                        tStart = window.performance === undefined ? Date.now() : window.performance.now();
                        tEnd = window.performance === undefined ? Date.now() : window.performance.now();
                        break;
                    case MFInitTaskStatus.SUCCEEDED:
                        fireSuccess.call(this);
                        tEnd = window.performance === undefined ? Date.now() : window.performance.now();
                        break;
                    case MFInitTaskStatus.FAILED:
                    case MFInitTaskStatus.ABORTED:
                        tEnd = window.performance === undefined ? Date.now() : window.performance.now();
                        break;
                }
                MFInitScheduler.notify(this.taskName);
            },
            configurable: false,
            enumerable: true
        });
        Object.defineProperty(this, 'duration', {
            get: function () {
                if (_status === MFInitTaskStatus.STARTED) {
                    return (window.performance === undefined ? Date.now() : window.performance.now()) - tStart;
                } else {
                    return tEnd - tStart;
                }
            },
            set: function (value) {
                _status = value;
                MFInitScheduler.notify(this.taskName);
            },
            configurable: false,
            enumerable: true
        });

        var _taskName = '';
        Object.defineProperty(this, 'taskName', {
            get: function () {
                return _taskName;
            },
            set: function (value) {
                _taskName = value;
            },
            configurable: false,
            enumerable: true
        });

        var _brief = '';
        Object.defineProperty(this, 'brief', {
            get: function () {
                return _brief;
            },
            set: function (value) {
                _brief = value;
            },
            configurable: false,
            enumerable: true
        });

        var _needDataBaseConnection = false;
        Object.defineProperty(this, 'needDataBaseConnection', {
            get: function () {
                return _needDataBaseConnection;
            },
            set: function (value) {
                _needDataBaseConnection = value;
            },
            configurable: false,
            enumerable: true
        });
    };

    MFAbstractInitTask.prototype.run = function (context, firstLaunch) {
        throw new NotImplementedException('The "run" method of a MFAbstractInitTask instance must be implemented');
    };

    MFAbstractInitTask.prototype.start = function (context, firstLaunch) {
        this.status = MFInitTaskStatus.STARTING;
        console.log('Start task "' + this.taskName + '" (' + this.brief + ')');
        try {
            this.run(context, firstLaunch);
        } catch (e) {
            console.error('MFInitTaskStatus.FAILED');
            context.addError(e);
            this.status = MFInitTaskStatus.FAILED;
        }
    };

    MFAbstractInitTask.prototype.register = function (taskName, dependencies) {
        this.taskName = taskName;
        MFInitScheduler.register(taskName, this, dependencies);
    };

    MFAbstractInitTask.prototype.onSuccess = function (callback) {
        if (this.eventListeners.indexOf(callback) === -1) {
            this.eventListeners.push(callback);
        }
    };

    var fireSuccess = function () {
        for (var i = 0; i < this.eventListeners.length; ++i) {
            this.eventListeners[i]();
        }
    };

    return MFAbstractInitTask;
}]);
