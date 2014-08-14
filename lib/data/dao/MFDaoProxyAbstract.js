'use strict';

// returns an instance of DAO
angular.module('mfcore').factory('MFDaoProxyAbstract', [ 'MFDaoException', 'MFDatabaseTypeSelector', '$injector', function (MFDaoException, MFDatabaseTypeSelector, $injector) {

    var MFDaoProxyAbstract = function MFDaoProxyAbstract() {

    };

    Object.defineProperty(MFDaoProxyAbstract.prototype, 'pointer', {
        value: null,
        writable: true,
        enumerable: false,
        configurable: false
    });

    Object.defineProperty(MFDaoProxyAbstract.prototype, 'entityName', {
        get: function () {
            return this.getDaoImpl().entityName;
        },
        enumerable: true,
        configurable: false
    });

    Object.defineProperty(MFDaoProxyAbstract.prototype, 'mapping', {
        get: function () {
            return this.getDaoImpl().mapping;
        },
        enumerable: true,
        configurable: false
    });
    Object.defineProperty(MFDaoProxyAbstract.prototype, 'syncDisabled', {
        get: function () {
            return this.getDaoImpl().syncDisabled;
        },
        enumerable: true,
        configurable: false
    });

    Object.defineProperty(MFDaoProxyAbstract.prototype, 'tableName', {
        get: function () {
            return this.getDaoImpl().tableName;
        },
        enumerable: true,
        configurable: false
    });


    MFDaoProxyAbstract.prototype.getDaoImpl = function getDaoImpl() {

        if (this.pointer === null) {
            this.pointer = $injector.get(MFDatabaseTypeSelector.getDaoClassName(this.constructor.name.replace('DaoProxy', '')));
        }
        return this.pointer;
    };

    return new MFDaoProxyAbstract();
}]);