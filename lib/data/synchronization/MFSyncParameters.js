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

angular.module('mfcore').factory('MFSyncParameter', ['MFParameterDaoProxy', 'MFParameterFactory',
    function (MFParameterDaoProxy, MFParameterFactory) {

        var prefix = 'synchro_timestamp_';

        return {
            set: function (p_oContext, p_sName, p_iTimestamp) {

                var parameter = null;

                //Check if Name existe in database
                return MFParameterDaoProxy.getListParameterByName(prefix + p_sName, p_oContext).then(function (result) {
                    if (result.length > 0) {
                        parameter = result[0];
                    } else {
                        parameter = MFParameterFactory.createInstance();
                        parameter.name = prefix + p_sName;
                    }

                    parameter.value = p_iTimestamp;

                    return MFParameterDaoProxy.saveOrUpdateParameter(parameter, p_oContext);

                });

            },

            getMap: function (p_oContext) {
                return MFParameterDaoProxy.getListParameter(p_oContext, prefix).then(function (parameters) {

                    var mapParameters = [];
                    for (var i = 0; i < parameters.length; i++) {
                        mapParameters[parameters[i].name.replace(prefix, '')] = parameters[i].value;
                    }
                    return mapParameters;
                });
            }

        };
    }]);
