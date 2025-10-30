import { FC, ChangeEvent } from "react";
import { Search } from "lucide-react";
import { Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { openAddModal } from "../feature/uiSlice";

interface TopBarProps {
    onSearchChange: (term: string) => void;
}

export const TopBar: FC<TopBarProps> = ({ onSearchChange }) => {
    const dispatch = useDispatch();

    const handleAddTaskClick = () => {
        dispatch(openAddModal("backlog"));
    };

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        onSearchChange(e.target.value);
    };

    return (
        <Row className="align-items-center w-full mb-3 border-bottom pb-3 flex-shrink-0">
            <Col xs={12} md={8} lg={9}>
                <InputGroup className="border rounded-2 w-50">
                    <InputGroup.Text className="bg-transparent border-0">
                        <Search className="text-muted" />
                    </InputGroup.Text>
                    <Form.Control
                        className="border-0"
                        type="text"
                        placeholder="Search by task title or description"
                        onChange={handleSearch}
                    />
                </InputGroup>
            </Col>

            <Col
                xs={12}
                md={4}
                lg={3}
                className="d-flex justify-content-md-end justify-content-start mt-3 mt-md-0"
            >
                <Button
                    className="px-4 py-2"
                    style={{ backgroundColor: "#1264E3" }}
                    variant="primary"
                    onClick={handleAddTaskClick}
                >
                    Add Task
                </Button>
            </Col>
        </Row>
    );
};
