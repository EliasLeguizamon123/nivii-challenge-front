"use client"

import { useState } from "react"
import Sidebar from "@/components/Sidebar.component"
import MainContent from "@/components/MainContent.component"
import type { QueryHistory } from "@/models/QueryHistory.model"
import type { Message } from "@/models/Message.model"

// Mock data
const mockQueryHistory: QueryHistory[] = [
  {
    id: "1",
    title: "Sales performance Q4 2023",
    timestamp: new Date("2024-01-15T10:30:00"),
    preview: "Show me the sales data for Q4 2023",
  },
]

const mockMessages: Message[] = [
  {
    id: "1",
    type: "user",
    content: "Show me the sales data for Q4 2023",
    timestamp: new Date("2024-01-15T10:30:00"),
  },
  {
    id: "2",
    type: "assistant",
    content:
      "Here's the Q4 2023 sales data analysis. The total revenue was $2.4M, representing a 15% increase from Q3. Key highlights include:\n\n• North America: $1.2M (50% of total)\n• Europe: $720K (30% of total)\n• Asia-Pacific: $480K (20% of total)\n\nThe growth was primarily driven by our new product line launch in November.",
    timestamp: new Date("2024-01-15T10:30:30"),
    hasChart: true,
  },
]

export default function Home() {
  const [selectedQuery, setSelectedQuery] = useState<string | null>("1")
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [queryHistory, setQueryHistory] = useState<QueryHistory[]>(mockQueryHistory)

  const handleNewQuery = () => {
    setSelectedQuery(null)
    setMessages([])
  }

  const handleSelectQuery = (queryId: string) => {
    setSelectedQuery(queryId)
    // In a real app, you'd fetch the messages for this query
    setMessages(mockMessages)
  }

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: "I understand your query. Let me analyze the data and provide you with insights...",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
    }, 1000)

    // Add to query history if it's a new query
    if (!selectedQuery) {
      const newQuery: QueryHistory = {
        id: Date.now().toString(),
        title: content.slice(0, 50) + (content.length > 50 ? "..." : ""),
        timestamp: new Date(),
        preview: content,
      }
      setQueryHistory((prev) => [newQuery, ...prev])
      setSelectedQuery(newQuery.id)
    }
  }

  return (
    <>
      <Sidebar
        queryHistory={queryHistory}
        selectedQuery={selectedQuery}
        onNewQuery={handleNewQuery}
        onSelectQuery={handleSelectQuery}
      />
      <MainContent messages={messages} onSendMessage={handleSendMessage} hasChart={messages.some((m) => m.hasChart)} />
    </>
  )
}
