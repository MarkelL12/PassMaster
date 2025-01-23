import jwt from 'jsonwebtoken';
import 'dotenv/config';

export default function verifyToken(token: string | undefined = ""){
    const secretKey = process.env.SECRET_KEY;
    var isTokenValid = false;
    var decoded = undefined;
    try{
        if(secretKey){
            decoded = jwt.verify(token, secretKey);
        }
        isTokenValid = true;
    } catch (err){
        console.log(err);
        isTokenValid = false;
    }
    return {isTokenValid, decoded}
}