
import { 
  Shield, 
  Globe, 
  Network, 
  BarChart3, 
  Settings, 
  AlertTriangle,
  Eye
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Shield,
  },
  {
    title: "Web Threats",
    url: "/web-threats",
    icon: Globe,
  },
  {
    title: "Network Threats",
    url: "/network-threats",
    icon: Network,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

const advancedItems = [
  {
    title: "Alerts",
    url: "/alerts",
    icon: AlertTriangle,
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="border-r border-border/50">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 border border-primary/30">
            <Eye className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">NETHRA</h1>
            <p className="text-xs text-primary font-medium">VIGIL</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Nethra Vigil
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    className="hover:bg-accent/50 transition-colors"
                  >
                    <Link to={item.url} className="flex items-center gap-3">
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Advanced
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {advancedItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={location.pathname === item.url}
                    className="hover:bg-accent/50 transition-colors"
                  >
                    <Link to={item.url} className="flex items-center gap-3">
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
