import { NavLink } from "react-router-dom";
import { 
  BarChart3, 
  Settings, 
  Wallet, 
  TrendingUp, 
  FileText, 
  Monitor,
  Activity,
  Bell,
  Server
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
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { 
    title: "Dashboard", 
    url: "/", 
    icon: Monitor,
    description: "Vista general del bot"
  },
  { 
    title: "Cuentas", 
    url: "/accounts", 
    icon: Wallet,
    description: "Gestión de brokers"
  },
  { 
    title: "Estrategias", 
    url: "/strategies", 
    icon: TrendingUp,
    description: "Configuración de trading"
  },
  { 
    title: "Reportes", 
    url: "/reports", 
    icon: FileText,
    description: "Análisis y métricas"
  },
  { 
    title: "Configuración", 
    url: "/settings", 
    icon: Settings,
    description: "Ajustes del sistema"
  },
];

const systemItems = [
  { 
    title: "Actividad", 
    url: "/activity", 
    icon: Activity,
    description: "Logs del sistema"
  },
  { 
    title: "Alertas", 
    url: "/alerts", 
    icon: Bell,
    description: "Notificaciones"
  },
  { 
    title: "Estado", 
    url: "/status", 
    icon: Server,
    description: "Estado del servidor"
  },
];

export function TradingSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const getNavClasses = ({ isActive }: { isActive: boolean }) =>
    `flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200 ${
      isActive
        ? "bg-primary text-primary-foreground shadow-trading font-medium"
        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
    }`;

  return (
    <Sidebar
      className={`border-sidebar-border transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
      collapsible="icon"
    >
      <SidebarContent className="bg-sidebar">
        {/* Header */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            {!collapsed && (
              <div>
                <h1 className="font-bold text-sidebar-foreground">Omni Trade</h1>
                <p className="text-xs text-sidebar-foreground/70">Professional Bot</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60 uppercase tracking-wider text-xs">
            Trading
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClasses}>
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && (
                        <div className="flex-1 min-w-0">
                          <div className="font-medium">{item.title}</div>
                          <div className="text-xs opacity-70 truncate">
                            {item.description}
                          </div>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* System Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60 uppercase tracking-wider text-xs">
            Sistema
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClasses}>
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && (
                        <div className="flex-1 min-w-0">
                          <div className="font-medium">{item.title}</div>
                          <div className="text-xs opacity-70 truncate">
                            {item.description}
                          </div>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Status Indicator */}
        {!collapsed && (
          <div className="mt-auto p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sidebar-foreground/70">Bot Activo</span>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}