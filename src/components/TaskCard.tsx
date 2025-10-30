import { FC } from "react";
import { Edit2, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { openDeleteModal, openEditModal } from "../feature/uiSlice";
import { Task } from "../models/Task";

interface TaskCardProps {
  task: Task
}

export const TaskCard: FC<TaskCardProps> = ({ task }) => {
  const dispatch = useDispatch();

  const handleEditClick = () => {
    dispatch(openEditModal(task));
  };

  return (
    <div className="mb-3 border rounded bg-white p-3">
      <h3 className="h6 fw-semibold mb-1">{task.title}</h3>
      <p className="text-muted small mb-2">{task.description}</p>
      <div className="d-flex justify-content-end gap-2 text-secondary">
        <button
          className="btn btn-sm btn-light bg-transparent border-0 d-flex align-items-center justify-content-center"
          onClick={handleEditClick}
        >
          <Edit2 size={16} />
        </button>

        <button
          onClick={() => dispatch(openDeleteModal(task))}
          className="btn btn-sm btn-light bg-transparent border-0 d-flex align-items-center justify-content-center"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};
