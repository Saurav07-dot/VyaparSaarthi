import {
  Zap,
} from "lucide-react";

function QuickWins({
  quickWins,
}) {

  return (

    <div className="bg-[#1e293b] rounded-2xl p-6 mb-8">

      <h2 className="text-2xl font-bold text-white mb-6">
        Quick Wins
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {quickWins.map(
          (item, index) => (

            <div
              key={index}
              className="bg-slate-800 rounded-xl p-4 flex gap-3"
            >

              <Zap
                size={18}
                className="text-yellow-400 mt-1"
              />

              <p className="text-slate-300">
                {item}
              </p>

            </div>
          )
        )}

      </div>

    </div>
  );
}

export default QuickWins;