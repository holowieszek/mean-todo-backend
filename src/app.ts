import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as path from 'path';
import { Request, Response, NextFunction } from 'express';
import { tasksRoutes } from './routes/tasksRoutes';
import { userRoutes } from './routes/userRoutes';

class App {
    app: express.Application;
    private tasksRoutes: tasksRoutes = new tasksRoutes();
    private userRoutes: userRoutes = new userRoutes();
    private mongoUrl: string = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;

    constructor() {
        this.app = express();
        this.mongoSetup();
        this.cors();
        this.config();
        this.notFound();
        this.errorHandling();
    }

    private mongoSetup(): void {
        (<any>mongoose).Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true })
            .then(result => {
                console.log('Connected to database!');
            })
            .catch(error => {
                console.log(error);
            });
    }

    config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use('/files', express.static(path.join(__dirname, 'uploads')));
        this.tasksRoutes.routes(this.app);
        this.userRoutes.routes(this.app);
    }

    cors(): void {
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With, Content-Type, Accept, Authorization'
            );

            if(req.method === 'OPTIONS') {
                res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
                return res.status(200).json({});
            }

            next();
        });
    }

    notFound(): void {
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            const error: any = new Error('Not found');
            error.status = 404;
            next(error);
        });
    }

    errorHandling(): void {
        this.app.use((error, req: Request, res: Response, next: NextFunction) => {
            res.status(error.status || 500);
            res.json({
                error: error.message
            });
        });
    }
}

export default new App().app;