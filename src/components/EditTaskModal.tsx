import { FC, useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { closeEditModal } from "../feature/uiSlice";
import { useTasks } from "../hooks/useTasks";
import { ColumnKey } from "../models/ColumnType";


export const EditTaskModal: FC = () => {
    const dispatch = useDispatch();
    const { moveTask, updateTask } = useTasks();

    const { isEditModalOpen, editingTask } = useSelector(
        (state: RootState) => state.ui
    );

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [column, setColumn] = useState<ColumnKey>("backlog");

    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title);
            setDescription(editingTask.description);
            setColumn(editingTask.column as ColumnKey);
        }
    }, [editingTask]);

    const handleClose = () => {
        dispatch(closeEditModal());
    };

    const handleSave = () => {
        if (!editingTask) return;

        const updates = {
            title,
            description,
            column,
        };

        if (updateTask) {
            updateTask({ id: editingTask.id, updates });
        } else {
            moveTask({ id: editingTask.id, updates });
        }

        handleClose();
    };

    if (!editingTask) return null;

    return (
        <Modal show={isEditModalOpen} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Task</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Task Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter task title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter task description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Column</Form.Label>
                        <Form.Select
                            value={column}
                            onChange={(e) => setColumn(e.target.value as ColumnKey)}
                        >
                            <option value="backlog">Backlog</option>
                            <option value="inProgress">In Progress</option>
                            <option value="review">Review</option>
                            <option value="done">Done</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    style={{ backgroundColor: "#1264E3" }}
                    onClick={handleSave}
                >
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
