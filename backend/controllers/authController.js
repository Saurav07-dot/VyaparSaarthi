// ==========================================
// FILE: backend/controllers/authController.js
// ==========================================

const User =
  require("../models/User");

const Store =
  require("../models/Store");

const bcrypt =
  require("bcryptjs");

const jwt =
  require("jsonwebtoken");

// ==========================================
// LOGIN
// ==========================================

const login =
  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;

      // ====================================
      // FIND USER
      // ====================================

      const user =
        await User.findOne({
          email,
        });

      if (!user) {

        return res.status(400).json({

          message:
            "Invalid email",
        });
      }

      // ====================================
      // CHECK PASSWORD
      // ====================================

      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isMatch) {

        return res.status(400).json({

          message:
            "Invalid password",
        });
      }

      // ====================================
      // GET STORE DETAILS
      // ====================================

      const store =
        await Store.findOne({

          storeId:
            user.storeId,
        });

      // ====================================
      // CREATE TOKEN
      // ====================================

      const token =
        jwt.sign(

          {
            id: user._id,

            storeId:
              user.storeId,
          },

          process.env.JWT_SECRET,

          {
            expiresIn: "7d",
          }
        );

      // ====================================
      // RESPONSE
      // ====================================

      res.json({

        token,

        user: {

          id:
            user._id,

          email:
            user.email,

          storeId:
            user.storeId,

          // ================================
          // STORE DATA
          // ================================

          storeName:
            store?.storeName ||
            "My Store",

          domain:
            store?.domain ||
            "mystore.myshopify.com",

          category:
            store?.category ||
            "General",
        },
      });

      console.log(

        `LOGIN SUCCESS:
        
        ${user.email}
        
        | Store:
        ${user.storeId}
        
        | Name:
        ${store?.storeName}`

      );

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Server error",
      });
    }
  };

module.exports = {
  login,
};