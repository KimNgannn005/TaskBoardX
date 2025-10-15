import { NextResponse } from "next/server";

const users = [
    { id: "user-1", name: "Alice" },
    { id: "user-2", name: "Bob" },
    { id: "user-3", name: "Charlie" },
];

export async function GET() {
    return NextResponse.json(users);
}
