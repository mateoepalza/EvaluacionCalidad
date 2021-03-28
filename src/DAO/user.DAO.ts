import { User } from "../models/user";
import config from '../config/configEnv';

let user;
export class UserDAO {
    static async injectDB(conn) {
        if (user) {
            return;
        }

        try {
            user = await conn.db(config.db).collection('users');
        } catch (e) {
            console.error(`Enable to stablish the connection with the user handle ${e}`);
        }
    }

    static async registerUser(userObj: User) {
        try {
            // we search for the user
            const cursor = await user.find({
                "email": userObj.email
            });

            // get the results
            const resUsers = await cursor.toArray();
            
            // We check if the user already exists
            if(resUsers.length > 0){
                throw new Error("El email sumistrado ya tiene cuenta con nosotros");
            }
            
            // we save the user
            const response = await user.insertOne(userObj);
            
            // we check if the user was saved
            if(response.insertedCount != 1){
                throw new Error("No ha sido posible insertar dicho usuario");
            }

            return response;

        } catch (e) {
            console.error(e);
            return { error: e };
        }
    }
    
    static async loginUser(email: string){
        try{
            const cursor  = await  user.find({
                "email": email
            });

            const resUser = await cursor.toArray();
            if(resUser.length != 1){
                throw new Error("Existen dos o más usuarios con el mismo correo");
            }
            
            return resUser[0];

        }catch(e){
            console.error(e);
            return { error : e };
        }
    }
}