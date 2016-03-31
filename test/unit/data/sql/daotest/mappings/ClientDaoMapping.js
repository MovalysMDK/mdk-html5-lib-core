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

angular.module('data-daotest-sql').factory('ClientDaoMapping',
[
//@non-generated-start[dependencies-names][X]
//@non-generated-end

//@non-generated-start[dependencies-classes][X]
function (
//@non-generated-end
) {

	return {

//@non-generated-start[mapping][X]
		mappingSql: {
rightFactory: 'ClientFactory',
attributes: [
{leftAttr: 'ID', rightAttr: 'id', identifier: true},
{leftAttr: 'NOM', rightAttr: 'nom'},
{leftAttr: 'PRENOM', rightAttr: 'prenom'},
{leftAttr: 'TELEPHONE', rightAttr: 'telephone'},
{leftAttr: 'POSITION_LATITUDE', rightAttr: ['position', 'latitude'], rightFactory: 'MFAddressLocationFactory'},
{leftAttr: 'POSITION_LONGITUDE', rightAttr: ['position', 'longitude'], rightFactory: 'MFAddressLocationFactory'},
{leftAttr: 'POSITION_COMPL', rightAttr: ['position', 'compl'], rightFactory: 'MFAddressLocationFactory'},
{leftAttr: 'POSITION_STREET', rightAttr: ['position', 'street'], rightFactory: 'MFAddressLocationFactory'},
{leftAttr: 'POSITION_CITY', rightAttr: ['position', 'city'], rightFactory: 'MFAddressLocationFactory'},
{leftAttr: 'POSITION_COUNTRY', rightAttr: ['position', 'country'], rightFactory: 'MFAddressLocationFactory'},
{leftAttr: 'EMAIL', rightAttr: 'email'},
{leftAttr: 'AGENCEID12', rightAttr: ['agence', 'id'], rightFactory: 'AgenceFactory', childIdentifier: true},
{leftAttr: 'AGENCYID', rightAttr: ['agency', 'id'], rightFactory: 'AgenceFactory', childIdentifier: true}
]
			},

		mappingNoSql: {rightFactory: 'ClientFactory',
attributes: [
{leftAttr: 'id', rightAttr: 'id', identifier: true},
{leftAttr: 'nom', rightAttr: 'nom'},
{leftAttr: 'prenom', rightAttr: 'prenom'},
{leftAttr: 'telephone', rightAttr: 'telephone'},
{leftAttr: ['position', 'latitude'], rightAttr: ['position', 'latitude'], rightFactory: 'MFAddressLocationFactory'},
{leftAttr: ['position', 'longitude'], rightAttr: ['position', 'longitude'], rightFactory: 'MFAddressLocationFactory'},
{leftAttr: ['position', 'compl'], rightAttr: ['position', 'compl'], rightFactory: 'MFAddressLocationFactory'},
{leftAttr: ['position', 'street'], rightAttr: ['position', 'street'], rightFactory: 'MFAddressLocationFactory'},
{leftAttr: ['position', 'city'], rightAttr: ['position', 'city'], rightFactory: 'MFAddressLocationFactory'},
{leftAttr: ['position', 'country'], rightAttr: ['position', 'country'], rightFactory: 'MFAddressLocationFactory'},
{leftAttr: 'email', rightAttr: 'email'},
{leftAttr: 'agenceid12', rightAttr: ['agence', 'id'], rightFactory: 'AgenceFactory', childIdentifier: true},
{leftAttr: 'agencyid', rightAttr: ['agency', 'id'], rightFactory: 'AgenceFactory', childIdentifier: true}
]
}
//@non-generated-end

	};

}]);
