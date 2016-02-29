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