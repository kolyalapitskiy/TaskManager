// import { useState, useEffect } from 'react';
// import type {TodoInterface} from '../interfaces/types';
// import {taskValidation} from '../utils/tasks/taskValidation'

// export const useTasks = () => {
//   const [task, setTask] = useState("")
//   const [tasks, setTasks] = useState<TodoInterface[]>([])
//   const tasksApi = 'http://localhost:5000/api/tasks';
  
//   const loadTasks = async() => {
//     try {
//       const responce = await fetch(tasksApi);
//       const data = await responce.json();
//       setTasks(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     loadTasks()
//   }, [])

//   const handleChangeTask = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setTask(e.target.value)
//   };
//   const taskDelete = async (idToDelete: number) => {
//     try {
//       const response = await fetch(`${tasksApi}/${idToDelete}`, {
//         method: `DELETE`,
//       })
//       if(response.ok) {
//         setTasks((prev) => prev.filter((item) => item.id !== idToDelete))
//       } else {
//         alert("Не удалось удалить задачу!")
//       }
//     } catch (error) {
//       console.error(error);
//     }
//     setTasks(tasks.filter((item) => item.id !== idToDelete))
//   };
//   const tasksAdd = async () => {
//         if(!task) return;
//           try {
//             const response = await fetch(tasksApi, 
//             {
//             method: "POST",
//             headers: {
//               'Content-Type': "application/json",
//             },
//             body: JSON.stringify({
//               name: task,
//             }),
//             });
//             if(response.ok) {
//               const newTaskFromServer = await response.json();
//               setTasks((prevTasks) => [...prevTasks, newTaskFromServer]);
//               setTask("");
//             } else {
//               alert(response.status)
//             }
//           } catch(error) {
//             console.error(error);
//           }
//       }

//     const taskEdit = async (idToEdit: number) => {
//       console.log('taskEdit')
//       const newName = prompt("Введите новое название!")
//       if(newName) {
//         try {
//           const response = await fetch(`${tasksApi}/${idToEdit}`, {
//             method: "PATCH",
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({name: newName}),
//           });
//           if(response.ok) {
//             const UpdatedTask = await response.json();
//             setTasks((prev) => 
//               prev.map((t) => (t.id === idToEdit ? UpdatedTask : t))
//             )
//           }
//         } catch (error) {
//           alert("Неправильно!!!")
//         }
//       } 
//     };







//   const taskStatusChanging = async (idToEdit: number, taskStatus: "todo" | "completed" | "in-progress") => {
//     try {
//   const response = await fetch(`${tasksApi}/${idToEdit}`, {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       status: taskStatus 
//     }),
//   });
//   if (response.ok) {
//     setTasks((prev) =>
//       prev.map((task) =>
//         task.id === idToEdit ? { ...task, status: taskStatus } : task
//       )
//     );
//   } else {
//     alert("Ошибка при смене статуса");
//   }
// } catch (error) {
//   console.error("Ошибка при обновлении статуса:", error);
// }
//   }
//   useEffect(() => {
//       localStorage.setItem("My-kanban-tasks", JSON.stringify(tasks))
//     }, [tasks]);
//   useEffect(() => {
//     document.title = `KanbanBoard: ${tasks.length}`;
//   }, [tasks])

//   return {
//     task,
//     tasks,
//     tasksAdd,
//     taskEdit,
//     taskDelete,
//     taskStatusChanging,
//     handleChangeTask,
//   }

// }



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

  return {
    task,
    tasks,
    tasksAdd,
    taskEdit,
    taskDelete,
    taskStatusChanging,
    handleChangeTask,
  };
};