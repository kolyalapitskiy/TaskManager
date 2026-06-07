import React from 'react';

interface HeaderProps {
  taskValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
  isDark: boolean;
  toggleTheme: () => void;
}

export const Header = ({ 
  taskValue, 
  onInputChange, 
  onAdd, 
  inputRef, 
  isDark, 
  toggleTheme 
}: HeaderProps) => {
  return (
    <header className="kanban-header">
      <div className="header-left">
        <h1>📋 Kanban</h1>
      </div>
      
      <div className="header-center">
        <input
          className="kanban-input"
          ref={inputRef}
          type="text"
          value={taskValue}
          onChange={onInputChange}
          placeholder="Новая задача..."
        />
        <button className="kanban-btn" onClick={onAdd}>Добавить</button>
      </div>

      <div className="header-right">
        <button className="theme-toggle" onClick={toggleTheme} title="Сменить тему">
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
};