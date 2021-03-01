const MongoClient = require('mongodb').MongoClient;
/**
 * import ENV
* https://cloud.mongodb.com/v2/603c671f7a542d0dcc4e44e2#security/network/accessList
 */
import globalEnv from '../config/configEnv';

class Database{
    
    uri: string;
    client: any;

    constructor(){
        this.uri = globalEnv.database;
        this.client = new MongoClient(this.uri, {useNewUrlParser: true, useUnifiedTopology: true});
        this.connect();
    }
    
    connect(){
        this.client.connect(err =>{
            const collections = this.client.db("test").collection("devices");
            this.client.close();
        });
    }
}

const db = new Database();
/**
 * Export client
 */
export default db.client;
