import { body, validationResult } from 'express-validator/check';
import { sanitizeBody } from 'express-validator/filter';
import { Request, Response, NextFunction } from 'express';

export const taskRules = {
    forTask: [
        body('title', 'Title is required').isLength({ min: 3 }).trim(),
        body('description', 'Description is required').isLength({ min: 3 }).trim(),

        sanitizeBody('title').trim().escape(),
        sanitizeBody('description').trim().escape(),

        (req: Request, res: Response, next: NextFunction) => {
            const validation = validationResult(req);
            if(!validation.isEmpty()) {
                return res.status(422).json({
                    errors: validation.mapped()
                });
            }

            next();
        }
    ]
}