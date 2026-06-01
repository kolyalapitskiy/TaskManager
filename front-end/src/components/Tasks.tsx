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
    <li className="task-card thin">
      {/* HEADER */}
      <div className="task-header">
        <span className="task-title">{name}</span>

        <span className={`task-status task-status-${status}`}>
          {status}
        </span>
      </div>

      {/* DESCRIPTION */}
      <div className="task-body">
        {isEditingDesc ? (
          <div className="task-edit">
            <textarea
              value={tempDesc}
              onChange={(e) => setTempDesc(e.target.value)}
              placeholder="Описание..."
            />

            <div className="task-actions-row">
              <button onClick={handleSaveDesc}>✔</button>
              <button onClick={() => setIsEditingDesc(false)}>✖</button>
            </div>
          </div>
        ) : (
          <div className="task-description">
            <p>
              {description?.trim() ? (
                description
              ) : (
                <span className="task-muted">нет описания</span>
              )}
            </p>

            <button onClick={() => setIsEditingDesc(true)}>
              ✎
            </button>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="task-footer">
        <select
          value={status}
          onChange={(e) =>
            onStatus(e.target.value as "todo" | "in-progress" | "completed")
          }
        >
          <option value="todo">🔴</option>
          <option value="in-progress">🟡</option>
          <option value="completed">🟢</option>
        </select>

        <div className="task-buttons">
          <button onClick={() => onEdit(id)}>✎</button>
          <button className="danger" onClick={() => onDelete(id)}>
            🗑
          </button>
        </div>
      </div>
    </li>
  );
}