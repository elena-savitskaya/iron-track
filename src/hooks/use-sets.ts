import { useState } from "react";

export type Set = { reps: string; weight: string };

export function useSets(initialSets: Set[] = [{ reps: "", weight: "" }]) {
  const [sets, setSets] = useState<Set[]>(initialSets);

  const updateSetField = (
    setsArray: { reps: string; weight: string }[],
    setSetter: React.Dispatch<
      React.SetStateAction<{ reps: string; weight: string }[]>
    >,
    index: number,
    field: "reps" | "weight",
    value: string
  ) => {
    const newSets = [...setsArray];
    newSets[index][field] = value;
    setSetter(newSets);
  };

  const addSet = (
    setsArray: { reps: string; weight: string }[],
    setSetter: React.Dispatch<
      React.SetStateAction<{ reps: string; weight: string }[]>
    >
  ) => {
    setSetter([...setsArray, { reps: "", weight: "" }]);
  };

  const removeSet = (
    setsArray: { reps: string; weight: string }[],
    setSetter: React.Dispatch<
      React.SetStateAction<{ reps: string; weight: string }[]>
    >,
    index: number
  ) => {
    setSetter(setsArray.filter((_, i) => i !== index));
  };

  return {
    sets,
    setSets,
    updateSetField,
    addSet,
    removeSet,
  };
}
