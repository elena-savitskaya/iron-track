export type Workout = {
  _id: string;
  date: string;
  category: string;
  categoryImage?: string;
  exercises: {
    name: string;
    sets: {
      reps: string;
      weight: string;
    }[];
    image?: string;
  }[];
  note?: string;
  duration: number;
  createdAt: string;
};

export interface GroupedByCategory {
  category: string;
  workouts: Workout[];
}
