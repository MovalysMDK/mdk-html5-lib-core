/**
 * Copyright (C) 2016 Sopra Steria Group (movalys.support@soprasteria.com)
 *
 * This file is part of Movalys MDK.
 * Movalys MDK is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * Movalys MDK is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 * You should have received a copy of the GNU Lesser General Public License
 * along with Movalys MDK. If not, see <http://www.gnu.org/licenses/>.
 */
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
            for (var i = 0; i < options.prefixes.length; i++) {
                promises.push(
                    $http.get(
                        [options.path + '/' + options.prefixes[i],
                            options.key,
                            options.suffix
                        ].join('')
                    )
                );
            }

            $q.all(promises).then(function (results) {
                var aggregatedData = {};
                angular.forEach(results, function (result) {
                    angular.extend(aggregatedData, result.data);
                });
                console.log('[TRANSLATION] key<>value downloaded', aggregatedData);
                deferred.resolve(aggregatedData);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };
    }
]);