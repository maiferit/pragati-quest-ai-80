import { useState } from "react"
import { ArrowLeft, Sun, Moon, Monitor, Settings, User, Sliders, Calendar, Bell, Link as LinkIcon, Cloud, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTheme } from "next-themes"

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [autoSuggest, setAutoSuggest] = useState(true)
  const [homepageWidgets, setHomepageWidgets] = useState(true)
  const { theme, setTheme } = useTheme()

  const settingsSections = [
    {
      id: "account",
      label: "Account",
      icon: User,
      content: (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder.svg" alt="Profile" />
              <AvatarFallback>GT</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-medium">GIT Training</h3>
              <p className="text-sm text-muted-foreground">maiferithu25678</p>
            </div>
          </div>
          
          <Button variant="outline" className="w-fit">
            Change avatar
          </Button>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <p className="text-sm text-muted-foreground">GIT Training</p>
              <Button variant="outline" size="sm" className="mt-2">
                Change full name
              </Button>
            </div>
            
            <div>
              <label className="text-sm font-medium">Username</label>
              <p className="text-sm text-muted-foreground">maiferithu25678</p>
              <Button variant="outline" size="sm" className="mt-2">
                Change username
              </Button>
            </div>
            
            <div>
              <label className="text-sm font-medium">Email</label>
              <p className="text-sm text-muted-foreground">maiferithu@gmail.com</p>
            </div>
          </div>
          
          <div className="border-t pt-6">
            <h4 className="text-lg font-medium mb-2">Subscription</h4>
            <p className="text-sm text-primary font-medium">Thanks for subscribing to Perplexity Pro!</p>
            <p className="text-xs text-muted-foreground">Explore your new Pro features. <span className="text-primary cursor-pointer">Learn more</span></p>
          </div>
        </div>
      )
    },
    {
      id: "preferences",
      label: "Preferences",
      icon: Sliders,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Appearance</h3>
            <p className="text-sm text-muted-foreground mb-4">How Perplexity looks on your device</p>
            
            <div className="flex items-center gap-2">
              <Button
                variant={theme === "light" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("light")}
                className="flex items-center gap-2"
              >
                <Sun className="h-4 w-4" />
                Light
              </Button>
              <Button
                variant={theme === "dark" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("dark")}
                className="flex items-center gap-2"
              >
                <Moon className="h-4 w-4" />
                Dark
              </Button>
              <Button
                variant={theme === "system" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("system")}
                className="flex items-center gap-2"
              >
                <Monitor className="h-4 w-4" />
                System
              </Button>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Language</h4>
            <p className="text-sm text-muted-foreground mb-4">The language used in the user interface</p>
            <Select defaultValue="en-US">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en-US">American English</SelectItem>
                <SelectItem value="en-GB">British English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Preferred response language</h4>
            <p className="text-sm text-muted-foreground mb-4">The language used for AI responses</p>
            <Select defaultValue="auto">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Automatic (detect input)</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Autosuggest</h4>
              <p className="text-sm text-muted-foreground">Enable dropdown and tab-complete suggestions while typing a query</p>
            </div>
            <Switch checked={autoSuggest} onCheckedChange={setAutoSuggest} />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Homepage widgets</h4>
              <p className="text-sm text-muted-foreground">Enable personalized widgets on the homepage</p>
            </div>
            <Switch checked={homepageWidgets} onCheckedChange={setHomepageWidgets} />
          </div>
        </div>
      )
    },
    {
      id: "personalization",
      label: "Personalization",
      icon: User,
      content: (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Personalization settings coming soon...</p>
        </div>
      )
    },
    {
      id: "tasks",
      label: "Tasks",
      icon: Calendar,
      content: (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Task management coming soon...</p>
        </div>
      )
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
      content: (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Notification settings coming soon...</p>
        </div>
      )
    },
    {
      id: "connectors",
      label: "Connectors",
      icon: LinkIcon,
      content: (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Connector settings coming soon...</p>
        </div>
      )
    },
    {
      id: "api",
      label: "API",
      icon: Cloud,
      content: (
        <div className="text-center py-12">
          <p className="text-muted-foreground">API settings coming soon...</p>
        </div>
      )
    },
    {
      id: "enterprise",
      label: "Enterprise",
      icon: Building,
      content: (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Enterprise settings coming soon...</p>
        </div>
      )
    }
  ]

  const renderContent = () => {
    if (!activeSection) {
      return (
        <div className="space-y-6">
          <div className="space-y-1">
            {settingsSections.map((section) => (
              <Button
                key={section.id}
                variant="ghost"
                className="w-full justify-start h-auto p-4 text-left"
                onClick={() => setActiveSection(section.id)}
              >
                <section.icon className="h-5 w-5 mr-3" />
                <span className="font-medium">{section.label}</span>
              </Button>
            ))}
          </div>
          
          <div className="border-t pt-6">
            <h4 className="text-sm font-medium text-muted-foreground mb-4">Workspace</h4>
            <div className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start h-auto p-4 text-left"
                onClick={() => setActiveSection("api")}
              >
                <Cloud className="h-5 w-5 mr-3" />
                <span className="font-medium">API</span>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start h-auto p-4 text-left"
                onClick={() => setActiveSection("enterprise")}
              >
                <Building className="h-5 w-5 mr-3" />
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium">Enterprise</span>
                  <span className="text-xs text-muted-foreground">↗</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      )
    }

    const section = settingsSections.find(s => s.id === activeSection)
    return section?.content || null
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[80vh] p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <div className="flex items-center gap-3">
            {activeSection && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveSection(null)}
                className="p-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <DialogTitle>
              {activeSection ? settingsSections.find(s => s.id === activeSection)?.label : "Account"}
            </DialogTitle>
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {renderContent()}
        </div>
      </DialogContent>
    </Dialog>
  )
}