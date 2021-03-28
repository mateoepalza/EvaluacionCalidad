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
         * Get all the stats by area
         */
        this.router.get('/all', statisticController.getStatisticByArea);
        /**
         *  Get all the stats 
         */
        this.router.get('/', statisticController.getStatistics);

        /**
         * Get one stat by area
         */
        this.router.get('/:id', statisticController.getSingleStatisticByArea);
        /**
         * Get one stat by employee
         */
        this.router.get('/:id/employee', statisticController.getStatisticByEmployee);
        /**
         *  Create a stat 
         */
        this.router.post('/:id', statisticController.createStatistic);
        /**
         *  TODO 
         */
        this.router.put('/:id', statisticController.updateStatistic);
        /**
         *  TODO 
         */
        this.router.delete('/:id', statisticController.deleteStatistic);
    }
}

const objE = new Statistics();
export default objE.router;