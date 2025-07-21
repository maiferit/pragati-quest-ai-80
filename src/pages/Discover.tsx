import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Clock, Users } from "lucide-react"

export default function Discover() {
  const trendingTopics = [
    { title: "Artificial Intelligence Breakthroughs", queries: 1250, trend: "+15%" },
    { title: "Climate Change Solutions", queries: 980, trend: "+8%" },
    { title: "Space Exploration Updates", queries: 750, trend: "+22%" },
    { title: "Quantum Computing Advances", queries: 640, trend: "+31%" },
    { title: "Renewable Energy Technologies", queries: 520, trend: "+12%" }
  ]

  const categories = [
    "Technology", "Science", "Health", "Business", "Education", 
    "Environment", "Space", "AI & ML", "Finance", "Politics"
  ]

  const recentQueries = [
    "How will quantum computers change cybersecurity?",
    "What are the latest developments in gene therapy?",
    "Explain the impact of AI on job markets",
    "How do solar panels work at the molecular level?",
    "What's happening with Mars exploration?"
  ]

  return (
    <div className="p-6 space-y-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-2">Discover</h1>
        <p className="text-muted-foreground mb-8">
          Explore trending topics and discover what others are learning about
        </p>

        {/* Trending Topics */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                Trending Topics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                    <div>
                      <h3 className="font-medium text-foreground">{topic.title}</h3>
                      <p className="text-sm text-muted-foreground flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {topic.queries} queries
                      </p>
                    </div>
                    <Badge variant="outline" className="text-green-400 border-green-400">
                      {topic.trend}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-primary" />
                Recent Popular Queries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentQueries.map((query, index) => (
                  <div key={index} className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                    <p className="text-foreground">{query}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Categories */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Explore by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="cursor-pointer hover:bg-primary/10 hover:border-primary/50 transition-colors"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}