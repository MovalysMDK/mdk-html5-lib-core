'use strict';


angular.module('mfcore').factory('MFParameter', ['MFAbstractEntity', 'MFUtils', function (MFAbstractEntity, MFUtils) {

    function MFParameter() {

        MFParameter._Parent.call(this);

        var _id;
        var _name;
        var _value;

        Object.defineProperty(this, 'id', {
            get: function () {
                return _id;
            },
            set: function (value) {
                _id = value;
            },
            enumerable: true,
            configurable: false
        });


        Object.defineProperty(this, 'name', {
            get: function () {
                return _name;
            },
            set: function (value) {
                _name = value;
            },
            enumerable: true,
            configurable: false
        });

        Object.defineProperty(this, 'value', {
            get: function () {
                return _value;
            },
            set: function (value) {
                _value = value;
            },
            enumerable: true,
            configurable: false
        });

    }

    MFUtils.extend(MFParameter, MFAbstractEntity);
    MFParameter.prototype._transient = false;
    return MFParameter;
}]);
