"use client";

import { ReactNode, useState } from "react";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui";
import Link from "next/link";
import { ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import { CommonCalendar } from "@/components/common";
import { SignOut } from "@/components/auth/signout";

type LayoutDrawerProps = {
  children: ReactNode;
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
};

export const LayoutDrawer = ({ children, user }: LayoutDrawerProps) => {
  const [open, setOpen] = useState(false);
  const [userInfoOpen, setUserInfoOpen] = useState(false);

  const handleLinkClick = () => {
    setOpen(false);
  };

  const toggleUserInfo = () => {
    setUserInfoOpen((prev) => !prev);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0">
        <div className="h-full overflow-y-auto max-h-screen">
          <SheetHeader>
            <SheetTitle>
              {user && (
                <div className="flex flex-col gap-2">
                  <button
                    onClick={toggleUserInfo}
                    className="flex items-center gap-2 focus:outline-none"
                    aria-expanded={userInfoOpen}
                    aria-controls="user-info-block"
                  >
                    <Image
                      src={user.image || "/images/avatar.png"}
                      alt="User Avatar"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    {userInfoOpen ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>

                  {userInfoOpen && (
                    <div
                      id="user-info-block"
                      className="flex flex-col gap-2 pt-4"
                    >
                      {user.name && (
                        <p className="text-foreground font-bold max-w-[230px] truncate whitespace-nowrap overflow-hidden">
                          {user.name}
                        </p>
                      )}
                      <p className="text-foreground font-semibold max-w-[230px] truncate whitespace-nowrap overflow-hidden">
                        {user.email}
                      </p>
                      <div className="pt-2">
                        <SignOut />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </SheetTitle>
            <SheetDescription className="sr-only">
              Навігаційне меню сайту
            </SheetDescription>
          </SheetHeader>

          <div className="flex flex-col gap-4">
            <Link
              href="/progress"
              onClick={handleLinkClick}
              className="flex items-center gap-2 justify-between text-lg font-bold p-3"
            >
              <span>Прогрес</span>
              <ChevronRight className="w-6 h-6" />
            </Link>
            <CommonCalendar onLinkClick={handleLinkClick} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
