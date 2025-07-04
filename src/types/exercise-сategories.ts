export interface Exercise {
  name: string;
  image?: string;
}

interface ExerciseCategory {
  image?: string;
  exercises: Exercise[];
}

export const exerciseCategories: Record<string, ExerciseCategory> = {
  Плечі: {
    image: "/images/shoulders.png",
    exercises: [
      {
        name: "Підйоми перед собою в сміті",
      },
      { name: "Гантелі сидячи" },
      { name: "Розведення в сторони" },
      {
        name: "Тяга із-за спини в кросовері",
      },
      {
        name: "Розведення в нахилі",
      },
    ],
  },
  Груди: {
    image: "/images/chest.png",
    exercises: [
      {
        name: "Жим лежачи",
      },
      { name: "Розведення в блоці" },
      {
        name: "Розведення гантелями",
      },
    ],
  },
  Ноги: {
    image: "/images/legs.png",
    exercises: [
      { name: "Присід в сміті" },
      { name: "Жим ногами" },
      {
        name: "Підйоми на носки (по черзі)",
      },
    ],
  },
  Спина: {
    image: "/images/back.png",
    exercises: [
      { name: "Станова тяга" },
      { name: "Тяга гантелі в нахилі" },
    ],
  },
  Руки: {
    image: "/images/arms.png",
    exercises: [
      { name: "Французький жим" },
      { name: "Розгинання в блоці" },
      { name: "Підйоми штанги" },
      { name: "Молотки" },
      { name: "Підйоми на лавці" },
    ],
  },
};
