import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { UserInterface as IUser } from '../interfaces/userInterface';
import { userSchema } from '../schemas/userSchema';

export interface userModel extends IUser, Document {}

export default mongoose.model<userModel>('User', userSchema);
