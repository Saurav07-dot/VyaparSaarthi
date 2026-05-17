const mongoose =
  require("mongoose");

const ProductSchema =
  new mongoose.Schema(
    {
      // =====================================
      // BASIC PRODUCT INFO
      // =====================================

      id: String,

      storeId: {
        type: String,
        required: true,
        index: true,
      },

      title: String,

      description: String,

      category: String,

      price: Number,

      currency: String,

      reviews: Number,

      rating: Number,

      tags: [String],

      images: [String],

      inStock: Boolean,

      // =====================================
      // PRODUCT ATTRIBUTES
      // =====================================

      material: String,

      targetGender: String,

      sizes: [String],

      dimensions: String,

      weightCapacity: String,

      petType: String,

      suitableFor: String,

      weight: String,

      ingredients: [String],

      skinType: String,

      keyIngredients: [String],

      volume: String,

      roastLevel: String,

      origin: String,

      process: String,

      tastingNotes: [String],

      brewMethods: [String],

      // =====================================
      // AI SCORES
      // =====================================

      scores: {

        clarity: {
          type: Number,
          default: 0,
        },

        discoverability: {
          type: Number,
          default: 0,
        },

        trust: {
          type: Number,
          default: 0,
        },

        conversion: {
          type: Number,
          default: 0,
        },
      },

      // =====================================
      // OVERALL SCORE
      // =====================================

      overallScore: {
        type: Number,
        default: 0,
      },

      // =====================================
      // CLASSIFICATION
      // =====================================

      classification: {
        type: String,

        enum: [
          "Excellent",
          "Good",
          "Average",
          "Worst",
          "Pending",
        ],

        default: "Pending",
      },

      // =====================================
      // AI PROBLEMS
      // =====================================

      aiProblems: {
        type: [String],
        default: [],
      },

      // =====================================
      // AI RECOMMENDATIONS
      // =====================================

      recommendations: {
        type: [String],
        default: [],
      },

      // =====================================
      // AI ANALYSIS
      // =====================================

      aiAnalysis: {

        // ===============================
        // OVERVIEW
        // ===============================

        summary: {
          type: String,
          default: "",
        },

        priorityFixes: {
          type: [String],
          default: [],
        },

        // ===============================
        // AI GENERATED CONTENT
        // ===============================

        generatedTitle: {
          type: String,
          default: "",
        },

        generatedDescription: {
          type: String,
          default: "",
        },

        shortDescription: {
          type: String,
          default: "",
        },

        // ===============================
        // SEO
        // ===============================

        metaTitle: {
          type: String,
          default: "",
        },

        metaDescription: {
          type: String,
          default: "",
        },

        seoKeywords: {
          type: [String],
          default: [],
        },

        highIntentKeywords: {
          type: [String],
          default: [],
        },

        // ===============================
        // FAQ + CTA
        // ===============================

        faqSuggestions: {
          type: [String],
          default: [],
        },

        ctaSuggestions: {
          type: [String],
          default: [],
        },

        // ===============================
        // TRUST + UX
        // ===============================

        trustSignalsNeeded: {
          type: [String],
          default: [],
        },

        missingSections: {
          type: [String],
          default: [],
        },

        targetAudience: {
          type: [String],
          default: [],
        },

        // ===============================
        // IMAGE ANALYSIS
        // ===============================

        imageQuality: {
          type: Number,
          default: 0,
        },

        imageAnalysis: {

          imageIssues: {
            type: [String],
            default: [],
          },

          imageRecommendations: {
            type: [String],
            default: [],
          },

          missingImageTypes: {
            type: [String],
            default: [],
          },
        },

        // ===============================
        // META
        // ===============================

        analyzedHash: String,

        lastAnalyzed: Date,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Product",
    ProductSchema
  );