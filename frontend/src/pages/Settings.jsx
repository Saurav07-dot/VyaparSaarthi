// =====================================
// FILE: src/pages/Settings.jsx
// =====================================

import {
  useEffect,
  useState,
} from "react";

import {
  Store,
  Mail,
  Globe,
  Tag,
  Crown,
  Calendar,
  Sparkles,
  ShieldCheck,
  LogOut,
  Lock,
} from "lucide-react";

import Sidebar
from "../components/Sidebar";

import {
  useNavigate,
} from "react-router-dom";

function Settings() {

  const navigate =
    useNavigate();

  const [user, setUser] =
    useState(null);

  useEffect(() => {

    const storedUser =
      JSON.parse(
        sessionStorage.getItem(
          "user"
        )
      );

    setUser(storedUser);

  }, []);

  // =====================================
  // LOGOUT
  // =====================================

  const handleLogout =
    () => {

      sessionStorage.clear();

      navigate("/");
    };

  return (

    <div className="flex bg-zinc-50 dark:bg-zinc-950 h-screen overflow-hidden transition-colors duration-300">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN */}

      <div className="flex-1 overflow-y-auto p-8 text-zinc-900 dark:text-white">

        {/* HEADER */}

        <div className="mb-8">

          <h1 className="text-4xl font-bold">

            Settings & Preferences

          </h1>

          <p className="text-zinc-500 dark:text-zinc-400 mt-2">

            Manage your store profile
            and platform settings

          </p>

        </div>

        {/* GRID */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* LEFT SECTION */}

          <div className="xl:col-span-2 space-y-6">

            {/* STORE INFO */}

            <div className="glass-panel rounded-3xl p-7 transition-colors duration-300">

              <div className="flex items-center gap-3 mb-6">

                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">

                  <Store
                    size={22}
                    className="text-indigo-400"
                  />

                </div>

                <div>

                  <h2 className="text-2xl font-semibold">

                    Store Information

                  </h2>

                  <p className="text-sm text-zinc-500 mt-1">

                    Basic store details

                  </p>

                </div>

              </div>

              <div className="space-y-5">

                {/* STORE NAME */}

                <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 flex items-center gap-4 transition-colors duration-300">

                  <Store
                    size={20}
                    className="text-indigo-400"
                  />

                  <div>

                    <p className="text-sm text-zinc-500">

                      Store Name

                    </p>

                    <h3 className="text-lg font-medium text-zinc-900 dark:text-white mt-1">

                      {
                        user?.storeName ||
                        "My Store"
                      }

                    </h3>

                  </div>

                </div>

                {/* EMAIL */}

                <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 flex items-center gap-4">

                  <Mail
                    size={20}
                    className="text-indigo-400"
                  />

                  <div>

                    <p className="text-sm text-zinc-500">

                      Business Email

                    </p>

                    <h3 className="text-lg font-medium text-white mt-1">

                      {
                        user?.email
                      }

                    </h3>

                  </div>

                </div>

                {/* DOMAIN */}

                <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 flex items-center gap-4">

                  <Globe
                    size={20}
                    className="text-indigo-400"
                  />

                  <div>

                    <p className="text-sm text-zinc-500">

                      Store Domain

                    </p>

                    <h3 className="text-lg font-medium text-white mt-1">

                      {
                        user?.domain ||
                        "mystore.myshopify.com"
                      }

                    </h3>

                  </div>

                </div>

                {/* CATEGORY */}

                <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 flex items-center gap-4">

                  <Tag
                    size={20}
                    className="text-indigo-400"
                  />

                  <div>

                    <p className="text-sm text-zinc-500">

                      Store Category

                    </p>

                    <h3 className="text-lg font-medium text-white mt-1">

                      {
                        user?.category ||
                        "General"
                      }

                    </h3>

                  </div>

                </div>

              </div>

            </div>

            {/* ACCOUNT */}

            <div className="glass-panel rounded-3xl p-7 transition-colors duration-300">

              <div className="flex items-center gap-3 mb-6">

                <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">

                  <ShieldCheck
                    size={22}
                    className="text-red-400"
                  />

                </div>

                <div>

                  <h2 className="text-2xl font-semibold">

                    Account & Security

                  </h2>

                  <p className="text-sm text-zinc-500 mt-1">

                    Manage your account access

                  </p>

                </div>

              </div>

              <div className="flex flex-wrap gap-4">

                {/* CHANGE PASSWORD */}

                <button className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 transition">

                  <Lock
                    size={18}
                    className="text-indigo-400"
                  />

                  <span className="font-medium">

                    Change Password

                  </span>

                </button>

                {/* LOGOUT */}

                <button
                  onClick={
                    handleLogout
                  }
                  className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition"
                >

                  <LogOut
                    size={18}
                    className="text-red-400"
                  />

                  <span className="font-medium text-red-400">

                    Logout

                  </span>

                </button>

              </div>

            </div>

          </div>

          {/* RIGHT SECTION */}

          <div className="space-y-6">

            {/* PLAN CARD */}

            <div className="bg-indigo-50 dark:bg-[#151A30] border border-indigo-200 dark:border-indigo-500/20 rounded-3xl p-7 overflow-hidden relative transition-colors duration-300">

              {/* GLOW */}

              <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 blur-3xl rounded-full"></div>

              <div className="relative z-10">

                <div className="flex items-center justify-between mb-6">

                  <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">

                    <Crown
                      size={26}
                      className="text-indigo-400"
                    />

                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">

                    Active

                  </span>

                </div>

                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">

                  Business Pro

                </h2>

                <p className="text-zinc-400 leading-relaxed mb-6">

                  Premium AI commerce
                  optimization plan

                </p>

                {/* VALIDITY */}

                <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 mb-5 transition-colors duration-300">

                  <div className="flex items-center gap-3 mb-3">

                    <Calendar
                      size={18}
                      className="text-indigo-400"
                    />

                    <p className="text-sm text-zinc-400">

                      Valid Till

                    </p>

                  </div>

                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">

                    31 Dec 2026

                  </h3>

                </div>

                {/* AI USAGE */}

                <div className="space-y-4">

                  <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 transition-colors duration-300">

                    <div className="flex items-center gap-2 mb-2">

                      <Sparkles
                        size={17}
                        className="text-indigo-400"
                      />

                      <p className="text-sm text-zinc-400">

                        AI Requests Used

                      </p>

                    </div>

                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">

                      148 / 500

                    </h3>

                  </div>

                  <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5">

                    <p className="text-sm text-zinc-400 mb-2">

                      Products Optimized

                    </p>

                    <h3 className="text-2xl font-bold text-white">

                      42 Products

                    </h3>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Settings;