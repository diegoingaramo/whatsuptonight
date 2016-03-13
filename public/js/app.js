/* Main controller definition */

function AppController($scope, searchService) {
    
  $scope.locationText = "";
  $scope.locations = [];
    
  OAuth.initialize('CwgeJO-j28bHeThunMwNKDYi6C4');
    
  $scope.searchLocations = function() {
      searchService.searchLocation($scope.locationText).then(function(result) {
            if (result.data.success){
                $scope.locations = result.data.locations;            
            }            
        }, function(reason) {
             bootbox.alert("Error: " + reason);
        });
  };
    
  
  $scope.goingHit = function() {
      OAuth.popup('twitter').done(function(result) {
        console.log(result);
        result.me().done(function(data) {
            console.log(data);
        });
      }).fail(function (error) {
            console.error('error: ', error);
      });
      
  };
    
};

/* End main controller definition */

var app = angular.module('mainModule', []).controller('AppController', ['$scope','searchService', AppController]);


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