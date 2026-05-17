import { Rocket } from "lucide-react";

function GrowthOpportunities({
  opportunities,
}) {

  return (

    <div
    className="
    bg-white
    dark:bg-zinc-900
    rounded-2xl
    p-6
    mb-8
    border
    border-zinc-200
    dark:border-zinc-800
    shadow-sm
    ">

      <h2
      className="
      text-2xl
      font-bold
      text-zinc-900
      dark:text-white
      mb-6
      ">
        Growth Opportunities
      </h2>

      <div className="space-y-4">

        {opportunities.map(
        (item,index)=>(

          <div
          key={index}

          className="
          bg-zinc-100
          dark:bg-zinc-800
          rounded-xl
          p-4
          flex
          gap-3
          ">

            <Rocket
            size={18}
            className="text-violet-500 mt-1"
            />

            <p
            className="
            text-zinc-600
            dark:text-zinc-300
            ">
              {item}
            </p>

          </div>

        ))}

      </div>

    </div>

  );

}

export default GrowthOpportunities;