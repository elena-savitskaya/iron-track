"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getWorkoutById, deleteWorkoutApi, updateWorkoutApi } from "@/lib/api";
import { NotebookPen, Clock } from "lucide-react";
import { Workout } from "@/types/workout";
import {
  CommonLoader,
  CommonDropdownActions,
  CommonDeleteDialog,
} from "@/components/common";
import { calculateTotalWeight } from "@/lib/utils/calculate-total-weight";
import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { Plus, Trash2 } from "lucide-react";
import { toastError, toastSuccess } from "@/lib/toast";
import { formatDuration } from "@/lib/utils/format-duration";
import { useWorkouts } from "@/hooks/use-workouts";
import { formatDate } from "@/lib/utils/format-date";

interface WorkoutDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default function WorkoutDetailsPage({
  params,
}: WorkoutDetailsPageProps) {
  const { id } = React.use(params);
  const router = useRouter();

  const { setData, selectedCategory, setSelectedCategory } = useWorkouts();

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [deletingWorkout, setDeletingWorkout] = useState<Workout | null>(null);
  const [editWorkout, setEditWorkout] = useState<Workout | null>(null);

  useEffect(() => {
    const loadWorkout = async () => {
      try {
        const data = await getWorkoutById(id as string);
        setWorkout(data);
      } catch {
        toastError("Не вдалося завантажити тренування");
      }
    };

    loadWorkout();
  }, [id]);

  const startEditing = (workout: Workout) => {
    setEditWorkout(JSON.parse(JSON.stringify(workout)));
    setEditingId(workout._id);
  };

  const updateWorkout = async (updated: Workout) => {
    try {
      const updatedWorkout = await updateWorkoutApi(updated);

      setData((prev) =>
        prev.map((w) => (w._id === updatedWorkout._id ? updatedWorkout : w))
      );

      setWorkout(updatedWorkout);
      setEditingId(null);
      setEditWorkout(null);
      toastSuccess("Оновлено успішно");
    } catch (error) {
      toastError("Помилка при оновленні");
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!deletingWorkout) return;

    try {
      await deleteWorkoutApi(deletingWorkout._id);
      setData((prev) => {
        const updatedData = prev.filter((w) => w._id !== deletingWorkout._id);

        const groupedByCategory: Record<string, Workout[]> = {};
        updatedData.forEach((w) => {
          if (!groupedByCategory[w.category]) {
            groupedByCategory[w.category] = [];
          }
          groupedByCategory[w.category].push(w);
        });
        const groupedArray = Object.entries(groupedByCategory).map(
          ([category, workouts]) => ({ category, workouts })
        );

        if (
          !groupedByCategory[selectedCategory] ||
          groupedByCategory[selectedCategory].length === 0
        ) {
          if (groupedArray.length > 0) {
            setSelectedCategory(groupedArray[0].category);
          } else {
            setSelectedCategory("");
          }
        }

        return updatedData;
      });

      toastSuccess("Видалено успішно");
      setDialogOpen(false);
      setDeletingWorkout(null);
      router.push("/");
    } catch (error) {
      console.error(error);
      toastError("Помилка при видаленні");
    }
  };

  if (!workout) return <CommonLoader />;

  return (
    <div className="w-full p-4 flex flex-col gap-3 relative">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">{workout.category}</h1>
        <CommonDropdownActions
          onEdit={() => startEditing(workout)}
          onDelete={() => {
            setDeletingWorkout(workout);
            setDialogOpen(true);
          }}
          className="flex"
        />
      </div>
      <p className="text-md font-bold text-muted-foreground">
        {formatDate(new Date(workout.date))}
      </p>
      <ul className="flex flex-col gap-3">
        {workout.exercises.map((exercise, i) => {
          const totalWeight = calculateTotalWeight(exercise.sets);
          return (
            <li key={i}>
              <h2 className="font-bold text-md mb-2">
                {i + 1}. {exercise.name}
              </h2>

              {editingId === workout._id ? (
                <div className="flex flex-col gap-3">
                  {editWorkout && editWorkout.exercises[i] && (
                    <>
                      {editWorkout.exercises[i].sets.map((set, j) => (
                        <div key={j} className="flex gap-3 items-center">
                          <Input
                            type="number"
                            placeholder="Повторення"
                            value={set.reps || ""}
                            onChange={(e) => {
                              const newWorkout = structuredClone(editWorkout);
                              newWorkout.exercises[i].sets[j].reps =
                                e.target.value;
                              setEditWorkout(newWorkout);
                            }}
                            required
                          />
                          <Input
                            type="number"
                            placeholder="Вага"
                            value={set.weight || ""}
                            onChange={(e) => {
                              const newWorkout = structuredClone(editWorkout);
                              newWorkout.exercises[i].sets[j].weight =
                                e.target.value;
                              setEditWorkout(newWorkout);
                            }}
                            required
                          />
                          <Trash2
                            onClick={() => {
                              const newWorkout = structuredClone(editWorkout);
                              newWorkout.exercises[i].sets.splice(j, 1);

                              if (newWorkout.exercises[i].sets.length === 0) {
                                newWorkout.exercises.splice(i, 1);
                              }

                              setEditWorkout(newWorkout);
                            }}
                            className="cursor-pointer shrink-0 h-6 w-6"
                          />
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newWorkout = structuredClone(editWorkout);
                          newWorkout.exercises[i].sets.push({
                            reps: "",
                            weight: "",
                          });
                          setEditWorkout(newWorkout);
                        }}
                      >
                        <Plus className="shrink-0 h-6 w-6" /> Додати підхід
                      </Button>
                    </>
                  )}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">№</TableHead>
                      <TableHead>Повторення</TableHead>
                      <TableHead>Вага (кг)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {exercise.sets.map((set, j) => (
                      <TableRow key={j}>
                        <TableCell>{j + 1}</TableCell>
                        <TableCell>{set.reps}</TableCell>
                        <TableCell>{set.weight}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={2} className="font-medium">
                        Загальна вага:
                      </TableCell>
                      <TableCell className="font-semibold text-secondary flex">
                        {totalWeight}
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              )}
            </li>
          );
        })}
      </ul>
      {editingId === workout._id && (
        <div className="flex gap-3">
          <Button onClick={() => editWorkout && updateWorkout(editWorkout)}>
            Зберегти
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setEditWorkout(null);
              setEditingId(null);
            }}
          >
            Скасувати
          </Button>
        </div>
      )}
      {workout.note && (
        <div className="text-sm text-muted-foreground flex items-center gap-6">
          <NotebookPen className="shrink-0 h-6 w-6" />
          {workout.note}
        </div>
      )}
      <div className="text-sm text-muted-foreground flex items-center gap-3">
        <Clock className="shrink-0 h-6 w-6 text-chart-2" />
        {formatDuration(workout.duration)}
      </div>
      <CommonDeleteDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onConfirm={handleDelete}
        onCancel={() => setDialogOpen(false)}
      />
    </div>
  );
}
