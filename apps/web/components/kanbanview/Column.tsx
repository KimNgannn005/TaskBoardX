"use client";

import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { SortableItem } from "./SortableItem";
import { Task } from "@/context/ProjectContext";


interface ColumnProps {
    col: { id: string; title: string };
    tasks: Task[];
    theme: string;
    activeTaskId: string | null;
}

export default function Column({ col, tasks, theme, activeTaskId }: ColumnProps) {
    const { setNodeRef, isOver } = useDroppable({ id: col.id });
    const columnTasks = tasks.filter((t) => t.status === col.id);

    return (
        <div
            ref={setNodeRef}
            className={`p-3 rounded-lg border transition-colors w-full
        ${theme === "light" ? "bg-white border-gray-200" : "bg-gray-800 border-gray-700"}
        ${isOver ? "ring-2 ring-blue-400" : ""}
      `}
        >
            <h2
                className={`font-semibold text-base mb-3 ${
                    theme === "light" ? "text-gray-900" : "text-white"
                }`}
            >
                {col.title}
            </h2>

            <SortableContext
                items={columnTasks.map((t) => t.id)}
                strategy={verticalListSortingStrategy}
            >
                <div className="space-y-3">
                    {columnTasks.length > 0 ? (
                        columnTasks.map((task) => (
                            <SortableItem
                                key={task.id}
                                task={task}
                                theme={theme}
                                isActive={activeTaskId === task.id}
                            />
                        ))
                    ) : (
                        <div
                            className={`flex items-center justify-center h-20 rounded-md border-2 border-dashed text-sm
                ${
                                theme === "light"
                                    ? "border-gray-300 text-gray-500 bg-gray-50"
                                    : "border-gray-500 text-gray-400 bg-gray-600"
                            }
              `}
                        >
                            Drop here
                        </div>
                    )}
                </div>
            </SortableContext>
        </div>
    );
}
