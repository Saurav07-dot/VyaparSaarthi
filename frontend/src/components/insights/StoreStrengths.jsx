import {
  CheckCircle2,
} from "lucide-react";

function StoreStrengths({
  strengths,
}) {

  return (

    <div className="bg-[#1e293b] rounded-2xl p-6 mb-8">

      <h2 className="text-2xl font-bold text-white mb-6">
        Store Strengths
      </h2>

      <div className="space-y-4">

        {strengths.map(
          (item, index) => (

            <div
              key={index}
              className="flex items-start gap-3"
            >

              <CheckCircle2
                size={20}
                className="text-green-400 mt-1"
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

export default StoreStrengths;