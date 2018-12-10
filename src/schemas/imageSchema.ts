import { Schema } from 'mongoose';

export const imageSchema: Schema = new Schema({
    taskId: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }],
    filename: {
        type: String,
        required: true
    }
});