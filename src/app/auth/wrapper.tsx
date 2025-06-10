"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { GoogleSignIn } from "@/components/auth/google-signin";
import { LayoutLogo } from "@/app/layout/logo";

type AuthPageWrapperProps = {
  title: string;
  children: ReactNode;
  to: string;
  text: string;
  description: string;
};

export const AuthPageWrapper = ({
  title,
  children,
  to,
  text,
  description,
}: AuthPageWrapperProps) => {
  return (
    <div className="text-foreground w-full p-6 flex flex-col gap-4 ">
      <div className="z-10 w-full h-full p-4 rounded-2xl shadow-xl flex flex-col gap-6 border border-gray-300">
        <LayoutLogo />
        <h1 className="text-xl font-bold text-center pt-2">{title}</h1>
        {children}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-300/50"></div>
          <div className="text-center font-normal whitespace-nowrap">або</div>
          <div className="flex-1 h-px bg-gray-300/50"></div>
        </div>
        <GoogleSignIn />
        <Link
          href={to}
          className="text-muted-foreground font-normal w-full flex items-center justify-center"
        >
          {text}
          <span className="underline pl-2">{description}</span>
        </Link>
      </div>
    </div>
  );
};
