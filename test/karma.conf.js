module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    
    frameworks: ['jasmine'],
    
    basePath : '../',
    
    files: [
      'vendor/angular/angular.js',
      'vendor/angular-mocks/angular-mocks.js',
      'vendor/angular-loading-bar/build/loading-bar.js',
      'vendor/angular-translate/angular-translate.js',
      'vendor/angular-resource/angular-resource.js',
      'vendor/jquery/dist/jquery.js', 
      'vendor/jasmine-jquery/lib/jasmine-jquery.js',
      'vendor/modernizr/modernizr.js',
      'lib/mfcoreModule.js',
      'test/unit/data/nosql/myexpense/mappings/moduleImport.js',
      'test/unit/data/nosql/myexpense/factories/*.js',
      'test/unit/data/nosql/myexpense/mappings/*.js',
      'test/unit/data/nosql/myexpense/converters/*.js',
      'test/unit/data/nosql/myexpense/dao/*.js',
      'lib/**/*.js',
      'test/**/*.spec.js',
      'test/unit/tools.js',
      // assets
      { pattern: 'test/unit/data/**/*.json', included: false, served: true },
    ],

    plugins : [
            'karma-chrome-launcher',
            'karma-jasmine'
            ]
 
  });
};