const fs = require("fs");

const {
  generateProductContent,
} = require(
  "../services/aiStudioService"
);

async function generateAIContent(
  req,
  res
) {

  try {

    const {
      title,
      description,
      category,
    } = req.body;

    const imagePath =
      req.file?.path;

    const result =
      await generateProductContent({
        title,
        description,
        category,
        imagePath,
      });

    if (imagePath) {
      fs.unlinkSync(imagePath);
    }

    res.json({
      success: true,
      result,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "AI generation failed",
    });
  }
}

module.exports = {
  generateAIContent,
};