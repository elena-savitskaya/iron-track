"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Cell,
  LabelProps,
} from "recharts";
import { calculateTotalWeight } from "@/lib/utils/calculate-total-weight";
import { Workout } from "@/types/workout";
import { getRandomChartColor } from "@/lib/utils/get-random-color";

type CommonExerciseChartProps = {
  name: string;
  workouts: Workout[];
};

export function CommonExerciseChart({
  name,
  workouts,
}: CommonExerciseChartProps) {
  const rawData = workouts.map((workout) => {
    const exercise = workout.exercises.find((e) => e.name === name);
    if (!exercise) return null;

    return {
      date: workout.date,
      weight: calculateTotalWeight(exercise.sets),
      fill: getRandomChartColor(),
    };
  });

  const data = rawData.filter((d): d is NonNullable<typeof d> => d !== null);

  if (!data.length) return null;

  const CenteredLabel = ({
    x = 0,
    y = 0,
    width = 0,
    height = 0,
    value,
  }: LabelProps) => {
    const centerX = Number(x) + Number(width) / 2;
    const centerY = Number(y) + Number(height) / 2;

    return (
      <text
        x={centerX}
        y={centerY}
        transform={`rotate(-90, ${centerX}, ${centerY})`}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="var(--secondary)"
        style={{ fontSize: 14 }}
      >
        {value}
      </text>
    );
  };

  return (
    <div className="flex flex-col gap-3 border p-4 rounded shadow">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="weight">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
            <LabelList dataKey="weight" content={<CenteredLabel />} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
