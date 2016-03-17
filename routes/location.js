var express = require('express');

/* location yelp service */
var location_service = require('../service/yelp_service.js');

var Location = require('../model/location'); // get our mongoose model



var router = express.Router();

/* POST locations list. */
router.post('/search', function(req, res) {
    
    var locationText = req.body.locationText;
    
    location_service.search({ term: 'food', location: locationText })
        .then(function (data) {
            
            var counter = 0;
            
            data.businesses.forEach(function(element, index, array){
                
                Location.findOne({locID: element.id}, function(err, location) {
                    
                    counter++;

                    if (err) throw err;

                    if (!location)
                        element.going = 0;
                    else
                        element.going = location.going.length;
                    
                    //return json result when it gets the last array element
                    
                    if (array.length == counter)
                        return res
                            .status(200)
                            .send({success: true, locations: data.businesses});
                    
                });
                
            });
        
    })
    .catch(function (err) {
        
            if (err) throw err;
        
            return res
                        .status(200)
                        .send({success: false});
        
    });
    
});


/* POST locations list. */
router.post('/hit', function(req, res) {
    
    var locID= req.body.locID;
    var alias = req.body.alias;
    
    Location.findOne({locID: locID}, function(err, location) {
        
        if (err) throw err;
        
        if (!location){
            location = new Location({locID: locID, going: []});
        }
        
        if (location.going.indexOf(alias) == -1){
            location.going.push(alias);
        }else{
            location.going.splice(location.going.indexOf(alias), 1);
        }
        
        location.save(function (err) {
            if (err) return res
                   .status(200)
                   .send({success: false, message: "Cannot save location"});
            return res
                   .status(200)
                   .send({success: true, location: {id: locID, going: location.going.length}});
        });
        
    });
    
});

module.exports = router