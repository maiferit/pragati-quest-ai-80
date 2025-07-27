import { Home, Compass, Library, Users, LogIn, UserPlus, LogOut } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
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
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"

const navigationItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Discover", url: "/discover", icon: Compass },
  { title: "Library", url: "/library", icon: Library },
  { title: "Spaces", url: "/spaces", icon: Users },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const isCollapsed = state === "collapsed"
  const { email, logout } = useAuth()

  const isActive = (path: string) => currentPath === path
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "hover:bg-sidebar-accent/50"

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-sidebar-background">
        {/* Logo Section */}
        {!isCollapsed && (
          <div className="p-6 border-b border-sidebar-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">P</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-sidebar-foreground">Pragati AI</h1>
                <p className="text-xs text-sidebar-foreground/60">by NexusByteX</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Auth Buttons */}
        {!isCollapsed && (
          <div className="mt-auto p-4 space-y-2 border-t border-sidebar-border">
            {!email ? (
              <>
                <Button asChild variant="outline" className="w-full justify-start" size="sm">
                  <NavLink to="/login">
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </NavLink>
                </Button>
                <Button asChild variant="premium" className="w-full justify-start" size="sm">
                  <NavLink to="/signup">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Sign Up
                  </NavLink>
                </Button>
              </>
            ) : (
              <Button variant="outline" className="w-full justify-start" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            )}
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  )
}