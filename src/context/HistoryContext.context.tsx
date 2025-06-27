"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { QueryHistory } from "@/models/QueryHistory.model"
import { Message } from "@/models/Message.model"
import { Chart } from "@/models/Chart.model"
import { getHistory, getQueryHistoryById } from "@/services/history.service"
import { sendMessageToHistory } from "@/services/messages.service"

interface HistoryContextType {
  selectedQuery: number | null
  messages: Message[]
  charts: Chart[]
  queryHistory: QueryHistory[]
  selectedChart: number | null
  setSelectedChart: (id: number | null) => void
  handleNewQuery: () => void
  handleSelectQuery: (id: number) => void
  handleSelectChart: (id: number) => void
  handleSendMessage: (content: string) => Promise<void>
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined)

export const useHistoryContext = () => {
  const context = useContext(HistoryContext)
  if (!context) throw new Error("useHistoryContext must be used within a HistoryProvider")
  return context
}

export const HistoryProvider = ({ children }: { children: ReactNode }) => {
  const [selectedQuery, setSelectedQuery] = useState<number | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [charts, setCharts] = useState<Chart[]>([])
  const [selectedChart, setSelectedChart] = useState<number | null>(null)
  const [queryHistory, setQueryHistory] = useState<QueryHistory[]>([])

  useEffect(() => {
    getHistory().then(setQueryHistory)
  }, [])

  const handleNewQuery = () => {
    setSelectedQuery(null)
    setMessages([])
    setCharts([])
  }

  const handleSelectQuery = (queryId: number) => {
    setSelectedQuery(queryId)
    getQueryHistoryById(queryId).then((response) => {
      setMessages(response.messages)
      setCharts(response.charts)
    })
  }

  const handleSelectChart = (chartId: number) => {
    setSelectedChart(chartId)
  }

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
      created_at: new Date().toString(),
      history_id: selectedQuery ?? undefined,
    }

    setMessages((prev) => [...prev, userMessage])

    const response = await sendMessageToHistory(selectedQuery, content)
    setCharts((prev) => [...prev, ...response.charts])

    if (!selectedQuery && response?.history_id) {
      const newQuery: QueryHistory = {
        id: response.history_id,
        title: content.slice(0, 50) + (content.length > 50 ? "..." : ""),
        created_at: new Date().toString(),
        preview: content,
      }
      setQueryHistory((prev) => [newQuery, ...prev])
      setSelectedQuery(newQuery.id)
    }
  }

  return (
    <HistoryContext.Provider
      value={{
        selectedQuery,
        messages,
        charts,
        queryHistory,
        selectedChart,
        setSelectedChart,
        handleNewQuery,
        handleSelectQuery,
        handleSelectChart,
        handleSendMessage,
      }}
    >
      {children}
    </HistoryContext.Provider>
  )
}
