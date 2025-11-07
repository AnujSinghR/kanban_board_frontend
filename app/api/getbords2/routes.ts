import { NextResponse } from "next/server";
import { connectToDatabase, User } from "../getboards/routes";

// Example: GET all users
export async function GET() {
  await connectToDatabase();
  const users = await User.find({});
  return NextResponse.json(users);
}