import * as jwt from 'jsonwebtoken';
import { IncomingHttpHeaders } from 'http';
import { RequestHandler } from 'express';
import { UserService } from '../services/userService';

const userService: UserService = new UserService();

function getTokenFromHeaders(headers: IncomingHttpHeaders) {
    const header: string = headers.authorization;
    
    if (!header) {
        return header;
    }

    return header.split('Bearer ')[1];
}

export const tokenGuard: (() => RequestHandler) = (() => (req, res, next) =>  {
    const token = getTokenFromHeaders(req.headers) || req.query.token || req.body.token || '';
    const hasAccess = userService.verifyToken(token);

    hasAccess.then(result => {
        req.body.decodedUserId = result;

        if (req.body.userId) {
            if(req.body.userId === result) {
                next();
            } else {
                return res.status(401).json('No authorization!');
            }
        } else {
            next();
        }

        req.body.userId = result;
    })
    .catch(error => {
        return res.status(401).json({
            message: 'No authorization'
        });
    });
});
