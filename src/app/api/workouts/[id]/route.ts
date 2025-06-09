import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Workout from "@/models/Workout";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function GET(
  req: Request,
  { params }: { params: Promise<Record<string, string>> }
) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const workout = await Workout.findById(id);

  if (!workout) {
    return NextResponse.json({ error: "Workout not found" }, { status: 404 });
  }

  if (workout.userEmail !== session.user?.email) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  return NextResponse.json(workout, { status: 200 });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<Record<string, string>> }
) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const workout = await Workout.findById(id);

  if (!workout) {
    return NextResponse.json({ error: "Workout not found" }, { status: 404 });
  }

  if (workout.userEmail !== session.user?.email) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  const body = await req.json();

  const updatedWorkout = await Workout.findByIdAndUpdate(id, body, {
    new: true,
  });

  return NextResponse.json(updatedWorkout);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<Record<string, string>> }
) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const workout = await Workout.findById(id);

  if (!workout) {
    return NextResponse.json({ error: "Workout not found" }, { status: 404 });
  }

  if (workout.userEmail !== session.user?.email) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  await workout.deleteOne();

  return NextResponse.json({ message: "Workout deleted" }, { status: 200 });
}
