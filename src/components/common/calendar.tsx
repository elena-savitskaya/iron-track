"use client";

import { useState } from "react";
import Link from "next/link";
import "react-day-picker/style.css";
import { uk } from "date-fns/locale";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { useWorkouts } from "@/hooks/use-workouts";
import { CommonLoader } from "@/components/common";
import { ChevronRight } from "lucide-react";
import { formatDate } from "@/lib/utils/format-date";
import { cn } from "@/lib/utils/utils";

type CommonCalendarProps = {
  onLinkClick: () => void;
};

export function CommonCalendar({ onLinkClick }: CommonCalendarProps) {
  const { data, loading } = useWorkouts();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  if (loading) return <CommonLoader />;
  if (!data.length)
    return (
      <p className="flex justify-center items-center">
        Календар поки недоступний
      </p>
    );

  const formattedDate = selectedDate ? formatDate(selectedDate) : null;

  const workoutsForDate = data.filter(
    (workout) => workout.date === formattedDate
  );

  const workoutDates = data.map((workout) => {
    const [day, month, year] = workout.date.split(".");
    return new Date(Number(year), Number(month) - 1, Number(day));
  });

  const defaultClassNames = getDefaultClassNames();

  return (
    <div className="flex flex-col gap-3">
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        locale={uk}
        showOutsideDays
        modifiers={{ hasWorkout: workoutDates }}
        classNames={{
          root: `${defaultClassNames.root} shadow-lg p-3`,
          day: `group ${defaultClassNames.day}`,
          caption_label: `text-base`,
          month_caption: `text-md font-bold pb-4`,
          months: "w-full flex justify-center",
          month: "w-fit",
          table: "mx-auto",
          month_grid: "w-fit mx-auto",
        }}
        className="custom-dropdown-root"
        components={{
          DayButton: ({ day, modifiers, ...buttonProps }) => {
            const isWorkoutDay = modifiers.hasWorkout;

            return (
              <button
                {...buttonProps}
                onClick={() => setSelectedDate(day.date)}
                className="relative w-7 h-7 m-1 rounded-full flex items-center justify-center bg-muted/50 group-aria-selected:bg-primary group-aria-selected:text-primary-foreground"
              >
                <span
                  className={cn(
                    "w-full h-full flex items-center justify-center rounded-full",
                    isWorkoutDay ? "bg-positive" : ""
                  )}
                >
                  {day.date.getDate()}
                </span>
              </button>
            );
          },
        }}
      />

      {formattedDate && workoutsForDate.length > 0 ? (
        <div className="p-4 shadow flex flex-col gap-3">
          {workoutsForDate.map((workout) => (
            <Link
              onClick={onLinkClick}
              href={`/workouts/${workout._id}`}
              key={workout._id}
              className="w-full flex items-center gap-2 justify-between pb-3 border-b border-input last:border-b-0 last:pb-0"
            >
              <div className="pl-2 font-medium">{workout.category}</div>
              <ChevronRight className="w-4 h-4" />
            </Link>
          ))}
        </div>
      ) : (
        <p className="p-4 text-sm text-muted-foreground">
          Немає тренувань {formattedDate}
        </p>
      )}
    </div>
  );
}
