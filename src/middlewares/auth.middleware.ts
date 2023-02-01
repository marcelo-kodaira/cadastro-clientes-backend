import { NextFunction, Request, Response } from "express"
import AppError from "../Error/AppError"
import jwt from "jsonwebtoken"
import 'dotenv/config'

const authMiddleware = (req: Request, res: Response, next: NextFunction) =>{

    try{
    const token = req.headers.authorization?.split(" ")[1]
    jwt.verify(token as string, process.env.SECRET_KEY as string, (err: any, decoded: any) => {
        req.user ={
            id: decoded.id
        }
        next()
    }
    )
    }catch(err){
        if(err instanceof Error)
        return res.status(401).json({messsage: err.message})
    }
}

export default authMiddleware