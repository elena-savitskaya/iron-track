"use client";

import * as z from "zod";
import { Workout } from "@/types/workout";
import { signIn } from "next-auth/react";
import { RegisterSchema, LoginSchema } from "@/schemas";

export async function fetchWorkouts(): Promise<Workout[]> {
  const res = await fetch("/api/workouts");
  if (!res.ok) throw new Error("Помилка завантаження тренувань");
  const rawData = await res.json();

  return rawData.map((item: Workout) => ({
    ...item,
    date: new Date(item.date).toLocaleDateString("uk-UA"),
  }));
}

export async function updateWorkoutApi(updated: Workout): Promise<Workout> {
  const res = await fetch(`/api/workouts/${updated._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      exercises: updated.exercises,
      category: updated.category,
    }),
  });

  if (!res.ok) {
    throw new Error("Не вдалося оновити тренування");
  }

  return res.json();
}

export async function deleteWorkoutApi(id: string): Promise<void> {
  const res = await fetch(`/api/workouts/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Не вдалося видалити тренування");
  }
}

export async function getWorkoutById(id: string): Promise<Workout> {
  const res = await fetch(`/api/workouts/${id}`);
  if (!res.ok) throw new Error("Failed to fetch workout");
  return res.json();
}

export async function register(
  data: z.infer<typeof RegisterSchema>
): Promise<{ error?: string; success?: string }> {
  try {
    const res = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      return { error: result.message || "Помилка під час реєстрації" };
    }

    return { success: result.message || "Реєстрація успішна" };
  } catch (err) {
    console.error("Register error:", err);
    return { error: "Сервер недоступний. Спробуйте пізніше." };
  }
}

export const login = async (data: z.infer<typeof LoginSchema>) => {
  const validatedData = LoginSchema.safeParse(data);
  if (!validatedData.success) {
    return { error: "Невірні дані" };
  }

  const { email, password } = validatedData.data;

  const res = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  if (res?.error) {
    return { error: "Невірний email або пароль" };
  }

  return { success: true };
};
