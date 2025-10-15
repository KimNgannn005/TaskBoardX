"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { Bell } from "lucide-react";
import { Button } from "@workspace/ui/components/button";

interface ProjectHeaderProps {
    openAdd: boolean;
    onOpenAdd: () => void;
    onHistoryClick: () => void;
    showHistory: boolean;
}

export default function ProjectHeader({
                                          openAdd,
                                          onOpenAdd,
                                          onHistoryClick,
                                          }: ProjectHeaderProps) {
    const { theme } = useTheme();


    const handleNewProject = () => {
        if (!openAdd) {
            // setNewProjectStartDate(today);
        }
        onOpenAdd();
    };

    return (
        <div className="flex justify-between items-center">
            <div className="w-full flex justify-end sm:justify-start">
                <button
                    onClick={handleNewProject}
                    className={`px-4 py-2 font-medium text-sm transition-all rounded-md ${
                        theme === "light"
                            ? "bg-gray-300 text-gray-800 hover:bg-gray-400 disabled:bg-gray-200 disabled:text-gray-400"
                            : "bg-gray-700 text-white hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-600"
                    }`}
                >
                    New Project
                </button>
            </div>

            <Button
                size="icon"
                variant="ghost"
                className="rounded-full hidden sm:flex"
                onClick={onHistoryClick}
            >
                <Bell size={20} />
            </Button>
        </div>
    );
}