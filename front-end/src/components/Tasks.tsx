import type { TaskProps } from "../interfaces/types";
import { useState } from "react";

export function TaskItem({
  name,
  id,
  status,
  description,
  onStatus,
  onDelete,
  onEdit,
  onUpdateDescription,
}: TaskProps) {
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [tempDesc, setTempDesc] = useState(description || "");

  const handleSaveDesc = () => {
    onUpdateDescription(id, tempDesc.trim());
    setIsEditingDesc(false);
  };

  return (
    <li className={`task-card task-card-${status}`}>
      <div className="task-card-header">
        <span className="task-card-name">{name}</span>
        <span className={`status-badge status-${status}`}>{status}</span>
      </div>

      <div className="task-card-body">
        {isEditingDesc ? (
          <div className="task-desc-edit">
            <textarea
              value={tempDesc}
              onChange={(e) => setTempDesc(e.target.value)}
              placeholder="Добавьте описание..."
              autoFocus
            />
            <div className="task-desc-controls">
              <button className="save-btn" onClick={handleSaveDesc}>Сохранить</button>
              <button className="cancel-btn" onClick={() => setIsEditingDesc(false)}>Отмена</button>
            </div>
          </div>
        ) : (
          <div className="task-desc-view" onClick={() => setIsEditingDesc(true)}>
            <p className={!description?.trim() ? "task-muted" : ""}>
              {description?.trim() ? description : "Нажмите, чтобы добавить описание..."}
            </p>
            <span className="edit-icon">✎</span>
          </div>
        )}
      </div>

      <div className="task-card-footer">
        <div className="footer-left">
          <select
            className="status-select"
            value={status}
            onChange={(e) =>
              onStatus(e.target.value as "todo" | "in-progress" | "completed")
            }
          >
            <option value="todo">🔴 Нужно сделать</option>
            <option value="in-progress">🟡 В процессе</option>
            <option value="completed">🟢 Готово</option>
          </select>
        </div>

        <div className="footer-right">
          <button className="edit-btn" title="Изменить имя" onClick={() => onEdit(id)}>✎</button>
          <button className="delete-btn" title="Удалить" onClick={() => onDelete(id)}>🗑</button>
        </div>
      </div>
    </li>
  );
}
