import { generateKeyPairSync } from 'crypto';
import  fs  from 'fs';

class GeneratePrivPub{
    constructor(){}
    
    generateKeys(){

        // Generate public and private key
        const {publicKey, privateKey} = generateKeyPairSync('rsa', {
            modulusLength: 4096,
            publicKeyEncoding: {
                type: 'pkcs1',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs1',
                format: 'pem'
            }
        })
        
        // save each key in a file
        fs.writeFileSync(__dirname + 'pub_key.pem', publicKey);
        fs.writeFileSync(__dirname + 'priv_key.pem', privateKey);
    }
}

// create object and call method
const gpp = new GeneratePrivPub();
gpp.generateKeys();