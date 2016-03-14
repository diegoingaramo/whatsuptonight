/* Main controller definition */

function AppController($scope, searchService, authenticationService) {
    
  var self = this;
    
  $scope.locationText = "";
  $scope.locations = [];
    
  $scope.init = function() {
      authenticationService.init();
  }
    
  $scope.searchLocations = function() {
      $scope.goingHit();
      /*searchService.searchLocation($scope.locationText).then(function(result) {
            if (result.data.success){
                $scope.locations = result.data.locations;            
            }            
        }, function(reason) {
             bootbox.alert("Error: " + reason);
        });*/
  };
    
  $scope.searchLocationsKeyPress = function(keyEvent){
      if (keyEvent.which === 13)
          $scope.searchLocations();
  };
    
  
  $scope.goingHit = function() {
     if (!authenticationService.isAuthed()){
           authenticationService.login();     
     }
  };
    
  $scope.init();
    
};

/* End main controller definition */

var app = angular.module('mainModule', []).controller('AppController', ['$scope','searchService','authenticationService', AppController]);


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