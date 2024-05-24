import {NextFunction, Request, Response} from 'express';
import {decodeToken} from "../../utils/helper";
import {getById} from "../services/userServices";
import {handleError} from "../../utils/responseHandler";

require('dotenv').config();


const Auth = async (req: Request, res: Response, next: NextFunction) => {
    const BearerToken = req.headers.authorization;
    if (BearerToken) {
        const token = BearerToken.split(' ')[1];
        if (!token) {
            throw new Error('Token is missing');
        }
        try{
            const userInfo: void = decodeToken(token);
            const user = await getById(userInfo.id)
            req.user = user && user;
            next()
        }catch(err){
            return handleError(res, err);
        }

    }
}

export default Auth;