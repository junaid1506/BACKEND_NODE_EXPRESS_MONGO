const mongo = require("mongodb");

const MongoClient = mongo.MongoClient;

const MONGO_URL =
  "mongodb+srv://root:root@cluster0.mmtvrxq.mongodb.net/?appName=Cluster0";

const mongoConnect = (cb) => {
  MongoClient.connect(MONGO_URL)
    .then((client) => {
      cb(client);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { mongoConnect };
