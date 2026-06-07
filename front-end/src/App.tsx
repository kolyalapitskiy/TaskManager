import { useRef, useEffect, useState } from 'react'
import { useTasks } from './hooks/useTasks'
import { KanbanColumn } from './components/kanbanColumn'
import { Header } from './components/Header'
import { useThemeStore } from './store/useThemeStore'
import { useAuthStore } from './store/useAuthStore'
import { AuthModal } from './components/Auth'
import './styles/App.css'

function App() {
  const {
    tasks,
    task,
    handleChangeTask,
    tasksAdd,
    taskEdit,
    taskDelete,
    taskStatusChanging,
    taskUpdateDescription
  } = useTasks();

  const inputRef = useRef<HTMLInputElement>(null);
  const { isDark, toggleTheme } = useThemeStore();
  const { token, user, logout } = useAuthStore();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    document.body.className = isDark ? 'dark' : 'light';
  }, [isDark]);

  const columns = [
    { status: 'todo', title: 'Нужно сделать', icon: '🔴' },
    { status: 'in-progress', title: 'В процессе', icon: '🟡' },
    { status: 'completed', title: 'Готово', icon: '🟢' },
  ];

  if (!token) {
    return (
      <div className="auth-screen">
        <h1>TaskManager</h1>
        <button onClick={() => setIsAuthModalOpen(true)}>Войти или Зарегистрироваться</button>
        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      </div>
    );
  }

  return (
    <div className="app-container">
      <Header
        taskValue={task}
        onInputChange={handleChangeTask}
        onAdd={tasksAdd}
        inputRef={inputRef as React.RefObject<HTMLInputElement>}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />
      
      <div className="user-info">
        <span>Привет, {user?.username}!</span>
        <button className="logout-btn" onClick={logout}>Выйти</button>
      </div>

      <div className="kanban-board">
        {columns.map(col => (
          <KanbanColumn
            key={col.status}
            title={col.title}
            icon={col.icon}
            tasks={tasks.filter(t => t.status === col.status)}
            onDelete={taskDelete}
            onEdit={taskEdit}
            onStatus={taskStatusChanging}
            onUpdateDescription={taskUpdateDescription}
          />
        ))}
      </div>
    </div>
  );
}

export default App
