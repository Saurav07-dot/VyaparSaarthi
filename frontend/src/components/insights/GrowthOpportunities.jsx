import {
  Rocket,
} from "lucide-react";

function GrowthOpportunities({
  opportunities,
}) {

  return (

    <div className="bg-[#1e293b] rounded-2xl p-6 mb-8">

      <h2 className="text-2xl font-bold text-white mb-6">
        Growth Opportunities
      </h2>

      <div className="space-y-4">

        {opportunities.map(
          (item, index) => (

            <div
              key={index}
              className="bg-slate-800 rounded-xl p-4 flex gap-3"
            >

              <Rocket
                size={18}
                className="text-indigo-400 mt-1"
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

export default GrowthOpportunities;