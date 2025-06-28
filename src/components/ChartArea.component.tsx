"use client"

import { useState } from "react"
import { BarChart3 } from "lucide-react"
import { useHistoryContext } from "@/context/HistoryContext.context"
import ChartModal from "./ChartModal.component"

export default function ChartArea() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {
    charts,
    selectedChart,
    handleSelectChart,
  } = useHistoryContext()

  const selected = charts.find((chart) => chart.id === selectedChart)

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BarChart3 size={20} className="text-emerald-600" />
          <h3 className="font-semibold text-gray-900">
            {selected?.title || "Select a chart"}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedChart ?? ""}
            onChange={(e) => {
              const id = Number(e.target.value)
              handleSelectChart(id)
              setIsModalOpen(true)
            }}
            className="border border-black text-black px-3 py-2 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          >
            <option value="" disabled>Select a chart</option>
            {charts.map((chart, index) => (
              <option key={index} value={chart.id}>
                {chart.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isModalOpen && selected && (
        <ChartModal chart={selected} onClose={() => {
          setIsModalOpen(false)
          handleSelectChart(null)
        }} />
      )}
    </div>
  )
}
