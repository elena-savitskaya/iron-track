"use client";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableFooter,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Button,
} from "@/components/ui";
import { CommonLoader } from "@/components/common";
import { Info } from "lucide-react";
import { calculateTotalWeight } from "@/lib/utils/calculate-total-weight";
import { useWorkouts } from "@/hooks/use-workouts";
import { findPreviousExercise } from "@/lib/utils/find-previous-exercise";
import { WeightWithProgress } from "@/components/common/weight-with-progress";
import Link from "next/link";

export default function WorkoutsPage() {
  const { grouped, selectedCategory, setSelectedCategory, loading } =
    useWorkouts();

  if (loading) return <CommonLoader />;
  if (!grouped.length)
    return (
      <p className="p-4 flex justify-center items-center">
        Тренувань поки немає
      </p>
    );

  return (
    <div className="w-full p-4 flex flex-col gap-3 relative">
      <h1 className="text-xl font-bold">Історія тренувань</h1>
      <Tabs
        defaultValue={selectedCategory}
        value={selectedCategory}
        onValueChange={setSelectedCategory}
      >
        <TabsList>
          {grouped.map((group) => (
            <TabsTrigger key={group.category} value={group.category}>
              {group.category}
            </TabsTrigger>
          ))}
        </TabsList>
        {grouped.map((group) => (
          <TabsContent
            key={group.category}
            value={group.category}
            className="flex flex-col gap-4"
          >
            <Accordion type="multiple">
              {group.workouts.map((workout) => (
                <AccordionItem key={workout._id} value={workout._id}>
                  <AccordionTrigger>
                    <span className="text-left text-md w-full">{workout.date}</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div
                      key={workout._id}
                      className="flex flex-col gap-3 border border-input px-3 py-4 rounded shadow-md bg-background relative"
                    >
                      <ul className="flex flex-col gap-3">
                        {workout.exercises.map((exercise, i) => {
                          const totalWeight = calculateTotalWeight(
                            exercise.sets
                          );

                          return (
                            <li key={i} className="flex flex-col gap-2">
                              <h3 className="font-bold text-[16px]">
                                {i + 1}. {exercise.name}
                              </h3>
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead className="w-[50px]">
                                      №
                                    </TableHead>
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
                                    <TableCell
                                      colSpan={2}
                                      className="font-medium"
                                    >
                                      Загальна вага:
                                    </TableCell>
                                    <TableCell className="font-semibold text-secondary flex">
                                      <WeightWithProgress
                                        currentWeight={totalWeight}
                                        previousWeight={(() => {
                                          const prevExercise =
                                            findPreviousExercise(
                                              group.workouts,
                                              workout,
                                              exercise.name
                                            );
                                          if (!prevExercise) return null;
                                          return calculateTotalWeight(
                                            prevExercise.sets
                                          );
                                        })()}
                                      />
                                    </TableCell>
                                  </TableRow>
                                </TableFooter>
                              </Table>
                            </li>
                          );
                        })}
                      </ul>
                      <Link href={`/workouts/${workout._id}`} className="pt-2">
                        <Button className="w-full" variant="outline">
                          <Info className="shrink-0 h-6 w-6" />
                          Деталі
                        </Button>
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
