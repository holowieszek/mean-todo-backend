import tasksController from '../controllers/tasksController';
import { taskRules } from '../rules/taskRules';
import { tokenGuard  } from '../middlewares/authGuard';
import Upload from '../middlewares/upload';

export class tasksRoutes {
    tasksController: tasksController = new tasksController();
    upload: Upload = new Upload();

    routes(app): void {
        app.route('/')
            .get(tokenGuard(), this.tasksController.getTasks)
            .post(tokenGuard(), this.upload.extractFile(), taskRules['forTask'], this.tasksController.createTask)

        app.route('/:id')
            .get(tokenGuard(), this.tasksController.getTaskById)
            .put(tokenGuard(), taskRules['forTask'], this.tasksController.updateTask)
            .delete(tokenGuard(), this.tasksController.deleteTask);
    }
}