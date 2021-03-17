import express, { Application } from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import morgan from 'morgan';

/**
 * 
 */
import employee from './routes/employee';
import areas from './routes/areas';
import statistics from './routes/statistics';
import config from './config/configEnv';

import EmployeeDAO from './DAO/employee.DAO';
import StatisticsDAO from './DAO/statistics.DAO';

class Server {

    app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.dbConfig();
    }

    config(): void {
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
        /**
         * static files
         */
        this.app.use(express.static('static'));
    }

    routes(): void {
        //        this.app.use('auth', auth);
        // Route of employees
        this.app.use('/employees', employee);
        // Route of areas
        this.app.use('/areas', areas);
        // Route of statistics
        this.app.use('/statistics', statistics);
    }

    start() {
        this.app.listen(this.app.get('port') || 8000, () => {
            console.log(`Server on port ${this.app.get('port')}`);
        });
    }

    async dbConfig() {
        try {
            const db = await MongoClient.connect(config.database);

            await EmployeeDAO.injectDB(db);
            await StatisticsDAO.injectDB(db);

        } catch (e) {
            console.error(e.stack);
            process.exit(1);
        }
    }
}

const server = new Server();
server.start();