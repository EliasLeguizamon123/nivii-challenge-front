"use client"

import { Plus, MessageSquare, Clock } from "lucide-react"
import { useHistoryContext } from "@/context/HistoryContext.context"

export default function Sidebar() {
  const {
    queryHistory,
    selectedQuery,
    handleNewQuery,
    handleSelectQuery,
  } = useHistoryContext()

  const formatTimestamp = (dateInput: string) => {
    const date = new Date(dateInput)
    const now = new Date()

    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return "Yesterday"
    return date.toLocaleDateString()
  }

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={handleNewQuery}
          className="cursor-pointer w-full flex items-center gap-3 px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <Plus size={20} />
          <span className="font-medium">New Query</span>
        </button>
      </div>

      {/* Query History */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Clock size={16} />
            Recent Queries
          </h2>

          <div className="space-y-2">
            {queryHistory.map((query) => (
              <button
                key={query.id}
                onClick={() => handleSelectQuery(query.id)}
                className={`w-full text-left p-3 rounded-lg transition-colors cursor-pointer ${
                  selectedQuery === query.id
                    ? "hover:bg-gray-50 bg-emerald-50 border border-emerald-300"
                    : "hover:bg-gray-50 border border-transparent"
                }`}
              >
                <div className="flex items-start gap-3">
                  <MessageSquare
                    size={16}
                    className={`mt-1 flex-shrink-0 ${selectedQuery === query.id ? "text-emerald-600" : "text-gray-400"}`}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 text-sm truncate">{query.title}</h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{query.preview}</p>
                    <p className="text-xs text-gray-400 mt-2">{formatTimestamp(query.created_at)}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
