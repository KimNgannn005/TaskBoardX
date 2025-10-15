import { NextResponse } from "next/server";

const projects = [
    { id: "proj-1", name: "Frontend Refactor", createdAt: "2025-04-01T10:00:00Z" },
    { id: "proj-2", name: "Mobile MVP", createdAt: "2025-04-10T12:00:00Z" },
];

export async function GET() {
    return NextResponse.json(projects);
}

export async function POST(req: Request) {
    const body = await req.json();
    const newProject = {
        id: `proj-${Date.now()}`,
        name: body.name,
        createdAt: new Date().toISOString(),
    };
    projects.push(newProject);
    return NextResponse.json(newProject, { status: 201 });
}
