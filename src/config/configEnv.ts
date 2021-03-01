import dotenv from 'dotenv';


class GlobalEnv{

    port: string;
    database: string;

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
         * Database
         */
        this.database= process.env.URI;
    }

}

const globalEnv = new GlobalEnv();
export default globalEnv;