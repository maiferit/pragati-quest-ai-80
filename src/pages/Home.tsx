import { useNavigate } from "react-router-dom"
import { SearchInterface } from "@/components/SearchInterface"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles, Zap, Shield, Compass, TrendingUp, Brain } from "lucide-react"

export default function Home() {
  const navigate = useNavigate()

  const handleSearch = (query: string) => {
    // Navigate to chat with the query
    navigate(`/chat?q=${encodeURIComponent(query)}`)
  }

  const suggestedQueries = [
    "What's new in AI?",
    "Climate change impact",
    "Space exploration updates",
    "Quantum computing basics",
    "Future of medicine"
  ]

  const quickActions = [
    { icon: Compass, label: "Discover", action: () => navigate("/discover") },
    { icon: TrendingUp, label: "Trending", action: () => navigate("/discover") },
    { icon: Brain, label: "Learn", action: () => navigate("/library") },
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
    <div className="flex flex-col min-h-full">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* Hero Section */}
        <div className="w-full max-w-3xl text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            Where knowledge begins
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto">
            Ask anything and get intelligent, comprehensive answers.
          </p>
          
          {/* Search Interface */}
          <div className="mb-6 sm:mb-8">
            <SearchInterface onSubmit={handleSearch} />
          </div>

          {/* Quick Actions */}
          <div className="flex justify-center gap-3 mb-6 sm:mb-8">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={action.action}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <action.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{action.label}</span>
              </Button>
            ))}
          </div>

          {/* Suggested Queries */}
          <div>
            <div className="flex flex-wrap justify-center gap-2">
              {suggestedQueries.map((query, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-muted transition-colors text-xs sm:text-sm"
                  onClick={() => handleSearch(query)}
                >
                  {query}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features - Bottom Section */}
      <div className="border-t border-border bg-muted/30 p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-4 sm:p-6 rounded-xl bg-card/50 border border-border/50">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}