import { useEffect } from "react"
import { Chart as ChartJS, registerables } from "chart.js"
import { Bar, Pie, Line } from "react-chartjs-2"
import { Chart } from "@/models/Chart.model"

ChartJS.register(...registerables)

interface ChartModalProps {
  chart: Chart
  onClose: () => void
}

export default function ChartModal({ chart, onClose }: ChartModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [onClose])

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose()
  }

  const labels = chart.data.map((d) => d.label)
  const values = chart.data.map((d) => d.value)

  const data = {
    labels,
    datasets: [
      {
        label: chart.title,
        data: values,
        backgroundColor: "#05966980",
        borderColor: "#059669BF",
        borderWidth: 1,
      },
    ],
  }

  const renderChart = () => {
    switch (chart.chart_type) {
      case "bar":
        return <Bar data={data} />
      case "line":
        return <Line data={data} />
      case "pie":
        return <Pie data={data} />
      default:
        return <p>Unsupported chart type: {chart.chart_type}</p>
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center" onClick={handleClickOutside}>
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl">
        <h2 className="text-lg font-semibold mb-4 text-center text-gray-700">Chart: {chart.title}</h2>
        <div className="max-h-[400px] overflow-auto">{renderChart()}</div>
        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-emerald-600 text-white rounded-full shadow hover:bg-emerald-700 transition duration-200 text-sm font-medium"
        >
            Close
        </button>
        </div>
      </div>
    </div>
  )
}
