const url = 'mongodb://readonly:turner@ds043348.mongolab.com:43348/dev-challenge';
const mongoClient = require('mongodb').MongoClient;

module.exports = async (app) => {
    const db = await mongoClient.connect(url).catch(console.error);

    app.get('/api/search', function(req, res){
        const regexQuery = new RegExp(req.query.q, 'i');
        console.log('Received Search for ', req.query.q);
        db.collection('Titles')
            .find({ "TitleName" : regexQuery })
            .toArray()
            .then((matches) => {
                console.log(`${matches.length} matches found: `);
                matches.forEach((item)=>{ console.log(item.TitleName) });
                res.send(matches);
            });
    });
};