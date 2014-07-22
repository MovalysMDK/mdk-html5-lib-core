'use strict';

Object.defineProperty(Array.prototype, 'clear', {
	value: function() {
		this.length = 0;
	},
	enumerable: false,
	configurable: false
});


Object.defineProperty(Array.prototype, 'remove', {
    value: function(val) {

        var idx = this.indexOf(val);
        if(idx !== -1){
            return this.splice(idx,1);
        }
        else {
            return false;
        }
    },
    enumerable: false,
    configurable: false
});



if (window.performance === undefined) {
	window.performance = {};
}
if (window.performance.now === undefined) {
	window.performance.now = Date.now;
}

angular.isUndefinedOrNull = function(val){ return typeof val === 'undefined' || val === null; };//Direct comparisons against undefined are troublesome as undefined can be overwritten

angular.isUndefinedOrNullOrEmpty = function (value) {
    return  typeof value === 'undefined' || value === null ||  value.length === 0 || typeof value === 'object' && Object.keys(value).length === 0;
};

angular.isDefinedButNullOrEmpty = function (value) {
    return  typeof value !== 'undefined' && (value === null ||  value.length === 0 || typeof value === 'object' && Object.keys(value).length === 0);
};

// Monkey patch IE for support for Fonction.name
if (Function.prototype.name === undefined && Object.defineProperty !== undefined) {
    Object.defineProperty(Function.prototype, 'name', {
        get: function() {
        	if(this._name === undefined){
            	var funcNameRegex = /function\s+(.{1,})\s*\(/;
            	var results = (funcNameRegex).exec((this).toString());
            	this._name = (results && results.length > 1) ? results[1] : '';
        	}
        	return this._name;
        },
        set: function(value) {}
    });
}

(function () {
	var log = console.log;
	var info = console.info;
	var warn = console.warn;
	var error = console.error;
    var assert = console.assert;
	var nop = Function.prototype;

	var logLevel;
	Object.defineProperty(window.console, 'logLevel', {
		get: function () {
			return logLevel;
		},
		set: function (value) {
			console.error = nop;
			console.warn = nop;
			console.log = nop;
			console.info = nop;
            console.assert = nop;

			switch (value) {
            case 'VERBOSE':
			case 'INFO':
				console.info = info;
				/* falls through */
			case 'LOG':
				console.log = log;
				/* falls through */
			case 'WARNING':
				console.warn = warn;
				/* falls through */
			case 'ERROR':
				console.error = error;
                console.assert = assert ;
				/* falls through */
			}
            logLevel = value;
        },
		configurable: false,
		enumerable: true
	});
	console.logLevel = 'INFO';
})();



String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
