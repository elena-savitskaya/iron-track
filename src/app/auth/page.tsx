"use client";

import Link from "next/link";

export default function AuthPage() {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-[url('/images/bg.png')] md:bg-background z-0 p-6 flex justify-center">
      <div className="max-w-[1024px] z-10 w-full h-full p-6 rounded-2xl inset-0 bg-gradient-to-t from-black/1 to-transparent backdrop-blur-[1px] shadow-2xl flex flex-col gap-6 border border-white/10">
        <div className="flex-1" />
        <div className="flex flex-col gap-3 flex-1 items-start justify-center">
          <h1 className="text-white text-5xl font-bold">Iron Track</h1>
          <p className="text-lg text-gray-200">
            Трекер тренувань, розроблений для ефективного досягнення ваших
            фітнес-цілей
          </p>
        </div>
        <div className="flex-1" />
        <div className="w-full flex-1 flex items-center justify-center gap-2">
          <Link
            href="/auth/signin"
            className="px-1 py-2 w-full rounded-2xl flex border bg-black text-white hover:bg-black/95 items-center shadow-md justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all"
          >
            Увійти
          </Link>
          <Link
            href="/auth/register"
            className="px-1 py-2 w-full rounded-2xl flex  border bg-white text-black hover:bg-white/95 items-center shadow-md justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all"
          >
            Зареєструватися
          </Link>
        </div>
      </div>
    </div>
  );
}
