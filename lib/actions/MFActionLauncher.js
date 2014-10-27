'use strict';
/**
 * Action Launcher Service.
 *
 * Created by Sergio Contreras on 12/03/14.
 */

angular.module('mfcore').factory('MFActionLauncher', ['$injector', 'cfpLoadingBar', 'MFTransactionManager', 'MFSyncPromiseProvider', 'MFContextFactory', 'MFConfigurationService',
    function ($injector, cfpLoadingBar, MFTransactionManager, $qSync, MFContextFactory, MFConfigurationService) {

        var ActionPipeline = function ActionPipeline() {
            this.runningActions = [];
            this.pendingActions = [];
        };

        var processAction = function (actionContainer) {
            var durationTimeout = MFConfigurationService.getValue('actionTimeout', 10) * 1000;
            var objTimeout = setTimeout(function () {
                console.error('Action reached timeout : '+durationTimeout+' ms');
                if (actionContainer.action.status === actionContainer.action.Status.RUNNING) {
                    actionContainer.action.rejectPromise('MFActionLauncher: the action ' + actionContainer.action.type + ' doesn\'t respond : aborting', actionContainer.cluster.context);
                }
            }, durationTimeout);
            try {
                if (actionContainer.cluster.needsContinuousTransaction) {
                    actionContainer.action.doAction(actionContainer.cluster.context, actionContainer.params);
                    actionContainer.action.then(function(){clearTimeout(objTimeout);});

                    if (actionContainer.action.status === actionContainer.action.RUNNING && !actionContainer.action.database) {
                        var errorMsg = 'MFActionLauncher: failure of the action ' + actionContainer.action.type + ' because it is not a database action while cluster.needsContinuousTransaction=true.';
                        actionContainer.action.rejectPromise(errorMsg, actionContainer.cluster.context);
                    }
                } else {
                    if (actionContainer.action.database) {
                        MFTransactionManager.run(
                            actionContainer.cluster.context,
                            actionContainer.action.doAction.bind(actionContainer.action),
                            function(error){
                                actionContainer.action.rejectPromise(error, actionContainer.cluster.context);
                            },
                            actionContainer.params
                        );
                    } else {
                        actionContainer.action.doAction(actionContainer.cluster.context, actionContainer.params);
                    }
                    actionContainer.action.then(function(){clearTimeout(objTimeout);});
                }
            }
            catch (exception) {
                actionContainer.action.rejectPromise(exception, actionContainer.cluster.context);
            }
        };

        ActionPipeline.prototype.nextTick = function () {
            // May we push the next pending action in the running actions ?
            var runNextAction = (this.pendingActions.length !== 0 && (!this.pendingActions[0].action.atomic || this.runningActions.length === 0)) && (this.runningActions.length === 0 || !this.runningActions[0].action.atomic);
            if (runNextAction) {
                var actionContainer = this.pendingActions.shift();
                this.runningActions.push(actionContainer);
                processAction(actionContainer);
                this.nextTick();
            }
        };

        ActionPipeline.prototype.runActionCluster = function (actionCluster) {
            var self = this;

            if (actionCluster.showProgress) {
                ActionPipeline.getProgressToken(actionCluster);
                actionCluster.deferred.promise['finally'](function () {
                    ActionPipeline.returnBackProgressToken(actionCluster);
                });
            }
            // On action failed : abort + remove pending and running actions (owned by this cluster) in the pipeline
            var onActionTerminated = function (actionContainer) {
                var index = self.runningActions.indexOf(actionContainer);
                self.runningActions.splice(index, 1);
                self.nextTick();
            };

            for (var i = 0; i < actionCluster.actions.length; ++i) {
                var actionContainer = actionCluster.actions[i];
                actionContainer.action.then(
                    onActionTerminated.bind(self, actionContainer),
                    onActionTerminated.bind(self, actionContainer));
                self.pendingActions.push(actionContainer);
            }
            self.nextTick();
        };

        var ActionCluster = function ActionCluster(actions, actionPipeline, needsContinuousTransaction, showProgress) {
            var self = this;
            self.actions = [];
            self.failed = false;
            self.context = MFContextFactory.createInstance();
            self.deferred = $qSync.defer();
            self.needsContinuousTransaction = needsContinuousTransaction;
            self.showProgress = showProgress;

            // On action failed : abort + remove pending and running actions (owned by this cluster) in the pipeline
            var onActionFailed = function (failedAction) {
                if (!self.failed) {
                    self.failed = true;
                    for (var i = 0; i < self.actions.length; ++i) {
                        var action = self.actions[i].action;
                        if (action.status === action.Status.RUNNING || action.status === action.Status.NOT_STARTED) {
                            var errorMessage = 'previous action failed  => failure of action ' + action.type + '';
                            action.rejectPromise(errorMessage, self.context);
                        }
                    }
                    self.context.daoSession = {};
                    self.deferred.reject(self.context);
                }
            };

            var onActionSucceeded = function (succeededActionContainer, result) {
                succeededActionContainer.result = result;
                var nextActionContainerIndex = self.actions.indexOf(succeededActionContainer) + 1;
                if (nextActionContainerIndex < self.actions.length) {
                    var nextActionContainer = self.actions[nextActionContainerIndex];
                    if (nextActionContainer.previousActionResult) {
                        nextActionContainer.params.previousActionResult = result.result;
                    }
                }
                var i;
                var clusterSucceeded = true;
                for (i = 0; i < self.actions.length; ++i) {
                    var action = self.actions[i].action;
                    clusterSucceeded = clusterSucceeded && (action.status === action.Status.SUCCEEDED);
                }
                if (clusterSucceeded) {
                    self.context.results = [];
                    for (i = 0; i < self.actions.length; ++i) {
                        self.context.results.push(self.actions[i].result.result);
                    }
                    self.deferred.resolve(self.context);
                }
            };

            for (var i = 0; i < actions.length; ++i) {
                var actionContainer = actions[i];
                actionContainer.cluster = self;
                actionContainer.action.then(
                    onActionSucceeded.bind(self, actionContainer),
                    onActionFailed.bind(self, actionContainer)
                );
                actionContainer.result = null;
                self.actions.push(actionContainer);
            }
        };

        var actionPipeline = new ActionPipeline();
        ActionPipeline.progressTokens = [];
        ActionPipeline.getProgressToken = function (actionCluster) {
            if (ActionPipeline.progressTokens.length === 0) {
                cfpLoadingBar.start();
            }
            var index = ActionPipeline.progressTokens.indexOf(actionCluster);
            if (index === -1) {
                ActionPipeline.progressTokens.push(actionCluster);
            }
        };

        ActionPipeline.returnBackProgressToken = function (actionCluster) {
            var index = ActionPipeline.progressTokens.indexOf(actionCluster);
            if (index !== -1) {
                ActionPipeline.progressTokens.splice(index, 1);
                if (ActionPipeline.progressTokens.length === 0) {
                    cfpLoadingBar.complete();
                }
            }
        };

        var ActionLauncher = function ActionLauncher() {
        };
        var actionLauncher = new ActionLauncher();


        actionLauncher.launchAction = function (action, params, showProgress) {
            this.launchActions([
                {
                    action: action,
                    params: params
                }
            ], showProgress, false);
            return action.deferred.promise;
        };

        actionLauncher.launchActions = function (actionContainers, showProgress, needsContinuousTransaction) {
            showProgress = showProgress === undefined || showProgress;
            needsContinuousTransaction = needsContinuousTransaction === undefined ? false : needsContinuousTransaction;
            var actionCluster = new ActionCluster(actionContainers, actionPipeline, needsContinuousTransaction, showProgress);
            setTimeout(function () {
                actionPipeline.runActionCluster(actionCluster);
            }, 0);
            return actionCluster.deferred.promise;
        };

        return actionLauncher;
    }]);