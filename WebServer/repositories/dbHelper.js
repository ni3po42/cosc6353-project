const config = require("../db-config.js");
const { MongoClient, ObjectID } = require('mongodb');

function getUri(){
    const user = encodeURIComponent(config.UserName);
    const password = encodeURIComponent(config.Password);
    const authMechanism = 'DEFAULT';
    
    // Connection URL
    var url = `mongodb://${user}:${password}@${config.Host}:${config.Port}/${config.Name}?authMechanism=${authMechanism}`;
    return url;
}

function FindOne(query, options){
    const uri = getUri();
    
    return new Promise((resolve, reject)=>{
        
        MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, server) {
            if (err){
                server.close();
                reject(err);
                return;
            }
            
            const db = server.db(config.Name);
            
            const accounts = db.collection('accounts');
            accounts.findOne(query, options || {}, (err, result)=>{
                if (err) { 
                    server.close();
                    reject(err);
                    return;
                }
                server.close();
                resolve(result);
            });
            
        });
    });
}

function Insert(obj){
    const uri = getUri();
    
    return new Promise((resolve, reject)=>{
        
        MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, server) {
            if (err){
                server.close();
                reject(err);
                return;
            }
            
            const db = server.db(config.Name);
            const accounts = db.collection('accounts');
            accounts.insert(obj, (err, result)=>{
                if (err) { 
                    server.close();
                    reject(err);
                    return;
                }
                server.close();
                resolve(result);
            });
            
        });
    });
}

function Update(query, doc){
    const uri = getUri();
    
    return new Promise((resolve, reject)=>{
        
        MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, server) {
            if (err){
                server.close();
                reject(err);
                return;
            }
            
            const db = server.db(config.Name);
            const accounts = db.collection('accounts');
            
            accounts.updateOne(query, doc, (err, result)=>{
                if (err) { 
                    server.close();
                    reject(err);
                    return;
                }
                
                accounts.findOne(query, (err, account)=>{
                    if (err) { 
                        server.close();
                        reject(err);
                        return;
                    }
                    server.close();
                    resolve(account);
                });
                
            });
            
        });
    });
}

module.exports = { FindOne, Insert, Update, ObjectID };
