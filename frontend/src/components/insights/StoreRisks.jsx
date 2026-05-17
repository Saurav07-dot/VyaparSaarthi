import {
  AlertTriangle,
} from "lucide-react";

function StoreRisks({
  risks,
}) {

  return (

    <div className="bg-[#1e293b] rounded-2xl p-6 mb-8">

      <h2 className="text-2xl font-bold text-white mb-6">
        What May Hurt Sales
      </h2>

      <div className="space-y-4">

        {risks.map(
          (risk, index) => (

            <div
              key={index}
              className="flex items-start gap-3"
            >

              <AlertTriangle
                size={20}
                className="text-red-400 mt-1"
              />

              <p className="text-slate-300">
                {risk}
              </p>

            </div>
          )
        )}

      </div>

    </div>
  );
}

export default StoreRisks;