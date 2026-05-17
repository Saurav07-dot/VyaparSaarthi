import {
  ArrowRight,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import ProductScoreBadge
  from "./ProductScoreBadge";

function ProductCard({ product }) {

  const navigate =
    useNavigate();

  const avgScore = Math.floor(
    (
      (product.scores?.clarity || 0) +
      (product.scores?.discoverability || 0) +
      (product.scores?.trust || 0) +
      (product.scores?.conversion || 0)
    ) / 4
  );

  return (

    <div className="glass-panel rounded-2xl overflow-hidden hover:border-indigo-400 dark:hover:border-indigo-500/40 transition-all duration-300">

      <img
        src={product.images?.[0]}
        alt={product.title}
        className="w-full h-52 object-cover"
      />

      <div className="p-5">

        <div className="flex items-start justify-between gap-3">

          <div>

            <h2 className="text-zinc-900 dark:text-white font-semibold text-lg line-clamp-2">
              {product.title}
            </h2>

            <p className="text-zinc-400 text-sm mt-1">
              {product.category}
            </p>

          </div>

          <ProductScoreBadge
            classification={
              product.classification
            }
          />

        </div>

        <div className="mt-5">

          <div className="flex items-center justify-between mb-2">
            <span className="text-zinc-400 text-sm">
              AI Score
            </span>

            <span className="text-zinc-900 dark:text-white font-bold">
              {avgScore}/100
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">

            <div
              className="h-full bg-indigo-500"
              style={{
                width: `${avgScore}%`,
              }}
            />

          </div>

        </div>

        <button
          onClick={() =>
            navigate(
              `/products/${product._id}`
            )
          }
          className="mt-6 w-full bg-indigo-600 hover:bg-indigo-500 transition-all text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2"
        >

          View Details

          <ArrowRight size={16} />

        </button>

      </div>

    </div>
  );
}

export default ProductCard;