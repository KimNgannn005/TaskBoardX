"use client";

import {Task} from "@/context/ProjectContext";
import TaskRow from "./TaskRow";
import {Project} from "@/context/ProjectContext";

interface TaskTableProps {
    theme: "light" | "dark";
    tasks: Task[];
    currentProject: Project | null;
    editingId: string | number | null;
    editForm: Task | Partial<Task>;
    setEditForm: (form: Task | Partial<Task>) => void;
    setEditingId: (id: string | null) => void;
    handleEdit: (task: Task) => void;
    handleDelete: (taskId: string) => void;
    handleSave: () => void;
}

export default function TaskTable({
                                      theme,
                                      tasks,
                                      currentProject,
                                      editingId,
                                      editForm,
                                      setEditForm,
                                      setEditingId,
                                      handleEdit,
                                      handleDelete,
                                      handleSave,
                                  }: TaskTableProps)
{
    return (
        <>
            <div
                className={`hidden md:grid grid-cols-5 gap-4 font-semibold p-3 rounded-md ${
                    theme === "light"
                        ? "bg-gray-100 text-gray-700"
                        : "bg-gray-700 text-gray-200"
                }`}
            >
                <div>Title</div>
                <div>Status</div>
                <div>Assignees</div>
                <div>Due Date</div>
                <div className="text-center">Actions</div>
            </div>

            {!tasks || tasks.length === 0 ? (
                <p
                    className={`p-6 text-center text-lg rounded-md mt-2 ${
                        theme === "light"
                            ? "text-gray-600 bg-gray-50 border border-gray-200/50"
                            : "text-white bg-gray-800 border border-white/10"
                    }`}
                >
                    {currentProject
                        ? "No tasks found in this project"
                        : "Please select a project"}
                </p>
            ) : (
                <div className="mt-2 space-y-4">
                    {tasks.map((t: Task) => (
                        <TaskRow
                            key={t.id}
                            task={t}
                            theme={theme}
                            isEditing={editingId === t.id}
                            editForm={editForm}
                            setEditForm={setEditForm}
                            setEditingId={setEditingId}
                            handleEdit={() => handleEdit(t)}
                            handleDelete={() => handleDelete(t.id)}
                            handleSave={handleSave}
                        />
                    ))}
                </div>
            )}
        </>
    );
}
