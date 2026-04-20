import TaskItem from './components/Tasks'
import UserCard from './components/UserCard'
import Badge from './components/Badge'
import { useState, useEffect, useRef } from 'react'
import type { TodoInterface } from './interfaces/types'
import { useTasks } from './hooks/useTasks'
import './styles/App.css'

function App() {
  const [count, setCount] = useState(0)
  const [isDark, setDark] = useState(false)
  const customers = ["Dmitiry", "Ksusha", "Lexa"]
  const { task, tasks, tasksAdd, taskEdit, taskStatusChanging, taskDelete, handleChangeTask } = useTasks()

  const todoTasks = tasks.filter(t => t.status === 'todo')
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress')
  const completedTasks = tasks.filter(t => t.status === 'completed')

  const inputRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    tasksAdd();
    inputRef.current?.focus(); 
    }

  return (
    <>
      <button className="dark-toggle" onClick={() => setDark(!isDark)}>
        {isDark ? '☀️ Светлая' : '🌙 Тёмная'}
      </button>

      <header className="kanban-header">
        <h1>📋 Kanban Board</h1>
        <input
          className="kanban-input"
          ref={inputRef}
          type="text"
          value={task}
          onChange={handleChangeTask}
          placeholder="Новая задача..."
        />
        <button className="kanban-btn" onClick={handleAdd}>Добавить</button>
      </header>

      <div className="kanban-board">
        {/* TODO */}
        <div className="kanban-column">
          <div className="kanban-column-header">
            <span className="kanban-column-title">
              🔴 Нужно сделать
            </span>
            <span className="kanban-count">{todoTasks.length}</span>
          </div>
          <ul className="kanban-tasks">
            {todoTasks.map((item) => (
              <li className="task-card" key={item.id}>
                <div className="task-card-name">{item.name}</div>
                <div className="task-card-actions">
                  <button onClick={() => taskDelete(item.id)}>🗑 Удалить</button>
                  <button onClick={() => taskEdit(item.id)}>✏️ Изменить</button>
                  <select
                    value={item.status}
                    onChange={(e) =>
                      taskStatusChanging(
                        item.id,
                        e.target.value as "todo" | "completed" | "in-progress"
                      )
                    }
                  >
                    <option value="todo">Нужно сделать</option>
                    <option value="in-progress">В процессе</option>
                    <option value="completed">Готово</option>
                  </select>
                </div>
                <span className={`status-badge ${item.status}`}>{item.status}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* IN PROGRESS */}
        <div className="kanban-column">
          <div className="kanban-column-header">
            <span className="kanban-column-title">
              🟡 В процессе
            </span>
            <span className="kanban-count">{inProgressTasks.length}</span>
          </div>
          <ul className="kanban-tasks">
            {inProgressTasks.map((item) => (
              <li className="task-card" key={item.id}>
                <div className="task-card-name">{item.name}</div>
                <div className="task-card-actions">
                  <button onClick={() => taskDelete(item.id)}>🗑 Удалить</button>
                  <button onClick={() => taskEdit(item.id)}>✏️ Изменить</button>
                  <select
                    value={item.status}
                    onChange={(e) =>
                      taskStatusChanging(
                        item.id,
                        e.target.value as "todo" | "completed" | "in-progress"
                      )
                    }
                  >
                    <option value="todo">Нужно сделать</option>
                    <option value="in-progress">В процессе</option>
                    <option value="completed">Готово</option>
                  </select>
                </div>
                <span className={`status-badge ${item.status}`}>{item.status}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* COMPLETED */}
        <div className="kanban-column">
          <div className="kanban-column-header">
            <span className="kanban-column-title">
              🟢 Готово
            </span>
            <span className="kanban-count">{completedTasks.length}</span>
          </div>
          <ul className="kanban-tasks">
            {completedTasks.map((item) => (
              <li className="task-card" key={item.id}>
                <div className="task-card-name">{item.name}</div>
                <div className="task-card-actions">
                  <button onClick={() => taskDelete(item.id)}>🗑 Удалить</button>
                  <button onClick={() => taskEdit(item.id)}>✏️ Изменить</button>
                  <select
                    value={item.status}
                    onChange={(e) =>
                      taskStatusChanging(
                        item.id,
                        e.target.value as "todo" | "completed" | "in-progress"
                      )
                    }
                  >
                    <option value="todo">Нужно сделать</option>
                    <option value="in-progress">В процессе</option>
                    <option value="completed">Готово</option>
                  </select>
                </div>
                <span className={`status-badge ${item.status}`}>{item.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default App