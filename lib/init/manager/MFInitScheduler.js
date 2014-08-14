'use strict';
/**
 * @file MFInitScheduler.js
 * @brief Initialization tasks scheduler
 * @author Jean-Daniel Borowy <jeandaniel.borowy@sopra.com>
 * @date 18/03/2014
 *
 * Copyright (c) 2014 Sopra Group. All rights reserved.
 *
 */

angular.module('mfcore').factory('MFInitScheduler', ['$rootScope', 'MFContextFactory', 'MFInitStatus', 'MFInitEvent', 'MFInitTaskStatus', 'MFException', 'MFTransactionManager', 'MFConfigurationService', function ($rootScope, MFContextFactory, MFInitStatus, MFInitEvent, MFInitTaskStatus, MFException, MFTransactionManager, MFConfigurationService) {
    /**
     *
     * @class MFInitScheduler
     */
    var MFInitScheduler = function MFInitScheduler() {
    };

    // **** PRIVATE ATTRIBUTES ****
    /**
     * Context : SQL Transaction....
     */
    var _context = null;

    /**
     * Used to calculate de progress.
     */
    var _startedTasksNumber = 0;

    /**
     * List of scheduled tasks (registered name). When the task is started, _toDoTasks[i] === null.
     */
    var _toDoTasks = [];

    /**
     * List of finished tasks (registered name).
     */
    var _doneTasks = [];

    /**
     * Mapping between task registered name and task instances.
     */
    var _tasks = {};

    /**
     * The dependencies of a task. Used to build the workflow.
     * _tasksDependencies['MyTask'] = ['Task1', 'Task2', 'Task3']
     */
    var _tasksDependencies = {};


    // **** PROPERTIES ****
    /**
     * Current status of the task workflow
     *
     */
    var _currentStatus = MFInitStatus.NOT_STARTED;
    Object.defineProperty(MFInitScheduler, 'currentStatus', {
        get: function () {
            return _currentStatus;
        },
        configurable: false,
        enumerable: true
    });
    var setCurrentStatus = function (currentStatus) {
        _previousStatus = _currentStatus;
        _currentStatus = currentStatus;
    };

    /**
     * Previous status of the task workflow
     */
    var _previousStatus = MFInitStatus.NOT_STARTED;
    Object.defineProperty(MFInitStatus, 'previousStatus', {
        get: function () {
            return _previousStatus;
        },
        configurable: false,
        enumerable: true
    });

    /**
     * Estimation of the progress of the workflow.
     */
    Object.defineProperty(MFInitScheduler, 'progress', {
        get: function () {
            return (_startedTasksNumber * 100) / (_toDoTasks.length - 1);
        },
        configurable: false,
        enumerable: true
    });

    var _firstLaunch = null;
    Object.defineProperty(MFInitScheduler, 'firstLaunch', {
        get: function () {
            if(Modernizr.localstorage){
                if (_firstLaunch === null) {
                    var lastLaunch = Number(localStorage['initScheduler#lastLaunch']);
                    var lastSuccessfullLaunch = Number(localStorage['initScheduler#lastSuccessfullLaunch']);
                    _firstLaunch =
                        isNaN(lastLaunch) || isNaN(lastSuccessfullLaunch) || lastLaunch > lastSuccessfullLaunch;
                }
            }
            else {
                _firstLaunch = true;
            }
            return _firstLaunch;
        },
        configurable: false,
        enumerable: true
    });


//  ***** PRIVATE METHODS *****

    var onTaskNotResponding = function (task) {
        if (task.status === MFInitTaskStatus.STARTING || task.status === MFInitTaskStatus.STARTED) {
            _context.addError('MFInitScheduler: the task ' + task.taskName + ' doesn\'t respond : aborting');
            task.status = MFInitTaskStatus.ABORTED;
        }
    };


    /**
     * Runs the next cluster of tasks : all the tasks with no more unresolved dependencies will be launched
     */
    var runTaskCluster = function () {
        var ended = true;

        for (var i in _toDoTasks) {
            if (_toDoTasks.hasOwnProperty(i)) {
                var taskName = _toDoTasks[i];
                ended = ended && (taskName === null);
                if (_tasks[taskName].status === MFInitTaskStatus.NOT_STARTED && _tasksDependencies[taskName].length === 0) {
                    ++_startedTasksNumber;
                    setTimeout(onTaskNotResponding.bind(null, _tasks[taskName]),
                            MFConfigurationService.getValue('initTaskTimeout', 10) * 1000);
                    _tasks[taskName].start(_context, MFInitScheduler.firstLaunch);
                }
            }
        }
    };

    /**
     * Callback which listen the end of a task. This method updates the dependencies map.
     *
     * @param taskName the registered name of the ended task
     */
    var onTaskEnded = function (taskName) {
        console.info('['+taskName + '] ended (duration: ' + _tasks[taskName].duration + ' ms)');
        for (var tn in _tasksDependencies) {
            if (_tasksDependencies.hasOwnProperty(tn)) {
                var index = _tasksDependencies[tn].indexOf(taskName);
                if (index !== -1) {
                    _tasksDependencies[tn].splice(index, 1);
                }
            }
        }
        _doneTasks.push(taskName);
        fireEvent(new MFInitEvent(MFInitEvent.Type.TASK_SUCCEEDED, _tasks[taskName], MFInitScheduler.progress, _context));
        runNextStep();
    };

    /**
     * Callback which listen the failure and the abortion of a task. This method updates the dependencies map.
     *
     * @param taskName the registered name of the ended task
     */
    var onTaskFailed = function (taskName) {
        fireEvent(new MFInitEvent(MFInitEvent.Type.TASK_FAILED, _tasks[taskName], MFInitScheduler.progress, _context));
        onTaskAbortedOrFailed(taskName);
    };

    var onTaskAborted = function (taskName) {
        fireEvent(new MFInitEvent(MFInitEvent.Type.TASK_ABORTED, _tasks[taskName], MFInitScheduler.progress, _context));
        onTaskAbortedOrFailed(taskName);
    };

    var onTaskAbortedOrFailed = function (taskName) {
        _doneTasks.push(taskName);
        setCurrentStatus(MFInitStatus.FAILED);
        for (var tn in _tasksDependencies) {
            if (_tasksDependencies.hasOwnProperty(tn)) {
                var index = _tasksDependencies[tn].indexOf(taskName);
                if (index !== -1) {
                    _context.addError('Aborting "' + _tasks[tn].name + '" because of "' + taskName + '" failure...');
                    _tasks[tn].status = MFInitTaskStatus.ABORTED;
                }
            }
        }
        runNextStep();
    };


    /**
     * Ends the init process or run the next cluster
     */
    var runNextStep = function () {
        if (_doneTasks.length === _toDoTasks.length) {
            if (_currentStatus !== MFInitStatus.FAILED) {
                _currentStatus = MFInitStatus.READY;
            }
            var endEventType = _currentStatus === MFInitStatus.READY ? MFInitEvent.Type.SUCCESS : MFInitEvent.Type.FAILURE;
            if (endEventType === MFInitEvent.Type.SUCCESS) {
                if(Modernizr.localstorage) {
                    localStorage['initScheduler#lastSuccessfullLaunch'] = Date.now();
                }
                else {
                    console.warn('cannot set initScheduler#lastSuccessfullLaunch in local storage');
                }
            }
            fireEvent(new MFInitEvent(endEventType, null, MFInitScheduler.progress, _context));
        } else {
            setTimeout(runTaskCluster, 0);
        }
    };

    /**
     * Callback which listen the end of a task
     *
     * @param taskName the registered name of the started task
     */
    var onTaskStarted = function (taskName) {
        setCurrentStatus(MFInitStatus.PENDING);
        fireEvent(new MFInitEvent(MFInitEvent.Type.TASK_STARTED, _tasks[taskName], MFInitScheduler.progress, _context));
    };

    /**
     * Send an event to all MFInitScheduler listeners
     *
     * @param event an instance of MFInitEvent
     */
    var _eventListeners = [];
    var fireEvent = function (event) {
        for (var i in _eventListeners) {
            if (_eventListeners.hasOwnProperty(i)) {
                _eventListeners[i](event);
            }
        }
    };

    /**
     * Check if there is some cycles between task dependencies
     */
    var dependenciesContainCycles = function () {
        var taskName;
        var i;
        var colors = {};

        for (taskName in _tasks) {
            if (_tasks.hasOwnProperty(taskName)) {
                colors[taskName] = 0;
            }
        }

        for (taskName in _tasks) {
            if (_tasks.hasOwnProperty(taskName)) {
                for (i in _tasksDependencies[taskName]) {
                    if (_tasksDependencies[taskName].hasOwnProperty(i)) {
                        ++colors[_tasksDependencies[taskName][i]];
                    }
                }
            }
        }

        var nodeNumber = 0;
        var nodeQueue = [];

        for (taskName in _tasks) {
            if (colors[taskName] === 0) {
                nodeQueue.push(taskName);
                ++nodeNumber;
            }
        }

        while (nodeQueue.length !== 0) {
            taskName = nodeQueue.shift();
            for (i in _tasksDependencies[taskName]) {
                if (--colors[_tasksDependencies[taskName][i]] === 0) {
                    nodeQueue.push(_tasksDependencies[taskName][i]);
                    ++nodeNumber;
                }
            }
        }
        return Object.keys(_tasks).length !== nodeNumber;
    };

    /**
     * Check if some dependencies are unreachable
     */
    var dependenciesUnreachable = function () {
        var taskName;
        var i;
        var result = true;

        for (taskName in _tasksDependencies) {
            if (_tasksDependencies.hasOwnProperty(taskName)) {
                for (i in _tasksDependencies[taskName]) {
                    if (_tasksDependencies[taskName].hasOwnProperty(i)) {
                        result = result && _tasks.hasOwnProperty(_tasksDependencies[taskName][i]);
                    }
                }
            }
        }
        return !result;
    };

    // ***** PUBLIC METHODS *****
    /**
     * Schedule a task as taskName which depend on dependencies
     *
     * @param taskName is the name of the task to identify the task in the scheduler
     * @param task is an instance of MFAbstractInitTask which implements the run method
     * @param dependencies are the tasks (registered names) which must be run before the this task
     * @see MFAbstractInitTask
     */
    MFInitScheduler.register = function (taskName, task, dependencies) {
        _tasks[taskName] = task;
        if (typeof(dependencies) === 'undefined') {
            dependencies = [];
        }
        _tasksDependencies[taskName] = dependencies;
    };

    /**
     * Start the whole init process
     */
    MFInitScheduler.start = function () {
        if (dependenciesContainCycles()) {
            throw new MFException('MFInitScheduler some task dependencies contain a cycle');
        }
        if (dependenciesUnreachable()) {
            throw new MFException('MFInitScheduler some task dependencies are unknown');
        }

        if (MFInitScheduler.firstLaunch && Modernizr.localstorage) {
            localStorage.clear();
        }
        if(Modernizr.localstorage){
            localStorage.addNotSuppressibleKey('initScheduler#lastLaunch');
            localStorage.addNotSuppressibleKey('initScheduler#lastSuccessfullLaunch');
            localStorage['initScheduler#lastLaunch'] = Date.now();
        }
        setCurrentStatus(MFInitStatus.STARTED);
        fireEvent(new MFInitEvent(MFInitEvent.Type.START, null, MFInitScheduler.progress, _context));
        setTimeout(function () {
            fireEvent(new MFInitEvent(MFInitEvent.Type.START, null, MFInitScheduler.progress, _context));
        }, 0);
        _context = MFContextFactory.createInstance();
        for (var taskName in _tasks) {
            if (_tasks.hasOwnProperty(taskName)) {
                _toDoTasks.push(taskName);
            }
        }
        setTimeout(runTaskCluster, 0);
    };

    /**
     * Callback called by the tasks to notify the scheduler of their running progress
     *
     * @param taskName the registered name of the notifying task
     */
    MFInitScheduler.notify = function (taskName) {
        switch (_tasks[taskName].status) {
            case MFInitTaskStatus.STARTED:
                onTaskStarted(taskName);
                break;
            case MFInitTaskStatus.SUCCEEDED:
                onTaskEnded(taskName);
                break;
            case MFInitTaskStatus.FAILED:
                onTaskFailed(taskName);
                break;
            case MFInitTaskStatus.ABORTED:
                onTaskAborted(taskName);
                break;
            case MFInitTaskStatus.STARTING:
                break;
            case MFInitTaskStatus.NOT_STARTED:
                break;
            default:
                console.error('unknown init task status: ' + _tasks[taskName].status);
                onTaskFailed(taskName);
                break;
        }
    };

    /**
     * Registers a listener
     *
     * @param callback is the listener callback
     */
    MFInitScheduler.onEvent = function (callback) {
        if (_eventListeners.indexOf(callback) === -1) {
            _eventListeners.push(callback);
        }
    };


    return MFInitScheduler;
}]);
