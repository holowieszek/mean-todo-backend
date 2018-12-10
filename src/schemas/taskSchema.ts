import { Schema } from 'mongoose';

export const taskSchema: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: 'Title is required!'
    },
    description: {
        type: String,
        required: 'Description is required!'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
},
{
    toJSON: { virtuals: true }
});

taskSchema.virtual('images', {
    ref: 'Image',
    localField: '_id',
    foreignField: 'taskId',
    justOne: false
});
