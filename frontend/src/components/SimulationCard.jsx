import { Bot, User, Package } from "lucide-react"

function SimulationCard() {
  return (
    <div className="glass-panel rounded-xl p-5 transition-colors duration-300">

      <div className="flex justify-between items-center mb-5 border-b border-zinc-200 dark:border-zinc-800/50 pb-4">
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          AI Shopping Simulation
        </h2>
        <button className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium flex items-center gap-1">
          View full simulation &rarr;
        </button>
      </div>

      <div className="space-y-6">

        {/* User Query */}
        <div className="flex justify-end items-end gap-2">
          <div className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-2xl rounded-tr-sm shadow-sm max-w-[80%]">
            Find me waterproof hiking shoes under ₹5000
          </div>
          <div className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center shrink-0">
            <User size={14} className="text-zinc-500 dark:text-zinc-300" />
          </div>
        </div>

        {/* AI Analysis */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-indigo-400 font-medium text-xs">
            <Bot size={14} />
            AI Agent Analysis
          </div>

          <div className="space-y-2">
            
            {/* Product 1 */}
            <div className="flex items-start gap-3 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/50 p-3 rounded-lg">
              <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700 shrink-0 flex items-center justify-center">
                <Package size={20} className="text-zinc-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-200">TrailBlaze Waterproof Shoes</h4>
                  <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">₹4,499</span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-500 leading-relaxed">
                  <span className="text-zinc-500 dark:text-zinc-400 font-medium">Reason:</span> Clear description, mentions waterproof feature, good attribute coverage.
                </p>
              </div>
              <div className="shrink-0 mt-1">
                <span className="text-[10px] font-medium px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Selected
                </span>
              </div>
            </div>

            {/* Product 2 */}
            <div className="flex items-start gap-3 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/50 p-3 rounded-lg">
              <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700 shrink-0 flex items-center justify-center">
                <Package size={20} className="text-zinc-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-200">StormX Pro</h4>
                  <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">₹3,999</span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-500 leading-relaxed">
                  <span className="text-zinc-500 dark:text-zinc-400 font-medium">Reason:</span> Missing waterproof info, vague description, unclear use case.
                </p>
              </div>
              <div className="shrink-0 mt-1">
                <span className="text-[10px] font-medium px-2 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/20">
                  Skipped
                </span>
              </div>
            </div>

          </div>

          <p className="text-[10px] text-zinc-500 dark:text-zinc-600 mt-4 text-center pt-2 border-t border-zinc-200 dark:border-zinc-800/30">
            Simulation is AI-generated and may not reflect real agent behavior.
          </p>

        </div>

      </div>

    </div>
  )
}

export default SimulationCard