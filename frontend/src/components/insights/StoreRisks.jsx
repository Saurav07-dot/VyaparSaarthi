import {
  AlertTriangle,
} from "lucide-react";

function StoreRisks({
  risks,
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
        What May Hurt Sales
      </h2>

      <div className="space-y-4">

        {risks.map(
          (risk,index)=>(

            <div
            key={index}

            className="
            flex
            items-start
            gap-3
            p-3
            rounded-xl
            hover:bg-red-50
            dark:hover:bg-zinc-800
            transition
            ">

              <AlertTriangle
              size={20}
              className="
              text-red-500
              mt-1
              "
              />

              <p
              className="
              text-zinc-600
              dark:text-zinc-300
              ">
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