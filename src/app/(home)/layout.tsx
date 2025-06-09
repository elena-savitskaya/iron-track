import { LayoutHeader } from "@/app/layout/header";
import { LayoutTopBar } from "@/app/layout/top-bar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-screen-lg h-screen flex flex-col">
      <LayoutHeader />
      <LayoutTopBar />
      <main className="flex-grow">{children}</main>
    </div>
  );
}
