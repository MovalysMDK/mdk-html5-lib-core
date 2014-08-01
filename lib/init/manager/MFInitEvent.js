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

