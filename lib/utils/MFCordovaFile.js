'use strict';
/**
 * @file MFCordovaFile.js
 * @brief
 * @date 22/01/2014
 *
 * Copyright (c) 2014 Sopra Group. All rights reserved.
 *
 */

angular.module('mfcore').factory('MFCordovaFile', ['MFException', 'MFAbstractEnum', '$q','MFCordovaStatusEnum','MFCordova', function (MFException, MFAbstractEnum, $q,MFCordovaStatusEnum, MFCordova) {


    var MFCordovaFile = function MFCordovaFile() {
    };



    MFCordovaFile.isExistFile = function(fileName){
        var deferred = $q.defer();
        window.requestFileSystem(window.PERSISTENT, 0, function(fs) {
            fs.root.getFile(fileName, {create: false}, function(fileEntry) {
                deferred.resolve();
            }, function(error) {
                deferred.reject(error);
            });
        }, function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    MFCordovaFile.writeFile = function(fileName, data){
        var deferred = $q.defer();
        window.requestFileSystem(window.PERSISTENT, 0, function(fs) {
            fs.root.getFile(fileName, {create: true}, function(fileEntry) {
                fileEntry.createWriter(function(fileWriter) {
                    fileWriter.onwriteend = function(e) {
                        deferred.resolve();
                    };
                    fileWriter.onerror = function(error) {
                        deferred.reject(error);
                    };
                    fileWriter.write(data);
                }, function(error) {
                    deferred.reject(error);
                });
            }, function(error) {
                deferred.reject(error);
            });
        }, function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    MFCordovaFile.deleteFile = function(fileName){
        var deferred = $q.defer();
        window.requestFileSystem(window.PERSISTENT, 0, function(fs) {
            fs.root.getFile(fileName, {create: false}, function(fileEntry) {
                fileEntry.remove(function() {
                    deferred.resolve();
                }, function(error) {
                    deferred.reject(error);
                });
            }, function(error) {
                deferred.reject(error);
            });
        }, function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    MFCordovaFile.readFile = function(fileName){
        var deferred = $q.defer();
        window.requestFileSystem(window.PERSISTENT, 0, function(fs) {
            fs.root.getFile(fileName, {}, function(fileEntry) {
                fileEntry.file(function(file) {
                    var reader = new FileReader();
                    reader.onload = function (){
                        deferred.resolve(reader.result);
                    };

                    reader.onprogress = function (){
                        //    console.log('Read progress');
                    };

                    reader.onerror = function (error){
                        deferred.reject(error);
                    };

                    reader.onloadend = function(e) {
                        //  console.log('Read action end');
                    };
                    reader.readAsText(file);
                }, function(error) {
                    deferred.reject(error);
                });
            }, function(error) {
                deferred.reject(error);
            });
        }, function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };


    MFCordovaFile.isExistFileSystem = function(){
        var deferred = $q.defer();
        if(!window.requestFileSystem){
            deferred.reject('This Browser not supported FileSystem');
        }else{
            deferred.resolve();
        }

        return deferred.promise;
    };

    return MFCordovaFile;
}]);