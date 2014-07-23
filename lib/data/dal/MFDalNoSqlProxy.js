'use strict';
/**
 * Created by Cabelguen on 28/03/14.
 */

angular.module('mfcore').factory('MFDalNoSqlProxy',
    ['$injector', 'MFDalException', 'MFDalSupport',
        function ($injector, MFDalException, MFDalSupport) {

    var pointerDal;

    var MFDalNoSqlProxy = function MFDalNoSqlProxy(){
        //constructor
        this.pointerDal = null;
    };


    MFDalNoSqlProxy.prototype.getPointer = function(){

        if(this.pointerDal === null){
            console.log(MFDalSupport.getDalSupportDeviceAndBase());

            switch (MFDalSupport.getDalSupportDeviceAndBase()) {
                case 'WEB_NOSQL':
                case 'CHROME_NOSQL':
                case 'SAFARI_NOSQL':
                case 'IE_NOSQL':
                case 'FIREFOX_NOSQL':
                case 'ANDROID_NOSQL':
                case 'WINDOWS8_NOSQL':
                case 'WP8_NOSQL':
                    this.pointerDal =  $injector.get('MFDalIndexedDB');
                    break;
                default:
                    throw new MFDalException('Cannot find mapping DAL to ' + MFDalSupport.getDalSupportDeviceAndBase());
            }
        }
        return this.pointerDal;
    };

    /**
     * Open Database Interface
     * @param context
     * @returns {*}
     */
    MFDalNoSqlProxy.prototype.openDatabase = function openDatabase(onUpgradeNeeded){

        return this.getPointer().openDatabase(onUpgradeNeeded);
    };

    MFDalNoSqlProxy.prototype.closeDatabase = function closeDatabase(){

        return this.getPointer().closeDatabase();
    };

    MFDalNoSqlProxy.prototype.deleteDatabase = function deleteDatabase(){

        return this.getPointer().deleteDatabase();
    };

    MFDalNoSqlProxy.prototype.openTransaction = function openTransaction(){

        return this.getPointer().openTransaction();
    };

    MFDalNoSqlProxy.prototype.closeTransaction = function closeTransaction(){

        return this.getPointer().closeTransaction();
    };

    MFDalNoSqlProxy.prototype.clearObjectStore = function(context, objectStoreName){

        return this.getPointer().clearObjectStore(context, objectStoreName);
    };

    MFDalNoSqlProxy.prototype.find = function find(){
        var delegate = this.getPointer();
        return delegate.find.apply(delegate, arguments);
    };

    MFDalNoSqlProxy.prototype.insert= function(context, objectStore, data, idAttributeName){

        return this.getPointer().insert(context, objectStore, data, idAttributeName);
    };

    MFDalNoSqlProxy.prototype.save = function(context, objectStore, data, idAttributeName){

        return this.getPointer().save(context, objectStore, data, idAttributeName);
    };

    MFDalNoSqlProxy.prototype.remove = function(context, objectStore, key){

        return this.getPointer().remove(context, objectStore, key);
    };

    MFDalNoSqlProxy.prototype.getAll = function(context, objectStore){

        return this.getPointer().findByFilter (context, objectStore);
    };

    MFDalNoSqlProxy.prototype.prepare = function(context, objectStores){

        return this.getPointer().prepare(context, objectStores);
    };

    MFDalNoSqlProxy.prototype.getLastId = function(context, objectStores) {

        return this.getPointer().getLastId(context, objectStores);
    };

   return new  MFDalNoSqlProxy();

}]);