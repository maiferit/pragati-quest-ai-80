import { ReactNode } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="h-16 border-b border-border bg-card flex items-center justify-between px-2 sm:px-4 lg:px-6">
            <div className="flex items-center space-x-2 sm:space-x-4 min-w-0">
              <SidebarTrigger />
              <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-foreground font-bold text-sm">P</span>
                </div>
                <div className="min-w-0">
                  <h1 className="text-base sm:text-lg font-bold text-foreground truncate">Pragati AI</h1>
                </div>
              </div>
            </div>
            
            <Button variant="outline" size="sm" className="flex-shrink-0 ml-2">
              <ExternalLink className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Open in App</span>
              <span className="sm:hidden">Open</span>
            </Button>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}