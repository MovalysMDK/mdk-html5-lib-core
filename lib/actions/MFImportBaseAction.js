/**
 * ImportBase
 * Created by François Cabelguen on 07/04/14.
 */

'use strict';
angular.module('mfcore').factory('MFImportBaseAction', ['MFBaseAction', 'MFSyncPromiseProvider', 'MFDalSupport', 'MFDalSqlProxy', 'MFDalNoSqlProxy',
    function(MFBaseAction, $qSync, MFDalSupport, MFDalSqlProxy, MFDalNoSqlProxy) {
        return {
            createInstance: function() {

                var action = MFBaseAction.createInstance({
                    atomic: true,
                    database: true,
                    type: 'MFImportBaseAction'
                });

                /** 
                 * Execute operations
                 **/
                action.doAction = function(context, params) {

                    console.assert(!angular.isUndefinedOrNull(params), 'MFImportBaseAction.doAction() : Params should not be empty');

                    var that = this;
                    var tabPromiseRequests = [];

                    try {
                        if(MFDalSupport.getDalSupportBase() === 'WEBSQL' || MFDalSupport.getDalSupportBase() === 'SQLITE'){

                            angular.forEach(params.data, function(value, key){ //Loop for Table
                                if (value.values.length > 0){
                                    for (var j=0; j<value.values.length; j++) { //Loop for Data

                                        //create request
                                        var request = '';
                                        var keyEntries= '';
                                        var valueEntries =[];
                                        var marksPoints = '';

                                        var tabKey = Object.keys(value.values[j]);

                                        for (key in value.values[j]){

                                            if (tabKey[tabKey.length-1] === key){
                                                keyEntries +=  key;
                                                  marksPoints += '?';
                                            }else{
                                                keyEntries +=  key + ',';
                                                marksPoints += '?,';
                                            }
                                            valueEntries.push(value.values[j][key]);
                                        }
                                        tabPromiseRequests.push(MFDalSqlProxy.executeQuery(context, 'INSERT INTO ' + value.table + ' (' + keyEntries + ') VALUES (' + marksPoints + ');', valueEntries));
                                     }
                                }

                            });


                            $qSync.all(tabPromiseRequests).then(function(values){
                                that.resolvePromise(null, context);
                            }, function(error){
                                that.rejectPromise(error, context);
                           });

                        }else{
                            angular.forEach(params.data, function(value, key) {
                                if (value.length > 0) {
                                    for (var i = 0; i < value.length; ++i) {
                                        tabPromiseRequests.push(MFDalNoSqlProxy.insert(context, key, value[i]));
                                    }
                                }
                            });

                            $qSync.all(tabPromiseRequests).then(function(values){
                                that.resolvePromise(null, context);
                            }, function(error){
                                that.rejectPromise(error, context);
                            });
                        }

                    } catch (error) {
                        that.rejectPromise(error, context);
                    }
                    return this;
                };

                return action;
            }

        };

    }
]);