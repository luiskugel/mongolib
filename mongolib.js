const MongoClient = require('mongodb').MongoClient
module.exports.deleteDocument =  function(config, query, callback){
    MongoClient.connect(config.url, {useUnifiedTopology: true}, function(err, db) {
      if (err) console.log(err)
      var dbo = db.db(config.dbName);
      dbo.collection(config.dbCollection).deleteOne(query, function(err, obj) {
        if (err) console.log(err)
        db.close();
        if(callback != undefined){
          if (err){
            callback(false, err)
          }else{
            callback(true)
          }
        }
        //console.log("1 document deleted");
      });
    });
  }
  
module.exports.insertDocument =  function(config, obj, callback){
  MongoClient.connect(config.url, {useUnifiedTopology: true}, function(err, db) {
    if (err) console.log(err)
    var dbo = db.db(config.dbName);
    dbo.collection(config.dbCollection).insertOne(obj, function(err, res) {
      if (err) throw err
      db.close();
      if(callback != undefined){
        if (err){
          callback(false, err)
        }else{
          callback(true)
        }
      }
      //console.log("1 document inserted");
    });
  });
}

module.exports.getDocument =  function(config, query, callback, field_selector={}){
  MongoClient.connect(config.url, {useUnifiedTopology: true}, function(err, db) {
    if (err) console.log(err)
    var dbo = db.db(config.dbName);
    dbo.collection(config.dbCollection).find(query).project(field_selector).toArray(function(err, result) {
      if (err) console.log(err)
      //console.log(result);
      db.close();
      callback(result)
    });
  });
}

module.exports.updateDocument =  function(config, query, updatedValues, callback){
  MongoClient.connect(config.url, {useUnifiedTopology: true}, function(err, db) {
    if (err) console.log(err)
    var dbo = db.db(config.dbName);
    dbo.collection(config.dbCollection).updateOne(query, updatedValues, function(err, res) {
      if (err) console.log(err)
      db.close();
      if(callback != undefined){
        if (err){
          callback(false, err)
        }else{
          callback(true)
        }
      }
      //console.log("1 document updated");
    });
  });
}
