import { Router } from 'express';
import * as taskController from '../controllers/task.controller';

const router = Router();

router.get('/', taskController.getTasks);
router.post('/', taskController.createTask);
router.delete('/:id', taskController.deleteTask);
router.patch('/:id', taskController.updateTask);

export default router;