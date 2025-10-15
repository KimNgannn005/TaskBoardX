"use client";

import { useState } from "react";
import { useProjects, Task } from "@/context/ProjectContext";
import { useTheme } from "@/context/ThemeContext";
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
    DragStartEvent,
    DragOverlay,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import Column from "@/components/kanbanview/Column";
import { SortableItem } from "@/components/kanbanview/SortableItem";

const columns = [
    { id: "todo", title: "Todo" },
    { id: "in-progress", title: "In Progress" },
    { id: "done", title: "Done" },
];

export default function TaskBoard() {
    const { tasks, setTasks, currentProject } = useProjects();
    const { theme } = useTheme();
    const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragStart = (event: DragStartEvent) =>
        setActiveTaskId(event.active.id as string);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveTaskId(null);
        if (!over) return;

        const draggedTask = tasks.find((t) => t.id === active.id);
        if (!draggedTask) return;

        if (columns.some((c) => c.id === over.id)) {
            setTasks(
                tasks.map((t) =>
                    t.id === draggedTask.id
                        ? { ...t, status: over.id as Task["status"] }
                        : t
                )
            );
            return;
        }

        const overTask = tasks.find((t) => t.id === over.id);
        if (!overTask) return;

        if (draggedTask.status !== overTask.status) {
            setTasks(
                tasks.map((t) =>
                    t.id === draggedTask.id ? { ...t, status: overTask.status } : t
                )
            );
        } else {
            const columnTasks = tasks.filter((t) => t.status === draggedTask.status);
            const oldIndex = columnTasks.findIndex((t) => t.id === draggedTask.id);
            const newIndex = columnTasks.findIndex((t) => t.id === overTask.id);
            if (oldIndex !== newIndex) {
                const newColumnTasks = arrayMove(columnTasks, oldIndex, newIndex);
                const otherTasks = tasks.filter((t) => t.status !== draggedTask.status);
                setTasks([...otherTasks, ...newColumnTasks]);
            }
        }
    };


    const filteredTasks = currentProject
        ? tasks.filter((t) => t.projectId === currentProject.id)
        : [];

    return (
        <section
            id="tasks"
            className={`p-4 sm:p-6 transition-colors  ${
                theme === "light" ? "bg-gray-100" : "bg-gray-900"
            }`}
        >
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {columns.map((col) => (
                        <Column
                            key={col.id}
                            col={col}
                            tasks={filteredTasks}
                            theme={theme}
                            activeTaskId={activeTaskId}
                        />
                    ))}
                </div>

                <DragOverlay>
                    {activeTaskId && (
                        <SortableItem
                            task={tasks.find((t) => t.id === activeTaskId)!}
                            theme={theme}
                        />
                    )}
                </DragOverlay>
            </DndContext>
        </section>
    );
}
