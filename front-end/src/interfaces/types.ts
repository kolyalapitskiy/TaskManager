

export interface TodoInterface {
  name: string;
  id: number;
  status: "todo" | "completed" | "in-progress";
}

export interface TaskProps {
  name: string;
  id: number;
  status: "todo" | "completed" | "in-progress";
  onDelete: (id:number) => void
  onEdit: (id: number) => void
  onStatus: (newStatus: "todo" | "completed" | "in-progress") => void
}



