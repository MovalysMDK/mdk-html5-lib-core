'use strict';




(function() {


    // #######################################
    // ###  ARRAY
    // #######################################

    Object.defineProperty(Array.prototype, 'clear', {
        value: function () {
            this.length = 0;
        },
        enumerable: false,
        configurable: false
    });


    Object.defineProperty(Array.prototype, 'remove', {
        value: function (val) {

            var idx = this.indexOf(val);
            if (idx !== -1) {
                return this.splice(idx, 1);
            }
            else {
                return false;
            }
        },
        enumerable: false,
        configurable: false
    });






    // #######################################
    // ###  PERFORMANCE
    // #######################################

    if (window.performance === undefined) {
        window.performance = {};
    }
    if (window.performance.now === undefined) {
        window.performance.now = Date.now;
    }






    // #######################################
    // ###  ANGULAR
    // #######################################

    angular.isBoolean = function (val) {
        return typeof val === 'boolean';
    };
    angular.isUndefinedOrNull = function (val) {
        return typeof val === 'undefined' || val === null;
    };//Direct comparisons against undefined are troublesome as undefined can be overwritten

    angular.isUndefinedOrNullOrEmpty = function (value) {
        return  typeof value === 'undefined' || value === null || value.length === 0 || typeof value === 'object' && Object.keys(value).length === 0;
    };

    angular.isDefinedButNullOrEmpty = function (value) {
        return  typeof value !== 'undefined' && (value === null || value.length === 0 || typeof value === 'object' && Object.keys(value).length === 0);
    };






    // #######################################
    // ###  FUNCTION
    // #######################################

    // Monkey patch IE for support for Fonction.name
    if (Function.prototype.name === undefined && Object.defineProperty !== undefined) {
        Object.defineProperty(Function.prototype, 'name', {
            get: function () {
                if (this._name === undefined) {
                    var funcNameRegex = /function\s+(.{1,})\s*\(/;
                    var results = (funcNameRegex).exec((this).toString());
                    this._name = (results && results.length > 1) ? results[1] : '';
                }
                return this._name;
            },
            set: function (value) {
            }
        });
    }






    // #######################################
    // ###  CONSOLE
    // #######################################

    var method;
    var defaultConsoleFunction = function(text,value){
        if(text){
            if(value){
                text += ' - '+ JSON.stringify(value);
            }
            alert(text);
        }
    };

    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var methodsNb = methods.length;
    window.console = window.console || {};

    while (methodsNb--) {
        method = methods[methodsNb];
        // Only stub undefined methods.
        if (!window.console[method]) {
            window.console[method] = defaultConsoleFunction;
        }
    }


    var consoleLog = console.log;
    var consoleInfo = console.info;
    var consoleWarn = console.warn;
    var consoleError = console.error;
    var consoleAssert = console.assert;
    var nop = Function.prototype;

    window.console.setLogLevel = function(value) {
        console.error = nop;
        console.warn = nop;
        console.log = nop;
        console.info = nop;
        console.assert = nop;

        switch (value) {
            case 'VERBOSE':
            case 'INFO':
                console.info = consoleInfo;
                console.log = consoleLog;
                console.warn = consoleWarn;
                console.error = consoleError;
                console.assert = consoleAssert;
                break;
            case 'LOG':
                console.log = consoleLog;
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
    };


    console.setLogLevel('INFO');






    // #######################################
    // ###  STRING
    // #######################################

    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };





    // #######################################
    // ###  STORAGE
    // #######################################

    Object.defineProperty(window.Storage.prototype, 'addNotSuppressibleKey', {
        value: function(value) {
            var keys = this.getNotSuppressibleKeys();
            if (keys.indexOf(value) < 0) {
                keys.push(value);
                this.setItem('_notSuppressibleKeys', JSON.stringify(keys));
            }
        },
        writable: false,
        enumerable: false,
        configurable: false
    });

    Object.defineProperty(window.Storage.prototype, 'getNotSuppressibleKeys', {
        value: function() {
            var record = this.getItem('_notSuppressibleKeys');
            var keys;
            if (angular.isUndefinedOrNullOrEmpty(record)) {
                keys = [];
            }
            else {
                keys = JSON.parse(record);
            }
            return keys;
        },
        writable: false,
        enumerable: false,
        configurable: false
    });



    window.Storage.prototype._clear = window.Storage.prototype.clear;

    window.Storage.prototype.clear = function () {
        var notSuppressibleKeys = angular.copy(this.getNotSuppressibleKeys());
        var objectsToRestore = {};
        for(var i=0;i< notSuppressibleKeys.length;i++){
            var currKey = notSuppressibleKeys[i];
            objectsToRestore[currKey] = angular.copy(this.getItem(currKey));
        }
        this._clear();
        this.setItem('_notSuppressibleKeys', JSON.stringify(notSuppressibleKeys));

        for(var key in objectsToRestore){
            if(objectsToRestore.hasOwnProperty(key)){
                this.setItem(key,objectsToRestore[key]);
            }
        }
    };



})();
