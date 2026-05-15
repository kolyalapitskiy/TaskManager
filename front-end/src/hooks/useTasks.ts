import { useState, useEffect } from 'react';
import type { TodoInterface } from '../interfaces/types';

export const useTasks = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<TodoInterface[]>([]);
  const tasksApi = 'http://localhost:5000/api/tasks';
  
  const loadTasks = async () => {
    try {
      const response = await fetch(tasksApi);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Ошибка при загрузке:", error);
    }
  };

  useEffect(() => { loadTasks(); }, []);

  const handleChangeTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const tasksAdd = async () => {
    if (!task) return;
    try {
      const response = await fetch(tasksApi, {
        method: "POST",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({ name: task }),
      });
      if (response.ok) {
        const newTask = await response.json();
        setTasks((prev) => [...prev, newTask]);
        setTask("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const taskDelete = async (idToDelete: number) => {
    try {
      const response = await fetch(`${tasksApi}/${idToDelete}`, { method: 'DELETE' });
      if (response.ok) {
        setTasks((prev) => prev.filter((item) => item.id !== idToDelete));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const taskEdit = async (idToEdit: number) => {
    console.log('Нажал EDIT для ID:', idToEdit);
    const newName = prompt("Введите новое название!");
    try {
      const response = await fetch(`${tasksApi}/${idToEdit}`, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName }),
      });
      if (response.ok) {
        const updatedTask = await response.json();
        setTasks((prev) => prev.map((t) => (t.id === idToEdit ? updatedTask : t)));
      }
    } catch (error) {
      alert("Ошибка при обновлении!");
    }
  };

  const taskStatusChanging = async (idToEdit: number, taskStatus: "todo" | "completed" | "in-progress") => {
    try {
      const response = await fetch(`${tasksApi}/${idToEdit}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: taskStatus }),
      });
      if (response.ok) {
        setTasks((prev) =>
          prev.map((t) => (t.id === idToEdit ? { ...t, status: taskStatus } : t))
        );
      }
    } catch (error) {
      console.error(error);
    }
  };


  const taskUpdateDescription = async (idToUpdateDescription: number, taskDescription: string) => {
    try {
      const response = await fetch(`${tasksApi}/${idToUpdateDescription}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: taskDescription})
      });

      if (response.ok) {
        const updatedTask = await response.json();
        setTasks((prev) => prev.map((t) => (t.id === idToUpdateDescription ? updatedTask : t )))
      }   
    } catch (error) {
        console.error("Ошибка при updateDescription")
      }
  }

  return {
    task,
    tasks,
    tasksAdd,
    taskEdit,
    taskDelete,
    taskStatusChanging,
    handleChangeTask,
    taskUpdateDescription
  };
};