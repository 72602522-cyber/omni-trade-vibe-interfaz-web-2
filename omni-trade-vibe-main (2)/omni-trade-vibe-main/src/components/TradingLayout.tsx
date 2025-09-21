import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TradingSidebar } from "./TradingSidebar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ReactNode } from "react";
import { 
  Bell, 
  Settings, 
  User,
  Wifi,
  AlertCircle
} from "lucide-react";

interface TradingLayoutProps {
  children: ReactNode;
}

export function TradingLayout({ children }: TradingLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-dashboard">
        <TradingSidebar />
        <main className="flex-1 flex flex-col">
          {/* Enhanced Header with notifications and controls */}
          <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center px-6">
            <SidebarTrigger className="mr-4" />
            
            {/* Logo and Title */}
            <div className="flex-1 flex items-center gap-4">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Omni Trade Dash</h2>
                <p className="text-xs text-muted-foreground">Professional Trading Bot</p>
              </div>
            </div>

            {/* Header Controls */}
            <div className="flex items-center gap-3">
              {/* System Status */}
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-success/10">
                <Wifi className="w-3 h-3 text-success" />
                <span className="text-xs text-success font-medium">Online</span>
              </div>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-4 h-4" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs bg-danger text-danger-foreground">
                  3
                </Badge>
              </Button>

              {/* Quick Settings */}
              <Button variant="ghost" size="icon">
                <Settings className="w-4 h-4" />
              </Button>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* User Menu */}
              <Button variant="ghost" size="icon">
                <User className="w-4 h-4" />
              </Button>
            </div>
          </header>
          
          {/* Main Content */}
          <div className="flex-1 p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}