import { useState, useEffect, ChangeEvent } from "react";
import { toast } from "react-hot-toast";

type Project = {
    id: string;
    name: string;
    totalTasks: number;
    position: string;
};

type Profile = {
    name: string;
    email: string;
    dob: string;
    phone?: string;
    role: string;
    avatar?: string;
    projects: Project[];
};

const defaultProfile: Profile = {
    name: "Alice Johnson",
    email: "alice@example.com",
    dob: "1990-05-15",
    phone: "0123456789",
    role: "Frontend Developer",
    avatar: "/default-avatar.png",
    projects: [
        { id: "p1", name: "TaskBoardX", totalTasks: 32, position: "Lead" },
        { id: "p2", name: "EcoTrack", totalTasks: 18, position: "Contributor" },
    ],
};

export function useProfileLogic() {
    const [profile, setProfile] = useState<Profile>(defaultProfile);
    const [form, setForm] = useState<Profile>(defaultProfile);
    const [editing, setEditing] = useState(false);
    const [newProject, setNewProject] = useState("");

    useEffect(() => {
        const stored = localStorage.getItem("profile");
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setProfile(parsed);
                setForm(parsed);
            } catch {
                console.warn("Invalid profile data in localStorage");
            }
        }
    }, []);

    const saveToLocal = (p: Profile) => {
        localStorage.setItem("profile", JSON.stringify(p));
    };

    const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            setForm({ ...form, avatar: reader.result as string });
        };
        reader.readAsDataURL(file);
    };

    const handleEdit = () => {
        setEditing(true);
        setForm(profile);
    };

    const handleSave = () => {
        const updated = { ...form };

        if (newProject.trim()) {
            const proj: Project = {
                id: Date.now().toString(),
                name: newProject.trim(),
                totalTasks: 0,
                position: "Contributor",
            };
            updated.projects = [...updated.projects, proj];
            setNewProject("");
        }

        setProfile(updated);
        setForm(updated);
        saveToLocal(updated);
        setEditing(false);
        toast.success("Profile updated");
    };

    const handleCancel = () => {
        setForm(profile);
        setNewProject("");
        setEditing(false);
    };

    const handleDelete = () => {
        const emptyProfile: Profile = {
            name: "",
            email: "",
            dob: "",
            phone: "",
            role: "",
            avatar: "/Avatar.jpg",
            projects: [],
        };
        setProfile(emptyProfile);
        setForm(emptyProfile);
        saveToLocal(emptyProfile);
        toast.error("Profile deleted");
    };

    const handleFormChange = (
        field: keyof Omit<Profile, "projects" | "avatar">,
        value: string
    ) => {
        setForm({ ...form, [field]: value });
    };

    return {
        profile,
        form,
        editing,
        newProject,
        setNewProject,
        handleAvatarChange,
        handleEdit,
        handleSave,
        handleCancel,
        handleDelete,
        handleFormChange,
    };
}