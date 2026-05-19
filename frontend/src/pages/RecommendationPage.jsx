import {
  useEffect,
  useState,
} from "react"

import Sidebar
from "../components/Sidebar"
import VoiceAssistant from "../components/VoiceAssistant";
import {
  Sparkles,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Search,
  BadgeCheck,
  RefreshCw,
} from "lucide-react"

import {
  getRecommendations,
  regenerateRecommendations,
} from "../services/recommendationService"

function RecommendationPage() {

  // =====================================
  // STATE
  // =====================================

  const [
    data,
    setData,
  ] = useState(null)

  const [
    loading,
    setLoading,
  ] = useState(true)

  const [
    regenerating,
    setRegenerating,
  ] = useState(false)

  // =====================================
  // LOAD DATA
  // =====================================

  useEffect(() => {

    async function load() {

      try {

        const user =
          JSON.parse(
            sessionStorage.getItem(
              "user"
            )
          )

        const response =
          await getRecommendations(
            user.storeId
          )

        setData(response)

      } catch (error) {

        console.log(error)
      }

      finally {

        setLoading(false)
      }
    }

    load()

  }, [])

  // =====================================
  // REGENERATE
  // =====================================

  async function handleRegenerate() {

    try {

      setRegenerating(true)

      const user =
        JSON.parse(
          sessionStorage.getItem(
            "user"
          )
        )

      const response =
        await regenerateRecommendations(
          user.storeId
        )

      setData(response)

    } catch (error) {

      console.log(error)

    } finally {

      setRegenerating(false)
    }
  }

  // =====================================
  // PRIORITY STYLES
  // =====================================

  const getPriorityStyle =
    (priority) => {

      if (
        priority === "High"
      ) {

        return "bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/20"
      }

      if (
        priority === "Medium"
      ) {

        return "bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-500/20"
      }

      return "bg-yellow-100 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/20"
    }

  // =====================================
  // CATEGORY ICONS
  // =====================================

  const getCategoryIcon =
    (category) => {

      if (
        category
          ?.toLowerCase()
          .includes("trust")
      ) {

        return (
          <ShieldAlert
            size={18}
            className="text-red-400"
          />
        )
      }

      if (
        category
          ?.toLowerCase()
          .includes("seo")
      ) {

        return (
          <Search
            size={18}
            className="text-orange-400"
          />
        )
      }

      return (
        <Sparkles
          size={18}
          className="text-indigo-400"
        />
      )
    }

  // =====================================
  // LOADING SCREEN
  // =====================================

  if (loading) {

    return (

      <div className="flex bg-zinc-50 dark:bg-zinc-950 min-h-screen transition-colors duration-300">

        <Sidebar />

        <div className="flex-1 flex items-center justify-center text-zinc-900 dark:text-white">

          <div className="text-center">

            <div className="w-24 h-24 border-4 border-indigo-200 dark:border-indigo-500/20 border-t-indigo-600 dark:border-t-indigo-500 rounded-full animate-spin mx-auto"></div>

            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mt-8">

              Generating AI Recommendations

            </h2>

            <p className="text-zinc-600 dark:text-zinc-500 mt-3">

              VYAPARsaarthi is analyzing your store...

            </p>

          </div>

        </div>

      </div>
    )
  }

  // =====================================
  // MAIN UI
  // =====================================

  return (

    <div className="flex bg-zinc-50 dark:bg-zinc-950 min-h-screen transition-colors duration-300">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN CONTENT */}

      <div className="flex-1 h-screen overflow-y-auto p-8 text-zinc-900 dark:text-white">

        {/* HEADER */}

        <div className="flex items-center justify-between mb-8">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 flex items-center justify-center">

              <Sparkles
                size={24}
                className="text-indigo-600 dark:text-indigo-400"
              />

            </div>

            <div>

              <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">

                Recommendations

              </h1>

              <p className="text-zinc-500 dark:text-zinc-400 mt-1">

                Personalized AI optimization insights for your ecommerce store

              </p>

            </div>

          </div>

          {/* BUTTON */}

          <button

            onClick={
              handleRegenerate
            }

            disabled={
              regenerating
            }

            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition text-sm font-medium text-white"
          >

            <RefreshCw
              size={16}
              className={
                regenerating
                  ? "animate-spin"
                  : ""
              }
            />

            {
              regenerating
                ? "Generating..."
                : "Regenerate"
            }

          </button>

        </div>

        {/* SUMMARY */}

        <div className="glass-panel rounded-3xl p-7 mb-7 transition-colors duration-300">

          <div className="flex items-center gap-3 mb-5">

            <div className="w-11 h-11 rounded-2xl bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 flex items-center justify-center">

              <BadgeCheck
                size={20}
                className="text-indigo-600 dark:text-indigo-400"
              />

            </div>

            <div>

              <h2 className="text-xl font-bold text-zinc-900 dark:text-white">

                Store Summary

              </h2>

              <p className="text-sm text-zinc-500 mt-0.5">

                Overall AI commerce performance analysis

              </p>

            </div>

          </div>

          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-[15px]">

            {data?.summary}

          </p>

        </div>

        {/* RECOMMENDATIONS */}

        <div className="space-y-5">

          {data?.recommendations?.map(
            (
              recommendation,
              index
            ) => (

              <div
                key={index}
                className="glass-panel rounded-3xl p-6 hover:border-indigo-400 dark:hover:border-indigo-500/30 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300"
              >

                {/* TOP */}

                <div className="flex items-start justify-between gap-5">

                  {/* LEFT */}

                  <div className="flex items-start gap-4">

                    {/* ICON */}

                    <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center shrink-0">

                      {getCategoryIcon(
                        recommendation.category
                      )}

                    </div>

                    {/* CONTENT */}

                    <div>

                      <div className="flex items-center gap-3 flex-wrap">

                        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">

                          {
                            recommendation.title
                          }

                        </h2>

                        <span
                          className={`text-xs px-3 py-1 rounded-full border font-medium ${getPriorityStyle(
                            recommendation.priority
                          )}`}
                        >

                          {
                            recommendation.priority
                          }
                          {" "}
                          Priority

                        </span>

                      </div>

                      <p className="text-zinc-600 dark:text-zinc-400 mt-3 leading-relaxed">

                        {
                          recommendation.description
                        }

                      </p>

                    </div>

                  </div>

                </div>

                {/* IMPACT */}

                <div className="mt-5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/50 rounded-2xl p-4 transition-colors duration-300">

                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-2">

                    Expected Impact

                  </h3>

                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">

                    {
                      recommendation.impact
                    }

                  </p>

                </div>

                {/* ACTIONS */}

                <div className="mt-5">

                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-4">

                    Recommended Actions

                  </h3>

                  <div className="space-y-3">

                    {recommendation.actionItems?.map(
                      (
                        action,
                        idx
                      ) => (

                        <div
                          key={idx}
                          className="flex items-start gap-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/50 rounded-2xl p-4 hover:border-indigo-300 dark:hover:border-indigo-500/20 transition-colors duration-300"
                        >

                          <div className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center shrink-0 mt-0.5">

                            <ArrowRight
                              size={14}
                              className="text-indigo-600 dark:text-indigo-400"
                            />

                          </div>

                          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">

                            {action}

                          </p>

                        </div>
                      )
                    )}

                  </div>

                </div>

              </div>
            )
          )}

        </div>

      </div>
          <VoiceAssistant/>
    </div>
  )
}

export default RecommendationPage