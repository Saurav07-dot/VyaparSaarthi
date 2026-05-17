const Store =
  require("../models/Store")

const {
  generateStoreRecommendations,
} = require(
  "../services/recommendationService"
)

// ===================================
// GET RECOMMENDATIONS
// ===================================

async function getRecommendations(
  req,
  res
) {

  try {

    const { storeId } =
      req.params

    const data =
      await generateStoreRecommendations(
        storeId
      )

    res.json(data)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      error:
        "Failed to generate recommendations",
    })
  }
}

// ===================================
// REGENERATE
// ===================================

async function regenerateRecommendations(
  req,
  res
) {

  try {

    const { storeId } =
      req.params

    // CLEAR OLD DATA

    await Store.findOneAndUpdate(

      { storeId },

      {
        recommendationData: {
          summary: "",
          recommendations: [],
        },

        recommendationGeneratedAt:
          null,
      }
    )

    // GENERATE AGAIN

    const data =
      await generateStoreRecommendations(
        storeId
      )

    res.json(data)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      error:
        "Failed to regenerate recommendations",
    })
  }
}

module.exports = {
  getRecommendations,
  regenerateRecommendations,
}