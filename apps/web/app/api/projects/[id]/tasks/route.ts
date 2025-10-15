import { NextResponse } from "next/server";

const tasks = [
    {
        id: "task-101",
        projectId: "proj-1",
        title: "Setup Zustand store",
        description: "Implement global state for modal and current projects",
        status: "IN_PROGRESS",
        assignee: { id: "user-1", name: "Alice" },
        dueDate: "2025-05-10",
    },
    {
        id: "task-102",
        projectId: "proj-1",
        title: "Build Table View",
        description: "Use React Table to render task list with sorting",
        status: "TODO",
        assignee: { id: "user-2", name: "Bob" },
        dueDate: "2025-05-11",
    },
];


export async function GET(
    _req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;
    const projectTasks = tasks.filter((t) => t.projectId === id);

    return NextResponse.json(projectTasks);
}
