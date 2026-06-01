import React from 'react';

interface HeaderProps {
  taskValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

export const Header = ({ taskValue, onInputChange, onAdd, inputRef }: HeaderProps) => {
  return (
    <header className="kanban-header">
      <h1>📋 Kanban Board</h1>
      <input
        className="kanban-input"
        ref={inputRef}
        type="text"
        value={taskValue}
        onChange={onInputChange}
        placeholder="Новая задача..."
      />
      <button className="kanban-btn" onClick={onAdd}>Добавить</button>
    </header>
  );
};