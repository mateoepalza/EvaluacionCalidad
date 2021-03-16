import dotenv from 'dotenv';


class GlobalEnv{

    port: string;
    database: string;
    db: string;

    constructor(){
        dotenv.config();
        this.setVariables();
    }
    
    setVariables(){
        /**
         * PORT 
         */
        this.port = process.env.PORT;
        /**
         * URL
         */
        this.database= process.env.URI;
        /**
         * Collection
         */
        this.db = process.env.DB;
    }

}

const globalEnv = new GlobalEnv();
export default globalEnv;