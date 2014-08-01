'use strict';


angular.module('mfcore').factory('MFObjectToSynchronizeDaoMapping', function () {
    return {
        mappingSql: {
            rightFactory: 'MFObjectToSynchronizeFactory',
            attributes: [
                {leftAttr: 'ID', rightAttr: 'id', identifier: true},
                {leftAttr: 'OBJECTID', rightAttr: 'objectid'},
                {leftAttr: 'OBJECTNAME', rightAttr: 'objectname'}

                /*,
                 {leftAttr: ['NOTES','NOTEID'], rightAttr: ['notes','id'], rightFactory:'NoteFactory', multiple: true, childIdentifier: true}*/
            ]
        },

        mappingNoSql: {
            rightFactory: 'MFObjectToSynchronizeFactory',
            attributes: [
                {leftAttr: 'id', rightAttr: 'id', identifier: true},
                {leftAttr: 'objectid', rightAttr: 'objectid'},
                {leftAttr: 'objectname', rightAttr: 'objectname'}
                /*,
                 {leftAttr: ['NOTES','NOTEID'], rightAttr: ['notes','id'], rightFactory:'NoteFactory', multiple: true, childIdentifier: true}*/
            ]
        }
    };
});
