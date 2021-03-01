import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';

/**
 * 
 */
import employee from './routes/employee';
import config from './config/configEnv';

class Server{
    
    app: Application;

    constructor(){
        this. app = express();
        this.config();
        this.routes();
    }
    
    config():void{
        /**
         * Initialize the express on the port 
         */
        this.app.set('port', config.port || 4000);
        /**
         * middlewares
         */
        this.app.use(morgan("dev"));
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes():void{
//        this.app.use('auth', auth);
        // Route of employees
        this.app.use('/employees', employee);
    }

    start(){
        this.app.listen(this.app.get('port', () =>{
            console.log(`Server on port ${this.app.get('port')}`);
        }))
    }
}