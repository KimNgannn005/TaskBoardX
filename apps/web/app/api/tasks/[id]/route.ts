import { NextResponse } from "next/server";

interface Task {
    id: string;
    [key: string]: unknown;
}

let tasks: Task[] = [];

export async function PATCH(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {

    const { id } = await context.params;

    const body = (await req.json()) as Record<string, unknown>;

    let task = tasks.find((t) => t.id === id);
    if (!task) {
        return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    task = { ...task, ...body };
    tasks = tasks.map((t) => (t.id === id ? task : t));

    return NextResponse.json(task);
}
