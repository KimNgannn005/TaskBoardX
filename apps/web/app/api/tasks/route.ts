import { NextResponse } from "next/server";

interface Assignee {
    id: string;
    name: string;
}

interface Task {
    id: string;
    title: string;
    description?: string;
    status: string;
    assignee: Assignee;
    projectId: string;
    dueDate?: string;
}

interface CreateTaskRequest {
    title: string;
    description?: string;
    status?: string;
    assigneeId: string;
    assigneeName?: string;
    projectId: string;
    dueDate?: string;
}

const tasks: Task[] = [];

export async function POST(req: Request) {
    const body = (await req.json()) as CreateTaskRequest;

    const newTask: Task = {
        id: `task-${Date.now()}`,
        title: body.title,
        description: body.description,
        status: body.status || "TODO",
        assignee: {
            id: body.assigneeId,
            name: body.assigneeName || "Unknown",
        },
        projectId: body.projectId,
        dueDate: body.dueDate,
    };

    tasks.push(newTask);

    return NextResponse.json(newTask, { status: 201 });
}