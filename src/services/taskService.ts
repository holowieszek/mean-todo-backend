import Task from '../models/taskModel';
import Image from '../models/imageModel';
const waterfall = require('async-waterfall');

export class TaskService {
    static get taskAttributes() {
        return ['title', 'description', 'created_at'];
    }

    getTasks = (userId: string) => {
        return Task.find({ userId: userId }).select(TaskService.taskAttributes).exec();
    }

    createTask = (req) => {
        return new Promise((resolve, reject) => {
            waterfall([
                function(callback){
                    Task.create(req.body)
                        .then(result => {
                            callback(null, result._id);
                        })
                        .catch(err => {
                            reject(err);
                        });
                },
                function(taskId, callback) {
                    if (req.files) {
                        req.files.map(image => {
                            Image.create({ taskId: taskId, filename: image.filename })
                                .then(result => {
                                    callback(null, result);
                                })
                                .catch(err => {
                                    reject(err);
                                });
                        });
                    }
                    
                    callback(null);
                    
                }
                ], function (err, result) {
                    if (err) {
                        reject();
                    }
    
                    resolve();
                });
        });
        
    }

    getTaskById = (id: number, userId: string) => {
        return Task.findOne({ _id: id, userId: userId }).populate('images').exec();
    }
    
    updateTask = (id: number, payload: any) => {
        return Task.updateOne({ _id: id, userId: payload.userId }, { $set: { title: payload.title, description: payload.description } }, { new: true }).exec();
    }

    deleteTask = (id: number, userId: string) => {
        return Task.findOneAndDelete({ _id: id, userId: userId }).exec();
    }
}