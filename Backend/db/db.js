const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const url = "mongodb://testuser:9eVH8YT0rVZ0X1uj@cluster0-shard-00-00.ecaql.mongodb.net:27017,cluster0-shard-00-01.ecaql.mongodb.net:27017,cluster0-shard-00-02.ecaql.mongodb.net:27017/BLOGAPP?ssl=true&replicaSet=atlas-ceza4t-shard-0&authSource=admin&retryWrites=true&w=majority"
// Connect MongoDB at default port 27017.
let mong = mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});