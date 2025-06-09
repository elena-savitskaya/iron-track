import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import WorkoutSchema from "@/models/Workout";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const body = await req.json();
  const newWorkout = await WorkoutSchema.create({
    ...body,
    userEmail: session.user?.email,
  });
  return NextResponse.json(newWorkout, { status: 201 });
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const workoutes = await WorkoutSchema.find({
    userEmail: session.user?.email,
  }).sort({ date: -1 });

  return NextResponse.json(workoutes, { status: 200 });
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  await dbConnect();
  const workout = await WorkoutSchema.findById(id);

  if (!workout || workout.userEmail !== session.user?.email) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  await workout.deleteOne();
  return NextResponse.json({ message: "Workout deleted" }, { status: 200 });
}
