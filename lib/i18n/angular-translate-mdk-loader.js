'use strict';

angular.module('pascalprecht.translate').factory('$translateMDKLoader', [
  '$q',
  '$http',
  function ($q, $http) {
    return function (options) {

      if (!options || (!angular.isArray(options.prefixes))) {
        throw new Error('Couldn\'t load static files, no prefixes specified!');
      }
      var deferred = $q.defer();

      var promises = [];
      for( var i = 0; i < options.prefixes.length; i++ ) {
          promises.push(

          $http.get(
                  [options.path + '/' + options.prefixes[i],
                  options.key,
                  options.suffix
              ].join('')
          )

          );
      }

      $q.all(promises).then( function(results) {
          var aggregatedData = {};
          angular.forEach(results, function (result) {
              console.log('result end:', result.data);
              angular.extend(aggregatedData, result.data);
          });
          console.log('i18n:', aggregatedData);
          deferred.resolve(aggregatedData);
      }, function( error) {
          deferred.reject(error);
      });
      return deferred.promise;
    };
  }
]);