import { useNavigate } from "react-router-dom"

import {
  AlertTriangle,
  ChevronRight,
  ShieldAlert,
  Search,
  Sparkles,
  Package,
} from "lucide-react"

function IssueCard({
  title,
  description,
  impact,
  items,
  impactColor,
  affectedProducts = [],
}) {

  const navigate = useNavigate()

  // =====================================
  // OPEN PRODUCT DETAIL
  // =====================================

  const handleProductClick = (id) => {
    navigate(`/products/${id}`)
  }

  // =====================================
  // ICONS
  // =====================================

  const getIcon = () => {

    if (title.toLowerCase().includes("trust")) {
      return <ShieldAlert size={18} />
    }

    if (title.toLowerCase().includes("seo")) {
      return <Search size={18} />
    }

    return <AlertTriangle size={18} />
  }

  // =====================================
  // IMPACT COLORS
  // =====================================

  const getImpactStyle = () => {

    if (impact.toLowerCase().includes("high")) {
      return "bg-red-500/10 text-red-500 dark:text-red-400 border border-red-500/20"
    }

    if (impact.toLowerCase().includes("medium")) {
      return "bg-orange-500/10 text-orange-500 dark:text-orange-400 border border-orange-500/20"
    }

    return "bg-yellow-500/10 text-yellow-500 dark:text-yellow-400 border border-yellow-500/20"
  }

  return (

    <div className="
      group relative rounded-2xl
      border border-zinc-200 dark:border-zinc-800/60
      bg-white dark:bg-[#0F1320]
      hover:bg-zinc-50 dark:hover:bg-[#151A2A]
      hover:border-indigo-400 dark:hover:border-indigo-500/30
      transition-all duration-300
      p-4 cursor-pointer overflow-visible
    ">

      {/* MAIN CARD */}

      <div className="flex items-center justify-between gap-5">

        {/* LEFT */}

        <div className="flex items-start gap-4 min-w-0">

          {/* ICON */}

          <div
            className={`
              w-11 h-11 rounded-xl
              flex items-center justify-center
              shrink-0
              ${impactColor}
              bg-current/10
              border border-current/10
            `}
          >

            <div className={impactColor}>
              {getIcon()}
            </div>

          </div>

          {/* CONTENT */}

          <div className="min-w-0">

            <div className="flex items-center gap-2 flex-wrap">

              <h3 className="
                text-sm font-semibold
                text-zinc-900 dark:text-white
                group-hover:text-indigo-600
                dark:group-hover:text-indigo-300
                transition
              ">

                {title}

              </h3>

              <span
                className={`text-[10px] px-2.5 py-1 rounded-full font-medium ${getImpactStyle()}`}
              >
                {impact}
              </span>

            </div>

            <p className="
              text-sm
              text-zinc-600 dark:text-zinc-500
              mt-1 leading-relaxed
            ">
              {description}
            </p>

            {/* FOOTER */}

            <div className="flex items-center gap-3 mt-3">

              <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400 text-xs">

                <Sparkles size={12} />

                <span>
                  AI detected issue
                </span>

              </div>

              <span className="text-zinc-400">
                •
              </span>

              <div className="
                text-xs
                text-zinc-600 dark:text-zinc-400
              ">

                <span className="
                  text-zinc-900 dark:text-white
                  font-semibold
                ">
                  {items}
                </span>{" "}

                affected products

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="hidden md:flex items-center gap-3">

          <div className="text-right">

            <p className="
              text-2xl font-bold
              text-zinc-900 dark:text-white
              leading-none
            ">

              {items}

            </p>

            <p className="
              text-[11px]
              text-zinc-500
              mt-1 uppercase tracking-wide
            ">

              Products

            </p>

          </div>

          <div className="
            w-10 h-10 rounded-xl
            bg-zinc-100 dark:bg-zinc-900
            border border-zinc-200 dark:border-zinc-800
            flex items-center justify-center
            group-hover:border-indigo-300
            dark:group-hover:border-indigo-500/30
            group-hover:bg-indigo-50
            dark:group-hover:bg-indigo-500/10
            transition
          ">

            <ChevronRight
              size={18}
              className="
              text-zinc-400 dark:text-zinc-500
              group-hover:text-indigo-600
              dark:group-hover:text-indigo-400
              transition
            "
            />

          </div>

        </div>

      </div>

      {/* FLOATING HOVER PANEL */}

      <div className="
        absolute hidden group-hover:block
        left-full ml-4 top-1/2
        -translate-y-1/2
        w-[340px] z-50
      ">

        <div className="
          bg-white dark:bg-[#111827]
          border border-zinc-200 dark:border-zinc-800
          rounded-2xl
          shadow-2xl overflow-hidden
        ">

          {/* HEADER */}

          <div className="
            flex items-center justify-between
            px-4 py-3
            border-b border-zinc-200 dark:border-zinc-800
            bg-zinc-50 dark:bg-[#151A2A]
          ">

            <div>

              <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">

                Affected Products

              </h4>

              <p className="text-xs text-zinc-500 mt-0.5">

                Click product to view details

              </p>

            </div>

            <span className="text-xs text-zinc-400">

              {affectedProducts.length} items

            </span>

          </div>

          {/* PRODUCTS */}

          <div className="max-h-[320px] overflow-y-auto p-3 space-y-2">

            {affectedProducts
              .slice(0, 5)
              .map((product) => (

                <div
                  key={product._id}
                  onClick={() => handleProductClick(product._id)}
                  className="
                    flex items-center gap-3
                    p-2 rounded-xl
                    hover:bg-zinc-100
                    dark:hover:bg-zinc-800/60
                    transition cursor-pointer
                    group/product
                  "
                >

                  <div className="
                    w-12 h-12 rounded-xl
                    overflow-hidden
                    border border-zinc-200
                    dark:border-zinc-800
                    bg-zinc-100
                    dark:bg-zinc-900
                    shrink-0
                  ">

                    {product.images?.[0] ? (

                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />

                    ) : (

                      <div className="w-full h-full flex items-center justify-center">

                        <Package
                          size={16}
                          className="text-zinc-500"
                        />

                      </div>

                    )}

                  </div>

                  <div className="min-w-0 flex-1">

                    <p className="
                      text-sm font-medium
                      text-zinc-900 dark:text-white
                      truncate
                      group-hover/product:text-indigo-600
                      dark:group-hover/product:text-indigo-300
                      transition
                    ">

                      {product.title}

                    </p>

                    <div className="flex items-center gap-2 mt-1">

                      <span className="text-xs text-zinc-500">
                        Score: {product.overallScore}
                      </span>

                      <span className="text-zinc-400 text-xs">
                        •
                      </span>

                      <span className="text-xs text-zinc-500">
                        ₹{product.price}
                      </span>

                    </div>

                  </div>

                  <ChevronRight
                    size={16}
                    className="
                      text-zinc-500
                      group-hover/product:text-indigo-400
                      transition
                    "
                  />

                </div>

              ))}

          </div>

        </div>

      </div>

    </div>
  )
}

export default IssueCard