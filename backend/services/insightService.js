function generateInsights(
  store,
  products
) {

  // =====================================
  // PRODUCT SCORE AGGREGATION
  // =====================================

  let totalTrust = 0;

  let totalClarity = 0;

  let totalConversion = 0;

  let totalDiscoverability = 0;

  let totalOverall = 0;

  // =====================================
  // DEFAULT RESPONSE
  // =====================================

  const insights = {

    overallHealth: 0,

    storeRating: 0,

    storeStatus: "",

    summary: "",

    businessScores: {

      customerTrust: 0,

      buyingConfidence: 0,

      conversionReadiness: 0,

      searchVisibility: 0,
    },

    strengths: [],

    risks: [],

    quickWins: [],

    opportunities: [],

    weakProducts: [],

    stats: {

      totalProducts: products.length,

      excellentProducts: 0,

      weakProducts: 0,

      averageScore: 0,
    },
  };

  // =====================================
  // CALCULATE PRODUCT SCORES
  // =====================================

  products.forEach((product) => {

    totalTrust +=
      product.scores?.trust || 0;

    totalClarity +=
      product.scores?.clarity || 0;

    totalConversion +=
      product.scores?.conversion || 0;

    totalDiscoverability +=
      product.scores?.discoverability || 0;

    totalOverall +=
      product.overallScore || 0;

    // ===================================
    // EXCELLENT PRODUCTS
    // ===================================

    if (
      product.overallScore >= 80
    ) {

      insights.stats
        .excellentProducts += 1;
    }

    // ===================================
    // WEAK PRODUCTS
    // ===================================

    if (
      product.overallScore < 60
    ) {

      insights.stats
        .weakProducts += 1;

      insights.weakProducts.push({

        id:
          product._id,

        title:
          product.title,

        score:
          product.overallScore,

        issue:
          product.aiProblems?.[0] ||
          "Low customer confidence",

        opportunity:
          product.recommendations?.[0] ||
          "Improve product clarity",
      });
    }

    // ===================================
    // QUICK WINS
    // ===================================

    if (
      !product.images ||
      product.images.length < 2
    ) {

      insights.quickWins.push(
        `Add more product images for ${product.title}`
      );
    }

    if (
      !product.description ||
      product.description.length < 120
    ) {

      insights.quickWins.push(
        `Improve product description for ${product.title}`
      );
    }

    if (
      !product.reviews ||
      product.reviews < 5
    ) {

      insights.quickWins.push(
        `Increase customer reviews for ${product.title}`
      );
    }
  });

  // =====================================
  // AVERAGE SCORES
  // =====================================

  const scores = {

    trustSignals:
      products.length > 0
        ? Math.floor(
            totalTrust /
            products.length
          )
        : 0,

    productClarity:
      products.length > 0
        ? Math.floor(
            totalClarity /
            products.length
          )
        : 0,

    conversionReadiness:
      products.length > 0
        ? Math.floor(
            totalConversion /
            products.length
          )
        : 0,

    aiDiscoverability:
      products.length > 0
        ? Math.floor(
            totalDiscoverability /
            products.length
          )
        : 0,
  };

  // =====================================
  // OVERALL HEALTH
  // =====================================

  const overallHealth =
    Math.floor(
      (
        scores.aiDiscoverability +
        scores.productClarity +
        scores.trustSignals +
        scores.conversionReadiness
      ) / 4
    );

  insights.overallHealth =
    overallHealth;

  // =====================================
  // AVERAGE PRODUCT SCORE
  // =====================================

  insights.stats.averageScore =
    products.length > 0
      ? Math.floor(
          totalOverall /
          products.length
        )
      : 0;

  // =====================================
// STORE STAR RATING
// =====================================

  const averageStoreScore =
    insights.stats.averageScore;

  const starRating =
    (
      averageStoreScore / 20
    ).toFixed(1);

  insights.storeRating =
    Number(starRating);

  // =====================================
  // STORE STATUS
  // =====================================

  if (overallHealth >= 85) {

    insights.storeStatus =
      "Excellent";
  }

  else if (overallHealth >= 70) {

    insights.storeStatus =
      "Healthy";
  }

  else if (overallHealth >= 50) {

    insights.storeStatus =
      "Needs Improvement";
  }

  else {

    insights.storeStatus =
      "Critical";
  }

  // =====================================
  // SUMMARY
  // =====================================

  insights.summary =
    `Your store currently shows ${insights.storeStatus.toLowerCase()} business performance. Improving customer trust and product clarity could help increase buying confidence.`;

  // =====================================
  // BUSINESS SCORES
  // =====================================

  insights.businessScores = {

    customerTrust:
      scores.trustSignals,

    buyingConfidence:
      scores.productClarity,

    conversionReadiness:
      scores.conversionReadiness,

    searchVisibility:
      scores.aiDiscoverability,
  };

  // =====================================
  // STRENGTHS
  // =====================================

  if (
    scores.trustSignals >= 75
  ) {

    insights.strengths.push(
      "Your store builds strong customer trust."
    );
  }

  if (
    scores.productClarity >= 70
  ) {

    insights.strengths.push(
      "Most products clearly explain their value."
    );
  }

  if (
    store.faqs &&
    store.faqs.length >= 3
  ) {

    insights.strengths.push(
      "Customers can easily find answers through FAQs."
    );
  }

  if (
    store.policies?.shippingPolicy
  ) {

    insights.strengths.push(
      "Shipping information is clearly available."
    );
  }

  // =====================================
  // RISKS
  // =====================================

  if (
    !store.policies?.returnPolicy
  ) {

    insights.risks.push(
      "Customers may hesitate because return policy information is missing."
    );
  }

  if (
    scores.conversionReadiness < 60
  ) {

    insights.risks.push(
      "Some products may not provide enough confidence for customers to purchase."
    );
  }

  if (
    scores.aiDiscoverability < 60
  ) {

    insights.risks.push(
      "Your products may not be easily discoverable online."
    );
  }

  // =====================================
  // FALLBACKS
  // =====================================

  if (
    insights.strengths.length === 0
  ) {

    insights.strengths.push(
      "Your store has room for optimization improvements."
    );
  }

  if (
    insights.risks.length === 0
  ) {

    insights.risks.push(
      "No major business risks detected."
    );
  }

  // =====================================
  // OPPORTUNITIES
  // =====================================

  insights.opportunities.push(
    "Adding comparison sections may help customers make faster buying decisions."
  );

  insights.opportunities.push(
    "Improving product storytelling could increase customer engagement."
  );

  insights.opportunities.push(
    "Adding more lifestyle images may improve customer trust."
  );

  insights.opportunities.push(
    "Displaying refund and shipping information more clearly may improve conversions."
  );

  // =====================================
  // REMOVE DUPLICATES
  // =====================================

  insights.quickWins =
    [...new Set(
      insights.quickWins
    )];

  return insights;
}

module.exports = {
  generateInsights,
};