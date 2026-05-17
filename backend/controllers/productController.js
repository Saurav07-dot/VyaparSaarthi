const Product = require("../models/Product");

const getProducts = async (req, res) => {

  try {

    const products =
      await Product.find({
        storeId: req.params.storeId,
      });

    res.json(products);

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch products",
    });

  }
};

const getSingleProduct = async (req, res) => {
  try {

    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch product",
    });

  }
};

module.exports = {
  getProducts,
  getSingleProduct,
};