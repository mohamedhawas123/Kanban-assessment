import { FC } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { closeDeleteModal } from "../feature/uiSlice";
import { useTasks } from "../hooks/useTasks";

export const DeleteTaskModal: FC = () => {
  const dispatch = useDispatch();
  const { deleteTask } = useTasks();

  const { isDeleteModalOpen, deletingTask } = useSelector(
    (state: RootState) => state.ui
  );

  const handleClose = () => {
    dispatch(closeDeleteModal());
  };

  const handleDelete = () => {
    if (deletingTask) {
      deleteTask(deletingTask.id);
    }
    handleClose();
  };

  if (!deletingTask) return null;

  return (
    <Modal show={isDeleteModalOpen} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Task</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="mb-0">
          Are you sure you want to delete{" "}
          <strong>{deletingTask.title}</strong>? <br />
          This action cannot be undone.
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
