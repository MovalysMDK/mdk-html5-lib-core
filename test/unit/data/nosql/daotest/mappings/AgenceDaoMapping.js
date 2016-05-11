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

angular.module('data-daotest').factory('AgenceDaoMapping', [
    //@non-generated-start[dependencies-names][X]
    //@non-generated-end

    //@non-generated-start[dependencies-classes][X]
    function(
        //@non-generated-end
    ) {

        return {

            //@non-generated-start[mapping][X]
            mappingSql: {
                rightFactory: 'AgenceFactory',
                attributes: [{
                    leftAttr: 'ID',
                    rightAttr: 'id',
                    identifier: true
                }, {
                    leftAttr: 'NOM',
                    rightAttr: 'nom'
                }, {
                    leftAttr: 'RUE',
                    rightAttr: 'rue'
                }, {
                    leftAttr: 'CODEPOSTAL',
                    rightAttr: 'codepostal'
                }, {
                    leftAttr: 'VILLE',
                    rightAttr: 'ville'
                }, {
                    leftAttr: 'POSITION_LATITUDE',
                    rightAttr: ['position', 'latitude'],
                    rightFactory: 'MFAddressLocationFactory'
                }, {
                    leftAttr: 'POSITION_LONGITUDE',
                    rightAttr: ['position', 'longitude'],
                    rightFactory: 'MFAddressLocationFactory'
                }, {
                    leftAttr: 'POSITION_COMPL',
                    rightAttr: ['position', 'compl'],
                    rightFactory: 'MFAddressLocationFactory'
                }, {
                    leftAttr: 'POSITION_STREET',
                    rightAttr: ['position', 'street'],
                    rightFactory: 'MFAddressLocationFactory'
                }, {
                    leftAttr: 'POSITION_CITY',
                    rightAttr: ['position', 'city'],
                    rightFactory: 'MFAddressLocationFactory'
                }, {
                    leftAttr: 'POSITION_COUNTRY',
                    rightAttr: ['position', 'country'],
                    rightFactory: 'MFAddressLocationFactory'
                }, {
                    leftAttr: 'WEBSITE',
                    rightAttr: 'website'
                }, {
                    leftAttr: 'PHONE',
                    rightAttr: 'phone'
                }, {
                    leftAttr: 'DECIMAL',
                    rightAttr: 'decimal'
                }, {
                    leftAttr: 'ACTIVITE4ID',
                    rightAttr: ['activite4', 'id'],
                    rightFactory: 'ActiviteFactory',
                    childIdentifier: true
                }, {
                    leftAttr: 'DETAILID',
                    rightAttr: ['detail', 'id'],
                    rightFactory: 'AgenceDetailFactory',
                    childIdentifier: true
                }, {
                    leftAttr: 'ACTIVITE3ID',
                    rightAttr: ['activite3', 'id'],
                    rightFactory: 'ActiviteFactory',
                    childIdentifier: true
                }, {
                    leftAttr: 'ACTIVITE2ID',
                    rightAttr: ['activite2', 'id'],
                    rightFactory: 'ActiviteFactory',
                    childIdentifier: true
                }, {
                    leftAttr: 'ACTIVITE1ID',
                    rightAttr: ['activite1', 'id'],
                    rightFactory: 'ActiviteFactory',
                    childIdentifier: true
                }, {
                    leftAttr: 'MAINCLIENTID',
                    rightAttr: ['mainClient', 'id'],
                    rightFactory: 'ClientFactory',
                    childIdentifier: true
                }]
            },

            mappingNoSql: {
                rightFactory: 'AgenceFactory',
                attributes: [{
                    leftAttr: 'id',
                    rightAttr: 'id',
                    identifier: true
                }, {
                    leftAttr: 'nom',
                    rightAttr: 'nom'
                }, {
                    leftAttr: 'rue',
                    rightAttr: 'rue'
                }, {
                    leftAttr: 'codepostal',
                    rightAttr: 'codepostal'
                }, {
                    leftAttr: 'ville',
                    rightAttr: 'ville'
                }, {
                    leftAttr: ['position', 'latitude'],
                    rightAttr: ['position', 'latitude'],
                    rightFactory: 'MFAddressLocationFactory'
                }, {
                    leftAttr: ['position', 'longitude'],
                    rightAttr: ['position', 'longitude'],
                    rightFactory: 'MFAddressLocationFactory'
                }, {
                    leftAttr: ['position', 'compl'],
                    rightAttr: ['position', 'compl'],
                    rightFactory: 'MFAddressLocationFactory'
                }, {
                    leftAttr: ['position', 'street'],
                    rightAttr: ['position', 'street'],
                    rightFactory: 'MFAddressLocationFactory'
                }, {
                    leftAttr: ['position', 'city'],
                    rightAttr: ['position', 'city'],
                    rightFactory: 'MFAddressLocationFactory'
                }, {
                    leftAttr: ['position', 'country'],
                    rightAttr: ['position', 'country'],
                    rightFactory: 'MFAddressLocationFactory'
                }, {
                    leftAttr: 'website',
                    rightAttr: 'website'
                }, {
                    leftAttr: 'phone',
                    rightAttr: 'phone'
                }, {
                    leftAttr: 'decimal',
                    rightAttr: 'decimal'
                }, {
                    leftAttr: 'activite4id',
                    rightAttr: ['activite4', 'id'],
                    rightFactory: 'ActiviteFactory',
                    childIdentifier: true
                }, {
                    leftAttr: 'detailid',
                    rightAttr: ['detail', 'id'],
                    rightFactory: 'AgenceDetailFactory',
                    childIdentifier: true
                }, {
                    leftAttr: 'activite3id',
                    rightAttr: ['activite3', 'id'],
                    rightFactory: 'ActiviteFactory',
                    childIdentifier: true
                }, {
                    leftAttr: 'activite2id',
                    rightAttr: ['activite2', 'id'],
                    rightFactory: 'ActiviteFactory',
                    childIdentifier: true
                }, {
                    leftAttr: 'activite1id',
                    rightAttr: ['activite1', 'id'],
                    rightFactory: 'ActiviteFactory',
                    childIdentifier: true
                }, {
                    leftAttr: 'mainclientid',
                    rightAttr: ['mainClient', 'id'],
                    rightFactory: 'ClientFactory',
                    childIdentifier: true
                }]
            }
            //@non-generated-end

        };

    }
]);