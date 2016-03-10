var express = require('express');

/* location yelp service */
var location_service = require('../service/yelp_service.js');

var router = express.Router();

/* POST locations list. */
router.post('/search', function(req, res) {
    
    var locationText = req.body.locationText;
    
    location_service.search({ term: 'food', location: locationText })
        .then(function (data) {
            res
                .status(200)
                .send({success: true, locations: data.businesses});
    })
    .catch(function (err) {
        
            if (err) throw err;
        
    });
    
});

module.exports = router;
