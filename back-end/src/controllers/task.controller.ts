import { Request, Response } from 'express';
import * as taskService from '../services/task.service';

export const getTasks = async (
  req: Request,
  res: Response
) => {
  try {
    const tasks = await taskService.getTasks();
    res.json(tasks);
  } catch {
    res.status(500).json({
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

    if (!name) {
      return res.status(400).json({
        error: 'Task name is required',
      });
    }

    const task = await taskService.createTask(name);

    res.status(201).json(task);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: 'Database error',
    });
  }
};

export const deleteTask = async (
  req: Request,
  res: Response
) => {
  try {
    const task = await taskService.deleteTask(
      req.params.id
    );

    res.json({
      message: 'Task deleted',
      task,
    });
  } catch {
    res.status(500).json({
      error: 'Delete failed',
    });
  }
};

export const updateTask = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, status } = req.body;

    const task = await taskService.updateTask(
      req.params.id,
      name,
      status
    );

    res.json(task);
  } catch {
    res.status(500).json({
      error: 'Update failed',
    });
  }
};