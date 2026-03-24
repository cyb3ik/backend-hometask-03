import { NextFunction, Request, Response } from 'express'
import { HTTPStatusCode } from '../utils/statusCodes'
import * as dotenv from 'dotenv'

const adminUserName = process.env.ADMIN_USERNAME
const adminPass = process.env.ADMIN_PASSWORD
 
export const authGuardMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers['authorization'] as string

    if (!auth) {
        res.sendStatus(HTTPStatusCode.UNAUTHORIZED)
        return
    }
 
    const [authType, token] = auth.split(' ')
    if (authType !== 'Basic') {
        res.sendStatus(HTTPStatusCode.UNAUTHORIZED)
        return
    }
 
    const credentials = Buffer.from(token, 'base64').toString('utf-8')
    const [username, password] = credentials.split(':')
 
    if (username !== adminUserName || password !== adminPass) {
        res.sendStatus(HTTPStatusCode.UNAUTHORIZED)
        return
    }
 
  next()
}