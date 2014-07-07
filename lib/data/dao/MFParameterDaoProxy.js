'use strict';

angular.module('mfcore').factory('MFParameterDaoProxy', [  'MFUtils','MFDaoProxyAbstract',  function ( MFUtils, MFDaoProxyAbstract) {

    var MFParameterDaoProxy = function MFParameterDaoProxy(){
        MFParameterDaoProxy._Parent.call(this);
        //constructor
    };

    MFUtils.extendFromInstance(MFParameterDaoProxy, MFDaoProxyAbstract);

    MFParameterDaoProxy.prototype.getListParameterByName = function getListParameterByName(p_names, p_context){
        return this.getDaoImpl().getListParameterByName(p_names, p_context);
    };

    MFParameterDaoProxy.prototype.getListParameter = function getListParameter(p_context, p_sPrefix){
        return this.getDaoImpl().getListParameter(p_context, p_sPrefix);
    };

    MFParameterDaoProxy.prototype.saveOrUpdateParameter = function saveOrUpdateParameter( p_entity, p_context) {
        return this.getDaoImpl().saveOrUpdateParameter(p_entity, p_context);
    };

    MFParameterDaoProxy.prototype.saveOrUpdateListParameter = function saveOrUpdateListParameter(p_entitiesList, p_context) {
        return this.getDaoImpl().saveOrUpdateListParameter(p_entitiesList, p_context);
    };

    return new  MFParameterDaoProxy();

}]);
