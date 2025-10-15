"use client";

import { Search } from "lucide-react";
import { Task } from "@/context/ProjectContext";
type StatusFilter = "all" | Task["status"];

interface Project {
    id: string;
    name: string;
}
interface TaskHeaderProps {
    theme: "light" | "dark";
    currentProject: Project | null;
    search: string;
    setSearch: (value: string) => void;
    statusFilter: StatusFilter;
    setStatusFilter: (value: StatusFilter) => void;
    setCurrentPage: (page: number) => void;
}

export default function TaskHeader({
                                       theme,
                                       currentProject,
                                       search,
                                       setSearch,
                                       statusFilter,
                                       setStatusFilter,
                                       setCurrentPage,
                                   }: TaskHeaderProps) {
    const handleStatusChange = (value: string) => {
        setStatusFilter(value as StatusFilter);
        setCurrentPage(1);
    };
    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
            <h1
                className={`text-2xl font-bold ${
                    theme === "light" ? "text-gray-800" : "text-white"
                }`}
            >
                Tasks {currentProject ? `(${currentProject.name})` : ""}
            </h1>

            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="Search by title or assignees"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                        className={`w-full p-2 pl-9 rounded-md border text-sm ${
                            theme === "light"
                                ? "bg-white border-gray-300 text-gray-900"
                                : "bg-gray-800 border-gray-600 text-white"
                        }`}
                    />
                    <Search
                        size={18}
                        className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                </div>

                <select
                    value={statusFilter}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className={`p-2 rounded-md border text-sm ${
                        theme === "light"
                            ? "bg-white border-gray-300 text-gray-900"
                            : "bg-gray-800 border-gray-600 text-white"
                    }`}
                >
                    <option value="all">All</option>
                    <option value="todo">Todo</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                </select>
            </div>
        </div>
    );
}
