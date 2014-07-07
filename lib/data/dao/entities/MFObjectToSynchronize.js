'use strict';


angular.module('mfcore').factory('MFObjectToSynchronize', ['MFAbstractEntity', 'MFUtils', function (MFAbstractEntity,MFUtils) {

    function MFObjectToSynchronize() {

        MFObjectToSynchronize._Parent.call(this);

        var _id ;
        var _objectid ;
        var _objectname ;

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

        Object.defineProperty(this, 'objectid', {
            get: function () {
                return _objectid;
            },
            set: function (objectid) {
                _objectid = objectid;
            },
            enumerable: true,
            configurable: false
        });

        Object.defineProperty(this, 'objectname', {
            get: function () {
                return _objectname;
            },
            set: function (objectname) {
                _objectname = objectname;
            },
            enumerable: true,
            configurable: false
        });

    }

    MFUtils.extend(MFObjectToSynchronize, MFAbstractEntity);
    MFObjectToSynchronize.prototype._transient = false;
    return MFObjectToSynchronize;
}]);
