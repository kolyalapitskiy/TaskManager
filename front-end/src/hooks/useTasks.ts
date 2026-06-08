import { useState, useEffect } from 'react';
import type { TodoInterface } from '../interfaces/types';
import { useAuthStore } from '../store/useAuthStore';

export const useTasks = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<TodoInterface[]>([]);
  const { token, logout } = useAuthStore();
  const tasksApi = 'https://back-end-production-b958.up.railway.app/api/tasks';     //  'http://localhost:5000/api/tasks'
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  const loadTasks = async () => {
    if (!token) return;
    try {
      const response = await fetch(tasksApi, { headers });
      if (response.status === 401 || response.status === 403) {
        logout();
        return;
      }
      const data = await response.json();
      setTasks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => { loadTasks(); }, [token]);

  const handleChangeTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const tasksAdd = async () => {
    if (!task || !token) return;
    try {
      const response = await fetch(tasksApi, {
        method: "POST",
        headers,
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
    if (!token) return;
    try {
      const response = await fetch(`${tasksApi}/${idToDelete}`, { 
        method: 'DELETE',
        headers
      });
      if (response.ok) {
        setTasks((prev) => prev.filter((item) => item.id !== idToDelete));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const taskEdit = async (idToEdit: number) => {
    if (!token) return;
    const newName = prompt("Введите новое название!");
    if (!newName) return;
    try {
      const response = await fetch(`${tasksApi}/${idToEdit}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ name: newName }),
      });
      if (response.ok) {
        const updatedTask = await response.json();
        setTasks((prev) => prev.map((t) => (t.id === idToEdit ? updatedTask : t)));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const taskStatusChanging = async (idToEdit: number, taskStatus: "todo" | "completed" | "in-progress") => {
    if (!token) return;
    try {
      const response = await fetch(`${tasksApi}/${idToEdit}`, {
        method: 'PATCH',
        headers,
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

  const taskUpdateDescription = async (id: number, taskDescription: string) => {
    if (!token) return;
    try {
      const response = await fetch(`${tasksApi}/${id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ description: taskDescription })
      });
      if (response.ok) {
        const updatedTask = await response.json();
        setTasks((prev) =>
          prev.map((t) => (t.id === id ? updatedTask : t))
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

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
