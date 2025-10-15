"use client";

import { useState } from "react";
import { useProjects, Task } from "@/context/ProjectContext";
import { useTheme } from "@/context/ThemeContext";
import TaskHeader from "./TaskHeader";
import TaskTable from "./TaskTable";
import TaskPagination from "./TaskPagination";

type StatusFilter = "all" | Task["status"];

export default function ProjectList() {
    const { tasks, setTasks, currentProject } = useProjects();
    const { theme } = useTheme();

    const [editingId, setEditingId] = useState<string | number | null>(null);
    const [editForm, setEditForm] = useState<Partial<Task>>({});
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 3;

    const handleDelete = (id: string | number) => {
        if (confirm("Are you sure you want to delete this task?")) {
            setTasks(tasks.filter((t) => t.id !== id));
        }
    };

    const handleEdit = (task: Task) => {
        setEditingId(task.id);
        setEditForm(task);
    };

    const handleSave = () => {
        if (!editingId) return;
        setTasks(tasks.map((t) => (t.id === editingId ? ({ ...t, ...editForm } as Task) : t)));
        setEditingId(null);
        setEditForm({});
    };

    const projectTasks = currentProject ? tasks.filter((t) => t.projectId === currentProject.id) : [];

    const filteredTasks = projectTasks.filter((t) => {
        const matchSearch =
            t.title.toLowerCase().includes(search.toLowerCase()) ||
            t.assignees.join(" ").toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === "all" ? true : t.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
    const startIndex = (currentPage - 1) * tasksPerPage;
    const paginatedTasks = filteredTasks.slice(startIndex, startIndex + tasksPerPage);

    return (
        <div id="tasks" className={`p-6 ${theme === "light" ? "bg-gray-100" : "bg-gray-900"}`}>
            <TaskHeader
                theme={theme}
                currentProject={currentProject}
                search={search}
                setSearch={setSearch}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                setCurrentPage={setCurrentPage}
            />

            <TaskTable
                theme={theme}
                tasks={paginatedTasks}
                currentProject={currentProject}
                editingId={editingId}
                editForm={editForm}
                setEditForm={setEditForm}
                setEditingId={setEditingId}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleSave={handleSave}
            />

            {totalPages > 1 && (
                <TaskPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                />
            )}
        </div>
    );
}
