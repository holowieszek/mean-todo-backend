import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { TaskInterface as ITask } from '../interfaces/taskInterface';
import { taskSchema } from '../schemas/taskSchema';

export interface taskModel extends ITask, Document {}

export default mongoose.model<taskModel>('Task', taskSchema);