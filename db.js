const MongoClient = require('mongodb').MongoClient;
const dbname = "datasetForCodefundo";
const url = "mongodb+srv://ssahillppatell:Sahil123@datasetforcodefundo-mto6g.azure.mongodb.net/test?retryWrites=true&w=majority";
const mongoOptions = { useNewUrlParser : true , useUnifiedTopology: true };

const state = {
    db : null
};

const connect = (cb) => {
    if(state.db)
        cb();
    else {
        MongoClient.connect(url, mongoOptions, (err, client) => {
            if(err)
                cb(err);
            else {
                state.db = client.db(dbname);
                cb();
            }
        });
    }
}

const getDb = () => {
    return state.db;
}

module.exports = {getDb, connect};