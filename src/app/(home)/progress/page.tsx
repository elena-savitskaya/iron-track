"use client";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui";
import { useWorkouts } from "@/hooks/use-workouts";
import { CommonLoader, CommonExerciseChart } from "@/components/common";

export default function ProgressWorkoutPage() {
  const {
    grouped,
    loading,
    selectedCategory,
    setSelectedCategory,
    getExercisesByCategory,
  } = useWorkouts();

  if (loading) return <CommonLoader />;
  if (!grouped.length)
    return (
      <p className="p-4 flex justify-center items-center">
        Тренувань поки немає
      </p>
    );

  return (
    <div className="w-full p-4 flex flex-col gap-4">
      <h1 className="text-xl font-bold">Прогрес тренувань</h1>
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList>
          {grouped.map((group) => (
            <TabsTrigger key={group.category} value={group.category}>
              {group.category}
            </TabsTrigger>
          ))}
        </TabsList>

        {grouped.map((group) => {
          const exerciseNames = getExercisesByCategory(group.category);

          return (
            <TabsContent key={group.category} value={group.category}>
              <Accordion type="multiple">
                {exerciseNames.map((exerciseName) => (
                  <AccordionItem key={exerciseName} value={exerciseName}>
                    <AccordionTrigger>{exerciseName}</AccordionTrigger>
                    <AccordionContent>
                      <CommonExerciseChart
                        name={exerciseName}
                        workouts={group.workouts}
                      />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
