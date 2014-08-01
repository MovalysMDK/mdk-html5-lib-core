'use strict';


angular.module('mfcore').factory('MFParameterDaoMapping', function () {
    return {
        mappingSql: {
            rightFactory: 'MFParameterFactory',
            attributes: [
                {leftAttr: 'ID', rightAttr: 'id', identifier: true},
                {leftAttr: 'NAME', rightAttr: 'name'},
                {leftAttr: 'VALUE', rightAttr: 'value'}

                /*,
                 {leftAttr: ['NOTES','NOTEID'], rightAttr: ['notes','id'], rightFactory:'NoteFactory', multiple: true, childIdentifier: true}*/
            ]
        },

        mappingNoSql: {
            rightFactory: 'MFParameterFactory',
            attributes: [
                {leftAttr: 'id', rightAttr: 'id', identifier: true},
                {leftAttr: 'name', rightAttr: 'name'},
                {leftAttr: 'value', rightAttr: 'value'}
                /*,
                 {leftAttr: ['NOTES','NOTEID'], rightAttr: ['notes','id'], rightFactory:'NoteFactory', multiple: true, childIdentifier: true}*/
            ]
        }
    };
});
