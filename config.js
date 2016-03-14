module.exports = {

    'YELP_CONSUMER_KEY': process.env.YELP_CONSUMER_KEY,
    'YELP_CONSUMER_SECRET': process.env.YELP_CONSUMER_SECRET,
    'YELP_TOKEN': process.env.YELP_TOKEN,
    'YELP_TOKEN_SECRET': process.env.YELP_TOKEN_SECRET,
    'database': process.env.MONGOLAB_URI || 'mongodb://whatsapptonight:whatsapptonight@127.0.0.1:27017/whatsapptonight'
    
};