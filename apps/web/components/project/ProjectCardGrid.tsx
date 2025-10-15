"use client";

import React from "react";
import { Project } from "@/context/ProjectContext";
import { useTheme } from "@/context/ThemeContext";

interface ProjectCardGridProps {
    projects: Project[];
    onProjectSelect: (project: Project) => void;
}

export default function ProjectCardGrid({
                                            projects,
                                            onProjectSelect,
                                        }: ProjectCardGridProps) {
    const { theme } = useTheme();

    const formatDate = (dateStr: string) =>
        dateStr ? dateStr.split("-").reverse().join("/") : "";

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.length === 0 ? (
                <div
                    className={`text-center p-8 rounded-lg ${
                        theme === "light" ? "bg-white" : "bg-gray-800"
                    }`}
                >
                    <p className="text-gray-500">No projects created yet.</p>
                </div>
            ) : (
                projects.map((p) => (
                    <div
                        key={p.id}
                        onDoubleClick={() => onProjectSelect(p)}
                        className={`p-6 rounded-xl border cursor-pointer transition-all hover:shadow-md ${
                            theme === "light"
                                ? "bg-white border-gray-200"
                                : "bg-gray-800 border-gray-700"
                        }`}
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold">{p.name}</h3>
                                <p className="text-sm text-gray-500">
                                    Leader: {p.leader}
                                </p>
                                {p.description && (
                                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                                        {p.description}
                                    </p>
                                )}
                                <p className="text-xs text-gray-400 mt-1">
                                    Members: {p.members.length}
                                </p>
                                {(p.startDate || p.endDate) && (
                                    <p className="text-xs text-gray-500 mt-1">
                                        {p.startDate &&
                                            `Start: ${formatDate(p.startDate)}`}
                                        {p.startDate && p.endDate && " | "}
                                        {p.endDate && `End: ${formatDate(p.endDate)}`}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}