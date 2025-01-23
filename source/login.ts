import {Request, Response} from 'express'
import bcrypt from 'bcrypt';
import * as fs from 'fs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export default function login(req: Request, res: Response){
    const secretKey = process.env.SECRET_KEY;
    const auth = req.headers.authorization?.split(" ");
    const users = JSON.parse(fs.readFileSync('./source/users.json', 'utf-8'));
    var credentials = new Array<String>;
    if(auth){
        if(auth[0] == 'Basic'){
            credentials = Buffer.from(auth[1], 'base64').toString().split(":");
            if(credentials.length != 2){
                res.status(400);
                res.send('Invalid Credentials');
            }
        }
    }
    
    var authorized = false;
    if(typeof credentials[0] == "string" && typeof credentials[1] == "string" ){
        authorized = bcrypt.compareSync(credentials[1], users[credentials[0]].password);
    }
    if(authorized){
        var token = new String;
        if(secretKey){
            token = jwt.sign({username: credentials[0]}, secretKey, {expiresIn: '4h'})
        }
        res.status(200);
        res.send({
            accessToken: token
        });
    }else{
        res.status(400);
        res.send('Authentication Error');
    }
}