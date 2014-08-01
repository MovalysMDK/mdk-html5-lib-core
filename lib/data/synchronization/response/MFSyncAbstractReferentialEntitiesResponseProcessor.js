/**
 * ResetBase
 * Created by Francois Cabelguen on 07/04/14.
 */

'use strict';
angular.module('mfcore').factory('MFSyncAbstractReferentialEntitiesResponseProcessor', ['MFUtils', 'MFSyncAbstractResponseProcessor', 'MFSyncParameter', 'MFSyncResponse', 'MFSyncRequest', 'MFLocalCredentialService',
    function (MFUtils, MFSyncAbstractResponseProcessor, MFSyncParameter, MFSyncResponse, MFSyncRequest, MFLocalCredentialService) {

        var MFSyncAbstractReferentialEntitiesResponseProcessor = function MFSyncAbstractReferentialEntitiesResponseProcessor() {

            MFSyncAbstractReferentialEntitiesResponseProcessor._Parent.call(this);

            this.referentielEntityName = null;
        };

        MFUtils.extend(MFSyncAbstractReferentialEntitiesResponseProcessor, MFSyncAbstractResponseProcessor);


        MFSyncAbstractReferentialEntitiesResponseProcessor.prototype.setReferentielEntityName = function (p_sName) {
            this.referentielEntityName = p_sName;
        };

        MFSyncAbstractReferentialEntitiesResponseProcessor.prototype.saveReferentielEntityInDatabase = function (p_oContext, p_aData) {

            //TODO save in database

        };

        MFSyncAbstractReferentialEntitiesResponseProcessor.prototype.prepare = function () {
//             Example
//            this.setReferentielEntityName('expenseType');
//            this.setNode('expenseType.data');

        };

        MFSyncAbstractReferentialEntitiesResponseProcessor.prototype.readResponse = function (p_oContext) {
            //  console.log('JE SUIS LA: MFSyncAbstractReferentialEntitiesResponseProcessor');
            var self = this;
            this.prepare();

            var data = this.getDataByNode(MFSyncResponse.root);
            if (MFUtils.isAttrInObject(data)) {
                MFSyncRequest.endTransaction = false;
                //Load update referentiel Entity in database
                return this.saveReferentielEntityInDatabase(p_oContext, data).then(function () {
                    //Update TimeStamp synchronize in database
                    return MFSyncParameter.set(p_oContext, self.referentielEntityName, MFSyncResponse.root[self.referentielEntityName].synchroDate).then(function () {
                        MFLocalCredentialService.setPreviousSyncDate(MFSyncResponse.root[self.referentielEntityName].synchroDate);
                    });
                });

            } else {
                //Update TimeStamp synchronize in database
                return MFSyncParameter.set(p_oContext, self.referentielEntityName, MFSyncResponse.root[self.referentielEntityName].synchroDate).then(function () {
                    MFLocalCredentialService.setPreviousSyncDate(MFSyncResponse.root[self.referentielEntityName].synchroDate);
                });
            }


        };

        return MFSyncAbstractReferentialEntitiesResponseProcessor;

    }]);