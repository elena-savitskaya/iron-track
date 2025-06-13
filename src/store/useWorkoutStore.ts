import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Set {
  reps: string;
  weight: string;
}

interface Exercise {
  name: string;
  sets: Set[];
  image?: string;
}

interface WorkoutState {
  category: string;
  categoryImage?: string;
  exercises: Exercise[];
  note: string;
  duration: number;
  startTime: number | null;

  setCategory: (category: string, image: string) => void;
  addExercise: (exercise: Exercise) => void;
  setNote: (note: string) => void;
  resetWorkout: () => void;
  setDuration: (duration: number) => void;
  setStartTime: (time: number) => void;
  getElapsed: () => number;
}

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set, get) => ({
      category: "",
      categoryImage: undefined,
      exercises: [],
      note: "",
      duration: 0,
      startTime: null,

      setCategory: (category, image) => set({ category, categoryImage: image }),
      addExercise: (exercise) =>
        set((state) => ({ exercises: [...state.exercises, exercise] })),
      setNote: (note) => set({ note }),
      setDuration: (duration) => set({ duration }),
      setStartTime: (time) => {
        set({ startTime: time });
      },

      resetWorkout: () =>
        set({
          category: "",
          categoryImage: "",
          exercises: [],
          note: "",
          duration: 0,
          startTime: null,
        }),

      getElapsed: () => {
        const { startTime } = get();
        if (!startTime) return 0;
        const now = Date.now();
        return Math.floor((now - startTime) / 1000);
      },
    }),
    {
      name: "workout-storage",
    }
  )
);
