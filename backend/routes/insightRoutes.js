const express =
  require("express");

const router =
  express.Router();

const {
  getStoreInsights,
} = require(
  "../controllers/insightController"
);

router.get(
  "/:storeId",
  getStoreInsights
);

module.exports =
  router;