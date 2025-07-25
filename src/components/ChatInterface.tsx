import { useState, useEffect, useRef } from "react"
import { Home, Menu, MoreHorizontal, ExternalLink, Mic, ArrowUp, Edit2, RotateCcw, ChevronUp, Search, Copy, Check, Lightbulb, Image, List, Share, ThumbsUp, ThumbsDown, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchInterface } from "./SearchInterface"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

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
  const [isEditing, setIsEditing] = useState(false)
  const [editQuery, setEditQuery] = useState(currentQuery)
  const [isCopied, setIsCopied] = useState(false)

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
    { id: "images", label: "Images" },
    { id: "sources", label: "Sources", count: sourceCount > 0 ? sourceCount : undefined },
    { id: "steps", label: "Steps" }
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

  const handleCopyQuery = async () => {
    if (currentQuery) {
      try {
        await navigator.clipboard.writeText(currentQuery)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy:', err)
      }
    }
  }

  const handleEditSubmit = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setCurrentQuery(editQuery)
      setIsEditing(false)
      handleSendMessage(editQuery)
    } else if (e.key === 'Escape') {
      setEditQuery(currentQuery)
      setIsEditing(false)
    }
  }

  const CleanHeader = () => (
    <div className="border-b border-border/50 bg-background">
      {/* Simplified Header - Only User Message */}
      <div className="flex items-center justify-center gap-2 p-6">
        {currentQuery ? (
          <div className="flex items-center gap-2 group max-w-4xl w-full">
            {isEditing ? (
              <input
                value={editQuery}
                onChange={(e) => setEditQuery(e.target.value)}
                onKeyDown={handleEditSubmit}
                onBlur={() => setIsEditing(false)}
                className="flex-1 bg-transparent border-none outline-none text-foreground text-xl font-medium"
                autoFocus
              />
            ) : (
              <span className="flex-1 text-foreground font-medium text-xl">
                {currentQuery}
              </span>
            )}
            
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-2 h-auto hover:bg-muted/50 rounded-lg"
                onClick={() => {
                  setEditQuery(currentQuery)
                  setIsEditing(true)
                }}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-2 h-auto hover:bg-muted/50 rounded-lg"
                onClick={handleCopyQuery}
              >
                {isCopied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-muted-foreground text-lg">
            Ask a question to get started
          </div>
        )}
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
        <div className="text-center py-12">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <div className="w-6 h-6 rounded-full bg-primary animate-pulse"></div>
          </div>
          <p className="text-muted-foreground">
            {isSearching ? "Searching and analyzing..." : "Ask anything to get started"}
          </p>
        </div>
      )
    }

    return (
      <div className="prose prose-gray max-w-none">
        <div className="text-foreground leading-7 text-base space-y-4">
          {assistantMessage.content.split('\n\n').map((paragraph, i) => (
            <p key={i} className="text-foreground">
              {paragraph.replace(/\*\*(.*?)\*\*/g, (match, p1) => p1)}
            </p>
          ))}
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
        <div className="text-center text-muted-foreground py-12">
          No sources available yet
        </div>
      )
    }

    return (
      <div className="grid gap-3">
        {assistantMessage.sources.map((source, index) => (
          <div key={index} className="flex items-center gap-3 p-4 bg-card/50 hover:bg-card/70 rounded-lg transition-colors border border-border/50">
            <span className="text-lg">{source.favicon}</span>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-foreground truncate">
                {source.name}
              </div>
              <div className="text-xs text-muted-foreground truncate">
                {source.url}
              </div>
            </div>
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {currentQuery ? (
        <>
          {/* User Query Display */}
          <div className="border-b border-border bg-background px-4 py-6">
            <div className="max-w-4xl mx-auto">
              <div className="group relative">
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <Input
                      value={editQuery}
                      onChange={(e) => setEditQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setCurrentQuery(editQuery)
                          setIsEditing(false)
                          handleSendMessage(editQuery)
                        }
                        if (e.key === "Escape") {
                          setEditQuery(currentQuery)
                          setIsEditing(false)
                        }
                      }}
                      className="flex-1 text-xl font-medium bg-transparent border-none p-0 focus-visible:ring-0 shadow-none"
                      autoFocus
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setCurrentQuery(editQuery)
                        setIsEditing(false)
                        handleSendMessage(editQuery)
                      }}
                      className="h-8 w-8 p-0"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditQuery(currentQuery)
                        setIsEditing(false)
                      }}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-start justify-between">
                    <h1 className="text-xl sm:text-2xl font-medium text-foreground pr-4 leading-relaxed">
                      {currentQuery}
                    </h1>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditQuery(currentQuery)
                          setIsEditing(true)
                        }}
                        className="h-8 w-8 p-0 hover:bg-muted"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCopyQuery}
                        className="h-8 w-8 p-0 hover:bg-muted"
                      >
                        {isCopied ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto pb-32">
            <div className="max-w-4xl mx-auto px-4 py-6">
              {activeTab === "answer" && <AnswerSection />}
              {activeTab === "sources" && <SourcesSection />}
              {activeTab === "images" && (
                <div className="text-center text-muted-foreground py-12">
                  Images view coming soon...
                </div>
              )}
              {activeTab === "steps" && (
                <div className="space-y-4">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                      <span className="text-sm text-muted-foreground">Searching the web</span>
                    </div>
                    
                    <div className="pl-4 border-l border-muted-foreground/20 space-y-3">
                      <div className="text-sm text-muted-foreground">Searching</div>
                      <div className="flex items-center gap-2 text-sm">
                        <Search className="h-4 w-4" />
                        <span className="font-mono text-xs bg-muted px-2 py-1 rounded">
                          {currentQuery || "MightiGo pvt ltd"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                      <span className="text-sm text-muted-foreground">Reading sources • {assistantMessage?.sources?.length || 9}</span>
                    </div>
                    
                    <div className="pl-4 border-l border-muted-foreground/20 space-y-2">
                      {assistantMessage?.sources?.slice(0, 7).map((source, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs">
                          <span className="text-lg">{source.favicon}</span>
                          <span className="text-muted-foreground truncate">{source.name}</span>
                          <span className="text-muted-foreground/60">{source.url}</span>
                        </div>
                      )) || [
                        { name: "mightigo private limited", url: "falconebiz", favicon: "🌐" },
                        { name: "MCA Company Search", url: "mastersindia", favicon: "📋" },
                        { name: "MIGHTO MATICS PRIVATE LIMITED", url: "zaubacorp", favicon: "🌐" },
                        { name: "MIGHTO MATICS PRI", url: "indiafilings", favicon: "🇮🇳" },
                        { name: "Harmya Surani - Found", url: "in.linkedin", favicon: "💼" },
                        { name: "harmya himatlal surani", url: "falconebiz", favicon: "🌐" },
                        { name: "Mighto Matics Priv", url: "thecompanycheck", favicon: "📊" }
                      ].map((source, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs">
                          <span className="text-lg">{source.favicon}</span>
                          <span className="text-muted-foreground truncate">{source.name}</span>
                          <span className="text-muted-foreground/60">{source.url}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                      <span className="text-sm text-muted-foreground">Finished</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Tabs Navigation - After content */}
            <div className="border-t border-border bg-background sticky bottom-20">
              <div className="max-w-4xl mx-auto px-4">
                <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveTab("answer")}
                    className={`rounded-none border-b-2 px-4 py-2 font-medium whitespace-nowrap text-sm ${
                      activeTab === "answer" 
                        ? "border-primary text-primary" 
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Lightbulb className="h-4 w-4 mr-1" />
                    Answer
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveTab("images")}
                    className={`rounded-none border-b-2 px-4 py-2 font-medium whitespace-nowrap text-sm ${
                      activeTab === "images" 
                        ? "border-primary text-primary" 
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Images
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveTab("sources")}
                    className={`rounded-none border-b-2 px-4 py-2 font-medium whitespace-nowrap text-sm ${
                      activeTab === "sources" 
                        ? "border-primary text-primary" 
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Sources • {assistantMessage?.sources?.length || 0}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveTab("steps")}
                    className={`rounded-none border-b-2 px-4 py-2 font-medium whitespace-nowrap text-sm ${
                      activeTab === "steps" 
                        ? "border-primary text-primary" 
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Steps
                  </Button>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between py-3 border-t border-border">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-muted">
                      <Share className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-muted">
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-muted">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-muted">
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-muted">
                      <ThumbsDown className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-muted">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center max-w-2xl">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              What do you want to know?
            </h1>
            <p className="text-muted-foreground mb-8">
              Ask anything and get intelligent answers with sources
            </p>
          </div>
        </div>
      )}
      
      {/* Fixed bottom input */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background p-4 z-50">
        <div className="max-w-4xl mx-auto">
          <SearchInterface 
            onSubmit={handleSendMessage}
            placeholder={chatMessages.length > 0 ? "Ask a follow-up..." : "What do you want to know?"}
          />
        </div>
      </div>
    </div>
  )
}