const express =
  require("express")

const router =
  express.Router()

const {
  getRecommendations,
  regenerateRecommendations,
} = require(
  "../controllers/recommendationController"
)

router.get(
  "/:storeId",
  getRecommendations
)

router.post(
  "/regenerate/:storeId",
  regenerateRecommendations
)

module.exports =
  router