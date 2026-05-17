// =====================================
// FILE: src/components/AIStudioCard.jsx
// =====================================

import {
  WandSparkles,
  ArrowRight,
  Sparkles,
  ImageIcon,
  TrendingUp,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

function AIStudioCard() {

  return (

    <div className="
      glass-panel
      rounded-3xl
      p-6
      h-full
      relative
      overflow-hidden
      border
      border-slate-200
      dark:border-white/5
      transition-all
      duration-300
    ">

      {/* SOFT GLOW */}

      <div className="
        absolute
        top-[-100px]
        right-[-100px]
        w-64
        h-64
        rounded-full
        bg-indigo-500/5
        blur-3xl
      " />

      {/* HEADER */}

      <div className="
        relative
        z-10
        flex
        items-start
        justify-between
        mb-6
      ">

        <div className="
          flex
          items-center
          gap-3
        ">

          <div className="
            w-11
            h-11
            rounded-2xl
            bg-indigo-50
            dark:bg-indigo-500/10
            border
            border-indigo-200
            dark:border-indigo-500/20
            flex
            items-center
            justify-center
          ">

            <WandSparkles
              size={18}
              className="
                text-indigo-600
                dark:text-indigo-400
              "
            />

          </div>

          <div>

            <h2 className="
              text-lg
              font-semibold
              text-slate-900
              dark:text-white
            ">

              AI Product Studio

            </h2>

            <p className="
              text-xs
              text-slate-500
              dark:text-zinc-400
              mt-1
            ">

              AI optimized content generation

            </p>

          </div>

        </div>

        <span className="
          px-2.5
          py-1
          rounded-full
          text-[11px]
          font-medium
          bg-emerald-50
          dark:bg-emerald-500/10
          text-emerald-600
          dark:text-emerald-400
        ">

          Active

        </span>

      </div>


      {/* MAIN CONTENT */}

      <div className="
        relative
        z-10
        rounded-2xl
        border
        border-slate-200
        dark:border-white/5
        bg-slate-50
        dark:bg-white/[0.02]
        p-5
      ">

        <div className="
          flex
          gap-4
        ">

          {/* LEFT ICON */}

          <div className="
            w-14
            h-14
            rounded-2xl
            bg-indigo-100
            dark:bg-indigo-500/10
            flex
            items-center
            justify-center
            shrink-0
          ">

            <ImageIcon
              size={24}
              className="
                text-indigo-600
                dark:text-indigo-400
              "
            />

          </div>


          {/* RIGHT */}

          <div className="flex-1">

            <h3 className="
              text-sm
              font-semibold
              text-slate-900
              dark:text-white
            ">

              Generate Better Product Content

            </h3>

            <p className="
              text-xs
              leading-relaxed
              text-slate-500
              dark:text-zinc-400
              mt-2
            ">

              Create AI-powered titles,
              descriptions, SEO keywords
              and conversion-focused content.

            </p>


            {/* TAGS */}

            <div className="
              flex
              flex-wrap
              gap-2
              mt-4
              mb-5
            ">

              <span className="
                px-2.5
                py-1
                rounded-full
                text-[11px]
                bg-indigo-100
                dark:bg-indigo-500/10
                text-indigo-600
                dark:text-indigo-300
              ">
                AI Titles
              </span>

              <span className="
                px-2.5
                py-1
                rounded-full
                text-[11px]
                bg-emerald-100
                dark:bg-emerald-500/10
                text-emerald-600
                dark:text-emerald-300
              ">
                SEO
              </span>

              <span className="
                px-2.5
                py-1
                rounded-full
                text-[11px]
                bg-orange-100
                dark:bg-orange-500/10
                text-orange-600
                dark:text-orange-300
              ">
                Conversion
              </span>

            </div>


            {/* FOOTER */}

            <div className="
              flex
              items-center
              justify-between
              pt-4
              border-t
              border-slate-200
              dark:border-white/5
            ">

              <div className="
                flex
                items-center
                gap-2
                text-xs
                text-emerald-500
                font-medium
              ">

                <TrendingUp size={13} />

                AI boost your product content performance

              </div>


              <Link
                to="/ai-product-studio"
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  rounded-xl
                  bg-indigo-600
                  hover:bg-indigo-500
                  transition
                  text-white
                  text-xs
                  font-medium
                "
              >

                <Sparkles size={14} />

                Open Studio

                <ArrowRight size={14} />

              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>

  )

}

export default AIStudioCard;