import { BarChart3 } from "lucide-react"

export default function ChartArea() {
  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BarChart3 size={20} className="text-emerald-600" />
          <h3 className="font-semibold text-gray-900">Q4 2023 Sales Performance</h3>
        </div>
      </div>

      {/* Mock Chart Visualization */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 text-gray-900">
        SUPER INCREIBLE CHART
      </div>
    </div>
  )
}
