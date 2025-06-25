import ChatArea from "./ChatArea.component"
import ChartArea from "./ChartArea.component"
import InputBox from "./InputBox.component"
import type { Message } from "@/models/Message.model"

interface MainContentProps {
  messages: Message[]
  onSendMessage: (content: string) => void
  hasChart: boolean
}

export default function MainContent({ messages, onSendMessage, hasChart }: MainContentProps) {
  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Chart Area - Only show if there's chart data */}
      {hasChart && (
        <div className="border-b border-gray-200">
          <ChartArea />
        </div>
      )}

      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-h-0">
        <ChatArea messages={messages} />
        <div className="border-t border-gray-200 p-4">
          <InputBox onSendMessage={onSendMessage} />
        </div>
      </div>
    </div>
  )
}
