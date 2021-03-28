import { verify, sign } from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

class Utils {

    priv_key: any;
    pub_key: any;

    constructor() {

        // public key path
        const pub_path = path.join(__dirname, '..', '..', 'distpub_key.pem');

        // load the public key
        this.pub_key = fs.readFileSync(pub_path, 'utf-8');

        // private key path
        const priv_path = path.join(__dirname, '..', '..', 'distpriv_key.pem');

        // load the private key
        this.priv_key = fs.readFileSync(priv_path, 'utf-8');
    }

    validatePass(password, hash, salt){
        const pHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
        return pHash === hash
    }

    generatePass(password){
        // get a random string of 32 bytes
        const salt = crypto.randomBytes(32).toString('hex');
        const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
        
        return {
            hash: hash,
            salt: salt
        }
    }

    generateJWT(user) {
        // get the id from the user
        const _id = user.id;

        // expiration time
        const expiresIn = '1d';

        // generate the payload
        const payload = {
            sub: user._id,
            iat: Date.now()
        }

        const token = sign(payload, this.priv_key, { algorithm: 'RS256', expiresIn: expiresIn })

        return {
            token: 'Bearer ' + token,
            expires: expiresIn
        }
    }

    verifyJWTMiddleware(req, res, next) {

        const token = req.headers.authorization;

        if (!token) {
            res.status(401).json({
                success: false,
                msg: 'You are unauthorized'
            });
        }

        const tokenS = token.split(' ');
        if ((tokenS[0] == "Bearer" || tokenS[0] == "bearer") && tokenS[1].match(/\S+\.\S+\.\S/) != null) {

            try {

                const payload = verify(token[1], this.pub_key, { algorihms: ['RS256'] });
               
                req.jwt = payload.payload;

                next();

            } catch (e) {
                res.status(401).json({
                    success: false,
                    msg: 'You are unauthorized'
                });
            }

        } else {
            res.status(401).json({
                success: false,
                msg: 'You are unauthorized'
            });
        }

    }
}

const utils = new Utils();
export default utils;