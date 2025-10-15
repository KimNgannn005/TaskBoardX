import { Card } from "@workspace/ui/components/card";

type Project = {
    id: string;
    name: string;
    totalTasks: number;
    position: string;
};

type ProfileProjectsProps = {
    projects: Project[];
    theme: string;
};

export default function ProfileProjects({ projects, theme }: ProfileProjectsProps) {
    return (
        <div className="flex-1 space-y-2">
            <p className="text-lg font-semibold">Projects</p>
            {projects.length === 0 ? (
                <p
                    className={`text-sm ${
                        theme === "light" ? "text-gray-500" : "text-gray-400"
                    }`}
                >
                    No projects assigned
                </p>
            ) : (
                <div className="grid grid-cols-1 gap-2">
                    {projects.map((proj) => (
                        <Card
                            key={proj.id}
                            className={`p-3 rounded-lg border transition-shadow hover:shadow-md ${
                                theme === "light"
                                    ? "border-gray-100 bg-gray-50"
                                    : "border-gray-700 bg-gray-700/50"
                            }`}
                        >
                            <p className="font-medium">{proj.name}</p>
                            <p
                                className={`text-sm ${
                                    theme === "light" ? "text-gray-500" : "text-gray-300"
                                }`}
                            >
                                Position: {proj.position} • Tasks: {proj.totalTasks}
                            </p>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}