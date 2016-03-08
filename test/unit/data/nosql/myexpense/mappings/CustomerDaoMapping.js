'use strict';
/**
 * 
 *
 * <p>Copyright (c) 2010</p>
 * <p>Company: Adeuza</p>
 *
 */

//@non-generated-start[jshint-override]
//@non-generated-end

angular.module('data-myexpense').factory('CustomerDaoMapping', [
    //@non-generated-start[dependencies-names][X]
    //@non-generated-end

    //@non-generated-start[dependencies-classes][X]
    function(
        //@non-generated-end
    ) {

        return {
            //@non-generated-start[mapping][X]
            mappingSql: {
                rightFactory: 'CustomerFactory',
                attributes: [{
                    leftAttr: 'ID',
                    rightAttr: 'id',
                    identifier: true
                }, {
                    leftAttr: 'NAME',
                    rightAttr: 'name'
                }, {
                    leftAttr: 'ADDRESS_LATITUDE',
                    rightAttr: ['address', 'latitude'],
                    rightFactory: 'MFAddressLocationFactory'
                }, {
                    leftAttr: 'ADDRESS_LONGITUDE',
                    rightAttr: ['address', 'longitude'],
                    rightFactory: 'MFAddressLocationFactory'
                }, {
                    leftAttr: 'ADDRESS_COMPL',
                    rightAttr: ['address', 'compl'],
                    rightFactory: 'MFAddressLocationFactory'
                }, {
                    leftAttr: 'ADDRESS_STREET',
                    rightAttr: ['address', 'street'],
                    rightFactory: 'MFAddressLocationFactory'
                }, {
                    leftAttr: 'ADDRESS_CITY',
                    rightAttr: ['address', 'city'],
                    rightFactory: 'MFAddressLocationFactory'
                }, {
                    leftAttr: 'ADDRESS_COUNTRY',
                    rightAttr: ['address', 'country'],
                    rightFactory: 'MFAddressLocationFactory'
                }]
            },

            mappingNoSql: {
                rightFactory: 'CustomerFactory',
                attributes: [{
                    leftAttr: 'id',
                    rightAttr: 'id',
                    identifier: true
                }, {
                    leftAttr: 'name',
                    rightAttr: 'name'
                }, {
                    leftAttr: ['address', 'latitude'],
                    rightAttr: ['address', 'latitude'],
                    rightFactory: 'MFAddressLocationFactory'
                }, {
                    leftAttr: ['address', 'longitude'],
                    rightAttr: ['address', 'longitude'],
                    rightFactory: 'MFAddressLocationFactory'
                }, {
                    leftAttr: ['address', 'compl'],
                    rightAttr: ['address', 'compl'],
                    rightFactory: 'MFAddressLocationFactory'
                }, {
                    leftAttr: ['address', 'street'],
                    rightAttr: ['address', 'street'],
                    rightFactory: 'MFAddressLocationFactory'
                }, {
                    leftAttr: ['address', 'city'],
                    rightAttr: ['address', 'city'],
                    rightFactory: 'MFAddressLocationFactory'
                }, {
                    leftAttr: ['address', 'country'],
                    rightAttr: ['address', 'country'],
                    rightFactory: 'MFAddressLocationFactory'
                }]
            }
            //@non-generated-end

        };

    }
]);