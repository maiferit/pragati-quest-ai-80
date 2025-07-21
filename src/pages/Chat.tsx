import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { ChatInterface } from "@/components/ChatInterface"

export default function Chat() {
  const [searchParams] = useSearchParams()
  const initialQuery = searchParams.get("q")

  return (
    <div className="h-full">
      <ChatInterface initialQuery={initialQuery || undefined} />
    </div>
  )
}