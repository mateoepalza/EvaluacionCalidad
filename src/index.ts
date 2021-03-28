import express, { Application, urlencoded } from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import morgan from 'morgan';

/**
 * https://express-validator.github.io/docs/
 * https://express-validator.github.io/docs/check-api.html
 * https://www.robinwieruch.de/node-express-server-rest-api
 * https://stackabuse.com/form-data-validation-in-nodejs-with-express-validator/
 */
import employee from './routes/employee';
import areas from './routes/areas';
import statistics from './routes/statistics';
import auth from './routes/auth';
import config from './config/configEnv';

import EmployeeDAO from './DAO/employee.DAO';
import StatisticsDAO from './DAO/statistics.DAO';
import AreaDAO from './DAO/area.DAO';
import { UserDAO } from './DAO/user.DAO';

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
        /**
         * we specify that the application should understand JSON and data that comes from the forms
         */
        this.app.use(express.json());
        this.app.use(urlencoded({extended: false}))
        /**
         * static files
         */
        this.app.use(express.static('static'));
    }

    routes(): void {
        // Route of employees
        this.app.use('/employees', employee);
        // Route of areas
        this.app.use('/areas', areas);
        // Route of statistics
        this.app.use('/statistics', statistics);
        // Route of authentication
        this.app.use('/auth', auth);
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
            await AreaDAO.injectDB(db);
            await UserDAO.injectDB(db);

        } catch (e) {
            console.error(e.stack);
            process.exit(1);
        }
    }
}

const server = new Server();
server.start();