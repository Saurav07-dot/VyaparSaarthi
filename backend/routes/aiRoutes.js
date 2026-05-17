const express =
  require("express");

const router =
  express.Router();

const {
  analyzeProduct,
  analyzeAllProducts,
} = require(
  "../controllers/aiController"
);

router.post(
  "/analyze/:id",
  analyzeProduct
);

router.post(
  "/analyze-store/:storeId",
  analyzeAllProducts
);

module.exports = router;