"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export const LayoutTopBar = () => {
  const pathname = usePathname();

  const links = [
    { label: "Історія тренувань", href: "/" },
    { label: "Нове тренування", href: "/new-workout" },
  ];

  return (
    <div className="w-full bg-background border-t border-input p-4 space-y-4">
      <div className="w-full flex gap-1 sm:gap-3 items-center rounded-3xl p-1 shadow-md border bg-muted">
        {links.map(({ label, href }) => {
          const isActive = pathname === href;
          return (
            <Button
              asChild
              key={href}
              variant={isActive ? "default" : "outline"}
              className="w-full rounded-3xl flex-1 basis-[calc(50%-0.5rem)] px-1 py-2 sm:px-4"
            >
              <Link href={href}>{label}</Link>
            </Button>
          );
        })}
      </div>
    </div>
  );
};
