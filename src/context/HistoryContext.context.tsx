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
  isLoading: boolean
  setSelectedChart: (id: number | null) => void
  handleNewQuery: () => void
  handleSelectQuery: (id: number) => void
  handleSelectChart: (id: number | null) => void
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
  const [isLoading, setIsLoading] = useState<boolean>(false)

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

  const handleSelectChart = (chartId: number | null) => {
    if (chartId === null) {
      // reseteá la selección o lo que necesites hacer
      setSelectedChart(null)
    } else {
      setSelectedChart(chartId)
    }
  }

    const handleSendMessage = async (content: string) => {
    setIsLoading(true);

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
      created_at: new Date().toString(),
      history_id: selectedQuery ?? undefined,
    }

    setMessages((prev) => [...prev, userMessage])

    
    const response = await sendMessageToHistory(selectedQuery, content)
    
    setMessages(response.messages);
    setCharts(response.charts);
    setIsLoading(false);
  
    if (!selectedQuery && response?.id) {
      const newQuery: QueryHistory = {
        id: response.id,
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
        isLoading,
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
