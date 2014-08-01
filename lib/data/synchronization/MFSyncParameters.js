'use strict';

/**
 * Created by fcabelguen on 21/05/2014.
 */

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
