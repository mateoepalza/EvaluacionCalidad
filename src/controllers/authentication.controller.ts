import { UserDAO } from '../DAO/user.DAO';
import utils from '../lib/utils';
import util from '../lib/utils';
import { User } from '../models/user';
export default class AuthenticationController {

    constructor() { }

    // TODO
    static async loginUser(req, res, next) {

        try{

            // get the info from the request body
            const { email, password } = req.body;

            // check if the data exists
            if(!email || ! password){
                res.status(400).json({
                    success: false,
                    msg: 'The email and password are invalid',
                    data: []
                });
            }
            
            const resUser = await UserDAO.loginUser(email);
            
            const { error } = resUser;
            if(error){
                return res.status(400).json({
                    success: false,
                    msg: error.message,
                    data: []
                })
            }

            console.log(resUser);
            // check if the password is correco
            if(utils.validatePass(password, resUser.hash, resUser.salt)){
                
                // generate JWT
                const { token, expires} = utils.generateJWT(resUser);

                res.json({
                    success: true,
                    msg: `¡Bienvenido!`,
                    data: {
                        token: token,
                        expiresIn: expires
                    }
                })
            } else {
                res.json({
                    success: false,
                    msg: 'El usuario o la contraseña no son validos',
                    data: []
                });
            }

        }catch(e){
            console.error(e);
            res.status(400).json(e);
        }
    }

    //TODO
    static async registerUser(req, res, next) {
        try {
            // get info from the body of the request
            const { email, password } = req.body;

            // check if the data exists
            if (!email || !password) {
                res.status(400).json({
                    success: false,
                    msg: 'The email or password is invalid'
                });
            }

            // Generate the hashed password and the salt of that password
            const { hash, salt } = util.generatePass(password);

            // We create our user
            const userObj: User = {
                email: email,
                salt: salt,
                hash: hash
            }

            // Register the user
            const result = await UserDAO.registerUser(userObj);

            const { error } = result;
            if (error) {
                return res.status(400).json({
                    success: false,
                    msg: error.message,
                    data: []
                });
            }

            // generate the token with the expiration
            /** THIS IS IN CASE WE WANT TO LOGIN RIGHT AWAY
             * const { token, expires } = utils.generateJWT(result.insetedId);
            res.json({
                success: true,
                msg: '',
                token: token,
                expiresIn: expires
            })*/
            res.json({
               success: true,
               msg: 'El registro fue exitoso',
               data: []
            })
        } catch (e) {
            //TODO throw error and handle it with a middleware
            console.log(e);
            res.status(400).json(e)
        }

    }
}