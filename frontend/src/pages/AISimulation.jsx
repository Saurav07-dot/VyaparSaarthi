import { useState, useRef, useEffect } from "react";
import {
  Search,
  Brain,
  ArrowRight,
  Send,
  Bot,
  User,
  TrendingUp,
  Star,
  AlertTriangle,
  XCircle,
  Zap,
  RotateCcw,
  Clock,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { runSimulation } from "../services/simulationService";
import VoiceAssistant from "../components/VoiceAssistant";

// ─────────────────────────────────────────────
// localStorage — last 2 query+response pairs
// ─────────────────────────────────────────────
const LS_KEY = "ai_sim_history";
const MAX_HISTORY = 2;

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY)) ?? [];
  } catch {
    return [];
  }
}

function persistHistory(entry) {
  try {
    const prev = loadHistory();
    const next = [entry, ...prev].slice(0, MAX_HISTORY);
    localStorage.setItem(LS_KEY, JSON.stringify(next));
  } catch { /* noop */ }
}

// ─────────────────────────────────────────────
// Badge config
// ─────────────────────────────────────────────
function getBadge(chance) {
  if (chance >= 80)
    return {
      label: "Great",
      icon: Star,
      bg: "bg-emerald-100 dark:bg-emerald-900/40",
      text: "text-emerald-700 dark:text-emerald-300",
      border: "border-emerald-200 dark:border-emerald-700/50",
      bar: "from-emerald-400 to-emerald-500",
    };
  if (chance >= 60)
    return {
      label: "Good",
      icon: TrendingUp,
      bg: "bg-blue-100 dark:bg-blue-900/40",
      text: "text-blue-700 dark:text-blue-300",
      border: "border-blue-200 dark:border-blue-700/50",
      bar: "from-blue-400 to-blue-500",
    };
  if (chance >= 40)
    return {
      label: "Average",
      icon: AlertTriangle,
      bg: "bg-amber-100 dark:bg-amber-900/40",
      text: "text-amber-700 dark:text-amber-300",
      border: "border-amber-200 dark:border-amber-700/50",
      bar: "from-amber-400 to-amber-500",
    };
  return {
    label: "Worst",
    icon: XCircle,
    bg: "bg-red-100 dark:bg-red-900/40",
    text: "text-red-700 dark:text-red-300",
    border: "border-red-200 dark:border-red-700/50",
    bar: "from-red-400 to-red-500",
  };
}

