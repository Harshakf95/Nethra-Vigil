
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background cyber-grid">
        <AppSidebar />
        <main className="flex-1 overflow-hidden">
          <DashboardHeader />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
