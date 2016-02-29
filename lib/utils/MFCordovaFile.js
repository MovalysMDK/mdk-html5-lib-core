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

angular.module('mfcore').factory('MFCordovaFile', ['MFException', 'MFAbstractEnum', '$q', 'MFCordovaStatusEnum', 'MFCordova', function (MFException, MFAbstractEnum, $q, MFCordovaStatusEnum, MFCordova) {


    var MFCordovaFile = function MFCordovaFile() {
    };


    MFCordovaFile.isExistFile = function (fileName) {
        var deferred = $q.defer();
        window.requestFileSystem(window.PERSISTENT, 0, function (fs) {
            fs.root.getFile(fileName, {create: false}, function (fileEntry) {
                deferred.resolve();
            }, function (error) {
                deferred.reject(error);
            });
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    MFCordovaFile.writeFile = function (fileName, data) {
        var deferred = $q.defer();
        window.requestFileSystem(window.PERSISTENT, 0, function (fs) {
            fs.root.getFile(fileName, {create: true}, function (fileEntry) {
                fileEntry.createWriter(function (fileWriter) {
                    fileWriter.onwriteend = function (e) {
                        deferred.resolve();
                    };
                    fileWriter.onerror = function (error) {
                        deferred.reject(error);
                    };
                    fileWriter.write(data);
                }, function (error) {
                    deferred.reject(error);
                });
            }, function (error) {
                deferred.reject(error);
            });
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    MFCordovaFile.deleteFile = function (fileName) {
        var deferred = $q.defer();
        window.requestFileSystem(window.PERSISTENT, 0, function (fs) {
            fs.root.getFile(fileName, {create: false}, function (fileEntry) {
                fileEntry.remove(function () {
                    deferred.resolve();
                }, function (error) {
                    deferred.reject(error);
                });
            }, function (error) {
                deferred.reject(error);
            });
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    MFCordovaFile.readFile = function (fileName) {
        var deferred = $q.defer();
        window.requestFileSystem(window.PERSISTENT, 0, function (fs) {
            fs.root.getFile(fileName, {}, function (fileEntry) {
                fileEntry.file(function (file) {
                    var reader = new FileReader();
                    reader.onload = function () {
                        deferred.resolve(reader.result);
                    };

                    reader.onerror = function (error) {
                        deferred.reject(error);
                    };

                    reader.onloadend = function (e) {
                        console.log('Read action end');
                    };
                    reader.readAsText(file);
                }, function (error) {
                    deferred.reject(error);
                });
            }, function (error) {
                deferred.reject(error);
            });
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };


    MFCordovaFile.isExistFileSystem = function () {
        var deferred = $q.defer();
        if (!window.requestFileSystem) {
            deferred.reject('This Browser not supported FileSystem');
        } else {
            deferred.resolve();
        }

        return deferred.promise;
    };

    return MFCordovaFile;
}]);