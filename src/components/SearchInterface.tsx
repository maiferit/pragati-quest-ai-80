import { useState } from "react"
import { Search, Mic, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SearchInterfaceProps {
  onSubmit?: (query: string) => void
  placeholder?: string
  showVoiceInput?: boolean
}

export function SearchInterface({ 
  onSubmit, 
  placeholder = "What do you want to know?",
  showVoiceInput = true 
}: SearchInterfaceProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim() && onSubmit) {
      onSubmit(query.trim())
      setQuery("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground">
          <Search className="h-5 w-5" />
        </div>
        
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="pl-12 pr-20 py-6 text-lg bg-card border-2 border-border hover:border-primary/50 focus:border-primary focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.1)] transition-all duration-200 rounded-2xl shadow-lg"
        />
        
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
          {showVoiceInput && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-primary/10"
            >
              <Mic className="h-4 w-4" />
            </Button>
          )}
          
          <Button
            type="submit"
            variant="premium"
            size="sm"
            className="h-8 w-8 p-0"
            disabled={!query.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </form>
  )
}