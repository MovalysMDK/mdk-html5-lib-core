'use strict';
angular
    .module('data-daotest-sql')
    .factory('FillUserTable', FillUserTable);

FillUserTable.$inject = ['MFSystem', 'MFTransactionManager', 'MFDalSqlProxy'];

function FillUserTable(MFSystem, MFTransactionManager, MFDalSqlProxy) {
    var service = {
        fillTable: fillTable
    }
    return service
    ////////////////////////////////////////////////
    function fillTable(context, firstLaunch, callback) {
        if (firstLaunch) {
            MFSystem.getAsset('assets/data/sql/create_userdata.sql', false).then(function (response) {
                    var dirtyRequests = response.split(/;/);
                    var requests = [];

                    for (var index in dirtyRequests) {
                        if (dirtyRequests.hasOwnProperty(index)) {
                            var request = dirtyRequests[index];
                            if (request.replace(/\s*/, '').length > 0) {
                                requests.push(request);
                            }
                        }
                    }

                    MFTransactionManager.run(context, function (context, param) {
                        MFDalSqlProxy.executeQueries(context, requests).then(function () {
                            callback(true);
                        }, function (error) {
                            context.addError(error);
                            callback(false);
                        });
                    }, function (error) {
                        context.addError(error);
                        callback(false);
                    }, {});
                },
                function (error) {
                    context.addWarning(error);
                    callback(false);
                });
        }
        ;

    };

}