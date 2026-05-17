import {
  useState,
} from "react";

import {
  Upload,
  Sparkles,
  ImageIcon,
  WandSparkles,
  Tags,
  FileText,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";

import Sidebar
from "../components/Sidebar";

import {
  generateAIContent,
} from "../services/aiStudioService";

function AIProductStudio() {

  const [title, setTitle] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [category, setCategory] =
    useState("");

  const [image, setImage] =
    useState(null);

  const [preview, setPreview] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState(null);

  const handleImage =
    (e) => {

      const file =
        e.target.files[0];

      if (!file) return;

      setImage(file);

      setPreview(
        URL.createObjectURL(file)
      );
    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        setResult(null);

        const formData =
          new FormData();

        formData.append(
          "title",
          title
        );

        formData.append(
          "description",
          description
        );

        formData.append(
          "category",
          category
        );

        if (image) {

          formData.append(
            "image",
            image
          );
        }

        const data =
          await generateAIContent(
            formData
          );

        setResult(data.result);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  return (

    <div className="flex bg-zinc-50 dark:bg-zinc-950 h-screen overflow-hidden transition-colors duration-300">

      <Sidebar />

      <div className="flex-1 overflow-y-auto p-8 text-zinc-900 dark:text-white">

        {/* HEADER */}

        <div className="mb-8">

          <div className="flex items-center gap-3 mb-3">

            <div className="bg-indigo-100 dark:bg-indigo-500/20 p-3 rounded-2xl">

              <WandSparkles
                className="text-indigo-600 dark:text-indigo-400"
                size={28}
              />

            </div>

            <div>

              <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">

                AI Product Studio

              </h1>

              <p className="text-zinc-500 dark:text-zinc-400 mt-1">

                Generate AI optimized
                product listings instantly

              </p>

            </div>

          </div>

        </div>

        {/* MAIN GRID */}

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">

          {/* LEFT */}

          <div className="xl:col-span-2">

            <form
              onSubmit={handleSubmit}
              className="glass-panel rounded-3xl p-6 space-y-5 sticky top-8 transition-colors duration-300"
            >

              {/* IMAGE */}

              <div>

                <label className="text-sm text-zinc-600 dark:text-zinc-400 mb-2 block">

                  Product Image

                </label>

                <label className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl h-64 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition bg-zinc-50 dark:bg-zinc-950 overflow-hidden">

                  {preview ? (

                    <img
                      src={preview}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />

                  ) : (

                    <>

                      <ImageIcon
                        size={42}
                        className="text-zinc-500 mb-3"
                      />

                      <p className="text-zinc-700 dark:text-zinc-300 font-medium">

                        Upload Product Image

                      </p>

                    </>

                  )}

                  <input
                    type="file"
                    className="hidden"
                    onChange={
                      handleImage
                    }
                  />

                </label>

              </div>

              {/* TITLE */}

              <div>

                <label className="text-sm text-zinc-600 dark:text-zinc-400 mb-2 block">

                  Product Title

                </label>

                <div className="relative">

                  <Tags
                    size={18}
                    className="absolute left-4 top-4 text-zinc-500"
                  />

                  <input
                    type="text"
                    placeholder="Enter product title"
                    value={title}
                    onChange={(e) =>
                      setTitle(
                        e.target.value
                      )
                    }
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-indigo-500 text-zinc-900 dark:text-white"
                  />

                </div>

              </div>

              {/* CATEGORY */}

              <div>

                <label className="text-sm text-zinc-600 dark:text-zinc-400 mb-2 block">

                  Product Category

                </label>

                <input
                  type="text"
                  placeholder="Electronics, Fashion..."
                  value={category}
                  onChange={(e) =>
                    setCategory(
                      e.target.value
                    )
                  }
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-2xl p-4 outline-none focus:border-indigo-500 text-zinc-900 dark:text-white"
                />

              </div>

              {/* DESCRIPTION */}

              <div>

                <label className="text-sm text-zinc-400 mb-2 block">

                  Current Description

                </label>

                <div className="relative">

                  <FileText
                    size={18}
                    className="absolute left-4 top-4 text-zinc-500"
                  />

                  <textarea
                    rows="6"
                    placeholder="Write current product description..."
                    value={description}
                    onChange={(e) =>
                      setDescription(
                        e.target.value
                      )
                    }
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-indigo-500 resize-none text-zinc-900 dark:text-white"
                  />

                </div>

              </div>

              {/* BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition text-white"
              >

                <Sparkles size={18} />

                {
                  loading
                    ? "Generating..."
                    : "Generate AI Listing"
                }

              </button>

            </form>

          </div>

          {/* RIGHT */}

          <div className="xl:col-span-3">

            {!result ? (

              <div className="glass-panel rounded-3xl min-h-[700px] flex flex-col items-center justify-center text-center p-10 transition-colors duration-300">

                <div className="w-24 h-24 rounded-full bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center mb-6">

                  <Upload
                    size={40}
                    className="text-indigo-600 dark:text-indigo-400"
                  />

                </div>

                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">

                  AI Generated Content
                  Appears Here

                </h2>

                <p className="text-zinc-400 max-w-md leading-relaxed">

                  Upload your product image,
                  enter product details and
                  generate optimized ecommerce
                  content instantly.

                </p>

              </div>

            ) : (

              <div className="space-y-6">

                {/* TITLE */}

                <div className="glass-panel rounded-3xl p-6 transition-colors duration-300">

                  <p className="text-sm text-zinc-500 mb-2">

                    Optimized Product Title

                  </p>

                  <h2 className="text-3xl font-bold text-zinc-900 dark:text-white leading-relaxed">

                    {
                      result.optimized_product_title
                    }

                  </h2>

                </div>

                {/* DESCRIPTION */}

                <div className="glass-panel rounded-3xl p-6 transition-colors duration-300">

                  <p className="text-sm text-zinc-500 mb-4">

                    High Converting Description

                  </p>

                  <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">

                    {
                      result.high_converting_description
                    }

                  </p>

                </div>

                {/* BULLETS */}

                <div className="glass-panel rounded-3xl p-6 transition-colors duration-300">

                  <p className="text-sm text-zinc-500 mb-5">

                    Product Highlights

                  </p>

                  <div className="space-y-4">

                    {result.bullet_points?.map(
                      (
                        point,
                        index
                      ) => (

                        <div
                          key={index}
                          className="flex items-start gap-3"
                        >

                          <BadgeCheck
                            size={18}
                            className="text-indigo-400 mt-1"
                          />

                          <p className="text-zinc-700 dark:text-zinc-300">

                            {point}

                          </p>

                        </div>
                      )
                    )}

                  </div>

                </div>

                {/* SEO */}

                <div className="glass-panel rounded-3xl p-6 transition-colors duration-300">

                  <p className="text-sm text-zinc-500 mb-5">

                    SEO Keywords

                  </p>

                  <div className="flex flex-wrap gap-3">

                    {result.seo_keywords?.map(
                      (
                        keyword,
                        index
                      ) => (

                        <span
                          key={index}
                          className="px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm"
                        >

                          {keyword}

                        </span>
                      )
                    )}

                  </div>

                </div>

                {/* TAGS */}

                <div className="glass-panel rounded-3xl p-6 transition-colors duration-300">

                  <p className="text-sm text-zinc-500 mb-5">

                    Suggested Tags

                  </p>

                  <div className="flex flex-wrap gap-3">

                    {result.suggested_tags?.map(
                      (
                        tag,
                        index
                      ) => (

                        <span
                          key={index}
                          className="px-4 py-2 rounded-xl bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm"
                        >

                          #{tag}

                        </span>
                      )
                    )}

                  </div>

                </div>

                {/* TRUST */}

                <div className="glass-panel rounded-3xl p-6 transition-colors duration-300">

                  <div className="flex items-center gap-2 mb-5">

                    <ShieldCheck
                      className="text-green-400"
                      size={20}
                    />

                    <p className="text-sm text-zinc-500">

                      Trust Signals

                    </p>

                  </div>

                  <div className="space-y-3">

                    {result.trust_signals?.map(
                      (
                        item,
                        index
                      ) => (

                        <div
                          key={index}
                          className="text-zinc-700 dark:text-zinc-300"
                        >

                          • {item}

                        </div>
                      )
                    )}

                  </div>

                </div>

                {/* TIPS */}

                <div className="glass-panel rounded-3xl p-6 transition-colors duration-300">

                  <p className="text-sm text-zinc-500 mb-5">

                    Conversion Improvement Tips

                  </p>

                  <div className="space-y-3">

                    {result.conversion_improvement_tips?.map(
                      (
                        tip,
                        index
                      ) => (

                        <div
                          key={index}
                          className="text-zinc-700 dark:text-zinc-300"
                        >

                          • {tip}

                        </div>
                      )
                    )}

                  </div>

                </div>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default AIProductStudio;