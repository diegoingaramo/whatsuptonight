/* Search Service */

var searchService = function($http) {
    
  var self = this;
    
  self.searchLocation = function(locationText) {
      return $http.post('location/search', {
          locationText: locationText
      });
  };
    
  /*self.new = function(poll,email) {
      return $http.post('polls/new', {
          question: poll.question,
          options: poll.options,
          email: email
      });
  };
    
  self.vote = function(optionID,newOptionText,pollID) {
      return $http.post('polls/vote', {
          optionID: optionID,
          newOptionText: newOptionText,
          pollID: pollID
      });
  };
    
  self.remove = function(pollID,email) {
      return $http.post('polls/remove', {
          pollID: pollID,
          email: email
      });
  };    */
    
};


/* End Search Service */


app.service('searchService', searchService);