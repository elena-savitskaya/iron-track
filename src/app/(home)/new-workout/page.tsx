"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useWorkoutStore } from "@/store/useWorkoutStore";
import { exerciseCategories } from "@/types/exercise-сategories";
import {
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Button,
  Input,
} from "@/components/ui";
import {
  CommonCancelDialog,
  CommonDropdownActions,
  CommonTimer,
} from "@/components/common";
import {
  Trash,
  Trash2,
  X,
  Plus,
  Dumbbell,
  NotebookPen,
  PlusIcon,
} from "lucide-react";
import { calculateTotalWeight } from "@/lib/utils/calculate-total-weight";
import { useWorkoutTimer } from "@/hooks/use-workout-timer";
import { useSets } from "@/hooks/use-sets";
import { useWorkouts } from "@/hooks/use-workouts";

export default function NewWorkoutPage() {
  const router = useRouter();

  const workoutStore = useWorkoutStore();
  const {
    category,
    setCategory,
    addExercise,
    exercises: savedExercises,
    resetWorkout,
    note,
    setNote,
    setDuration,
    setStartTime,
  } = workoutStore;

  const { elapsed } = useWorkoutTimer();

  useEffect(() => {
    setDuration(elapsed);
  }, [elapsed, setDuration]);

  const { sets, setSets, updateSetField, addSet, removeSet } = useSets();

  const [exerciseName, setExerciseName] = useState<string>("");
  const [customExerciseName, setCustomExerciseName] = useState<string>("");

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [editedName, setEditedName] = useState<string>("");
  const [originalName, setOriginalName] = useState<string>("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedSets, setEditedSets] = useState<
    { reps: string; weight: string }[]
  >([]);
  const [originalSets, setOriginalSets] = useState<
    { reps: string; weight: string }[]
  >([]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const nameToSave =
      exerciseName === "custom" ? customExerciseName.trim() : exerciseName;

    if (!nameToSave || sets.length === 0) {
      console.error("Немає назви або підходів");
      return;
    }

    const newExercise = {
      name: nameToSave,
      sets,
    };

    addExercise(newExercise);

    setExerciseName("");
    setCustomExerciseName("");
    setSets([{ reps: "", weight: "" }]);
  };

  const handleFinish = async () => {
    const finalWorkout = {
      category,
      exercises: savedExercises,
      note,
      duration: workoutStore.duration,
    };

    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(finalWorkout),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      console.error("Failed to save workout session");
      return;
    }

    const data = await response.json();

    const workoutId = data.id || data._id;

    if (!workoutId) {
      console.error("Не отримано id тренування з бекенду");
      return;
    }

    resetWorkout();

    router.push(`/workouts/${workoutId}`);
  };

  const startEditing = (index: number) => {
    const ex = savedExercises[index];
    setEditingIndex(index);
    setEditedName(ex.name);
    setOriginalName(ex.name);
    setEditedSets(ex.sets.map((s) => ({ ...s })));
    setOriginalSets(ex.sets.map((s) => ({ ...s })));
  };

  const cancelEditing = () => {
    if (editingIndex !== null) {
      setEditedSets(originalSets.map((s) => ({ ...s })));
      setEditedName(originalName);
    }
    setEditingIndex(null);
  };

  const saveEditing = () => {
    if (editingIndex === null) return;

    const updatedExercises = [...savedExercises];

    if (editedSets.length === 0) {
      updatedExercises.splice(editingIndex, 1);
    } else {
      updatedExercises[editingIndex] = {
        ...updatedExercises[editingIndex],
        name: editedName.trim(),
        sets: editedSets,
      };
    }

    useWorkoutStore.setState({ exercises: updatedExercises });
    setEditingIndex(null);
  };

  const { getExercisesByCategory } = useWorkouts();
  const backendExercises = getExercisesByCategory(category);
  const predefinedExercises = exerciseCategories[category]?.exercises || [];
  const predefinedNames = predefinedExercises.map((ex) => ex.name);

  const extraExercises = backendExercises.filter(
    (name) => !predefinedNames.includes(name)
  );

  const allExercisesToShow = [
    ...predefinedExercises,
    ...extraExercises.map((name) => ({ name })),
  ];

  return (
    <div className="w-full p-4 flex flex-col gap-4 relative">
      <h1 className="text-xl font-bold">Нове тренування</h1>
      {!category ? (
        <div className="flex flex-col gap-3">
          <label className="block text-lg font-medium">Група м’язів</label>
          <Select
            onValueChange={(value) => {
              setStartTime(0);
              const image = exerciseCategories[value]?.image || "";
              setCategory(value, image);
              setStartTime(Date.now());
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Оберіть групу м’язів" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(exerciseCategories).map(([catName, catData]) => (
                <SelectItem key={catName} value={catName}>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-24 rounded-md overflow-hidden">
                      {catData.image && (
                        <Image
                          width={120}
                          height={100}
                          src={catData.image}
                          alt={catName}
                          className="object-cover"
                        />
                      )}
                    </div>
                    <span>{catName}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <label className="block text-lg">Група м’язів:</label>
              <h2 className="text-lg font-semibold">{category}</h2>
            </div>
            <div className="flex items-center justify-center py-2">
              <CommonTimer elapsedSeconds={elapsed} />
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <Select
              value={exerciseName}
              onValueChange={(value) => setExerciseName(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Оберіть вправу" />
              </SelectTrigger>
              <SelectContent>
                {allExercisesToShow.map((exercise) => (
                  <SelectItem key={exercise.name} value={exercise.name}>
                    {exercise.name}
                  </SelectItem>
                ))}
                <SelectItem value="custom">
                  <PlusIcon /> Додати власну вправу
                </SelectItem>
              </SelectContent>
            </Select>

            {exerciseName === "custom" && (
              <Input
                placeholder="Введіть назву вправи"
                value={customExerciseName}
                onChange={(e) => setCustomExerciseName(e.target.value)}
                required
              />
            )}

            {sets.map((set, idx) => (
              <div key={idx} className="flex gap-3 items-center">
                <Input
                  type="number"
                  placeholder="Повторення"
                  value={set.reps}
                  onChange={(e) =>
                    updateSetField(sets, setSets, idx, "reps", e.target.value)
                  }
                  required
                />
                <Input
                  type="number"
                  placeholder="Вага"
                  value={set.weight}
                  onChange={(e) =>
                    updateSetField(sets, setSets, idx, "weight", e.target.value)
                  }
                  required
                />
                <Trash
                  onClick={() => removeSet(sets, setSets, idx)}
                  className="cursor-pointer shrink-0 h-6 w-6"
                />
              </div>
            ))}
            <Button
              type="button"
              onClick={() => addSet(sets, setSets)}
              variant="outline"
              aria-label="Додати підхід"
              title="Додати підхід"
            >
              <Plus className="h-6 w-6" /> Додати підхід
            </Button>
            <Button type="submit" disabled={!exerciseName}>
              Зберегти вправу
            </Button>
          </form>
          <ul className="space-y-2">
            {savedExercises.map((ex, index) => (
              <li
                key={index}
                className="border px-3 py-2 rounded-md flex flex-col gap-2 relative"
              >
                <CommonDropdownActions
                  onEdit={() => startEditing(index)}
                  onDelete={() => {
                    const updatedExercises = savedExercises.filter(
                      (_, i) => i !== index
                    );
                    useWorkoutStore.setState({ exercises: updatedExercises });
                  }}
                />
                {editingIndex === index ? (
                  <div className="flex flex-col gap-3 pt-11">
                    <Input
                      placeholder="Назва вправи"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      required
                    />
                    {editedSets.map((set, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <Input
                          type="number"
                          placeholder="Повторення"
                          value={set.reps}
                          onChange={(e) =>
                            updateSetField(
                              editedSets,
                              setEditedSets,
                              idx,
                              "reps",
                              e.target.value
                            )
                          }
                          required
                        />
                        <Input
                          type="number"
                          placeholder="Вага"
                          value={set.weight}
                          onChange={(e) =>
                            updateSetField(
                              editedSets,
                              setEditedSets,
                              idx,
                              "weight",
                              e.target.value
                            )
                          }
                          required
                        />
                        <Trash2
                          onClick={() =>
                            removeSet(editedSets, setEditedSets, idx)
                          }
                          className="cursor-pointer shrink-0 h-6 w-6"
                        />
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addSet(editedSets, setEditedSets)}
                    >
                      <Plus className="h-6 w-6" /> Додати підхід
                    </Button>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" onClick={saveEditing}>
                        Зберегти
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={cancelEditing}
                      >
                        Відмінити
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 flex-grow">
                    <strong>{ex.name}</strong>
                    <ul className="ml-4 list-disc text-sm">
                      {ex.sets.map((s, idx) => (
                        <li key={idx}>
                          {s.reps} x {s.weight} кг
                        </li>
                      ))}
                    </ul>
                    <p className="text-md">
                      Загальна вага:
                      <span className="font-medium pl-2">
                        {calculateTotalWeight(ex.sets)} кг
                      </span>
                    </p>
                  </div>
                )}
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 pb-4">
            <label className="text-md font-medium flex items-center gap-2">
              <NotebookPen className="shrink-0 h-6 w-6" /> Примітка
            </label>
            <Textarea
              placeholder="Ваші думки про тренування"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
            />
          </div>
          <Button type="button" onClick={handleFinish} size="lg">
            <Dumbbell className="shrink-0 h-6 w-6" />
            Завершити тренування
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setDialogOpen(true);
            }}
            aria-label="Скасувати тренування"
            title="Скасувати тренування"
            size="icon"
            className="absolute top-4 right-4"
          >
            <X className="h-6 w-6 shrink-0" />
          </Button>
          <CommonCancelDialog open={dialogOpen} onOpenChange={setDialogOpen} />
        </div>
      )}
    </div>
  );
}
