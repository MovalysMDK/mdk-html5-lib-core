'use strict';
/**
 * @file MFDalWebSql.js
 * @brief Data Access Layer
 * @author Jean-Daniel Borowy <jeandaniel.borowy@gmail.com>
 * @date 22/01/2014
 *
 * Copyright (c) 2014 Sopra Group. All rights reserved.
 *
 */


angular.module('mfcore').factory('MFDalSqliteAndroid', ['$rootScope', 'MFUtils', 'MFSyncPromiseProvider', 'MFDalException', 'MFConfigurationService', 'MFDalSqliteIos',
    function ($rootScope, MFUtils, MFSyncPromiseProvider, MFDalException, MFConfigurationService, MFDalSqliteIos) {

        var MFDalSqliteAndroid = function MFDalSqliteAndroid() {
            MFDalSqliteAndroid._Parent.call(this);
        };

        MFUtils.extendFromInstance(MFDalSqliteAndroid, MFDalSqliteIos);

        return new MFDalSqliteAndroid();
    }]);