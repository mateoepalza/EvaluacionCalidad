import { Router } from "express";
import  areasController  from "../controllers/area.controller";

class Area {

    router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    config() {
        /**
         * Obtain all areas
         */
        this.router.get('/', areasController.getAreas);
        /**
         * obtain one area
         */
        this.router.get('/:id', areasController.getArea);
    }
}

const areas = new Area();

export default areas.router;