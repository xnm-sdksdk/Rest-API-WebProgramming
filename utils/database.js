const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let db;

let uri = "mongodb+srv://40210260:12345@cluster0.u9z6ifo.mongodb.net/?retryWrites=true&w=majority";

const mongoConnect = (callback) => {
  MongoClient.connect(uri)
    .then((client) => {
      console.log("Connected!");
      db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (db) {
    return db.get();
  }
  throw "No Database Found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
