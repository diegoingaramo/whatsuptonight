/* Main controller definition */

function AppController($scope) {
    
  $scope.locationText = "";
    
  $scope.searchLocations = function() {

  };
    
};

/* End main controller definition */

var app = angular.module('mainModule', []).controller('AppController', ['$scope', AppController]);


app.config(function($httpProvider){
  $httpProvider.interceptors.push(function($q) {
    return {
     'request': function(config) {
         $('#dvLoading').show();
         return config;
      },

      'response': function(response) {
         $('#dvLoading').hide();
         return response;
      }
    };
  });
});