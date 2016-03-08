'use strict';

describe('MFDaoNoSqlAbstract', function() {
  var dbName = 'MFDaoNoSqlAbstract' ;
  var $q, $rootScope, $httpBackend;
  var tx;


  /** Inject angular dependencies */
  beforeEach(function(done) {
    module('data-myexpense')
    
    inject(function(_$q_, _$rootScope_, _$httpBackend_) {
      $q = _$q_;
      $rootScope = _$rootScope_;
      $httpBackend = _$httpBackend_;
      done();
    });
  });

  /** Set MFCore configuration */
  beforeEach(function(done) {
      inject(function(MFConfigurationService, MFInitScheduler, MFDatabaseTypeSelector ) {
        // Set db info
        MFConfigurationService.setValue('databaseConfig', {"name":dbName, "version":"1"});
        MFConfigurationService.setValue('dataBaseType', {"browser": {"chrome": [{"comparator": ">=","version": "23","database": "IndexedDB"}]}});
        MFConfigurationService.setValue('selectedDatabase', 'IndexedDB');
        MFConfigurationService.setValue('dalPlatform', "chrome");
        MFConfigurationService.setValue('dalPlatformType','browser');
        MFConfigurationService.setValue('dalDatabaseType', 'NoSql');
        // Set log level
        console.setLogLevel('VERBOSE');
        
        // Block calls to MFInitScheduler.notify
        spyOn(MFInitScheduler, 'notify');
                
        MFDatabaseTypeSelector.isNoSQL = function() { return true; };
        
        done();
      });
  });

  /** Prepare database : Delete it before each test **/
  beforeEach(function(done) {
      var delRequest = indexedDB.deleteDatabase(dbName);
      
      delRequest.onsuccess = function( event ){
        // Check database is deleted
        var request = indexedDB.open(dbName, 1);
        request.onupgradeneeded = function (event) {
          // Database was not present.
          // abort transaction
          event.target.transaction.abort(); // This should call onerror
        };
        //callback error db
        request.onerror = function (event) {
          // We leave here as aborting the transaction will lead here.
          done();
        };
        //callback success db
        request.onsuccess = function (event) {
            fail(event.target.webkitErrorMessage || event.target.errorCode);
        };      
        request.onblocked = function (event) {
            console.log('BLOCKED');
            done();
        };       
      };
      
      delRequest.onerror = function(event){
        fail('Couldn\'t delete ' + dbName);
      };
    });
    
  
  /**** Prepare HTTP Responses *****/
  beforeEach(function() {
    jasmine.getJSONFixtures().fixturesPath = 'base/test/unit/data/nosql/myexpense';
    $httpBackend.whenGET('base/test/unit/data/nosql/myexpense/myexpense-data-model.json').respond(getJSONFixture('myexpense-data-model.json'));
    $httpBackend.whenGET('assets/data/nosql/create_userdata.json').respond(getJSONFixture('myexpense-data.json'));
  });
    
  /**** Load data before each test */
  beforeEach(function(done) {    
    inject(function(MFDalIndexedDB, MFSystem, MFDaoNoSqlAbstract, MFContextFactory, CustomerDaoNoSql, MFInitFillInUserTables) {
      var context = MFContextFactory.createInstance();
      // Expect a GET call
      $httpBackend.expectGET('base/test/unit/data/nosql/myexpense/myexpense-data-model.json');
      
      // Load data and create DB 
      MFSystem.getAssets(['base/test/unit/data/nosql/myexpense/myexpense-data-model.json'], false).then(
        function(createStoresScripts) {
          MFDalIndexedDB.initDatabase(createStoresScripts).then(
          function(db) {
              MFInitFillInUserTables.runTaskNoSql(context, true);
              
              // Resolve promises and http requests
              $rootScope.$apply();
              $httpBackend.flush(); 
              done();
            });
          });
          
        // Resolve promises and http requests 
        $httpBackend.flush();
        $rootScope.$apply();
      });
  });
  
  
  /***** Unit test *****/
  it('should get a record by its ID (no cascade)', function(done) {
    inject(function(MFContextFactory, MFDalIndexedDB, MFSystem, CustomerDaoNoSql, MFDalNoSqlProxy) {  
      tx = MFDalNoSqlProxy.openTransaction();
      var context = MFContextFactory.createInstance();
      context.dbTransaction = tx;
      
      CustomerDaoNoSql._getRecordById(3,context,[]).then(function(entity) {
        expect(entity).not.toBeNull();
        if (entity) { // 
          expect(entity.name).toEqual('Sed Dolor Fusce Associates');
          expect(entity.reports).toBeUndefined();
        }
        
        done();
      });
      
      // Resolve promises and http requests 
      $rootScope.$apply();
    });
  });
  
  it('should get a record by its ID (cascade)', function(done) {
    inject(function(MFContextFactory, MFDalIndexedDB, MFSystem, CustomerDaoNoSql, MFDalNoSqlProxy) {
      tx = MFDalNoSqlProxy.openTransaction();
      var context = MFContextFactory.createInstance();
      context.dbTransaction = tx;
      
      CustomerDaoNoSql._getRecordById(3,context,[]).then(function(entity) {
        expect(entity).not.toBeNull();
        if (entity) { // 
          expect(entity.name).toEqual('Sed Dolor Fusce Associates');
          expect(entity.reports).toBeUndefined();
        }
        
        done();
      });
      
      // Resolve promises and http requests 
      $rootScope.$apply();
    });
  });
  
  
  afterEach(function(done) {
    inject(function(MFDalIndexedDBTransaction) {
      waitUntil(function() { console.error(MFDalIndexedDBTransaction.startedTransactions.length);return MFDalIndexedDBTransaction.startedTransactions.length ===0; }).then(function() {done();});
    });
  });
});