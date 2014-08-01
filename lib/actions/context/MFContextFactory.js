'use strict';
/**
 * Created by fgouy on 26/03/14.
 */

angular.module('mfcore').factory('MFContextFactory', ['MFContext', 'MFDataModelCache', function (MFContext, MFDataModelCache) {

    var MFContextFactory = function MFContextFactory() {
        // empty constructor
    };


    /**
     * Returns a new instance of MFContext for anything.
     * @return {MFContext} o_MFContext with only .messages property defined.
     */
    MFContextFactory.prototype.createInstance = function () {
        var o_MFContext = new MFContext();
        o_MFContext.dbTransaction = null;
        o_MFContext.daoSession = MFDataModelCache.initDaoCache();

        return o_MFContext;
    };


    return new MFContextFactory();
}]);