const express = require("express");

const router = express.Router();

const {
  getProducts,
  getSingleProduct,
} = require("../controllers/productController");

router.get(
  "/store/:storeId",
  getProducts
);

router.get("/:id", getSingleProduct);

module.exports = router;