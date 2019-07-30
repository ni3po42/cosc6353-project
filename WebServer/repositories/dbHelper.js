import config from "../db-config.js";
const {MongoClient, format } = require('mongodb')

function getUri(){
    const user = encodeURIComponent(config.UserName);
    const password = encodeURIComponent(config.Password);
    const authMechanism = 'DEFAULT';
    
    // Connection URL
    var url = format('mongodb://%s:%s@%s:%s/%s?authMechanism=%s',
    user, password, config.Host, String(config.Port), config.Name, authMechanism);
    return url;
}

function OpenDb(){
    const uri = getUri();
    
    return new Promise((resolve, reject)=>{
        
        MongoClient.connect(uri, function(err, db) {
            if (err){
                db.close();
                reject(err);
                return;
            }
            resolve(db);
        });
    });
}

module.exports = { OpenDb };
