import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import User from '../models/userModel';

export class UserService {
    private readonly _saltRounds = 12;
    private readonly _jwtSecret = process.env.JWT_SECRET;

    static get userAttributes() {
        return ['id', 'email'];
    }

    private static _user;

    static get user() {
        return UserService._user
    }

    register = (email: string, password: string) => {
        return bcrypt.hash(password, this._saltRounds)
            .then(hash => {
                const payload = {
                    email: email,
                    password: hash
                };

                return User.create(payload)
                    .then(result => {
                        return result;
                    });
            });
    }

    login = (email: string) => {
        return User.findOne({ email: email }).exec()
            .then(result => {
                const { id, email } = result;
                const token = jwt.sign({ id, email }, this._jwtSecret);

                return { token, id };
            });
    }

    verifyToken = (token: string) => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this._jwtSecret, (err, decoded) => {
                if (err) {
                    reject();
                    return;
                }

                UserService._user = User.findById(decoded['id']);

                resolve(decoded['id']);
            });
        });
    }

    getUserById = (id: number) => {
        return User.findById(id, UserService.userAttributes);
    }
}