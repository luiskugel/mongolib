# mongolib
This is a small library for mongoDB.

```js
 deleteDocument(config, query) => Promise( resolve(), reject(err) )
 
 insertDocument(config, obj) => Promise( resolve(), reject(err) )
  
 getDocument(config, query, field_selector={}) => Promise( resolve(result), reject(err) )
   
 updateDocument(config, query, updatedValues) => Promise( resolve(), reject(err) )
 
```
