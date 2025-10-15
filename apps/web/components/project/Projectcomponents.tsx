"use client";

import React, { useMemo, useState } from "react";
import { useProjects, Project } from "@/context/ProjectContext";
import { useTheme } from "@/context/ThemeContext";
import ProjectHeader from "./ProjectHeader";
import ProjectForm from "./ProjectForm";
import ProjectCardGrid from "./ProjectCardGrid";
import ProjectDetailModal from "./ProjectDetailModal";
import ProjectHistoryPanel from "./ProjectHistoryPanel";

export default function ProjectsComponents() {
    const {
        projects,
        addProject,
        editProject,
        deleteProject,
        removeMember,
        addAssignee,
        tasks,
        setCurrentProject,
        history,
    } = useProjects();

    const { theme } = useTheme();

    const today = new Date().toISOString().slice(0, 10);

    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [openDetail, setOpenDetail] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState("");
    const [editLeader, setEditLeader] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editStartDate, setEditStartDate] = useState("");
    const [editEndDate, setEditEndDate] = useState("");

    const [inviteAssignee, setInviteAssignee] = useState("");
    const [openAdd, setOpenAdd] = useState(false);
    const [newProjectName, setNewProjectName] = useState("");
    const [newProjectLeader, setNewProjectLeader] = useState("");
    const [newProjectDescription, setNewProjectDescription] = useState("");
    const [newProjectStartDate, setNewProjectStartDate] = useState("");
    const [newProjectEndDate, setNewProjectEndDate] = useState("");

    const [showHistory, setShowHistory] = useState(false);

    const openDetails = (p: Project) => {
        setSelectedProject(p);
        setCurrentProject(p);
        setOpenDetail(true);
        setIsEditing(false);
        setEditName(p.name);
        setEditLeader(p.leader);
        setEditDescription(p.description || "");
        setEditStartDate(p.startDate || "");
        setEditEndDate(p.endDate || "");
        setInviteAssignee("");
    };

    const handleKickMember = (member: string) => {
        if (!selectedProject) return;
        if (confirm(`Remove ${member} from ${selectedProject.name}?`)) {
            removeMember(selectedProject.id, member);
            const updatedProject = projects.find((p) => p.id === selectedProject.id);
            if (updatedProject) {
                setSelectedProject(updatedProject);
            }
        }
    };

    const handleAddAssignee = () => {
        if (!selectedProject || !inviteAssignee.trim()) return;
        addAssignee(selectedProject.id, inviteAssignee.trim());
        setInviteAssignee("");

        setTimeout(() => {
            const updatedProject = projects.find((p) => p.id === selectedProject.id);
            if (updatedProject) {
                setSelectedProject({
                    ...updatedProject,
                    members: [...updatedProject.members, inviteAssignee.trim()],
                });
            }
        }, 100);
    };

    const handleSaveEdit = () => {
        if (!selectedProject) return;
        editProject(selectedProject.id, {
            name: editName,
            leader: editLeader,
            description: editDescription,
            startDate: editStartDate,
            endDate: editEndDate,
        });
        setIsEditing(false);
        const updatedProject = projects.find((p) => p.id === selectedProject.id);
        if (updatedProject) {
            setSelectedProject(updatedProject);
        }
    };

    const handleDeleteProject = (id: string) => {
        if (confirm("Delete this project?")) {
            deleteProject(id);
            setOpenDetail(false);
        }
    };

    const handleAddProject = () => {
        if (!newProjectName.trim()) return;
        addProject(
            newProjectName.trim(),
            newProjectLeader.trim(),
            newProjectDescription.trim(),
            newProjectStartDate,
            newProjectEndDate
        );
        setNewProjectName("");
        setNewProjectLeader("");
        setNewProjectDescription("");
        setNewProjectStartDate("");
        setNewProjectEndDate("");
        setOpenAdd(false);
    };

    const projectTasks = useMemo(() => {
        if (!selectedProject) return [];
        return tasks.filter((t) => t.projectId === selectedProject.id);
    }, [tasks, selectedProject]);

    return (
        <div
            className={`min-h-screen p-10 transition-colors ${
                theme === "light" ? "bg-gray-50 text-gray-900" : "bg-gray-900 text-gray-100"
            }`}
        >
            <div className="max-w-7xl mx-auto space-y-8">
                <ProjectHeader
                    openAdd={openAdd}
                    onOpenAdd={() => {
                        if (!openAdd) {
                            setNewProjectStartDate(today);
                        }
                        setOpenAdd(!openAdd);
                    }}
                    onHistoryClick={() => setShowHistory(!showHistory)}
                    showHistory={showHistory}
                />

                {openAdd && (
                    <ProjectForm
                        newProjectName={newProjectName}
                        newProjectLeader={newProjectLeader}
                        newProjectDescription={newProjectDescription}
                        newProjectStartDate={newProjectStartDate}
                        newProjectEndDate={newProjectEndDate}
                        onNameChange={setNewProjectName}
                        onLeaderChange={setNewProjectLeader}
                        onDescriptionChange={setNewProjectDescription}
                        onStartDateChange={setNewProjectStartDate}
                        onEndDateChange={setNewProjectEndDate}
                        onCancel={() => setOpenAdd(false)}
                        onSubmit={handleAddProject}
                    />
                )}

                <ProjectCardGrid
                    projects={projects}
                    onProjectSelect={openDetails}
                />
            </div>

            {openDetail && selectedProject && (
                <ProjectDetailModal
                    selectedProject={selectedProject}
                    isEditing={isEditing}
                    editName={editName}
                    editLeader={editLeader}
                    editDescription={editDescription}
                    editStartDate={editStartDate}
                    editEndDate={editEndDate}
                    inviteAssignee={inviteAssignee}
                    projectTasks={projectTasks}
                    onEditToggle={setIsEditing}
                    onNameChange={setEditName}
                    onLeaderChange={setEditLeader}
                    onDescriptionChange={setEditDescription}
                    onStartDateChange={setEditStartDate}
                    onEndDateChange={setEditEndDate}
                    onInviteAssigneeChange={setInviteAssignee}
                    onSaveEdit={handleSaveEdit}
                    onDeleteProject={handleDeleteProject}
                    onKickMember={handleKickMember}
                    onAddAssignee={handleAddAssignee}
                    onClose={() => setOpenDetail(false)}
                />
            )}

            {showHistory && (
                <ProjectHistoryPanel
                    history={history}
                    onClose={() => setShowHistory(false)}
                />
            )}
        </div>
    );
}