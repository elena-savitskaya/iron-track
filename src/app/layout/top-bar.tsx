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
    <div className="sticky top-0 z-30 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-input p-4 space-y-4">
      <div className="w-full flex gap-4 items-center rounded-3xl p-1 shadow-md border bg-muted">
        {links.map(({ label, href }) => {
          const isActive = pathname === href;
          return (
            <Button
              asChild
              key={href}
              variant={isActive ? "default" : "outline"}
              className="w-full rounded-3xl flex-1 basis-[calc(50%-0.5rem)]"
            >
              <Link href={href}>{label}</Link>
            </Button>
          );
        })}
      </div>
    </div>
  );
};
