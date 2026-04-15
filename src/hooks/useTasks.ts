import { useState, useEffect } from 'react';
import type {TodoInterface} from '../interfaces/types';
// import {taskValidation} from '../utils/tasks/taskValidation'

export const useTasks = () => {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState<TodoInterface[]>(() => {
    const saved = localStorage.getItem("My-kanban-tasks");
    return saved ? JSON.parse(saved) : [];
  });
  

  const handleChangeTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value)
  };
  const taskDelete = (ageToDelete: number) => {
    setTasks(tasks.filter((item) => item.age !== ageToDelete)) 
  };
  const taskEdit = (ageToEdit: number) => {
    const newName = prompt("Введите новое название!")
    if(newName) {
      setTasks(tasks.map((item) =>
        item.age === ageToEdit ? {...item, name: newName} : item
      ));
    } 
  };
  const tasksAdd = () => {
    const newTask: TodoInterface = {age: Date.now(), name: task, status: "todo"}
    setTasks([...tasks, newTask]);
    setTask("")
  }
  const taskStatusChanging = (ageToEdit: number, taskStatus: "todo" | "completed" | "in-progress") =>
    setTasks((prev) => 
        prev.map((task) => 
            task.age === ageToEdit ? {...task, status: taskStatus} : task
        )
    )
  
  useEffect(() => {
      localStorage.setItem("My-kanban-tasks", JSON.stringify(tasks))
    }, [tasks]);
  useEffect(() => {
    document.title = `KanbanBoard: ${tasks.length}`;
  }, [tasks])

  return {
    task,
    tasks,
    tasksAdd,
    taskEdit,
    taskDelete,
    taskStatusChanging,
    handleChangeTask
  }

}
  