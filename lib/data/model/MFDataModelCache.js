'use strict';

angular.module('mfcore').factory('MFDataModelCache', ['MFUtils', function (MFUtils) {

    //BE CAREFUL: do not define a constructor or attributes because it will be overwritten in the children

    var MFDataModelCache = function MFDataModelCache() {
    };

    var _modelCache = {};
    Object.defineProperty( MFDataModelCache.prototype,
        'modelCache', {
            get:function(){
                return _modelCache;
            },
            enumerable: true,
            configurable: false
        }
    );


    MFDataModelCache.prototype.pushDaoCache = function pushDaoCache(p_context){

        var daoCache = p_context.daoSession;

        console.log('MFDataModelCache - before pushDaoCache(), the cache has '+Object.keys(_modelCache).length+' records and '+this.fullListDone.length+' full entities lists');
        console.log('MFDataModelCache - will push '+Object.keys(daoCache).length+' records into the cache');

        angular.forEach(daoCache, function(objFromDao, keyFromDao) {
            if(objFromDao._deleted){
                console.log('MFDataModelCache - delete from cache '+keyFromDao);
                delete _modelCache[keyFromDao];
            }
            else {
                if(objFromDao.idToString !== -1 && objFromDao._fulfilled /*&& angular.isUndefinedOrNull(_modelCache[keyFromDao])*/){
                    //console.log('MFDataModelCache - will push '+keyFromDao);
                    _modelCache[keyFromDao] = objFromDao;
                }
                else {
                    console.log('MFDataModelCache - ignore '+keyFromDao+' (id='+objFromDao.idToString+' , fulfilled = '+objFromDao._fulfilled+') ');
                }
            }
        });

        this.fullListDone.push.apply(this,p_context.fullListDone);

        console.log('MFDataModelCache - after pushDaoCache(), the cache has '+Object.keys(_modelCache).length+' records and '+this.fullListDone.length+' full entities lists');

    };

    MFDataModelCache.prototype.initDaoCache = function initDaoCache(){

        var result = {};

        angular.forEach(_modelCache, function(obj, key) {
            result[key] = obj;
        });
        return result;
    };




    Object.defineProperty( MFDataModelCache.prototype,
        'fullListDone', {
            value:[],
            writable:true,
            enumerable: true,
            configurable: false
        }
    );
    MFDataModelCache.prototype.hasFullList = function hasFullList(entityName){
        return this.fullListDone.indexOf(entityName) > -1;
    };


    MFDataModelCache.prototype.getEntitiesByProperty = function getEntitiesByProperty(entityName, propertyName, propertyValue){

        console.log('MFDataModelCache - the cache has '+Object.keys(_modelCache).length+' records');

        var noPropertyFilter = angular.isUndefinedOrNullOrEmpty(propertyName) || propertyName === '*';
        var results = [];
        angular.forEach(_modelCache, function(obj, key) {
            var currEntityName = key.split('Factory#')[0];
            console.assert(currEntityName !== entityName || noPropertyFilter|| propertyName in obj,'The property "'+propertyName+'" cannot be found in the object "'+key+'" present in the cache');
            if(currEntityName === entityName && (noPropertyFilter|| obj[propertyName] === propertyValue)){
                this.push(obj);
            }
        }, results);
        return results;
    };

    MFDataModelCache.prototype.clear = function clear(){
        console.log('MFDataModelCache - the cache has '+Object.keys(_modelCache).length+' records');
        this.fullListDone.clear();
        for (var prop in this.modelCache) {
            if (this.modelCache.hasOwnProperty(prop)) {
                delete this.modelCache[prop];
            }
        }
        console.log('MFDataModelCache - after clear, the cache has '+Object.keys(_modelCache).length+' records');
    };

    return new MFDataModelCache();
}]);