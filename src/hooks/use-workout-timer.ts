"use client";
import { useEffect, useState } from "react";
import { useWorkoutStore } from "@/store/useWorkoutStore";

export function useWorkoutTimer() {
  const getElapsed = useWorkoutStore((state) => state.getElapsed);
  const [elapsed, setElapsed] = useState(getElapsed());

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(useWorkoutStore.getState().getElapsed());
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return { elapsed };
}
