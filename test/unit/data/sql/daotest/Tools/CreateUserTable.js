'use strict';
angular
    .module('data-daotest-sql')
    .factory('CreateUserTable', CreateUserTable);

CreateUserTable.$inject = ['MFSystem', 'MFTransactionManager', 'MFDalSqlProxy'];

function CreateUserTable(MFSystem, MFTransactionManager, MFDalSqlProxy) {
    var service = {
        createTable: createTable
    }
    return service
    ////////////////////////////////////////////////
    function createTable(context, firstLaunch, callback) {
        if (firstLaunch) {
            MFSystem.getAsset('assets/data/sql/create_usermodel.sql', false).then(function (response) {
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
    };

}