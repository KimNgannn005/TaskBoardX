"use client";

import { Pencil, Trash2, Check, X } from "lucide-react";
import { Task } from "@/context/ProjectContext";

interface TaskRowProps {
    task: Task;
    theme: "light" | "dark";
    isEditing: boolean;
    editForm: Partial<Task>;
    setEditForm: (form: Partial<Task>) => void;
    setEditingId: (id: string | null) => void;
    handleEdit: () => void;
    handleDelete: () => void;
    handleSave: () => void;
}

const STATUS_TEXT: Record<Task["status"], string> = {
    todo: "Todo",
    "in-progress": "In Progress",
    done: "Done",
};

export default function TaskRow({
                                    task: t,
                                    theme,
                                    isEditing,
                                    editForm,
                                    setEditForm,
                                    setEditingId,
                                    handleEdit,
                                    handleDelete,
                                    handleSave,
                                }: TaskRowProps) {
    const getStatusText = (status: Task["status"]): string => {
        return STATUS_TEXT[status];
    };

    return (
        <div
            className={`p-4 rounded-lg border ${
                theme === "light"
                    ? "bg-white border-gray-200/60"
                    : "bg-gray-800 border-white/10"
            }`}
        >

            <div className="hidden md:grid grid-cols-5 gap-4 items-center">
                <div>
                    {isEditing ? (
                        <input
                            value={editForm.title || ""}
                            onChange={(e) =>
                                setEditForm({ ...editForm, title: e.target.value })
                            }
                            className="w-full p-2 rounded border text-sm"
                        />
                    ) : (
                        <span className="font-semibold">{t.title}</span>
                    )}
                </div>

                <div>
                    {isEditing ? (
                        <select
                            value={editForm.status || "todo"}
                            onChange={(e) =>
                                setEditForm({
                                    ...editForm,
                                    status: e.target.value as Task["status"],
                                })
                            }
                            className="w-full p-2 rounded border text-sm"
                        >
                            <option value="todo">Todo</option>
                            <option value="in-progress">In Progress</option>
                            <option value="done">Done</option>
                        </select>
                    ) : (
                        <span>{getStatusText(t.status)}</span>
                    )}
                </div>

                <div>
                    {isEditing ? (
                        <input
                            value={editForm.assignees?.join(", ") || ""}
                            onChange={(e) => {
                                const vals = e.target.value
                                    .split(",")
                                    .map((v) => v.trim());
                                setEditForm({ ...editForm, assignees: vals });
                            }}
                            className="w-full p-2 rounded border text-sm"
                        />
                    ) : (
                        <span>{t.assignees.join(", ")}</span>
                    )}
                </div>

                <div>
                    {isEditing ? (
                        <input
                            type="date"
                            value={editForm.date || ""}
                            onChange={(e) =>
                                setEditForm({ ...editForm, date: e.target.value })
                            }
                            className="w-full p-2 rounded border text-sm"
                        />
                    ) : (
                        <span className="text-gray-500">{t.date}</span>
                    )}
                </div>

                <div className="flex items-center justify-center gap-2">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleSave}
                                className="p-2 rounded-md text-green-600 dark:text-green-400"
                            >
                                <Check size={18} />
                            </button>
                            <button
                                onClick={() => setEditingId(null)}
                                className="p-2 rounded-md text-gray-600 dark:text-gray-400"
                            >
                                <X size={18} />
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handleEdit}
                                className="p-2 rounded-md text-blue-600 dark:text-blue-400"
                            >
                                <Pencil size={18} />
                            </button>
                            <button
                                onClick={handleDelete}
                                className="p-2 rounded-md text-red-600 dark:text-red-400"
                            >
                                <Trash2 size={18} />
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile view */}
            <div className="md:hidden flex flex-col gap-2 text-sm">
                <div>
                    <span className="font-semibold block">
                        {isEditing ? (
                            <input
                                value={editForm.title || ""}
                                onChange={(e) =>
                                    setEditForm({ ...editForm, title: e.target.value })
                                }
                                className="w-full p-2 rounded border text-sm"
                            />
                        ) : (
                            t.title
                        )}
                    </span>
                </div>

                <div>
                    <span className="text-gray-500">Status: </span>
                    {isEditing ? (
                        <select
                            value={editForm.status || "todo"}
                            onChange={(e) =>
                                setEditForm({
                                    ...editForm,
                                    status: e.target.value as Task["status"],
                                })
                            }
                            className="w-full p-2 rounded border text-sm"
                        >
                            <option value="todo">Todo</option>
                            <option value="in-progress">In Progress</option>
                            <option value="done">Done</option>
                        </select>
                    ) : (
                        getStatusText(t.status)
                    )}
                </div>

                <div>
                    <span className="text-gray-500">Assignees: </span>
                    {isEditing ? (
                        <input
                            value={editForm.assignees?.join(", ") || ""}
                            onChange={(e) => {
                                const vals = e.target.value
                                    .split(",")
                                    .map((v) => v.trim());
                                setEditForm({ ...editForm, assignees: vals });
                            }}
                            className="w-full p-2 rounded border text-sm"
                        />
                    ) : (
                        t.assignees.join(", ")
                    )}
                </div>

                <div>
                    <span className="text-gray-500">Due: </span>
                    {isEditing ? (
                        <input
                            type="date"
                            value={editForm.date || ""}
                            onChange={(e) =>
                                setEditForm({ ...editForm, date: e.target.value })
                            }
                            className="w-full p-2 rounded border text-sm"
                        />
                    ) : (
                        <span className="text-gray-400">{t.date}</span>
                    )}
                </div>

                <div className="flex justify-end gap-2 mt-1">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleSave}
                                className="p-2 rounded-md text-green-600 dark:text-green-400"
                            >
                                <Check size={18} />
                            </button>
                            <button
                                onClick={() => setEditingId(null)}
                                className="p-2 rounded-md text-gray-600 dark:text-gray-400"
                            >
                                <X size={18} />
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handleEdit}
                                className="p-2 rounded-md text-blue-600 dark:text-blue-400"
                            >
                                <Pencil size={18} />
                            </button>
                            <button
                                onClick={handleDelete}
                                className="p-2 rounded-md text-red-600 dark:text-red-400"
                            >
                                <Trash2 size={18} />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}