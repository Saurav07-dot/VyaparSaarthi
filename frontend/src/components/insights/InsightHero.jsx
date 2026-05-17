import {
  Star,
} from "lucide-react";

function InsightHero({
  overallHealth,
  storeStatus,
  summary,
  storeRating,
}) {

  return (

    <div className="bg-indigo-600 rounded-3xl p-8 text-white mb-8">

      <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

        {/* LEFT SIDE */}

        <div>

          <p className="uppercase text-sm tracking-widest text-indigo-100 mb-2">

            Store Health

          </p>

          <h1 className="text-5xl font-bold mb-3">

            {overallHealth}/100

          </h1>

          {/* STATUS + STAR RATING */}

          <div className="flex items-center gap-4 mb-5 flex-wrap">

            {/* STORE STATUS */}

            <span className="bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm font-medium">

              {storeStatus}

            </span>

            {/* STAR RATING */}

            <div className="flex items-center gap-2">

              <div className="flex items-center gap-1">

                {[1, 2, 3, 4, 5].map((star) => (

                  <Star
                    key={star}
                    size={18}
                    className={
                      star <= Math.round(storeRating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-white/40"
                    }
                  />

                ))}

              </div>

              <span className="text-sm font-medium">

                {storeRating}

              </span>

            </div>

          </div>

          {/* SUMMARY */}

          <p className="max-w-2xl text-indigo-100 leading-relaxed">

            {summary}

          </p>

        </div>

        {/* RIGHT SIDE */}

        <div className="w-40 h-40 rounded-full border-8 border-white/20 flex items-center justify-center">

          <div className="text-center">

            <p className="text-4xl font-bold">

              {overallHealth}

            </p>

            <p className="text-sm">

              Overall

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default InsightHero;