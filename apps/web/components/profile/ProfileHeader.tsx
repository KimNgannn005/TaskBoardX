import Image from "next/image";
import { Button } from "@workspace/ui/components/button";
import { Pencil, Trash2, Camera } from "lucide-react";
import { ChangeEvent } from "react";

type Profile = {
    name: string;
    email: string;
    dob: string;
    phone?: string;
    role: string;
    avatar?: string;
    projects: { id: string; name: string; totalTasks: number; position: string }[];
};

type ProfileHeaderProps = {
    profile: Profile;
    form: Profile;
    editing: boolean;
    onEdit: () => void;
    onDelete: () => void;
    onAvatarChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function ProfileHeader({
                                          profile,
                                          form,
                                          editing,
                                          onEdit,
                                          onDelete,
                                          onAvatarChange,
                                      }: ProfileHeaderProps) {
    return (
        <div className="flex flex-col items-center md:items-start gap-4 w-full md:w-1/3">
            <div className="relative">
                <Image
                    src={form.avatar || "/Avatar.jpg"}
                    alt="Avatar"
                    width={112}
                    height={112}
                    className="w-28 h-28 rounded-full border border-gray-300 object-cover"
                />
                {editing && (
                    <label className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 cursor-pointer hover:bg-blue-700">
                        <Camera size={16} className="text-white" />
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={onAvatarChange}
                        />
                    </label>
                )}
            </div>

            {!editing && (
                <div className="flex flex-col gap-1 items-center md:items-start mt-2">
                    <p className="text-xl font-semibold">{profile.name}</p>
                    <p className="text-gray-500 text-sm">{profile.email}</p>
                    <p className="text-gray-500 text-sm">DOB: {profile.dob}</p>
                    <p className="text-gray-500 text-sm">Phone: {profile.phone || "-"}</p>
                    <p className="text-gray-500 text-sm">Role: {profile.role}</p>
                </div>
            )}

            {!editing && (
                <div className="flex flex-row gap-4 mt-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onEdit}
                        className="text-blue-600 hover:text-blue-800"
                    >
                        <Pencil size={18} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onDelete}
                        className="text-red-600 hover:text-red-800"
                    >
                        <Trash2 size={18} />
                    </Button>
                </div>
            )}
        </div>
    );
}