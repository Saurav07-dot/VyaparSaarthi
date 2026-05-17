import {
  ShieldCheck,
  ShoppingBag,
  TrendingUp,
  Search,
} from "lucide-react";

function BusinessHealthCards({
  scores,
}) {

  const cards = [

    {
      title: "Customer Trust",
      value: scores.customerTrust,
      icon: <ShieldCheck size={24} />,
    },

    {
      title: "Buying Confidence",
      value: scores.buyingConfidence,
      icon: <ShoppingBag size={24} />,
    },

    {
      title: "Conversion Readiness",
      value: scores.conversionReadiness,
      icon: <TrendingUp size={24} />,
    },

    {
      title: "Search Visibility",
      value: scores.searchVisibility,
      icon: <Search size={24} />,
    },

  ];

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

      {cards.map((card,index)=>(

        <div
        key={index}

        className="
        bg-white
        dark:bg-zinc-900
        border
        border-zinc-200
        dark:border-zinc-800
        rounded-2xl
        p-6
        shadow-sm
        hover:shadow-xl
        transition-all
        duration-300
        ">

          <div className="flex items-center justify-between mb-5">

            <div
            className="
            bg-violet-50
            dark:bg-zinc-800
            p-3
            rounded-xl
            text-violet-600
            dark:text-violet-400
            ">
              {card.icon}
            </div>

            <h2
            className="
            text-3xl
            font-bold
            text-zinc-900
            dark:text-white
            ">
              {card.value}%
            </h2>

          </div>

          <p
          className="
          text-zinc-600
          dark:text-zinc-300
          font-medium
          ">
            {card.title}
          </p>

        </div>

      ))}

    </div>

  );

}

export default BusinessHealthCards;