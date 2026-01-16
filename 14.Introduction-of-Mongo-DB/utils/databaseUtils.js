const mongo = require("mongodb");

const MongoClient = mongo.MongoClient;

const MONGO_URL =
  "mongodb+srv://root:root@cluster0.mmtvrxq.mongodb.net/?appName=Cluster0";

let _db;

const mongoConnect = (cb) => {
  MongoClient.connect(MONGO_URL)
    .then((client) => {
      cb();
      _db = client.db("airbnb");
    })
    .catch((err) => {
      console.log('MongoDB Connection Failed');
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  } else {
    throw "No database found!";
  }
};

module.exports = { mongoConnect, getDb };
