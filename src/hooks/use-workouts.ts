import { fetchWorkouts } from "@/lib/api";
import { toastError } from "@/lib/toast";
import { GroupedByCategory, Workout } from "@/types/workout";
import { useEffect, useState } from "react";

export function useWorkouts() {
  const [data, setData] = useState<Workout[]>([]);
  const [grouped, setGrouped] = useState<GroupedByCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const workouts = await fetchWorkouts();
        setData(workouts);
      } catch {
        toastError("Не вдалося завантажити тренування");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const groupedByCategory = data.reduce<Record<string, Workout[]>>(
      (acc, workout) => {
        acc[workout.category] = acc[workout.category] || [];
        acc[workout.category].push(workout);
        return acc;
      },
      {}
    );

    const groupedArray = Object.entries(groupedByCategory).map(
      ([category, workouts]) => ({ category, workouts })
    );

    setGrouped(groupedArray);

    if (groupedArray.length > 0 && !selectedCategory) {
      setSelectedCategory(groupedArray[0].category);
    }
  }, [data]);

  const updateSet = (
    workoutId: string,
    exerciseIndex: number,
    setIndex: number,
    field: "reps" | "weight",
    value: string
  ) => {
    setData((prev) => {
      const newData = [...prev];
      const workoutIndex = newData.findIndex((w) => w._id === workoutId);
      if (workoutIndex === -1) return prev;

      const workout = { ...newData[workoutIndex] };
      const exercises = [...workout.exercises];
      const exercise = { ...exercises[exerciseIndex] };
      const sets = [...exercise.sets];

      sets[setIndex] = { ...sets[setIndex], [field]: value };

      exercise.sets = sets;
      exercises[exerciseIndex] = exercise;
      workout.exercises = exercises;
      newData[workoutIndex] = workout;

      return newData;
    });
  };

  const removeSet = (
    workoutId: string,
    exerciseIndex: number,
    setIndex: number
  ) => {
    setData((prev) => {
      const newData = [...prev];
      const workoutIndex = newData.findIndex((w) => w._id === workoutId);
      if (workoutIndex === -1) return prev;

      const workout = { ...newData[workoutIndex] };
      const exercises = [...workout.exercises];
      const exercise = { ...exercises[exerciseIndex] };
      const sets = [...exercise.sets];

      sets.splice(setIndex, 1);

      exercise.sets = sets;
      exercises[exerciseIndex] = exercise;
      workout.exercises = exercises;
      newData[workoutIndex] = workout;

      return newData;
    });
  };

  const addSet = (workoutId: string, exerciseIndex: number) => {
    setData((prev) => {
      const newData = [...prev];
      const workoutIndex = newData.findIndex((w) => w._id === workoutId);
      if (workoutIndex === -1) return prev;

      const workout = { ...newData[workoutIndex] };
      const exercises = [...workout.exercises];
      const exercise = { ...exercises[exerciseIndex] };
      const sets = [...exercise.sets];

      sets.push({ reps: "", weight: "" });

      exercise.sets = sets;
      exercises[exerciseIndex] = exercise;
      workout.exercises = exercises;
      newData[workoutIndex] = workout;

      return newData;
    });
  };

  const getExercisesByCategory = (category: string): string[] => {
    const workoutsForCategory = grouped.find((g) => g.category === category);
    if (!workoutsForCategory) return [];

    const allExercises = workoutsForCategory.workouts.flatMap(
      (workout) => workout.exercises
    );

    const uniqueNames = Array.from(new Set(allExercises.map((ex) => ex.name)));

    return uniqueNames;
  };

  const getSetsFromLastWorkoutForExercise = (
    category: string,
    exerciseName: string
  ) => {
    const workoutsForCategory = grouped.find((g) => g.category === category);
    if (!workoutsForCategory) return [];

    const sortedWorkouts = [...workoutsForCategory.workouts].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    for (let i = sortedWorkouts.length - 1; i >= 0; i--) {
      const workout = sortedWorkouts[i];
      const exercise = workout.exercises.find((ex) => ex.name === exerciseName);
      if (exercise) {
        return exercise.sets;
      }
    }

    return [];
  };

  return {
    data,
    setData,
    grouped,
    selectedCategory,
    setSelectedCategory,
    loading,
    updateSet,
    removeSet,
    addSet,
    getExercisesByCategory,
    getSetsFromLastWorkoutForExercise,
  };
}
