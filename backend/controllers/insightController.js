const Store =
  require("../models/Store");

const Product =
  require("../models/Product");

const {
  generateInsights,
} = require(
  "../services/insightService"
);

const getStoreInsights =
  async (req, res) => {

    try {

      const storeId =
        req.params.storeId;

      // =====================================
      // GET STORE
      // =====================================

      const store =
        await Store.findOne({
          storeId,
        });

      if (!store) {

        return res.status(404)
          .json({

            success: false,

            message:
              "Store not found",
          });
      }

      // =====================================
      // GET PRODUCTS
      // =====================================

      const products =
        await Product.find({
          storeId,
        });

      // =====================================
      // GENERATE INSIGHTS
      // =====================================

      const insights =
        generateInsights(
          store,
          products
        );

      // =====================================
      // RESPONSE
      // =====================================

      res.status(200).json({

        success: true,

        insights,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Failed to generate insights",
      });
    }
  };

module.exports = {
  getStoreInsights,
};