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

angular.module('mfcore').factory('MFObjectToSynchronizeDaoProxy', [  'MFUtils', 'MFDaoProxyAbstract', function (MFUtils, MFDaoProxyAbstract) {

    var MFObjectToSynchronizeDaoProxy = function MFObjectToSynchronizeDaoProxy() {
        MFObjectToSynchronizeDaoProxy._Parent.call(this);
        //constructor
    };

    MFUtils.extendFromInstance(MFObjectToSynchronizeDaoProxy, MFDaoProxyAbstract);

    MFObjectToSynchronizeDaoProxy.prototype.getListObjectToSynchronizeByName = function getListObjectToSynchronize(p_context, p_sEntity) {
        return this.getDaoImpl().getListObjectToSynchronizeByName(p_context, p_sEntity);
    };

    MFObjectToSynchronizeDaoProxy.prototype.deleteObjectToSynchronizeByIdEntity = function deleteObjectToSynchronizeByIdEntity(p_context, p_entityId) {
        return this.getDaoImpl().deleteObjectToSynchronizeByIdEntity(p_context, p_entityId);
    };

    return new MFObjectToSynchronizeDaoProxy();

}]);
