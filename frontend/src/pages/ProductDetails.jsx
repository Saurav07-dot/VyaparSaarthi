import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import { Sparkles } from "lucide-react";
import { Rocket } from "lucide-react";
import { toast } from "react-hot-toast";

import Sidebar from "../components/Sidebar";
import VoiceAssistant from "../components/VoiceAssistant";
import {
  getSingleProduct,
  updateProductWithAI,
} from "../services/productService";

function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {

    const fetchProduct = async () => {

      try {

        const data = await getSingleProduct(id);
        setProduct(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

    fetchProduct();

  }, [id]);

  const handleApplyAI=
    async()=>{

    try{

    setUpdating(true);

    const updated=
    await updateProductWithAI(id);

    setProduct(updated);

    setShowConfirm(false);

    toast.success(
    "AI improvements applied"
    );


    /* refresh whole app data */

    setTimeout(()=>{

    window.location.reload();

    },800);

    }
    catch(error){

    console.log(error);

    toast.error(
    "Update failed"
    );

    }
    finally{

    setUpdating(false);

    }

  };

  if (loading) {

    return (

      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center transition-colors duration-300">

        <div className="text-center">

          <div className="w-16 h-16 border-4 border-indigo-200 dark:border-indigo-500/20 border-t-indigo-600 dark:border-t-indigo-500 rounded-full animate-spin mx-auto"></div>

          <h2 className="text-zinc-900 dark:text-white text-2xl font-bold mt-6">

            Loading Product Intelligence

          </h2>

        </div>

      </div>
    );
  }

  return (

    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white overflow-hidden transition-colors duration-300">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN */}

      <div className="flex-1 grid grid-cols-[42%_58%]">

        {/* ===================================== */}
        {/* LEFT SIDE */}
        {/* ===================================== */}

        <div className="h-screen overflow-y-auto border-r border-zinc-200 dark:border-zinc-800">

          <div className="p-8">

            {/* PRODUCT IMAGE */}

            <div className="relative">

              <img
                src={product.images?.[0]}
                alt={product.title}
                className="w-full h-[450px] object-cover rounded-3xl border border-zinc-200 dark:border-zinc-800"
              />

              <div className="absolute top-5 right-5 bg-white/70 dark:bg-black/70 backdrop-blur-md px-4 py-2 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-md">

                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Overall Score
                </p>

                <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">

                  {product.overallScore || "--"}

                </h3>

              </div>

            </div>

            {/* PRODUCT TITLE */}

            <div className="mt-8">

              <h1 className="text-5xl font-bold leading-tight">

                {product.title}

              </h1>

              <div className="flex flex-wrap gap-3 mt-5">

                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-2 rounded-xl shadow-sm dark:shadow-none">

                  ⭐ {product.rating}
                </div>

                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-2 rounded-xl shadow-sm dark:shadow-none">

                  {product.reviews} Reviews
                </div>

                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-2 rounded-xl shadow-sm dark:shadow-none">

                  {product.category}
                </div>

                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-2 rounded-xl text-indigo-600 dark:text-indigo-400 font-semibold shadow-sm dark:shadow-none">

                  {product.classification}
                </div>

              </div>

            </div>

            {/* DESCRIPTION */}

            <div className="mt-10 glass-panel rounded-3xl p-6">

              <h2 className="text-2xl font-bold mb-5">

                Merchant Description

              </h2>

              <p className="text-zinc-700 dark:text-zinc-300 leading-8 text-lg">

                {product.description}

              </p>

            </div>

            {/* PRODUCT META */}

            <div className="mt-8 grid grid-cols-2 gap-4">

              <div className="glass-panel rounded-2xl p-5">

                <p className="text-zinc-500">
                  Price
                </p>

                <h3 className="text-2xl font-bold mt-2">

                  {product.currency}
                  {product.price}

                </h3>

              </div>

              <div className="glass-panel rounded-2xl p-5">

                <p className="text-zinc-500">
                  Stock
                </p>

                <h3 className="text-2xl font-bold mt-2 text-green-400">

                  {product.inStock ? "In Stock" : "Out of Stock"}

                </h3>

              </div>

            </div>

          </div>

        </div>

        {/* ===================================== */}
        {/* RIGHT SIDE */}
        {/* ===================================== */}

        <div className="h-screen overflow-y-auto">

          <div className="p-8">

            {/* HEADER */}

            <div className="flex items-center justify-between mb-10">

              <div>

                <h2 className="text-4xl font-bold">

                  AI Intelligence

                </h2>

                <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-lg">

                  Ecommerce optimization insights

                </p>

              </div>

              {/* APPLY AI BUTTON */}

              <button
                onClick={() => setShowConfirm(true)}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium hover:scale-105 transition"
              >
                <Rocket size={18} />
                Apply AI Improvements
              </button>

            </div>

            {/* SCORE GRID */}

            <div className="grid grid-cols-2 gap-5">

              <div className="glass-panel rounded-3xl p-6">

                <p className="text-zinc-500">
                  Clarity
                </p>

                <h2 className="text-5xl font-bold mt-4">

                  {product.scores?.clarity}

                </h2>

              </div>

              <div className="glass-panel rounded-3xl p-6">

                <p className="text-zinc-500">
                  Discoverability
                </p>

                <h2 className="text-5xl font-bold mt-4">

                  {product.scores?.discoverability}

                </h2>

              </div>

              <div className="glass-panel rounded-3xl p-6">

                <p className="text-zinc-500">
                  Trust
                </p>

                <h2 className="text-5xl font-bold mt-4">

                  {product.scores?.trust}

                </h2>

              </div>

              <div className="glass-panel rounded-3xl p-6">

                <p className="text-zinc-500">
                  Conversion
                </p>

                <h2 className="text-5xl font-bold mt-4">

                  {product.scores?.conversion}

                </h2>

              </div>

            </div>

            {/* SUMMARY */}

            <div className="mt-8 glass-panel rounded-3xl p-6">

              <h3 className="text-2xl font-bold mb-4">

                AI Summary

              </h3>

              <p className="text-zinc-300 leading-8 text-lg">

                {product.aiAnalysis?.summary}

              </p>

            </div>

            {/* SUGGESTED TITLE */}

            <div className="mt-8 glass-panel rounded-3xl p-6">

              <h3 className="text-2xl font-bold mb-4">

                Suggested Title

              </h3>

              <p className="text-indigo-600 dark:text-indigo-300 text-xl leading-8 font-medium">

                {product.aiAnalysis?.generatedTitle}

              </p>

            </div>

            {/* GENERATED DESCRIPTION */}

            <div className="mt-8 glass-panel rounded-3xl p-6">

              <h3 className="text-2xl font-bold mb-4">

                AI Generated Description

              </h3>

              <p className="text-zinc-300 leading-8 text-lg">

                {product.aiAnalysis?.generatedDescription}

              </p>

            </div>

            {/* PROBLEMS */}

            <div className="mt-8">

              <h3 className="text-2xl font-bold mb-5">

                Problems Detected

              </h3>

              <div className="space-y-4">

                {product.aiProblems?.map(
                  (problem, index) => (

                    <div
                      key={index}
                      className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 p-5 rounded-2xl text-red-600 dark:text-red-300"
                    >
                      {problem}
                    </div>
                  ))}

              </div>

            </div>

            {/* RECOMMENDATIONS */}

            <div className="mt-10">

              <h3 className="text-2xl font-bold mb-5">

                Recommendations

              </h3>

              <div className="space-y-4">

                {product.recommendations?.map(
                  (rec, index) => (

                    <div
                      key={index}
                      className="bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 p-5 rounded-2xl text-indigo-600 dark:text-indigo-300"
                    >
                      {rec}
                    </div>
                  ))}

              </div>

            </div>

            {/* SEO KEYWORDS */}

            <div className="mt-10">

              <h3 className="text-2xl font-bold mb-5">

                SEO Keywords

              </h3>

              <div className="flex flex-wrap gap-3">

                {product.aiAnalysis?.seoKeywords?.map(
                  (keyword, index) => (

                    <span
                      key={index}
                      className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 rounded-2xl text-zinc-700 dark:text-zinc-300 shadow-sm dark:shadow-none"
                    >
                      {keyword}
                    </span>
                  ))}

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* CONFIRM MODAL */}

      {showConfirm && (

        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">

          <div className="bg-white dark:bg-zinc-900 rounded-3xl w-[450px] p-7 shadow-2xl">

            <h2 className="text-2xl font-bold mb-4">

              Apply AI Improvements?

            </h2>

            <p className="text-zinc-500 leading-8 mb-6">

              This will update:
              <br />
              ✅ Product title
              <br />
              ✅ Product description
              <br /><br />
              Images are managed through Shopify.

            </p>

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setShowConfirm(false)}
                className="px-5 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700"
              >
                Cancel
              </button>

              <button
                onClick={handleApplyAI}
                disabled={updating}
                className="px-5 py-3 rounded-xl bg-indigo-600 text-white disabled:opacity-60"
              >
                {updating ? "Updating..." : "Apply"}
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default ProductDetails;