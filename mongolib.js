const MongoClient = require("mongodb").MongoClient;

class MongoLib {
  constructor(dbname, collection) {
    this.dbname = dbname;
    this.collection = collection;
    this.connected = false;
  }
  connect(url, callback) {
    MongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
      if (err) console.log(err);
      this.db = db;
      this.connected = true;
      callback(err);
    });
  }
  delete(query, dbname = this.dbname, collection = this.collection) {
    return new Promise((resolve, reject) => {
      if (!this.connected)
        reject(
          new Error(
            "Not connected to DB. You need to call .connect() on mongolib object!"
          )
        );
      _getCollectionObj(dbname, collection).deleteMany(
        query,
        function (err, obj) {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }
  insert(obj, dbname = this.dbname, collection = this.collection) {
    return new Promise((resolve, reject) => {
      if (!this.connected)
        reject(
          new Error(
            "Not connected to DB. You need to call .connect() on mongolib object!"
          )
        );
      this._getCollectionObj(dbname, collection).insertOne(
        obj,
        function (err, res) {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
  }
  get(
    query,
    field_selector = {},
    dbname = this.dbname,
    collection = this.collection
  ) {
    return new Promise((resolve, reject) => {
      if (!this.connected)
        reject(
          new Error(
            "Not connected to DB. You need to call .connect() on mongolib object!"
          )
        );
      this._getCollectionObj(dbname, collection)
        .find(query)
        .project(field_selector)
        .toArray(function (err, result) {
          if (err) {
            console.log(err);
            reject(err);
          }
          resolve(result);
        });
    });
  }
  update(
    query,
    updatedValues,
    dbname = this.dbname,
    collection = this.collection
  ) {
    return new Promise((resolve, reject) => {
      if (!this.connected)
        reject(
          new Error(
            "Not connected to DB. You need to call .connect() on mongolib object!"
          )
        );
      this._getCollectionObj(dbname, collection).updateMany(
        query,
        updatedValues,
        function (err, res) {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
  }
  _getCollectionObj(dbname, collection) {
    return this.db.db(dbname).collection(collection);
  }
  close() {
    this.db.close();
  }
}

module.exports.deleteDocument = function (config, query) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      config.url,
      { useUnifiedTopology: true },
      function (err, db) {
        if (err) console.log(err);
        var dbo = db.db(config.dbName);
        dbo
          .collection(config.dbCollection)
          .deleteOne(query, function (err, obj) {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              resolve();
            }
            db.close();
          });
      }
    );
  });
};

module.exports.insertDocument = function (config, obj) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      config.url,
      { useUnifiedTopology: true },
      function (err, db) {
        if (err) console.log(err);
        var dbo = db.db(config.dbName);
        dbo.collection(config.dbCollection).insertOne(obj, function (err, res) {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve();
          }
          db.close();
        });
      }
    );
  });
};

module.exports.getDocument = function (config, query, field_selector = {}) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      config.url,
      { useUnifiedTopology: true },
      function (err, db) {
        if (err) console.log(err);
        var dbo = db.db(config.dbName);
        dbo
          .collection(config.dbCollection)
          .find(query)
          .project(field_selector)
          .toArray(function (err, result) {
            if (err) {
              console.log(err);
              reject(err);
            }
            db.close();
            resolve(result);
          });
      }
    );
  });
};

module.exports.updateDocument = function (config, query, updatedValues) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      config.url,
      { useUnifiedTopology: true },
      function (err, db) {
        if (err) console.log(err);
        var dbo = db.db(config.dbName);
        dbo
          .collection(config.dbCollection)
          .updateOne(query, updatedValues, function (err, res) {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              resolve();
            }
            db.close();
          });
      }
    );
  });
};

module.exports.insertManyDocuments = function (config, array) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      config.url,
      { useUnifiedTopology: true },
      function (err, db) {
        if (err) console.log(err);
        var dbo = db.db(config.dbName);
        dbo
          .collection(config.dbCollection)
          .insertMany(array, function (err, res) {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              resolve();
            }
            db.close();
          });
      }
    );
  });
};

module.exports.MongoLib = MongoLib;
