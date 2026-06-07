import { Request, Response } from 'express';
import * as taskService from '../services/task.service';

export const getTasks = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user!.id;
    const tasks = await taskService.getTasks(userId);
    return res.json(tasks);
  } catch (error) {
    return res.status(500).json({
      error: 'Database error',
    });
  }
};

export const createTask = async (
  req: Request,
  res: Response
) => {
  try {
    const { name } = req.body;
    const userId = req.user!.id;

    if (!name?.trim()) {
      return res.status(400).json({
        error: 'Task name is required',
      });
    }

    const task = await taskService.createTask(name.trim(), userId);
    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).json({
      error: 'Database error',
    });
  }
};

export const deleteTask = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id;
    const userId = req.user!.id;

    if (!id) {
      return res.status(400).json({
        error: 'Task id is required',
      });
    }

    const task = await taskService.deleteTask(id, userId);

    if (!task) {
      return res.status(404).json({
        error: 'Task not found',
      });
    }

    return res.json({
      message: 'Task deleted',
      task,
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Delete failed',
    });
  }
};

export const updateTask = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const userId = req.user!.id;

    if (!id) {
      return res.status(400).json({
        error: 'Task id is required',
      });
    }

    const updatedTask = await taskService.updateTask(id, updates, userId);

    if (!updatedTask) {
      return res.status(404).json({
        error: 'Task not found or no fields provided',
      });
    }

    return res.json(updatedTask);
  } catch (error) {
    return res.status(500).json({
      error: 'Update failed',
    });
  }
};
