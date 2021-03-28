import { config } from "dotenv/types";
import { Router } from "express";
import  AuthenticationController  from '../controllers/authentication.controller';

class Auth {
    router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    config() {
        // Login 
        this.router.post('/login', AuthenticationController.loginUser);
        // Register users
        this.router.post('/register', AuthenticationController.registerUser);
    }
}

const auth = new Auth();
export default auth.router;