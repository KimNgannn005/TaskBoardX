"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "@/context/ProjectContext";

interface SortableItemProps {
    task: Task;
    theme: string;
    isActive?: boolean;
}

export function SortableItem({ task, theme, isActive }: SortableItemProps) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
        useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition || "transform 200ms ease, opacity 200ms ease",
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`p-3 rounded-lg border select-none cursor-grab active:cursor-grabbing
        transition-all duration-200 ease-in-out
        ${isActive ? "ring-2 ring-blue-500" : ""}
        ${isDragging ? "opacity-70 scale-105 shadow-lg" : ""}
        ${
                theme === "light"
                    ? "bg-gray-200 border-gray-300"
                    : "bg-gray-700 border-gray-600"
            }
      `}
        >

            <h3
                className={`font-semibold text-base mb-1 ${
                    theme === "light" ? "text-gray-900" : "text-white"
                }`}
            >
                {task.title}
            </h3>

            {task.assignees && (
                <p
                    className={`text-sm mb-2 ${
                        theme === "light" ? "text-gray-700" : "text-gray-300"
                    }`}
                >
                    {task.assignees}
                </p>
            )}

            <div
                className={`flex justify-end text-xs ${
                    theme === "light" ? "text-gray-600" : "text-gray-400"
                }`}
            >
                <span>{task.date || "N/A"}</span>
            </div>
        </div>
    );
}
