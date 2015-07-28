angular.module('mfcore', ['ng', 'pascalprecht.translate', 'angular-loading-bar']).config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
}]);

