"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { toastSuccess, toastError } from "@/lib/toast";

export const GoogleSignIn = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const res = await signIn("google", { redirect: false });
      if (res?.error) {
        toastError("Помилка входу в Google");
      } else {
        toastSuccess("Вхід успішний!");
        router.push("/");
      }
    } catch (error) {
      toastError("Помилка входу в Google");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={handleGoogleSignIn} disabled={loading}>
        <Image src="/google.svg" alt="google" width={24} height={24} />
        {loading ? "Вхід..." : "Увійти за допомогою Google"}
      </Button>
    </>
  );
};
