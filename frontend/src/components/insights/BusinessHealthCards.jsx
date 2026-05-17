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
      value:
        scores.customerTrust,
      icon:
        <ShieldCheck size={24} />,
    },

    {
      title: "Buying Confidence",
      value:
        scores.buyingConfidence,
      icon:
        <ShoppingBag size={24} />,
    },

    {
      title: "Conversion Readiness",
      value:
        scores.conversionReadiness,
      icon:
        <TrendingUp size={24} />,
    },

    {
      title: "Search Visibility",
      value:
        scores.searchVisibility,
      icon:
        <Search size={24} />,
    },
  ];

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

      {cards.map((card, index) => (

        <div
          key={index}
          className="bg-[#1e293b] border border-slate-700 rounded-2xl p-6"
        >

          <div className="flex items-center justify-between mb-5">

            <div className="bg-slate-800 p-3 rounded-xl text-indigo-400">
              {card.icon}
            </div>

            <h2 className="text-3xl font-bold text-white">
              {card.value}%
            </h2>

          </div>

          <p className="text-slate-300 font-medium">
            {card.title}
          </p>

        </div>
      ))}

    </div>
  );
}

export default BusinessHealthCards;