"use client"

import { useState } from "react"
import { BarChart3 } from "lucide-react"
import { useHistoryContext } from "@/context/HistoryContext.context"

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
            onChange={(e) => handleSelectChart(Number(e.target.value))}
            className="border px-2 py-1 rounded-md text-sm"
          >
            <option value="" disabled>Select a chart</option>
            {charts.map((chart, index) => (
              <option key={index} value={chart.id}>
                {chart.title}
              </option>
            ))}
          </select>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-emerald-600 text-white text-sm px-3 py-1 rounded-md hover:bg-emerald-700 transition"
            disabled={!selectedChart}
          >
            Show chart
          </button>
        </div>
      </div>

      {isModalOpen && selected && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
            <h2 className="text-lg font-semibold mb-4">{selected.title}</h2>
            <pre className="text-sm bg-gray-100 p-4 rounded-md overflow-auto max-h-[400px]">
              {JSON.stringify(selected.data, null, 2)}
            </pre>
            <div className="mt-4 text-right">
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-sm text-gray-600 hover:underline"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
