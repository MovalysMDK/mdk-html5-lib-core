/**
 * MFSyncAbstractResponseProcessor
 * Created by Francois Cabelguen on 07/04/14.
 */

'use strict';
angular.module('mfcore').factory('MFSyncAbstractResponseProcessor', [ 'MFUtils', function(MFUtils) {

    var MFSyncAbstractResponseProcessor = function MFSyncAbstractResponseProcessor() {
        this.aNode = null;
    };

    MFSyncAbstractResponseProcessor.prototype.setNode = function(p_sNode){
        this.aNode = p_sNode.split('.');
    };

    MFSyncAbstractResponseProcessor.prototype.getNode = function(){
        return this.aNode;
    };

    MFSyncAbstractResponseProcessor.prototype.getDataByNode = function(p_oResponse){
        var data = p_oResponse;
        angular.forEach(this.aNode, function(value, key){
            data = data[value];
        });
        return data;
    };

    MFSyncAbstractResponseProcessor.prototype.addDataInNode= function(p_oObject, p_oNode, pbTypeArray, p_oData){

        if(pbTypeArray){
            if(MFUtils.isUndefinedOrNull(p_oObject[p_oNode])){
                p_oObject[p_oNode] = [];
                p_oObject[p_oNode].push(p_oData);
            }else{
                p_oObject[p_oNode].push(p_oData);
            }
        }else{
            p_oObject[p_oNode] = p_oData;
        }

    };

    return MFSyncAbstractResponseProcessor;

}]);