import express, {Request, Response} from 'express';
import 'dotenv/config';
import login from './login';
import verifyToken from './tokens/verify'

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Your PassMaster Server is up and running!');
});

router.post('/login', (req: Request, res: Response) => {
    login(req,res)
})


router.get('/protected', (req: Request, res: Response) => {
    const token = (req.headers.authorization)?.split(" ")[1];
    const authorized = verifyToken(token);
    if(authorized.decoded){
        const authenticated = authorized.isTokenValid;
        if(authenticated){
            res.status(200)
            res.send(authorized.decoded);
        }else{
            res.status(401)
            res.send('You are not authenticated');
        }
    }
})


export default router;