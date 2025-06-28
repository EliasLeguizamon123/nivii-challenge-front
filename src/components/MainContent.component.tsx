"use client"

import ChatArea from "./ChatArea.component"
import ChartArea from "./ChartArea.component"
import InputBox from "./InputBox.component"
import { useHistoryContext } from "@/context/HistoryContext.context"

export default function MainContent() {
  const {
    messages,
    isLoading,
    handleSendMessage,
    charts,
  } = useHistoryContext()

  const hasChart = charts.length > 0

  return (
    <div className="flex-1 flex flex-col bg-white">
      {hasChart && (
        <div className="border-b border-gray-200">
          <ChartArea />
        </div>
      )}
      <div className="flex-1 flex flex-col min-h-0">
        <ChatArea messages={messages} loading={isLoading} />
        <div className="border-t border-gray-200 p-4">
          <InputBox onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  )
}
