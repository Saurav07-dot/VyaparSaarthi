const Product =
  require("../models/Product");

const generateProductAnalysis =
  require(
    "../services/geminiService"
  );

// =========================================
// HELPER FUNCTION
// =========================================

const processAnalysis =
  async (product) => {

    const rawAnalysis =
      await generateProductAnalysis(
        product
      );

    // =====================================
    // CLEAN RESPONSE
    // =====================================

    const cleaned =
      rawAnalysis
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    // =====================================
    // SAFE JSON PARSE
    // =====================================

    let analysis;

    try {

      analysis =
        JSON.parse(cleaned);

    } catch (parseError) {

      console.log(
        "JSON Parse Failed:",
        product.title
      );

      console.log(cleaned);

      return null;
    }

    // =====================================
    // SAFE SCORES
    // =====================================

    const clarity =
      analysis.clarity || 0;

    const discoverability =
      analysis.discoverability || 0;

    const trust =
      analysis.trust || 0;

    const conversion =
      analysis.conversion || 0;

    // =====================================
    // AVERAGE
    // =====================================

    const average =
      Math.floor(
        (
          clarity +
          discoverability +
          trust +
          conversion
        ) / 4
      );

    // =====================================
    // CLASSIFICATION
    // =====================================

    let classification =
      "Good";

    if (average >= 80) {

      classification =
        "Excellent";
    }
    else if (
      average >= 60
    ) {

      classification =
        "Good";
    }
    else if (
      average >= 40
    ) {

      classification =
        "Average";
    }
    else {

      classification =
        "Worst";
    }

    // =====================================
    // SCORES
    // =====================================

    product.scores = {

      clarity,

      discoverability,

      trust,

      conversion,
    };

    // =====================================
    // OVERALL SCORE
    // =====================================

    product.overallScore =
      average;

    product.classification =
      classification;

    // =====================================
    // PROBLEMS + RECOMMENDATIONS
    // =====================================

    product.aiProblems =
      analysis.problems || [];

    product.recommendations =
      analysis.recommendations || [];

    // =====================================
    // AI ANALYSIS
    // =====================================

    product.aiAnalysis = {

      summary:
        analysis.summary || "",

      priorityFixes:
        analysis.priorityFixes || [],

      seoKeywords:
        analysis.seoKeywords || [],

      highIntentKeywords:
        analysis.highIntentKeywords || [],

      faqSuggestions:
        analysis.faqSuggestions || [],

      generatedTitle:
        analysis.generatedTitle ||
        analysis.suggestedTitle ||
        "",

      metaTitle:
        analysis.metaTitle || "",

      metaDescription:
        analysis.metaDescription || "",

      generatedDescription:
        analysis.generatedDescription || "",

      shortDescription:
        analysis.shortDescription || "",

      ctaSuggestions:
        analysis.ctaSuggestions || [],

      trustSignalsNeeded:
        analysis.trustSignalsNeeded || [],

      missingSections:
        analysis.missingSections || [],

      targetAudience:
        analysis.targetAudience || [],

      imageQuality:
        analysis.imageQuality || 0,

      imageAnalysis:
        analysis.imageAnalysis || {},

      lastAnalyzed:
        new Date(),
    };

    await product.save();

    return product;
  };

// =========================================
// SINGLE PRODUCT ANALYSIS
// =========================================

const analyzeProduct =
  async (req, res) => {

    try {

      const product =
        await Product.findById(
          req.params.id
        );

      if (!product) {

        return res.status(404).json({
          message:
            "Product not found",
        });
      }

      const updated =
        await processAnalysis(
          product
        );

      if (!updated) {

        return res.status(500).json({
          message:
            "AI parsing failed",
        });
      }

      res.json(updated);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "AI analysis failed",
      });
    }
  };

// =========================================
// ANALYZE ALL PRODUCTS
// =========================================

const analyzeAllProducts =
  async (req, res) => {

    try {

      const storeId =
        req.params.storeId;

      const products =
        await Product.find({
          storeId,
        });

      let successCount = 0;

      let failedCount = 0;

      for (const product of products) {

        // =================================
        // SKIP ALREADY ANALYZED
        // =================================

        if (
          product.overallScore
        ) {
          continue;
        }

        try {

          const result =
            await processAnalysis(
              product
            );

          if (result) {

            successCount++;

            console.log(
              "SUCCESS:",
              product.title
            );

          } else {

            failedCount++;

            console.log(
              "FAILED:",
              product.title
            );
          }

        } catch (err) {

          failedCount++;

          console.log(
            "FAILED PRODUCT:",
            product.title
          );

          console.log(err);
        }
      }

      res.json({

        message:
          "Store analysis complete",

        analyzed:
          successCount,

        failed:
          failedCount,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Bulk AI analysis failed",
      });
    }
  };

module.exports = {

  analyzeProduct,

  analyzeAllProducts,
};