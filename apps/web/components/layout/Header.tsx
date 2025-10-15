"use client";

import { useState, useMemo } from "react";
import { Task, useProjects } from "@/context/ProjectContext";
import { useTheme } from "@/context/ThemeContext";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@workspace/ui/components/select";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";

const fadeInStyle = `
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
.animate-fade-in {
  animation: fadeIn 0.2s ease-out;
}
`;

export default function Header() {
    const { addTask, editTask, tasks, projects, currentProject, setCurrentProject } = useProjects();
    const { theme } = useTheme();
    const [open, setOpen] = useState(false);
    const today = new Date().toISOString().split("T")[0];

    const [form, setForm] = useState<Omit<Task, "id">>({
        title: "",
        description: "",
        status: "todo",
        assignees: [],
        date: "",
        projectId: "",
    });
    const [endDate, setEndDate] = useState("");

    const suggestions = useMemo(() => {
        if (!currentProject || !form.title.trim()) return [];
        return tasks
            .filter(
                (t) =>
                    t.projectId === currentProject.id &&
                    t.title.toLowerCase().includes(form.title.toLowerCase()) &&
                    t.title.trim() !== ""
            )
            .slice(0, 5);
    }, [tasks, form.title, currentProject]);

    const handleSubmit = () => {
        if (!currentProject) {
            alert("Please select a project first");
            return;
        }

        if (form.title.trim() === "") {
            alert("Task title is required");
            return;
        }

        const projectEnd = currentProject.endDate ? new Date(currentProject.endDate) : null;
        const chosenEnd = endDate ? new Date(endDate) : null;

        if (projectEnd && chosenEnd && chosenEnd > projectEnd) {
            alert("End date cannot be later than the project end date!");
            return;
        }

        const existing = tasks.find(
            (t) =>
                t.projectId === currentProject.id &&
                t.title.trim().toLowerCase() === form.title.trim().toLowerCase()
        );

        if (existing) {
            editTask(existing.id, {
                ...existing,
                description: form.description || existing.description,
                assignees: Array.from(new Set([...existing.assignees, ...form.assignees])),
                date: form.date || existing.date,
            });
            alert("Updated existing task with same title ✅");
        } else {
            addTask({
                ...form,
                projectId: currentProject.id,
                date: form.date || today,
            });
        }

        setForm({
            title: "",
            description: "",
            status: "todo",
            assignees: [],
            date: "",
            projectId: "",
        });
        setEndDate("");
        setOpen(false);
    };

    return (
        <>
            <style>{fadeInStyle}</style>

            <header className="w-full px-4 sm:px-6 md:px-10 py-16 sm:py-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

                <div className="w-full sm:w-auto">
                    <Select
                        value={currentProject?.id || ""}
                        onValueChange={(value) => {
                            const selected = projects.find((p) => p.id === value);
                            setCurrentProject(selected || null);
                            setForm({
                                ...form,
                                assignees: [],
                                projectId: selected?.id || "",
                            });
                        }}
                    >
                        <SelectTrigger
                            className={`w-full sm:w-64 h-11 px-4 rounded-md border transition-colors
        ${theme === "light"
                                ? "bg-white border-gray-300 text-gray-800 hover:bg-gray-50"
                                : "bg-gray-800 border-gray-600 text-gray-100 hover:bg-gray-700"
                            }`}
                        >
                            <SelectValue placeholder="Choose a project..." />
                        </SelectTrigger>

                        <SelectContent
                            position="popper"
                            className={`z-[9999] rounded-md border shadow-lg backdrop-blur-sm
        ${theme === "light"
                                ? "bg-white border-gray-200 text-gray-800"
                                : "bg-gray-900 border-gray-700 text-gray-100"
                            }`}
                        >
                            {projects.length === 0 && (
                                <div
                                    className={`p-3 text-sm text-center ${theme === "light" ? "text-gray-500" : "text-gray-400"
                                    }`}
                                >
                                    No projects available
                                </div>
                            )}

                            {projects.map((project) => (
                                <SelectItem
                                    key={project.id}
                                    value={project.id}
                                    className={`py-3 px-4 cursor-pointer transition-colors
                ${theme === "light"
                                        ? "hover:bg-gray-100 text-gray-800"
                                        : "hover:bg-gray-700 text-gray-100"
                                    }`}
                                >
                                    {project.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>


                <div className="w-full sm:w-auto flex justify-end">
                    <button
                        type="button"
                        onClick={() => setOpen(true)}
                        disabled={!currentProject}
                        title={!currentProject ? "Please select a project first" : ""}
                        className={`px-5 py-2 font-medium transition-all text-sm rounded-md
                        ${theme === "light"
                            ? "bg-gray-300 text-gray-800 hover:bg-gray-400 disabled:bg-gray-200 disabled:text-gray-400"
                            : "bg-gray-700 text-white hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-600"
                        }`}
                    >
                        New Task
                    </button>
                </div>
            </header>


            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 sm:px-0">
                    <div
                        className={`w-full max-w-md rounded-2xl shadow-lg p-6 animate-fade-in
                        ${theme === "light" ? "bg-white" : "bg-gray-800"}`}
                    >
                        <h3
                            className={`text-lg font-semibold mb-4
                            ${theme === "light" ? "text-gray-800" : "text-gray-100"}`}
                        >
                            Create New Task
                        </h3>

                        {currentProject && (
                            <div
                                className={`border-t pt-3 text-xs rounded-md mb-4
                                ${theme === "light"
                                    ? "text-gray-600 border-gray-200"
                                    : "text-gray-300 border-gray-700"
                                }`}
                            >
                                <p><strong>Leader:</strong> {currentProject.leader || "—"}</p>
                                <p><strong>Start Date:</strong> {today}</p>
                                <p><strong>End Date:</strong> {currentProject.endDate || "Not set"}</p>
                            </div>
                        )}

                        {/* Title Input */}
                        <div className="relative mb-3">
                            <Input
                                type="text"
                                placeholder="Title *"
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                className={`${theme === "light"
                                    ? "bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                    : "bg-gray-700 border-gray-600 text-gray-100 focus:ring-2 focus:ring-blue-400"
                                }`}
                            />
                            {suggestions.length > 0 && (
                                <div
                                    className={`absolute z-10 mt-1 w-full rounded-md shadow-md border text-sm overflow-hidden
                                    ${theme === "light"
                                        ? "bg-white border-gray-200"
                                        : "bg-gray-700 border-gray-600"
                                    }`}
                                >
                                    {suggestions.map((s) => (
                                        <div
                                            key={s.id}
                                            onClick={() =>
                                                setForm({
                                                    ...form,
                                                    title: s.title,
                                                    description: s.description,
                                                })
                                            }
                                            className={`px-3 py-2 cursor-pointer truncate
                                            ${theme === "light"
                                                ? "hover:bg-gray-100 text-gray-800"
                                                : "hover:bg-gray-600 text-gray-200"
                                            }`}
                                        >
                                            {s.title}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        <Textarea
                            placeholder="Description"
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            rows={3}
                            className={`mb-3 resize-none ${theme === "light"
                                ? "bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500"
                                : "bg-gray-700 border-gray-600 text-gray-100 focus:ring-2 focus:ring-blue-400"
                            }`}
                        />

                        {/* Assignees */}
                        {currentProject && (
                            <div className="mb-4">
                                <label
                                    className={`block text-sm mb-2 font-medium ${theme === "light" ? "text-gray-700" : "text-gray-300"
                                    }`}
                                >
                                    Assign to:
                                </label>

                                <div
                                    className={`border rounded-md p-3 flex flex-wrap gap-2 transition-colors ${theme === "light" ? "bg-white border-gray-300" : "bg-gray-700 border-gray-600"
                                    }`}
                                >
                                    {currentProject.members.map((member) => {
                                        const selected = form.assignees.includes(member);
                                        return (
                                            <button
                                                key={member}
                                                type="button"
                                                onClick={() =>
                                                    setForm({
                                                        ...form,
                                                        assignees: selected
                                                            ? form.assignees.filter((a) => a !== member)
                                                            : [...form.assignees, member],
                                                    })
                                                }
                                                className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-150 focus:outline-none
                                                    ${selected
                                                    ? "bg-gray-400 text-black "
                                                    : "bg-gray-300 text-black hover:bg-gray-400"
                                                }`}
                                            >
                                                {member}
                                            </button>
                                        );
                                    })}

                                    {currentProject.members.length === 0 && (
                                        <span
                                            className={`text-sm italic ${theme === "light" ? "text-gray-500" : "text-gray-400"
                                            }`}
                                        >
                                            No members available
                                        </span>
                                    )}
                                </div>

                                {form.assignees.length > 0 && (
                                    <div
                                        className={`mt-2 text-sm ${theme === "light" ? "text-gray-700" : "text-gray-300"
                                        }`}
                                    >
                                        Invite Assignee:{" "}
                                        <span className="font-medium">
                                            {form.assignees.join(", ")}
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Dates */}
                        <div className="flex flex-col sm:flex-row gap-3 mb-4">
                            <div className="flex flex-col w-full">
                                <label className={`text-sm mb-1 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                                    Create Date
                                </label>
                                <Input
                                    type="date"
                                    value={today}
                                    disabled
                                    className={`${theme === "light"
                                        ? "bg-gray-100 border-gray-300 text-gray-700"
                                        : "bg-gray-700 border-gray-600 text-gray-300"
                                    }`}
                                />
                            </div>

                            <div className="flex flex-col w-full">
                                <label className={`text-sm mb-1 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                                    Deadline
                                </label>
                                <Input
                                    type="date"
                                    value={endDate}
                                    min={today}
                                    max={currentProject?.endDate || ""}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className={`${theme === "light"
                                        ? "bg-white border-gray-300 text-gray-900"
                                        : "bg-gray-700 border-gray-600 text-gray-100"
                                    }`}
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-2 mt-3">
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className={`px-4 py-2 rounded-md font-medium text-sm
                                ${theme === "light"
                                    ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                    : "bg-gray-700 text-white hover:bg-gray-600"
                                }`}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm"
                            >
                                {suggestions.some(
                                    (s) =>
                                        s.title.trim().toLowerCase() === form.title.trim().toLowerCase()
                                )
                                    ? "Update"
                                    : "Create"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
