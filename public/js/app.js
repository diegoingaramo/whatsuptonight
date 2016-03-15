/* Main controller definition */

function AppController($scope, searchService, authenticationService,locationService) {
    
  var self = this;
    
  $scope.locationText = "";
  $scope.locations = [];
    
  $scope.init = function() {
      authenticationService.init();
  }
    
  $scope.searchLocations = function() {
      searchService.searchLocation($scope.locationText).then(function(result) {
            if (result.data.success){
                $scope.locations = result.data.locations;
            }            
        }, function(reason) {
             bootbox.alert("Error: " + reason);
        });
  };
    
  $scope.searchLocationsKeyPress = function(keyEvent){
      if (keyEvent.which === 13)
          $scope.searchLocations();
  };
    
  
  $scope.goingHit = function(location) {
      authenticationService.login().then(function(){
          locationService.goingHit(location.id,authenticationService.currentUser.alias).then(function(result) {
            if (result.data.success){
                location.going = result.data.location.going;
            }            
        }, function(reason) {
             bootbox.alert("Error: " + reason);
        });
      });     
  };
    
  $scope.init();
    
};

/* End main controller definition */

var app = angular.module('mainModule', []).controller('AppController', ['$scope','searchService','authenticationService','locationService', AppController]);


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