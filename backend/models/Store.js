const mongoose =
  require("mongoose")

const StoreSchema =
  new mongoose.Schema(

    {
      storeId: {
        type: String,
        required: true,
        unique: true,
      },

      email: {
        type: String,
        required: true,
        unique: true,
      },

      storeName: String,

      domain: String,

      category: String,

      // ===================================
      // POLICIES
      // ===================================

      policies: {

        returnPolicy:
          String,

        shippingPolicy:
          String,

        warrantyPolicy:
          String,
      },

      // ===================================
      // FAQS
      // ===================================

      faqs: [
        {
          question:
            String,

          answer:
            String,
        },
      ],

      // ===================================
      // OVERALL AI SCORES
      // ===================================

      overallScores: {

        aiDiscoverability: {
          type: Number,
          default: 0,
        },

        productClarity: {
          type: Number,
          default: 0,
        },

        trustSignals: {
          type: Number,
          default: 0,
        },

        conversionReadiness: {
          type: Number,
          default: 0,
        },
      },

      // ===================================
      // AI RECOMMENDATIONS
      // ===================================

      recommendationData: {

        summary: {
          type: String,
          default: "",
        },

        recommendations: [

          {
            title: String,

            description:
              String,

            priority:
              String,

            impact:
              String,

            category:
              String,

            actionItems:
              [String],
          },
        ],
      },

      // ===================================
      // RECOMMENDATION META
      // ===================================

      recommendationGeneratedAt:
        Date,
    },

    {
      timestamps: true,
    }
  )

module.exports =
  mongoose.model(
    "Store",
    StoreSchema
  )