// =====================================
// FILE: src/components/Sidebar.jsx
// =====================================

import {
  useEffect,
  useState,
} from "react"

import {
  LayoutDashboard,
  Package,
  BarChart2,
  Sparkles,
  Settings,
  ArrowRight,
  WandSparkles,
  Moon,
  Sun
} from "lucide-react"

import { useTheme } from "../context/ThemeContext"

import {
  Link,
  useLocation,
} from "react-router-dom"

function Sidebar() {

  const location =
    useLocation()

  // =====================================
  // USER STATE
  // =====================================

  const [user, setUser] =
    useState(null)

  useEffect(() => {

    const storedUser =
      JSON.parse(
        sessionStorage.getItem(
          "user"
        )
      )

    setUser(storedUser)

  }, [])

  // =====================================
  // NAVIGATION ITEMS
  // =====================================

  const navItems = [

    {
      name: "Dashboard",

      icon:
        LayoutDashboard,

      path:
        "/dashboard",
    },

    {
      name: "Products",

      icon:
        Package,

      path:
        "/products",
    },

    {
      name:
        "AI Product Studio",

      icon:
        WandSparkles,

      path:
        "/ai-product-studio",
    },

    {
      name: "Insights",

      icon:
        BarChart2,

      path:
        "/insights",
    },

    {
      name:
        "Recommendations",

      icon:
        Sparkles,

      path:
        "/recommendations",
    },

    {
      name: "Settings",

      icon:
        Settings,

      path:
        "/settings",
    },
  ]

  // =====================================
  // STORE INITIALS
  // =====================================

  const storeInitials =
    user?.storeName

      ? user.storeName
          .split(" ")
          .map(
            (word) =>
              word[0]
          )
          .join("")
          .slice(0, 2)
          .toUpperCase()

      : "MS"

  const { theme, toggleTheme } = useTheme()

  return (

    <div className="w-72 h-screen bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800/50 flex flex-col transition-colors duration-300">

      {/* LOGO */}

      <div className="p-6">

        <div className="flex items-center gap-3">

          <div className="bg-indigo-50 dark:bg-zinc-800 p-2.5 rounded-xl transition-colors duration-300">

            <Sparkles
              size={20}
              className="text-indigo-600 dark:text-indigo-400"
            />

          </div>

          <div>

            <h1 className="text-lg font-bold text-zinc-900 dark:text-white leading-tight">

              VYAPARsaarthi

            </h1>

            <p className="text-xs text-zinc-500">

              Smart Merchant Companion

            </p>

          </div>

        </div>

      </div>

      {/* NAVIGATION */}

      <div className="flex-1 px-4 py-2 space-y-1">

        {navItems.map(
          (item, index) => {

            const Icon =
              item.icon

            const active =
              location.pathname ===
              item.path

            return (

              <Link
                key={index}
                to={item.path}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition cursor-pointer ${
                  active
                    ? "text-indigo-600 bg-indigo-50 dark:text-white dark:bg-zinc-800"
                    : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900/50 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >

                {/* LEFT */}

                <div className="flex items-center gap-3">

                  <Icon
                    size={20}
                    className={
                      active
                        ? "text-indigo-600 dark:text-indigo-400"
                        : ""
                    }
                  />

                  <span className="font-medium text-sm">

                    {item.name}

                  </span>

                </div>

              </Link>
            )
          }
        )}

      </div>

      {/* BOTTOM */}

      <div className="p-4">

        {/* AI CARD */}

        <div className="bg-indigo-50 dark:bg-zinc-900 border border-indigo-200 dark:border-indigo-500/20 rounded-xl p-4 mb-4 transition-colors duration-300">

          <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-2">

            Improve your
            <br />
            AI Readiness Score

          </h3>

          <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">

            Follow our recommendations
            to make your store fully
            AI-friendly.

          </p>

          <Link
            to="/recommendations"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-medium py-2.5 rounded-lg transition flex items-center justify-center gap-2"
          >

            View Recommendations

            <ArrowRight size={14} />

          </Link>

        </div>

        {/* USER */}

        <div className="flex items-center gap-3 p-2">

          {/* AVATAR */}

          <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-semibold text-sm">

            {storeInitials}

          </div>

          {/* INFO */}

          <div className="flex-1 min-w-0">

            <div className="flex items-center justify-between gap-2">

              <p className="text-sm font-medium text-zinc-900 dark:text-white truncate">

                {
                  user?.storeName ||
                  "My Store"
                }

              </p>

              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 whitespace-nowrap">

                Pro Plan

              </span>

            </div>

            <p className="text-xs text-zinc-500 truncate mt-1">

              {
                user?.email ||
                "mystore@email.com"
              }

            </p>

          </div>

          {/* THEME TOGGLE */}
          <button 
            onClick={toggleTheme}
            className="p-2 ml-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </button>

        </div>

      </div>

    </div>
  )
}

export default Sidebar