export function renderFormattedContent(text: string) {
    const lines = text.split("\n")

    return lines.map((line, i) => {
      // Lista con guiones
      if (line.trim().startsWith("-")) {
        return (
          <div key={i} className="pl-4 list-disc list-inside text-sm text-gray-800">
            • {formatInline(line.trim().substring(1).trim())}
          </div>
        )
      }

      // Línea común
      return (
        <div key={i}>
          {formatInline(line)}
        </div>
      )
    })
  }

export function formatInline(line: string) {
    const parts = []
    let remaining = line
    const boldRegex = /\*\*(.+?)\*\*/
    const italicRegex = /"([^"]+?)"/

    while (remaining.length > 0) {
      const boldMatch = boldRegex.exec(remaining)
      const italicMatch = italicRegex.exec(remaining)

      if (boldMatch && (!italicMatch || boldMatch.index < italicMatch.index)) {
        if (boldMatch.index > 0) {
          parts.push(remaining.slice(0, boldMatch.index))
        }
        parts.push(<strong key={parts.length}>{boldMatch[1]}</strong>)
        remaining = remaining.slice(boldMatch.index + boldMatch[0].length)
      } else if (italicMatch) {
        if (italicMatch.index > 0) {
          parts.push(remaining.slice(0, italicMatch.index))
        }
        parts.push(<em key={parts.length}>{italicMatch[1]}</em>)
        remaining = remaining.slice(italicMatch.index + italicMatch[0].length)
      } else {
        parts.push(remaining)
        break
      }
    }

    return parts
  }