
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  useSidebar 
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  Calendar, 
  Settings, 
  BookOpen, 
  User,
  LucideIcon
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MenuItem {
  title: string;
  path: string;
  icon: string;
}

interface ProfessionalSidebarProps {
  menuItems: MenuItem[];
}

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  Calendar,
  Settings,
  BookOpen,
  User,
};

const ProfessionalSidebar: React.FC<ProfessionalSidebarProps> = ({ menuItems }) => {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  
  const isCollapsed = state === "collapsed";
  const isActive = (path: string) => currentPath === path;
  const { user } = useAuth();

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-60"} collapsible="icon">
      <SidebarContent>
        {/* User profile info */}
        {!isCollapsed && user && (
          <div className="flex flex-col items-center py-6 border-b mb-2">
            <Avatar className="w-16 h-16 mb-2">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="text-base font-semibold text-foreground text-center">{user.name}</div>
            <div className="text-xs text-muted-foreground text-center">
              Professionnel
            </div>
            {user.isVerified && (
              <span className="mt-1 px-2 py-0.5 text-xs rounded bg-green-100 text-green-700 font-medium">Vérifié</span>
            )}
          </div>
        )}
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const IconComponent = iconMap[item.icon] || LayoutDashboard;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.path} 
                        end
                        className={({ isActive }) => 
                          isActive 
                            ? "bg-muted text-primary font-medium" 
                            : "hover:bg-muted/50"
                        }
                      >
                        <IconComponent className="mr-2 h-4 w-4" />
                        {!isCollapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default ProfessionalSidebar;
