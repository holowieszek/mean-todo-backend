import { UserService } from '../services/userService';
import { Request, Response } from 'express';

export default class UsersController {
    private userService: UserService = new UserService();

    registerUser = (req: Request, res: Response): void => {
        this.userService.register(req.body.email, req.body.password)
            .then(result => {
                res.status(201).json(result);
            });
    }

    loginUser = (req: Request, res: Response): void => {
        this.userService.login(req.body.email)
            .then(result => {
                res.status(201).json(result);
            });
    }
}