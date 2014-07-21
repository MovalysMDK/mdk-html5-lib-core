'use strict';
/**
 * Created by Cabelguen on 28/03/14.
 */

angular.module('mfcore').factory('MFDalSupport', ['MFIntegerConverter', 'MFConfigurationService', 'MFCordova', 'MFCordovaStatusEnum', function (MFIntegerConverter, MFConfigurationService, MFCordova, MFCordovaStatusEnum) {

    var level;
    var device;


    var MFDalSupport = function MFDalSupport(){
        this.level = null;
        this.device = null;
    };


    MFDalSupport.prototype.dalSupport = function(){

        this.level = ['','',''];
        this.device = MFConfigurationService.getValue('deviceName','NOPLATFORM');

        var dataBaseType = MFConfigurationService.getValue('dataBaseType','NODATATYPE');
        var currentVersion = MFIntegerConverter.fromVersion(MFConfigurationService.getValue('deviceVersion','1.0'));
        // TODO Native or Browser
        console.log('############# MFCordova.status', MFCordova.status);
        console.log('############# dataBaseType', dataBaseType);

        var plateform = '';
        if ( MFCordova.status === MFCordovaStatusEnum.NOT_AVAILABLE || MFCordova.status === MFCordovaStatusEnum.PENDING ) {
            plateform = 'browser';
        } else {
            plateform = 'native';
        }
        var prefBaseTypes = dataBaseType[plateform][this.device.toLowerCase()];

        console.log(dataBaseType);
        console.log('CurrentVersion: ' + currentVersion);
        console.log('########## ', prefBaseTypes);

        for(var id in prefBaseTypes) {

            if(prefBaseTypes[id].comparator === '*'){

                this.level[2]= prefBaseTypes[id].database;

            }else if(prefBaseTypes[id].comparator === '='){

                if( currentVersion === MFIntegerConverter.fromVersion(prefBaseTypes[id].version)){

                    this.level[0]= prefBaseTypes[id].database;
                }

            }else if(prefBaseTypes[id].comparator === '<'){

                if( currentVersion < MFIntegerConverter.fromVersion(prefBaseTypes[id].version)){

                    this.level[1]= prefBaseTypes[id].database;
                }

            }else if(prefBaseTypes[id].comparator === '>'){

                if( currentVersion > MFIntegerConverter.fromVersion(prefBaseTypes[id].version)){

                    this.level[1]= prefBaseTypes[id].database;
                }

            }else if(prefBaseTypes[id].comparator === '<='){

                if( currentVersion <= MFIntegerConverter.fromVersion(prefBaseTypes[id].version)){

                    this.level[1]= prefBaseTypes[id].database;
                }

            }else if(prefBaseTypes[id].comparator === '>='){

                if( currentVersion >= MFIntegerConverter.fromVersion(prefBaseTypes[id].version)){

                    this.level[1]= prefBaseTypes[id].database;
                }
            }


        }



    };

    MFDalSupport.prototype.getDalSupportDeviceAndBase = function(){

        console.log('device:'+this.device);
        console.log('level:'+this.level);

        if(this.level === null){
            this.dalSupport();
        }

        if(this.level[0]){

            return this.device + '_' + this.level[0];

        }else if(this.level[1]){

            return this.device + '_' + this.level[1];

        }else if(this.level[2]){

            return this.device + '_' + this.level[2];
        }
    };

    MFDalSupport.prototype.getDalSupportBase = function(){

        if(this.level === null){
            this.dalSupport();
        }

        if(this.level[0]){

            return this.level[0];

        }else if(this.level[1]){

            return this.level[1];

        }else if(this.level[2]){

            return this.level[2];
        }
    };

    return new  MFDalSupport();

}]);