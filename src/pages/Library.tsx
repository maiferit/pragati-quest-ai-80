import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, Star, Trash2, Share } from "lucide-react"

export default function Library() {
  const savedChats = [
    {
      id: 1,
      title: "Understanding Quantum Computing",
      preview: "Quantum computing represents a fundamental shift in how we process information...",
      timestamp: "2 hours ago",
      tags: ["Technology", "Science"],
      isStarred: true
    },
    {
      id: 2,
      title: "Climate Change Solutions",
      preview: "Comprehensive analysis of renewable energy solutions and carbon capture technologies...",
      timestamp: "1 day ago",
      tags: ["Environment", "Energy"],
      isStarred: false
    },
    {
      id: 3,
      title: "AI Ethics and Future",
      preview: "Exploring the ethical implications of artificial intelligence and its impact on society...",
      timestamp: "3 days ago",
      tags: ["AI", "Ethics"],
      isStarred: true
    },
    {
      id: 4,
      title: "Space Exploration Timeline",
      preview: "A detailed timeline of human space exploration from the Apollo missions to Mars...",
      timestamp: "1 week ago",
      tags: ["Space", "History"],
      isStarred: false
    }
  ]

  const bookmarks = [
    "How neural networks learn patterns",
    "The future of renewable energy",
    "Breakthrough in gene therapy",
    "Quantum entanglement explained",
    "Mars colonization challenges"
  ]

  return (
    <div className="p-6 space-y-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-2">Library</h1>
        <p className="text-muted-foreground mb-8">
          Your saved conversations, bookmarks, and learning history
        </p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Saved Chats */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-primary" />
                  Saved Conversations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {savedChats.map((chat) => (
                    <div key={chat.id} className="p-4 rounded-lg border border-border hover:border-primary/30 transition-colors cursor-pointer">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-foreground flex items-center">
                          {chat.isStarred && (
                            <Star className="h-4 w-4 text-yellow-400 mr-2 fill-current" />
                          )}
                          {chat.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Share className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Star className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                        {chat.preview}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {chat.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {chat.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bookmarks */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-primary" />
                  Bookmarks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {bookmarks.map((bookmark, index) => (
                    <div key={index} className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                      <p className="text-sm text-foreground">{bookmark}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Usage Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Your Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Questions Asked</span>
                    <span className="font-semibold text-foreground">127</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Conversations</span>
                    <span className="font-semibold text-foreground">24</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bookmarks</span>
                    <span className="font-semibold text-foreground">{bookmarks.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">This Month</span>
                    <span className="font-semibold text-primary">+18%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}