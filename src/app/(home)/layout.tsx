import { LayoutHeader } from "@/app/layout/header";
import { LayoutTopBar } from "@/app/layout/top-bar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full flex flex-col">
      <LayoutHeader />
      <LayoutTopBar />
      <div className="flex-grow">{children}</div>
    </div>
  );
}
