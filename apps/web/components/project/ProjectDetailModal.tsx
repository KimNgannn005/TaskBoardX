"use client";

import React from "react";
import { Project } from "@/context/ProjectContext";
import { useTheme } from "@/context/ThemeContext";
import { Edit2, Trash2, X, Check } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";

interface Task {
    id: string;
    title: string;
    description?: string;
    status: "todo" | "in-progress" | "done";
    assignees: string[];
    date?: string;
}

interface ProjectDetailModalProps {
    selectedProject: Project;
    isEditing: boolean;
    editName: string;
    editLeader: string;
    editDescription: string;
    editStartDate: string;
    editEndDate: string;
    inviteAssignee: string;
    projectTasks: Task[];
    onEditToggle: (value: boolean) => void;
    onNameChange: (value: string) => void;
    onLeaderChange: (value: string) => void;
    onDescriptionChange: (value: string) => void;
    onStartDateChange: (value: string) => void;
    onEndDateChange: (value: string) => void;
    onInviteAssigneeChange: (value: string) => void;
    onSaveEdit: () => void;
    onDeleteProject: (id: string) => void;
    onKickMember: (member: string) => void;
    onAddAssignee: () => void;
    onClose: () => void;
}

export default function ProjectDetailModal({
                                               selectedProject,
                                               isEditing,
                                               editName,
                                               editLeader,
                                               editDescription,
                                               editStartDate,
                                               editEndDate,
                                               inviteAssignee,
                                               projectTasks,
                                               onEditToggle,
                                               onNameChange,
                                               onLeaderChange,
                                               onDescriptionChange,
                                               onStartDateChange,
                                               onEndDateChange,
                                               onInviteAssigneeChange,
                                               onSaveEdit,
                                               onDeleteProject,
                                               onKickMember,
                                               onAddAssignee,
                                               onClose,
                                           }: ProjectDetailModalProps) {
    const { theme } = useTheme();

    const inputBaseClass = `h-9 text-sm rounded border transition-colors ${
        theme === "light"
            ? "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400"
            : "bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-400"
    }`;

    const textareaClass = `p-2 text-sm rounded border transition-colors ${
        theme === "light"
            ? "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400"
            : "bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-400"
    }`;

    const rawDateClass = `p-2 w-full rounded border text-sm transition-colors ${
        theme === "light"
            ? "bg-white border-gray-200 text-gray-900"
            : "bg-gray-800 border-gray-700 text-gray-100"
    }`;

    const formatDate = (dateStr: string): string =>
        dateStr ? dateStr.split("-").reverse().join("/") : "";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-8">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />
            <div
                className={`relative w-full max-w-6xl rounded-2xl shadow-2xl p-8 border transition-all max-h-[90vh] overflow-y-auto ${
                    theme === "light"
                        ? "bg-white border-gray-200"
                        : "bg-gray-800 border-gray-700"
                }`}
            >
                <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                        {isEditing ? (
                            <div className="space-y-2">
                                <input
                                    className={`${rawDateClass.replace(
                                        "w-full",
                                        ""
                                    )} w-full`}
                                    placeholder="Project name"
                                    value={editName}
                                    onChange={(e) =>
                                        onNameChange(e.target.value)
                                    }
                                />
                                <input
                                    className={`${rawDateClass.replace(
                                        "w-full",
                                        ""
                                    )} w-full`}
                                    placeholder="Leader"
                                    value={editLeader}
                                    onChange={(e) =>
                                        onLeaderChange(e.target.value)
                                    }
                                />
                                <textarea
                                    className={`${textareaClass} resize-none`}
                                    placeholder="Description"
                                    rows={3}
                                    value={editDescription}
                                    onChange={(e) =>
                                        onDescriptionChange(e.target.value)
                                    }
                                />
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="text-xs text-gray-500 mb-1 block">
                                            Start Date
                                        </label>
                                        <input
                                            type="date"
                                            className={rawDateClass}
                                            value={editStartDate}
                                            onChange={(e) =>
                                                onStartDateChange(
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 mb-1 block">
                                            End Date
                                        </label>
                                        <input
                                            type="date"
                                            className={rawDateClass}
                                            value={editEndDate}
                                            onChange={(e) =>
                                                onEndDateChange(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <h2 className="text-xl font-semibold">
                                    {selectedProject.name}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    Leader: {selectedProject.leader}
                                </p>
                                {selectedProject.description && (
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                        {selectedProject.description}
                                    </p>
                                )}
                                {(selectedProject.startDate ||
                                    selectedProject.endDate) && (
                                    <p className="text-xs text-gray-500 mt-2">
                                        {selectedProject.startDate &&
                                            `Start: ${formatDate(
                                                selectedProject.startDate
                                            )}`}
                                        {selectedProject.startDate &&
                                            selectedProject.endDate &&
                                            " | "}
                                        {selectedProject.endDate &&
                                            `End: ${formatDate(
                                                selectedProject.endDate
                                            )}`}
                                    </p>
                                )}
                            </>
                        )}
                    </div>

                    <div className="flex gap-2">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={onSaveEdit}
                                    className="text-green-600 hover:text-green-700 transition-colors"
                                >
                                    <Check size={18} />
                                </button>
                                <button
                                    onClick={() => onEditToggle(false)}
                                    className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => onEditToggle(true)}
                                    className="p-2 rounded-md text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                                >
                                    <Edit2 size={18} />
                                </button>
                                <button
                                    onClick={() =>
                                        onDeleteProject(selectedProject.id)
                                    }
                                    className="p-2 rounded-md text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </>
                        )}
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div
                        className={`rounded-lg p-4 border ${
                            theme === "light"
                                ? "bg-gray-50 border-gray-200"
                                : "bg-gray-900 border-gray-700"
                        }`}
                    >
                        <h4 className="font-semibold mb-3">
                            Assignees ({selectedProject.members.length})
                        </h4>
                        <div className="space-y-2 mb-4">
                            {selectedProject.members.length === 0 ? (
                                <p className="text-sm text-gray-500 text-center py-4">
                                    No assignees yet
                                </p>
                            ) : (
                                selectedProject.members.map((m) => (
                                    <div
                                        key={m}
                                        className={`flex justify-between items-center text-sm p-2 rounded ${
                                            theme === "light"
                                                ? "bg-white"
                                                : "bg-gray-800"
                                        }`}
                                    >
                                        <span>{m}</span>
                                        <button
                                            onClick={() =>
                                                onKickMember(m)
                                            }
                                            className="text-xs text-red-500 hover:underline px-2 py-1"
                                        >
                                            Kick
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="border-t pt-3">
                            <Label
                                htmlFor="add-assignee"
                                className="mb-2 block"
                            >
                                Add Assignee
                            </Label>
                            <Input
                                id="add-assignee"
                                value={inviteAssignee}
                                onChange={(e) =>
                                    onInviteAssigneeChange(e.target.value)
                                }
                                onKeyDown={(e) =>
                                    e.key === "Enter" && onAddAssignee()
                                }
                                placeholder="Enter assignee name"
                                className={`${inputBaseClass} mb-2`}
                            />
                            <Button
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                onClick={onAddAssignee}
                            >
                                Add Assignee
                            </Button>
                        </div>
                    </div>

                    {/* Tasks */}
                    <div className="md:col-span-2">
                        <h4 className="font-semibold mb-4">
                            Tasks ({projectTasks.length})
                        </h4>
                        {projectTasks.length === 0 ? (
                            <p className="text-sm text-gray-500">
                                No tasks yet.
                            </p>
                        ) : (
                            <div className="space-y-3">
                                {projectTasks.map((t) => (
                                    <div
                                        key={t.id}
                                        className={`rounded-lg p-4 border ${
                                            theme === "light"
                                                ? "bg-gray-50 border-gray-200"
                                                : "bg-gray-900 border-gray-700"
                                        }`}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <p className="font-medium">
                                                {t.title}
                                            </p>
                                            <span
                                                className={`text-xs px-2 py-1 rounded ${
                                                    t.status === "done"
                                                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                                        : t.status ===
                                                        "in-progress"
                                                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                                            : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                                                }`}
                                            >
                                                {t.status}
                                            </span>
                                        </div>
                                        {t.description && (
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                                {t.description}
                                            </p>
                                        )}
                                        <div className="flex justify-between items-center text-sm">
                                            <p className="text-gray-500">
                                                {t.assignees.length > 0 ? (
                                                    <>
                                                        <span className="font-medium text-gray-700 dark:text-gray-300">
                                                            Assignees:
                                                        </span>{" "}
                                                        {t.assignees.join(
                                                            ", "
                                                        )}
                                                    </>
                                                ) : (
                                                    <i className="text-gray-400">
                                                        No assignees
                                                    </i>
                                                )}
                                            </p>
                                            {t.date && (
                                                <span className="text-xs text-gray-400">
                                                    Due: {t.date}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}