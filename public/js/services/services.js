/* Search Service */

var searchService = function($http) {
    
  var self = this;
    
  self.searchLocation = function(locationText) {
      return $http.post('location/search', {
          locationText: locationText
      });
  };
    
};

/* End Search Service */


var authenticationService = function($window) {
    
  var self = this;
    
  self.init = function(){
      OAuth.initialize('CwgeJO-j28bHeThunMwNKDYi6C4');
  };
    
  self.login = function() {
      OAuth.popup('twitter').done(function(result) {
        console.log(result);
        result.me().done(function(data) {
            //console.log(data);
            $window.localStorage.setItem('user',JSON.stringify({alias: data.alias}));
        });
      }).fail(function (error) {
            console.error('error: ', error);
      });
  };
    
  self.isAuthed = function() {
      return $window.localStorage.getItem('user');
  };
    
  self.currentUser = function() {
    if ($window.localStorage.getItem('user'))
      return JSON.parse($window.localStorage.getItem('user'));
    else
      return {};
  };
    
};



app.service('searchService', searchService);
app.service('authenticationService', authenticationService);