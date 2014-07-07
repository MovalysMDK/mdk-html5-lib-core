'use strict';

angular.module('mfcore').factory('MFObjectToSynchronizeDaoProxy', [  'MFUtils','MFDaoProxyAbstract',  function ( MFUtils, MFDaoProxyAbstract) {

    var MFObjectToSynchronizeDaoProxy = function MFObjectToSynchronizeDaoProxy(){
        MFObjectToSynchronizeDaoProxy._Parent.call(this);
        //constructor
    };

    MFUtils.extendFromInstance(MFObjectToSynchronizeDaoProxy, MFDaoProxyAbstract);

    MFObjectToSynchronizeDaoProxy.prototype.getListObjectToSynchronizeByName = function getListObjectToSynchronize(p_context, p_sEntity){
        return this.getDaoImpl().getListObjectToSynchronizeByName(p_context, p_sEntity);
    };

    MFObjectToSynchronizeDaoProxy.prototype.deleteObjectToSynchronizeByIdEntity = function deleteObjectToSynchronizeByIdEntity( p_context, p_entityId){
        return this.getDaoImpl().deleteObjectToSynchronizeByIdEntity(p_context, p_entityId);
    };

    return new  MFObjectToSynchronizeDaoProxy();

}]);
