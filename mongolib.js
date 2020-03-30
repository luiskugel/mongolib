const MongoClient = require('mongodb').MongoClient
module.exports.deleteDocument =  function(config, query){
  return new Promise((resolve, reject) => {
    MongoClient.connect(config.url, {useUnifiedTopology: true}, function(err, db) {
      if (err) console.log(err)
      var dbo = db.db(config.dbName);
      dbo.collection(config.dbCollection).deleteOne(query, function(err, obj) {
        if (err) {
          console.log(err)
          reject(err)
        }else{
          resolve()
        }
        db.close();
      });
    });
    })
  }
  
module.exports.insertDocument =  function(config, obj){
  return new Promise((resolve, reject) => {
    MongoClient.connect(config.url, {useUnifiedTopology: true}, function(err, db) {
      if (err) console.log(err)
      var dbo = db.db(config.dbName);
      dbo.collection(config.dbCollection).insertOne(obj, function(err, res) {
        if (err) {
          console.log(err)
          reject(err)
        }else{
          resolve()
        }
        db.close(); 
      });
    });
  })
}

module.exports.getDocument =  function(config, query, field_selector={}){
  return new Promise((resolve, reject) => {
    MongoClient.connect(config.url, {useUnifiedTopology: true}, function(err, db) {
      if (err) console.log(err)
      var dbo = db.db(config.dbName);
      dbo.collection(config.dbCollection).find(query).project(field_selector).toArray(function(err, result) {
        if (err) {
          console.log(err)
          reject(err)
        } 
        db.close();
        resolve(result)
      });
    });
  })
}

module.exports.updateDocument =  function(config, query, updatedValues){
  return new Promise((resolve, reject) => {
    MongoClient.connect(config.url, {useUnifiedTopology: true}, function(err, db) {
      if (err) console.log(err)
      var dbo = db.db(config.dbName);
      dbo.collection(config.dbCollection).updateOne(query, updatedValues, function(err, res) {
        if (err) {
          console.log(err)
          reject(err)
        }else{
          resolve()
        }
        db.close();
      });
    });
  })
}

module.exports.insertManyDocuments =  function(config, array){
  return new Promise((resolve, reject) => {
    MongoClient.connect(config.url, {useUnifiedTopology: true}, function(err, db) {
      if (err) console.log(err)
      var dbo = db.db(config.dbName);
      dbo.collection(config.dbCollection).insertOne(array, function(err, res) {
        if (err) {
          console.log(err)
          reject(err)
        }else{
          resolve()
        }
        db.close(); 
      });
    });
  })
}
