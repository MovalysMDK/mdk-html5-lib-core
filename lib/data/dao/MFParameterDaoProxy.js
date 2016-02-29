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

angular.module('mfcore').factory('MFParameterDaoProxy', [  'MFUtils', 'MFDaoProxyAbstract', function (MFUtils, MFDaoProxyAbstract) {

    var MFParameterDaoProxy = function MFParameterDaoProxy() {
        MFParameterDaoProxy._Parent.call(this);
        //constructor
    };

    MFUtils.extendFromInstance(MFParameterDaoProxy, MFDaoProxyAbstract);

    MFParameterDaoProxy.prototype.getListParameterByName = function getListParameterByName(p_names, p_context) {
        return this.getDaoImpl().getListParameterByName(p_names, p_context);
    };

    MFParameterDaoProxy.prototype.getListParameter = function getListParameter(p_context, p_sPrefix) {
        return this.getDaoImpl().getListParameter(p_context, p_sPrefix);
    };

    MFParameterDaoProxy.prototype.saveOrUpdateParameter = function saveOrUpdateParameter(p_entity, p_context) {
        return this.getDaoImpl().saveOrUpdateParameter(p_entity, p_context);
    };

    MFParameterDaoProxy.prototype.saveOrUpdateListParameter = function saveOrUpdateListParameter(p_entitiesList, p_context) {
        return this.getDaoImpl().saveOrUpdateListParameter(p_entitiesList, p_context);
    };

    return new MFParameterDaoProxy();

}]);
