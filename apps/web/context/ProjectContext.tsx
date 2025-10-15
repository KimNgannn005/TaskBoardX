"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface Task {
    id: string;
    title: string;
    description?: string;
    status: "todo" | "in-progress" | "done";
    assignees: string[];
    date?: string;
    startDate?: string;
    projectId: string;
}

export interface Project {
    id: string;
    name: string;
    leader: string;
    createdAt: string;
    members: string[];
    description?: string;
    startDate?: string;
    endDate?: string;
}

export interface HistoryItem {
    id: string;
    action:
        | "CREATE"
        | "UPDATE"
        | "DELETE"
        | "REMOVE_MEMBER"
        | "ADD_TASK"
        | "EDIT_TASK"
        | "ADD_ASSIGNEE";
    targetType: "PROJECT" | "TASK" | "MEMBER";
    targetName: string;
    timestamp: string;
    details?: string;
}

interface ProjectContextType {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    addTask: (task: Omit<Task, "id">) => void;
    editTask: (id: string, data: Partial<Task>) => void;
    deleteTask: (id: string) => void;
    addAssignee: (projectId: string, email: string) => void;
    addAssigneeToTask: (taskId: string, email: string) => void;

    projects: Project[];
    addProject: (
        name: string,
        leader: string,
        description?: string,
        startDate?: string,
        endDate?: string
    ) => void;
    editProject: (id: string, data: Partial<Project>) => void;
    deleteProject: (id: string) => void;
    removeMember: (projectId: string, memberName: string) => void;

    currentProject: Project | null;
    setCurrentProject: React.Dispatch<React.SetStateAction<Project | null>>;

