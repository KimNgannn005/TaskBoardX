import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Card, CardContent } from "@workspace/ui/components/card";

type Profile = {
    name: string;
    email: string;
    dob: string;
    phone?: string;
    role: string;
    avatar?: string;
    projects: { id: string; name: string; totalTasks: number; position: string }[];
};

type ProfileFormProps = {
    form: Profile;
    newProject: string;
    theme: string;
    inputClass: string;
    cancelBtnClass: string;
    onFormChange: (field: keyof Omit<Profile, 'projects' | 'avatar'>, value: string) => void;
    onNewProjectChange: (value: string) => void;
    onSave: () => void;
    onCancel: () => void;
};

export default function ProfileForm({
                                        form,
                                        newProject,
                                        theme,
                                        inputClass,
                                        cancelBtnClass,
                                        onFormChange,
                                        onNewProjectChange,
                                        onSave,
                                        onCancel,
                                    }: ProfileFormProps) {
    return (
        <Card
            className={`w-full mt-3 p-4 border shadow-sm transition-colors ${
                theme === "light" ? "bg-white border-gray-200" : "bg-gray-800 border-gray-700"
            }`}
        >
            <CardContent className="flex flex-col gap-3">
                <Input
                    className={inputClass}
                    placeholder="Name"
                    value={form.name || ""}
                    onChange={(e) => onFormChange("name", e.target.value)}
                />
                <Input
                    className={inputClass}
                    placeholder="Email"
                    type="email"
                    value={form.email || ""}
                    onChange={(e) => onFormChange("email", e.target.value)}
                />
                <Input
                    className={inputClass}
                    placeholder="Date of Birth"
                    type="date"
                    value={form.dob || ""}
                    onChange={(e) => onFormChange("dob", e.target.value)}
                />
                <Input
                    className={inputClass}
                    placeholder="Phone Number"
                    type="tel"
                    value={form.phone || ""}
                    onChange={(e) => onFormChange("phone", e.target.value)}
                />
                <Input
                    className={inputClass}
                    placeholder="Role"
                    value={form.role || ""}
                    onChange={(e) => onFormChange("role", e.target.value)}
                />
                <Input
                    className={inputClass}
                    placeholder="Project Name"
                    value={newProject}
                    onChange={(e) => onNewProjectChange(e.target.value)}
                />

                <div className="flex gap-2 mt-2">
                    <Button
                        variant="default"
                        className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium"
                        onClick={onSave}
                    >
                        Save
                    </Button>
                    <Button variant="outline" className={cancelBtnClass} onClick={onCancel}>
                        Cancel
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}