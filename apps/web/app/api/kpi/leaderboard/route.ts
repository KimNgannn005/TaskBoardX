import { NextResponse } from "next/server";

const leaderboard = [
    { user: "Alice", tasksCompleted: 12, hoursLogged: 40, efficiency: 0.3 },
    { user: "Bob", tasksCompleted: 8, hoursLogged: 20, efficiency: 0.4 },
];

export async function GET() {
    return NextResponse.json(leaderboard);
}
