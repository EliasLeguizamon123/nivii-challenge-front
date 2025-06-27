"use client"

import { useEffect, useState } from "react"
import Sidebar from "@/components/Sidebar.component"
import MainContent from "@/components/MainContent.component"
import type { QueryHistory } from "@/models/QueryHistory.model"
import type { Message } from "@/models/Message.model"
import { getHistory, getQueryHistoryById } from "@/services/history.service"

export default function Home() {
  const [selectedQuery, setSelectedQuery] = useState<number | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [queryHistory, setQueryHistory] = useState<QueryHistory[]>([])

  const handleNewQuery = () => {
    setSelectedQuery(null)
    setMessages([])
  }

  const handleSelectQuery = (queryId: number) => {
    setSelectedQuery(queryId)
    // In a real app, you'd fetch the messages for this query
    getQueryHistoryById(queryId).then((response) => {
        console.log(response)
        setMessages(response.messages)
    })
  }

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
      created_at: new Date().toString(),
      history_id: 1,
    }

    setMessages((prev) => [...prev, userMessage])

    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: "I understand your query. Let me analyze the data and provide you with insights...",
        created_at: new Date().toString(),
        history_id: 1
      }
      setMessages((prev) => [...prev, assistantMessage])
    }, 1000)

    // Add to query history if it's a new query
    if (!selectedQuery) {
      const newQuery: QueryHistory = {
        id: 0,
        title: content.slice(0, 50) + (content.length > 50 ? "..." : ""),
        created_at: new Date().toString(),
        preview: content,
      }
      setQueryHistory((prev) => [newQuery, ...prev])
      setSelectedQuery(newQuery.id)
    }
  }

  useEffect(() => {
    getHistory().then((response) => {
      setQueryHistory(response);
    })
  }, [])

  return (
    <>
      <Sidebar
        queryHistory={queryHistory}
        selectedQuery={selectedQuery}
        onNewQuery={handleNewQuery}
        onSelectQuery={handleSelectQuery}
      />
      <MainContent messages={messages} onSendMessage={handleSendMessage} hasChart={messages.some((m) => m.has_chart)} />
    </>
  )
}
