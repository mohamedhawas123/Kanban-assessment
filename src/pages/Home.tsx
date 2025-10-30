import { FC, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { TopBar } from "../components/TopBar";
import { KanbanColumn } from "../components/KanbanColumn";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useTasks } from "../hooks/useTasks";
import { AddTaskModal } from "../components/AddTaskModal";
import { EditTaskModal } from "../components/EditTaskModal";
import { DeleteTaskModal } from "../components/DeleteTaskModal";
import { ColumnKey } from "../models/ColumnType";
import { useSelector } from "react-redux";


export const HomeScreen: FC = () => {
    const { tasks, isLoading, moveTask } = useTasks();
    const [searchTerm, setSearchTerm] = useState("");

    const safeTasks = Array.isArray(tasks) ? tasks : [];
    const { isFetching, isAdding, isUpdating, isDeleting } = useSelector((s: any) => s.ui);
    const isSaving = isAdding || isUpdating || isDeleting;
    const showLoader = isFetching || isLoading || isSaving;





    const filteredTasks = safeTasks.filter((t: any) =>
        [t.title, t.description]
            .join(" ")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );
    const columns: Record<ColumnKey, { title: string; tasks: any[] }> = {
        backlog: { title: "Backlog", tasks: filteredTasks.filter((t: any) => t.column === "backlog") },
        inProgress: { title: "In Progress", tasks: filteredTasks.filter((t: any) => t.column === "inProgress") },
        review: { title: "Review", tasks: filteredTasks.filter((t: any) => t.column === "review") },
        done: { title: "Done", tasks: filteredTasks.filter((t: any) => t.column === "done") },
    };

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) return;
        if (source.droppableId === destination.droppableId && source.index === destination.index) return;

        const sourceColumn = source.droppableId as ColumnKey;
        const destinationColumn = destination.droppableId as ColumnKey;
        const movedTask = columns[sourceColumn].tasks[source.index];

        moveTask({ id: movedTask.id, updates: { column: destinationColumn } });
    };





    return (

        <Container
            fluid
            className="rounded-3 w-full p-4 mt-4 d-flex flex-column"
            style={{ height: "100vh",  }}
        >
            <TopBar onSearchChange={setSearchTerm} />
            {showLoader && (
                <div
                    className="position-absolute top-0 start-50 translate-middle-x d-flex align-items-center gap-2 p-2 px-3 bg-dark text-white rounded shadow"
                    style={{ zIndex: 9999, marginTop: "10px" }}
                >
                    <Spinner animation="border" size="sm" />
                    <span>
                        {isFetching || isLoading
                            ? "Loading tasks..."
                            : isAdding
                                ? "Adding..."
                                : isUpdating
                                    ? "Updating..."
                                    : isDeleting
                                        ? "Deleting..."
                                        : ""}
                    </span>
                </div>
            )}

            <div
                className="container-fluid flex-grow-1"
                style={{ height: "calc(100vh - 120px)",  }}
            >
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="row h-100 g-4 p-3">
                        {Object.entries(columns).map(([key, col]) => (
                            <KanbanColumn key={key} id={key} title={col.title} tasks={col.tasks} />
                        ))}
                    </div>
                </DragDropContext>
            </div>

            <AddTaskModal />
            <EditTaskModal />
            <DeleteTaskModal />
        </Container>
    );
};
