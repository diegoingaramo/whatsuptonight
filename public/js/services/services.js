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

/* Authentication Service */

var authenticationService = function($window) {
    
  var self = this;
    
  self.init = function(){
      OAuth.initialize('CwgeJO-j28bHeThunMwNKDYi6C4');
  };
    
  self.login = function() {
    return new Promise(function(resolve, reject){
        if (!self.isAuthed()){
          OAuth.popup('twitter').done(function(result) {
            result.me().done(function(data) {
                $window.localStorage.setItem('user',JSON.stringify({alias: data.alias}));
                resolve();
            });
          }).fail(function (error) {
                console.error('error: ', error);
                reject();
          });
        }else {
            resolve();
        }
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

/* End Authentication Service */


/* Location Service */

var locationService = function($http) {
    
  var self = this;
    
  self.goingHit = function(locationID,alias) {
      return $http.post('location/hit', {
          locID: locationID,
          alias: alias
      });
  };
    
};

/* End Location Service */


app.service('searchService', searchService);
app.service('authenticationService', authenticationService);
app.service('locationService', locationService);
