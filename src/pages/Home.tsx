import { FC, useState } from "react";
import { Container } from "react-bootstrap";
import { TopBar } from "../components/TopBar";
import { KanbanColumn } from "../components/KanbanColumn";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useTasks } from "../hooks/useTasks";
import { AddTaskModal } from "../components/AddTaskModal";
import { EditTaskModal } from "../components/EditTaskModal";
import { DeleteTaskModal } from "../components/DeleteTaskModal";
import { ColumnKey } from "../models/ColumnType";


export const HomeScreen: FC = () => {
    const { tasks, isLoading, moveTask } = useTasks();
    const [searchTerm, setSearchTerm] = useState("");

    if (isLoading) return <div>Loading tasks...</div>;

    const filteredTasks = tasks.filter((t: any) =>
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
            style={{ height: "100vh", overflow: "hidden" }}
        >
            <TopBar onSearchChange={setSearchTerm} />

            <div
                className="container-fluid flex-grow-1"
                style={{ height: "calc(100vh - 120px)", overflow: "hidden" }}
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
