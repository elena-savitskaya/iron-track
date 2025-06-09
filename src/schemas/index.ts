import * as z from "zod";

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

export const RegisterSchema = z
  .object({
    email: z.string().email({
      message: "Будь ласка, введіть коректну електронну адресу",
    }),
    name: z.string().min(1, {
      message: "Імʼя є обовʼязковим",
    }),
    password: z.string().regex(passwordRegex, {
      message:
        "Пароль має містити щонайменше 6 символів, включаючи хоча б одну літеру та одну цифру",
    }),
    passwordConfirmation: z
      .string()
      .min(1, { message: "Підтвердження пароля є обовʼязковим" }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    path: ["passwordConfirmation"],
    message: "Паролі не співпадають",
  });

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Будь ласка, введіть коректну електронну адресу",
  }),
  password: z.string().min(1, {
    message: "Будь ласка, введіть пароль",
  }),
});
