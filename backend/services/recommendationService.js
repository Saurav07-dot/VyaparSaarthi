const dotenv =
  require("dotenv")

dotenv.config()

const {
  GoogleGenerativeAI,
} = require(
  "@google/generative-ai"
)

const Store =
  require("../models/Store")

const Product =
  require("../models/Product")

// =====================================
// GEMINI
// =====================================

const genAI =
  new GoogleGenerativeAI(
    process.env
      .GEMINI_RECOMMENDATION_KEY
  )

const model =
  genAI.getGenerativeModel({
    model:
      "gemini-3-flash-preview",
  })

// =====================================
// GENERATE STORE RECOMMENDATIONS
// =====================================

async function generateStoreRecommendations(
  storeId
) {

  // ===================================
  // FETCH STORE
  // ===================================

  const store =
    await Store.findOne({
      storeId,
    })

  if (!store) {

    throw new Error(
      "Store not found"
    )
  }

  // ===================================
  // RETURN SAVED RECOMMENDATIONS
  // ===================================

  if (
    store.recommendationData
      ?.recommendations
      ?.length > 0
  ) {

    return (
      store.recommendationData
    )
  }

  // ===================================
  // FETCH PRODUCTS
  // ===================================

  const products =
    await Product.find({
      storeId,
    })

  // ===================================
  // PRODUCT ANALYTICS
  // ===================================

  const lowTrust =
    products.filter(
      (p) =>
        p.scores?.trust < 60
    ).length

  const lowSEO =
    products.filter(
      (p) =>
        p.scores
          ?.discoverability < 60
    ).length

  const lowClarity =
    products.filter(
      (p) =>
        p.scores?.clarity < 60
    ).length

  const lowConversion =
    products.filter(
      (p) =>
        p.scores
          ?.conversion < 60
    ).length

  // ===================================
  // PROMPT
  // ===================================

 const prompt = `
You are a friendly ecommerce growth advisor helping non-technical store owners improve their online store for customers and AI shopping assistants like ChatGPT, Gemini and Perplexity.

Your job is to explain store problems in a simple, practical and merchant-friendly way.

Focus mainly on:
- Return policies
- Shipping policies
- Warranty policies
- FAQs
- Trust signals
- Product clarity
- Customer confidence
- Conversion improvements
- AI shopping visibility

==================================================
STORE DETAILS
==================================================

Store Name:
${store.storeName}

Category:
${store.category}

Domain:
${store.domain}

==================================================
STORE AI SCORES
==================================================

AI Discoverability:
${store.overallScores.aiDiscoverability}/100

Product Clarity:
${store.overallScores.productClarity}/100

Trust Signals:
${store.overallScores.trustSignals}/100

Conversion Readiness:
${store.overallScores.conversionReadiness}/100

==================================================
STORE POLICIES
==================================================

Return Policy:
${store.policies?.returnPolicy || "Missing"}

Shipping Policy:
${store.policies?.shippingPolicy || "Missing"}

Warranty Policy:
${store.policies?.warrantyPolicy || "Missing"}

==================================================
FAQ ANALYSIS
==================================================

FAQ Count:
${store.faqs?.length || 0}

FAQs:
${
  store.faqs?.length
    ? JSON.stringify(
        store.faqs
      )
    : "No FAQs added"
}

==================================================
PRODUCT ISSUE SUMMARY
==================================================

Low Trust Products:
${lowTrust}

Low SEO Products:
${lowSEO}

Low Clarity Products:
${lowClarity}

Low Conversion Products:
${lowConversion}

Total Products:
${products.length}

==================================================
IMPORTANT INSTRUCTIONS
==================================================

Write recommendations for normal ecommerce merchants, NOT developers.

Recommendations should:
- be simple
- be easy to understand
- explain WHY it matters
- focus on customer trust
- focus on improving sales
- focus on AI shopping visibility
- use short practical sentences
- avoid technical jargon

Focus heavily on:
- missing policies
- weak FAQs
- trust signals
- store professionalism
- customer confidence
- AI shopping readiness

VERY IMPORTANT:

When suggesting FAQs or policies:
- give practical examples
- suggest exact FAQ topics merchants should add
- suggest exact policies merchants should add
- suggest what customers usually want to know
- suggest what AI shopping assistants look for

Examples:
- shipping time FAQs
- return eligibility FAQs
- waterproof/material FAQs
- sizing FAQs
- payment FAQs
- warranty coverage FAQs

Policy examples:
- 30-day return policy
- refund processing timeline
- damaged item replacement policy
- shipping delay policy
- cancellation policy

Each recommendation should:
- sound friendly
- feel actionable
- feel useful for merchants
- contain maximum 3 action items

Avoid:
- overly technical language
- developer terminology
- enterprise consulting tone
- long paragraphs

==================================================
RETURN STRICT JSON ONLY
==================================================

{
  "summary": "",

  "recommendations": [
    {
      "title": "",
      "description": "",
      "priority": "High | Medium | Low",
      "impact": "",
      "category": "",
      "actionItems": []
    }
  ]
}
`

  // ===================================
  // GEMINI RESPONSE
  // ===================================

  const result =
    await model.generateContent(
      prompt
    )

  const response =
    result.response.text()

  // ===================================
  // CLEAN RESPONSE
  // ===================================

  const cleaned =
    response
      .replace(
        /```json/g,
        ""
      )
      .replace(
        /```/g,
        ""
      )
      .trim()

  const parsed =
    JSON.parse(cleaned)

  // ===================================
  // SAVE RECOMMENDATIONS
  // ===================================

  store.recommendationData =
    parsed

  store.recommendationGeneratedAt =
    new Date()

  await store.save()

  return parsed
}

module.exports = {
  generateStoreRecommendations,
}