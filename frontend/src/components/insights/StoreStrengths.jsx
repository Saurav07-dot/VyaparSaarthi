import {
  CheckCircle2,
} from "lucide-react";

function StoreStrengths({
  strengths,
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
        Store Strengths
      </h2>

      <div className="space-y-4">

        {strengths.map(
          (item,index)=>(

            <div
            key={index}
            className="
            flex
            items-start
            gap-3
            p-3
            rounded-xl
            hover:bg-zinc-100
            dark:hover:bg-zinc-800
            transition
            ">

              <CheckCircle2
              size={20}
              className="
              text-green-500
              mt-1
              "
              />

              <p
              className="
              text-zinc-600
              dark:text-zinc-300
              ">
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