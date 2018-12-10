import { TaskService } from '../services/taskService';
import { Request, Response } from 'express';

export default class tasksController {
    private taskService: TaskService = new TaskService();

    getTasks = (req: Request, res: Response): void => {
        this.taskService.getTasks(req.body.decodedUserId)
            .then(result => {
                res.status(200).json({
                    tasks: result
                });
            })
            .catch(error => {
                res.status(401).json({
                    message: 'Something went wrong',
                    error
                });
            });
    }

    createTask = (req: Request, res: Response): void => {
        this.taskService.createTask(req).then(result => {
            res.status(201).json({
                message: 'Task has been created successfully!',
                result
            });
        })
        .catch(err => {
            res.status(401).json({
                message: 'Something went wrong',
                err
            });
        })
    }

    getTaskById = (req: Request, res: Response): void => {
        this.taskService.getTaskById(req.params.id, req.body.decodedUserId)
            .then(result => {
                if(!result) {
                    return res.status(400).json({
                        message: 'Something went wront!'
                    });
                }

                res.status(200).json({
                    message: 'get by id',
                    result
                })
            })
            .catch(error => {
                res.status(400).json({
                    message: 'Something went wrong',
                    error
                });
            })
    }
    
    updateTask = (req: Request, res: Response): void => {
        this.taskService.updateTask(req.params.id, this.taskBody(req))
        .then(result => {
            if(result.nModified >= 1) {
                return res.status(201).json({
                    message: 'Task has been updated successfully!'
                });
            }

            res.status(400).json({
                message: 'Task has not been updated!'
            });
            
        })
        .catch(error => {
            res.status(400).json({
                message: 'Something went wrong',
                error
            });
        });
  
    }

    deleteTask = (req: Request, res: Response): void => {
        this.taskService.deleteTask(req.params.id, req.body.decodedUserId)
            .then(result => {
                if (!result) {
                    return res.status(400).json({
                        message: 'Something went wrong!'
                    });
                }

                res.status(200).json({
                    message: 'Task has been deleted successfully!'
                });
            })
            .catch(error => {
                res.status(401).json({
                    message: 'Something went wrong',
                    error
                });
            });
    }

    taskBody(req: Request) {
        return {
            title: req.body.title,
            description: req.body.description,
            userId: req.body.decodedUserId,
        }
    }
}
