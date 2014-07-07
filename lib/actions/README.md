This readme is about Actions: how to use them and how to implement them.

First of all we have to consider that an "action" is a container to hide some stuff
which potentialy concerns the whole application.

For instance a save action could launch a database transaction and the reload of the data to fill in the screen.


To create an action, we have to create the common structure of an action, a MFBaseAction :

var action = MFBaseAction.createInstance({
                    atomic: false, // Only this action is executed at the it is
                    database: true, // Need the a database connection
                    type: 'MyActionName' // The name of the action ; it should be like a class name
                });

And then we have to tell what stuff the action shall do.
Furthermore, we need to tell whether the action execution is successful or not

                /** 
                 * Execute operations
                 **/
                action.doAction = function(context, params) {
                    //stuff

                    if (success) {
                        action.resolvePromise(theResult, // what we want to return 
                                              context);
                    } else {
                        action.rejectPromise(theError, // the error we want to return
                                             context);
                    }
                }
                
                
Note that the resolvePromise and the rejectPromise could be done in an async task.
It will be the case for a database action, or an HTTP resquest action for instance.