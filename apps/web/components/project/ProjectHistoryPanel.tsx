"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { HistoryItem } from "@/context/ProjectContext";
import { Bell, X } from "lucide-react";
import { Button } from "@workspace/ui/components/button";

interface ProjectHistoryPanelProps {
    history: HistoryItem[];
    onClose: () => void;
}

export default function ProjectHistoryPanel({
                                                history,
                                                onClose,
                                            }: ProjectHistoryPanelProps) {
    const { theme } = useTheme();

    return (
        <div
            className={`fixed bottom-20 right-6 z-50 w-96 max-h-[400px] overflow-y-auto rounded-xl shadow-xl border p-4 ${
                theme === "light"
                    ? "bg-white border-gray-200"
                    : "bg-gray-800 border-gray-700"
            }`}
        >
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Bell size={18} /> History
                </h2>
                <Button variant="ghost" size="icon" onClick={onClose}>
                    <X size={16} />
                </Button>
            </div>
            {history.length === 0 ? (
                <p className={`text-sm ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
                    No actions yet.
                </p>
            ) : (
                history
                    .slice()
                    .reverse()
                    .map((h, index) => (
                        <div
                            key={`${h.id}-${index}`}
                            className={`p-3 mb-2 rounded-lg text-sm ${
                                theme === "light"
                                    ? "bg-gray-100"
                                    : "bg-gray-700/50"
                            }`}
                        >
                            <p className={`font-medium ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>
                                {h.action} {h.targetType}
                            </p>
                            {h.details && (
                                <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                                    {h.details}
                                </p>
                            )}
                            <p className={`text-xs mt-1 ${theme === "light" ? "text-gray-400" : "text-gray-500"}`}>
                                {new Date(h.timestamp).toLocaleString()}
                            </p>
                        </div>
                    ))
            )}
        </div>
    );
}