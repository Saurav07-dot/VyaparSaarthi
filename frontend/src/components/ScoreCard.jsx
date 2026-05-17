import { CircularProgressbar } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { Info } from "lucide-react"
import { useTheme } from "../context/ThemeContext"

function ScoreCard({
  title,
  score,
  status,
  color,
  trend,
  trendColor
}) {
  const { theme } = useTheme()

  return (
    <div className="glass-panel rounded-xl p-5 flex flex-col transition-colors duration-300">
      
      <div className="flex items-center gap-2 mb-5">
        <h2 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {title}
        </h2>
        <Info size={14} className="text-zinc-400 dark:text-zinc-500 cursor-pointer hover:text-zinc-600 dark:hover:text-zinc-300" />
      </div>

      <div className="flex items-center gap-5 mt-auto">

        <div className="w-16 h-16">
          <CircularProgressbar
            value={score}
            text={`${score}`}
            styles={{
              path: {
                stroke: color,
                strokeLinecap: 'round',
              },
              text: {
                fill: theme === 'light' ? '#18181b' : 'white', // zinc-900 or white
                fontSize: "28px",
                fontWeight: "600",
                dominantBaseline: 'central',
                textAnchor: 'middle',
              },
              trail: {
                stroke: theme === 'light' ? '#e4e4e7' : '#1F2335', // zinc-200 or custom dark
              },
            }}
          />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-zinc-900 dark:text-white leading-none">
              {score}
            </span>
            <span className="text-xs text-zinc-500 font-medium">
              /100
            </span>
          </div>

          <span className="text-xs font-semibold" style={{ color }}>
            {status}
          </span>
          
          {trend && (
            <span className={`text-[10px] font-medium ${trendColor}`}>
              {trend}
            </span>
          )}
        </div>

      </div>
    </div>
  )
}

export default ScoreCard