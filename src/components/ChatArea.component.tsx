"use client"

import { useEffect, useRef } from "react"
import { User, Bot } from "lucide-react"
import type { Message } from "@/models/Message.model"

interface ChatAreaProps {
  messages: Message[]
}

export default function ChatArea({ messages }: ChatAreaProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        <div className="text-center">
          <Bot size={48} className="mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Start a conversation</h3>
          <p className="text-sm">Ask me anything about your data and I&apos;ll help you find insights.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div key={message.id} className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}>
          {message.type === "assistant" && (
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-neutral-600 rounded-full flex items-center justify-center">
                <Bot size={16} className="text-white" />
              </div>
            </div>
          )}

          <div
            className={`max-w-3xl cursor-default ${
              message.type === "user"
                ? "bg-emerald-100 text-gray-900 rounded-2xl rounded-br-md"
                : "bg-stone-200 text-gray-900 rounded-2xl rounded-bl-md"
            } px-4 py-3`}
          >
            <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
            <div className={`text-xs mt-2 text-gray-500`}>
              {formatTimestamp(message.timestamp)}
            </div>
          </div>

          {message.type === "user" && (
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
            </div>
          )}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}