    history: HistoryItem[];
    clearAllData: () => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [currentProject, setCurrentProject] = useState<Project | null>(null);
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load từ localStorage khi mount
    useEffect(() => {
        try {
            const storedProjects = localStorage.getItem("projects");
            const storedTasks = localStorage.getItem("tasks");
            const storedHistory = localStorage.getItem("history");

            if (storedProjects) setProjects(JSON.parse(storedProjects));
            if (storedTasks) setTasks(JSON.parse(storedTasks));
            if (storedHistory) setHistory(JSON.parse(storedHistory));
            setIsLoaded(true);
        } catch {
            setIsLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (!isLoaded) return;
        try {
            localStorage.setItem("projects", JSON.stringify(projects));
            localStorage.setItem("tasks", JSON.stringify(tasks));
            localStorage.setItem("history", JSON.stringify(history));
        } catch {
            setIsLoaded(true);
        }
    }, [projects, tasks, history, isLoaded]);

    useEffect(() => {
        if (currentProject) {
            const updated = projects.find((p) => p.id === currentProject.id);
            if (!updated) setCurrentProject(null);
            else if (JSON.stringify(updated) !== JSON.stringify(currentProject)) {
                setCurrentProject(updated);
            }
        }
    }, [projects, currentProject]);

    const addHistory = (item: Omit<HistoryItem, "id">) => {
        setHistory((prev) => [...prev, { ...item, id: Date.now().toString() }]);
    };

    const addTask = (task: Omit<Task, "id">) => {
        if (!task.projectId) return;

        const existing = tasks.find(
            (t) =>
                t.projectId === task.projectId &&
                t.title.trim().toLowerCase() === task.title.trim().toLowerCase()
        );

        if (existing) {
            const updated: Task = {
                ...existing,
                description: task.description ?? existing.description,
                status: task.status ?? existing.status,
                date: task.date ?? existing.date ?? "",
                startDate: task.startDate ?? existing.startDate ?? "",
                assignees: Array.from(new Set([...existing.assignees, ...(task.assignees || [])])),
            };
            setTasks((prev) => prev.map((t) => (t.id === existing.id ? updated : t)));
            addHistory({
                action: "EDIT_TASK",
                targetType: "TASK",
                targetName: updated.title,
                timestamp: new Date().toISOString(),
                details: `Task "${updated.title}" updated instead of duplicated.`,
            });
        } else {
            const newTask: Task = {
                ...task,
                id: Date.now().toString(),
                description: task.description ?? "",
                status: task.status,
                assignees: task.assignees ?? [],
                date: task.date ?? "",
                startDate: task.startDate ?? "",
                projectId: task.projectId ?? "",
            };
            setTasks((prev) => [...prev, newTask]);
            addHistory({
                action: "ADD_TASK",
                targetType: "TASK",
                targetName: newTask.title,
                timestamp: new Date().toISOString(),
                details: `Task "${newTask.title}" added.`,
            });
        }
    };

    const editTask = (id: string, data: Partial<Task>) => {
        const edited = tasks.find((t) => t.id === id);
        if (!edited) return;

        setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)));
        addHistory({
            action: "EDIT_TASK",
            targetType: "TASK",
            targetName: edited.title,
            timestamp: new Date().toISOString(),
            details: `Task "${edited.title}" updated.`,
        });
    };

    const deleteTask = (id: string) => {
        const deleted = tasks.find((t) => t.id === id);
        if (!deleted) return;
        setTasks((prev) => prev.filter((t) => t.id !== id));
        addHistory({
            action: "DELETE",
            targetType: "TASK",
            targetName: deleted.title,
            timestamp: new Date().toISOString(),
            details: `Task "${deleted.title}" deleted.`,
        });
    };

    const addAssignee = (projectId: string, email: string) => {
        setProjects((prev) =>
            prev.map((p) => {
                if (p.id === projectId && !p.members.includes(email)) {
                    const updated = { ...p, members: [...p.members, email] };
                    if (currentProject?.id === projectId) setCurrentProject(updated);
                    addHistory({
                        action: "ADD_ASSIGNEE",
                        targetType: "PROJECT",
                        targetName: email,
                        timestamp: new Date().toISOString(),
                        details: `Member "${email}" added to project "${p.name}".`,
                    });
                    return updated;
                }
                return p;
            })
        );
    };

    const addAssigneeToTask = (taskId: string, email: string) => {
        setTasks((prev) =>
            prev.map((t) =>
                t.id === taskId
                    ? { ...t, assignees: Array.from(new Set([...t.assignees, email])) }
                    : t
            )
        );
    };

    const addProject = (
        name: string,
        leader: string,
        description?: string,
        startDate?: string,
        endDate?: string
    ) => {
        const newProject: Project = {
            id: Date.now().toString(),
            name,
            leader,
            createdAt: new Date().toISOString(),
            members: [],
            description: description ?? "",
            startDate: startDate ?? "",
            endDate: endDate ?? "",
        };
        setProjects((prev) => [...prev, newProject]);
        setCurrentProject(newProject);
        addHistory({
            action: "CREATE",
            targetType: "PROJECT",
            targetName: name,
            timestamp: new Date().toISOString(),
            details: `Project "${name}" created by ${leader}.`,
        });
    };

    const editProject = (id: string, data: Partial<Project>) => {
        setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
        if (currentProject?.id === id)
            setCurrentProject((p) => (p ? { ...p, ...data } : null));
        addHistory({
            action: "UPDATE",
            targetType: "PROJECT",
            targetName: data.name || id,
            timestamp: new Date().toISOString(),
            details: `Project "${data.name || id}" updated.`,
        });
    };

    const deleteProject = (id: string) => {
        const deleted = projects.find((p) => p.id === id);
        if (!deleted) return;
        setProjects((prev) => prev.filter((p) => p.id !== id));
        setTasks((prev) => prev.filter((t) => t.projectId !== id));
        if (currentProject?.id === id) setCurrentProject(null);
        addHistory({
            action: "DELETE",
            targetType: "PROJECT",
            targetName: deleted.name,
            timestamp: new Date().toISOString(),
            details: `Project "${deleted.name}" deleted.`,
        });
    };

    const removeMember = (projectId: string, memberName: string) => {
        setProjects((prev) =>
            prev.map((p) =>
                p.id === projectId
                    ? { ...p, members: p.members.filter((m) => m !== memberName) }
                    : p
            )
        );

        setTasks((prev) =>
            prev.map((t) =>
                t.projectId === projectId
                    ? { ...t, assignees: t.assignees.filter((a) => a !== memberName) }
                    : t
            )
        );

        if (currentProject?.id === projectId) {
            setCurrentProject((p) =>
                p ? { ...p, members: p.members.filter((m) => m !== memberName) } : p
            );
        }

        addHistory({
            action: "REMOVE_MEMBER",
            targetType: "MEMBER",
            targetName: memberName,
            timestamp: new Date().toISOString(),
            details: `Member "${memberName}" removed from project and all tasks.`,
        });
    };

    const clearAllData = () => {
        setProjects([]);
        setTasks([]);
        setHistory([]);
        setCurrentProject(null);
        try {
            localStorage.clear();
        } catch {
            console.log("clear failed");
        }
    };

    return (
        <ProjectContext.Provider
            value={{
                tasks,
                setTasks,
                addTask,
                editTask,
                deleteTask,
                addAssignee,
                addAssigneeToTask,
                projects,
                addProject,
                editProject,
                deleteProject,
                removeMember,
                currentProject,
                setCurrentProject,
                history,
                clearAllData,
            }}
        >
            {children}
        </ProjectContext.Provider>
    );
};

export const useProjects = () => {
    const ctx = useContext(ProjectContext);
    if (!ctx) throw new Error("useProjects must be used within ProjectProvider");
    return ctx;
};