// Provider for Mongodb source code

var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;
var assert = require('assert');

var CONNECTION_STRING = 'mongodb://localhost:27017/' + 'node-bwch';

Driver = function () {
    MongoClient.connect(CONNECTION_STRING, function (err, db) {
        assert.equal(null, err);
        assert.ok(db != null);
        Driver.db = db;
        console.log('Connected to MongoDB');
        initDb(Driver.db);
    });

}

var collections = [
    {'collectionName':'htypes',       'fieldName':'name'},
    {'collectionName':'providers',    'fieldName':'provider'},
    {'collectionName':'plans',        'fieldName': {'provider':1, 'planname':1}},
    {'collectionName':'features',     'fieldName': {'htype':1, 'name':1}},
    {'collectionName':'reviews',      'fieldName': null},
    {'collectionName':'banners',      'fieldName': null},
    {'collectionName':'users',        'fieldName':'login'}
];

initDb = function (db) {

    for (var i=0; i < collections.length; i++ ) {
        console.log("Array" + collections.length+ ' i '+ i);

        initDbCollection(db, collections[i].collectionName, collections[i].fieldName);
    }
}

initDbCollection = function (db, collectionName, fieldName) {
    db.collection(collectionName, {w:1, fsync:true, wtimeout:1000, strict: true }, function (err, collection) {
        if (err) {
            console.log('Collection ' + collectionName + ' does not exist, attempt to create');
            db.createCollection(collectionName, {w:1, fsync:true, wtimeout:1000}, function (error, collection) {
                assert.equal(null, error);
                assert.ok(collection != null);
                console.log(collectionName +" collection created");
                if (fieldName != null) {
                    collection.ensureIndex(fieldName, {unique:true}, function(err, indexName) {
                        assert.equal(null, err);
                        console.log('Index ' + fieldName + ' exists');
                    });
                }
            });
        } else {
            if (fieldName != null) {
                collection.ensureIndex(fieldName, {unique:true}, function(err, indexName) {
                    assert.equal(null, err);
                    console.log('Index ' + fieldName + ' exists');
                });
            }
        }
    });
}


Driver.prototype.getCollection = function (name, callback) {
    console.log('get Collection ' + name +' ' + Driver.db.databaseName);

    Driver.db.collection(name, { strict: true }, function (err, collection) {    // error if collection doesn't exist
        if (err) {
            console.log('Cannot find collection, attempt to create: ' + err);
            Driver.db.createCollection(name, function (error, collection) {
                if (error) {
                    console.log('Cannot create collection' + error);
                    callback(error);
                }
                Driver.db.collection(name, { strict: true }, function (error, collection) {
                    if (error) {
                        console.log('Cannot find collection, error: ' + error);
                        callback(error);
                    }
                    else
                        callback(null, collection);
                });

            });
        } else {
            callback(null, collection);
        }
   });

};


Driver.prototype.getDocs = function (collection_name, query, callback) {
    console.log("Call getDocs");
    this.getCollection(collection_name, function (error, collection) {
        if (error) callback(error)
        else {
            collection.find(query).toArray(function (error, results) {
                if (error) callback(error)
                else callback(null, results)
            });
        }
    });
};

Driver.prototype.getDocsSorted = function (collection_name, query, sort_by, callback) {
    console.log("Call getDocs with options");
    this.getCollection(collection_name, function (error, collection) {
        if (error) callback(error)
        else {
            collection.find(query, { sort: sort_by }).toArray(function (error, results) {
                if (error) callback(error)
                else callback(null, results)
            });
        }
    });
};

Driver.prototype.getRecentNDocs = function (collection_name, query, n, callback) {
    this.getCollection(collection_name, function (error, collection) {
        if (error) callback(error)
        else {
            collection.find(query, { limit: n }).sort({ time: -1 }).toArray(function (error, results) {
                if (error) callback(error)
                else callback(null, results)
            });
        }
    });
};

Driver.prototype.saveDocs = function (collection_name, docs, callback) {
    this.getCollection(collection_name, function (error, docs_collection) {
        if (error) callback(error)
        else {
            if (typeof (docs.length) == "undefined")
                docs = [docs];

            console.log('saveDocs length : ' + docs.length + ' in collection ' + collection_name);
            console.log('saveDocs insert');

            docs_collection.insert(docs, function () {
                callback(null, docs);
            });
        }
    });
};

Driver.prototype.saveOneDoc = function (collection_name, selector, doc, callback) {

    if (typeof (doc.length) != "undefined") {
        console.log("Error: can save only one doc");
        callback("Error: can save only one doc");
    } else {
        this.getCollection(collection_name, function (error, doc_collection) {
            if (error) callback(error)
            else {

                console.log('saveOneDoc in collection ' + collection_name);

                if (selector == null) {
                    if (doc._id == null)
                        selector = {_id: new ObjectID().valueOf()};
                    else
                        selector = {_id: doc._id};
                }

                doc_collection.update(selector, doc, {upsert:true, w: 1}, function (err, results) {
                    if (err) {
                        console.log(err);
                        callback(err);
                    } else
                        callback(null, results);
                });
            }
        });
    }
};

Driver.prototype.removeDoc = function (collection_name, selector, callback) {
    this.getCollection(collection_name, function (error, doc_collection) {
        if (error)  {
            console.log("cannot get collection "+ collection_name);
            callback(error);
        } else {
            console.log("removeDoc in collection " + collection_name);
            doc_collection.remove(selector, {w:1}, function(err, numberOfRemoveDocs) {
                if (err) {
                    console.log("cannot remove doc " + err);
                    callback(err);
                } else
                    callback(numberOfRemoveDocs);
            })
        }
    })
}


Driver.prototype.searchNewFeatures = function (names, callback) {
    this.getCollection('features', function (error, features_collection) {
        if (error) callback(error)
        else {

                console.log('search new features : ' + names.length);
                for (var i = 0; i < names.length; i++) {
                    console.log('feature[' + i + '] ' + names[i]);
                }

                features_collection.find({}, { "name": true, "_id": false }).toArray(function (error, existing_features) {
                    if (error) {
                        callback(error);
                    } else {
                        if (existing_features.length == 0)
                            callback(null, names);
                        else {
                            var docs = []; var k = 0;
                            top:
                            for (var i = 0; i < names.length; i++) {
                                for (var j = 0; j < existing_features.length; j++) {
                                    if (names[i] == existing_features[j]) 
                                        continue top; 
                                }
                                docs[k] = names[i]; k++;
                            }
                            callback(null, docs);
                        }
                   }
            });
        }
    });
};


exports.Driver = Driver;


