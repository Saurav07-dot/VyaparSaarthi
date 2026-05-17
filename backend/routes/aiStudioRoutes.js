const express =
  require("express");

const multer =
  require("multer");

const router =
  express.Router();

const {
  generateAIContent,
} = require(
  "../controllers/aiStudioController"
);

const upload =
  multer({
    dest: "uploads/",
  });

router.post(
  "/generate",
  upload.single("image"),
  generateAIContent
);

module.exports = router;