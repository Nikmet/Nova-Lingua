import { redirect } from "next/navigation";

import { AppSidebar } from "@/components/app-nav/app-sidebar";
import { OpenTabsProvider } from "@/components/app-nav/open-tabs-context";
import { TabsBar } from "@/components/app-nav/tabs-bar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/auth";

export default async function AppLayout({ children }: LayoutProps<"/">) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const user = {
    name: session.user.name ?? "Администратор",
    email: session.user.email ?? "",
  };

  return (
    <SidebarProvider style={{ "--sidebar-width": "15rem" } as React.CSSProperties}>
      <AppSidebar user={user} />
      <SidebarInset>
        <OpenTabsProvider>
          <TabsBar />
          <main className="flex-1 px-6 py-6">{children}</main>
        </OpenTabsProvider>
      </SidebarInset>
    </SidebarProvider>
  );
}
