import UsersController from '../controllers/usersController';
import { userRules } from '../rules/userRules';
export class userRoutes {
    private usersController: UsersController = new UsersController();

    routes(app): void {
        app.route('/register')
            .post(userRules['forRegister'], this.usersController.registerUser)

        app.route('/login')
            .post(userRules['forLogin'], this.usersController.loginUser);
    }
}