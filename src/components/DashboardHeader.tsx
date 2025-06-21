
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Settings, User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const notifications = [
  {
    id: 1,
    title: "Critical Threat Detected",
    description: "DDoS attack targeting server infrastructure",
    time: "2 minutes ago",
    type: "critical",
    link: "/alerts"
  },
  {
    id: 2,
    title: "Security Breach Attempt",
    description: "Multiple failed login attempts detected",
    time: "5 minutes ago",
    type: "high",
    link: "/alerts"
  },
  {
    id: 3,
    title: "System Update Available",
    description: "New threat definitions ready for deployment",
    time: "1 hour ago",
    type: "info",
    link: "/analytics"
  }
];

export function DashboardHeader() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { logout, isAuthenticated, user } = useAuth();
  const [allNotificationsRead, setAllNotificationsRead] = useState(false);
  
  // Get user data from auth context or use defaults
  const userEmail = user?.email || 'user@example.com';
  const userName = user?.name || 'User';

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  const handleNotificationClick = (notification: typeof notifications[0]) => {
    navigate(notification.link);
  };

  const handleMarkAllAsRead = () => {
    setAllNotificationsRead(true);
    toast({
      title: "Notifications",
      description: "All notifications marked as read",
    });
  };

  // Extract initials from email
  const getInitialsFromEmail = (email: string) => {
    const [localPart] = email.split('@');
    const parts = localPart.split('.');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return localPart.substring(0, 2).toUpperCase();
  };

  const userInitials = getInitialsFromEmail(userEmail);

  return (
    <header className="flex h-16 items-center justify-between border-b border-border/40 bg-card/30 backdrop-blur-sm px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div>
          <h1 className="text-xl font-semibold text-foreground">Threat Intelligence Dashboard</h1>
          <p className="text-sm text-muted-foreground">Real-time cybersecurity monitoring</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Enhanced Notifications */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {!allNotificationsRead && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 text-xs bg-red-500 hover:bg-red-500">
                  {notifications.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>Notifications</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => navigate("/alerts")}
                    className="text-primary hover:text-primary/80"
                  >
                    View All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="p-4 border-b border-border/50 hover:bg-accent/50 cursor-pointer transition-colors"
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.type === "critical" ? "bg-red-500" :
                          notification.type === "high" ? "bg-orange-500" : "bg-blue-500"
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-foreground truncate">
                            {notification.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.description}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-border/50">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={handleMarkAllAsRead}
                  >
                    Mark All as Read
                  </Button>
                </div>
              </CardContent>
            </Card>
          </PopoverContent>
        </Popover>
        
        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-3 hover:bg-accent/50">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                  {getInitialsFromEmail(userEmail)}
                </AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="font-medium text-sm">{userName}</p>
                <p className="text-xs text-muted-foreground truncate max-w-[160px]">{userEmail}</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={() => navigate('/profile')}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/settings")}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
