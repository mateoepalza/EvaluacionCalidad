import statisticController from '../controllers/statistics.controller';
import { Router } from "express";

class Statistics {

    router: Router

    constructor() {
        this.router = Router();
        this.config();
    }

    config() {
        /**
         *  Get all the stats 
         */
        this.router.get('/', statisticController.getStatistics);

        /**
         * Get one stat
         */
        this.router.get('/:id', statisticController.getStatistic);

        /**
         *  Create a stat 
         */
        this.router.post('/:id', statisticController.createStatistic);
        /**
         * 
         */
        this.router.put('/:id', statisticController.updateStatistic);
        /**
         * 
         */
        this.router.delete('/:id', statisticController.deleteStatistic);
    }
}

const objE = new Statistics();
export default objE.router;