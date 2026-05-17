const dotenv = require("dotenv");

dotenv.config();
const {
  GoogleGenerativeAI,
} = require("@google/generative-ai");

const genAI =
  new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
  );

const model =
  genAI.getGenerativeModel({
    model: "gemini-3-flash-preview",
  });

const generateProductAnalysis =
  async (product) => {

    const prompt = `

You are a world-class ecommerce CRO,
SEO strategist,
Shopify optimization expert,
branding consultant,
and conversion optimization specialist.

Your task is to deeply analyze this ecommerce product.

==================================================
PRODUCT DATA
==================================================

TITLE:
${product.title}

DESCRIPTION:
${product.description}

CATEGORY:
${product.category}

PRICE:
${product.price}

RATING:
${product.rating}

REVIEWS:
${product.reviews}

IMAGES:
${JSON.stringify(product.images)}

==================================================
ANALYZE THESE FACTORS
==================================================

1. Product title quality
2. SEO optimization
3. Buyer psychology
4. Trustworthiness
5. Conversion readiness
6. Emotional marketing strength
7. Clarity of benefits
8. Readability
9. Mobile friendliness
10. Product positioning
11. CTA quality
12. Product image quality
13. Product image professionalism
14. Premium feel of images
15. Missing trust signals
16. Weak copywriting
17. Generic AI-generated sounding text

==================================================
SCORING RULES
==================================================

Give realistic scores from 0-100.

clarity:
How easy the product info is to understand

discoverability:
SEO quality and keyword optimization

trust:
How trustworthy the product/store feels

conversion:
Likelihood customer buys product

IMPORTANT:
- overallScore should ONLY use:
  clarity,
  discoverability,
  trust,
  conversion

- imageQuality must NOT affect overallScore

==================================================
RETURN ONLY VALID JSON
==================================================

{
  "clarity": number,
  "discoverability": number,
  "trust": number,
  "conversion": number,

  "imageQuality": number,

  "summary": "overall analysis",

  "problems": [
    "problem"
  ],

  "recommendations": [
    "recommendation"
  ],

  "priorityFixes": [
    "important fix"
  ],

  "seoKeywords": [
    "keyword"
  ],

  "highIntentKeywords": [
    "buyer keyword"
  ],

  "faqSuggestions": [
    "faq"
  ],

  "suggestedTitle": "better SEO optimized title",

  "metaTitle": "SEO meta title",

  "metaDescription": "SEO meta description",

  "generatedDescription": "high converting description",

  "shortDescription": "short mobile description",

  "ctaSuggestions": [
    "Buy Now"
  ],

  "trustSignalsNeeded": [
    "money back guarantee"
  ],

  "missingSections": [
    "shipping section"
  ],

  "targetAudience": [
    "fitness enthusiasts"
  ],

  "imageAnalysis": {

    "imageIssues": [
      "issue"
    ],

    "imageRecommendations": [
      "recommendation"
    ],

    "missingImageTypes": [
      "lifestyle shots"
    ]
  }
}

Return ONLY pure JSON.

`;

    const result =
      await model.generateContent(
        prompt
      );

    const response =
      await result.response;

    return response.text();
  };

module.exports =
  generateProductAnalysis;