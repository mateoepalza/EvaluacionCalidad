const MongoClient = require('mongodb').MongoClient;
/**
 * import ENV
    * https://cloud.mongodb.com/v2/603c671f7a542d0dcc4e44e2#security/network/accessList
    * https://www.digitalocean.com/community/tutorials/nodejs-getting-started-morgan
    * https://developer.mozilla.org/es/docs/Web/HTTP/CORS
    * https://www.digitalocean.com/community/tutorials/setting-up-a-node-project-with-typescript-es
    * https://stackoverflow.com/questions/8503559/what-is-linting
    * https://stackoverflow.com/questions/11321635/nodejs-express-what-is-app-use
    * https://www.youtube.com/watch?v=ayNI9Q84v8g
 */
import globalEnv from '../config/configEnv';

export class Database{
    
    uri: string;
    client: any;

    constructor(){
        this.uri = globalEnv.database;
        this.client = new MongoClient(this.uri, {useNewUrlParser: true, useUnifiedTopology: true});
        this.connect();
    }
    
    async connect(){
        try {
            await this.client.connect();
            console.log("Connected to DB");
        } catch (error) {
            console.error(error);   
        }

    }
    async close(){
        await this.client.close();
    }
}

const db = new Database();
/**
 * Export client
 */
export default db.client;
