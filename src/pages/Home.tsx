import { useNavigate } from "react-router-dom"
import { SearchInterface } from "@/components/SearchInterface"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Zap, Shield } from "lucide-react"

export default function Home() {
  const navigate = useNavigate()

  const handleSearch = (query: string) => {
    // Navigate to chat with the query
    navigate(`/chat?q=${encodeURIComponent(query)}`)
  }

  const suggestedQueries = [
    "How does photosynthesis work?",
    "Explain quantum computing",
    "What's the latest in AI research?",
    "How to start a successful business?",
    "Compare renewable energy sources"
  ]

  const features = [
    {
      icon: Sparkles,
      title: "Progressive Answers",
      description: "Get comprehensive, evolving responses that build on your questions"
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Fast, accurate answers powered by cutting-edge AI technology"
    },
    {
      icon: Shield,
      title: "Reliable Sources",
      description: "Every answer comes with verified sources and references"
    }
  ]

  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6">
      {/* Hero Section */}
      <div className="text-center mb-12 max-w-4xl">
        <h1 className="text-5xl font-bold text-foreground mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Progressive Answers, Powered by AI
        </h1>
        <p className="text-xl text-muted-foreground mb-12">
          Ask anything and get intelligent, comprehensive answers with reliable sources.
          Experience the future of knowledge discovery.
        </p>
        
        {/* Search Interface */}
        <div className="mb-12">
          <SearchInterface onSubmit={handleSearch} />
        </div>

        {/* Suggested Queries */}
        <div className="mb-16">
          <p className="text-sm text-muted-foreground mb-4">Try asking:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {suggestedQueries.map((query, index) => (
              <Badge
                key={index}
                variant="outline"
                className="cursor-pointer hover:bg-primary/10 hover:border-primary/50 transition-colors"
                onClick={() => handleSearch(query)}
              >
                {query}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-8 max-w-4xl w-full">
        {features.map((feature, index) => (
          <div key={index} className="text-center p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <feature.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
            <p className="text-muted-foreground text-sm">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-16 text-center">
        <p className="text-sm text-muted-foreground">
          Powered by{" "}
          <span className="text-primary font-semibold">NexusByteX</span>
        </p>
      </div>
    </div>
  )
}