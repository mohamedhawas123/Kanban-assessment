import { FC, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { closeAddModal } from "../feature/uiSlice";
import { useTasks } from "../hooks/useTasks";
import { ColumnKey } from "../models/ColumnType";


export const AddTaskModal: FC = () => {
    const dispatch = useDispatch();
    const { addTask } = useTasks();

    const { isAddModalOpen, selectedColumn } = useSelector(
        (state: RootState) => state.ui
    );

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [column, setColumn] = useState<ColumnKey>(selectedColumn as ColumnKey || "backlog");

    const handleClose = () => {
        dispatch(closeAddModal());
        setTitle("");
        setDescription("");
        setColumn("backlog");
    };

    const handleSave = () => {
        if (!title.trim()) return;

        addTask({
            title,
            description,
            column,
        });

        handleClose();
    };

    return (
        <Modal show={isAddModalOpen} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add Task</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    {/* Task Title */}
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
                    Save Task
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
