// =====================================
// FILE: src/pages/Dashboard.jsx
// =====================================

import {
  useEffect,
  useState,
} from "react"

import Sidebar
from "../components/Sidebar"

import ScoreCard
from "../components/ScoreCard"

import IssueCard
from "../components/IssueCard"

import AIStudioCard
from "../components/AIStudioCard"

import ProductTable
from "../components/ProductTable"

import RecommendationCard
from "../components/RecommendationCard"

import VoiceAssistant
from "../components/VoiceAssistant";

import {
  generateStoreReport,
} from "../utils/generateStoreReport"

import {
  Download,
  ShieldAlert,
  Calendar,
  ChevronDown,
  Bell,
  ArrowUp,
  Rocket,
  Users,
  TrendingUp,
  Info
} from "lucide-react"

import { CircularProgressbar } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

import { useTheme } from "../context/ThemeContext"

import {
  getProducts,
  analyzeStoreProducts,
} from "../services/productService"

function Dashboard() {

  // =====================================
  // STATES
  // =====================================

  const [products, setProducts] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [store, setStore] =
    useState(null)
  const [showAllIssues, setShowAllIssues] =
  useState(false)
  const [showNotifications, setShowNotifications] =
  useState(false);

  const [stats, setStats] =
    useState({
      discoverability: 0,
      clarity: 0,
      trust: 0,
      conversion: 0,
      overall: 0,
    })
  // =====================================
// DOWNLOAD REPORT
// =====================================

const handleDownloadReport =
  async () => {

    try {

      await generateStoreReport({

        storeName:
          store?.storeName ||
          "My Store",

        storeDomain:
          store?.shopifyUrl ||
          "mystore.myshopify.com",

        stats,

        products,

        issues:
          issueList.filter(
            (issue) =>
              issue.items > 0
          ),
      })

    } catch (error) {

      console.log(
        "Report generation failed:"
      )

      console.log(error)
    }
  }
  // =====================================
  // LOAD DASHBOARD
  // =====================================

  useEffect(() => {

    const loadDashboard =
      async () => {

        try {

          const user =
            JSON.parse(
              sessionStorage.getItem(
                "user"
              )
            )

          if (!user?.storeId) {
            return
          }

          setStore(user)

          // =================================
          // RUN AI ANALYSIS
          // =================================

          await analyzeStoreProducts(
            user.storeId
          )

          // =================================
          // FETCH PRODUCTS
          // =================================

          const data =
            await getProducts(
              user.storeId
            )

          setProducts(data)

          // =================================
          // SCORE CALCULATIONS
          // =================================

          const totalProducts =
            data.length || 1

          const discoverability =
            Math.floor(
              data.reduce(
                (acc, p) =>
                  acc +
                  (
                    p.scores
                      ?.discoverability ||
                    0
                  ),
                0
              ) / totalProducts
            )

          const clarity =
            Math.floor(
              data.reduce(
                (acc, p) =>
                  acc +
                  (
                    p.scores
                      ?.clarity || 0
                  ),
                0
              ) / totalProducts
            )

          const trust =
            Math.floor(
              data.reduce(
                (acc, p) =>
                  acc +
                  (
                    p.scores
                      ?.trust || 0
                  ),
                0
              ) / totalProducts
            )

          const conversion =
            Math.floor(
              data.reduce(
                (acc, p) =>
                  acc +
                  (
                    p.scores
                      ?.conversion ||
                    0
                  ),
                0
              ) / totalProducts
            )

          const overall =
            Math.floor(
              (
                discoverability +
                clarity +
                trust +
                conversion
              ) / 4
            )

          setStats({
            discoverability,
            clarity,
            trust,
            conversion,
            overall,
          })

        } catch (error) {

          console.log(error)

        } finally {

          setLoading(false)
        }
      }

    loadDashboard()

  }, [])

  // =====================================
  // LOADING SCREEN
  // =====================================

  if (loading) {
    return (
      <div className="flex bg-zinc-50 dark:bg-zinc-950 h-screen overflow-hidden transition-colors duration-300">
        <Sidebar />
        <div className="flex-1 p-8 space-y-8 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="h-14 bg-zinc-200 dark:bg-zinc-800/60 rounded-2xl w-1/3"></div>
            <div className="h-10 bg-zinc-200 dark:bg-zinc-800/60 rounded-xl w-32"></div>
          </div>
          <div className="grid grid-cols-4 gap-5">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-zinc-200 dark:bg-zinc-800/60 rounded-2xl"></div>
            ))}
          </div>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-7 space-y-6">
              <div className="h-[300px] bg-zinc-200 dark:bg-zinc-800/60 rounded-3xl"></div>
              <div className="h-[400px] bg-zinc-200 dark:bg-zinc-800/60 rounded-3xl"></div>
            </div>
            <div className="col-span-5 space-y-6">
              <div className="h-[250px] bg-zinc-200 dark:bg-zinc-800/60 rounded-3xl"></div>
              <div className="h-[350px] bg-zinc-200 dark:bg-zinc-800/60 rounded-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // =====================================
  // AI ISSUE DETECTION
  // =====================================

  const trustIssues =
    products.filter(
      (p) =>
        p.scores?.trust < 60
    ).length

  const seoIssues =
    products.filter(
      (p) =>
        p.scores
          ?.discoverability < 60
    ).length

  const clarityIssues =
    products.filter(
      (p) =>
        p.scores?.clarity < 60
    ).length

  const conversionIssues =
    products.filter(
      (p) =>
        p.scores
          ?.conversion < 60
    ).length

  const issueList = [
    {
      title:
        "Low Conversion Readiness",

      description:
        "Products may struggle converting visitors into customers.",

      impact:
        "High Impact",

      items:
        conversionIssues,

      impactColor:
        "text-red-400",

      affectedProducts:
        products.filter(
          (p) =>
            p.scores
              ?.conversion < 60
        ),
    },

    {
      title:
        "Missing Trust Signals",

      description:
        "Products lack reviews, guarantees, return policies and buyer trust indicators.",

      impact:
        "High Impact",

      items:
        trustIssues,

      impactColor:
        "text-red-400",

      affectedProducts:
        products.filter(
          (p) =>
            p.scores?.trust < 60
        ),
    },

    {
      title:
        "Weak SEO Optimization",

      description:
        "Products are not optimized for AI discoverability and search visibility.",

      impact:
        "Medium Impact",

      items:
        seoIssues,

      impactColor:
        "text-orange-400",

      affectedProducts:
        products.filter(
          (p) =>
            p.scores
              ?.discoverability < 60
        ),
    },

    {
      title:
        "Poor Product Clarity",

      description:
        "Descriptions and titles are unclear for AI shopping assistants.",

      impact:
        "Medium Impact",

      items:
        clarityIssues,

      impactColor:
        "text-yellow-400",

      affectedProducts:
        products.filter(
          (p) =>
            p.scores?.clarity < 60
        ),
    },
  ]
  const filteredIssues =
  issueList
    .filter(
      (issue) =>
        issue.items > 0
    )
    .sort(
      (a, b) =>
        b.items - a.items
    )

  const visibleIssues =
    showAllIssues
      ? filteredIssues
      : filteredIssues.slice(0, 2)
  
  const notifications = [
    ...filteredIssues.slice(0,2).map(issue=>({
    type:"issue",
    message:`${issue.items} products affected by ${issue.title}`
    })),

    products.length > 0 && {

    type:"success",

    message:
    `Best Product: ${
    products
    .sort(
    (a,b)=>
    b.overallScore-
    a.overallScore
    )[0]?.title
    }`

    }

    ].filter(Boolean);

    const notificationCount = notifications.length;
  const { theme } = useTheme();

  const chartData = [
    { name: 'Mon', score: 20 },
    { name: 'Tue', score: 25 },
    { name: 'Wed', score: 45 },
    { name: 'Thu', score: 52 },
    { name: 'Fri', score: 38 },
    { name: 'Sat', score: 75 },
    { name: 'Sun', score: stats.overall || 95 },
  ];

  return (
    <div className="flex bg-slate-50 dark:bg-[#0b0f19] h-screen overflow-hidden font-sans text-slate-900 dark:text-white transition-colors duration-300">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 overflow-y-auto p-8">
        {/* HEADER */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight transition-colors duration-300">
              Welcome back, {store?.storeName || "PeakTrail Gear"} 👋
            </h1>
            <p className="text-slate-500 dark:text-zinc-400 text-sm transition-colors duration-300">
              Here's what's happening with your store today.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="glass-panel w-10 h-10 rounded-xl flex items-center justify-center relative hover:bg-slate-100 dark:hover:bg-white/5 transition"
              >

                <Bell
                  size={18}
                  className="text-slate-600 dark:text-zinc-300"
                />

                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}

              </button>

              {showNotifications && (

                <div className="absolute right-0 mt-3 w-[330px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl z-[999] overflow-hidden">

                  <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 font-semibold">
                    Notifications
                  </div>

                  <div className="max-h-[300px] overflow-y-auto">

                    {notifications.map((item, index) => (

                      <div
                        key={index}
                        className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
                      >

                        <p className="text-sm text-zinc-700 dark:text-zinc-300">
                          {item.message}
                        </p>

                      </div>

                    ))}

                  </div>

                </div>

              )}

            </div>
            
            <button
                onClick={handleDownloadReport}
                className="glass-panel hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-800 dark:text-white border-slate-200 dark:border-white/5 rounded-xl transition-all duration-300"
              >
                <Download size={16} />
                Download Report
            </button>
          </div>
        </div>

        {/* AI READINESS SCORE & AI PRODUCT STUDIO */}
        <div className="grid grid-cols-12 gap-6 mb-6">
          {/* AI Readiness Score Panel */}
          <div className="col-span-7 glass-panel rounded-3xl p-6 flex flex-col relative overflow-hidden border-slate-200 dark:border-white/5 transition-colors duration-300">
             <div className="flex items-center gap-2 mb-8">
               <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight transition-colors duration-300">Store Readiness Score</h2>
               <Info size={14} className="text-slate-400 dark:text-zinc-500 cursor-pointer" />
             </div>
             
             <div className="flex items-center justify-between">
               {/* Left part */}
               <div className="flex gap-8 items-center">
                 {/* Circular Progress */}
                <div className="w-[140px] h-[140px] relative ai-glow rounded-full">
                  <CircularProgressbar
                    value={stats.overall || 72}
                    text={`${stats.overall || 72}`}
                    styles={{
                      path: {
                        stroke: "url(#gradient)",
                        strokeLinecap: "round",
                      },
                      trail: {
                        stroke: theme === "light"
                          ? "#e5e7eb"
                          : "#1e293b"
                      },
                      text: {
                        fill: "transparent",
                      }
                    }}
                  />

                  {/* SVG Gradient */}
                  <svg style={{ height: 0 }}>
                    <defs>
                      <linearGradient
                        id="gradient"
                        gradientTransform="rotate(90)"
                      >
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="50%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Inner Circle */}
                  <div
                    className="
                      absolute inset-[14px]
                      rounded-full
                      bg-white dark:bg-[#111827]
                      border border-slate-200 dark:border-slate-700
                      shadow-xl
                      flex flex-col
                      items-center
                      justify-center
                      backdrop-blur-xl
                    "
                  >
                    <span className="text-4xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                      {stats.overall || 72}
                    </span>

                    <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      AI Score
                    </span>
                  </div>

                  {/* Floating glow */}
                  <div className="absolute -z-10 inset-0 rounded-full bg-indigo-500/20 blur-2xl scale-110"></div>
                </div>
                 
                 {/* Text Info */}
                 <div className="flex flex-col gap-3">
                   <div className="bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 px-3 py-1 rounded-full text-[11px] font-semibold w-max flex items-center gap-1 transition-colors duration-300">
                     <ArrowUp size={12} /> 12 points this week
                   </div>
                   
                   <div>
                     <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1 flex items-center gap-2 transition-colors duration-300">
                       Good Progress! <Rocket size={18} className="text-purple-500 dark:text-purple-400" />
                     </h3>
                     <p className="text-[13px] text-slate-600 dark:text-zinc-400 max-w-[200px] leading-relaxed mt-2 transition-colors duration-300">
                       Your store is in the top 35% of stores using AI optimization.
                     </p>
                   </div>
                   
                   <div className="flex gap-6 mt-2">
                     <div className="flex items-center gap-3">
                        <Users size={16} className="text-blue-500" />
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-900 dark:text-white transition-colors duration-300">Top 35%</span>
                          <span className="text-[10px] text-slate-500 dark:text-zinc-500 transition-colors duration-300">of stores</span>
                        </div>
                     </div>
                     <div className="flex items-center gap-3">
                        <TrendingUp size={16} className="text-emerald-500" />
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-900 dark:text-white transition-colors duration-300">+18%</span>
                          <span className="text-[10px] text-slate-500 dark:text-zinc-500 transition-colors duration-300">vs last 7 days</span>
                        </div>
                     </div>
                   </div>
                 </div>
               </div>
               
               {/* Right part (Chart) */}
               <div className="w-[280px] h-[150px] relative">
                 <ResponsiveContainer width="100%" height="100%">
                   <LineChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                     <defs>
                       <linearGradient id="colorScore" x1="0" y1="0" x2="1" y2="0">
                         <stop offset="0%" stopColor="#6366f1" stopOpacity={1}/>
                         <stop offset="100%" stopColor="#c084fc" stopOpacity={1}/>
                       </linearGradient>
                     </defs>
                     <XAxis 
                       dataKey="name" 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{ fontSize: 10, fill: theme === 'light' ? '#94a3b8' : '#52525b' }} 
                       dy={10} 
                     />
                     <YAxis 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{ fontSize: 10, fill: theme === 'light' ? '#94a3b8' : '#52525b' }} 
                       domain={[0, 100]} 
                       ticks={[0, 25, 50, 75, 100]} 
                     />
                     <Tooltip 
                       contentStyle={{ 
                         backgroundColor: theme === 'light' ? '#fff' : '#18181b', 
                         borderColor: theme === 'light' ? '#e2e8f0' : '#27272a', 
                         borderRadius: '8px' 
                       }}
                       itemStyle={{ color: '#a78bfa', fontWeight: 'bold' }}
                       labelStyle={{ color: theme === 'light' ? '#0f172a' : '#fff', marginBottom: '4px' }}
                     />
                     <Line 
                       type="monotone" 
                       dataKey="score" 
                       stroke="url(#colorScore)" 
                       strokeWidth={3} 
                       dot={{ fill: '#a78bfa', strokeWidth: 0, r: 3 }} 
                       activeDot={{ r: 5, fill: '#fff', strokeWidth: 0, style: { filter: 'drop-shadow(0px 0px 4px rgba(255,255,255,0.8))' } }} 
                     />
                   </LineChart>
                 </ResponsiveContainer>
               </div>
             </div>
          </div>

          {/* AI Product Studio */}
          <div className="col-span-5 h-full">
            <AIStudioCard />
          </div>
        </div>

        {/* SCORE CARDS */}
        <div className="grid grid-cols-4 gap-5 mb-6">
          <ScoreCard
            title="AI Discoverability"
            score={stats.discoverability || 39}
            status={stats.discoverability >= 60 ? "Good" : "Needs Work"}
            color={stats.discoverability >= 60 ? "#10b981" : "#ef4444"}
            trend="↑ 8 this week"
            trendColor="text-emerald-500"
          />
          <ScoreCard
            title="Product Clarity"
            score={stats.clarity || 62}
            status={stats.clarity >= 60 ? "Good" : "Needs Work"}
            color={stats.clarity >= 60 ? "#eab308" : "#ef4444"}
            trend="↑ 12 this week"
            trendColor="text-emerald-500"
          />
          <ScoreCard
            title="Trust Signals"
            score={stats.trust || 41}
            status={stats.trust >= 60 ? "Good" : "Needs Work"}
            color={stats.trust >= 60 ? "#10b981" : "#ef4444"}
            trend="↑ 5 this week"
            trendColor="text-emerald-500"
          />
          <ScoreCard
            title="Conversion Readiness"
            score={stats.conversion || 31}
            status={stats.conversion >= 60 ? "Good" : "Needs Work"}
            color={stats.conversion >= 60 ? "#10b981" : "#ef4444"}
            trend="↑ 7 this week"
            trendColor="text-emerald-500"
          />
        </div>

        {/* MAIN GRID */}
        {/* ISSUES + RECOMMENDATIONS */}
        <div className="grid grid-cols-12 gap-6 mb-6">

          {/* LEFT */}
          <div className="col-span-7 relative overflow-visible">
            <div className="glass-panel rounded-3xl p-6 border-slate-200 dark:border-white/5 relative overflow-visible z-[999]">

              <div className="flex items-center justify-between mb-6 border-b border-slate-200 dark:border-white/5 pb-5">
                <div className="flex items-center gap-3">

                  <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-500/10 flex items-center justify-center">
                    <ShieldAlert
                      size={22}
                      className="text-red-500"
                    />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold">
                      Product Issue Tracker
                    </h2>

                    <p className="text-[13px] text-slate-500">
                      Critical issues affecting product performance
                    </p>
                  </div>

                </div>

                <button
                  onClick={() =>
                    setShowAllIssues(!showAllIssues)
                  }
                  className="text-indigo-500 text-sm"
                >
                  {showAllIssues
                    ? "View Less ↑"
                    : "View All ↓"}
                </button>
              </div>

              <div className="space-y-4 overflow-visible">

                {visibleIssues.map((issue,index)=>(
                  <IssueCard
                    key={index}
                    title={issue.title}
                    description={issue.description}
                    impact={issue.impact}
                    items={issue.items}
                    impactColor={issue.impactColor}
                    affectedProducts={
                      issue.affectedProducts
                    }
                  />
                ))}

              </div>

            </div>
          </div>

          {/* RIGHT */}
          <div className="col-span-5">
            <RecommendationCard />
          </div>

        </div>


        {/* PRODUCT TABLE FULL WIDTH */}
        <div className="glass-panel rounded-3xl p-6">
          <ProductTable products={products}/>
        </div>
        <VoiceAssistant/>
      </div>
    </div>
  )
}

export default Dashboard