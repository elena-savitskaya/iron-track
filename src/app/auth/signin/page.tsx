"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { AuthPageWrapper } from "@/app/auth/wrapper";
import { login } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
import { Mail, KeyRound } from "lucide-react";
import { toastError } from "@/lib/toast";
import { CommonPasswordInput } from "@/components/common";

export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setLoading(true);
    const res = await login(data);

    if (res?.error) {
      toastError(res.error);
      setLoading(false);
      return;
    }

    setLoading(false);
    router.push("/");
  };

  return (
    <AuthPageWrapper
      title="Вхід"
      to="/auth/register"
      text="Немає акаунту?"
      description="Зареєструйтесь тут"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <Mail className="shrink-0 h-4 w-4" />
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <KeyRound className="shrink-0 h-4 w-4" />
                  Пароль
                </FormLabel>
                <FormControl>
                  <CommonPasswordInput field={field} placeholder="******" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading} className="mt-2">
            {loading ? "Завантаження..." : "Увійти"}
          </Button>
        </form>
      </Form>
    </AuthPageWrapper>
  );
}
