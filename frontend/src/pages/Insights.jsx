// ===============================
// FILE: src/pages/Insights.jsx
// ===============================

import {
  useEffect,
  useState,
} from "react";

import Sidebar
from "../components/Sidebar";

import {
  getInsights,
} from "../services/insightService";

import InsightHero from
  "../components/insights/InsightHero";

import BusinessHealthCards from
  "../components/insights/BusinessHealthCards";

import StoreStrengths from
  "../components/insights/StoreStrengths";

import StoreRisks from
  "../components/insights/StoreRisks";

import WeakProductsTable from
  "../components/insights/WeakProductsTable";

import QuickWins from
  "../components/insights/QuickWins";

import GrowthOpportunities from
  "../components/insights/GrowthOpportunities";

function Insights() {

  const [loading, setLoading] =
    useState(true);

  const [insights, setInsights] =
    useState(null);

  useEffect(() => {

    const fetchInsights =
      async () => {

        try {

          const user =
            JSON.parse(
              sessionStorage.getItem(
                "user"
              )
            );

          if (!user?.storeId) {

            setLoading(false);

            return;
          }

          const data =
            await getInsights(
              user.storeId
            );

          setInsights(
            data.insights
          );

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);
        }
      };

    fetchInsights();

  }, []);

  // =============================
  // LOADING STATE
  // =============================

  if (loading) {

    return (

      <div className="flex bg-zinc-50 dark:bg-zinc-950 h-screen overflow-hidden transition-colors duration-300">

        <Sidebar />

        <div className="flex-1 flex items-center justify-center text-zinc-900 dark:text-white text-lg">

          Loading insights...

        </div>

      </div>
    );
  }

  // =============================
  // EMPTY STATE
  // =============================

  if (!insights) {

    return (

      <div className="flex bg-zinc-50 dark:bg-zinc-950 h-screen overflow-hidden transition-colors duration-300">

        <Sidebar />

        <div className="flex-1 flex items-center justify-center text-zinc-900 dark:text-white text-lg">

          No insights found

        </div>

      </div>
    );
  }

  return (

    <div className="flex bg-zinc-50 dark:bg-zinc-950 h-screen overflow-hidden transition-colors duration-300">

      {/* SIDEBAR */}

      <Sidebar />

      {/* RIGHT SIDE ONLY SCROLL */}

      <div className="flex-1 overflow-y-auto p-8">

        {/* PAGE HEADER */}

        <div className="mb-8">

          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
            Store Insights
          </h1>

          <p className="text-zinc-500 dark:text-zinc-400 mt-2">
            AI-powered business intelligence
            and store growth opportunities
          </p>

        </div>

        {/* HERO SECTION */}

        <InsightHero
          overallHealth={
            insights.overallHealth
          }
          storeStatus={
            insights.storeStatus
          }
          summary={
            insights.summary
          }
          storeRating={
            insights.storeRating
          }
        />

        {/* BUSINESS HEALTH */}

        <BusinessHealthCards
          scores={
            insights.businessScores
          }
        />

        {/* STRENGTHS + RISKS */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          <StoreStrengths
            strengths={
              insights.strengths
            }
          />

          <StoreRisks
            risks={
              insights.risks
            }
          />

        </div>

        {/* WEAK PRODUCTS */}

        <WeakProductsTable
          weakProducts={
            insights.weakProducts
          }
        />

        {/* QUICK WINS */}

        <QuickWins
          quickWins={
            insights.quickWins
          }
        />

        {/* GROWTH OPPORTUNITIES */}

        <GrowthOpportunities
          opportunities={
            insights.opportunities
          }
        />

        <div className="pb-8" />

      </div>

    </div>
  );
}

export default Insights;