import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Plus, MessageSquare, TrendingUp, Globe } from "lucide-react"

export default function Spaces() {
  const spaces = [
    {
      id: 1,
      name: "AI Research Hub",
      description: "Discuss latest AI developments, research papers, and breakthrough technologies",
      members: 2340,
      posts: 156,
      isJoined: true,
      category: "Technology",
      trending: true
    },
    {
      id: 2,
      name: "Climate Solutions",
      description: "Collaborative space for discussing environmental challenges and sustainable solutions",
      members: 1890,
      posts: 89,
      isJoined: false,
      category: "Environment",
      trending: false
    },
    {
      id: 3,
      name: "Quantum Computing",
      description: "Deep dive into quantum computing concepts, applications, and future possibilities",
      members: 1250,
      posts: 134,
      isJoined: true,
      category: "Science",
      trending: true
    },
    {
      id: 4,
      name: "Space Exploration",
      description: "Everything about space missions, astronomy, and the future of human spaceflight",
      members: 3100,
      posts: 201,
      isJoined: false,
      category: "Space",
      trending: false
    }
  ]

  const mySpaces = spaces.filter(space => space.isJoined)
  const suggestedSpaces = spaces.filter(space => !space.isJoined)

  return (
    <div className="p-6 space-y-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Spaces</h1>
            <p className="text-muted-foreground">
              Join communities, share knowledge, and learn from experts
            </p>
          </div>
          <Button variant="premium">
            <Plus className="h-4 w-4 mr-2" />
            Create Space
          </Button>
        </div>

        {/* My Spaces */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2 text-primary" />
            My Spaces
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mySpaces.map((space) => (
              <Card key={space.id} className="hover:border-primary/30 transition-colors cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg flex items-center">
                      {space.trending && (
                        <TrendingUp className="h-4 w-4 text-green-400 mr-2" />
                      )}
                      {space.name}
                    </CardTitle>
                    <Badge variant="outline">{space.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {space.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {space.members.toLocaleString()} members
                    </span>
                    <span className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {space.posts} posts
                    </span>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Globe className="h-4 w-4 mr-2" />
                    Visit Space
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Suggested Spaces */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Suggested Spaces</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestedSpaces.map((space) => (
              <Card key={space.id} className="hover:border-primary/30 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg flex items-center">
                      {space.trending && (
                        <TrendingUp className="h-4 w-4 text-green-400 mr-2" />
                      )}
                      {space.name}
                    </CardTitle>
                    <Badge variant="outline">{space.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {space.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {space.members.toLocaleString()} members
                    </span>
                    <span className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {space.posts} posts
                    </span>
                  </div>
                  <Button variant="premium" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Join Space
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}