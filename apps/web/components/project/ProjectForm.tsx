"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { Label } from "@workspace/ui/components/label";

interface ProjectFormProps {
    newProjectName: string;
    newProjectLeader: string;
    newProjectDescription: string;
    newProjectStartDate: string;
    newProjectEndDate: string;
    onNameChange: (value: string) => void;
    onLeaderChange: (value: string) => void;
    onDescriptionChange: (value: string) => void;
    onStartDateChange: (value: string) => void;
    onEndDateChange: (value: string) => void;
    onCancel: () => void;
    onSubmit: () => void;
}

export default function ProjectForm({
                                        newProjectName,
                                        newProjectLeader,
                                        newProjectDescription,
                                        newProjectStartDate,
                                        newProjectEndDate,
                                        onNameChange,
                                        onLeaderChange,
                                        onDescriptionChange,
                                        onStartDateChange,
                                        onEndDateChange,
                                        onCancel,
                                        onSubmit,
                                    }: ProjectFormProps) {
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

    return (
        <div
            className={`p-6 rounded-lg border shadow-sm ${
                theme === "light" ? "bg-white border-gray-200" : "bg-gray-800 border-gray-700"
            }`}
        >
            <h3 className="text-lg font-semibold mb-4">Create New Project</h3>
            <div className="grid gap-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="project-name">Project Name *</Label>
                        <Input
                            id="project-name"
                            placeholder="Enter project name"
                            value={newProjectName}
                            onChange={(e) => onNameChange(e.target.value)}
                            className={inputBaseClass}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="project-leader">Leader Name</Label>
                        <Input
                            id="project-leader"
                            placeholder="Enter leader name"
                            value={newProjectLeader}
                            onChange={(e) => onLeaderChange(e.target.value)}
                            className={inputBaseClass}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="project-description">Description</Label>
                    <Textarea
                        id="project-description"
                        placeholder="Enter project description"
                        rows={1}
                        value={newProjectDescription}
                        onChange={(e) => onDescriptionChange(e.target.value)}
                        className={textareaClass}
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="start-date">Start Date</Label>
                        <Input
                            id="start-date"
                            type="date"
                            value={newProjectStartDate}
                            onChange={(e) => onStartDateChange(e.target.value)}
                            className={inputBaseClass}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="end-date">End Date</Label>
                        <Input
                            id="end-date"
                            type="date"
                            value={newProjectEndDate}
                            onChange={(e) => onEndDateChange(e.target.value)}
                            className={inputBaseClass}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-2 justify-end pt-2">
                    <Button variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button onClick={onSubmit} className="bg-blue-600 hover:bg-blue-700 text-white">
                        Create Project
                    </Button>
                </div>
            </div>
        </div>
    );
}