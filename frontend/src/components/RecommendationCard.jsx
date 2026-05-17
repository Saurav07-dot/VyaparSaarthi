import {
  useEffect,
  useState,
} from "react"

import {
  FileText,
  CheckCircle,
  ChevronRight,
  ShieldAlert,
  Search,
  Sparkles,
} from "lucide-react"

import {
  useNavigate,
} from "react-router-dom"

import {
  getRecommendations,
} from "../services/recommendationService"

function RecommendationCard() {

  const navigate =
    useNavigate()

  const [
    recommendations,
    setRecommendations,
  ] = useState([])

  // =====================================
  // LOAD RECOMMENDATIONS
  // =====================================

  useEffect(() => {

    async function load() {

      try {

        const user =
          JSON.parse(
            sessionStorage.getItem(
              "user")
          )

        const data =
          await getRecommendations(
            user.storeId
          )

        const filtered =
          data?.recommendations
            ?.filter(
              (rec) =>
                rec.priority ===
                "High"
            )
            ?.slice(0, 3)

        setRecommendations(
          filtered || []
        )

      } catch (error) {

        console.log(error)
      }
    }

    load()

  }, [])

  // =====================================
  // ICONS
  // =====================================

  function getIcon(category) {

    if (
      category
        ?.toLowerCase()
        .includes("policy")
    ) {

      return {
        icon:
          <ShieldAlert
            size={16}
            className="text-red-500 dark:text-red-400"
          />,

        bg:
          "bg-red-500/10",
      }
    }

    if (
      category
        ?.toLowerCase()
        .includes("faq")
    ) {

      return {
        icon:
          <FileText
            size={16}
            className="text-orange-500 dark:text-orange-400"
          />,

        bg:
          "bg-orange-500/10",
      }
    }

    if (
      category
        ?.toLowerCase()
        .includes("seo")
    ) {

      return {
        icon:
          <Search
            size={16}
            className="text-yellow-500 dark:text-yellow-400"
          />,

        bg:
          "bg-yellow-500/10",
      }
    }

    return {

      icon:
        <Sparkles
          size={16}
          className="text-indigo-500 dark:text-indigo-400"
        />,

      bg:
        "bg-indigo-500/10",
    }
  }

  // =====================================
  // EMPTY STATE
  // =====================================

  if (
    recommendations.length === 0
  ) {

    return (

      <div className="
      bg-white dark:bg-[#121624]
      border border-zinc-200 dark:border-zinc-800/60
      rounded-xl p-5 shadow-xl
      ">

        <div className="
        flex justify-between items-center
        mb-5 border-b
        border-zinc-200 dark:border-zinc-800/50
        pb-4
        ">

          <h2 className="
          text-sm font-semibold
          text-zinc-900 dark:text-zinc-100
          ">

            Top Recommendations

          </h2>

        </div>

        <div className="
        flex flex-col items-center
        justify-center py-10 text-center
        ">

          <div className="
          w-14 h-14 rounded-2xl
          bg-emerald-500/10
          flex items-center justify-center
          mb-4
          ">

            <CheckCircle
              size={24}
              className="text-emerald-500 dark:text-emerald-400"
            />

          </div>

          <h3 className="
          text-sm font-semibold
          text-zinc-900 dark:text-zinc-200
          ">

            No High Priority Issues

          </h3>

          <p className="
          text-xs
          text-zinc-500
          mt-1
          ">

            Your store looks optimized for AI shopping.

          </p>

        </div>

      </div>
    )
  }

  // =====================================
  // MAIN UI
  // =====================================

  return (

    <div className="
    bg-white dark:bg-[#121624]
    border border-zinc-200 dark:border-zinc-800/60
    rounded-xl p-5 shadow-xl
    ">

      {/* HEADER */}

      <div className="
      flex justify-between items-center
      mb-5 border-b
      border-zinc-200 dark:border-zinc-800/50
      pb-4
      ">

        <div>

          <h2 className="
          text-sm font-semibold
          text-zinc-900 dark:text-zinc-100
          ">

            Top Recommendations

          </h2>

          <p className="
          text-xs
          text-zinc-500
          mt-1
          ">

            Most important improvements for your store

          </p>

        </div>

        <button

          onClick={() =>
            navigate(
              "/recommendations"
            )
          }

          className="
          text-xs
          text-indigo-500
          dark:text-indigo-400
          hover:text-indigo-600
          dark:hover:text-indigo-300
          font-medium
          flex items-center gap-1
          "
        >

          View all →

        </button>

      </div>

      {/* RECOMMENDATIONS */}

      <div className="space-y-3">

        {recommendations.map(
          (rec, idx) => {

            const ui =
              getIcon(
                rec.category
              )

            return (

              <div

                key={idx}

                onClick={() =>
                  navigate(
                    "/recommendations"
                  )
                }

                className="
                flex items-center gap-4
                bg-zinc-50
                dark:bg-[#1A1D2D]/50
                border border-zinc-200
                dark:border-zinc-800/50
                p-4 rounded-xl

                hover:bg-zinc-100
                dark:hover:bg-[#1A1D2D]

                hover:border-indigo-300
                dark:hover:border-indigo-500/20

                transition cursor-pointer
                group
                "
              >

                {/* INDEX */}

                <span className="
                text-zinc-500
                font-medium text-sm w-4
                ">

                  {idx + 1}

                </span>

                {/* ICON */}

                <div
                  className={`
                  p-2.5 rounded-xl
                  ${ui.bg}
                  `}
                >

                  {ui.icon}

                </div>

                {/* CONTENT */}

                <div className="flex-1 min-w-0">

                  <div className="
                  flex items-center gap-2
                  mb-1 flex-wrap
                  ">

                    <h3 className="
                    text-sm font-medium
                    text-zinc-900 dark:text-zinc-200
                    truncate
                    ">

                      {rec.title}

                    </h3>

                    <span className="
                    text-[10px]
                    px-2 py-0.5
                    rounded-full
                    bg-red-500/10
                    text-red-500 dark:text-red-400
                    border border-red-500/20
                    font-medium
                    ">

                      High

                    </span>

                  </div>

                  <p className="
                  text-xs
                  text-zinc-500
                  line-clamp-1
                  ">

                    {rec.description}

                  </p>

                </div>

                {/* RIGHT */}

                <div className="
                flex items-center gap-3
                ">

                  <span className="
                  text-[10px]
                  font-medium
                  text-red-500 dark:text-red-400
                  whitespace-nowrap
                  ">

                    High Impact

                  </span>

                  <ChevronRight
                    size={16}
                    className="
                    text-zinc-500
                    group-hover:text-indigo-500
                    dark:group-hover:text-indigo-400
                    transition
                    "
                  />

                </div>

              </div>
            )
          }
        )}

      </div>

    </div>
  )
}

export default RecommendationCard