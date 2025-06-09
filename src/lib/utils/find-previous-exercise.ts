import { Workout } from "@/types/workout";

export function findPreviousExercise(
  allWorkouts: Workout[],
  currentWorkout: Workout,
  exerciseName: string
): Workout["exercises"][0] | null {
  const previousWorkouts = allWorkouts
    .filter((w) => w.date < currentWorkout.date)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  for (const workout of previousWorkouts) {
    const prevExercise = workout.exercises.find(
      (ex) => ex.name === exerciseName
    );
    if (prevExercise) {
      return prevExercise;
    }
  }
  return null;
}
