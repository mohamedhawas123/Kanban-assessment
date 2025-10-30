import { FC, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { TaskCard } from "./TaskCard";
import { Task } from "../models/Task";

interface KanbanColumnProps {
    id: string; 
    title: string;
    tasks: Task[];
}

export const KanbanColumn: FC<KanbanColumnProps> = ({ id, title, tasks }) => {
    const INITIAL_VISIBLE = 5;
    const LOAD_MORE = 5;

    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
    const [loadingMore, setLoadingMore] = useState(false);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        const reachedBottom = scrollTop + clientHeight >= scrollHeight - 10;

        if (reachedBottom && !loadingMore && visibleCount < tasks.length) {
            setLoadingMore(true);
            setTimeout(() => {
                setVisibleCount((prev) => prev + LOAD_MORE);
                setLoadingMore(false);
            }, 250);
        }
    };

    const visibleTasks = tasks.slice(0, visibleCount);

    return (
        <div className="col-md-3 h-100">
            <div
                className="rounded-3 bg-white p-4 d-flex flex-column"
                style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <h2 className="mb-4 pe-3 h5 border-end fw-semibold">{title}</h2>

                <Droppable droppableId={id}>
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                                flex: 1,
                                display: "flex",
                                flexDirection: "column",
                                overflow: "hidden",
                            }}
                        >
                            <div
                                className="task-scroll border-end pe-3"
                                onScroll={handleScroll}
                                style={{
                                    flex: 1,
                                    overflowY: "auto",
                                    paddingRight: "4px",
                                }}
                            >
                                {visibleTasks.map((task, index) => (
                                    <Draggable
                                        key={task.id}
                                        draggableId={String(task.id)}
                                        index={index}
                                    >
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <TaskCard task={task} />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}

                                {provided.placeholder}

                                {loadingMore ? (
                                    <div className="text-center text-muted small py-2">
                                        Loading more…
                                    </div>
                                ) : visibleCount < tasks.length ? (
                                    <div className="text-center text-muted small py-2">
                                        Scroll to load more…
                                    </div>
                                ) : tasks.length > 0 ? (
                                    <div className="text-center text-muted small py-2">
                                        No more tasks
                                    </div>
                                ) : (
                                    <div className="text-center text-muted small py-3">
                                        No tasks yet
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </Droppable>
            </div>
        </div>
    );
};