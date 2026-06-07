import { TaskItem } from './Tasks';
import type { TodoInterface } from '../interfaces/types';

interface Props {
  title: string;
  icon: string;
  tasks: TodoInterface[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  onStatus: (id: number, status: TodoInterface['status']) => void;
  onUpdateDescription: (id: number, description: string) => void;
}

export const KanbanColumn = ({ title, icon, tasks, ...actions }: Props) => {
  return (
    <div className="kanban-column">
      <div className="kanban-column-header">
        <span className="kanban-column-title">
          {icon} {title}
        </span>
        <span className="kanban-count">{tasks.length}</span>
      </div>
      <ul className="kanban-tasks">
        {tasks.map((item) => (
          <TaskItem
            key={item.id}
            {...item}
            onStatus={(status) => actions.onStatus(item.id, status)}
            onDelete={() => actions.onDelete(item.id)}
            onEdit={() => actions.onEdit(item.id)}
            onUpdateDescription={(id, desc) => actions.onUpdateDescription(id, desc)}
          />  
        ))}
      </ul>
    </div>
  );
};