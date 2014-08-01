'use strict';

// returns an instance of DAO
angular.module('mfcore').factory('MFDaoProxyAbstract', [ 'MFDaoException', 'MFDalSupport', '$injector', function (MFDaoException, MFDalSupport, $injector) {

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
            var dalSupport = MFDalSupport.getDalSupportBase();

            console.log(dalSupport);

            switch (dalSupport) {
                case 'WEBSQL':
                case 'SQLITE':
                    this.pointer = $injector.get(this.constructor.name.replace('Proxy', 'Sql'));
                    break;
                case 'NOSQL':
                    this.pointer = $injector.get(this.constructor.name.replace('Proxy', 'NoSql'));
                    break;
                default:
                    throw new MFDaoException('Cannot find a dao for the entity "' + this.constructor.name + '" and the platform ' + dalSupport);
            }
        }
        return this.pointer;
    };

    return new MFDaoProxyAbstract();
}]);