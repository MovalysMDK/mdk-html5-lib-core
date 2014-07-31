'use strict';
/**
 * Utils
 * Created by Cabelguen on 21/01/14.
 */




angular.module('mfcore').factory('MFSystem', ['$q', '$http', '$window', function ($q, $http, $window) {
	var MFSystem = function MFSystem() {};

    /**
     * Asynchronous call to get a file
     *
     * @param filePath
     * @param cached
     * @returns {*}
     */
	MFSystem.getAsset = function(filePath, cached) {
		if (cached === undefined) {
			cached = true;
		}
		var deferred = $q.defer();

		if (typeof filePath !== 'string') {
			deferred.reject(
					{
						message: 'filePath is not a string',
						args: filePath
					});
		} else {
			var getFile = function getFile(filePath) {
				var result = localStorage['asset#' + filePath];
				if (result === undefined) {

                    try {
                        $http.get(
                            filePath,
                            {
                                ignoreLoadingBar: true
                            }
                        ).then(function(result) {
                                try {
                                    if (cached) {
                                        localStorage['asset#' + filePath] = JSON.stringify(result);
                                    }
                                    deferred.resolve(result);
                                }
                                catch(error){
                                    deferred.reject(error);
                                }
                            }, function (error) {
                                deferred.reject(error);
                            });
                    }
                    catch(error){
                        deferred.reject(error);
                    }
				} else {
					deferred.resolve(JSON.parse(result));
				}
			};

			//MFCordova.onCordovaReady(function() {
				// Cordova is on but we use http fonction
				// it worksfine because it's a Cordova App
				getFile(filePath);
				// A Other method is : 
				// window.requestFileSystem(
				// 	LocalFileSystem.PERSISTENT,
				// 	0,
				// 	function(fileSystem) {
				// 		fileSystem.root.getDirectory(
				// 				'.',
				// 				null,
				// 				function(fileEntry) {
				// 					console.log('<<>> : ', fileEntry.getUrl());
				// 					// $window.alert('fileEntry : '+ angular.toJson(fileEntry.getUrl(), true));
				// 				}
				// 			);
				// 		fileSystem.root.getFile(
				// 				filePath,
				// 				null,
				// 				function(file) {
				// 					var reader = new FileReader();
				// 					reader.onloadend = function(evt) {
				// 						console.log(evt.target.result);
				// 						deferred.resolve(evt.target.result);
				// 					};
				// 					reader.readAsText(file);
				// 				},
				// 				function() {
				// 					console.log('file not found :', filePath);
				// 					deferred.reject({message: 'file not found : '+filePath});
				// 				}
				// 			);
				// 	},
				// 	function() {
				// 		console.log('no fileSystem');
				// 		deferred.reject(error);
				// 	});

			//}, function() {
				// Cordova is off, we get the file via HTTP get method
			//	getFile(filePath);
			//});
		}
		return deferred.promise;
	};

	MFSystem.getAssets = function (filePaths, cached) {
		var promises = [];
		for (var i = 0; i < filePaths.length; ++i) {
			promises.push(MFSystem.getAsset(filePaths[i], cached));
		}
		return $q.all(promises);
	};

	Object.freeze(MFSystem);
	return MFSystem;
}]);
