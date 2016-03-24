'use strict';

describe('DAO-cascades-daotest.read.N--1.spec.js', function () {
  var dbName = 'DAO-cascades-daotest';
  var $q, $rootScope, $httpBackend;
  var tx;


  /** Inject angular dependencies */
  beforeEach(function (done) {
    module('data-daotest')

    inject(function (_$q_, _$rootScope_, _$httpBackend_) {
      $q = _$q_;
      $rootScope = _$rootScope_;
      $httpBackend = _$httpBackend_;
      done();
    });
  });

  /** Set MFCore configuration */
  beforeEach(function (done) {
    inject(function (MFConfigurationService, MFInitScheduler, MFDatabaseTypeSelector) {
      // Set db info
      MFConfigurationService.setValue('databaseConfig', { "name": dbName, "version": "1" });
      MFConfigurationService.setValue('dataBaseType', { "browser": { "chrome": [{ "comparator": ">=", "version": "23", "database": "IndexedDB" }] } });
      MFConfigurationService.setValue('selectedDatabase', 'IndexedDB');
      MFConfigurationService.setValue('dalPlatform', "chrome");
      MFConfigurationService.setValue('dalPlatformType', 'browser');
      MFConfigurationService.setValue('dalDatabaseType', 'NoSql');
      // Set log level
      console.setLogLevel('WARN');
        
      // Block calls to MFInitScheduler.notify
      spyOn(MFInitScheduler, 'notify');

      MFDatabaseTypeSelector.isNoSQL = function () { return true; };

      done();
    });
  });

  /** Prepare database : Delete it before each test **/
  beforeEach(function (done) {
    var delRequest = indexedDB.deleteDatabase(dbName);

    delRequest.onsuccess = function (event) {
      // Check database is deleted
      var request = indexedDB.open(dbName, 1);
      request.onupgradeneeded = function (event) {
        // Database was not present.
        // abort transaction
        event.target.transaction.abort(); // This should call onerror
      };
      //callback error db
      request.onblocked = function (event) {
        done();
      };
      //callback error db
      request.onerror = function (event) {
        done();
      };
      //callback success db
      request.onsuccess = function (event) {
        fail(event.target.webkitErrorMessage || event.target.errorCode);
      };
    };

    delRequest.onblocked = function (event) {
      // After 1st test we should pass here
      done();
    };

    delRequest.onerror = function (event) {
      fail('Couldn\'t delete ' + dbName);
    };
  });
    
  
  /**** Prepare HTTP Responses *****/
  beforeEach(function () {
    jasmine.getJSONFixtures().fixturesPath = 'base/test/unit/data/nosql/daotest';
    $httpBackend.whenGET('base/test/unit/data/nosql/daotest/daotest-data-model.json').respond(getJSONFixture('daotest-data-model.json'));
    $httpBackend.whenGET('assets/data/nosql/create_userdata.json').respond(getJSONFixture('daotest-data.json'));
  });
    
  /**** Load data before each test */
  beforeEach(function (done) {
    inject(function (MFDalIndexedDB, MFSystem, MFDaoNoSqlAbstract, MFContextFactory, AgenceDaoNoSql, MFInitFillInUserTables) {
      var context = MFContextFactory.createInstance();
      // Expect a GET call
      $httpBackend.expectGET('base/test/unit/data/nosql/daotest/daotest-data-model.json');
      
      // Load data and create DB 
      MFSystem.getAssets(['base/test/unit/data/nosql/daotest/daotest-data-model.json'], false).then(
        function (createStoresScripts) {
          MFDalIndexedDB.initDatabase(createStoresScripts).then(
            function (db) {
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
  // 1--N
  it('should get B (Relation: A 1--N B, Main: B). No cascade requested', function (done) {
     inject(function (MFContextFactory, EmployeeDaoNoSql, MFDalNoSqlProxy) {
      tx = MFDalNoSqlProxy.openTransaction();
      var context = MFContextFactory.createInstance();
      context.dbTransaction = tx;

      EmployeeDaoNoSql._getRecordById(3, context, []).then(function (entity) {
        expect(entity).not.toBeNull();
        if (entity) { // 
          expect(entity.lastName).toEqual('Lastname3');
          expect(entity.agence).toBeNull();
        }

        done();
      });
      
      // Resolve promises and http requests 
      $rootScope.$apply();
    });
  });

  it('should get A&B (Relation: A 1--N B, Main: B). Cascade: B.a', function (done) {
     inject(function (MFContextFactory, EmployeeDaoNoSql, EmployeeCascade, MFDalNoSqlProxy) {
      tx = MFDalNoSqlProxy.openTransaction();
      var context = MFContextFactory.createInstance();
      context.dbTransaction = tx;

      EmployeeDaoNoSql._getRecordById(3, context, [EmployeeCascade.AGENCE]).then(function (entity) {
        expect(entity).not.toBeNull();
        if (entity) { // 
          expect(entity.lastName).toEqual('Lastname3');
          expect(entity.agence).not.toBeNull();
          expect(entity.agence.nom).toEqual('Nom3');
        }
        
        done();
      });
      
      // Resolve promises and http requests 
      $rootScope.$apply();
    });
  });

  afterEach(function (done) {
    inject(function (MFDalIndexedDB, MFDalIndexedDBTransaction) {
      waitUntil(function () {
        return MFDalIndexedDBTransaction.startedTransactions.length === 0;
      }, 500).then(
        function () {
          MFDalIndexedDB.closeDatabase();
          done();
        }
        );
    });
  });
});