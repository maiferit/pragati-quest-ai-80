import { useState, useEffect, useRef } from "react"
import { Home, Menu, MoreHorizontal, ExternalLink, Mic, ArrowUp, Edit2, RotateCcw, ChevronUp, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchInterface } from "./SearchInterface"
import { Badge } from "@/components/ui/badge"

interface Message {
  id: string
  type: "user" | "assistant" 
  content: string
  sources?: Array<{name: string, url: string, favicon?: string}>
  timestamp: Date
}

interface SearchStep {
  id: string
  label: string
  status: "pending" | "active" | "completed"
  detail?: string
}

interface ChatInterfaceProps {
  messages?: Message[]
  onSendMessage?: (message: string) => void
  initialQuery?: string
}

export function ChatInterface({ messages = [], onSendMessage, initialQuery }: ChatInterfaceProps) {
  const [chatMessages, setChatMessages] = useState<Message[]>(messages)
  const [currentQuery, setCurrentQuery] = useState(initialQuery || "")
  const [activeTab, setActiveTab] = useState("answer")
  const [searchSteps, setSearchSteps] = useState<SearchStep[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight)

  // Handle initial query on mount
  useEffect(() => {
    if (initialQuery && chatMessages.length === 0) {
      handleSendMessage(initialQuery)
    }
  }, [initialQuery])

  // Handle viewport height changes for keyboard
  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const assistantMessage = chatMessages.find(m => m.type === "assistant" && m.sources)
  const sourceCount = assistantMessage?.sources?.length || 0

  const tabs = [
    { id: "answer", label: "Answer", icon: "✨" },
    { id: "images", label: "Images", icon: "🖼️" },
    { id: "sources", label: "Sources", count: sourceCount > 0 ? sourceCount : undefined },
    { id: "steps", label: "Steps", icon: "📋" }
  ]

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: "user", 
      content,
      timestamp: new Date()
    }
    setChatMessages(prev => [...prev, newMessage])
    setCurrentQuery(content)
    setIsSearching(true)

    // Simulate search steps
    const steps: SearchStep[] = [
      { id: "1", label: "Searching the web", status: "active", detail: `MightiGo pvt ltd` },
      { id: "2", label: "Reading sources", status: "pending", detail: "9" },
      { id: "3", label: "Generating answer", status: "pending" }
    ]
    setSearchSteps(steps)

    // Simulate progressive step completion
    setTimeout(() => {
      setSearchSteps(prev => prev.map(step => 
        step.id === "1" ? { ...step, status: "completed" } : 
        step.id === "2" ? { ...step, status: "active" } : step
      ))
    }, 1500)

    setTimeout(() => {
      setSearchSteps(prev => prev.map(step => 
        step.id === "2" ? { ...step, status: "completed" } : 
        step.id === "3" ? { ...step, status: "active" } : step
      ))
    }, 3000)

    // Generate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: `**${content}** is a newly incorporated private company in India, officially registered on 12 June 2025. It is classified under the Corporate Identification Number (CIN) U73100GJ2025PTC164036 and is based in Gujarat.

As of July 2025, the company has been in operation for just over one month. The founder and CEO of MightiGo Private Limited is **Harmya Himatlal Surani**.

