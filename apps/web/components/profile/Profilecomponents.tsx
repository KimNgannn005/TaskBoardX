"use client";

import { Card, CardContent } from "@workspace/ui/components/card";
import { useTheme } from "@/context/ThemeContext";
import ProfileHeader from "./ProfileHeader";
import ProfileForm from "./ProfileForm";
import ProfileProjects from "./ProfileProjects";
import { useProfileLogic } from "./useProfileLogic";

export default function Profilecomponents() {
    const { theme } = useTheme();
    const {
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
    } = useProfileLogic();

    const inputClass =
        theme === "light"
            ? "bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
            : "bg-gray-700 border border-gray-600 text-white placeholder-gray-300 focus:ring-blue-400 focus:border-blue-400";

    const cancelBtnClass =
        theme === "light"
            ? "flex-1 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
            : "flex-1 py-2 rounded-lg border border-gray-600 text-gray-200 hover:bg-gray-600";

    return (
        <div
            className={`max-w-4xl mx-auto mt-8 px-4 min-h-screen transition-colors ${
                theme === "light" ? "bg-gray-50" : "bg-gray-900"
            }`}
        >
            <Card
                className={`rounded-xl shadow-sm border transition-colors ${
                    theme === "light"
                        ? "bg-white border-gray-200"
                        : "bg-gray-800 border-gray-700"
                }`}
            >
                <CardContent className="flex flex-col md:flex-row gap-6 p-5">
                    <ProfileHeader
                        profile={profile}
                        form={form}
                        editing={editing}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onAvatarChange={handleAvatarChange}
                    />

                    {editing && (
                        <ProfileForm
                            form={form}
                            newProject={newProject}
                            theme={theme}
                            inputClass={inputClass}
                            cancelBtnClass={cancelBtnClass}
                            onFormChange={handleFormChange}
                            onNewProjectChange={setNewProject}
                            onSave={handleSave}
                            onCancel={handleCancel}
                        />
                    )}

                    {!editing && <ProfileProjects projects={profile.projects} theme={theme} />}
                </CardContent>
            </Card>
        </div>
    );
}