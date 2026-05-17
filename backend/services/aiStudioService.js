const dotenv = require("dotenv");

dotenv.config();

const fs = require("fs");

const {
  GoogleGenerativeAI,
} = require("@google/generative-ai");

const genAI =
  new GoogleGenerativeAI(
    process.env.GEMINI_STUDIO_API
  );

async function generateProductContent(
  data
) {

  const {
    title,
    description,
    category,
    imagePath,
  } = data;

  const model =
    genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
    });

  let imagePart = null;

  if (imagePath) {

    const imageData =
      fs.readFileSync(imagePath);

    imagePart = {
      inlineData: {
        data:
          imageData.toString(
            "base64"
          ),
        mimeType: "image/png",
      },
    };
  }

  const prompt = `
You are an AI ecommerce expert.

Analyze this product and generate:

1. Optimized Product Title
2. High converting product description
3. 5 bullet point highlights
4. SEO keywords
5. Suggested tags
6. Trust signals to add
7. Conversion improvement tips

Category:
${category}

Current Title:
${title}

Current Description:
${description}

Return ONLY valid JSON.

Use this structure:

{
  "optimized_product_title": "",
  "high_converting_description": "",
  "bullet_points": [],
  "seo_keywords": [],
  "suggested_tags": [],
  "trust_signals": [],
  "conversion_improvement_tips": []
}
`;

  const content = [prompt];

  if (imagePart) {

    content.push(imagePart);
  }

  const result =
    await model.generateContent(
      content
    );

  const response =
    await result.response;

  const text =
    response.text();

  const cleaned =
    text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

  return JSON.parse(cleaned);
}

module.exports = {
  generateProductContent,
};