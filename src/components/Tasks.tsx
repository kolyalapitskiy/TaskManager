
import type { TaskProps } from "../interfaces/types";

function TaskItem ({name, age, status, onStatus, onDelete, onEdit} : TaskProps) {
    return(
        <>
            <div key={age}>
                <li key={age}>{name}</li>
                <button onClick={() => onDelete(age)}>удалить задачу</button>
                <button onClick={() => onEdit(age)}>change задачу</button>
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