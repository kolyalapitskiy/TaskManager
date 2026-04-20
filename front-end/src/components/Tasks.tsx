
import type { TaskProps } from "../interfaces/types";

function TaskItem ({name, id, status, onStatus, onDelete, onEdit} : TaskProps) {
    return(
        <>
            <div key={id}>
                <li key={id}>{name}</li>
                <button onClick={() => onDelete(id)}>удалить задачу</button>
                <button onClick={() => onEdit(id)}>change задачу</button>
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