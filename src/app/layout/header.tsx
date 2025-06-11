import { Menu } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { LayoutLogo } from "./logo";
import { LayoutDrawer } from "./drawer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export const LayoutHeader = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <div className="relative w-full flex items-center justify-between px-4 h-[80px]">
      <LayoutLogo />
      <div className="flex gap-4 items-center justify-end w-full">
        <ModeToggle />
        <LayoutDrawer user={user}>
          <button
            className="rounded-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <Menu className="h-[24px] w-[24px]" />
          </button>
        </LayoutDrawer>
      </div>
    </div>
  );
};
