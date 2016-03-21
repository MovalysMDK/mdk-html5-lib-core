'use strict';
xdescribe('MFDalIndexedDB', function() {
  var dbName = 'MFDalIndexedDB' ;
  var $q, $rootScope, $httpBackend;
    
   
  /** Prepare database : Delete it **/
  beforeAll(function(done) {
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
      };
      delRequest.onerror = function(event){
        fail('Couldn\'t delete ' + dbName);
      };
    });
  

  /** Inject angular dependencies */
  beforeEach(function() {
    module('data-myexpense');
    
    inject(function(_$q_, _$rootScope_, _$httpBackend_) {
      $q = _$q_;
      $rootScope = _$rootScope_;
      $httpBackend = _$httpBackend_;
    });
  });
  
  /** Set MFCore configuration */
  beforeEach(
    inject(function(MFConfigurationService, MFInitScheduler, MFDatabaseTypeSelector ) {
      // Set db info
      MFConfigurationService.setValue('databaseConfig', {"name":dbName, "version":"1"});
      MFConfigurationService.setValue('dataBaseType', {"browser": {"chrome": [{"comparator": ">=","version": "23","database": "IndexedDB"}]}});
      MFConfigurationService.setValue('selectedDatabase', 'IndexedDB');
      MFConfigurationService.setValue('dalPlatform', "chrome");
      MFConfigurationService.setValue('dalPlatformType','browser');
      MFConfigurationService.setValue('dalDatabaseType', 'NoSql');
      // Set log level
      console.setLogLevel('ERROR');
      
       // Block calls to MFInitScheduler.notify
       spyOn(MFInitScheduler, 'notify');
       
       MFDatabaseTypeSelector.isNoSQL = function() { return true; };
    }));
  
  /**** Prepare HTTP Responses *****/
  beforeEach(function() {
    jasmine.getJSONFixtures().fixturesPath = 'base/test/unit/data/nosql/myexpense';
    $httpBackend.whenGET('base/test/unit/data/nosql/myexpense/myexpense-data-model.json').respond(getJSONFixture('myexpense-data-model.json'));
    $httpBackend.whenGET('assets/data/nosql/create_userdata.json').respond(getJSONFixture('myexpense-data.json'));
  });
  
  /***** Unit test *****/
  it('should create stores from files', function(done) {
    inject(function(MFDalIndexedDB, MFSystem) {
      // Expect a GET call
      $httpBackend.expectGET('base/test/unit/data/nosql/myexpense/myexpense-data-model.json');
      
      // Load data and create DB 
      MFSystem.getAssets(['base/test/unit/data/nosql/myexpense/myexpense-data-model.json'], false).then(
        function(createStoresScripts) {
          MFDalIndexedDB.initDatabase(createStoresScripts).then(
          function(db) {
            // Open the DB              
              var transaction = db.transaction(['Expense','Customer','Report','ExpenseType']);
              expect(transaction.objectStore('Expense')).not.toBeNull();
              expect(transaction.objectStore('Customer')).not.toBeNull();
              expect(transaction.objectStore('Report')).not.toBeNull();
              expect(transaction.objectStore('ExpenseType')).not.toBeNull();
              expect(function(){transaction.objectStore('Dummy')}).toThrow();
              done();
          });
        });
        
        // Resolve promises and http requests 
        $httpBackend.flush();
        $rootScope.$apply();
    });
  });
  
  it('should add data in the stores', function(done) {
     inject(function(MFInitFillInUserTables, MFContextFactory, MFDalIndexedDB, MFInitTaskStatus) {
       var context = MFContextFactory.createInstance();
              
        MFDalIndexedDB.openDatabase().then(
          function(db) {
            MFInitFillInUserTables.runTaskNoSql(context, true);
            
            // Resolve promises and http requests
            $rootScope.$apply();
            $httpBackend.flush(); 
                         
            var transaction = db.transaction(['Expense','Customer','Report','ExpenseType']);
            var expenseCountRequest = transaction.objectStore('Expense').count();
            var customerCountRequest = transaction.objectStore('Customer').count();
            var reportCountRequest = transaction.objectStore('Report').count();
            var expenseTypeCountRequest = transaction.objectStore('ExpenseType').count();
            var checksDone = 0;
            
            expenseCountRequest.onsuccess = function() {
              expect(expenseCountRequest.result).toEqual(5);
              checksDone++;
              console.log()
            }
            customerCountRequest.onsuccess = function() {
              expect(customerCountRequest.result).toEqual(5);
              checksDone++;
            }
            reportCountRequest.onsuccess = function() {
              expect(reportCountRequest.result).toEqual(9);
              checksDone++;
            }
            expenseTypeCountRequest.onsuccess = function() {
              expect(expenseTypeCountRequest.result).toEqual(7);
              checksDone++;
            }

            // Wait for checks to be done
            waitUntil(function() { return checksDone===4; }).then(function() {done();});
          }
        );
     });
  });
});