According to public profiles, Harmya Surani has also been associated with other tech startups, and the company is involved in digital services. Notably, MightiGo Pvt Ltd powers the web hosting brand **RaptorHostify**, which offers shared, dedicated, and VPS hosting solutions.`,
        sources: [
          { name: "mightigo private limited", url: "falconebiz.com", favicon: "🌐" },
          { name: "MCA Company Search", url: "mastersindia.co", favicon: "📋" },
          { name: "MIGHTO MATICS PRIVATE LIMITED", url: "zaubacorp.com", favicon: "🌐" },
          { name: "MIGHTO MATICS PRI", url: "indiafilings.com", favicon: "🇮🇳" },
          { name: "Harmya Surani - Founder", url: "in.linkedin.com", favicon: "💼" },
          { name: "harmya himatlal surani", url: "falconebiz.com", favicon: "🌐" },
          { name: "Mighto Matics Private Limited", url: "thecompanycheck.com", favicon: "📊" }
        ],
        timestamp: new Date()
      }
      setChatMessages(prev => [...prev, aiResponse])
      setSearchSteps(prev => prev.map(step => ({ ...step, status: "completed" })))
      setIsSearching(false)
    }, 4500)

    onSendMessage?.(content)
  }

  const CleanHeader = () => (
    <div className="border-b border-border bg-background/95 backdrop-blur-sm">
      {/* Single Clean Header Row */}
      <div className="flex items-center justify-between gap-4 p-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="p-2">
            <Menu className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">Pragati AI</span>
            <Button variant="ghost" size="sm" className="bg-muted/60 text-foreground px-3 py-2 rounded-xl">
              <span className="text-sm">+ New</span>
            </Button>
          </div>
        </div>
        
        {/* Current Query or Brand Name */}
        {currentQuery && (
          <div className="flex-1 text-center">
            <div className="flex items-center justify-center gap-2 text-lg font-medium text-foreground">
              <span className="truncate max-w-md">{currentQuery}</span>
              <Button variant="ghost" size="sm" className="p-1">
                <Edit2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        )}
        
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-xl text-sm">
          <ExternalLink className="h-4 w-4 mr-2" />
          Open in App
        </Button>
      </div>

      {/* Tabs */}
      {currentQuery && (
        <div className="flex items-center gap-6 px-4 pb-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 pb-2 text-sm border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-primary text-primary font-medium"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.icon && <span>{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.count && (
                <span className="text-xs bg-muted px-1.5 py-0.5 rounded">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )

  const TimelinePanel = () => (
    <div className="w-64 border-r border-border bg-card/50 p-4 lg:block hidden">
      <div className="space-y-4">
        {searchSteps.map((step, index) => (
          <div key={step.id} className="flex items-start gap-3">
            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
              step.status === "completed" ? "bg-primary" :
              step.status === "active" ? "bg-primary animate-pulse" :
              "bg-muted-foreground/30"
            }`} />
            <div className="flex-1 min-w-0">
              <div className={`text-sm ${
                step.status === "active" ? "text-foreground font-medium" :
                step.status === "completed" ? "text-muted-foreground" :
                "text-muted-foreground/60"
              }`}>
                {step.label}
              </div>
              {step.detail && (
                <div className="text-xs text-muted-foreground mt-1 font-mono">
                  <Search className="inline h-3 w-3 mr-1" />
                  {step.detail}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {searchSteps.length > 0 && searchSteps.every(s => s.status === "completed") && (
          <div className="pt-2 border-t border-border">
            <div className="text-xs text-muted-foreground">Finished</div>
          </div>
        )}
      </div>
    </div>
  )

  const MobileTimelineSteps = () => (
    <div className="lg:hidden">
      {searchSteps.length > 0 && (
        <div className="px-4 py-2 bg-card/30 border-b border-border">
          <div className="flex items-center gap-3 text-xs">
            {searchSteps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-1">
                <div className={`w-1.5 h-1.5 rounded-full ${
                  step.status === "completed" ? "bg-primary" :
                  step.status === "active" ? "bg-primary animate-pulse" :
                  "bg-muted-foreground/30"
                }`} />
                <span className={`${
                  step.status === "active" ? "text-foreground" :
                  step.status === "completed" ? "text-muted-foreground" :
                  "text-muted-foreground/60"
                }`}>
                  {step.label}
                </span>
                {index < searchSteps.length - 1 && (
                  <div className="w-2 h-px bg-border mx-1" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  const AnswerSection = () => {
    const assistantMessage = chatMessages.find(m => m.type === "assistant" && m.content)
    
    if (!assistantMessage) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <div className="w-6 h-6 rounded-full bg-primary animate-glow-pulse"></div>
            </div>
            <p className="text-muted-foreground">
              {isSearching ? "Searching and analyzing..." : "Ask anything to get started"}
            </p>
          </div>
        </div>
      )
    }

    return (
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6 pb-24">
          <div className="bg-card/30 rounded-2xl p-6 shadow-sm">
            <div className="prose prose-invert max-w-none">
              <div className="text-foreground leading-7 text-[15px] whitespace-pre-wrap">
                {assistantMessage.content.split('\n').map((line, i) => (
                  <p key={i} className={line.startsWith('**') ? 'font-semibold mb-3' : 'mb-3'}>
                    {line.replace(/\*\*(.*?)\*\*/g, '$1')}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const FloatingScrollButtons = () => (
    <div className="fixed right-6 bottom-24 flex flex-col gap-2 z-10">
      <Button
        variant="outline"
        size="sm"
        className="w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm border-border hover:bg-muted/50"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ChevronUp className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm border-border hover:bg-muted/50"
        onClick={() => document.querySelector('.bottom-input')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <ArrowUp className="h-4 w-4 rotate-180" />
      </Button>
    </div>
  )

  const SourcesSection = () => {
    const assistantMessage = chatMessages.find(m => m.type === "assistant" && m.sources)
    
    if (!assistantMessage?.sources) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            No sources available yet
          </div>
        </div>
      )
    }

    return (
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6">
          <div className="grid gap-3">
            {assistantMessage.sources.map((source, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-card/30 hover:bg-card/40 rounded-lg transition-colors">
                <span className="text-lg">{source.favicon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">
                    {source.name}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {source.url}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-background overflow-x-hidden" style={{ height: `${viewportHeight}px` }}>
      <CleanHeader />
      <MobileTimelineSteps />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Timeline Panel - Desktop Only */}
        {currentQuery && <TimelinePanel />}
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {activeTab === "answer" && <AnswerSection />}
          {activeTab === "sources" && <SourcesSection />}
          {activeTab === "images" && (
            <div className="flex-1 p-6">
              <div className="text-center text-muted-foreground">
                Images view coming soon...
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fixed Bottom Input - Keyboard Aware */}
      <div className="bottom-input border-t border-border bg-background/95 backdrop-blur-sm p-4 fixed bottom-0 left-0 right-0 z-20">
        <div className="max-w-4xl mx-auto">
          <SearchInterface 
            onSubmit={handleSendMessage}
            placeholder={chatMessages.length > 0 ? "Ask a follow-up..." : "What do you want to know?"}
          />
        </div>
      </div>

      <FloatingScrollButtons />
    </div>
  )
}