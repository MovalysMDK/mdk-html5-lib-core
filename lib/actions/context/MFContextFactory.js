'use strict';
/**
 * Created by fgouy on 26/03/14.
 */

angular.module('mfcore').factory('MFContextFactory', ['MFContext', function (MFContext) {

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
        o_MFContext.daoSession = {};

        return o_MFContext;
    };


    return new MFContextFactory();
}]);