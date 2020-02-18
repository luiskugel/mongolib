const MongoClient = require('mongodb').MongoClient
module.exports.deleteDocument =  function(config, query){
    MongoClient.connect(config.url, {useUnifiedTopology: true}, function(err, db) {
      if (err) throw err;
      var dbo = db.db(config.dbName);
      dbo.collection(config.dbCollection).deleteOne(query, function(err, obj) {
        if (err) throw err;
        //console.log("1 document deleted");
        db.close();
      });
    });
  }
  
module.exports.insertDocument =  function(config, obj){
  MongoClient.connect(config.url, {useUnifiedTopology: true}, function(err, db) {
    if (err) throw err;
    var dbo = db.db(config.dbName);
    dbo.collection(config.dbCollection).insertOne(obj, function(err, res) {
      if (err) throw err;
      //console.log("1 document inserted");
      db.close();
    });
  });
}

module.exports.getDocument =  function(config, query, callback, field_selector={}){
  MongoClient.connect(config.url, {useUnifiedTopology: true}, function(err, db) {
    if (err) throw err;
    var dbo = db.db(config.dbName);
    dbo.collection(config.dbCollection).find(query).select(field_selector).toArray(function(err, result) {
      if (err) throw err;
      //console.log(result);
      db.close();
      callback(result)
    });
  });
}

module.exports.updateDocument =  function(config, query, updatedValues){
  MongoClient.connect(config.url, {useUnifiedTopology: true}, function(err, db) {
    if (err) throw err;
    var dbo = db.db(config.dbName);
    dbo.collection(config.dbCollection).updateOne(query, updatedValues, function(err, res) {
      if (err) throw err;
      //console.log("1 document updated");
      db.close();
    });
  });
}
