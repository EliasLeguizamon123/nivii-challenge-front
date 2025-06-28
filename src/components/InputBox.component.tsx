"use client"

import { useState, useRef } from "react"
import { Send } from "lucide-react"

interface InputBoxProps {
  onSendMessage: (content: string) => void
}

export default function InputBox({ onSendMessage }: InputBoxProps) {
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const message = input.trim()
    setInput("")
    setIsLoading(true)

    try {
      await onSendMessage(message)
    } finally {
      setIsLoading(false)
      textareaRef.current?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-200 focus-within:border-emerald-300 focus-within:ring-2 focus-within:ring-emerald-100 transition-all">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onInput={(e) => {
            const target = e.currentTarget
            target.style.height = "20px"
            target.style.height = Math.min(target.scrollHeight, 80) + "px"
          }}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything about your data..."
          className="flex-1 bg-transparent border-none outline-none resize-none text-gray-900 placeholder-gray-500 text-sm leading-[1.2] min-h-[20px] max-h-32 text-left py-1"
          rows={1}
          style={{ maxHeight: 80, overflowY: "auto" }}
          disabled={isLoading}
        />

        <div className="flex items-center gap-2">
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="cursor-pointer p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Send message"
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      <div className="mt-2 text-xs text-gray-500 text-center">
        Press Enter to send, Shift + Enter for new line
      </div>
    </form>
  )
}
