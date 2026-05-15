
import type { TaskProps } from "../interfaces/types";
import { useState } from 'react';

function TaskItem ({name, id, status, description, onStatus, onDelete, onEdit, onUpdateDescription} : TaskProps) {
    const [isEditingDesc, setIsEditingDesc] = useState(false);
    const [tempDesc, setTempDesc] = useState(description || '');

    const handleSaveDesc = () => {
        onUpdateDescription(id, tempDesc);
        setIsEditingDesc(false);
    };
    return(
        <>
            <div key={id}>
                <li key={id}>{name}</li>
                <button onClick={() => onDelete(id)}>удалить задачу</button>
                <button onClick={() => onEdit(id)}>change задачу</button>
                <div style={{ margin: '10px 0' }}>
                    {isEditingDesc ? (
                        <div>
                            <textarea
                                value={tempDesc}
                                onChange={(e) => setTempDesc(e.target.value)}
                                placeholder="Добавьте детали к задаче..."
                            />
                            <button onClick={handleSaveDesc}>Сохранить</button>
                            <button onClick={() => setIsEditingDesc(false)}>Отмена</button>
                        </div>
                    ) : (
                        <div>
                            <p>{description || <i>Нет описания</i>}</p>
                            <button onClick={() => setIsEditingDesc(true)}>
                                {description ? "Изменить описание" : "Добавить информацию"}
                            </button>
                        </div>
                    )}
                </div>
                <select
                  value={status}
                  onChange={(e) => onStatus(e.target.value as "todo" | "completed" | "in-progress")}
                >
                  <option value="todo">Нужно сделать</option>
                  <option value="in-progress">В процессе</option>
                  <option value="completed">Готово</option>
                </select>
                <br/>
                {status}
            </div>
            <br/>
        </>
    )
}


export default TaskItem;