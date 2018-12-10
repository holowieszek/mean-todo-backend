import * as bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator/check';
import { sanitizeBody } from 'express-validator/filter';
import User from '../models/userModel';
import { Request, Response, NextFunction } from 'express';

export const userRules = {
    forRegister: [
        body('email')
            .isEmail()
            .withMessage('Invalid email format')
            .custom(async email => await User.findOne({ email: email }).then(result => !result))
            .withMessage('email exists'),

        body('password')
            .isLength({ min: 8 })
            .withMessage('Invalid password'),

        body('confirmPassword')
            .custom((confirmPassword, { req }) => req.body.password === confirmPassword)
            .withMessage('Passwords are different'),

        sanitizeBody('email').trim().escape(),
        sanitizeBody('password').trim().escape(),
        sanitizeBody('confirmPassword').trim().escape(),

        (req: Request, res: Response, next: NextFunction) => {
            const validation = validationResult(req);
            if (!validation.isEmpty()) {
                return res.status(422).json({
                    errors: validation.mapped()
                });
            }
            next();
        }
    ],
    forLogin: [
        body('email')
            .isEmail()
            .withMessage('Invalid email format')
            .custom(email => User.findOne({ email: email }).then(result => !!result))
            .withMessage('Invalid email or password!'),

        body('password')
            .custom((password, { req }) => {
                return User.findOne({ email: req.body.email })
                    .then(result => bcrypt.compare(password, result!.password))
            })
            .withMessage('Invalid email or password'),

        (req: Request, res: Response, next: NextFunction) => {
            const validation = validationResult(req);
            if (!validation.isEmpty()) {
                return res.status(401).json({
                    errors: validation.mapped()
                });
            }
            next();
        }
    ]
}