// ─────────────────────────────────────────────
// Product card
// ─────────────────────────────────────────────
function ProductCard({ item, onClick }) {
  const badge = getBadge(item.chance);
  const BadgeIcon = badge.icon;

  return (
    <div
      onClick={() => onClick(item.id)}
      className={`
        group relative bg-white dark:bg-zinc-900
        border ${badge.border}
        rounded-2xl overflow-hidden cursor-pointer
        hover:scale-[1.02] transition-all duration-200
        shadow-sm hover:shadow-md dark:shadow-none
      `}
    >
      <div className="relative">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-40 object-cover"
        />
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full">
          {item.chance}% AI visibility
        </div>
        <div
          className={`
            absolute top-3 right-3 flex items-center gap-1
            ${badge.bg} ${badge.text} border ${badge.border}
            text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm
          `}
        >
          <BadgeIcon size={11} />
          {badge.label}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-sm text-zinc-900 dark:text-white leading-snug">
            {item.title}
          </h3>
          <ArrowRight
            size={16}
            className="text-zinc-400 dark:text-zinc-500 group-hover:translate-x-1 transition-transform mt-0.5 flex-shrink-0"
          />
        </div>

        <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
          ₹{item.price?.toLocaleString()}
        </p>

        <div className="mt-3 h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
          <div
            style={{ width: `${item.chance}%` }}
            className={`h-full bg-gradient-to-r ${badge.bar} rounded-full transition-all duration-700`}
          />
        </div>

        {item.reason?.length > 0 && (
          <ul className="mt-3 space-y-1">
            {item.reason.slice(0, 2).map((r, i) => (
              <li key={i} className="text-xs text-zinc-500 dark:text-zinc-400 flex items-start gap-1.5">
                <Zap size={10} className="mt-0.5 text-indigo-400 flex-shrink-0" />
                {r}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Chat primitives
// ─────────────────────────────────────────────
function UserMessage({ text }) {
  return (
    <div className="flex justify-end gap-3 items-end">
      <div className="max-w-[68%] bg-indigo-600 text-white rounded-2xl rounded-br-sm px-4 py-3 text-sm leading-relaxed shadow-sm">
        {text}
      </div>
      <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center flex-shrink-0">
        <User size={14} className="text-indigo-600 dark:text-indigo-400" />
      </div>
    </div>
  );
}

function AIMessage({ children }) {
  return (
    <div className="flex gap-3 items-start">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0 shadow-sm">
        <Bot size={14} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <AIMessage>
      <div className="inline-flex items-center gap-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl rounded-tl-sm px-4 py-3">
        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0ms]" />
        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:150ms]" />
        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:300ms]" />
      </div>
    </AIMessage>
  );
}

// ─────────────────────────────────────────────
// History bubble — rendered inline in chat on load
// ─────────────────────────────────────────────
function HistoryBubble({ entry, onRerun }) {
  return (
    <AIMessage>
      <div className="space-y-2">
        {/* Timestamp label */}
        <div className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500">
          <Clock size={11} />
          <span>
            Past simulation &middot;{" "}
            {new Date(entry.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            {", "}
            {new Date(entry.timestamp).toLocaleDateString([], {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>

        {/* Bubble */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl rounded-tl-sm px-4 py-3 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-zinc-700 dark:text-zinc-300">
              Query:{" "}
              <span className="font-medium text-indigo-600 dark:text-indigo-400">
                "{entry.query}"
              </span>
            </p>
            <button
              onClick={() => onRerun(entry.query)}
              className="flex items-center gap-1 text-xs text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex-shrink-0"
            >
              <RotateCcw size={12} />
              Re-run
            </button>
          </div>

          {entry.results?.length > 0 ? (
            <div className="space-y-2 border-t border-zinc-100 dark:border-zinc-800 pt-3">
              {entry.results.slice(0, 3).map((item) => {
                const b = getBadge(item.chance);
                const BIcon = b.icon;
                return (
                  <div key={item.id} className="flex items-center gap-3">
                    <span className={`flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${b.bg} ${b.text} border ${b.border} flex-shrink-0`}>
                      <BIcon size={9} />
                      {b.label}
                    </span>
                    <span className="text-xs text-zinc-600 dark:text-zinc-400 truncate flex-1">
                      {item.title}
                    </span>
                    <span className="text-[10px] text-zinc-400 flex-shrink-0">
                      {item.chance}% AI visibility
                    </span>
                  </div>
                );
              })}
              {entry.results.length > 3 && (
                <p className="text-[11px] text-zinc-400 pt-1">
                  +{entry.results.length - 3} more products
                </p>
              )}
            </div>
          ) : (
            /* Empty result stored in history */
            <div className="border-t border-zinc-100 dark:border-zinc-800 pt-3 flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/40 rounded-full px-3 py-1">
                <Sparkles size={11} className="text-amber-500" />
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400">78%</span>
                <span className="text-xs text-amber-600 dark:text-amber-400">AI visibility</span>
              </div>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                No products matched
              </span>
            </div>
          )}
        </div>
      </div>
    </AIMessage>
  );
}

// ─────────────────────────────────────────────
// Suggestions
// ─────────────────────────────────────────────
const SUGGESTIONS = [
  "best shoes under 5000",
  "waterproof shoes",
  "skin serum",
  "coffee",
];

// ─────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────
function AISimulation() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  // Initialise messages from localStorage history (last 2), shown inline
  const [messages, setMessages] = useState(() => {
    const hist = loadHistory();
    // Oldest first so newest appears closest to input
    return [...hist].reverse().map((entry) => ({ type: "history", entry }));
  });

  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  function openProduct(productId) {
    if (!productId) return;
    navigate(`/products/${productId}`);
  }

  async function handleSearch(q) {
    const text = (q ?? query).trim();
    if (!text) return;

    setQuery("");
    setLoading(true);
    setMessages((prev) => [...prev, { type: "user", text }]);

    try {
      const data = await runSimulation(text);
      const entry = { query: text, results: data ?? [], timestamp: Date.now() };

      // Persist — keeps only last 2 in localStorage
      persistHistory(entry);

      if (!data || data.length === 0) {
        setMessages((prev) => [...prev, { type: "ai-empty", query: text }]);
      } else {
        setMessages((prev) => [...prev, { type: "ai-results", query: text, results: data }]);
      }
    } catch {
      setMessages((prev) => [...prev, { type: "ai-error" }]);
    }

    setLoading(false);
    inputRef.current?.focus();
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSearch();
  }

  const hasRealMessages = messages.some((m) => m.type !== "history");

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* ── Top bar ── */}
        <div className="flex-shrink-0 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-indigo-500 to-violet-600 p-2 rounded-xl">
              <Brain size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-base font-semibold text-zinc-900 dark:text-white">
                AI Shopping Simulation
              </h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                See how AI discovers & recommends your products
              </p>
            </div>
          </div>

          {/* Badge legend */}
          <div className="hidden md:flex items-center gap-2">
            {[
              { label: "Great", bg: "bg-emerald-100 dark:bg-emerald-900/40", text: "text-emerald-700 dark:text-emerald-300" },
              { label: "Good", bg: "bg-blue-100 dark:bg-blue-900/40", text: "text-blue-700 dark:text-blue-300" },
              { label: "Average", bg: "bg-amber-100 dark:bg-amber-900/40", text: "text-amber-700 dark:text-amber-300" },
              { label: "Worst", bg: "bg-red-100 dark:bg-red-900/40", text: "text-red-700 dark:text-red-300" },
            ].map((b) => (
              <span key={b.label} className={`text-xs font-medium px-2.5 py-1 rounded-full ${b.bg} ${b.text}`}>
                {b.label}
              </span>
            ))}
          </div>
        </div>
        {/* ── Chat area ── */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Welcome — only when no real queries yet */}
          {!hasRealMessages && messages.length === 0 && (
            <div className="flex flex-col items-center justify-center text-center max-w-lg mx-auto gap-6 pt-10">
              <div className="bg-gradient-to-br from-indigo-500 to-violet-600 p-5 rounded-3xl shadow-lg">
                <Brain size={40} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                  Ask me anything
                </h2>
                <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-sm leading-relaxed">
                  Type a query a real shopper would use. I'll simulate how AI
                  assistants discover and rank your products.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSearch(s)}
                    className="
                      bg-white dark:bg-zinc-900
                      border border-zinc-200 dark:border-zinc-800
                      text-zinc-700 dark:text-zinc-300
                      text-sm px-4 py-2 rounded-full
                      hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400
                      transition-all duration-150
                    "
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* All messages */}
          {messages.map((msg, idx) => {

            if (msg.type === "history") {
              return (
                <HistoryBubble
                  key={`hist-${idx}`}
                  entry={msg.entry}
                  onRerun={handleSearch}
                />
              );
            }

            if (msg.type === "user") {
              return <UserMessage key={idx} text={msg.text} />;
            }

            if (msg.type === "ai-results") {
              return (
                <AIMessage key={idx}>
                  <div className="space-y-3">
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      Found{" "}
                      <strong className="text-zinc-900 dark:text-white">
                        {msg.results.length} products
                      </strong>{" "}
                      matching{" "}
                      <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                        "{msg.query}"
                      </span>
                      . Here's how AI would rank them:
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {msg.results.map((item) => (
                        <ProductCard key={item.id} item={item} onClick={openProduct} />
                      ))}
                    </div>
                  </div>
                </AIMessage>
              );
            }

            if (msg.type === "ai-empty") {
              return (
                <AIMessage key={idx}>
                  <div className="
                    bg-white dark:bg-zinc-900
                    border border-zinc-200 dark:border-zinc-800
                    rounded-2xl rounded-tl-sm
                    px-4 py-4 space-y-3
                  ">
                    <p className="text-sm text-zinc-700 dark:text-zinc-300">
                      Simulation complete for{" "}
                      <span className="font-medium text-indigo-600 dark:text-indigo-400">
                        "{msg.query}"
                      </span>
                    </p>

                    <div className="
                      flex items-center gap-2
                      text-sm text-zinc-500 dark:text-zinc-400
                      border-t border-zinc-100 dark:border-zinc-800
                      pt-3
                    ">
                      <XCircle
                        size={16}
                        className="text-red-500"
                      />

                      No products matched this query
                    </div>

                    <p className="
                      text-xs text-zinc-400
                      dark:text-zinc-500
                      leading-relaxed
                    ">
                      AI couldn't find any relevant products for this search in your store.
                      Try improving product keywords, categories,
                      or product descriptions.
                    </p>
                  </div>
                </AIMessage>
              );
            }

            if (msg.type === "ai-error") {
              return (
                <AIMessage key={idx}>
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-red-600 dark:text-red-400">
                    Something went wrong. Please try again.
                  </div>
                </AIMessage>
              );
            }

            return null;
          })}

          {loading && <TypingIndicator />}
          <div ref={chatEndRef} />
        </div>

        {/* ── Input bar ── */}
        <div className="flex-shrink-0 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 px-6 py-4">

          {/* Suggestion chips — shown once chat has started */}
          {(hasRealMessages || messages.length > 0) && (
            <div className="flex gap-2 flex-wrap mb-3">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSearch(s)}
                  className="
                    text-xs bg-zinc-100 dark:bg-zinc-900
                    border border-zinc-200 dark:border-zinc-800
                    text-zinc-600 dark:text-zinc-400
                    px-3 py-1.5 rounded-full
                    hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400
                    transition-all duration-150
                  "
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className="flex gap-3">
            <div className="flex-1 flex items-center bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-4 gap-3 focus-within:border-indigo-400 dark:focus-within:border-indigo-600 transition-colors">
              <Search size={16} className="text-zinc-400 flex-shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="e.g. best waterproof shoes under ₹4000…"
                className="flex-1 bg-transparent text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 outline-none py-3.5"
              />
            </div>

            <button
              onClick={() => handleSearch()}
              disabled={!query.trim() || loading}
              className="
                bg-indigo-600 hover:bg-indigo-700
                disabled:opacity-40 disabled:cursor-not-allowed
                text-white rounded-2xl px-5
                flex items-center gap-2 text-sm font-medium
                transition-all duration-150
                active:scale-95
              "
            >
              <Send size={15} />
              <span className="hidden sm:inline">Simulate</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AISimulation;