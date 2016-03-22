'use strict';
angular
    .module('mfcore')
    .run(MFConsoleOverloads);
MFConsoleOverloads.$inject = ['MFCordova'];

function MFConsoleOverloads(MFCordova) {


    consoleOverLoad();
    MFCordova.onCordovaReady(
        function available() {
            consoleOverLoad();
        }
    );


    function defaultConsoleFunction(text, value) {
        if (text) {
            if (value) {
                text += ' - ' + JSON.stringify(value);
            }
            alert(text);
        }
    }

    function setLogLevel(value) {
        var consoleLog = console.log,
            consoleInfo = console.info,
            consoleWarn = console.warn,
            consoleError = console.error,
            consoleAssert = console.assert,
            consoleDebug = console.debug,
            nop = Function.prototype;

        console.error = nop;
        console.warn = nop;
        console.log = nop;
        console.info = nop;
        console.assert = nop;
        console.debug = nop;

        switch (value) {
            case 'VERBOSE':
                console.info = consoleInfo;
                console.log = consoleLog;
                console.warn = consoleWarn;
                console.error = consoleError;
                console.assert = consoleAssert;
                console.debug = consoleDebug;
                break;
            case 'LOG':
                console.info = consoleInfo;
                console.log = consoleLog;
                console.warn = consoleWarn;
                console.error = consoleError;
                console.assert = consoleAssert;
                break;
            case 'INFO':
                console.info = consoleInfo;
                console.warn = consoleWarn;
                console.error = consoleError;
                console.assert = consoleAssert;
                break;
            case 'WARNING':
                console.warn = consoleWarn;
                console.error = consoleError;
                console.assert = consoleAssert;
                break;
            case 'ERROR':
                console.error = consoleError;
                console.assert = consoleAssert;
                break;
            default:
                break;
        }
    }

    function consoleOverLoad() {
        var method,
            methods = [
                'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
                'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
                'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
                'timeStamp', 'trace', 'warn'
            ],
            methodsNb = methods.length;
        window.console = window.console || {};

        while (methodsNb--) {
            method = methods[methodsNb];
            // Only stub undefined methods.
            if (!window.console[method]) {
                window.console[method] = defaultConsoleFunction;
            }
        }
        window.console.setLogLevel = setLogLevel;
        console.setLogLevel('INFO');
    }
}

