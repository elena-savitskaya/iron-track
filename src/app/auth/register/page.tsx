"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Input,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, KeyRound } from "lucide-react";
import { AuthPageWrapper } from "@/app/auth/wrapper";
import { register } from "@/lib/api";
import { RegisterSchema } from "@/schemas";
import { toastError, toastSuccess } from "@/lib/toast";
import { CommonPasswordInput } from "@/components/common";

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    setLoading(true);

    try {
      const res = await register(data);

      if (res.error) {
        toastError(res.error);
        setLoading(false);
        return;
      }

      if (res.success) {
        toastSuccess(res.success);
        setLoading(false);
        router.push("/auth/signin");
      }
    } catch (e) {
      toastError("Щось пішло не так");
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <AuthPageWrapper
      title="Реєстрація"
      to="/auth/signin"
      text="Вже маєте акаунт?"
      description="Увійдіть тут"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <Mail className="shrink-0 h-6 w-6" />
                  Email
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Введіть email" type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ім’я</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Введіть ім'я" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <KeyRound className="shrink-0 h-6 w-6" />
                  Пароль
                </FormLabel>
                <FormControl>
                  <CommonPasswordInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Підтвердьте пароль</FormLabel>
                <FormControl>
                  <CommonPasswordInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading} className="mt-2">
            {loading ? "Завантаження..." : "Зареєструватися"}
          </Button>
        </form>
      </Form>
    </AuthPageWrapper>
  );
}
