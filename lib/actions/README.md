<!--
# Copyright (C) 2016 Sopra Steria Group (movalys.support@soprasteria.com)
#
# This file is part of Movalys MDK.
# Movalys MDK is free software: you can redistribute it and/or modify
# it under the terms of the GNU Lesser General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
# Movalys MDK is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
# GNU Lesser General Public License for more details.
# You should have received a copy of the GNU Lesser General Public License
# along with Movalys MDK. If not, see <http://www.gnu.org/licenses/>.
-->
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