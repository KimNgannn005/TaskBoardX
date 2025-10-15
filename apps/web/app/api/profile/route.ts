import { NextResponse } from "next/server";

export async function GET() {
    const mockProfile = {
        id: "user-1",
        name: "Alice",
        email: "alice@example.com",
        role: "Frontend Developer",
        joinedAt: "2024-12-01T09:00:00Z",
        tasksCompleted: 12,
        hoursLogged: 40,
        efficiency: 0.3,
    };

    return NextResponse.json(mockProfile);
}
